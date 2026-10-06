// Importa o formato dos textos do rodapé.
import type { pt } from "@/dictionaries/pt";

type FooterProps = {
  content: typeof pt.footer;
};

export function Footer({ content }: FooterProps) {
  // O ano é calculado automaticamente.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-5 pb-8 pt-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {currentYear} Iuran Freire. {content.rights}
        </p>

        <a href="#inicio" className="transition hover:text-cyan-400">
          {content.backToTop} ↑
        </a>
      </div>
    </footer>
  );
}

