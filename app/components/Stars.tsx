'use client'

import { useEffect, useRef } from "react";

interface Star {
  orbitRadius: number;
  angle: number;
  angularSpeed: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function CircularDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationIdRef = useRef<number>(null);

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
    const outer = size;
    const inner = size * 0.4;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Virtual rotation center — far below the screen for wide natural arcs
    let rotationCenterY = canvas.height * 2.8;
    let rotationCenterX = canvas.width * 0.15;

    const initStars = () => {
      const area = canvas.width * canvas.height;
      const starCount = Math.floor(area / 4200); // 300–800+ stars depending on screen size

      starsRef.current = Array.from({ length: starCount }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        const dx = x - rotationCenterX;
        const dy = y - rotationCenterY;
        const angle = Math.atan2(dy, dx);
        const orbitRadius = Math.hypot(dx, dy);

        return {
          orbitRadius,
          angle,
          angularSpeed: 0.00007 + Math.random() * 0.00007, // ultra-slow, realistic
          size: Math.random() * 1.8 + 0.4,
          baseOpacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinklePhase: Math.random() * 1000,
        };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      rotationCenterX = canvas.width * 0.15;
      rotationCenterY = canvas.height * 2.8;
      initStars();
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 1;

      const cx = canvas.width * 0.15;
      const cy = canvas.height * 2.8;

      starsRef.current.forEach((star) => {
        star.angle += star.angularSpeed;

        const x = cx + Math.cos(star.angle) * star.orbitRadius;
        const y = cy + Math.sin(star.angle) * star.orbitRadius;

        if (x > -100 && x < canvas.width + 100 && y > -100 && y < canvas.height + 100) {
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.35 + 0.65;
          const opacity = star.baseOpacity * twinkle;
          drawStar(ctx, x, y, star.size, opacity);
        }
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen"
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
}
