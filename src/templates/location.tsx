import "../index.css";
import { useEffect } from "react";
import type {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { AnalyticsProvider, useAnalytics } from "@yext/pages-components";
import type { Katted24Entity, Locale } from "@/types/entity";
import { Page } from "@/components/Page";
import { allSchemas, canonicalUrl } from "@/lib/schema";

const ENTITY_ID = process.env.YEXT_PUBLIC_LOCATION_ENTITY_ID ?? "393880";
const LOCALES = (process.env.YEXT_PUBLIC_LOCATION_LOCALE_CODE ?? "et,en_EE,ru")
  .split(",").map((l) => l.trim()).filter(Boolean);
const EVENTS_API_KEY = process.env.YEXT_PUBLIC_EVENTS_API_KEY ?? "";

export const config: TemplateConfig = {
  name: "katted24-location",
  stream: {
    $id: "katted24-stream",
    filter: { entityIds: ENTITY_ID ? [ENTITY_ID] : [] },
    fields: [
      "id", "name", "slug", "address", "mainPhone", "emails", "facebookPageUrl",
      "c_navLabels", "c_ctaPrimaryLabel", "c_ctaSecondaryLabel",
      "c_heroEyebrow", "c_heroTitle", "c_heroLede", "c_heroImage", "c_heroMetaKicker", "c_heroMetaNum", "c_heroMetaSub",
      "c_trustLabels", "c_trustValues",
      "c_valuePropsHeading", "c_valuePropTitles", "c_valuePropBodies",
      "c_useCasesEyebrow", "c_useCasesHeading", "c_useCasesIntro", "c_useCaseItems", "c_repairHeading", "c_repairItems",
      "c_solutionsEyebrow", "c_solutionsHeading", "c_solutionsIntro", "c_solutionTags", "c_solutionTitles", "c_solutionBodies",
      "c_aboutEyebrow", "c_aboutHeading", "c_aboutBody", "c_aboutPhoto", "c_aboutPhotoTag", "c_aboutSignatureName", "c_aboutSignatureRole", "c_aboutStatNums", "c_aboutStatLabels",
      "c_valuesHeading", "c_valueTitles", "c_valueBodies",
      "c_inspirationEyebrow", "c_inspirationHeading", "c_inspirationIntro", "c_inspirationGallery",
      "c_faqEyebrow", "c_faqHeading", "c_faqIntro", "c_faqQuestions", "c_faqAnswers",
      "c_formEyebrow", "c_formTitle", "c_formLede", "c_formBulletTitles", "c_formBulletBodies",
      "c_testimonialQuote", "c_testimonialName", "c_testimonialMeta", "c_testimonialLocation",
      "c_formCardHead", "c_formStepPill", "c_formGroupLabels", "c_formProductTypeLabel", "c_formProductTypeOptions",
      "c_formFieldLabels", "c_formFieldPlaceholders", "c_formOptionalLabel", "c_formValidationMessages",
      "c_formFootHelp", "c_formSubmitIdle", "c_formSubmitBusy",
      "c_formSuccessTitle", "c_formSuccessBody", "c_formSuccessRowTitles", "c_formSuccessRowBodies", "c_formSuccessCardTitle", "c_formSuccessCardBody", "c_formSuccessAgain",
      "c_teamEyebrow", "c_teamHeading", "c_teamIntro", "c_teamNames", "c_teamRoles",
      "c_mapEmbedUrl",
      "c_careersEyebrow", "c_careersHeading", "c_careersBody", "c_careersEmail",
      "c_contactEyebrow", "c_contactHeading", "c_contactIntro", "c_contactCallLabel", "c_contactRowKeys", "c_contactRowValues", "c_contactRowSmall",
      "c_footerTagline", "c_footerColHeadings", "c_footerLegalLine", "c_footerLegalLinks",
      "c_metaDescription", "c_ogImage", "c_favicon", "c_keywords", "c_yearsExperience", "c_foundingYear",
      "c_privacyPolicyContent", "c_cookiesContent",
      "c_cookieHeading", "c_cookieBody", "c_cookieAcceptLabel", "c_cookieRejectLabel", "c_cookieLearnMore",
      "c_policyHeading", "c_policyPrivacyTab", "c_policyCookiesTab", "c_policyClose",
    ],
    localization: { locales: LOCALES, primary: false },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (document.slug) return document.slug;
  const locale = (document.meta?.locale ?? "et") as Locale;
  return locale === "et" ? "index" : `${locale}/${document.id}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({ document }): HeadConfig => {
  const doc = document as TemplateRenderProps["document"] & Katted24Entity;
  const locale = (doc.meta?.locale ?? "et") as Locale;
  const title = `${doc.name} — ${doc.c_heroTitle}`;
  const description = doc.c_metaDescription ?? "";
  const ogImage = doc.c_ogImage?.image?.url ?? doc.c_heroImage?.image?.url ?? "";
  const faviconUrl = doc.c_favicon?.image?.url;
  const schemas = allSchemas(doc, locale);
  const ogLocale = locale === "et" ? "et_EE" : locale === "ru" ? "ru_RU" : "en_EE";

  return {
    title,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    lang: locale,
    tags: [
      { type: "meta", attributes: { name: "description", content: description } },
      { type: "meta", attributes: { name: "robots", content: "index,follow" } },
      { type: "meta", attributes: { property: "og:title", content: title } },
      { type: "meta", attributes: { property: "og:description", content: description } },
      { type: "meta", attributes: { property: "og:type", content: "website" } },
      { type: "meta", attributes: { property: "og:url", content: canonicalUrl(locale) } },
      { type: "meta", attributes: { property: "og:locale", content: ogLocale } },
      ...(ogImage ? [{ type: "meta" as const, attributes: { property: "og:image", content: ogImage } }] : []),
      { type: "meta", attributes: { name: "twitter:card", content: "summary_large_image" } },
      { type: "meta", attributes: { name: "twitter:title", content: title } },
      ...(ogImage ? [{ type: "meta" as const, attributes: { name: "twitter:image", content: ogImage } }] : []),
      { type: "link", attributes: { rel: "canonical", href: canonicalUrl(locale) } },
      { type: "link", attributes: { rel: "alternate", hreflang: "et", href: canonicalUrl("et") } },
      { type: "link", attributes: { rel: "alternate", hreflang: "en-EE", href: canonicalUrl("en_EE") } },
      { type: "link", attributes: { rel: "alternate", hreflang: "ru", href: canonicalUrl("ru") } },
      { type: "link", attributes: { rel: "alternate", hreflang: "x-default", href: canonicalUrl("et") } },
      ...(faviconUrl ? [{ type: "link" as const, attributes: { rel: "icon", href: faviconUrl } }] : []),
      ...schemas.map((schema) => ({
        type: "script" as const,
        attributes: { type: "application/ld+json" },
        children: JSON.stringify(schema).replace(/</g, "\\u003c"),
      })),
    ],
  };
};

type Doc = TemplateRenderProps["document"] & Katted24Entity;

/** Bridges GDPR consent to Yext Analytics: opt in only once the user accepts. */
function ConsentAnalyticsBridge() {
  const analytics = useAnalytics();
  useEffect(() => {
    const check = () => {
      try {
        const r = JSON.parse(localStorage.getItem("katted24.consent") ?? "null");
        if (r?.status === "accepted") analytics?.optIn?.();
      } catch { /* ignore */ }
    };
    check();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail?.status === "accepted") analytics?.optIn?.();
    };
    window.addEventListener("katted24:consent", onConsent);
    return () => window.removeEventListener("katted24:consent", onConsent);
  }, [analytics]);
  return null;
}

const LocationTemplate = (props: TemplateRenderProps) => {
  const doc = props.document as Doc;
  const locale = (doc.meta?.locale ?? "et") as Locale;
  const page = <Page entity={doc} locale={locale} />;

  if (!EVENTS_API_KEY) return page;

  return (
    <AnalyticsProvider
      apiKey={EVENTS_API_KEY}
      templateData={props as never}
      currency="EUR"
      productionDomains={["katted24.ee"]}
      requireOptIn={true}
    >
      <ConsentAnalyticsBridge />
      {page}
    </AnalyticsProvider>
  );
};

export default LocationTemplate;
