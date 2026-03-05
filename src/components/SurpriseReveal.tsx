import React from "react";
import { surpriseIcons } from "./SurpriseIcons";

interface SurpriseRevealProps {
  item: string | null;
  message: string | null;
  animKey: number;
}

const SurpriseReveal: React.FC<SurpriseRevealProps> = ({ item, message, animKey }) => {
  if (!item || !message) return (
    <div className="h-48 md:h-56 flex items-center justify-center">
      <p className="text-muted-foreground/50 font-hand text-lg">Your surprises will appear here 💝</p>
    </div>
  );

  const IconComponent = surpriseIcons[item];

  return (
    <div
      key={animKey}
      className="animate-pop-elastic flex flex-col items-center"
      role="status"
      aria-live="polite"
    >
      {/* Speech bubble */}
      <div className="relative glass-card rounded-3xl px-8 py-6 max-w-xs shadow-lg">
        {/* Tail pointing up */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 glass-card"
          style={{ borderBottom: "none", borderRight: "none" }}
        />
        
        {/* Icon */}
        <div className="flex justify-center mb-3">
          {IconComponent && (
            <IconComponent className="w-20 h-20 md:w-24 md:h-24 drop-shadow-md" />
          )}
        </div>

        {/* Message */}
        <p className="text-center font-hand text-xl md:text-2xl text-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SurpriseReveal;
