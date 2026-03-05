# SurpriseBox — Magic Surprises for Mannu ✨

A cute, interactive gift box application built with React, Vite, and a Node.js backend. This project was personalized for Mannu to ensure her surprise counts and history are saved across all her devices!

## 🚀 How it Works

- **Frontend:** A React + Vite application (originally from Lovable) using Tailwind CSS and Shadcn UI.
- **Backend:** A lightweight Express server located in the `/backend` directory.
- **Persistence:** Uses **lowdb** (JSON-based storage) to remember every tap and surprise revealed, even if the page is refreshed or opened on a different device.
- **Fallback:** If the backend is down, it safely falls back to `localStorage`.

## 🛠️ Local Development

1. **Install dependencies:**
   ```sh
   # In the root (for Frontend)
   npm install
   
   # In /backend (for Backend)
   cd backend
   npm install
   ```

2. **Start the applications:**
   ```sh
   # Start Backend (on port 3001)
   cd backend
   npm run dev
   
   # Start Frontend (on port 8080/8081)
   cd ..
   npm run dev
   ```

3. **Open [http://localhost:8081](http://localhost:8081)** to see the magic!

## 🌍 Deployment

To make this live for Mannu, follow these steps:

### 1. Backend (Railway)
- Connect this GitHub repo to **[Railway.app](https://railway.app/)**.
- In the project settings, set the **Root Directory** to `/backend`.
- Railway will automatically deploy it. Copy the generated URL.

### 2. Frontend (Netlify)
- Connect this GitHub repo to **[Netlify.com](https://www.netlify.com/)**.
- Netlify will use the `netlify.toml` automatically.
- **Crucial:** Add an environment variable named `VITE_API_URL` and set its value to your **Railway Backend URL**.
- Once deployed, share the Netlify link with Mannu! 🎁

## 🎒 Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide Icons, Shadcn UI.
- **Backend:** Node.js, Express, lowdb.

