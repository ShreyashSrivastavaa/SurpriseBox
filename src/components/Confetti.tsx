import React, { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  size: number;
  color: string;
  rotation: number;
  shape: "square" | "circle" | "strip";
}

const colors = [
  "hsl(340 65% 60%)",
  "hsl(270 45% 78%)",
  "hsl(45 90% 65%)",
  "hsl(160 50% 72%)",
  "hsl(200 70% 82%)",
  "hsl(25 90% 72%)",
  "hsl(10 80% 72%)",
];

const shapes: ConfettiPiece["shape"][] = ["square", "circle", "strip"];

export const ConfettiBurst: React.FC<{ trigger: number }> = ({ trigger }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setPieces(newPieces);
    const t = setTimeout(() => setPieces([]), 3500);
    return () => clearTimeout(t);
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={`${trigger}-${p.id}`}
          className="absolute animate-confetti"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${2 + Math.random() * 1.5}s`,
          }}
        >
          <div
            style={{
              width: p.shape === "strip" ? p.size * 0.4 : p.size,
              height: p.shape === "strip" ? p.size * 1.5 : p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "strip" ? "2px" : "2px",
              transform: `rotate(${p.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
