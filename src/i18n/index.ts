import type { Locale } from "@/types/entity";

// Per the client directive, all *viewable content* lives in Yext. This file holds
// only non-content functional strings (accessibility labels + tiny UI affordances).
export const LANG_LABELS: Record<Locale, string> = {
  et: "Eesti",
  en_EE: "English",
  ru: "Русский",
};

export const FLAG_CLASS: Record<Locale, string> = {
  et: "flag-et",
  en_EE: "flag-en",
  ru: "flag-ru",
};

// Short label shown in the header pill (ET / EN / RU, not EN_EE).
export const LANG_SHORT: Record<Locale, string> = {
  et: "ET",
  en_EE: "EN",
  ru: "RU",
};

type UiStrings = {
  scroll: string;
  readMore: string;
  readLess: string;
  menu: string;
  language: string;
  sections: string;
};

const UI: Record<Locale, UiStrings> = {
  et: { scroll: "Keri alla", readMore: "Loe rohkem", readLess: "Sulge", menu: "Menüü", language: "Keel", sections: "Sektsioonid" },
  en_EE: { scroll: "Scroll", readMore: "Read more", readLess: "Close", menu: "Menu", language: "Language", sections: "Sections" },
  ru: { scroll: "Прокрутите", readMore: "Подробнее", readLess: "Свернуть", menu: "Меню", language: "Язык", sections: "Разделы" },
};

export function ui(locale: Locale): UiStrings {
  return UI[locale] ?? UI.et;
}
