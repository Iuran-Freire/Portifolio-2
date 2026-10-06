"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import type { Language } from "@/dictionaries";
import type { pt } from "@/dictionaries/pt";
import styles from "./PixelPortfolio.module.css";

type PixelPortfolioProps = {
  dictionary: typeof pt;
  language: Language;
};

const skillLevels: Record<string, number> = {
  "Power BI": 88,
  Excel: 86,
  SQL: 78,
  PostgreSQL: 72,
  JavaScript: 76,
  TypeScript: 74,
  React: 77,
  "Node.js": 71,
};

export function PixelPortfolio({ dictionary, language }: PixelPortfolioProps) {
  const isPortuguese = language === "pt";

  const labels = isPortuguese
    ? {
        home: "Início",
        player: "Perfil do jogador",
        quest: "Registro de jornada",
        inventory: "Inventário",
        open: "Abrir projeto",
        contactTitle: "NOVA MISSÃO?",
        contactText: "Se você tem uma oportunidade, ideia ou problema real para resolver, vamos conversar.",
        thanks: "Obrigado por explorar meu portfólio",
        status: "Disponível para novas oportunidades",
        stats: ["PROJETOS", "TECNOLOGIAS", "IDIOMAS"],
      }
    : {
        home: "Home",
        player: "Player profile",
        quest: "Journey log",
        inventory: "Inventory",
        open: "Open project",
        contactTitle: "NEW QUEST?",
        contactText: "If you have an opportunity, an idea, or a real problem to solve, let’s talk.",
        thanks: "Thanks for exploring my portfolio",
        status: "Available for new opportunities",
        stats: ["PROJECTS", "TECHNOLOGIES", "LANGUAGES"],
      };

  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <a href="#inicio" className={styles.brand} aria-label={labels.home}>
          &lt;IF/&gt;
        </a>

        <nav className={styles.nav} aria-label={dictionary.header.navigationLabel}>
          <a href="#inicio">{labels.home}</a>
          <a href="#sobre">{dictionary.header.about}</a>
          <a href="#habilidades">{dictionary.header.skills}</a>
          <a href="#projetos">{dictionary.header.projects}</a>
          <a href="#contato">{dictionary.header.contact}</a>
        </nav>

        <div className={styles.languages} aria-label={dictionary.header.languageLabel}>
          <Link href="/pt" aria-current={isPortuguese ? "page" : undefined}>PT</Link>
          <Link href="/en" aria-current={!isPortuguese ? "page" : undefined}>EN</Link>
        </div>
      </header>

      <main>
        <section id="inicio" className={styles.hero}>
          <div className={styles.scanlines} aria-hidden="true" />
          <div className={styles.skyStars} aria-hidden="true" />

          <div className={styles.heroContent}>
            <div className={styles.avatarFrame} aria-hidden="true">
              <span className={styles.cornerOne} />
              <span className={styles.cornerTwo} />
              {/* Retrato personalizado que substitui o avatar geométrico anterior. */}
              <span className={styles.avatarPortrait} />
            </div>

            <p className={styles.level}>★ DESENVOLVEDOR EM EVOLUÇÃO ★</p>
            <h1 className={styles.heroTitle}>{dictionary.hero.firstName} {dictionary.hero.lastName}</h1>
            <p className={styles.role}>&gt; {dictionary.hero.role}_</p>
            <p className={styles.heroDescription}>{dictionary.hero.description}</p>

            <div className={styles.actions}>
              <a href="#projetos">▶ {dictionary.hero.projectsButton}</a>
              <a href="#contato">✉ {dictionary.hero.contactButton}</a>
            </div>

            <p className={styles.online}><span /> {labels.status}</p>
          </div>

          <div className={styles.stats}>
            <div><strong>{projects.length}</strong><span>{labels.stats[0]}</span></div>
            <div><strong>{skills.length}</strong><span>{labels.stats[1]}</span></div>
            <div><strong>02</strong><span>{labels.stats[2]}</span></div>
          </div>

          <PixelForest />
        </section>

        <section id="sobre" className={styles.section}>
          <SectionTitle title="ABOUT.TXT" subtitle={`[ ${labels.player} ]`} />
          <div className={styles.aboutGrid}>
            <article className={styles.terminalCard}>
              <span className={styles.prompt}>C:\IURAN\PROFILE&gt;</span>
              <h3>{dictionary.about.title}</h3>
              <p>{dictionary.about.summary}</p>
              <p>{dictionary.about.closing}</p>
            </article>

            <article className={styles.questCard}>
              <p className={styles.panelLabel}>[ {labels.quest} ]</p>
              <ol>
                {dictionary.about.journey.map((item, index) => (
                  <li key={item.label}>
                    <span className={styles.questNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div><small>{item.label}</small><strong>{item.title}</strong><p>{item.description}</p></div>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section id="habilidades" className={`${styles.section} ${styles.skillsSection}`}>
          <SectionTitle title="SKILLS.DAT" subtitle={dictionary.skills.title} />
          <div className={styles.skillsGrid}>
            <article className={styles.skillPanel}>
              {skills.map((skill) => {
                const level = skillLevels[skill.name] ?? 70;
                return (
                  <div className={styles.skillRow} key={skill.name}>
                    <div><strong>{skill.name}</strong><span>{level}%</span></div>
                    <div className={styles.progress}><span style={{ "--level": `${level}%` } as CSSProperties} /></div>
                  </div>
                );
              })}
            </article>

            <article className={styles.inventory}>
              <p className={styles.panelLabel}>[ {labels.inventory} ]</p>
              <div>
                {["Python", "Flask", "OpenCV", "Power Query", "DAX", "Git", "Figma", "Automação Industrial"].map((item, index) => (
                  <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>
                ))}
              </div>
              <p>{dictionary.skills.description}</p>
            </article>
          </div>
        </section>

        <section id="projetos" className={styles.section}>
          <SectionTitle title="PROJECTS.EXE" subtitle={dictionary.projects.title} />
          <div className={styles.projectGrid}>
            {projects.map((project, index) => {
              const content = dictionary.projects.items[project.key];
              return (
                <article className={styles.projectCard} key={project.key}>
                  <div className={styles.projectImage}>
                    {project.image ? <Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /> : null}
                    <span>MISSION {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.projectBody}>
                    <small>{content.category}</small>
                    <h3>{content.title}</h3>
                    <p>{content.description}</p>
                    <ul>{content.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    <div className={styles.tags}>{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
                    {project.projectUrl ? <a href={project.projectUrl} target="_blank" rel="noreferrer noopener">▶ {labels.open}</a> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contato" className={`${styles.section} ${styles.contact}`}>
          <SectionTitle title="CONTACT.EXE" subtitle={labels.contactTitle} />
          <p className={styles.contactText}>{labels.contactText}</p>
          <div className={styles.contactGrid}>
            <ContactLink href="mailto:seu-email@example.com" icon={<MdOutlineEmail />} label={dictionary.contact.email} />
            <ContactLink href="https://www.linkedin.com/in/iuran-freire-a23092204" icon={<FaLinkedinIn />} label={dictionary.contact.linkedin} />
            <ContactLink href="https://github.com/Iuran-Freire" icon={<FaGithub />} label={dictionary.contact.github} />
            <ContactLink href="https://wa.me/5500000000000" icon={<FaWhatsapp />} label={dictionary.contact.phone} />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>▓▒░ {labels.thanks} ░▒▓</p>
        <span>© {new Date().getFullYear()} IURAN FREIRE · {dictionary.footer.rights}</span>
      </footer>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className={styles.sectionTitle}><span>{title}</span><h2>{subtitle}</h2></div>;
}

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return <a className={styles.contactLink} href={href} target="_blank" rel="noreferrer noopener"><span>{icon}</span><strong>{label}</strong><small>OPEN LINK ↗</small></a>;
}

function PixelForest() {
  return (
    <div className={styles.forest} aria-hidden="true">
      {/* Camadas CC0 deslocam-se em velocidades diferentes e criam profundidade. */}
      <div className={`${styles.forestAssetLayer} ${styles.forestBack}`} />
      <div className={`${styles.forestAssetLayer} ${styles.forestMiddle}`} />
      <div className={`${styles.forestAssetLayer} ${styles.forestLights}`} />
      <div className={`${styles.forestAssetLayer} ${styles.forestFront}`} />
    </div>
  );
}

