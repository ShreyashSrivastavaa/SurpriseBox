import { useState, useCallback, useEffect, useRef } from "react";
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
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// --- localStorage helpers (fallback) ---
const loadLocalState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { count: parsed.count || 0, history: parsed.history || [] };
    }
  } catch { /* ignore */ }
  return { count: 0, history: [] as string[] };
};

const saveLocalState = (count: number, history: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, history }));
  } catch { /* ignore */ }
};

// --- API helpers ---
const fetchState = async (): Promise<{ count: number; history: string[] } | null> => {
  try {
    const res = await fetch(`${API_URL}/api/state`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const postTap = async (item: string): Promise<{ count: number; history: string[] } | null> => {
  try {
    const res = await fetch(`${API_URL}/api/tap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const Index = () => {
  const [state, setState] = useState<{ count: number; history: string[] }>({ count: 0, history: [] });
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [wiggle, setWiggle] = useState(false);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [countBump, setCountBump] = useState(false);
  const useBackend = useRef(true);

  // Load state on mount — prefer backend, fall back to localStorage
  useEffect(() => {
    (async () => {
      const remote = await fetchState();
      if (remote) {
        setState(remote);
        saveLocalState(remote.count, remote.history);
      } else {
        useBackend.current = false;
        setState(loadLocalState());
      }
    })();
  }, []);

  const handleTap = useCallback(async () => {
    const item = surpriseItems[Math.floor(Math.random() * surpriseItems.length)];
    const msg = messagePool[Math.floor(Math.random() * messagePool.length)];

    setCurrentItem(item);
    setCurrentMessage(msg);
    setAnimKey((k) => k + 1);
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);
    setSparkleTrigger((t) => t + 1);
    setCountBump(true);
    setTimeout(() => setCountBump(false), 300);

    let newState: { count: number; history: string[] };

    if (useBackend.current) {
      const remote = await postTap(item);
      if (remote) {
        newState = remote;
        saveLocalState(remote.count, remote.history);
      } else {
        // Backend failed mid-session — fall back to local
        useBackend.current = false;
        const local = loadLocalState();
        newState = { count: local.count + 1, history: [...local.history, item] };
        saveLocalState(newState.count, newState.history);
      }
    } else {
      const local = loadLocalState();
      newState = { count: local.count + 1, history: [...local.history, item] };
      saveLocalState(newState.count, newState.history);
    }

    setState(newState);

    if (MILESTONE_TAPS.includes(newState.count)) {
      setConfettiTrigger((t) => t + 1);
    }

    try {
      if (navigator.vibrate) navigator.vibrate(15);
    } catch { /* ignore */ }
  }, []);

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


