import { createContext, useContext, useRef, useCallback, useState } from "react";
import type { RefObject } from "react";

interface CanvasContextType {
    registerAttractor: (ref: RefObject<HTMLElement | null>) => void;
    unregisterAttractor: (ref: RefObject<HTMLElement | null>) => void;
    // We expose the ref directly so the animation loop can read it without triggering re-renders
    attractorsRef: React.RefObject<RefObject<HTMLElement | null>[]>;
    isHovering: boolean;
    setIsHovering: (hovering: boolean) => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
    const attractorsRef = useRef<RefObject<HTMLElement | null>[]>([]);
    const [isHovering, setIsHovering] = useState(false);

    const registerAttractor = useCallback((ref: RefObject<HTMLElement | null>) => {
        if (!attractorsRef.current.includes(ref)) {
            attractorsRef.current.push(ref);
        }
    }, []);

    const unregisterAttractor = useCallback((ref: RefObject<HTMLElement | null>) => {
        attractorsRef.current = attractorsRef.current.filter((r) => r !== ref);
    }, []);

    return (
        <CanvasContext.Provider value={{ registerAttractor, unregisterAttractor, attractorsRef, isHovering, setIsHovering }}>
            {children}
        </CanvasContext.Provider>
    );
}

export function useCanvas() {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("useCanvas must be used within a CanvasProvider");
    }
    return context;
}
