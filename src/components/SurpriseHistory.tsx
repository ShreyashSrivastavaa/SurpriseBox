import React from "react";
import { surpriseIcons } from "./SurpriseIcons";

interface SurpriseHistoryProps {
  count: number;
  history: string[];
  countBump: boolean;
}

const SurpriseHistory: React.FC<SurpriseHistoryProps> = ({ count, history, countBump }) => {
  const lastFive = history.slice(-5);

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Counter */}
      <div
        className={`glass-card rounded-full px-5 py-2 shadow-sm ${countBump ? "animate-counter-bump" : ""}`}
      >
        <span className="text-foreground font-semibold text-sm md:text-base">
          ✨ Surprises revealed: <span className="text-primary font-bold">{count}</span>
        </span>
      </div>

      {/* History trail */}
      {lastFive.length > 0 && (
        <div className="flex items-center gap-2">
          {lastFive.map((item, i) => {
            const Icon = surpriseIcons[item];
            return Icon ? (
              <div
                key={`${i}-${item}`}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full glass-card p-1 shadow-sm transition-transform hover:scale-110"
                style={{ opacity: 0.5 + (i / lastFive.length) * 0.5 }}
              >
                <Icon className="w-full h-full" />
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default SurpriseHistory;
