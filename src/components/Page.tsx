import type { Katted24Entity, Locale } from "@/types/entity";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ValueProps } from "./ValueProps";
import { UseCases } from "./UseCases";
import { Solutions } from "./Solutions";
import { About } from "./About";
import { Inspiration } from "./Inspiration";
import { Faq } from "./Faq";
import { QuoteForm } from "./QuoteForm";
import { Contact } from "./Contact";
import { Careers } from "./Careers";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { Icon } from "./Icon";

type Props = { entity: Katted24Entity; locale: Locale };

export function Page({ entity, locale }: Props) {
  return (
    <div className="min-h-screen">
      <Header entity={entity} locale={locale} />
      <main>
        <Hero entity={entity} locale={locale} />
        <ValueProps entity={entity} />
        <UseCases entity={entity} />
        <Solutions entity={entity} locale={locale} />
        <About entity={entity} />
        <Inspiration entity={entity} />
        <Faq entity={entity} />
        <QuoteForm entity={entity} />
        <Contact entity={entity} />
        <Careers entity={entity} />
      </main>
      <Footer entity={entity} locale={locale} />
      <CookieBanner entity={entity} />
      <a href="#form" className="float-call" aria-label={entity.c_ctaPrimaryLabel}>
        <Icon.arrow style={{ width: 16, height: 16 }} />
        {entity.c_ctaPrimaryLabel}
      </a>
    </div>
  );
}
