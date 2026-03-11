import type { Language } from "@/data/types";

/**
 * A type that can either be a shared value T or a localized object { en: T, tr: T }.
 */
export type Poly<T> = T | { en: T; tr: T };

/**
 * Type guard to check if a value is a customized object with en/tr keys.
 * A heuristic check: must be an object and have 'en' and 'tr' properties.
 */
function isLocalized<T>(value: unknown): value is { en: T; tr: T } {
    return typeof value === "object" && value !== null && "en" in value && "tr" in value;
}

/**
 * Resolves a polymorphic value to the specific language.
 * If the value is a localized object, returns the value for the given language.
 * If the value is a shared value (primitive or non-localized object), returns it as is.
 */
export function resolvePoly<T>(value: Poly<T>, lang: Language): T {
    if (isLocalized<T>(value)) {
        return value[lang];
    }
    return value as T;
}
