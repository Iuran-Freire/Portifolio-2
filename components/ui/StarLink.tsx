import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./StarLink.module.css";

type StarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

// Link reutilizável com brilho orbital e pequenas estrelas animadas.
export function StarLink({ children, className = "", ...props }: StarLinkProps) {
  return (
    <a className={`${styles.button} ${className}`} {...props}>
      <span className={styles.stars} aria-hidden="true" />
      <span className={styles.light} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </a>
  );
}

