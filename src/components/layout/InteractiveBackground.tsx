import { useEffect, useRef } from "react";
import { useCanvas } from "@/context/CanvasContext";

export function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { attractorsRef } = useCanvas();
    const rectsRef = useRef<DOMRect[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Initial rect calculation after mount/layout
            updateRects();
        }, 100);
        return () => clearTimeout(timer);
    }, [attractorsRef]);

    const updateRects = () => {
        rectsRef.current = attractorsRef.current
            .map((ref) => (ref.current ? ref.current.getBoundingClientRect() : null))
            .filter((rect): rect is DOMRect => rect !== null);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const DOT_SPACING = 48;
        const DOT_BASE_RADIUS = 4;
        const BASE_MAX_RADIUS = 6;

        const MOUSE_INFLUENCE_RADIUS = 90;
        const MOUSE_CORE_RADIUS = 20;
        const PARALLAX_OFFSET = 32;
        const SCROLL_SPEED = 0.05;
        const SCROLL_WRAP = DOT_SPACING * 2;
        const ATTRACTOR_INFLUENCE_RADIUS = 48;

        const DOT_COLOR = "rgba(183, 134, 0, 0.25)";
        const HOVER_DOT_COLOR = "rgba(183, 134, 0, 0.25)";

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            updateRects();
        };

        const handleScroll = () => {
            updateRects();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initial Size
        handleResize();
        const PI2 = Math.PI * 2;

        // FPS Limit Config
        const TARGET_FPS = 24;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;
        let lastDrawTime = 0;

        const render = (time: number) => {
            if (!canvas || !ctx) return;

            const activeAttractors = rectsRef.current;

            const elapsed = time - lastDrawTime;

            if (elapsed < FRAME_INTERVAL) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Adjust for drift
            lastDrawTime = time - (elapsed % FRAME_INTERVAL);

            // Clear Background
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Optimization: Pre-calculate square radii needed
            const currentMouseRadiusSq = MOUSE_INFLUENCE_RADIUS * MOUSE_INFLUENCE_RADIUS;
            const attractorRadiusSq = ATTRACTOR_INFLUENCE_RADIUS * ATTRACTOR_INFLUENCE_RADIUS;

            // PARALLAX CALCULATION
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const normX = (mouseX - centerX) / centerX;
            const normY = (mouseY - centerY) / centerY;

            // Scroll Offset
            const scrollOffsetY = (window.scrollY * SCROLL_SPEED) % SCROLL_WRAP;

            // Move opposite to mouse direction
            const activeOffsetX = -normX * PARALLAX_OFFSET;
            const activeOffsetY = -normY * PARALLAX_OFFSET - scrollOffsetY;

            ctx.save();
            ctx.translate(activeOffsetX, activeOffsetY);

            // Reusable loop variables
            let r,
                maxGrowth,
                screenX,
                screenY,
                dx,
                dy,
                distMouseSq,
                distMouse,
                effectiveDist,
                effectiveMaxRadius,
                growth,
                linearGrowth;

            // Expand loop to cover boundaries
            const EXTRA_MARGIN = SCROLL_WRAP + DOT_SPACING;

            // Loop Bounds
            const startX = -EXTRA_MARGIN;
            const endX = canvas.width + EXTRA_MARGIN;
            const startY = -EXTRA_MARGIN;
            const endY = canvas.height + EXTRA_MARGIN;

            // BATCH 1: GLOW
            ctx.fillStyle = HOVER_DOT_COLOR;
            ctx.beginPath();

            for (let x = startX; x < endX; x += DOT_SPACING) {
                for (let y = startY; y < endY; y += DOT_SPACING) {
                    screenX = x + activeOffsetX;
                    screenY = y + activeOffsetY;

                    dx = screenX - mouseX;
                    dy = screenY - mouseY;
                    distMouseSq = dx * dx + dy * dy;

                    r = DOT_BASE_RADIUS;
                    maxGrowth = 0;

                    if (distMouseSq < currentMouseRadiusSq) {
                        distMouse = Math.sqrt(distMouseSq);

                        if (distMouse < MOUSE_CORE_RADIUS) {
                            growth = 1.0;
                            r += (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth;
                            maxGrowth = Math.max(maxGrowth, growth);
                        } else {
                            effectiveDist = distMouse - MOUSE_CORE_RADIUS;
                            effectiveMaxRadius = MOUSE_INFLUENCE_RADIUS - MOUSE_CORE_RADIUS;

                            if (effectiveMaxRadius > 0) {
                                linearGrowth = 1 - Math.min(effectiveDist / effectiveMaxRadius, 1);
                                growth = linearGrowth * linearGrowth;
                                r += (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth;
                                maxGrowth = Math.max(maxGrowth, growth);
                            }
                        }
                    }

                    for (const rect of activeAttractors) {
                        if (
                            screenX < rect.left - ATTRACTOR_INFLUENCE_RADIUS ||
                            screenX > rect.right + ATTRACTOR_INFLUENCE_RADIUS ||
                            screenY < rect.top - ATTRACTOR_INFLUENCE_RADIUS ||
                            screenY > rect.bottom + ATTRACTOR_INFLUENCE_RADIUS
                        ) {
                            continue;
                        }

                        const clampedX = Math.max(rect.left, Math.min(screenX, rect.right));
                        const clampedY = Math.max(rect.top, Math.min(screenY, rect.bottom));
                        const distAttractorSq = (screenX - clampedX) ** 2 + (screenY - clampedY) ** 2;

                        if (distAttractorSq < attractorRadiusSq) {
                            const distAttractor = Math.sqrt(distAttractorSq);
                            const linearGrowth = 1 - distAttractor / ATTRACTOR_INFLUENCE_RADIUS;
                            const growth = linearGrowth * linearGrowth;
                            const attractorSize = DOT_BASE_RADIUS + (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth * 1.2;

                            if (attractorSize > r) {
                                r = attractorSize;
                                maxGrowth = Math.max(maxGrowth, growth);
                            }
                        }
                    }

                    if (maxGrowth > 0.01) {
                        const glowMultiplier = 1.0 + maxGrowth * 1.5;
                        const glowR = r * glowMultiplier;
                        ctx.moveTo(x + glowR, y);
                        ctx.arc(x, y, glowR, 0, PI2);
                    }
                }
            }
            ctx.fill();

            // BATCH 2: CORE
            ctx.fillStyle = DOT_COLOR;
            ctx.beginPath();

            for (let x = startX; x < endX; x += DOT_SPACING) {
                for (let y = startY; y < endY; y += DOT_SPACING) {
                    screenX = x + activeOffsetX;
                    screenY = y + activeOffsetY;

                    dx = screenX - mouseX;
                    dy = screenY - mouseY;
                    distMouseSq = dx * dx + dy * dy;

                    r = DOT_BASE_RADIUS;

                    if (distMouseSq < currentMouseRadiusSq) {
                        distMouse = Math.sqrt(distMouseSq);

                        if (distMouse < MOUSE_CORE_RADIUS) {
                            const growth = 1.0;
                            r += (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth;
                        } else {
                            effectiveDist = distMouse - MOUSE_CORE_RADIUS;
                            effectiveMaxRadius = MOUSE_INFLUENCE_RADIUS - MOUSE_CORE_RADIUS;

                            if (effectiveMaxRadius > 0) {
                                linearGrowth = 1 - Math.min(effectiveDist / effectiveMaxRadius, 1);
                                growth = linearGrowth * linearGrowth;
                                r += (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth;
                            }
                        }
                    }

                    for (const rect of activeAttractors) {
                        if (
                            screenX < rect.left - ATTRACTOR_INFLUENCE_RADIUS ||
                            screenX > rect.right + ATTRACTOR_INFLUENCE_RADIUS ||
                            screenY < rect.top - ATTRACTOR_INFLUENCE_RADIUS ||
                            screenY > rect.bottom + ATTRACTOR_INFLUENCE_RADIUS
                        ) {
                            continue;
                        }
                        const clampedX = Math.max(rect.left, Math.min(screenX, rect.right));
                        const clampedY = Math.max(rect.top, Math.min(screenY, rect.bottom));
                        const distAttractorSq = (screenX - clampedX) ** 2 + (screenY - clampedY) ** 2;

                        if (distAttractorSq < attractorRadiusSq) {
                            const distAttractor = Math.sqrt(distAttractorSq);
                            const linearGrowth = 1 - distAttractor / ATTRACTOR_INFLUENCE_RADIUS;
                            const growth = linearGrowth * linearGrowth;
                            const attractorSize = DOT_BASE_RADIUS + (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth * 1.2;
                            r = Math.max(r, attractorSize);
                        }
                    }

                    ctx.moveTo(x + r, y);
                    ctx.arc(x, y, r, 0, PI2);
                }
            }
            ctx.fill();
            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [attractorsRef]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ background: "var(--color-ndark-900)", filter: "blur(4px)" }}
        />
    );
}
