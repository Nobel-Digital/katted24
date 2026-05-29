import type { Katted24Entity, Locale } from "@/types/entity";
import { Icon, Logo } from "./Icon";

const NAV_ANCHORS = ["#solutions", "#use-cases", "#inspiration", "#faq", "#about", "#contact"];
const telHref = (p?: string) => `tel:${(p ?? "").replace(/[^\d+]/g, "")}`;

function openPolicy(tab: "privacy" | "cookies") {
  window.dispatchEvent(new CustomEvent("katted24:policy", { detail: { tab } }));
}
function openCookieSettings() {
  window.dispatchEvent(new Event("katted24:cookie-settings"));
}

type Props = { entity: Katted24Entity; locale?: Locale };

export function Footer({ entity }: Props) {
  const addr = entity.address;
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo dark />
            <p style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.55, maxWidth: "36ch" }}>{entity.c_footerTagline}</p>
            {entity.facebookPageUrl && (
              <a href={entity.facebookPageUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
                <Icon.fb style={{ width: 16, height: 16 }} /> facebook.com/katted24
              </a>
            )}
          </div>
          <div>
            <h4>{entity.c_footerColHeadings[0]}</h4>
            <ul>
              {entity.c_navLabels.map((l, i) => (<li key={i}><a href={NAV_ANCHORS[i] ?? "#top"}>{l}</a></li>))}
              <li><a href="#form">{entity.c_ctaPrimaryLabel}</a></li>
            </ul>
          </div>
          <div>
            <h4>{entity.c_footerColHeadings[1]}</h4>
            <ul>
              <li><a href={telHref(entity.mainPhone)}>{entity.mainPhone}</a></li>
              <li><a href={`mailto:${entity.emails?.[0]}`}>{entity.emails?.[0]}</a></li>
              {addr && <li>{addr.line1}, {addr.city}</li>}
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{entity.c_footerLegalLine}</span>
          <span style={{ display: "flex", gap: 18 }}>
            {entity.c_footerLegalLinks.map((l, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => { e.preventDefault(); i === 2 ? openCookieSettings() : openPolicy(i === 0 ? "privacy" : "cookies"); }}
              >{l}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
