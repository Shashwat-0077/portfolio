// Animation timing constants
export const ANIMATION_CONSTANTS = {
    DOCK_HIDE_DURATION: 500, // ms
    DOCK_SHOW_DURATION: 600, // ms
    DOCK_HIDE_DELAY: 500, // ms before starting view transition
    CURSOR_CLEANUP_DELAY: 700, // ms

    // Transform values
    DOCK_HIDE_TRANSLATE_Y: -120, // px

    // Z-index values
    DOCK_Z_INDEX: 9999,
    CURSOR_ANIMATION_Z_INDEX: 9999,

    // Easing functions
    DOCK_HIDE_EASING: "cubic-bezier(0.87, 0, 0.13, 1)",
    DOCK_SHOW_EASING: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    PAGE_TRANSITION_EASING: "cubic-bezier(0.87, 0, 0.13, 1)",

    // Page transition timing
    PAGE_TRANSITION_DURATION: 1500, // ms
} as const;

// Browser support detection
export const BROWSER_SUPPORT = {
    hasViewTransitions: () =>
        typeof document !== "undefined" && "startViewTransition" in document,
} as const;
