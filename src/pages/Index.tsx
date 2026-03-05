import { useState, useCallback, useEffect } from "react";
import GiftBox from "@/components/GiftBox";
import SurpriseReveal from "@/components/SurpriseReveal";
import SurpriseHistory from "@/components/SurpriseHistory";
import { ConfettiBurst } from "@/components/Confetti";

const surpriseItems = ["rose", "cake", "cupcake", "balloon", "heart", "gift", "teddy", "star"];

const messagePool = [
  "You're magic, Mannu! ✨",
  "A rose for the sweetest sister 🌹",
  "Cake? Always! 🎂",
  "You make the world brighter 🌈",
  "Hope this makes you smile 😊",
  "You deserve a party! 🎉",
  "Teddy hug coming your way 🧸",
  "Shine on, star! ⭐",
  "Another little joy for you 💕",
  "You're the best, Mannu! 💗",
  "A cupcake as sweet as you! 🧁",
  "Sending you all the love 💝",
  "You're one in a million! 🌟",
  "This one's just for you! 🎁",
  "Keep being amazing, Mannu! 🦋",
  "A balloon to lift your spirits! 🎈",
];

const MILESTONE_TAPS = [5, 10, 20, 50, 100];
const STORAGE_KEY = "mannu-surprises";

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { count: parsed.count || 0, history: parsed.history || [] };
    }
  } catch { /* ignore */ }
  return { count: 0, history: [] as string[] };
};

const saveState = (count: number, history: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, history }));
  } catch { /* ignore */ }
};

const Index = () => {
  const [state, setState] = useState(loadState);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [wiggle, setWiggle] = useState(false);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [countBump, setCountBump] = useState(false);

  // Persist state changes
  useEffect(() => {
    saveState(state.count, state.history);
  }, [state]);

  const handleTap = useCallback(() => {
    // Random item & message
    const item = surpriseItems[Math.floor(Math.random() * surpriseItems.length)];
    const msg = messagePool[Math.floor(Math.random() * messagePool.length)];

    setCurrentItem(item);
    setCurrentMessage(msg);
    setAnimKey((k) => k + 1);

    // Wiggle box
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);

    // Sparkles
    setSparkleTrigger((t) => t + 1);

    // Counter bump
    setCountBump(true);
    setTimeout(() => setCountBump(false), 300);

    // Update state
    const newCount = state.count + 1;
    const newHistory = [...state.history, item];
    setState({ count: newCount, history: newHistory });

    // Milestone confetti
    if (MILESTONE_TAPS.includes(newCount)) {
      setConfettiTrigger((t) => t + 1);
    }

    // Haptic feedback
    try {
      if (navigator.vibrate) navigator.vibrate(15);
    } catch { /* ignore */ }
  }, [state]);

  return (
    <main className="animated-bg min-h-screen flex flex-col items-center justify-center px-4 py-8 select-none relative overflow-hidden">
      {/* Confetti overlay */}
      <ConfettiBurst trigger={confettiTrigger} />

      {/* Header */}
      <h1 className="font-hand text-3xl md:text-4xl text-primary mb-8 text-center drop-shadow-sm">
        Mannu's Magic Surprises ✨
      </h1>

      {/* Gift Box */}
      <GiftBox onTap={handleTap} wiggle={wiggle} sparkleTrigger={sparkleTrigger} />

      {/* Surprise Reveal Area */}
      <div className="mt-8 min-h-[12rem] md:min-h-[14rem] flex items-start justify-center w-full max-w-sm">
        <SurpriseReveal item={currentItem} message={currentMessage} animKey={animKey} />
      </div>

      {/* History & Counter */}
      <SurpriseHistory count={state.count} history={state.history} countBump={countBump} />

      {/* Noscript fallback */}
      <noscript>
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50 p-8">
          <p className="text-center text-xl font-hand text-foreground">
            Please enable JavaScript to open your surprises, Mannu! ❤️
          </p>
        </div>
      </noscript>
    </main>
  );
};

export default Index;
