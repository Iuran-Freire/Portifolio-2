import type { pt } from "@/dictionaries/pt";
import { Reveal } from "@/components/animations/Reveal";
import { AboutJourney } from "./AboutJourney";
import styles from "./About.module.css";

type AboutProps = { content: typeof pt.about };

export function About({ content }: AboutProps) {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <Reveal className={styles.heading}>
          <p className={styles.eyebrow}>{content.introduction}</p>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.summary}>{content.summary}</p>
        </Reveal>

        <AboutJourney journey={content.journey} />

        <Reveal delay={0.35} className={styles.closing}>
          <span className={styles.closingStar} aria-hidden="true" />
          <p>{content.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

