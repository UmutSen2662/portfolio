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

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const DOT_SPACING = 36;
        const DOT_BASE_RADIUS = 2;
        const BASE_MAX_RADIUS = 5;
        const HOVER_MAX_RADIUS = 8;

        const MOUSE_INFLUENCE_RADIUS = 100;
        const HOVER_MOUSE_INFLUENCE_RADIUS = 150;
        const ATTRACTOR_INFLUENCE_RADIUS = 60;

        const DOT_COLOR = "rgba(183, 134, 0, 0.2)";
        const HOVER_DOT_COLOR = "rgba(183, 134, 0, 0.7)";
        const HOVER_DOT_BLUR = "blur(8px)";
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

        const render = () => {
            if (!canvas || !ctx) return;

            const now = performance.now();
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            // ANIMATION LOGIC: Max Radius Interpolation
            // usage of ref ensures we don't break the loop
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

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const activeAttractors = attractorsRef.current
                .map((ref) => {
                    if (ref.current) {
                        return ref.current.getBoundingClientRect();
                    }
                    return null;
                })
                .filter((rect): rect is DOMRect => rect !== null);

            // ------------------------------------------------
            // DUAL-PASS RENDERING STRATEGY
            // ------------------------------------------------
            // Pass 1: The Glow (Blurred, Brighter)
            // Pass 2: The Core (Sharp, Distinct)

            // Shared logic for calculating radius
            const calculateRadius = (x: number, y: number) => {
                const dx = x - mouseX;
                const dy = y - mouseY;
                const distMouse = Math.sqrt(dx * dx + dy * dy);
                let r = DOT_BASE_RADIUS;

                // 1. Mouse Interaction (Affected by Hover Boost)
                if (distMouse < currentMouseRadius) {
                    const growth = 1 - distMouse / currentMouseRadius;
                    r += (currentMaxRadius - DOT_BASE_RADIUS) * growth;
                }

                // 2. Attractor Interaction (STAYS at Base Size)
                for (const rect of activeAttractors) {
                    const clampedX = Math.max(rect.left, Math.min(x, rect.right));
                    const clampedY = Math.max(rect.top, Math.min(y, rect.bottom));
                    const distAttractor = Math.sqrt((x - clampedX) ** 2 + (y - clampedY) ** 2);

                    if (distAttractor < ATTRACTOR_INFLUENCE_RADIUS) {
                        const growth = 1 - distAttractor / ATTRACTOR_INFLUENCE_RADIUS;
                        const attractorSize = DOT_BASE_RADIUS + (BASE_MAX_RADIUS - DOT_BASE_RADIUS) * growth * 1.2;
                        r = Math.max(r, attractorSize);
                    }
                }
                return r;
            };

            // PASS 1: GLOW (Blurry)
            // We act "Brighter" by drawing larger circles with a blur filter
            ctx.filter = HOVER_DOT_BLUR;
            // Use a brighter opacity for the glow source
            ctx.fillStyle = HOVER_DOT_COLOR;

            for (let x = 0; x < canvas.width; x += DOT_SPACING) {
                for (let y = 0; y < canvas.height; y += DOT_SPACING) {
                    const r = calculateRadius(x, y);
                    // Only glow if significantly larger than base
                    if (r > DOT_BASE_RADIUS + 0.4) {
                        ctx.beginPath();
                        ctx.arc(x, y, r * 1.2, 0, PI2); // Draw slightly larger for fluffier glow
                        ctx.fill();
                    }
                }
            }

            // PASS 2: CORE (Sharp)
            ctx.filter = "none";
            ctx.fillStyle = DOT_COLOR; // Standard color

            for (let x = 0; x < canvas.width; x += DOT_SPACING) {
                for (let y = 0; y < canvas.height; y += DOT_SPACING) {
                    const r = calculateRadius(x, y);
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, PI2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [attractorsRef]); // Should not restart when isHovering changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ background: "var(--color-ndark-900)", filter: "blur(1px)" }}
        />
    );
}
