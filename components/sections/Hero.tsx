// Componentes reutilizáveis responsáveis pelas animações.
import { FadeIn } from "@/components/animations/FadeIn";
import DotField from "@/components/react-bits/DotField";
import { GradientText } from "@/components/react-bits/GradientText";
import { SpecularLink } from "@/components/react-bits/SpecularLink";
import { StarLink } from "@/components/ui/StarLink";
import Image from "next/image";

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
      <div className="main-hero-layout relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-28 pt-32 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="main-hero-copy">
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
              <GradientText animationSpeed={7}>{content.lastName}</GradientText>
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

          <FadeIn
            delay={0.4}
            className="mt-8 flex flex-col gap-3 min-[420px]:flex-row sm:mt-10 sm:gap-4"
          >
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

        <FadeIn
          delay={0.2}
          className="main-hero-avatar"
          aria-label="Retrato em pixel art de Iuran Freire"
        >
          <span aria-hidden="true" className="main-hero-avatar-light main-hero-avatar-light-one" />
          <span aria-hidden="true" className="main-hero-avatar-light main-hero-avatar-light-two" />
          <span aria-hidden="true" className="main-hero-avatar-light main-hero-avatar-light-three" />
          <span aria-hidden="true" className="main-hero-avatar-light main-hero-avatar-light-four" />
          <Image
            src="/iuran-pixel-character-nasa-v2.png"
            alt="Iuran Freire em pixel art usando um moletom branco da NASA"
            width={512}
            height={512}
            priority
            unoptimized
          />
        </FadeIn>
      </div>
    </section>
  );
}
