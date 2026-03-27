"use client";

import { useRef, useState, ReactNode, useCallback } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function TiltCard({ children, className = "", delay = 0 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 10;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    handleInteraction(e.clientX, e.clientY);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0];
    if (touch) handleInteraction(touch.clientX, touch.clientY);
  }

  function handleEnd() {
    setTransform("");
    setGlowPos({ x: 50, y: 50 });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      style={{ transform, transition: transform ? "transform 0.1s ease-out" : "transform 0.4s ease-out" }}
      className={`glass-card p-6 relative overflow-hidden ${className}`}
    >
      {/* Cursor/touch glow highlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(6,182,212,0.12), transparent 60%)`,
          opacity: transform ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
