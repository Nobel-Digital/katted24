import { Fragment } from "react";
import type { ReactNode } from "react";

/** Render plain text with markdown-style **bold** segments turned into <b>. */
export function renderBold(str: string): ReactNode[] {
  return str.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <b key={i}>{p.slice(2, -2)}</b>
      : <Fragment key={i}>{p}</Fragment>,
  );
}
