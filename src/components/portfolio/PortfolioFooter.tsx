import { FiArrowUpRight } from "react-icons/fi";
import type { PortfolioProps } from "./types";
import { translate } from "./translate";
import s from "./Portfolio.module.css";
export function PortfolioFooter({ dictionary: d }: PortfolioProps) {
  return (
    <footer className={s.footer}>
      <a className={s.brand} href="#inicio">
        IF<span>.</span>
      </a>
      <span>IURAN FREIRE / FULL STACK DEVELOPER</span>
      <span>© {new Date().getFullYear()} · MANAUS, BRASIL</span>
      <a href="#inicio" aria-label={d.footer.backToTop}>
        <FiArrowUpRight />
      </a>
    </footer>
  );
}
