import { useEffect } from "react";
import { CONSENT_VERSION } from "@/hooks/useConsent";
import { GTM_ID } from "@/lib/gtm";

const SCRIPT_ID = "gtm-container";
const KEY = "katted24.consent";

function hasAccepted(): boolean {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return r?.status === "accepted" && r?.version === CONSENT_VERSION;
  } catch {
    return false;
  }
}

function loadGtm() {
  if (!GTM_ID || document.getElementById(SCRIPT_ID)) return;

  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/**
 * Loads Google Tag Manager, but only once the visitor has accepted cookies.
 *
 * Deliberately does NOT use the useConsent hook: each useConsent() call owns
 * its own useState and only listens for "katted24:cookie-settings", so it never
 * hears the accept that CookieBanner performs. This mirrors
 * ConsentAnalyticsBridge instead — read localStorage, then listen for the
 * "katted24:consent" event — which is the pattern that actually works here.
 *
 * No <noscript> iframe counterpart: it could not be gated (no JS means no
 * consent UI), so it would load GTM for exactly the visitors who were never
 * asked.
 *
 * Note: GTM cannot be unloaded. Revoking consent stops it loading on the next
 * page view; it does not tear down an already-loaded container.
 */
export function GoogleTagManager() {
  useEffect(() => {
    if (hasAccepted()) loadGtm();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail?.status === "accepted") loadGtm();
    };
    window.addEventListener("katted24:consent", onConsent);
    return () => window.removeEventListener("katted24:consent", onConsent);
  }, []);

  return null;
}
