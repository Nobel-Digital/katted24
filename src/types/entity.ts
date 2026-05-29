export type Locale = "et" | "en_EE" | "ru";

export const LOCALES: Locale[] = ["et", "en_EE", "ru"];

export type YextImageRef = {
  url: string;
  width?: number;
  height?: number;
  alternateText?: string;
};

/** Yext image fields wrap the actual image one level deep under `.image`. */
export type YextImage = { image: YextImageRef };

/** A complex image inside a photo-gallery list field (image + optional caption). */
export type YextGalleryItem = { image: YextImageRef; description?: string };

export type YextAddress = {
  line1?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  countryCode?: string;
};

/**
 * The `location` entity once the Yext stream resolves. Every viewable on-site
 * string is a custom field; repeating items are parallel string lists zipped at
 * render time (structs are unavailable on this tier).
 */
export type Katted24Entity = {
  // Built-in identity
  id: string;
  name: string;
  slug?: string;
  address?: YextAddress;
  mainPhone?: string;
  emails?: string[];
  facebookPageUrl?: string;

  // Header / global CTAs
  c_navLabels: string[];
  c_ctaPrimaryLabel: string;
  c_ctaSecondaryLabel: string;

  // Hero (AVAVAADE)
  c_heroEyebrow: string;
  c_heroTitle: string;
  c_heroLede: string;
  c_heroImage?: YextImage;
  c_heroMetaKicker: string;
  c_heroMetaNum: string;
  c_heroMetaSub: string;

  // Trust strip
  c_trustLabels: string[];
  c_trustValues: string[];

  // Value props (VAADE2)
  c_valuePropsHeading: string;
  c_valuePropTitles: string[];
  c_valuePropBodies: string[];

  // Use cases (VAADE3)
  c_useCasesEyebrow: string;
  c_useCasesHeading: string;
  c_useCasesIntro: string;
  c_useCaseItems: string[];
  c_repairHeading: string;
  c_repairItems: string[];

  // Solutions (VAADE4) — 13 categories
  c_solutionsEyebrow: string;
  c_solutionsHeading: string;
  c_solutionsIntro: string;
  c_solutionTags: string[];
  c_solutionTitles: string[];
  c_solutionBodies: string[];

  // About (VAADE5)
  c_aboutEyebrow: string;
  c_aboutHeading: string;
  c_aboutBody: string;
  c_aboutPhoto?: YextImage;
  c_aboutPhotoTag: string;
  c_aboutSignatureName: string;
  c_aboutSignatureRole: string;
  c_aboutStatNums: string[];
  c_aboutStatLabels: string[];

  // Values (VAADE5 accordion)
  c_valuesHeading: string;
  c_valueTitles: string[];
  c_valueBodies: string[];

  // Inspiration (VAADE6) — complex photo gallery
  c_inspirationEyebrow: string;
  c_inspirationHeading: string;
  c_inspirationIntro: string;
  c_inspirationGallery?: YextGalleryItem[];

  // FAQ (VAADE7)
  c_faqEyebrow: string;
  c_faqHeading: string;
  c_faqIntro: string;
  c_faqQuestions: string[];
  c_faqAnswers: string[];

  // Inquiry form (VAADE8)
  c_formEyebrow: string;
  c_formTitle: string;
  c_formLede: string;
  c_formBulletTitles: string[];
  c_formBulletBodies: string[];
  c_testimonialQuote: string;
  c_testimonialName: string;
  c_testimonialMeta: string;
  c_testimonialLocation: string;
  c_formCardHead: string;
  c_formStepPill: string;
  c_formGroupLabels: string[];
  c_formProductTypeLabel: string;
  c_formProductTypeOptions: string[];
  c_formFieldLabels: string[];
  c_formFieldPlaceholders: string[];
  c_formOptionalLabel: string;
  c_formValidationMessages: string[];
  c_formFootHelp: string;
  c_formSubmitIdle: string;
  c_formSubmitBusy: string;
  c_formSuccessTitle: string;
  c_formSuccessBody: string;
  c_formSuccessRowTitles: string[];
  c_formSuccessRowBodies: string[];
  c_formSuccessCardTitle: string;
  c_formSuccessCardBody: string;
  c_formSuccessAgain: string;

  // Team (VAADE9)
  c_teamEyebrow: string;
  c_teamHeading: string;
  c_teamIntro: string;
  c_teamNames: string[];
  c_teamRoles: string[];

  // Map (VAADE10)
  c_mapEmbedUrl: string;

  // Careers (VAADE11)
  c_careersEyebrow: string;
  c_careersHeading: string;
  c_careersBody: string;
  c_careersEmail: string;

  // Contact
  c_contactEyebrow: string;
  c_contactHeading: string;
  c_contactIntro: string;
  c_contactCallLabel: string;
  c_contactRowKeys: string[];
  c_contactRowValues: string[];
  c_contactRowSmall: string[];

  // Footer
  c_footerTagline: string;
  c_footerColHeadings: string[];
  c_footerLegalLine: string;
  c_footerLegalLinks: string[];

  // SEO / schema
  c_metaDescription: string;
  c_ogImage?: YextImage;
  c_favicon?: YextImage;
  c_keywords: string[];
  c_yearsExperience: string;
  c_foundingYear: string;

  // GDPR policy + consent chrome
  c_privacyPolicyContent: string;
  c_cookiesContent: string;
  c_cookieHeading: string;
  c_cookieBody: string;
  c_cookieAcceptLabel: string;
  c_cookieRejectLabel: string;
  c_cookieLearnMore: string;
  c_policyHeading: string;
  c_policyPrivacyTab: string;
  c_policyCookiesTab: string;
  c_policyClose: string;

  meta: { locale: Locale; id?: string };
};

/** Zip a record-of-parallel-arrays into an array of records. */
export function zipParallel<T extends Record<string, readonly unknown[]>>(
  columns: T,
): Array<{ [K in keyof T]: T[K][number] }> {
  const keys = Object.keys(columns) as Array<keyof T>;
  const length = Math.max(0, ...keys.map((k) => columns[k]?.length ?? 0));
  return Array.from({ length }, (_, i) => {
    const row = {} as { [K in keyof T]: T[K][number] };
    for (const k of keys) row[k] = columns[k]?.[i];
    return row;
  });
}
