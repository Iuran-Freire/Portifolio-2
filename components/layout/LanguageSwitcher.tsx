"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";

const languages = ["pt", "en"] as const;

type LanguageSwitcherProps = {
  label: string;
};

export function LanguageSwitcher({ label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const currentLanguage = pathname.split("/")[1] === "en" ? "en" : "pt";

  return (
    <div
      aria-label={label}
      className={styles.switcher}
      data-language={currentLanguage}
    >
      {/* A peça iluminada desliza para indicar o idioma atual. */}
      <span className={styles.slider} aria-hidden="true" />

      {languages.map((language) => {
        const isActive = currentLanguage === language;

        return (
          <Link
            key={language}
            href={`/${language}`}
            aria-current={isActive ? "page" : undefined}
            className={styles.option}
          >
            {language}
          </Link>
        );
      })}
    </div>
  );
}

