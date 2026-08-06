import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Katted24Entity } from "@/types/entity";
import type { SolutionEntity } from "@/types/entity";
import { Icon } from "./Icon";

const THUMB_COUNT = 4;

type Props = { entity: Katted24Entity; locale: string };

function SolutionGallery({ solution }: { solution: SolutionEntity }) {
  const photos = solution.c_solutionGallery ?? [];
  const [lbIndex, setLbIndex] = useState(-1);

  if (photos.length === 0) return null;

  const slides = photos.map((p) => ({ src: p.url, alt: p.alternateText ?? "" }));
  const visible = photos.slice(0, THUMB_COUNT);
  const extra = photos.length - THUMB_COUNT;

  return (
    <div className="sol-gallery">
      {visible.map((p, i) => (
        <div
          key={i}
          className="sol-thumb"
          onClick={() => setLbIndex(i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setLbIndex(i)}
        >
          <div className="sol-thumb-bg" style={{ backgroundImage: `url("${p.url}")` }} />
          {i === THUMB_COUNT - 1 && extra > 0 && (
            <div className="sol-thumb-more">+{extra}</div>
          )}
        </div>
      ))}
      <Lightbox
        open={lbIndex >= 0}
        index={lbIndex}
        close={() => setLbIndex(-1)}
        slides={slides}
      />
    </div>
  );
}

export function Solutions({ entity }: Props) {
  const items = entity.c_solutions ?? [];
  const [open, setOpen] = useState(0);

  return (
    <section className="section-pad section-dark" id="solutions">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow on-dark">{entity.c_solutionsEyebrow}</span>
            <h2 style={{ marginTop: 18 }}>{entity.c_solutionsHeading}</h2>
          </div>
          <div className="sh-right">{entity.c_solutionsIntro}</div>
        </div>
        <div className="acc">
          {items.map((it, i) => {
            const isOpen = open === i;
            const tag = it.c_solutionTags?.[0] ?? "";
            const title = it.c_solutionTitles?.[0] ?? "";
            const body = it.c_solutionBodies?.[0] ?? "";
            return (
              <div className={`acc-item ${isOpen ? "open" : ""}`} key={it.id ?? i}>
                <button
                  className="acc-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="acc-tag">{tag}</span>
                  <span className="acc-title">{title}</span>
                  <span className="acc-sign"><Icon.plus style={{ width: 18, height: 18 }} /></span>
                </button>
                <div className="acc-body">
                  <div className="acc-body-inner">
                    {body}
                    <SolutionGallery solution={it} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
