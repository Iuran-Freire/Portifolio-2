"use client";
import { useState } from "react";
import type { IconType } from "react-icons";
import { SiReact, SiVuedotjs, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs, SiExpress, SiPython, SiFlask, SiSqlite, SiPostgresql, SiOpencv, SiGit, SiGithub, SiCloudflareworkers, SiCloudflare, SiVite } from "react-icons/si";
import { FiDatabase, FiBarChart2, FiGrid, FiCode, FiPause, FiPlay } from "react-icons/fi";
import s from "./TechnologyStack.module.css";

type Group = { title: string; text: string; items: string[] };
const icons: Record<string, IconType> = { React: SiReact, "Vue 3": SiVuedotjs, TypeScript: SiTypescript, JavaScript: SiJavascript, "Tailwind CSS": SiTailwindcss, "Node.js": SiNodedotjs, Express: SiExpress, Python: SiPython, Flask: SiFlask, SQL: FiDatabase, SQLite: SiSqlite, PostgreSQL: SiPostgresql, "Power BI": FiBarChart2, Excel: FiGrid, DAX: FiCode, "Power Query": FiDatabase, OpenCV: SiOpencv, Pyzbar: FiCode, Git: SiGit, GitHub: SiGithub, "Cloudflare Workers": SiCloudflareworkers, "Cloudflare D1": SiCloudflare, IndexedDB: FiDatabase, Vite: SiVite };
export default function TechnologyStack({ groups, portuguese }: { groups: Group[]; portuguese: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const [paused, setPaused] = useState(false);
  const technologies = [...new Set(groups.flatMap(group => group.items))];
  const rows = [technologies.slice(0, Math.ceil(technologies.length / 2)), technologies.slice(Math.ceil(technologies.length / 2))];
  return <div>
    <div className={s.loop} data-paused={paused}>
      <div className={s.loopHeader}><span>{portuguese ? "TECNOLOGIAS QUE USO" : "TECHNOLOGIES I USE"}</span><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? (portuguese ? "Retomar animação" : "Resume animation") : (portuguese ? "Pausar animação" : "Pause animation")} aria-pressed={paused}>{paused ? <FiPlay /> : <FiPause />}</button></div>
      <div className={s.fade}>{rows.map((row, index) => <div className={s.track} key={index} data-reverse={index === 1}>{[0, 1].map(copy => <ul key={copy} aria-hidden={copy === 1}>{row.map(name => { const Icon = icons[name] || FiCode; return <li key={name}><Icon aria-hidden="true" /><span>{name}</span></li>; })}</ul>)}</div>)}</div>
    </div>
    <div className={s.layout}>
      <p>{portuguese ? "Desenvolvimento web, dados e automação. Cada projeto pede uma combinação diferente de ferramentas." : "Web development, data and automation. Each project calls for a different combination of tools."}</p>
      <div>{groups.map((group, index) => <div key={group.title} className={s.card} data-open={open === index}>
        <h3><button id={`stack-trigger-${index}`} type="button" aria-expanded={open === index} aria-controls={`stack-panel-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className={s.number}>0{index + 1}</span><strong>{group.title}</strong><small>{group.text}</small><span className={s.plus} aria-hidden="true">+</span></button></h3>
        <div id={`stack-panel-${index}`} role="region" aria-labelledby={`stack-trigger-${index}`} aria-hidden={open !== index} inert={open !== index} className={s.panel}><div className={s.inner}><div className={s.tags}>{group.items.map(name => { const Icon = icons[name] || FiCode; return <span key={name}><Icon aria-hidden="true" />{name}</span>; })}</div></div></div>
      </div>)}</div>
    </div>
  </div>;
}
