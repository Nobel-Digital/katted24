import type { Katted24Entity, Locale } from "@/types/entity";

export const SITE_DOMAIN = "https://katted24.ee";

// Locale → URL path segment (kept clean: en_EE → /en, ru → /ru).
const URL_PATH: Record<Locale, string> = { et: "", en_EE: "en", ru: "ru" };

/** Absolute canonical URL for this locale's page. */
export function canonicalUrl(locale: Locale): string {
  const path = URL_PATH[locale];
  return path ? `${SITE_DOMAIN}/${path}` : `${SITE_DOMAIN}/`;
}

function sameAs(entity: Katted24Entity): string[] {
  return [entity.facebookPageUrl].filter(Boolean) as string[];
}

function postalAddress(entity: Katted24Entity) {
  const a = entity.address ?? {};
  return {
    "@type": "PostalAddress",
    streetAddress: a.line1,
    addressLocality: a.city ?? "Tallinn",
    postalCode: a.postalCode,
    addressCountry: a.countryCode ?? "EE",
  };
}

/** schema.org LocalBusiness — the workshop. */
export function localBusinessSchema(entity: Katted24Entity, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: entity.name,
    description: entity.c_metaDescription,
    url: canonicalUrl(locale),
    telephone: entity.mainPhone,
    email: entity.emails?.[0],
    image: entity.c_heroImage?.image?.url ?? entity.c_ogImage?.image?.url,
    address: postalAddress(entity),
    foundingDate: entity.c_foundingYear,
    knowsAbout: entity.c_keywords ?? [],
    areaServed: "Estonia",
    sameAs: sameAs(entity),
  };
}

/** schema.org Organization. */
export function organizationSchema(entity: Katted24Entity) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: entity.name,
    url: SITE_DOMAIN,
    logo: entity.c_ogImage?.image?.url,
    email: entity.emails?.[0],
    sameAs: sameAs(entity),
  };
}

/** schema.org WebSite — declares locales. */
export function websiteSchema(entity: Katted24Entity) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: entity.name,
    url: SITE_DOMAIN,
    inLanguage: ["et", "en-EE", "ru"],
  };
}

export function allSchemas(entity: Katted24Entity, locale: Locale) {
  return [localBusinessSchema(entity, locale), organizationSchema(entity), websiteSchema(entity)];
}
