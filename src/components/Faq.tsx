import { useState } from "react";
import type { Katted24Entity } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity };

export function Faq({ entity }: Props) {
  const items = zipParallel({ q: entity.c_faqQuestions, a: entity.c_faqAnswers });
  const [open, setOpen] = useState(0);

  return (
    <section className="section-pad" id="faq" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line-2)" }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{entity.c_faqEyebrow}</span>
            <h2 style={{ marginTop: 18 }}>{entity.c_faqHeading}</h2>
          </div>
          <div className="sh-right">{entity.c_faqIntro}</div>
        </div>
        <div className="acc">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div className={`acc-item ${isOpen ? "open" : ""}`} key={i}>
                <button className="acc-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="acc-title">{it.q}</span>
                  <span className="acc-sign"><Icon.plus style={{ width: 18, height: 18 }} /></span>
                </button>
                <div className="acc-body"><div className="acc-body-inner">{it.a}</div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
