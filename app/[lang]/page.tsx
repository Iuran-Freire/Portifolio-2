// notFound exibe uma página 404 para idiomas inexistentes.
import { notFound } from "next/navigation";

import { EditorialPortfolio } from "@/components/EditorialPortfolio";
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

  return <EditorialPortfolio dictionary={dictionary} language={lang} />;
}
