import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import type { pt } from "@/dictionaries/pt";
import { Reveal } from "@/components/animations/Reveal";
import styles from "./Contact.module.css";

type ContactProps = {
  content: typeof pt.contact;
  language: "pt" | "en";
};

type Portal = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
  external?: boolean;
};

export function Contact({ content, language }: ContactProps) {
  const portals: Portal[] = [
    {
      label: content.email,
      value: "Iuranhumberto99@gmail.com",
      href: "mailto:Iuranhumberto99@gmail.com",
      icon: MdOutlineEmail,
    },
    {
      label: content.linkedin,
      value: "Iuran Freire",
      href: "https://www.linkedin.com/in/iuran-freire-a23092204",
      icon: FaLinkedinIn,
      external: true,
    },
    {
      label: content.github,
      value: "Iuran-Freire",
      href: "https://github.com/Iuran-Freire",
      icon: FaGithub,
      external: true,
    },
    {
      label: content.phone,
      value: "(92) 98592-3140",
      href: "https://wa.me/5592985923140",
      icon: FaWhatsapp,
      external: true,
    },
  ];

  return (
    <section id="contato" className={styles.section}>
      <Reveal className={styles.content}>
        <p className={styles.introduction}>{content.introduction}</p>
        <h2
          className={`${styles.title} ${
            language === "en" ? styles.titleEnglish : ""
          }`}
        >
          {content.title}
        </h2>
        <p className={styles.description}>{content.description}</p>

        <address className={styles.portalStation}>
          <ul className={styles.portalList}>
            {portals.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.portalLink}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  aria-label={`${label}: ${value}`}
                >
                  <span className={styles.portal} aria-hidden="true">
                    <span className={styles.portalRing} />
                    <Icon className={styles.icon} />
                  </span>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.value}>{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </address>
      </Reveal>
    </section>
  );
}
