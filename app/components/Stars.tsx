'use client'
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function CircularDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const globalAngleRef = useRef(0); // This is the magic

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    opacity: number
  ) => {
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

    // Center of rotation — far below and slightly left for that subtle parallax feel
    const rotationCenterX = () => canvas.width * 0.15;
    const rotationCenterY = () => canvas.height * 2.8;

    const initStars = () => {
      const area = canvas.width * canvas.height;
      const starCount = Math.floor(area / 4200);
      //const cx = rotationCenterX();
      //const cy = rotationCenterY();

      starsRef.current = Array.from({ length: starCount }, () => {
        // Place stars randomly in visible area
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        return {
          x,
          y,
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
      initStars();
      globalAngleRef.current = 0; // optional: reset drift on resize
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const angularSpeed = 0.00008; // Super slow — one full sky rotation = ~18 hours

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;
      globalAngleRef.current += angularSpeed; // Advance the entire sky

      const cx = rotationCenterX();
      const cy = rotationCenterY();
      const cosA = Math.cos(globalAngleRef.current);
      const sinA = Math.sin(globalAngleRef.current);

      starsRef.current.forEach((star) => {
        // Rotate each star's position around the distant center
        const dx = star.x - cx;
        const dy = star.y - cy;
        const rotatedX = dx * cosA - dy * sinA + cx;
        const rotatedY = dx * sinA + dy * cosA + cy;

        if (
          rotatedX > canvas.width + 100 ||
          rotatedY < -100 ||
          rotatedY > canvas.height + 100
        ) {
          // Calculate a new position on the left side of the screen
          const targetX = -Math.random() * 50 - 20; // Start just off-screen left
          const targetY = Math.random() * canvas.height;

          // Inverse rotation to find the original x,y that results in targetX, targetY at current angle
          // We need to solve for star.x and star.y such that they rotate to targetX, targetY
          const tdx = targetX - cx;
          const tdy = targetY - cy;

          // Rotate back by -angle
          // x' = x cos(-a) - y sin(-a) = x cos(a) + y sin(a)
          // y' = x sin(-a) + y cos(-a) = -x sin(a) + y cos(a)
          star.x = tdx * cosA + tdy * sinA + cx;
          star.y = -tdx * sinA + tdy * cosA + cy;

          // Don't draw this frame
          return;
        }

        // Only draw if on-screen (with buffer)
        if (
          rotatedX > -100 &&
          rotatedX < canvas.width + 100 &&
          rotatedY > -100 &&
          rotatedY < canvas.height + 100
        ) {
          const twinkle =
            Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.35 + 0.65;
          const opacity = star.baseOpacity * twinkle;
          drawStar(ctx, rotatedX, rotatedY, star.size, opacity);
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
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
    />
  );
}

