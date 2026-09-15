import { GTM_ID } from "@/lib/gtm";

/**
 * GTM's <noscript> fallback. PagesJS generates the document, so there is no raw
 * <body> tag to paste this after — it goes in as the first child of the shared
 * layout instead.
 */
export function GtmNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
