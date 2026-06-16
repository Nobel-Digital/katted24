import type { Katted24Entity } from "@/types/entity";

type Props = { entity: Katted24Entity };

export function UseCases({ entity }: Props) {
  return (
    <section className="section-pad" id="use-cases" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{entity.c_useCasesEyebrow}</span>
            <h2 style={{ marginTop: 18 }}>{entity.c_useCasesHeading}</h2>
          </div>
          <div className="sh-right">{entity.c_useCasesIntro}</div>
        </div>
        <div className="chips">
          {entity.c_useCaseItems.map((item, i) => (
            <span className="chip" key={i}>{item}</span>
          ))}
        </div>
        <div className="usecase-repair">
          <h3>{entity.c_repairHeading}</h3>
          <div className="chips">
            {entity.c_repairItems.map((item, i) => (
              <span className="chip" key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
