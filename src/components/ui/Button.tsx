import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "outline";
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
    const baseStyles = "";
    const variants = {
        primary: "",
        outline: "",
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </button>
    );
}
