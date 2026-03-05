import React from "react";
import { SparklesBurst, AmbientSparkles } from "./Sparkles";

interface GiftBoxProps {
  onTap: () => void;
  wiggle: boolean;
  sparkleTrigger: number;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onTap, wiggle, sparkleTrigger }) => {
  return (
    <div className="relative">
      {/* Ambient sparkles around the box */}
      <AmbientSparkles />

      {/* Main box button */}
      <button
        onClick={onTap}
        aria-label="Tap to reveal a surprise for Mannu"
        className={`relative w-48 h-48 md:w-56 md:h-56 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-ring
          ${wiggle ? "animate-wiggle-shake" : "animate-float"}
        `}
        style={{ perspective: "600px" }}
      >
        {/* Box shadow on ground */}
        <div
          className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, hsl(var(--foreground)), transparent)" }}
        />

        {/* Box body */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full rounded-xl rounded-t-none"
          style={{
            height: "65%",
            background: "linear-gradient(135deg, hsl(var(--mint)), hsl(var(--secondary)))",
            boxShadow: "inset -4px -4px 8px rgba(0,0,0,0.08), inset 2px 2px 4px rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          {/* Vertical ribbon */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-5 h-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(340 75% 68%), hsl(var(--primary)))",
              backgroundSize: "200% 100%",
              animation: "ribbon-shimmer 3s linear infinite",
            }}
          />
        </div>

        {/* Lid */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[108%] rounded-xl ${wiggle ? "animate-lid-bounce" : ""}`}
          style={{
            height: "38%",
            background: "linear-gradient(135deg, hsl(var(--sky)), hsl(var(--box-lid)))",
            boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.06), inset 2px 2px 4px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.08)",
            transformOrigin: "bottom center",
          }}
        >
          {/* Horizontal ribbon on lid */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-full h-5"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(340 75% 68%), hsl(var(--primary)))",
              backgroundSize: "200% 100%",
              animation: "ribbon-shimmer 3s linear infinite",
            }}
          />
          {/* Bow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-end gap-0">
            <div
              className="w-5 h-7 rounded-full -rotate-[30deg] origin-bottom-right"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(340 80% 70%))" }}
            />
            <div
              className="w-5 h-7 rounded-full rotate-[30deg] origin-bottom-left"
              style={{ background: "linear-gradient(135deg, hsl(340 80% 70%), hsl(var(--primary)))" }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
            />
          </div>
        </div>

        {/* Sparkle burst on tap */}
        <SparklesBurst count={12} trigger={sparkleTrigger} />
      </button>

      {/* Tap instruction */}
      <p className="text-center mt-4 text-muted-foreground font-medium text-sm md:text-base animate-pulse">
        Tap the box, Mannu ✨
      </p>
    </div>
  );
};

export default GiftBox;
