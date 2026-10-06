// Componentes reutilizáveis responsáveis pelas animações.
import { FadeIn } from "@/components/animations/FadeIn";
import DotField from "@/components/react-bits/DotField";
import { GradientText } from "@/components/react-bits/GradientText";
import { SpecularLink } from "@/components/react-bits/SpecularLink";
import { StarLink } from "@/components/ui/StarLink";

import type { pt } from "@/dictionaries/pt";

type HeroProps = {
  content: typeof pt.hero;
};

export function Hero({ content }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      {/* O contêiner ocupa toda a área do Hero */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          bulgeStrength={67}
          glowRadius={160}
        />
      </div>

      {/* Mantém o conteúdo acima do fundo animado */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-28 pt-32 sm:px-6 sm:py-24">
        {/* Cada FadeIn controla o momento de entrada do elemento */}
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-400 sm:text-sm sm:tracking-[0.3em]">
            {content.introduction}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1
            className="hero-special-name mt-4 inline-block text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-7xl"
            data-text={`${content.firstName} ${content.lastName}`}
          >
            {content.firstName}{" "}
            <GradientText animationSpeed={7}>
              {content.lastName}
            </GradientText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="mt-5 text-xl font-medium leading-snug text-slate-300 sm:mt-6 sm:text-3xl">
            {content.role}
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:mt-6 sm:text-lg sm:leading-8">
            {content.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-8 flex flex-col gap-3 min-[420px]:flex-row sm:mt-10 sm:gap-4">
          <SpecularLink
            href="#projetos"
            className="justify-center px-6 py-3 text-center font-semibold"
          >
            {content.projectsButton}
          </SpecularLink>

          <StarLink
            href="#contato"
            className="w-full px-6 py-3 text-center font-semibold min-[420px]:w-auto"
          >
            {content.contactButton}
          </StarLink>
        </FadeIn>
      </div>
    </section>
  );
}

