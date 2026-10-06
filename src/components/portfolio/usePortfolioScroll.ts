"use client";
import { useEffect, useState } from "react";
import type { Language } from "@/dictionaries";
import s from "./Portfolio.module.css";
export function usePortfolioScroll(language: Language) {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    const sections =
      document.querySelectorAll<HTMLElement>("main > section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal-visible", "true");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    sections.forEach((section) => {
      if (section.id === "inicio" || reducedMotion.matches) {
        section.setAttribute("data-reveal-visible", "true");
        return;
      }
      section.classList.add(s.revealSection);
      if (section.getBoundingClientRect().top < window.innerHeight * 0.88) {
        section.setAttribute("data-reveal-visible", "true");
      } else {
        revealObserver.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, [language]);
  return active;
}
