# Interactive Dot Matrix Background

We have implemented a high-performance, interactive background system.

## Features

1.  **Mouse Interaction**: Dots grow when the cursor is near.
2.  **Component "Attractors"**: Specific components can registered to "attract" dots (make them grow) even when the mouse isn't there. This works for scrolling elements!
3.  **Glow Effect**: Dots have a subtle glowing shadow.
4.  **Hover Boost**: Hovering over important elements (like the Navbar) temporarily increases the "Grow" effect of the mouse-triggered dots.

## Usage

### 1. Global Setup

The `CanvasProvider` and `<InteractiveBackground />` are already set up in `App.tsx`.

### 2. Making a Component an Attractor

To make a component influence the background dots:

```tsx
import { useRef, useEffect } from "react";
import { useCanvas } from "@/context/CanvasContext";

export function MyComponent() {
    const { registerAttractor, unregisterAttractor } = useCanvas();
    const myRef = useRef(null);

    useEffect(() => {
        // Register this component as an attractor
        registerAttractor(myRef);
        // Clean up
        return () => unregisterAttractor(myRef);
    }, []);

    return <div ref={myRef}>I glow!</div>;
}
```

## Configuration

Adjust constants in `src/components/ui/InteractiveBackground.tsx` to change:

- `DOT_SPACING`: Distance between dots
- `DOT_BASE_RADIUS`: Minimum size of dots
- `BASE_MAX_RADIUS`: Maximum size when interacting with mouse
- `HOVER_MAX_RADIUS`: Maximum size when hovering over interactive elements
- `MOUSE_INFLUENCE_RADIUS`: Radius of mouse effect
- `HOVER_MOUSE_INFLUENCE_RADIUS`: Radius of mouse effect during hover state
- `ATTRACTOR_INFLUENCE_RADIUS`: Radius of component attractor effect
