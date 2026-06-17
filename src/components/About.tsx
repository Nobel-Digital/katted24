import { useState } from "react";
import type { Katted24Entity } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity };

export function About({ entity }: Props) {
  const photo = entity.c_aboutPhoto?.image?.url;
  const stats = zipParallel({ num: entity.c_aboutStatNums, label: entity.c_aboutStatLabels });
  const values = zipParallel({ title: entity.c_valueTitles, body: entity.c_valueBodies });
  const paras = entity.c_aboutBody.split(/\n\n+/);
  const [open, setOpen] = useState(0);

  return (
    <section className="section-pad" id="about" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="about-grid">
          <div className="about-photo">
            {photo && (
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url("${photo}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,18,28,0) 30%, rgba(11,18,28,0.65) 100%)" }} />
            <div className="about-photo-tag"><span className="dot" />{entity.c_aboutPhotoTag}</div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">{entity.c_aboutEyebrow}</span>
            <h2 style={{ marginTop: 18 }}>{entity.c_aboutHeading}</h2>
            {paras.map((p, i) => (<p key={i} style={i === 0 ? { marginTop: 28 } : undefined}>{p}</p>))}
            <div className="signature">
              <span className="scribble">{entity.c_aboutSignatureName}</span>
              <span>{entity.c_aboutSignatureRole}</span>
            </div>
            <div className="about-stats">
              {stats.map((s, i) => (
                <div className="stat" key={i}>
                  <div className="num"><span className="serif">{s.num}</span></div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <h2 style={{ marginBottom: 28, fontSize: "clamp(28px,3.4vw,44px)" }}>{entity.c_valuesHeading}</h2>
          <div className="acc">
            {values.map((v, i) => {
              const isOpen = open === i;
              return (
                <div className={`acc-item ${isOpen ? "open" : ""}`} key={i}>
                  <button className="acc-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="acc-title">{v.title}</span>
                    <span className="acc-sign"><Icon.plus style={{ width: 18, height: 18 }} /></span>
                  </button>
                  <div className="acc-body"><div className="acc-body-inner">{v.body}</div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
