import type { Katted24Entity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { ui } from "@/i18n";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity; locale: Locale };

export function Hero({ entity, locale }: Props) {
  const s = ui(locale);
  const heroUrl = entity.c_heroImage?.image?.url;
  const trust = zipParallel({ label: entity.c_trustLabels, value: entity.c_trustValues });

  return (
    <section className="hero" id="top">
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(60% 80% at 70% 60%, rgba(26,46,68,0.6), transparent 70%)${heroUrl ? `, url("${heroUrl}")` : ""}`,
        }}
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            {entity.c_heroEyebrow && (
              <span className="eyebrow on-dark">{entity.c_heroEyebrow}</span>
            )}
            <h1 style={{ marginTop: entity.c_heroEyebrow ? 18 : 0 }}>{entity.c_heroTitle}</h1>
            <p className="lede">{entity.c_heroLede}</p>
            <div className="hero-actions">
              <a href="#form" className="btn btn-primary btn-lg">
                {entity.c_ctaPrimaryLabel}
                <Icon.arrow className="arrow" />
              </a>
              <a href="#solutions" className="btn btn-ghost btn-lg">
                {entity.c_ctaSecondaryLabel}
                <Icon.arrow className="arrow" />
              </a>
            </div>
          </div>
          {entity.c_heroMetaKicker && (
            <div className="hero-meta">
              <div className="kicker">{entity.c_heroMetaKicker}</div>
              <div className="num">{entity.c_heroMetaNum}</div>
              <div className="num-sub">{entity.c_heroMetaSub}</div>
            </div>
          )}
        </div>
        <div className="trust-strip">
          {trust.map((t, i) => (
            <div key={i}>
              <span className="label">{t.label}</span>
              <span className="value">{t.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>{s.scroll}</span>
        <Icon.arrowDown style={{ width: 14, height: 14 }} />
      </div>
    </section>
  );
}
