'use client'

import { useEffect, useRef } from "react";

export function ShootingStar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animationId: number;

    const startNewShootingStar = () => {
      let startTime = Date.now();
      const duration = 2400;
      const startX = canvas.width + 100;
      const startY = Math.random() * (canvas.height * 0.5);
      const endX = -200;
      const endY = startY + canvas.height * 0.6;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (progress < 1) {
          const x = startX + (endX - startX) * easeOut;
          const y = startY + (endY - startY) * easeOut;

          // Much softer trail
          const gradient = ctx.createLinearGradient(startX, startY, x, y);
          gradient.addColorStop(0, "rgba(180, 220, 255, 0)");           // invisible
          gradient.addColorStop(0.3, "rgba(200, 230, 255, 0.08)");      // very faint
          gradient.addColorStop(0.7, "rgba(220, 240, 255, 0.25)");     // soft glow
          gradient.addColorStop(1, "rgba(240, 248, 255, 0.5)");        // gentle white head

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5;        // slightly thinner
          ctx.lineCap = "round";
          ctx.globalAlpha = 0.8;      // overall 20% transparency
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.globalAlpha = 1;        // reset

          // Softer star with reduced glow
          drawStar(ctx, x, y, 6 + Math.sin(elapsed * 0.01) * 1.5);

          animationId = requestAnimationFrame(animate);
        } else {
          setTimeout(startNewShootingStar, Math.random() * 7000 + 5000);
        }
      };

      animate();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);

      // Very soft glow
      ctx.shadowBlur = 12;                    // reduced from 20
      ctx.shadowColor = "rgba(200, 230, 255, 0.4)";  // much fainter blue glow

      ctx.fillStyle = "rgba(245, 250, 255, 0.8)";    // softer white

      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5;
        const radius = i % 2 === 0 ? size : size * 0.4;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Tiny bright core
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#fff";
      ctx.fillStyle = "#fff";
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.restore();
    };

    startNewShootingStar();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}
