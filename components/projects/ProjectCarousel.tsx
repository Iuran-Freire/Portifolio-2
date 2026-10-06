"use client";

import {
  Children,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import styles from "./ProjectCarousel.module.css";

type ProjectCarouselProps = {
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
  carouselLabel: string;
};

export function ProjectCarousel({
  children,
  previousLabel,
  nextLabel,
  carouselLabel,
}: ProjectCarouselProps) {
  // Converte os cards recebidos em uma lista que pode ser navegada.
  const slides = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  // Permite navegar com as setas mesmo quando o foco está no carrossel.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;

    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    // Só troca de projeto quando o gesto ultrapassa 45 pixels.
    if (distance > 45) showPrevious();
    if (distance < -45) showNext();
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={carouselLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
      >
        <div className={styles.stage}>
          {slides.map((slide, index) => {
            const offset = index - activeIndex;

            return (
              <div
                key={index}
                className={styles.slide}
                data-active={index === activeIndex}
                aria-hidden={index !== activeIndex}
                inert={index !== activeIndex}
                style={{ "--slide-offset": offset } as CSSProperties}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={showPrevious}
          aria-label={previousLabel}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={styles.dot}
              data-active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              aria-label={`${carouselLabel} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={showNext}
          aria-label={nextLabel}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

