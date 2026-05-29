import { useEffect, useState } from "react";
import type { Katted24Entity, Locale } from "@/types/entity";
import { LANG_LABELS, FLAG_CLASS, LANG_SHORT } from "@/i18n";
import { Icon, Logo } from "./Icon";

const NAV_ANCHORS = ["#solutions", "#use-cases", "#inspiration", "#faq", "#about", "#contact"];
const LOCALE_HREF: Record<Locale, string> = { et: "/", en_EE: "/en", ru: "/ru" };
const LANG_ORDER: Locale[] = ["et", "en_EE", "ru"];

type Props = { entity: Katted24Entity; locale: Locale };

export function Header({ entity, locale }: Props) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="logo" aria-label="Katted24"><Logo /></a>
        <nav className="nav-links" aria-label={entity.name}>
          {entity.c_navLabels.map((label, i) => (
            <a key={i} href={NAV_ANCHORS[i] ?? "#top"}>{label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang-switch" role="tablist" aria-label="Language">
            {LANG_ORDER.map((code) => (
              <a
                key={code}
                role="tab"
                aria-selected={locale === code}
                href={LOCALE_HREF[code]}
                className={`lang-btn ${locale === code ? "active" : ""}`}
                title={LANG_LABELS[code]}
              >
                <span className={`flag ${FLAG_CLASS[code]}`} aria-hidden="true" />
                {LANG_SHORT[code]}
              </a>
            ))}
          </div>
          <a href="#form" className="nav-cta">
            <span>{entity.c_ctaPrimaryLabel}</span>
            <Icon.arrow className="arrow" />
          </a>
          <button className="hamburger" aria-label="Menu"><span /></button>
        </div>
      </div>
    </header>
  );
}
