import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import type { pt } from "@/dictionaries/pt";
import { Reveal } from "@/components/animations/Reveal";
import styles from "./Contact.module.css";

type ContactProps = { content: typeof pt.contact };

type Portal = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
  external?: boolean;
};

export function Contact({ content }: ContactProps) {
  const portals: Portal[] = [
    {
      label: content.email,
      value: "seu-email@example.com",
      href: "mailto:seu-email@example.com",
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
      value: "(00) 00000-0000",
      href: "https://wa.me/5500000000000",
      icon: FaWhatsapp,
      external: true,
    },
  ];

  return (
    <section id="contato" className={styles.section}>
      <Reveal className={styles.content}>
        <p className={styles.introduction}>{content.introduction}</p>
        <h2 className={styles.title}>{content.title}</h2>
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

