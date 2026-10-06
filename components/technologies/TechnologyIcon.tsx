import type { IconType } from "react-icons";
import { RiFileExcel2Fill } from "react-icons/ri";
import {
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { TbChartHistogram } from "react-icons/tb";
import { VscDatabase } from "react-icons/vsc";

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
};

export function TechnologyIcon({
  name,
  className = "",
}: TechnologyIconProps) {
  const technology = technologyIcons[name];

  if (!technology) return null;

  const Icon = technology.icon;

  return (
    <Icon
      aria-hidden="true"
      className={className}
      style={{ color: technology.color }}
    />
  );
}


