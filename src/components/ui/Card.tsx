import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends ComponentProps<"div"> {
    children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-transparent backdrop-blur-xs border border-nlight-200/10 rounded-2xl p-6 transition-all duration-300",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
