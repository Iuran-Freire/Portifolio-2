import type { Language } from "@/dictionaries";
export function getStack(language: Language) {
  const t = (pt: string, en: string) => (language === "pt" ? pt : en);
  const stack = [
    {
      title: "Front-end",
      text: t("Interfaces e experiência", "Interfaces & experience"),
      items: ["React", "Vue 3", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
    {
      title: "Back-end",
      text: t("Lógica, dados e integrações", "Logic, data & integrations"),
      items: [
        "Node.js",
        "Express",
        "Python",
        "Flask",
        "SQL",
        "SQLite",
        "PostgreSQL",
      ],
    },
    {
      title: t("Dados & automação", "Data & automation"),
      text: t(
        "Informação que vira solução",
        "Turning information into solutions",
      ),
      items: ["Power BI", "Excel", "DAX", "Power Query", "OpenCV", "Pyzbar"],
    },
    {
      title: t("Ferramentas & nuvem", "Tools & cloud"),
      text: t("Do código à publicação", "From code to deployment"),
      items: [
        "Git",
        "GitHub",
        "Cloudflare Workers",
        "Cloudflare D1",
        "IndexedDB",
        "Vite",
      ],
    },
  ];
  return stack;
}
