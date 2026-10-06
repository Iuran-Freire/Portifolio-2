"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  projectId: number;
  number: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  highlight: string;
  technologies: string[];
  image?: string;
  projectUrl?: string;
  buttonLabel: string;
  className?: string;
};

export function ProjectCard({
  projectId,
  number,
  title,
  category,
  description,
  features,
  highlight,
  technologies,
  image,
  projectUrl,
  buttonLabel,
  className = "",
}: ProjectCardProps) {
  const moveHighlight = (event: MouseEvent<HTMLDivElement>) => {
    const panel = event.currentTarget;
    const bounds = panel.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = (x / bounds.width - 0.5) * 5;
    const rotateX = (y / bounds.height - 0.5) * -5;

    panel.style.setProperty("--spot-x", `${x}px`);
    panel.style.setProperty("--spot-y", `${y}px`);
    panel.style.setProperty("--tilt-x", `${rotateX}deg`);
    panel.style.setProperty("--tilt-y", `${rotateY}deg`);
  };

  const resetHighlight = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      className={`${styles.card} ${className}`}
      data-project={projectId}
      tabIndex={0}
      aria-label={`${title}: ${description}`}
    >
      <div className={styles.surface}>
        <div className={styles.world} aria-hidden="true">
          <span className={styles.orbit} />
          <span className={styles.moon} />
          <div className={styles.planet}>
            {image ? (
              <Image
                src={image}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 640px) 240px, 320px"
                className={styles.image}
              />
            ) : (
              <div className={styles.imageFallback} />
            )}
            <span className={styles.atmosphere} />
          </div>
          <span className={styles.shadow} />
        </div>

        <div
          className={styles.content}
          onMouseMove={moveHighlight}
          onMouseLeave={resetHighlight}
          style={
            {
              "--spot-x": "50%",
              "--spot-y": "50%",
              "--tilt-x": "0deg",
              "--tilt-y": "0deg",
            } as CSSProperties
          }
        >
          <div className={styles.heading}>
            <div className={styles.labels}>
              <p className={styles.number}>{number}</p>
              <p className={styles.category}>{category}</p>
            </div>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.highlight}>{highlight}</p>
          </div>

          <div className={styles.details}>
            <p className={styles.description}>{description}</p>

            <ul className={styles.features}>
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <ul className={styles.technologies}>
              {technologies.map((technology) => (
                <li key={technology} className={styles.technology}>
                  {technology}
                </li>
              ))}
            </ul>

            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.link}
              >
                {buttonLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

