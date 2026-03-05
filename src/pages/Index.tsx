import { useState, useCallback } from "react";

const items = [
  { emoji: "🌹", name: "rose" },
  { emoji: "🎂", name: "cake" },
  { emoji: "🧁", name: "cupcake" },
  { emoji: "🎈", name: "balloon" },
  { emoji: "❤️", name: "heart" },
  { emoji: "🎁", name: "gift" },
  { emoji: "🧸", name: "teddy bear" },
  { emoji: "⭐", name: "star" },
];

const messages = [
  "You're amazing, Mannu! ✨",
  "A little something for you! 💕",
  "Hope you smile today! 😊",
  "You deserve a treat! 🍬",
  "Love you, little sis! 💗",
  "You make the world brighter! 🌈",
  "A rose for you! 🌸",
  "You're the sweetest! 🍭",
  "Sending you a big hug! 🤗",
  "Mannu, you're a star! 🌟",
];

const Index = () => {
  const [revealed, setRevealed] = useState<{ emoji: string; message: string } | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [sparkles, setSparkles] = useState<number[]>([]);
  const [wiggle, setWiggle] = useState(false);

  const handleTap = useCallback(() => {
    const item = items[Math.floor(Math.random() * items.length)];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    setRevealed({ emoji: item.emoji, message: msg });
    setAnimKey((k) => k + 1);
    setSparkles(Array.from({ length: 5 }, (_, i) => i));
    setWiggle(true);
    setTimeout(() => setWiggle(false), 400);
    setTimeout(() => setSparkles([]), 1500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 select-none">
      {/* Floating decorations */}
      <div className="fixed top-6 left-6 text-3xl opacity-40 animate-bounce" style={{ animationDuration: "3s" }}>🌸</div>
      <div className="fixed top-10 right-8 text-2xl opacity-30 animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>⭐</div>
      <div className="fixed bottom-12 left-10 text-2xl opacity-30 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1s" }}>🎈</div>
      <div className="fixed bottom-8 right-6 text-3xl opacity-40 animate-bounce" style={{ animationDuration: "2.8s" }}>💗</div>

      <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-6 text-center">
        🎀 A Little Surprise for Mannu 🎀
      </h1>

      {/* Gift Box */}
      <button
        onClick={handleTap}
        className={`relative w-52 h-52 md:w-60 md:h-60 rounded-3xl flex flex-col items-center justify-center cursor-pointer 
          shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 
          border-4 border-primary/30 ${wiggle ? "animate-wiggle" : ""}`}
        style={{ background: "var(--gift-gradient)" }}
      >
        <span className="text-5xl md:text-6xl mb-2">🎁</span>
        <span className="text-primary-foreground font-bold text-lg md:text-xl text-center px-4 drop-shadow">
          Tap for Mannu ❤️
        </span>

        {/* Sparkles */}
        {sparkles.map((i) => (
          <span
            key={`${animKey}-${i}`}
            className="absolute text-xl animate-float-up pointer-events-none"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 40}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            ✨
          </span>
        ))}
      </button>

      {/* Result bubble */}
      {revealed && (
        <div
          key={animKey}
          className="mt-8 animate-pop-in flex flex-col items-center"
        >
          <div
            className="rounded-2xl px-8 py-6 shadow-md border-2 border-accent/40 max-w-xs text-center"
            style={{ backgroundColor: "hsl(var(--bubble-bg))" }}
          >
            <span className="text-6xl md:text-7xl block mb-3">{revealed.emoji}</span>
            <p className="text-foreground font-bold text-lg md:text-xl">{revealed.message}</p>
          </div>
          {/* Speech bubble tail */}
          <div
            className="w-4 h-4 rotate-45 -mt-2 border-b-2 border-r-2 border-accent/40"
            style={{ backgroundColor: "hsl(var(--bubble-bg))" }}
          />
        </div>
      )}

      <p className="mt-10 text-muted-foreground text-sm text-center">
        Keep tapping for more surprises! 🥰
      </p>
    </div>
  );
};

export default Index;
