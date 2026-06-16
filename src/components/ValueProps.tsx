import type { Katted24Entity } from "@/types/entity";
import { zipParallel } from "@/types/entity";

type Props = { entity: Katted24Entity };

export function ValueProps({ entity }: Props) {
  const items = zipParallel({ title: entity.c_valuePropTitles, body: entity.c_valuePropBodies });
  return (
    <section className="vp-section section-pad section-dark">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2><span className="serif">{entity.c_valuePropsHeading}</span></h2>
          </div>
        </div>
        <div className="vp-grid">
          {items.map((it, i) => (
            <div className="vp-card" key={i}>
              <span className="vp-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
