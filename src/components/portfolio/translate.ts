import type { Language } from "@/dictionaries";
export const translate =
  (language: Language) =>
  <T>(pt: T, en: T): T =>
    language === "pt" ? pt : en;
