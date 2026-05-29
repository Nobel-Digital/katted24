import { useCallback, useEffect, useState } from "react";

// Bump when the privacy/cookies text materially changes — forces re-consent.
export const CONSENT_VERSION = 1;
const KEY = "katted24.consent";

export type ConsentStatus = "accepted" | "rejected" | null;
type Record = { status: Exclude<ConsentStatus, null>; version: number; ts: number };

function read(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const r = JSON.parse(localStorage.getItem(KEY) ?? "null") as Record | null;
    if (r && r.version === CONSENT_VERSION) return r.status;
  } catch {
    /* ignore */
  }
  return null;
}

function persist(status: Exclude<ConsentStatus, null>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ status, version: CONSENT_VERSION, ts: Date.now() }));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("katted24:consent", { detail: { status } }));
}

export function useConsent() {
  const [status, setStatus] = useState<ConsentStatus>(null);

  useEffect(() => {
    setStatus(read());
    const onReset = () => {
      try { localStorage.removeItem(KEY); } catch { /* ignore */ }
      setStatus(null);
    };
    window.addEventListener("katted24:cookie-settings", onReset);
    return () => window.removeEventListener("katted24:cookie-settings", onReset);
  }, []);

  const accept = useCallback(() => { persist("accepted"); setStatus("accepted"); }, []);
  const reject = useCallback(() => { persist("rejected"); setStatus("rejected"); }, []);

  return { status, accept, reject };
}
