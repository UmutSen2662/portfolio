import { type ReactNode, useState } from "react";

interface TooltipProps {
    children: ReactNode;
    text: string;
}

export function Tooltip({ children, text }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <div
                className={`
                    absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                    px-3 py-1.5 rounded-lg
                    bg-ndark-600 border border-nlight-500/10
                    text-nlight-200 text-sm whitespace-nowrap
                    pointer-events-none transition-opacity duration-150 ease-out
                    ${isVisible ? "opacity-100" : "opacity-0"}
                `}
            >
                {text}
                {/* Arrow */}
                <div
                    className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px]
                    w-2.5 h-2.5 bg-ndark-600 border-r border-b border-nlight-500/10 rotate-45"
                ></div>
            </div>
        </div>
    );
}
