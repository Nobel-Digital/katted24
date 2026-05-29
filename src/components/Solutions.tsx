import { useState } from "react";
import type { Katted24Entity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity; locale: Locale };

export function Solutions({ entity }: Props) {
  const items = zipParallel({
    tag: entity.c_solutionTags,
    title: entity.c_solutionTitles,
    body: entity.c_solutionBodies,
  });
  const [open, setOpen] = useState(0);

  return (
    <section className="section-pad" id="solutions" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{entity.c_solutionsEyebrow}</span>
            <h2 style={{ marginTop: 18 }}>{entity.c_solutionsHeading}</h2>
          </div>
          <div className="sh-right">{entity.c_solutionsIntro}</div>
        </div>
        <div className="acc">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div className={`acc-item ${isOpen ? "open" : ""}`} key={i}>
                <button
                  className="acc-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="acc-tag">{it.tag}</span>
                  <span className="acc-title">{it.title}</span>
                  <span className="acc-sign"><Icon.plus style={{ width: 18, height: 18 }} /></span>
                </button>
                <div className="acc-body">
                  <div className="acc-body-inner">{it.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
