"use client";

import { memo, useEffect, useId, useRef, type HTMLAttributes } from "react";
import "./DotField.css";

const TWO_PI = Math.PI * 2;

// Cada ponto guarda sua posição original e sua posição durante a animação.
interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface DotFieldProps extends HTMLAttributes<HTMLDivElement> {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

const DotField = memo(
  ({
    dotRadius = 1.5,
    dotSpacing = 14,
    cursorRadius = 500,
    cursorForce = 0.1,
    bulgeOnly = true,
    bulgeStrength = 67,
    glowRadius = 160,
    sparkle = false,
    waveAmplitude = 0,
    gradientFrom = "rgba(34, 211, 238, 0.42)",
    gradientTo = "rgba(99, 102, 241, 0.28)",
    glowColor = "#0e7490",
    className = "",
    ...rest
  }: DotFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glowRef = useRef<SVGCircleElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
    const rafRef = useRef<number | null>(null);
    const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
    const glowOpacity = useRef(0);
    const engagement = useRef(0);
    const rebuildRef = useRef<(() => void) | null>(null);
    const propsRef = useRef<Record<string, unknown>>({});
    const glowId = `dot-field-glow-${useId().replace(/:/g, "")}`;

    propsRef.current = {
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const glow = glowRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      let resizeTimer: ReturnType<typeof setTimeout>;

      function buildDots(width: number, height: number) {
        const values = propsRef.current;
        const step = (values.dotRadius as number) + (values.dotSpacing as number);
        const columns = Math.floor(width / step);
        const rows = Math.floor(height / step);
        const paddingX = (width % step) / 2;
        const paddingY = (height % step) / 2;
        const dots: Dot[] = [];

        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            const ax = paddingX + column * step + step / 2;
            const ay = paddingY + row * step + step / 2;
            dots.push({ ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay });
          }
        }
        dotsRef.current = dots;
      }

      function resizeCanvas() {
        const parent = canvas?.parentElement;
        if (!canvas || !parent || !context) return;
        const rectangle = parent.getBoundingClientRect();
        const width = rectangle.width;
        const height = rectangle.height;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        sizeRef.current = {
          w: width,
          h: height,
          offsetX: rectangle.left + window.scrollX,
          offsetY: rectangle.top + window.scrollY,
        };
        buildDots(width, height);
      }

      function scheduleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 100);
      }

      function updatePointer(event: MouseEvent) {
        const size = sizeRef.current;
        mouseRef.current.x = event.pageX - size.offsetX;
        mouseRef.current.y = event.pageY - size.offsetY;
      }

      function updatePointerSpeed() {
        const mouse = mouseRef.current;
        const distance = Math.hypot(mouse.prevX - mouse.x, mouse.prevY - mouse.y);
        mouse.speed += (distance - mouse.speed) * 0.5;
        if (mouse.speed < 0.001) mouse.speed = 0;
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      }

      const speedInterval = window.setInterval(updatePointerSpeed, 20);
      let frame = 0;

      function draw() {
        if (!context) return;
        frame += 1;
        const mouse = mouseRef.current;
        const { w: width, h: height } = sizeRef.current;
        const values = propsRef.current;
        const time = frame * 0.02;
        const targetEngagement = Math.min(mouse.speed / 5, 1);
        engagement.current += (targetEngagement - engagement.current) * 0.06;
        if (engagement.current < 0.001) engagement.current = 0;
        const currentEngagement = engagement.current;
        glowOpacity.current += (currentEngagement - glowOpacity.current) * 0.08;

        if (glow) {
          glow.setAttribute("cx", String(mouse.x));
          glow.setAttribute("cy", String(mouse.y));
          glow.style.opacity = String(glowOpacity.current);
        }

        context.clearRect(0, 0, width, height);
        const gradient = context.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, values.gradientFrom as string);
        gradient.addColorStop(1, values.gradientTo as string);
        context.fillStyle = gradient;
        context.beginPath();

        const radius = (values.dotRadius as number) / 2;
        const influenceRadius = values.cursorRadius as number;
        const influenceRadiusSquared = influenceRadius * influenceRadius;
        const onlyBulge = values.bulgeOnly as boolean;

        dotsRef.current.forEach((dot, index) => {
          const differenceX = mouse.x - dot.ax;
          const differenceY = mouse.y - dot.ay;
          const distanceSquared = differenceX ** 2 + differenceY ** 2;

          if (distanceSquared < influenceRadiusSquared && currentEngagement > 0.01) {
            const distance = Math.sqrt(distanceSquared);
            const angle = Math.atan2(differenceY, differenceX);
            if (onlyBulge) {
              const influence = 1 - distance / influenceRadius;
              const push = influence ** 2 * (values.bulgeStrength as number) * currentEngagement;
              dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
              dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
            } else {
              const move = (500 / Math.max(distance, 1)) * (mouse.speed * (values.cursorForce as number));
              dot.vx -= Math.cos(angle) * move;
              dot.vy -= Math.sin(angle) * move;
            }
          } else if (onlyBulge) {
            dot.sx += (dot.ax - dot.sx) * 0.1;
            dot.sy += (dot.ay - dot.sy) * 0.1;
          }

          if (!onlyBulge) {
            dot.vx *= 0.9;
            dot.vy *= 0.9;
            dot.x = dot.ax + dot.vx;
            dot.y = dot.ay + dot.vy;
            dot.sx += (dot.x - dot.sx) * 0.1;
            dot.sy += (dot.y - dot.sy) * 0.1;
          }

          let drawX = dot.sx;
          let drawY = dot.sy;
          if ((values.waveAmplitude as number) > 0) {
            drawY += Math.sin(dot.ax * 0.03 + time) * (values.waveAmplitude as number);
            drawX += Math.cos(dot.ay * 0.03 + time * 0.7) * (values.waveAmplitude as number) * 0.5;
          }

          const sparkles = values.sparkle && ((((index * 2654435761) ^ (frame >> 3)) >>> 0) % 100) < 3;
          const drawRadius = radius * (sparkles ? 1.8 : 1);
          context.moveTo(drawX + drawRadius, drawY);
          context.arc(drawX, drawY, drawRadius, 0, TWO_PI);
        });

        context.fill();
        rafRef.current = requestAnimationFrame(draw);
      }

      resizeCanvas();
      window.addEventListener("resize", scheduleResize);
      window.addEventListener("mousemove", updatePointer, { passive: true });
      rafRef.current = requestAnimationFrame(draw);
      rebuildRef.current = () => {
        const { w: width, h: height } = sizeRef.current;
        if (width > 0 && height > 0) buildDots(width, height);
      };

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.clearInterval(speedInterval);
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", scheduleResize);
        window.removeEventListener("mousemove", updatePointer);
      };
    }, []);

    // Recria a malha quando o tamanho ou o espaçamento muda.
    useEffect(() => {
      rebuildRef.current?.();
    }, [dotRadius, dotSpacing]);

    return (
      <div aria-hidden="true" className={`dot-field-container ${className}`} {...rest}>
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id={glowId}>
              <stop offset="0%" stopColor={glowColor} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle
            ref={glowRef}
            cx="-9999"
            cy="-9999"
            r={glowRadius}
            fill={`url(#${glowId})`}
            style={{ opacity: 0, willChange: "opacity" }}
          />
        </svg>
      </div>
    );
  },
);

DotField.displayName = "DotField";

export default DotField;

