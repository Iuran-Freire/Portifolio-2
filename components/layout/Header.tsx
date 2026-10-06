// Importa o seletor de idiomas.
import { LanguageSwitcher } from "./LanguageSwitcher";
import { StarLink } from "@/components/ui/StarLink";
import type { pt } from "@/dictionaries/pt";
import styles from "./Header.module.css";

type HeaderProps = {
  content: typeof pt.header;
};

export function Header({ content }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav aria-label={content.navigationLabel} className={styles.nav}>
        {/* Identidade do portfólio */}
        <a href="#inicio" className={styles.brand}>
          <span className={styles.monogram}>IF</span>

          <span className={styles.brandName}>Iuran Freire</span>
        </a>

        {/* Links principais — ocultos em telas pequenas */}
        <div className={styles.desktopLinks}>
          <a href="#sobre" className={styles.navLink}>
            {content.about}
          </a>

          <a href="#habilidades" className={styles.navLink}>
            {content.skills}
          </a>

          <a href="#projetos" className={styles.navLink}>
            {content.projects}
          </a>
        </div>

        {/* Ações localizadas no lado direito do cabeçalho */}
        <div className={styles.actions}>
          {/* Envia a descrição traduzida para o seletor */}
          <LanguageSwitcher label={content.languageLabel} />

          <StarLink href="#contato" className={styles.contact}>
            {content.contact}
          </StarLink>
        </div>
      </nav>

      {/* Menu independente para celular: não disputa espaço com a marca e o idioma. */}
      <nav className={styles.mobileLinks} aria-label={content.navigationLabel}>
        <a href="#sobre" className={styles.navLink}>
          {content.about}
        </a>
        <a href="#habilidades" className={styles.navLink}>
          {content.skills}
        </a>
        <a href="#projetos" className={styles.navLink}>
          {content.projects}
        </a>
      </nav>
    </header>
  );
}

