"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "./UserCursor.module.css";

// Original implementation of a pointer with a trailing name label.
export default function UserCursor({ name = "Iuran Freire" }: { name?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    const arrow = arrowRef.current;
    const label = labelRef.current;
    if (!root || !arrow || !label) return;

    const pointerQuery = matchMedia("(hover: hover) and (pointer: fine)");
    const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let pressed = false;
    let x = 0, y = 0, labelX = 0, labelY = 0;
    let previousTime = 0;

    const hide = () => {
      visible = false;
      pressed = false;
      root.style.opacity = "0";
      document.documentElement.classList.remove("portfolio-cursor-active");
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const draw = (time: number) => {
      const dt = Math.min((time - previousTime) / 1000 || 0.016, 0.05);
      previousTime = time;
      const amount = reducedQuery.matches ? 1 : 1 - Math.exp(-22 * dt);
      labelX += (x - labelX) * amount;
      labelY += (y - labelY) * amount;
      // Keep the arrow tip on the actual pointer; only the label trails.
      arrow.style.transform = `translate3d(${x}px,${y}px,0) rotate(-14deg) scale(${pressed ? 0.92 : 1})`;
      const labelWidth = label.offsetWidth;
      const left = Math.max(8, Math.min(innerWidth - labelWidth - 8, labelX + 22));
      const top = Math.max(8, Math.min(innerHeight - 38, labelY + 22));
      const tilt = reducedQuery.matches ? 0 : Math.max(-8, Math.min(8, (x - labelX) * 0.1));
      label.style.transform = `translate3d(${left}px,${top}px,0) rotate(${tilt}deg)`;
      if (visible && (Math.abs(labelX - x) > 0.1 || Math.abs(labelY - y) > 0.1)) {
        frame = requestAnimationFrame(draw);
      } else { frame = 0; }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const move = (event: PointerEvent) => {
      if (!pointerQuery.matches || event.pointerType !== "mouse") { hide(); return; }
      const target = event.target;
      if (target instanceof Element && target.closest('input, textarea, [contenteditable="true"], iframe')) { hide(); return; }
      x = event.clientX;
      y = event.clientY;
      if (!visible) { labelX = x; labelY = y; previousTime = performance.now(); }
      visible = true;
      root.style.opacity = "1";
      document.documentElement.classList.add("portfolio-cursor-active");
      schedule();
    };
    const down = () => { pressed = true; if (visible) schedule(); };
    const up = () => { pressed = false; if (visible) schedule(); };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    const key = (event: KeyboardEvent) => { if (event.key === "Tab" || event.key === "Escape") hide(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointerout", leave);
    document.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("blur", hide);
    pointerQuery.addEventListener("change", hide);
    return () => {
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("blur", hide);
      pointerQuery.removeEventListener("change", hide);
    };
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(<div ref={rootRef} className={styles.root} aria-hidden="true">
    <div ref={arrowRef} className={styles.arrow}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 2L24 13L14 16L10 26L2 2Z" fill="#ef554b" stroke="#fff0eb" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
    <span ref={labelRef} className={styles.label}>{name}</span>
  </div>, document.body);
}

