import type { Katted24Entity } from "@/types/entity";
import { useConsent } from "@/hooks/useConsent";
import { PolicyDialog } from "./PolicyDialog";

type Props = { entity: Katted24Entity };

function openCookiesPolicy() {
  window.dispatchEvent(new CustomEvent("katted24:policy", { detail: { tab: "cookies" } }));
}

export function CookieBanner({ entity }: Props) {
  const { status, accept, reject } = useConsent();

  return (
    <>
      {status === null && (
        <div className="cookie-banner" role="region" aria-label={entity.c_cookieHeading}>
          <div className="cookie-inner">
            <div className="cookie-text">
              <strong>{entity.c_cookieHeading}</strong>
              <p>
                {entity.c_cookieBody}{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); openCookiesPolicy(); }}>{entity.c_cookieLearnMore}</a>
              </p>
            </div>
            <div className="cookie-actions">
              <button className="cookie-btn cookie-reject" onClick={reject}>{entity.c_cookieRejectLabel}</button>
              <button className="cookie-btn cookie-accept" onClick={accept}>{entity.c_cookieAcceptLabel}</button>
            </div>
          </div>
        </div>
      )}
      <PolicyDialog entity={entity} />
    </>
  );
}
