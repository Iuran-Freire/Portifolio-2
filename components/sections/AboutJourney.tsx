"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/animations/Reveal";
import type { pt } from "@/dictionaries/pt";
import styles from "./About.module.css";

type AboutJourneyProps = { journey: typeof pt.about.journey };

export function AboutJourney({ journey }: AboutJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Liga os centros reais dos pontos, mesmo após mudanças de tela.
    const updateLines = () => {
      const containerRect = container.getBoundingClientRect();

      lineRefs.current.forEach((line, index) => {
        const start = starRefs.current[index];
        const end = starRefs.current[index + 1];
        if (!line || !start || !end) return;

        const startRect = start.getBoundingClientRect();
        const endRect = end.getBoundingClientRect();
        const startX = startRect.left + startRect.width / 2 - containerRect.left;
        const startY = startRect.top + startRect.height / 2 - containerRect.top;
        const endX = endRect.left + endRect.width / 2 - containerRect.left;
        const endY = endRect.top + endRect.height / 2 - containerRect.top;
        const distance = Math.hypot(endX - startX, endY - startY);
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.width = `${distance}px`;
        line.style.transform = `rotate(${angle}deg)`;
      });
    };

    const scheduleUpdate = () => {
      requestAnimationFrame(updateLines);
      window.setTimeout(updateLines, 450);
      window.setTimeout(updateLines, 900);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const mutationObserver = new MutationObserver(scheduleUpdate);
    resizeObserver.observe(container);
    mutationObserver.observe(container, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });
    scheduleUpdate();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.journeyCanvas}>
      {journey.slice(0, -1).map((step, index) => (
        <span
          key={`line-${step.title}`}
          ref={(element) => { lineRefs.current[index] = element; }}
          className={styles.connector}
          aria-hidden="true"
        />
      ))}

      <ol className={styles.constellation}>
        {journey.map((step, index) => (
          <li key={step.title} className={styles.step}>
          <Reveal delay={0.1 + index * 0.12} className={styles.reveal}>
            <span
              ref={(element) => { starRefs.current[index] = element; }}
              className={styles.star}
              aria-hidden="true"
            >
              <span />
            </span>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.label}>{step.label}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

