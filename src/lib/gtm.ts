// Google Tag Manager container ID.
//
// The container is NOT injected through HeadConfig.other the way
// GTM_ON_YEXT_PAGES.md describes, because that renders at build time and cannot
// see consent. This site promises in its cookie notice — in every locale — that
// analytics does not start before the visitor accepts, and it already gates Yext
// Analytics on the same signal (AnalyticsProvider requireOptIn). So GTM is
// loaded client-side by <GoogleTagManager />, behind that same gate.
//
// If consent ever moves into the container itself (Cookiebot + Consent Mode),
// the guide's unconditional `other: GTM_HEAD_SNIPPET` approach becomes the
// right one again.

export const GTM_ID = "GTM-5BZ86CG";
