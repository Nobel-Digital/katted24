import { useEffect } from "react";
import { CONSENT_VERSION } from "@/hooks/useConsent";
import { GTM_ID } from "@/lib/gtm";

const SCRIPT_ID = "gtm-container";
const KEY = "katted24.consent";
// GA4 sets _ga/_ga_<stream>; _gid/_gat are GA, _gcl_* is the Ads linker.
const GOOGLE_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gcl"];

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
 * Expire Google's cookies. They are set on the registrable domain, so clearing
 * them needs the same domain/path the writer used — hence the several attempts.
 */
function clearGoogleCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => GOOGLE_COOKIE_PREFIXES.some((p) => n.startsWith(p)));
  if (!names.length) return;

  const host = window.location.hostname;
  const domains = new Set([host, `.${host}`]);
  const parts = host.split(".");
  if (parts.length > 2) {
    const base = parts.slice(-2).join(".");
    domains.add(base);
    domains.add(`.${base}`);
  }
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`;
    }
  }
}

/**
 * Withdrawal. GTM cannot be unloaded once it is running, so the only honest way
 * to stop it mid-session is to drop the consent record, expire Google's cookies
 * and reload — which is what the certified CMPs do too. The consent record is
 * cleared here rather than relying on useConsent's own listener, because both
 * run on the same event and the reload must not race it.
 */
function withdraw() {
  const wasLoaded = !!document.getElementById(SCRIPT_ID);
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  clearGoogleCookies();
  if (wasLoaded) window.location.reload();
}

/**
 * Loads Google Tag Manager, but only once the visitor has accepted cookies, and
 * tears it back down when they withdraw.
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
 */
export function GoogleTagManager() {
  useEffect(() => {
    if (hasAccepted()) {
      loadGtm();
    } else {
      // Sweep up anything Google left behind: GA4 rewrites its session cookie
      // constantly, so one can survive the moment between withdrawing and the
      // reload. Without consent there should be none of these at all.
      clearGoogleCookies();
    }

    const onConsent = (e: Event) => {
      const status = (e as CustomEvent).detail?.status;
      if (status === "accepted") loadGtm();
      // "Decline" keeps its own record, so only the Google cookies go; nothing
      // is running at that point, so no reload is needed.
      else if (status === "rejected") clearGoogleCookies();
    };
    const onWithdraw = () => withdraw();

    window.addEventListener("katted24:consent", onConsent);
    window.addEventListener("katted24:cookie-settings", onWithdraw);
    return () => {
      window.removeEventListener("katted24:consent", onConsent);
      window.removeEventListener("katted24:cookie-settings", onWithdraw);
    };
  }, []);

  return null;
}
