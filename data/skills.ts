// Define os identificadores internos das categorias.
// Esses valores não aparecem diretamente na tela.
export type SkillCategory =
  | "businessIntelligence"
  | "dataAnalysis"
  | "database"
  | "webDevelopment"
  | "frontend"
  | "backend";

export type Skill = {
  name: string;
  category: SkillCategory;
};

// Os nomes das tecnologias são iguais nos dois idiomas.
// As categorias serão traduzidas dentro dos dicionários.
export const skills: Skill[] = [
  {
    name: "Power BI",
    category: "businessIntelligence",
  },
  {
    name: "Excel",
    category: "dataAnalysis",
  },
  {
    name: "SQL",
    category: "database",
  },
  {
    name: "PostgreSQL",
    category: "database",
  },
  {
    name: "JavaScript",
    category: "webDevelopment",
  },
  {
    name: "TypeScript",
    category: "webDevelopment",
  },
  {
    name: "React",
    category: "frontend",
  },
  {
    name: "Node.js",
    category: "backend",
  },
];