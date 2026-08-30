import type { IconType } from "react-icons";
import { RiFileExcel2Fill } from "react-icons/ri";
import {
  SiExpress,
  SiFlask,
  SiJavascript,
  SiNodedotjs,
  SiOpencv,
  SiPinia,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSqlite,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbChartHistogram, TbMathFunction, TbTransform } from "react-icons/tb";
import { VscCode, VscDatabase } from "react-icons/vsc";

type TechnologyIconData = {
  icon: IconType;
  color: string;
};

type TechnologyIconProps = {
  name: string;
  className?: string;
};

// Fonte única das logos e cores usadas em diferentes partes do portfólio.
const technologyIcons: Record<string, TechnologyIconData> = {
  "Power BI": { icon: TbChartHistogram, color: "#f2c811" },
  Excel: { icon: RiFileExcel2Fill, color: "#217346" },
  SQL: { icon: VscDatabase, color: "#67e8f9" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169e1" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  React: { icon: SiReact, color: "#61dafb" },
  "Node.js": { icon: SiNodedotjs, color: "#5fa04e" },
  "Vue 3": { icon: SiVuedotjs, color: "#42b883" },
  Express: { icon: SiExpress, color: "#e2e8f0" },
  Pinia: { icon: SiPinia, color: "#ffd859" },
  Dexie: { icon: VscDatabase, color: "#8b5cf6" },
  "Power Query": { icon: TbTransform, color: "#22c55e" },
  DAX: { icon: TbMathFunction, color: "#f2c811" },
  Python: { icon: SiPython, color: "#3776ab" },
  Flask: { icon: SiFlask, color: "#f8fafc" },
  OpenCV: { icon: SiOpencv, color: "#5c3ee8" },
  SQLite: { icon: SiSqlite, color: "#38bdf8" },
};

export function TechnologyIcon({
  name,
  className = "",
}: TechnologyIconProps) {
  const technology = technologyIcons[name];

  if (!technology) {
    return <VscCode aria-hidden="true" className={className} style={{ color: "#67e8f9" }} />;
  }

  const Icon = technology.icon;

  return (
    <Icon
      aria-hidden="true"
      className={className}
      style={{ color: technology.color }}
    />
  );
}

