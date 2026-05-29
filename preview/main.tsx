import { useState, useCallback } from "react";
import type { MouseEvent } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { Page } from "@/components/Page";
import type { Katted24Entity, Locale } from "@/types/entity";
import etData from "@data/katted24_et.json";
import enData from "@data/katted24_en_EE.json";
import ruData from "@data/katted24_ru.json";

const DATA: Record<Locale, Katted24Entity> = {
  et: etData as unknown as Katted24Entity,
  en_EE: enData as unknown as Katted24Entity,
  ru: ruData as unknown as Katted24Entity,
};
const LOCALE_FROM_HREF: Record<string, Locale> = { "/": "et", "/en": "en_EE", "/ru": "ru" };

function Preview() {
  const [locale, setLocale] = useState<Locale>("et");

  // In-page locale links (header/footer) point at /, /en, /ru — intercept them
  // so the preview swaps fixtures instead of navigating away.
  const onClickCapture = useCallback((e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href in LOCALE_FROM_HREF) {
      e.preventDefault();
      setLocale(LOCALE_FROM_HREF[href]);
      window.scrollTo({ top: 0 });
    }
  }, []);

  return (
    <div onClickCapture={onClickCapture}>
      <Page entity={DATA[locale]} locale={locale} />
    </div>
  );
}

// Reuse the root across Vite HMR updates (avoids "createRoot called twice").
const container = document.getElementById("root")!;
const g = window as unknown as { __previewRoot?: ReturnType<typeof createRoot> };
const root = g.__previewRoot ?? (g.__previewRoot = createRoot(container));
root.render(<Preview />);
