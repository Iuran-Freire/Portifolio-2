"use client";

import type { PointerEvent, ReactNode } from "react";

import styles from "./SpecularLink.module.css";

type SpecularLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function SpecularLink({
  children,
  href,
  className = "",
}: SpecularLinkProps) {
  // Posiciona o reflexo na região do botão mais próxima ao cursor.
  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const link = event.currentTarget;
    const rectangle = link.getBoundingClientRect();

    link.style.setProperty("--pointer-x", `${event.clientX - rectangle.left}px`);
    link.style.setProperty("--pointer-y", `${event.clientY - rectangle.top}px`);
  }

  return (
    <a
      href={href}
      className={`${styles.link} ${className}`}
      onPointerMove={handlePointerMove}
    >
      <span className={styles.label}>{children}</span>
    </a>
  );
}

