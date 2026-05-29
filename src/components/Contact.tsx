import type { Katted24Entity } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity };

export function Contact({ entity }: Props) {
  const rows = zipParallel({ k: entity.c_contactRowKeys, v: entity.c_contactRowValues, small: entity.c_contactRowSmall });
  return (
    <section className="contact-section section-pad" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{entity.c_contactEyebrow}</span>
            <h2 style={{ marginTop: 18 }}><span className="serif">{entity.c_contactHeading}</span></h2>
          </div>
          <div className="sh-right">{entity.c_contactIntro}</div>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <a href="#form" className="contact-call">
              <div>
                <div className="num">{entity.c_ctaPrimaryLabel}</div>
                <div className="lbl">{entity.c_contactCallLabel}</div>
              </div>
              <Icon.arrow style={{ width: 20, height: 20 }} />
            </a>
            <div className="contact-list">
              {rows.map((r, i) => (
                <div className="contact-row" key={i}>
                  <span className="k">{r.k}</span>
                  <span className="v">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="map-card">
            {entity.c_mapEmbedUrl && (
              <iframe src={entity.c_mapEmbedUrl} title={entity.name} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
