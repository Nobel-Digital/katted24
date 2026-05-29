import { useEffect, useState } from "react";
import type { Katted24Entity } from "@/types/entity";

type Tab = "privacy" | "cookies";
type Props = { entity: Katted24Entity };

export function PolicyDialog({ entity }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("privacy");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { tab?: Tab } | undefined;
      setTab(detail?.tab ?? "privacy");
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("katted24:policy", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("katted24:policy", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;
  const body = tab === "privacy" ? entity.c_privacyPolicyContent : entity.c_cookiesContent;

  return (
    <div className="policy-overlay" role="dialog" aria-modal="true" aria-label={entity.c_policyHeading} onClick={() => setOpen(false)}>
      <div className="policy-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="policy-head">
          <h3>{entity.c_policyHeading}</h3>
          <button className="policy-close" onClick={() => setOpen(false)} aria-label={entity.c_policyClose}>✕</button>
        </div>
        <div className="policy-tabs" role="tablist">
          <button role="tab" aria-selected={tab === "privacy"} className={tab === "privacy" ? "active" : ""} onClick={() => setTab("privacy")}>{entity.c_policyPrivacyTab}</button>
          <button role="tab" aria-selected={tab === "cookies"} className={tab === "cookies" ? "active" : ""} onClick={() => setTab("cookies")}>{entity.c_policyCookiesTab}</button>
        </div>
        <div className="policy-body">{body}</div>
      </div>
    </div>
  );
}
