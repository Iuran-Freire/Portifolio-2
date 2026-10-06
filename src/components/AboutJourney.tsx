"use client";

import { useEffect, useRef } from "react";
import type { Language } from "@/dictionaries";
import type { pt } from "@/dictionaries/pt";
import s from "./AboutJourney.module.css";

export default function AboutJourney({ dictionary: d, language }: { dictionary: typeof pt; language: Language }) {
  const track = useRef<HTMLDivElement>(null);
  const portuguese = language === "pt";

  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-journey-card]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const stage = root.firstElementChild as HTMLElement;
    const measure = () => {
      root.style.setProperty("--stage-height", `${stage.offsetHeight}px`);
      // Keep the bottom of tall cards reachable even on shorter displays.
      stage.style.top = mobile.matches || reduced.matches ? "0px" : `${Math.min(110, window.innerHeight - stage.offsetHeight - 24)}px`;
    };
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      const distance = Math.max(1, root.offsetHeight - stage.offsetHeight);
      const stickyTop = parseFloat(stage.style.top) || 110;
      const progress = clamp((stickyTop - bounds.top) / distance);
      cards.forEach((card, index) => {
        const reveal = reduced.matches ? 1 : mobile.matches
          ? clamp((window.innerHeight * .92 - card.getBoundingClientRect().top) / Math.min(240, window.innerHeight * .3))
          : clamp(progress * 3.4 - index + .2);
        card.style.setProperty("--reveal", String(reveal));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); schedule(); };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      reduced.removeEventListener("change", resize);
    };
  }, [language]);

  return <div>
    <p className={s.summary}>{d.about.summary}</p>
    <div ref={track} className={s.track}>
      <div className={s.stage}>
        <div className={s.grid}>
          {d.about.journey.map((step, index) => <article className={s.card} data-journey-card key={step.label}>
            <div className={`${s.art} ${s[`art${index}`]}`} aria-hidden="true">
              <span className={s.backdrop}>{["DATA", "CODE", "BUILD"][index]}</span>
              {index === 0 ? <div className={s.bars}>{[30, 50, 40, 75, 100].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div> : <span className={s.symbol}>{index === 1 ? "</>" : "{ }"}</span>}
              <span className={s.artLabel}>{["DADOS & ANÁLISE", "SOFTWARE & AUTOMAÇÃO", "APRENDIZADO CONTÍNUO"].map((label, i) => portuguese ? label : ["DATA & ANALYSIS", "SOFTWARE & AUTOMATION", "CONTINUOUS LEARNING"][i])[index]}</span>
            </div>
            <div className={s.rail} aria-hidden="true"><span>0{index + 1}</span></div>
            <div className={s.copy}>
              <span className={s.kicker}>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>)}
        </div>
      </div>
    </div>
    <div className={s.closing}>
      <p>{d.about.closing}</p>
      <div className={s.education}><span>{portuguese ? "Em formação" : "Currently studying"}</span><strong>{portuguese ? "Análise e Desenvolvimento de Sistemas" : "Systems Analysis and Development"}</strong></div>
    </div>
  </div>;
}
