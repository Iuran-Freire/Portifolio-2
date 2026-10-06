import { FiArrowUpRight, FiCode, FiMail } from "react-icons/fi";
import { social } from "./social-links";
import type { PortfolioProps } from "./types";
import { translate } from "./translate";
import s from "./Portfolio.module.css";
export function ContactSection({ language }: PortfolioProps) {
  const t = translate(language);
  return (
    <section id="contato" className={`${s.section} ${s.contact}`}>
      <p className={s.eyebrow}>
        <span>05</span>
        <i />
        {t("Contato", "Contact")}
      </p>
      <div className={s.contactGrid}>
        <div>
          <h2>
            {t("VAMOS", "LET'S")}
            <br />
            <em>{t("CONSTRUIR?", "BUILD.")}</em>
          </h2>
          <p>
            {t(
              "Busco uma oportunidade como desenvolvedor júnior para contribuir com projetos, aprender com uma equipe e construir soluções úteis. Vamos conversar?",
              "I'm looking for a junior developer opportunity to contribute to projects, learn alongside a team and build useful solutions. Let's talk.",
            )}
          </p>
          <a href="mailto:seu-email@example.com" className={s.primary}>
            {t("Escrever um e-mail", "Send an email")} <FiArrowUpRight />
          </a>
        </div>
        <div className={s.contactLinks}>
          <a href="mailto:seu-email@example.com">
            <span>
              <FiMail /> E-MAIL
            </span>
            <strong>seu-email@example.com</strong>
            <FiArrowUpRight />
          </a>
          {social.map((x) => (
            <a
              key={x.label}
              href={x.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                {x.icon} {x.label}
              </span>
              <strong>
                {x.label === "WhatsApp" ? "(00) 00000-0000" : "Iuran Freire"}
              </strong>
              <FiArrowUpRight />
            </a>
          ))}
          <a
            href="https://github.com/Iuran-Freire/Portifolio-2/tree/source-code"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <FiCode /> {t("CÓDIGO", "SOURCE CODE")}
            </span>
            <strong>
              {t("Código deste portfólio", "This portfolio's source code")}
            </strong>
            <FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
