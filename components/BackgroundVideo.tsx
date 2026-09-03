'use client';

import React, { useEffect, useRef } from 'react';

/**
 * BackgroundVideo Component
 * Sits at z-index: -1 fixed to the viewport.
 * Uses hardware-accelerated ambient shader animation with deep black and burgundy gradients.
 */
export default function BackgroundVideo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      time += 0.003;
      
      // Base Obsidian Black
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      // Subtle Burgundy Atmospheric Orbs
      const orbX1 = width * 0.7 + Math.sin(time * 0.8) * (width * 0.15);
      const orbY1 = height * 0.3 + Math.cos(time * 0.6) * (height * 0.15);
      const rad1 = Math.max(width, height) * 0.55;

      const grad1 = ctx.createRadialGradient(orbX1, orbY1, 0, orbX1, orbY1, rad1);
      grad1.addColorStop(0, 'rgba(110, 20, 45, 0.16)');
      grad1.addColorStop(0.5, 'rgba(50, 8, 20, 0.08)');
      grad1.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const orbX2 = width * 0.25 + Math.cos(time * 0.5) * (width * 0.12);
      const orbY2 = height * 0.75 + Math.sin(time * 0.7) * (height * 0.12);
      const rad2 = Math.max(width, height) * 0.45;

      const grad2 = ctx.createRadialGradient(orbX2, orbY2, 0, orbX2, orbY2, rad2);
      grad2.addColorStop(0, 'rgba(70, 15, 30, 0.12)');
      grad2.addColorStop(0.6, 'rgba(25, 5, 12, 0.04)');
      grad2.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Fine Cinematic Vignette
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.2,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(5, 5, 7, 0.85)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
