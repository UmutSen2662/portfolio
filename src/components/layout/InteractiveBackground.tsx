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

        const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency on canvas background if possible, though we use rgba
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const DOT_SPACING = 36;
        const DOT_BASE_RADIUS = 4;
        const BASE_MAX_RADIUS = 8;
        const HOVER_MAX_RADIUS = 12;

        const MOUSE_INFLUENCE_RADIUS = 80;
        const HOVER_MOUSE_INFLUENCE_RADIUS = 120;
        const ATTRACTOR_INFLUENCE_RADIUS = 40;

        const DOT_COLOR = "rgba(183, 134, 0, 0.25)";
        const HOVER_DOT_COLOR = "rgba(183, 134, 0, 0.2)"; // Lower opacity for glow since it's additive
        const TRANSITION_DURATION = 0.2;

        const handleResize = () => {
            // scale for dpi could go here but let's keep it simple and fast
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
            // Only draw glow for dots that are larger than base

            ctx.fillStyle = HOVER_DOT_COLOR;
            ctx.beginPath();

            for (let x = 0; x < canvas.width; x += DOT_SPACING) {
                for (let y = 0; y < canvas.height; y += DOT_SPACING) {
                    // --- Radius Calc Start ---
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const distMouseSq = dx * dx + dy * dy;

                    let r = DOT_BASE_RADIUS;

                    if (distMouseSq < currentMouseRadiusSq) {
                        const distMouse = Math.sqrt(distMouseSq);
                        const growth = 1 - distMouse / currentMouseRadius;
                        r += (currentMaxRadius - DOT_BASE_RADIUS) * growth;
                    }

                    for (const rect of activeAttractors) {
                        // Quick bounding box check before expensive distance
                        if (
                            x < rect.left - ATTRACTOR_INFLUENCE_RADIUS ||
                            x > rect.right + ATTRACTOR_INFLUENCE_RADIUS ||
                            y < rect.top - ATTRACTOR_INFLUENCE_RADIUS ||
                            y > rect.bottom + ATTRACTOR_INFLUENCE_RADIUS
                        ) {
                            continue;
                        }

                        const clampedX = Math.max(rect.left, Math.min(x, rect.right));
                        const clampedY = Math.max(rect.top, Math.min(y, rect.bottom));
                        const distAttractorSq = (x - clampedX) ** 2 + (y - clampedY) ** 2;

                        if (distAttractorSq < attractorRadiusSq) {
                            const distAttractor = Math.sqrt(distAttractorSq);
                            const growth = 1 - distAttractor / ATTRACTOR_INFLUENCE_RADIUS;
                            const attractorSize = DOT_BASE_RADIUS + (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth * 1.2;
                            r = Math.max(r, attractorSize);
                        }
                    }
                    // --- Radius Calc End ---

                    // Only Add to Glow Path if significant size
                    if (r > DOT_BASE_RADIUS + 0.2) {
                        // Move to avoid connecting lines
                        // Draw larger for glow
                        const glowR = r * 1.5;
                        ctx.moveTo(x + glowR, y);
                        ctx.arc(x, y, glowR, 0, PI2);
                    }
                }
            }
            ctx.fill();

            // BATCH 2: CORE (Sharp dots)
            ctx.fillStyle = DOT_COLOR;
            ctx.beginPath();

            // We repeat the loop.
            // NOTE: Ideally we'd store 'r' in a temporary array to avoid recalculating.
            // However, allocating a massive array every frame is also expensive (GC).
            // Recalculating simple math is often cheaper than memory allocation in JS.
            // Given < 2000 dots, re-calc is fine.

            for (let x = 0; x < canvas.width; x += DOT_SPACING) {
                for (let y = 0; y < canvas.height; y += DOT_SPACING) {
                    // --- Radius Calc Start (Repeat) ---
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const distMouseSq = dx * dx + dy * dy;

                    let r = DOT_BASE_RADIUS;

                    if (distMouseSq < currentMouseRadiusSq) {
                        const distMouse = Math.sqrt(distMouseSq);
                        const growth = 1 - distMouse / currentMouseRadius;
                        r += (currentMaxRadius - DOT_BASE_RADIUS) * growth;
                    }

                    for (const rect of activeAttractors) {
                        // Quick bounding box check
                        if (
                            x < rect.left - ATTRACTOR_INFLUENCE_RADIUS ||
                            x > rect.right + ATTRACTOR_INFLUENCE_RADIUS ||
                            y < rect.top - ATTRACTOR_INFLUENCE_RADIUS ||
                            y > rect.bottom + ATTRACTOR_INFLUENCE_RADIUS
                        ) {
                            continue;
                        }
                        const clampedX = Math.max(rect.left, Math.min(x, rect.right));
                        const clampedY = Math.max(rect.top, Math.min(y, rect.bottom));
                        const distAttractorSq = (x - clampedX) ** 2 + (y - clampedY) ** 2;

                        if (distAttractorSq < attractorRadiusSq) {
                            const distAttractor = Math.sqrt(distAttractorSq);
                            const growth = 1 - distAttractor / ATTRACTOR_INFLUENCE_RADIUS;
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
