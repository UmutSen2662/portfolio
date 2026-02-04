import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}

// We need to type this carefully to handle both button and anchor props, but for simplicity in this strict TS setup without a polymorphic utility:
// We will just cast the props when rendering the anchor to avoid complex generic overhead for now.

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", children, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

        const variants = {
            default: "bg-primary-500 text-white hover:bg-primary-400 shadow-lg shadow-primary-500/20 hover:scale-105",
            outline:
                "border border-primary-500/30 bg-primary-900/10 text-primary-400 hover:bg-primary-900/20 hover:border-primary-500/50",
            ghost: "hover:bg-ndark-700 hover:text-nlight-100 text-nlight-300",
        };

        const sizes = {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-12 rounded-full px-8 text-lg",
            icon: "h-10 w-10",
        };

        const classes = cn(baseStyles, variants[variant], sizes[size], className);

        return (
            <button className={classes} ref={ref} {...props}>
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";
