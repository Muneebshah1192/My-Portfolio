'use client';

import React, { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt rotation in degrees
  scale?: number; // Zoom scaling factor on hover
  perspective?: number; // 3D depth perspective in pixels
}

/**
 * ThreeDTilt Component
 * Wraps any card content to provide a smooth, GPU-accelerated interactive 3D mouse tilt effect.
 * Uses vanilla React coordinates calculation and CSS 3D transforms for high performance.
 */
export default function ThreeDTilt({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.02,
  perspective = 1000
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Mouse coordinates relative to card center coordinate (0, 0)
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Normalize coordinates between [-1, 1]
    const px = x / (rect.width / 2);
    const py = y / (rect.height / 2);

    // Calculate dynamic angles (Invert Y offset for correct spatial rotation)
    const rotateX = -py * maxTilt;
    const rotateY = px * maxTilt;

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 35px 2px rgba(212, 175, 55, 0.12)',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease',
      boxShadow: 'none',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
