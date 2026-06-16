import type { Katted24Entity } from "@/types/entity";

type Props = { entity: Katted24Entity };

export function Inspiration({ entity }: Props) {
  const gallery = entity.c_inspirationGallery ?? [];
  return (
    <section className="insp-section section-pad section-dark" id="inspiration">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow on-dark">{entity.c_inspirationEyebrow}</span>
            <h2 style={{ marginTop: 18 }}>{entity.c_inspirationHeading}</h2>
          </div>
          <div className="sh-right">{entity.c_inspirationIntro}</div>
        </div>
        <div className="insp-grid">
          {gallery.map((g, i) => (
            <div className="insp-item" key={i}>
              <div className="insp-bg" style={{ backgroundImage: `url("${g.image?.url}")` }} />
              <div className="insp-shade" />
              {g.description && <div className="insp-cap">{g.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
