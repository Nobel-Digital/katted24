import type { Katted24Entity } from "@/types/entity";
import { zipParallel } from "@/types/entity";

type Props = { entity: Katted24Entity };

export function Team({ entity }: Props) {
  const members = zipParallel({ name: entity.c_teamNames, role: entity.c_teamRoles });
  return (
    <section className="section-pad" id="team" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line-2)" }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{entity.c_teamEyebrow}</span>
            <h2 style={{ marginTop: 18 }}>{entity.c_teamHeading}</h2>
          </div>
          <div className="sh-right">{entity.c_teamIntro}</div>
        </div>
        <div className="team-grid">
          {members.map((m, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">{(m.name ?? "K").slice(0, 1)}</div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
