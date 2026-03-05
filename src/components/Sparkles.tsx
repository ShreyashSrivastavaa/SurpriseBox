import React, { useEffect, useState } from "react";

interface SparkleProps {
  count: number;
  trigger: number; // change to re-trigger
  originX?: number;
  originY?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
}

const sparkleColors = [
  "hsl(340 65% 60%)",
  "hsl(270 45% 78%)",
  "hsl(45 90% 65%)",
  "hsl(160 50% 72%)",
  "hsl(200 70% 82%)",
];

export const SparklesBurst: React.FC<SparkleProps> = ({ count, trigger }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 40 + Math.random() * 20,
      y: 20 + Math.random() * 30,
      delay: Math.random() * 0.3,
      size: 6 + Math.random() * 10,
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
    }));
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 1200);
    return () => clearTimeout(t);
  }, [trigger, count]);

  return (
    <>
      {particles.map((p) => (
        <span
          key={`${trigger}-${p.id}`}
          className="absolute pointer-events-none animate-sparkle-rise"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
            color: p.color,
          }}
        >
          ✦
        </span>
      ))}
    </>
  );
};

/** Ambient sparkles that float up occasionally */
export const AmbientSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle: Particle = {
        id: Date.now(),
        x: 30 + Math.random() * 40,
        y: 60 + Math.random() * 20,
        delay: 0,
        size: 8 + Math.random() * 6,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      };
      setSparkles((prev) => [...prev.slice(-3), newSparkle]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sparkles.length === 0) return;
    const t = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 2200);
    return () => clearTimeout(t);
  }, [sparkles]);

  return (
    <>
      {sparkles.map((p) => (
        <span
          key={p.id}
          className="absolute pointer-events-none animate-sparkle-ambient"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: 0,
          }}
        >
          ✧
        </span>
      ))}
    </>
  );
};
