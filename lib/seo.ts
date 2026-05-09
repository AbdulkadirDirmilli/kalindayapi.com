import type { Metadata } from 'next';
import {
  locales,
  defaultLocale,
  getLocalizedRoute,
  type Locale,
} from './i18n/config';

export const SITE_URL = 'https://www.kalindayapi.com';

/**
 * Build a full localized URL for a logical path (Turkish-original slugs) + locale.
 * Homepage (empty path) → `${SITE_URL}/${locale}` (no trailing slash).
 * Per-segment slugs are translated via `getLocalizedRoute`; dynamic segments (slugs
 * not present in the translation map) pass through unchanged.
 */
export function buildLocalizedUrl(logicalPath: string, locale: Locale): string {
  const segments = (logicalPath || '').split('/').filter(Boolean);
  if (segments.length === 0) return `${SITE_URL}/${locale}`;
  const localized = segments.map((s) => getLocalizedRoute(s, locale));
  return `${SITE_URL}/${locale}/${localized.join('/')}`;
}

/**
 * Produce the `alternates` field for Next.js Metadata, with a self-referencing
 * canonical URL + per-locale hreflang map + x-default.
 *
 * @param logicalPath - The logical path (e.g., '/blog/my-post')
 * @param currentLocale - The current locale
 * @param availableLocales - Optional array of locales that have translations.
 *                           If not provided, all locales are included.
 *                           Use this for dynamic content (blog, ilanlar, hizmetler)
 *                           to only include locales that actually have translations.
 */
export function buildSeoAlternates(
  logicalPath: string,
  currentLocale: Locale,
  availableLocales?: Locale[],
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  const targetLocales = availableLocales || locales;

  for (const l of targetLocales) {
    languages[l] = buildLocalizedUrl(logicalPath, l);
  }

  // x-default: prefer defaultLocale if available, otherwise use currentLocale
  if (targetLocales.includes(defaultLocale)) {
    languages['x-default'] = languages[defaultLocale];
  } else if (targetLocales.length > 0) {
    languages['x-default'] = languages[targetLocales[0]];
  }

  return {
    canonical: buildLocalizedUrl(logicalPath, currentLocale),
    languages,
  };
}

/** Narrow an untrusted `lang` route param to a valid Locale (fallback: default). */
export function resolveLocale(lang: string | undefined): Locale {
  return lang && (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : defaultLocale;
}
