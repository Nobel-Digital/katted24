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
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll-lock + Escape-to-close while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    if (menuOpen) window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="logo" aria-label="Katted24" onClick={closeMenu}><Logo logoUrl={entity.logo?.image?.url} /></a>
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
            <a href="#form" className="nav-cta" onClick={closeMenu}>
              <span>{entity.c_ctaPrimaryLabel}</span>
              <Icon.arrow className="arrow" />
            </a>
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((m) => !m)}
            ><span /></button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label={entity.name}>
          <nav className="mobile-menu-links" aria-label={entity.name}>
            {entity.c_navLabels.map((label, i) => (
              <a key={i} href={NAV_ANCHORS[i] ?? "#top"} onClick={closeMenu}>{label}</a>
            ))}
          </nav>
          <div className="mobile-menu-lang" role="tablist" aria-label="Language">
            {LANG_ORDER.map((code) => (
              <a
                key={code}
                role="tab"
                aria-selected={locale === code}
                href={LOCALE_HREF[code]}
                className={`mobile-lang-btn ${locale === code ? "active" : ""}`}
                onClick={closeMenu}
              >
                <span className={`flag ${FLAG_CLASS[code]}`} aria-hidden="true" />
                <span className="mobile-lang-code">{LANG_SHORT[code]}</span>
                <span className="mobile-lang-name">{LANG_LABELS[code]}</span>
              </a>
            ))}
          </div>
          <a href="#form" className="btn btn-dark btn-lg mobile-menu-cta" onClick={closeMenu}>
            {entity.c_ctaPrimaryLabel}
            <Icon.arrow className="arrow" />
          </a>
        </div>
      )}
    </>
  );
}
