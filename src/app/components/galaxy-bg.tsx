"use client";

import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const [width, height] = [window.innerWidth, window.innerHeight];
      [canvas.width, canvas.height] = [width, height];
    };

    const canvasContext = canvas.getContext("2d");
    resizeCanvas();

    starsRef.current = Array.from({ length: 400 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 2,
    }));

    const animate = () => {
      if (!canvasContext) return;

      canvasContext.fillStyle = "rgba(0,0,0,0.15)";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        star.z -= 0.005;
        if (star.z <= 0) star.z = 2;

        const projectedX =
          (star.x - canvas.width / 2) / star.z + canvas.width / 2;
        const projectedY =
          (star.y - canvas.height / 2) / star.z + canvas.height / 2;

        if (
          projectedX < 0 ||
          projectedX > canvas.width ||
          projectedY < 0 ||
          projectedY > canvas.height
        ) {
          star.z = 2;
          return;
        }

        canvasContext.beginPath();
        canvasContext.fillStyle = "rgba(255,255,255,0.3)";
        canvasContext.arc(projectedX, projectedY, 2 - star.z, 0, Math.PI * 2);
        canvasContext.fill();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas className="fixed top-0 left-0 z-[-1]" ref={canvasRef} />;
}
