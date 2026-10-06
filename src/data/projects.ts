// Identificadores internos dos projetos.
// Eles conectam os dados técnicos às traduções.
export type ProjectKey =
  | "qualitySystem"
  | "inventoryDashboard"
  | "productionDashboard"
  | "barcodeCam"
  | "laserValidation"
  | "fpyManagement"
  | "portfolio";

export type Project = {
  id: number;
  key: ProjectKey;
  technologies: string[];
  featured: boolean;
  image?: string;
  projectUrl?: string;
  linkType?: "dashboard" | "repository";
};

// Aqui permanecem apenas informações que não precisam de tradução.
export const projects: Project[] = [
  {
    id: 1,
    key: "qualitySystem",
    technologies: [
      "Vue 3",
      "Node.js",
      "Express",
      "Pinia",
      "Dexie",
    ],
    featured: true,
    image: "/projects/quality-system-cover.png",
    projectUrl: "https://github.com/Iuran-Freire/Quality-System-",
    linkType: "repository",
  },
  {
    id: 2,
    key: "inventoryDashboard",
    technologies: ["Power BI", "Excel", "Power Query"],
    featured: false,
    image: "/projects/dashboard-estoque.png",
    projectUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiMzI5MGEzMDYtNTI4My00NDRjLWFhYTMtZGZjNDc0NjIzMGI2IiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9",
    linkType: "dashboard",
  },
  {
    id: 3,
    key: "productionDashboard",
    technologies: ["Power BI", "Excel", "DAX"],
    featured: false,
    image: "/projects/dashboard-performance-producao.png",
    projectUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiY2EyZjllM2QtNDE5Yi00NDhiLTk3MzMtZTI1YjA1ZThmMTVjIiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9",
    linkType: "dashboard",
  },
  {
    id: 4,
    key: "barcodeCam",
    technologies: ["Python", "Flask", "OpenCV", "SQLite", "Pyzbar"],
    featured: true,
    image: "/projects/barcodecam-cover.png",
    projectUrl: "https://github.com/Iuran-Freire/BarcodeCam",
    linkType: "repository",
  },
  {
    id: 5,
    key: "laserValidation",
    technologies: [
      "JavaScript",
      "PWA",
      "WebAssembly",
      "PaddleOCR",
      "Cloudflare Workers",
      "D1",
      "R2",
    ],
    featured: true,
    projectUrl: "https://github.com/Iuran-Freire/Projeto-Valida-o-da-Laser",
    linkType: "repository",
  },
  {
    id: 6,
    key: "fpyManagement",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Cloudflare Workers",
      "D1",
      "IndexedDB",
      "Drizzle ORM",
      "PWA",
    ],
    featured: true,
    projectUrl: "https://github.com/Iuran-Freire/gestao-fpy",
    linkType: "repository",
  },
  {
    id: 7,
    key: "portfolio",
    technologies: ["React", "TypeScript", "Vinext", "GSAP", "Cloudflare Workers"],
    featured: false,
    projectUrl: "https://github.com/Iuran-Freire/Portifolio-2/tree/source-code",
    linkType: "repository",
  },
];
