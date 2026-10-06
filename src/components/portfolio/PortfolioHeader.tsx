"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import type { PortfolioProps } from "./types";
import { translate } from "./translate";
import s from "./Portfolio.module.css";
export function PortfolioHeader({
  dictionary: d,
  language,
  active,
}: PortfolioProps & { active: string }) {
  const t = translate(language);
  const ptBR = language === "pt";
  const [menu, setMenu] = useState(false);
  const nav = [
    ["inicio", t("Início", "Home")],
    ["sobre", t("Sobre", "About")],
    ["habilidades", "Stack"],
    ["projetos", t("Projetos", "Projects")],
    ["contato", t("Contato", "Contact")],
  ];
  return (
    <header className={s.header}>
      <a className={s.brand} href="#inicio" aria-label="Iuran Freire">
        IF<span>.</span>
      </a>
      <nav
        id="main-nav"
        aria-label={d.header.navigationLabel}
        className={`${s.nav} ${menu ? s.navOpen : ""}`}
      >
        {nav.map(([id, label], i) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setMenu(false)}
          >
            <span>0{i + 1}</span> {label}
          </a>
        ))}
      </nav>
      <div className={s.headerActions}>
        <Link
          href={ptBR ? "/en" : "/pt"}
          className={s.language}
          aria-label={t("View in English", "Ver em português")}
        >
          {ptBR ? "EN" : "PT"}
        </Link>
        <a className={s.outlineButton} href="mailto:seu-email@example.com">
          {t("Falar comigo", "Let's talk")} <FiArrowUpRight />
        </a>
        <button
          className={s.menu}
          aria-controls="main-nav"
          aria-expanded={menu}
          aria-label={t("Abrir ou fechar menu", "Toggle menu")}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}
