# Creative Agents — Restaurant Marketing Website

## ▶ How to Run (Step by Step)

### 1. Extract this ZIP
Unzip the folder anywhere on your computer.

### 2. Open Terminal in the project folder
Right-click the `creative-agents` folder → "Open in Terminal"
(Or: open Terminal, then type `cd path/to/creative-agents`)

### 3. Install dependencies
```bash
npm install
```

### 4. Start the dev server
```bash
npm run dev
```

### 5. Open in browser
Go to: **http://localhost:5173**

---

## Features
- 🌙 Dark / Light mode toggle
- 🌐 English / हिन्दी / मराठी language switcher
- 📍 Live tab highlighting as you scroll
- 🎬 Framer Motion animations throughout
- 📱 Fully responsive (mobile + desktop)
- ✅ Working contact form with success state

## Build for Production
```bash
npm run build
```
Output goes to the `dist/` folder — upload that to any hosting (Netlify, Vercel, etc.)

## Project Structure
```
creative-agents/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx      ← React entry point
    ├── App.jsx       ← Full website (all sections)
    └── index.css     ← Global styles + Tailwind
```
