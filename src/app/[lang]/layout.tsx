import type { ReactNode } from "react";

// Formato das propriedades recebidas pelo layout.
type LanguageLayoutProps = {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  // Obtém o idioma presente no endereço.
  const { lang } = await params;

  // Converte "pt" para o identificador completo "pt-BR".
  const documentLanguage = lang === "pt" ? "pt-BR" : "en";

  return (
    // O atributo lang auxilia leitores de tela e buscadores.
    <div lang={documentLanguage}>
      {children}
    </div>
  );
}