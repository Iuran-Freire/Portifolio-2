import styles from "./Astronaut.module.css";

// Astronauta decorativo inspirado no loader do Uiverse de JkHuger.
export function Astronaut() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <span className={styles.tether} />
      <div className={styles.astronaut}>
        <span className={styles.backpack} />
        <span className={styles.head}>
          <span className={styles.visor} />
        </span>
        <span className={`${styles.arm} ${styles.armLeft}`} />
        <span className={`${styles.arm} ${styles.armRight}`} />
        <span className={styles.body}>
          <span className={styles.panel} />
        </span>
        <span className={`${styles.leg} ${styles.legLeft}`} />
        <span className={`${styles.leg} ${styles.legRight}`} />
      </div>
    </div>
  );
}

