"use client";

import { useEffect, useRef } from "react";
import styles from "./Stars.module.css";

type Star = { x: number; y: number; size: number; depth: number; phase: number };

type StarsProps = { global?: boolean };

export function Stars({ global = false }: StarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let cameraX = 0;
    let cameraY = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    let stars: Star[] = [];

    const createStars = () => {
      const amount = coarsePointer ? 75 : 140;
      let seed = 1709;
      const random = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
      stars = Array.from({ length: amount }, () => ({
        x: random() * width,
        y: random() * height,
        size: 0.45 + random() * 1.45,
        depth: 0.2 + random() * 0.8,
        phase: random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createStars();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      cameraX += (pointerX - cameraX) * 0.035;
      cameraY += (pointerY - cameraY) * 0.035;

      for (const star of stars) {
        const x = (star.x + cameraX * star.depth + width) % width;
        const y = (star.y + cameraY * star.depth + height) % height;
        const pulse = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.0013 + star.phase) * 0.28;
        context.beginPath();
        context.arc(x, y, star.size * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,255,255,${0.48 + star.depth * 0.5})`;
        context.fill();
      }

      if (visible && !reducedMotion) frame = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      if (coarsePointer) return;
      const bounds = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 34;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 22;
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reducedMotion) frame = requestAnimationFrame(draw);
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });
    resize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className={`${styles.canvas} ${global ? styles.global : ""}`} aria-hidden="true" />;
}

