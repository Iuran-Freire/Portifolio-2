"use client";

import { useState, type CSSProperties } from "react";
import { FaBrain } from "react-icons/fa6";
import { Reveal } from "@/components/animations/Reveal";
import { TechnologyIcon } from "@/components/technologies/TechnologyIcon";
import { skills } from "@/data/skills";
import type { pt } from "@/dictionaries/pt";
import { SynapseCanvas } from "./SynapseCanvas";
import styles from "./Skills.module.css";

type SkillsProps = {
  content: typeof pt.skills;
};

export function Skills({ content }: SkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const selectedSkillData = skills.find((skill) => skill.name === selectedSkill);
  const selectedDescription = selectedSkill
    ? content.technologies[selectedSkill as keyof typeof content.technologies]
    : null;

  return (
    <section id="habilidades" className={styles.section}>
      <div className={styles.stars} aria-hidden="true" />

      <div className={styles.container}>
        <Reveal className={styles.heading}>
          <p className={styles.eyebrow}>{content.introduction}</p>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.description}>{content.description}</p>
        </Reveal>

        <Reveal delay={0.15} className={styles.galaxyWrapper}>
          <p className={styles.hint}>{content.orbitHint}</p>

          <div className={styles.galaxy}>
            <SynapseCanvas />

            {/* Órbitas decorativas que representam áreas de conhecimento. */}
            <span className={`${styles.orbit} ${styles.orbitOuter}`} aria-hidden="true" />
            <span className={`${styles.orbit} ${styles.orbitMiddle}`} aria-hidden="true" />
            <span className={`${styles.orbit} ${styles.orbitInner}`} aria-hidden="true" />

            <div
              className={`${styles.core} ${selectedSkill ? styles.coreSelected : ""}`}
              aria-live="polite"
              aria-label={selectedSkill ?? "Iuran Freire"}
            >
              <span className={styles.coreGlow} aria-hidden="true" />
              {selectedSkill ? (
                <TechnologyIcon
                  key={selectedSkill}
                  name={selectedSkill}
                  className={styles.coreIcon}
                />
              ) : (
                <span className={styles.coreBrainWrap} aria-hidden="true">
                  <FaBrain className={`${styles.coreBrain} ${styles.brainGhostCyan}`} />
                  <FaBrain className={`${styles.coreBrain} ${styles.brainGhostViolet}`} />
                  <FaBrain className={`${styles.coreBrain} ${styles.brainMain}`} />
                  <span className={styles.brainSpark} />
                </span>
              )}
            </div>

            {/* Todas as tecnologias giram juntas, mantendo os textos na posição correta. */}
            <div className={styles.orbitingLayer}>
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={styles.planet}
                  style={{ "--skill-angle": `${index * 45}deg` } as CSSProperties}
                >
                  <button
                    type="button"
                    className={`${styles.planetContent} ${
                      selectedSkill === skill.name ? styles.planetSelected : ""
                    }`}
                    onClick={() => setSelectedSkill(skill.name)}
                    aria-pressed={selectedSkill === skill.name}
                    aria-label={`${skill.name}: ${content.categories[skill.category]}`}
                  >
                    <span className={styles.iconShell}>
                      <TechnologyIcon name={skill.name} className={styles.icon} />
                    </span>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.category}>
                      {content.categories[skill.category]}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoArea} aria-live="polite">
            {selectedSkill && (
              <div key={selectedSkill} className={styles.infoCard}>
                <span className={styles.infoLine} aria-hidden="true" />
                {selectedSkillData && (
                  <span className={styles.infoCategory}>
                    {content.categories[selectedSkillData.category]}
                  </span>
                )}
                <strong>{selectedSkill}</strong>
                <p>{selectedDescription}</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
