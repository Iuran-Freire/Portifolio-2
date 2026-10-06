import { TechnologyIcon } from "@/components/technologies/TechnologyIcon";

import styles from "./SkillFlipCard.module.css";

type SkillFlipCardProps = {
  name: string;
  category: string;
};

export function SkillFlipCard({ name, category }: SkillFlipCardProps) {
  return (
    <article
      className={styles.card}
      tabIndex={0}
      aria-label={`${name}: ${category}`}
    >
      {/* A camada interna é o elemento que realiza a rotação 3D. */}
      <div className={styles.inner}>
        {/* Frente: mantém as informações atuais do card. */}
        <div className={`${styles.face} ${styles.front}`}>
          <p className={styles.category}>{category}</p>
          <h3 className={styles.name}>{name}</h3>
        </div>

        {/* Verso: apresenta a logo quando o card gira. */}
        <div
          className={`${styles.face} ${styles.back}`}
          aria-hidden="true"
        >
          <TechnologyIcon name={name} className={styles.logo} />
          <span className={styles.backName}>{name}</span>
        </div>
      </div>
    </article>
  );
}


