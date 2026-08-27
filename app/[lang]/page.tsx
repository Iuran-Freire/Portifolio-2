// notFound exibe uma página 404 para idiomas inexistentes.
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Stars } from "@/components/react-bits/Stars";
import { getDictionary, hasLanguage } from "@/dictionaries";
import type { Metadata } from "next";

// Define o formato dos parâmetros recebidos pelo endereço.
type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

// Cria os metadados de acordo com o idioma do endereço.
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  // Se o idioma não existir, a página principal cuidará do erro 404.
  if (!hasLanguage(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function Home({ params }: PageProps) {
  // Obtém o idioma presente no endereço: /pt ou /en.
  const { lang } = await params;

  // Impede o acesso com um idioma não suportado.
  if (!hasLanguage(lang)) {
    notFound();
  }

  // Carrega os textos correspondentes ao idioma.
  const dictionary = getDictionary(lang);

  return (
    <div className="site-shell min-h-screen text-white">
      <div className="site-stars" aria-hidden="true">
        <Stars global />
      </div>
      {/* Elementos cinematográficos criam profundidade sem competir com o conteúdo. */}
      <div className="site-ambience" aria-hidden="true">
        <span className="space-black-hole" />
        <span className="space-nebula space-nebula-cold" />
        <span className="space-planet" />
        <span className="space-dust" />
      </div>
      {/* Envia os textos traduzidos para o cabeçalho */}
      <Header content={dictionary.header} />

      <main className="site-content">
        {/* Envia os textos selecionados para o componente Hero */}
        <Hero content={dictionary.hero} />

        {/* Envia a tradução da seção Sobre */}
        <About content={dictionary.about} />

        {/* Envia os textos e categorias traduzidos */}
        <Skills content={dictionary.skills} />

        {/* Envia os textos traduzidos dos projetos */}
        <Projects content={dictionary.projects} />

        <Contact content={dictionary.contact} language={lang} />
      </main>

      <Footer content={dictionary.footer} />
    </div>
  );
}
