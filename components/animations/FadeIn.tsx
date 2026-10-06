import type { CSSProperties, ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: FadeInProps) {
  // Envia o atraso da animação para uma variável CSS.
  const style = {
    "--animation-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div
      className={`fade-in-up ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
