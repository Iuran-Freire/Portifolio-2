// Importa os dois idiomas disponíveis.
import { en } from "./en";
import { pt } from "./pt";

// Relaciona o código do idioma com seu dicionário.
export const dictionaries = {
  pt,
  en,
};

// Cria automaticamente o tipo "pt" | "en".
export type Language = keyof typeof dictionaries;

// Verifica se o endereço contém um idioma válido.
export function hasLanguage(language: string): language is Language {
  return language in dictionaries;
}

// Retorna os textos do idioma solicitado.
export function getDictionary(language: Language) {
  return dictionaries[language];
}