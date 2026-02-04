import { useEffect, useRef } from "react";
import { useCanvas } from "@/context/CanvasContext";

export function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { attractorsRef, isHovering } = useCanvas();

    // Use a ref to track hover state so we don't restart the animation loop
    const isHoveringRef = useRef(isHovering);

    useEffect(() => {
        isHoveringRef.current = isHovering;
    }, [isHovering]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const DOT_SPACING = 36;
        const DOT_BASE_RADIUS = 4;
        const BASE_MAX_RADIUS = 6;
        const HOVER_MAX_RADIUS = 10;

        const MOUSE_INFLUENCE_RADIUS = 80;
        const HOVER_MOUSE_INFLUENCE_RADIUS = 120;
        const MOUSE_CORE_RADIUS = 16;
        const PARALLAX_OFFSET = 24;
        const SCROLL_SPEED = 0.05;
        const SCROLL_WRAP = DOT_SPACING * 2;
        const ATTRACTOR_INFLUENCE_RADIUS = 40;

        const DOT_COLOR = "rgba(183, 134, 0, 0.25)";
        const HOVER_DOT_COLOR = "rgba(183, 134, 0, 0.2)";
        const TRANSITION_DURATION = 0.2;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Initial Size
        handleResize();
        const PI2 = Math.PI * 2;

        let lastTime = performance.now();
        let interpolatedMaxRadius = BASE_MAX_RADIUS;
        let interpolatedMouseRadius = MOUSE_INFLUENCE_RADIUS;

        // FPS Limit Config
        const TARGET_FPS = 24;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;
        let lastDrawTime = 0;

        const render = (time: number) => {
            if (!canvas || !ctx) return;

            const elapsed = time - lastDrawTime;

            if (elapsed < FRAME_INTERVAL) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Adjust for drift
            lastDrawTime = time - (elapsed % FRAME_INTERVAL);

            const now = time;
            // Use actual dt for smooth interpolation even with dropped frames, but cap it to avoid huge jumps
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            // ANIMATION LOGIC: Max Radius Interpolation
            const targetMaxRadius = isHoveringRef.current ? HOVER_MAX_RADIUS : BASE_MAX_RADIUS;
            const speed = Math.abs(HOVER_MAX_RADIUS - BASE_MAX_RADIUS) / TRANSITION_DURATION;

            if (interpolatedMaxRadius < targetMaxRadius) {
                interpolatedMaxRadius = Math.min(targetMaxRadius, interpolatedMaxRadius + speed * dt);
            } else if (interpolatedMaxRadius > targetMaxRadius) {
                interpolatedMaxRadius = Math.max(targetMaxRadius, interpolatedMaxRadius - speed * dt);
            }

            const currentMaxRadius = interpolatedMaxRadius;

            const targetMouseRadius = isHoveringRef.current ? HOVER_MOUSE_INFLUENCE_RADIUS : MOUSE_INFLUENCE_RADIUS;
            const mouseSpeed = Math.abs(HOVER_MOUSE_INFLUENCE_RADIUS - MOUSE_INFLUENCE_RADIUS) / TRANSITION_DURATION;

            if (interpolatedMouseRadius < targetMouseRadius) {
                interpolatedMouseRadius = Math.min(targetMouseRadius, interpolatedMouseRadius + mouseSpeed * dt);
            } else if (interpolatedMouseRadius > targetMouseRadius) {
                interpolatedMouseRadius = Math.max(targetMouseRadius, interpolatedMouseRadius - mouseSpeed * dt);
            }

            const currentMouseRadius = interpolatedMouseRadius;

            // Clear Background
            // We can't use clearRect alone if we want the trail effect, but here we want crisp redraws
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const activeAttractors = attractorsRef.current
                .map((ref) => (ref.current ? ref.current.getBoundingClientRect() : null))
                .filter((rect): rect is DOMRect => rect !== null);

            // Re-usable Helper for Math
            // We inline the logic inside the loops for V8 optimization (avoiding function call overhead in tight loops)
            // But for readability here we'll define the logic:

            // Optimization: Pre-calculate square radii needed
            const currentMouseRadiusSq = currentMouseRadius * currentMouseRadius;
            const attractorRadiusSq = ATTRACTOR_INFLUENCE_RADIUS * ATTRACTOR_INFLUENCE_RADIUS;

            // BATCH 1: GLOW (Simulated by larger, transparent circles)
            // Only draw glow for dots that are significantly affected

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

            ctx.fillStyle = HOVER_DOT_COLOR;
            ctx.beginPath();

            // Expand loop to cover boundaries
            const EXTRA_MARGIN = SCROLL_WRAP + DOT_SPACING;

            for (let x = -EXTRA_MARGIN; x < canvas.width + EXTRA_MARGIN; x += DOT_SPACING) {
                for (let y = -EXTRA_MARGIN; y < canvas.height + EXTRA_MARGIN; y += DOT_SPACING) {
                    // --- Radius Calc Start ---
                    const screenX = x + activeOffsetX;
                    const screenY = y + activeOffsetY;

                    const dx = screenX - mouseX;
                    const dy = screenY - mouseY;
                    const distMouseSq = dx * dx + dy * dy;

                    let r = DOT_BASE_RADIUS;
                    let maxGrowth = 0;

                    if (distMouseSq < currentMouseRadiusSq) {
                        const distMouse = Math.sqrt(distMouseSq);

                        // Core Radius Logic (Shelf)
                        if (distMouse < MOUSE_CORE_RADIUS) {
                            // Inside core radius: 100% influence
                            const growth = 1.0;
                            r += (currentMaxRadius - DOT_BASE_RADIUS) * growth;
                            maxGrowth = Math.max(maxGrowth, growth);
                        } else {
                            // Outside core radius: Falloff over remaining distance
                            // effectively mapping [core...max] to [1...0]
                            const effectiveDist = distMouse - MOUSE_CORE_RADIUS;
                            const effectiveMaxRadius = currentMouseRadius - MOUSE_CORE_RADIUS;

                            // Check to avoid division by zero or negative ranges if core > max (unlikely configuration)
                            if (effectiveMaxRadius > 0) {
                                const linearGrowth = 1 - Math.min(effectiveDist / effectiveMaxRadius, 1);
                                const growth = linearGrowth * linearGrowth; // Quadratic
                                r += (currentMaxRadius - DOT_BASE_RADIUS) * growth;
                                maxGrowth = Math.max(maxGrowth, growth);
                            }
                        }
                    }

                    for (const rect of activeAttractors) {
                        // Quick bounding box check before expensive distance
                        // Use screen coordinates for checking against clientRects
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
                            const growth = linearGrowth * linearGrowth; // Quadratic
                            const attractorSize = DOT_BASE_RADIUS + (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth * 1.2;

                            if (attractorSize > r) {
                                r = attractorSize;
                                maxGrowth = Math.max(maxGrowth, growth);
                            }
                        }
                    }
                    // --- Radius Calc End ---

                    // Only Add to Glow Path if there is some significant growth
                    if (maxGrowth > 0.01) {
                        // Dynamic Glow Expansion
                        const glowMultiplier = 1.0 + maxGrowth * 1.5;
                        const glowR = r * glowMultiplier;
                        ctx.moveTo(x + glowR, y);
                        ctx.arc(x, y, glowR, 0, PI2);
                    }
                }
            }
            ctx.fill();

            // BATCH 2: CORE (Sharp dots)
            ctx.fillStyle = DOT_COLOR;
            ctx.beginPath();

            // Repeat loop for core dots
            // Reuse EXTRA_MARGIN from batch 1
            for (let x = -EXTRA_MARGIN; x < canvas.width + EXTRA_MARGIN; x += DOT_SPACING) {
                for (let y = -EXTRA_MARGIN; y < canvas.height + EXTRA_MARGIN; y += DOT_SPACING) {
                    // --- Radius Calc Start (Repeat) ---
                    const screenX = x + activeOffsetX;
                    const screenY = y + activeOffsetY;

                    const dx = screenX - mouseX;
                    const dy = screenY - mouseY;
                    const distMouseSq = dx * dx + dy * dy;

                    let r = DOT_BASE_RADIUS;

                    if (distMouseSq < currentMouseRadiusSq) {
                        const distMouse = Math.sqrt(distMouseSq);

                        // Core Radius Logic (Shelf) - Repeat for core pass
                        if (distMouse < MOUSE_CORE_RADIUS) {
                            const growth = 1.0; // 100%
                            r += (currentMaxRadius - DOT_BASE_RADIUS) * growth;
                        } else {
                            const effectiveDist = distMouse - MOUSE_CORE_RADIUS;
                            const effectiveMaxRadius = currentMouseRadius - MOUSE_CORE_RADIUS;

                            if (effectiveMaxRadius > 0) {
                                const linearGrowth = 1 - Math.min(effectiveDist / effectiveMaxRadius, 1);
                                const growth = linearGrowth * linearGrowth; // Quadratic
                                r += (currentMaxRadius - DOT_BASE_RADIUS) * growth;
                            }
                        }
                    }

                    for (const rect of activeAttractors) {
                        // Quick bounding box check
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
                            const growth = linearGrowth * linearGrowth; // Quadratic
                            const attractorSize = DOT_BASE_RADIUS + (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth * 1.2;
                            r = Math.max(r, attractorSize);
                        }
                    }
                    // --- Radius Calc End ---

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
