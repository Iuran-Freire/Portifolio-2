"use client";
import UserCursor from "@/components/UserCursor";
import AboutJourney from "@/components/AboutJourney";
import TechnologyStack from "@/components/TechnologyStack";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import { getStack } from "@/data/stack";
import { PortfolioHeader } from "./PortfolioHeader";
import { PortfolioFooter } from "./PortfolioFooter";
import { HeroSection } from "./HeroSection";
import { ContactSection } from "./ContactSection";
import { SectionHeading } from "./SectionHeading";
import { usePortfolioScroll } from "./usePortfolioScroll";
import type { PortfolioProps } from "./types";
import { translate } from "./translate";
import s from "./Portfolio.module.css";
export function Portfolio({ dictionary: d, language }: PortfolioProps) {
  const t = translate(language);
  const ptBR = language === "pt";
  const stack = getStack(language);
  const active = usePortfolioScroll(language);
  return (
    <div className={s.site}>
      <UserCursor />
      <a className={s.skip} href="#conteudo">
        {t("Pular para o conteúdo", "Skip to content")}
      </a>
      <PortfolioHeader dictionary={d} language={language} active={active} />
      <main id="conteudo">
        <HeroSection dictionary={d} language={language} />
        <section id="sobre" className={s.section}>
          <SectionHeading
            number="02"
            label={t("Sobre", "About")}
            title={t(
              "Da rotina industrial à construção de software.",
              "From industrial routines to building software.",
            )}
          />
          <AboutJourney dictionary={d} language={language} />
        </section>
        <section id="habilidades" className={s.section}>
          <SectionHeading
            number="03"
            label="Stack"
            title={t(
              "As ferramentas por trás das soluções.",
              "The tools behind the solutions.",
            )}
          />
          <TechnologyStack groups={stack} portuguese={ptBR} />
        </section>
        <section id="projetos" className={s.section}>
          <SectionHeading
            number="04"
            label={t("Projetos", "Projects")}
            title={t(
              "Código aplicado a problemas reais.",
              "Code applied to real problems.",
            )}
          />
          <ProjectShowcase dictionary={d} language={language} />
        </section>
        <ContactSection dictionary={d} language={language} />
      </main>
      <PortfolioFooter dictionary={d} language={language} />
    </div>
  );
}
