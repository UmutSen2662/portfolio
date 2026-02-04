import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Button
            onClick={scrollToTop}
            variant="default"
            size="lg"
            className={cn(
                "fixed bottom-8 right-8 z-40 text-2xl p-0 w-12 ease-in-out xl:right-auto xl:left-1/2 xl:ml-[26rem]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
            )}
        >
            <FaArrowUp />
        </Button>
    );
};
