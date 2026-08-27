import type { Katted24Entity, Locale } from "@/types/entity";
import { ui } from "@/i18n";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity; locale: Locale };

export function Hero({ entity, locale }: Props) {
  const s = ui(locale);
  const heroUrl = entity.c_heroImage?.image?.url;

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
            <h1>{entity.c_heroTitle}</h1>
            <p className="lede">{entity.c_heroLede}</p>
            <div className="hero-actions">
              <a href={entity.c_ctaPrimary?.uRL ?? "#form"} className="btn btn-primary">
                {entity.c_ctaPrimary?.label}
                <Icon.arrow className="arrow" />
              </a>
              <a href={entity.c_ctaSecondary?.uRL ?? "#solutions"} className="btn btn-ghost">
                {entity.c_ctaSecondary?.label}
                <Icon.arrow className="arrow" />
              </a>
            </div>
          </div>
        </div>
        <div className="trust-strip">
          {entity.c_trustValues.map((value, i) => (
            <div key={i}>
              <span className="value">{value}</span>
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
