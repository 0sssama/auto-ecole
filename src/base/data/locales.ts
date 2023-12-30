export const DEFAULT_LOCALE = 'fr' as const;
export const locales = [DEFAULT_LOCALE, 'en'] as const;
export type Locale = (typeof locales)[number];
