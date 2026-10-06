"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiArrowUpRight, FiArrowDown, FiCode, FiMail, FiMenu, FiX } from "react-icons/fi";
import { projects } from "@/data/projects";
import type { Language } from "@/dictionaries";
import type { pt } from "@/dictionaries/pt";
import s from "./EditorialPortfolio.module.css";
import StrokeText from "@/components/react-bits/StrokeText";
import FoldText from "@/components/react-bits/FoldText";
import UserCursor from "@/components/UserCursor";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import AboutJourney from "@/components/AboutJourney";
import TechnologyStack from "@/components/TechnologyStack";

export function EditorialPortfolio({ dictionary: d, language }: { dictionary: typeof pt; language: Language }) {
  const ptBR = language === "pt";
  const [menu, setMenu] = useState(false);
  const [titleProgress, setTitleProgress] = useState({ language, mask: 0 });
  const titleComplete = titleProgress.language === language && titleProgress.mask === 15;
  const [active, setActive] = useState("inicio");
  const t = (pt: string, en: string) => ptBR ? pt : en;
  const nav = [["inicio", t("Início", "Home")], ["sobre", t("Sobre", "About")], ["habilidades", "Stack"], ["projetos", t("Projetos", "Projects")], ["contato", t("Contato", "Contact")]];
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    const sections = document.querySelectorAll<HTMLElement>("main > section[id]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-reveal-visible", "true");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    sections.forEach(section => {
      if (section.id === "inicio" || reducedMotion.matches) {
        section.setAttribute("data-reveal-visible", "true");
        return;
      }
      section.classList.add(s.revealSection);
      if (section.getBoundingClientRect().top < window.innerHeight * 0.88) {
        section.setAttribute("data-reveal-visible", "true");
      } else {
        revealObserver.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, [language]);
  const stack = [
    { title: "Front-end", text: t("Interfaces e experiência", "Interfaces & experience"), items: ["React", "Vue 3", "TypeScript", "JavaScript", "Tailwind CSS"] },
    { title: "Back-end", text: t("Lógica, dados e integrações", "Logic, data & integrations"), items: ["Node.js", "Express", "Python", "Flask", "SQL", "SQLite", "PostgreSQL"] },
    { title: t("Dados & automação", "Data & automation"), text: t("Informação que vira solução", "Turning information into solutions"), items: ["Power BI", "Excel", "DAX", "Power Query", "OpenCV", "Pyzbar"] },
    { title: t("Ferramentas & nuvem", "Tools & cloud"), text: t("Do código à publicação", "From code to deployment"), items: ["Git", "GitHub", "Cloudflare Workers", "Cloudflare D1", "IndexedDB", "Vite"] },
  ];
  const social = [
    { label: "GitHub", href: "https://github.com/Iuran-Freire", icon: <FaGithub /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/iuran-freire-a23092204", icon: <FaLinkedinIn /> },
    { label: "WhatsApp", href: "https://wa.me/5500000000000", icon: <FaWhatsapp /> },
  ];
  const featured = projects[0];
  const featureText = d.projects.items[featured.key];
  return <div className={s.site}>
    <UserCursor />
    <a className={s.skip} href="#conteudo">{t("Pular para o conteúdo", "Skip to content")}</a>
    <header className={s.header}>
      <a className={s.brand} href="#inicio" aria-label="Iuran Freire">IF<span>.</span></a>
      <nav id="main-nav" aria-label={d.header.navigationLabel} className={`${s.nav} ${menu ? s.navOpen : ""}`}>
        {nav.map(([id, label], i) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setMenu(false)}><span>0{i + 1}</span> {label}</a>)}
      </nav>
      <div className={s.headerActions}><Link href={ptBR ? "/en" : "/pt"} className={s.language} aria-label={t("View in English", "Ver em português")}>{ptBR ? "EN" : "PT"}</Link><a className={s.outlineButton} href="mailto:seu-email@example.com">{t("Falar comigo", "Let's talk")} <FiArrowUpRight /></a><button className={s.menu} aria-controls="main-nav" aria-expanded={menu} aria-label={t("Abrir ou fechar menu", "Toggle menu")} onClick={() => setMenu(!menu)}>{menu ? <FiX /> : <FiMenu />}</button></div>
    </header>
    <main id="conteudo">
      <section id="inicio" className={s.hero}>
        <div className={s.portrait}><img src="/portrait-placeholder.svg" alt={t("Foto de Iuran Freire", "Portrait of Iuran Freire")} /></div>
        <div className={s.heroContent}><p className={s.eyebrow}><span>01</span><i /> FULL STACK DEVELOPER</p>
          <h1 aria-label={t("PROBLEMAS REAIS. SOLUÇÕES EM CÓDIGO.", "REAL PROBLEMS. BUILT WITH CODE.")}>
            <span className={s.animatedTitle} aria-hidden="true">
              {[t("PROBLEMAS", "REAL"), t("REAIS.", "PROBLEMS."), t("SOLUÇÕES", "BUILT"), t("EM CÓDIGO.", "WITH CODE.")].map((line, index) => (
                <StrokeText key={`${language}-${index}`} text={line} strokeColor={index < 2 ? "#efeee7" : "#ef554b"} fillColor={index < 2 ? "#efeee7" : "#ef554b"} fontSize={128} fontWeight={400} letterSpacing={-3} strokeWidth={1.4} drawDuration={1.6} fillDelay={0.2 + index * 0.15} stagger={0.05} trigger="mount" fillMode="wipe" onComplete={() => setTitleProgress(previous => ({ language, mask: (previous.language === language ? previous.mask : 0) | (1 << index) }))} />
              ))}
            </span>
            <span className={s.mobileTitle} aria-hidden="true">
              {t(<>PROBLEMAS<br />REAIS.<br /><em>SOLUÇÕES<br />EM CÓDIGO.</em></>, <>REAL<br />PROBLEMS.<br /><em>BUILT<br />WITH CODE.</em></>)}
            </span>
          </h1>
          <p className={s.intro}><FoldText key={language} enabled={titleComplete} splitBy="word" hinge="top" trigger="mount" fontSize="inherit" fontWeight={400} color="inherit" duration={0.65} stagger={0.035} style={{ lineHeight: 1.8, letterSpacing: "normal" }} text={t("Eu sou Iuran Freire, desenvolvedor full stack júnior. Crio aplicações que conectam software, dados e as necessidades reais do ambiente industrial.", "I'm Iuran Freire, a junior full stack developer. I build applications connecting software, data and real needs in industrial environments.")} /></p>
          <div className={s.heroActions}><a href="#projetos" className={s.flowButton}><span className={s.flowFill} aria-hidden="true" /><span className={s.flowLabel}>{d.hero.projectsButton}</span><span className={s.flowArrow} aria-hidden="true"><FiArrowUpRight /></span></a><span className={s.availability}>{t("Disponível para oportunidades", "Open to opportunities")}</span></div>
          <div className={s.socials}>{social.map(x => <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer">{x.icon}{x.label}<FiArrowUpRight /></a>)}</div>
        </div>
        <a className={s.heroFeature} href="#destaque"><span>{t("Projeto em destaque", "Featured project")}</span><strong>QUALITY SYSTEM <FiArrowUpRight /></strong><p>{featureText.highlight}</p></a>
        <div className={s.heroBottom}><span>MANAUS, BRASIL</span><a href="#sobre">{t("Explore meu trabalho", "Explore my work")} <FiArrowDown /></a><span>PORTFOLIO / 2026</span></div>
      </section>
      <section id="sobre" className={s.section}>
        <SectionHeading number="02" label={t("Sobre", "About")} title={t("Da rotina industrial à construção de software.", "From industrial routines to building software.")} />
        <AboutJourney dictionary={d} language={language} />
      </section>
      <section id="habilidades" className={s.section}>
        <SectionHeading number="03" label="Stack" title={t("As ferramentas por trás das soluções.", "The tools behind the solutions.")} />
        <TechnologyStack groups={stack} portuguese={ptBR} />
      </section>
      <section id="projetos" className={s.section}>
        <SectionHeading number="04" label={t("Projetos", "Projects")} title={t("Código aplicado a problemas reais.", "Code applied to real problems.")} />
        <ProjectShowcase dictionary={d} language={language} />
      </section>
      <section id="contato" className={`${s.section} ${s.contact}`}><p className={s.eyebrow}><span>05</span><i />{t("Contato", "Contact")}</p><div className={s.contactGrid}><div><h2>{t("VAMOS", "LET'S")}<br /><em>{t("CONSTRUIR?", "BUILD.")}</em></h2><p>{t("Busco uma oportunidade como desenvolvedor júnior para contribuir com projetos, aprender com uma equipe e construir soluções úteis. Vamos conversar?", "I'm looking for a junior developer opportunity to contribute to projects, learn alongside a team and build useful solutions. Let's talk.")}</p><a href="mailto:seu-email@example.com" className={s.primary}>{t("Escrever um e-mail", "Send an email")} <FiArrowUpRight /></a></div><div className={s.contactLinks}><a href="mailto:seu-email@example.com"><span><FiMail /> E-MAIL</span><strong>seu-email@example.com</strong><FiArrowUpRight /></a>{social.map(x => <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer"><span>{x.icon} {x.label}</span><strong>{x.label === "WhatsApp" ? "(00) 00000-0000" : "Iuran Freire"}</strong><FiArrowUpRight /></a>)}<a href="https://github.com/Iuran-Freire/Portifolio-2/tree/source-code" target="_blank" rel="noopener noreferrer"><span><FiCode /> {t("CÓDIGO", "SOURCE CODE")}</span><strong>{t("Código deste portfólio", "This portfolio's source code")}</strong><FiArrowUpRight /></a></div></div></section>
    </main><footer className={s.footer}><a className={s.brand} href="#inicio">IF<span>.</span></a><span>IURAN FREIRE / FULL STACK DEVELOPER</span><span>© {new Date().getFullYear()} · MANAUS, BRASIL</span><a href="#inicio" aria-label={d.footer.backToTop}><FiArrowUpRight /></a></footer>
  </div>;
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return <div className={s.sectionHeading}><p className={s.eyebrow}><span>{number}</span><i />{label}</p><h2>{title}</h2></div>;
}


