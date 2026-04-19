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
 */
export function buildSeoAlternates(
  logicalPath: string,
  currentLocale: Locale,
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = buildLocalizedUrl(logicalPath, l);
  languages['x-default'] = languages[defaultLocale];

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
