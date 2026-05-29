import { useState, Fragment } from "react";
import type { Katted24Entity } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { Icon } from "./Icon";

// Code-side field order — content lists (c_formFieldLabels / placeholders) follow this order.
const FIELD_KEYS = ["width", "length", "height", "color", "deadline", "info", "name", "phone", "email", "files"] as const;
type FieldKey = (typeof FIELD_KEYS)[number];

function renderBold(str: string) {
  return str.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : <Fragment key={i}>{p}</Fragment>,
  );
}

type Props = { entity: Katted24Entity };

export function QuoteForm({ entity }: Props) {
  const label = (k: FieldKey) => entity.c_formFieldLabels[FIELD_KEYS.indexOf(k)] ?? k;
  const ph = (k: FieldKey) => entity.c_formFieldPlaceholders[FIELD_KEYS.indexOf(k)] ?? "";
  const V = {
    productType: entity.c_formValidationMessages[0],
    name: entity.c_formValidationMessages[1],
    phone: entity.c_formValidationMessages[2],
    email: entity.c_formValidationMessages[3],
    width: entity.c_formValidationMessages[4],
    length: entity.c_formValidationMessages[5],
  };

  const initial = { productType: "", width: "", length: "", height: "", color: "", deadline: "", info: "", name: "", phone: "", email: "" };
  const [v, setV] = useState<Record<string, string>>(initial);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!v.productType) e.productType = V.productType;
    if (!v.name.trim()) e.name = V.name;
    if (!/^[\d +()-]{6,}$/.test(v.phone.trim())) e.phone = V.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = V.email;
    if (!v.width) e.width = V.width;
    if (!v.length) e.length = V.length;
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const el = document.querySelector(`[name="${Object.keys(errs)[0]}"]`) as HTMLElement | null;
      el?.focus();
      return;
    }
    setBusy(true);
    setTimeout(() => { setBusy(false); setDone(true); }, 900);
  };

  const successRows = zipParallel({ b: entity.c_formSuccessRowTitles, t: entity.c_formSuccessRowBodies });
  const bullets = zipParallel({ b: entity.c_formBulletTitles, t: entity.c_formBulletBodies });

  if (done) {
    return (
      <section className="form-section section-pad" id="form">
        <div className="wrap"><div className="form-grid">
          <div className="form-side">
            <span className="eyebrow">{entity.c_formEyebrow}</span>
            <h2 style={{ marginTop: 18 }}><span className="serif">{entity.c_formSuccessTitle}</span></h2>
            <p className="lede" style={{ marginTop: 18 }}>{entity.c_formSuccessBody}</p>
            <ul className="form-bullets" style={{ marginTop: 28 }}>
              {successRows.map((r, i) => (
                <li key={i}>
                  <span className="check"><Icon.check /></span>
                  <span><b>{r.b}</b> {r.t} {i === 0 ? <b>{v.email}</b> : i === 1 ? <b>{v.phone}</b> : null}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-card"><div className="form-success">
            <div className="badge"><Icon.check style={{ width: 26, height: 26 }} /></div>
            <h3>{entity.c_formSuccessCardTitle}</h3>
            <p>{entity.c_formSuccessCardBody}</p>
            <button className="btn btn-dark" style={{ marginTop: 24 }} onClick={() => { setDone(false); setV(initial); }}>
              {entity.c_formSuccessAgain} <Icon.arrow className="arrow" />
            </button>
          </div></div>
        </div></div>
      </section>
    );
  }

  const fieldClass = (k: string) => `field ${errors[k] ? "has-error" : ""}`;
  const Err = ({ k }: { k: string }) => errors[k] ? <span className="err"><Icon.warning style={{ width: 13, height: 13 }} /> {errors[k]}</span> : null;
  const Opt = () => <span className="opt">{entity.c_formOptionalLabel}</span>;

  return (
    <section className="form-section section-pad" id="form">
      <div className="wrap"><div className="form-grid">
        <div className="form-side">
          <span className="eyebrow">{entity.c_formEyebrow}</span>
          <h2 style={{ marginTop: 18 }}><span className="serif">{entity.c_formTitle}</span></h2>
          <p className="lede" style={{ marginTop: 22 }}>{entity.c_formLede}</p>
          <ul className="form-bullets">
            {bullets.map((b, i) => (
              <li key={i}><span className="check"><Icon.check /></span><span><b>{b.b}</b> — {b.t}</span></li>
            ))}
          </ul>
          {entity.c_testimonialQuote && (
            <div className="testimonial">
              <div className="quote">"{entity.c_testimonialQuote}"</div>
              <div className="who">
                <div className="avatar">{entity.c_testimonialName.split(" ").map((s) => s[0]).join("")}</div>
                <div className="who-meta">
                  <b>{entity.c_testimonialName}</b> — {entity.c_testimonialMeta}<br />
                  {entity.c_testimonialLocation}
                </div>
              </div>
            </div>
          )}
        </div>

        <form className="form-card" onSubmit={onSubmit} noValidate>
          <div className="form-card-head">
            <h3>{entity.c_formCardHead}</h3>
            <span className="step-pill">{entity.c_formStepPill}</span>
          </div>

          <div className="field-group">
            <div className="field-group-label">{entity.c_formGroupLabels[0]}</div>
            <div className="field-row">
              <div className={fieldClass("productType")}>
                <label htmlFor="productType"><span>{entity.c_formProductTypeLabel}<span className="req">*</span></span></label>
                <select id="productType" name="productType" value={v.productType} onChange={update("productType")}>
                  {entity.c_formProductTypeOptions.map((opt, i) => (
                    <option key={i} value={i === 0 ? "" : opt}>{opt}</option>
                  ))}
                </select>
                <Err k="productType" />
              </div>
            </div>
            <div className="field-row cols-3" style={{ marginTop: 14 }}>
              {(["width", "length", "height"] as FieldKey[]).map((k) => (
                <div className={fieldClass(k)} key={k}>
                  <label htmlFor={k}><span>{label(k)}{k !== "height" ? <span className="req">*</span> : null}</span>{k === "height" ? <Opt /> : null}</label>
                  <input id={k} name={k} type="number" inputMode="decimal" value={v[k]} onChange={update(k)} placeholder={ph(k)} />
                  <span className="suffix">m</span>
                  <Err k={k} />
                </div>
              ))}
            </div>
            <div className="field-row cols-2" style={{ marginTop: 14 }}>
              {(["color", "deadline"] as FieldKey[]).map((k) => (
                <div className="field" key={k}>
                  <label htmlFor={k}><span>{label(k)}</span><Opt /></label>
                  <input id={k} name={k} type={k === "deadline" ? "date" : "text"} value={v[k]} onChange={update(k)} placeholder={ph(k)} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="field">
                <label htmlFor="info"><span>{label("info")}</span><Opt /></label>
                <textarea id="info" name="info" rows={4} value={v.info} onChange={update("info")} placeholder={ph("info")} />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="field">
                <label htmlFor="files"><span>{label("files")}</span><Opt /></label>
                <input id="files" name="files" type="file" multiple />
              </div>
            </div>
          </div>

          <div className="field-group">
            <div className="field-group-label">{entity.c_formGroupLabels[1]}</div>
            <div className="field-row">
              <div className={fieldClass("name")}>
                <label htmlFor="name"><span>{label("name")}<span className="req">*</span></span></label>
                <input id="name" name="name" type="text" autoComplete="name" value={v.name} onChange={update("name")} placeholder={ph("name")} />
                <Err k="name" />
              </div>
            </div>
            <div className="field-row cols-2">
              <div className={fieldClass("phone")}>
                <label htmlFor="phone"><span>{label("phone")}<span className="req">*</span></span></label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={update("phone")} placeholder={ph("phone")} />
                <Err k="phone" />
              </div>
              <div className={fieldClass("email")}>
                <label htmlFor="email"><span>{label("email")}<span className="req">*</span></span></label>
                <input id="email" name="email" type="email" autoComplete="email" value={v.email} onChange={update("email")} placeholder={ph("email")} />
                <Err k="email" />
              </div>
            </div>
          </div>

          <div className="form-foot">
            <p className="help">{renderBold(entity.c_formFootHelp)}</p>
            <button type="submit" className="submit-btn" disabled={busy}>
              {busy ? entity.c_formSubmitBusy : entity.c_formSubmitIdle}
              {!busy && <Icon.arrow style={{ width: 16, height: 16 }} className="arrow" />}
            </button>
          </div>
        </form>
      </div></div>
    </section>
  );
}
