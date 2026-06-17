import type { Katted24Entity } from "@/types/entity";
import { zipParallel } from "@/types/entity";

type Props = { entity: Katted24Entity };

export function ValueProps({ entity }: Props) {
  const items = zipParallel({ title: entity.c_valuePropTitles, body: entity.c_valuePropBodies });
  return (
    <section className="vp-section section-pad">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>{entity.c_valuePropsHeading}</h2>
          </div>
        </div>
        <div className="vp-grid">
          {items.map((it, i) => (
            <div className="vp-card" key={i}>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
