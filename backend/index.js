const express = require("express");
const cors = require("cors");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Allow requests from the frontend (Netlify) and local dev
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(null, true); // permissive for now; tighten after deploy
    }
  },
  methods: ["GET", "POST", "DELETE"],
}));
app.use(express.json());

// --- Database setup (lowdb JSON file) ---
const dbPath = path.join(__dirname, "db.json");
const adapter = new FileSync(dbPath);
const db = low(adapter);

// Set defaults
db.defaults({ count: 0, history: [] }).write();

// --- Routes ---

// GET /api/state — return current count + history
app.get("/api/state", (req, res) => {
  try {
    const count = db.get("count").value();
    const history = db.get("history").value();
    res.json({ count, history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read state" });
  }
});

// POST /api/tap — record a tap (expects { item: string })
app.post("/api/tap", (req, res) => {
  const { item } = req.body;
  if (!item || typeof item !== "string") {
    return res.status(400).json({ error: "item is required" });
  }
  try {
    db.update("count", (n) => n + 1).write();
    db.get("history").push(item).write();
    const count = db.get("count").value();
    const history = db.get("history").value();
    res.json({ count, history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record tap" });
  }
});

// DELETE /api/reset — reset everything
app.delete("/api/reset", (req, res) => {
  try {
    db.set("count", 0).set("history", []).write();
    res.json({ count: 0, history: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset" });
  }
});

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`SurpriseBox backend running on port ${PORT}`);
});
