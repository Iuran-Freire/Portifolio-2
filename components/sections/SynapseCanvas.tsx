"use client";

import { useEffect, useRef } from "react";
import styles from "./Skills.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export function SynapseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const galaxy = canvas?.parentElement;
    if (!canvas || !context || !galaxy) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let isVisible = false;
    const pointer = { x: -1000, y: -1000 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const createParticles = () => {
      // No celular usamos menos partículas para preservar bateria e fluidez.
      const amount = width < 600 ? 28 : 72;
      particles = Array.from({ length: amount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.2 + 0.5,
      }));
    };

    const resize = () => {
      const rect = galaxy.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const connectionDistance = width < 600 ? 62 : 94;

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        }

        const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
        const isNearPointer = precisePointer && pointerDistance < 125;

        context.beginPath();
        context.arc(particle.x, particle.y, isNearPointer ? particle.radius * 1.8 : particle.radius, 0, Math.PI * 2);
        context.fillStyle = isNearPointer ? "rgba(103, 232, 249, 0.9)" : "rgba(148, 163, 184, 0.42)";
        context.fill();

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = particles[nextIndex];
          const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
          if (distance >= connectionDistance) continue;

          const opacity = (1 - distance / connectionDistance) * (isNearPointer ? 0.5 : 0.18);
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
          context.lineWidth = isNearPointer ? 1 : 0.6;
          context.stroke();
        }
      });

      if (isVisible && !reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!precisePointer) return;
      const rect = galaxy.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrame);
      resize();
      draw();
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        galaxy.classList.toggle(styles.galaxyActive, isVisible);
        cancelAnimationFrame(animationFrame);
        if (isVisible) draw();
      },
      { threshold: 0.08 },
    );

    resizeObserver.observe(galaxy);
    visibilityObserver.observe(galaxy);
    galaxy.addEventListener("pointermove", handlePointerMove);
    galaxy.addEventListener("pointerleave", handlePointerLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      galaxy.removeEventListener("pointermove", handlePointerMove);
      galaxy.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.synapseCanvas} aria-hidden="true" />;
}

