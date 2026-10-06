"use client";

import type { CSSProperties } from "react";

import { TechnologyIcon } from "@/components/technologies/TechnologyIcon";

import styles from "./LogoLoop.module.css";

type LogoLoopProps = {
  items: string[];
  duration?: number;
  ariaLabel?: string;
};

type LogoLoopStyle = CSSProperties & {
  "--loop-duration": string;
};

export function LogoLoop({
  items,
  duration = 28,
  ariaLabel = "Tecnologias utilizadas",
}: LogoLoopProps) {
  const style: LogoLoopStyle = {
    "--loop-duration": `${duration}s`,
  };

  // Duas cópias iguais permitem que o movimento reinicie sem um salto visual.
  const lists = [0, 1];

  return (
    <div className={styles.container} aria-label={ariaLabel} style={style}>
      <div className={styles.track}>
        {lists.map((copy) => (
          <ul
            key={copy}
            className={styles.list}
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <li key={`${copy}-${item}`} className={styles.item}>
                <TechnologyIcon name={item} className={styles.icon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

