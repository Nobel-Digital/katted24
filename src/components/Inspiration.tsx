import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Katted24Entity } from "@/types/entity";

type Props = { entity: Katted24Entity };

export function Inspiration({ entity }: Props) {
  const gallery = entity.c_inspirationGallery ?? [];
  const [index, setIndex] = useState(-1);

  const slides = gallery
    .filter((g) => g.image?.url)
    .map((g) => ({ src: g.image!.url, alt: g.description ?? "" }));

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
            <div className="insp-item" key={i} onClick={() => setIndex(i)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setIndex(i)}>
              <div className="insp-bg" style={{ backgroundImage: `url("${g.image?.url}")` }} />
              <div className="insp-shade" />
              {g.description && <div className="insp-cap">{g.description}</div>}
            </div>
          ))}
        </div>
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  );
}
