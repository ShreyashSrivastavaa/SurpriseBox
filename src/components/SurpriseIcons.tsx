import React from "react";

/** Inline SVG surprise icons – 64×64 viewBox, pastel‑colored */

export const RoseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Rose">
    <ellipse cx="32" cy="22" rx="14" ry="12" fill="#e88da0" />
    <ellipse cx="28" cy="20" rx="8" ry="7" fill="#f2a5b5" />
    <ellipse cx="36" cy="18" rx="7" ry="6" fill="#d4768a" />
    <ellipse cx="32" cy="25" rx="5" ry="4" fill="#c2566e" />
    <path d="M32 34 Q30 44 28 56" stroke="#5cb85c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M28 42 Q22 38 20 42 Q22 44 28 42Z" fill="#7dce82" />
    <path d="M30 48 Q36 44 38 48 Q36 50 30 48Z" fill="#7dce82" />
  </svg>
);

export const CakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Cake">
    <rect x="14" y="30" width="36" height="22" rx="4" fill="#ffd3b5" />
    <rect x="14" y="30" width="36" height="8" rx="4" fill="#ffaaa5" />
    <rect x="10" y="24" width="44" height="8" rx="4" fill="#f8c8dc" />
    <ellipse cx="18" cy="24" rx="3" ry="2" fill="#fff" opacity="0.5" />
    <ellipse cx="32" cy="24" rx="3" ry="2" fill="#fff" opacity="0.5" />
    <ellipse cx="46" cy="24" rx="3" ry="2" fill="#fff" opacity="0.5" />
    <rect x="30" y="12" width="4" height="14" rx="2" fill="#ffe0a0" />
    <ellipse cx="32" cy="10" rx="3" ry="4" fill="#ff9966" />
    <ellipse cx="32" cy="9" rx="1.5" ry="2" fill="#ffcc00" />
  </svg>
);

export const CupcakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Cupcake">
    <path d="M18 34 L22 54 H42 L46 34 Z" fill="#ffe0a0" />
    <path d="M20 38 L44 38" stroke="#f0c878" strokeWidth="1" />
    <path d="M21 44 L43 44" stroke="#f0c878" strokeWidth="1" />
    <ellipse cx="32" cy="30" rx="18" ry="8" fill="#f8a4c8" />
    <ellipse cx="26" cy="28" rx="6" ry="5" fill="#f2c0d8" />
    <ellipse cx="38" cy="28" rx="6" ry="5" fill="#e890b8" />
    <ellipse cx="32" cy="26" rx="5" ry="4" fill="#f8b8d0" />
    <circle cx="32" cy="20" r="3" fill="#ff6b8a" />
  </svg>
);

export const BalloonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Balloon">
    <ellipse cx="32" cy="24" rx="14" ry="18" fill="#a8d8ea" />
    <ellipse cx="27" cy="18" rx="4" ry="6" fill="#c8e8f5" opacity="0.6" />
    <path d="M32 42 L30 46 L34 46 Z" fill="#8cc0d8" />
    <path d="M32 46 Q28 52 32 58 Q36 52 32 46" stroke="#ccc" strokeWidth="1" fill="none" />
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Heart">
    <path
      d="M32 52 C20 40 8 30 8 20 C8 12 14 6 22 6 C27 6 30 9 32 12 C34 9 37 6 42 6 C50 6 56 12 56 20 C56 30 44 40 32 52Z"
      fill="#e86a92"
    />
    <path
      d="M22 10 C18 10 12 14 12 20 C12 24 14 28 18 32"
      stroke="#f2a0b8"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const GiftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Gift">
    <rect x="10" y="28" width="44" height="28" rx="4" fill="#b8a0d8" />
    <rect x="10" y="22" width="44" height="10" rx="4" fill="#c8b0e8" />
    <rect x="29" y="22" width="6" height="34" fill="#e86a92" />
    <rect x="10" y="24" width="44" height="6" rx="2" fill="none" />
    <path d="M32 22 C28 18 22 14 26 10 C30 8 32 14 32 22Z" fill="#e86a92" />
    <path d="M32 22 C36 18 42 14 38 10 C34 8 32 14 32 22Z" fill="#f08ca8" />
  </svg>
);

export const TeddyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Teddy Bear">
    <circle cx="18" cy="14" r="8" fill="#d4a574" />
    <circle cx="18" cy="14" r="4" fill="#c49464" />
    <circle cx="46" cy="14" r="8" fill="#d4a574" />
    <circle cx="46" cy="14" r="4" fill="#c49464" />
    <ellipse cx="32" cy="30" rx="18" ry="16" fill="#d4a574" />
    <ellipse cx="32" cy="44" rx="14" ry="14" fill="#d4a574" />
    <ellipse cx="32" cy="34" rx="10" ry="7" fill="#e8c8a0" />
    <ellipse cx="32" cy="32" rx="5" ry="3" fill="#c49464" />
    <circle cx="26" cy="26" r="2.5" fill="#3a2a1a" />
    <circle cx="38" cy="26" r="2.5" fill="#3a2a1a" />
    <circle cx="27" cy="25" r="0.8" fill="#fff" />
    <circle cx="39" cy="25" r="0.8" fill="#fff" />
    <ellipse cx="32" cy="36" rx="3" ry="2" fill="#e86a92" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-label="Star">
    <path
      d="M32 4 L38 24 L58 24 L42 36 L48 56 L32 44 L16 56 L22 36 L6 24 L26 24 Z"
      fill="#ffd648"
    />
    <path
      d="M32 10 L36 24 L48 24 L38 32 L42 46 L32 38 L22 46 L26 32 L16 24 L28 24 Z"
      fill="#ffe880"
      opacity="0.5"
    />
  </svg>
);

export const surpriseIcons: Record<string, React.FC<{ className?: string }>> = {
  rose: RoseIcon,
  cake: CakeIcon,
  cupcake: CupcakeIcon,
  balloon: BalloonIcon,
  heart: HeartIcon,
  gift: GiftIcon,
  teddy: TeddyIcon,
  star: StarIcon,
};
