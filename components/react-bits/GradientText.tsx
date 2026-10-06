import type { CSSProperties, ReactNode } from "react";

import styles from "./GradientText.module.css";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  animationSpeed?: number;
};

type GradientTextStyle = CSSProperties & {
  "--gradient-speed": string;
};

export function GradientText({
  children,
  className = "",
  animationSpeed = 8,
}: GradientTextProps) {
  // A duração é enviada ao CSS por uma variável personalizada.
  const style: GradientTextStyle = {
    "--gradient-speed": `${animationSpeed}s`,
  };

  return (
    <span className={`${styles.text} ${className}`} style={style}>
      {children}
    </span>
  );
}


