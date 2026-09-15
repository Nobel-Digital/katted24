import type { Locale } from "@/types/entity";

// Per the client directive, all *viewable content* lives in Yext. This file holds
// only non-content functional strings (accessibility labels + tiny UI affordances).
export const LANG_LABELS: Record<Locale, string> = {
  et: "Eesti",
  en: "English",
  ru: "Русский",
  fi: "Suomi",
};

export const FLAG_CLASS: Record<Locale, string> = {
  et: "flag-et",
  en: "flag-en",
  ru: "flag-ru",
  fi: "flag-fi",
};

// Short label shown in the header pill (ET / EN / RU / FI).
export const LANG_SHORT: Record<Locale, string> = {
  et: "ET",
  en: "EN",
  ru: "RU",
  fi: "FI",
};

type UiStrings = {
  scroll: string;
  readMore: string;
  readLess: string;
  menu: string;
  language: string;
  sections: string;
  formNetworkError: string;
};

const UI: Record<Locale, UiStrings> = {
  et: { scroll: "Keri alla", readMore: "Loe rohkem", readLess: "Sulge", menu: "Menüü", language: "Keel", sections: "Sektsioonid", formNetworkError: "Vabandust, päringu saatmine ebaõnnestus. Palun proovi uuesti või helista meile otse." },
  en: { scroll: "Scroll", readMore: "Read more", readLess: "Close", menu: "Menu", language: "Language", sections: "Sections", formNetworkError: "Sorry, we couldn't send your request. Please try again or call us directly." },
  ru: { scroll: "Прокрутите", readMore: "Подробнее", readLess: "Свернуть", menu: "Меню", language: "Язык", sections: "Разделы", formNetworkError: "Извините, не удалось отправить запрос. Попробуйте ещё раз или позвоните нам напрямую." },
  fi: { scroll: "Vieritä alas", readMore: "Lue lisää", readLess: "Sulje", menu: "Valikko", language: "Kieli", sections: "Osiot", formNetworkError: "Pahoittelut, pyynnön lähettäminen ei onnistunut. Yritä uudelleen tai soita meille suoraan." },
};

export function ui(locale: Locale): UiStrings {
  return UI[locale] ?? UI.et;
}
