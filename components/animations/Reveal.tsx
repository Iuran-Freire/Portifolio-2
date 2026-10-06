"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  // Guarda a referência do elemento HTML observado.
  const elementRef = useRef<HTMLDivElement>(null);

  // Controla se o elemento já entrou na tela.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Observa quando o elemento entra na área visível.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Interrompe a observação após a primeira aparição.
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Remove o observador se o componente deixar de existir.
    return () => observer.disconnect();
  }, []);

  const style = {
    "--animation-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      style={style}
      className={`reveal-up ${
        isVisible ? "is-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

