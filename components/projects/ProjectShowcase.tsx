"use client";

import { useRef, useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiPlus, FiMinus } from "react-icons/fi";
import { projects } from "@/data/projects";
import type { pt } from "@/dictionaries/pt";
import type { Language } from "@/dictionaries";
import s from "./ProjectShowcase.module.css";

// Original implementation inspired by the public Apple Feature Block demo.
export default function ProjectShowcase({ dictionary: d, language }: { dictionary: typeof pt; language: Language }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const t = (pt: string, en: string) => language === "pt" ? pt : en;
  const items = [
    ...projects.map(project => ({ ...project, ...d.projects.items[project.key] })),
    {
      key: "solder", image: undefined, linkType: "repository", projectUrl: "https://github.com/Iuran-Freire/controle-de-solda",
      title: t("Controle de Solda", "Soldering Control"), category: "Full Stack · PWA",
      description: t("Projeto piloto para digitalizar inspeções de estações de solda, com checklist, medições de temperatura, resistência e tensão residual.", "Pilot project to digitize soldering station inspections, with checklists and temperature, resistance and residual voltage measurements."),
      highlight: t("Inspeções offline e rastreabilidade", "Offline inspections and traceability"),
      features: [t("Inspeções offline com sincronização", "Offline inspections with synchronization"), t("Relatórios PDF e identificação por QR Code", "PDF reports and QR code identification"), t("Indicadores por posto, dia e turno", "Metrics by station, day and shift")],
      technologies: ["React", "TypeScript", "Cloudflare Workers", "SQLite", "IndexedDB"],
    },
  ];
  const selected = items[active];
  const select = (index: number) => setActive((index + items.length) % items.length);
  return <div id="destaque" className={s.showcase}>
    <div className={s.list} aria-label={t("Selecionar projeto", "Select project")}>
      {items.map((item, index) => <div key={item.key} className={`${s.item} ${active === index ? s.active : ""}`}>
        <h3><button id={`project-button-${item.key}`} type="button" aria-expanded={active === index} aria-controls={`project-details-${item.key}`} onClick={() => setActive(index)}>
          <span className={s.indicator}>{active === index ? <FiMinus /> : <FiPlus />}</span><span>{item.title}</span>
        </button></h3>
        <div id={`project-details-${item.key}`} role="region" aria-labelledby={`project-button-${item.key}`} className={s.expansion} inert={active !== index} aria-hidden={active !== index}>
          <div className={s.clip}><div className={s.details}>
            <p>{item.description}</p>
            <div className={s.tags}>{item.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
            <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">{item.linkType === "dashboard" ? d.projects.viewDashboard : d.projects.viewRepository}<FiArrowUpRight /></a>
          </div></div>
        </div>
      </div>)}
    </div>
    <div className={s.viewer} onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchCancel={() => { touchStart.current = null; }} onTouchEnd={event => {
      const start = touchStart.current; touchStart.current = null;
      if (!start) return;
      const dx = event.changedTouches[0].clientX - start.x;
      const dy = event.changedTouches[0].clientY - start.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1));
    }}>
      <div className={s.screen} key={selected.key}>
        <p className={s.category}>{selected.category}</p>
        {selected.image ? <a className={s.imageLink} href={selected.projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t("Abrir", "Open")} ${selected.title}`}><img src={selected.image} alt={selected.title} loading="lazy" /></a> : <div className={s.textCover}><span>{String(active + 1).padStart(2, "0")} / {selected.category}</span><strong>{selected.title}</strong><p>{selected.highlight}</p><span>{selected.technologies.slice(0, 3).join(" · ")}</span></div>}
        <div className={s.caption}><h3>{selected.highlight}</h3><ul>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
      </div>
      <div className={s.controls}>
        <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <div className={s.dots}>{items.map((item, index) => <button key={item.key} type="button" aria-label={`${t("Mostrar", "Show")} ${item.title}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></button>)}</div>
        <div className={s.arrows}><button type="button" aria-label={d.projects.previousProject} onClick={() => select(active - 1)}><FiChevronLeft /></button><button type="button" aria-label={d.projects.nextProject} onClick={() => select(active + 1)}><FiChevronRight /></button></div>
      </div>
    </div>
  </div>;
}

