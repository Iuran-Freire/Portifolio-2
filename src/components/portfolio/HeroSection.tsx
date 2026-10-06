"use client";
import { useState } from "react";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { projects } from "@/data/projects";
import StrokeText from "@/components/react-bits/StrokeText";
import FoldText from "@/components/react-bits/FoldText";
import { social } from "./social-links";
import type { PortfolioProps } from "./types";
import { translate } from "./translate";
import s from "./Portfolio.module.css";
export function HeroSection({ dictionary: d, language }: PortfolioProps) {
  const t = translate(language);
  const featured = projects[0];
  const featureText = d.projects.items[featured.key];
  const [titleProgress, setTitleProgress] = useState({ language, mask: 0 });
  const titleComplete =
    titleProgress.language === language && titleProgress.mask === 15;
  return (
    <section id="inicio" className={s.hero}>
      <div className={s.portrait}>
        <img
          src="/iuran-portrait-no-earbuds.png"
          alt={t("Foto de Iuran Freire", "Portrait of Iuran Freire")}
        />
      </div>
      <div className={s.heroContent}>
        <p className={s.eyebrow}>
          <span>01</span>
          <i /> FULL STACK DEVELOPER
        </p>
        <h1
          aria-label={t(
            "PROBLEMAS REAIS. SOLUÇÕES EM CÓDIGO.",
            "REAL PROBLEMS. BUILT WITH CODE.",
          )}
        >
          <span className={s.animatedTitle} aria-hidden="true">
            {[
              t("PROBLEMAS", "REAL"),
              t("REAIS.", "PROBLEMS."),
              t("SOLUÇÕES", "BUILT"),
              t("EM CÓDIGO.", "WITH CODE."),
            ].map((line, index) => (
              <StrokeText
                key={`${language}-${index}`}
                text={line}
                strokeColor={index < 2 ? "#efeee7" : "#ef554b"}
                fillColor={index < 2 ? "#efeee7" : "#ef554b"}
                fontSize={128}
                fontWeight={400}
                letterSpacing={-3}
                strokeWidth={1.4}
                drawDuration={1.6}
                fillDelay={0.2 + index * 0.15}
                stagger={0.05}
                trigger="mount"
                fillMode="wipe"
                onComplete={() =>
                  setTitleProgress((previous) => ({
                    language,
                    mask:
                      (previous.language === language ? previous.mask : 0) |
                      (1 << index),
                  }))
                }
              />
            ))}
          </span>
          <span className={s.mobileTitle} aria-hidden="true">
            {t(
              <>
                PROBLEMAS
                <br />
                REAIS.
                <br />
                <em>
                  SOLUÇÕES
                  <br />
                  EM CÓDIGO.
                </em>
              </>,
              <>
                REAL
                <br />
                PROBLEMS.
                <br />
                <em>
                  BUILT
                  <br />
                  WITH CODE.
                </em>
              </>,
            )}
          </span>
        </h1>
        <p className={s.intro}>
          <FoldText
            key={language}
            enabled={titleComplete}
            splitBy="word"
            hinge="top"
            trigger="mount"
            fontSize="inherit"
            fontWeight={400}
            color="inherit"
            duration={0.65}
            stagger={0.035}
            style={{ lineHeight: 1.8, letterSpacing: "normal" }}
            text={t(
              "Eu sou Iuran Freire, desenvolvedor full stack júnior. Crio aplicações que conectam software, dados e as necessidades reais do ambiente industrial.",
              "I'm Iuran Freire, a junior full stack developer. I build applications connecting software, data and real needs in industrial environments.",
            )}
          />
        </p>
        <div className={s.heroActions}>
          <a href="#projetos" className={s.flowButton}>
            <span className={s.flowFill} aria-hidden="true" />
            <span className={s.flowLabel}>{d.hero.projectsButton}</span>
            <span className={s.flowArrow} aria-hidden="true">
              <FiArrowUpRight />
            </span>
          </a>
          <span className={s.availability}>
            {t("Disponível para oportunidades", "Open to opportunities")}
          </span>
        </div>
        <div className={s.socials}>
          {social.map((x) => (
            <a
              key={x.label}
              href={x.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {x.icon}
              {x.label}
              <FiArrowUpRight />
            </a>
          ))}
        </div>
      </div>
      <a className={s.heroFeature} href="#destaque">
        <span>{t("Projeto em destaque", "Featured project")}</span>
        <strong>
          QUALITY SYSTEM <FiArrowUpRight />
        </strong>
        <p>{featureText.highlight}</p>
      </a>
      <div className={s.heroBottom}>
        <span>MANAUS, BRASIL</span>
        <a href="#sobre">
          {t("Explore meu trabalho", "Explore my work")} <FiArrowDown />
        </a>
        <span>PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
