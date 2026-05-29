import type { Katted24Entity } from "@/types/entity";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity };

export function Careers({ entity }: Props) {
  return (
    <section className="section-pad" id="careers" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="careers-band">
          <div>
            <span className="eyebrow on-dark">{entity.c_careersEyebrow}</span>
            <h2 style={{ marginTop: 14 }}>{entity.c_careersHeading}</h2>
            <p>{entity.c_careersBody}</p>
          </div>
          <a href={`mailto:${entity.c_careersEmail}?subject=CV`} className="btn btn-primary btn-lg">
            {entity.c_careersEmail}
            <Icon.arrow className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
