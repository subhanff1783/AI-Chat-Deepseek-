# 🤖 Universal AI Chat — PWA

A Gemini-style AI chat interface powered by OpenRouter.
Works on **iPhone, Android, Windows, Mac, Linux** — installs like a native app.

---

## 📦 What's in this folder?

```
ai-chat/
├── index.html          ← Main app (entire UI + logic)
├── manifest.json       ← PWA configuration
├── sw.js               ← Service worker (offline support)
├── icons/              ← App icons (all sizes)
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png
│   └── icon-maskable-512x512.png
└── README.md           ← This file
```

---

## 🚀 How to Run & Install

### Option A — GitHub Pages (Recommended, Free)

1. Create a free account at [github.com](https://github.com)
2. Click **New Repository** → name it anything (e.g. `ai-chat`)
3. Upload **all files** (keep the `icons/` folder structure!)
4. Go to **Settings → Pages → Source → main branch → / (root)**
5. Your app is live at: `https://yourusername.github.io/ai-chat/`
6. Share that URL with anyone!

✅ Anyone can now **install it as an app** from that URL.

---

### Option B — Run Locally (Double-click won't work for PWA features)

PWA features (install, offline) require a web server. Use any of these:

**Python (easiest):**
```bash
cd ai-chat
python3 -m http.server 8080
# Open http://localhost:8080
```

**Node.js:**
```bash
npx serve .
# Opens automatically
```

**VS Code:** Install the "Live Server" extension → right-click `index.html` → Open with Live Server

---

### Option C — Share as a File (Basic, no PWA install)

Just zip the entire folder and share it. Recipients:
1. Extract the zip
2. Run a local server (see Option B above)
3. Or open `index.html` directly in browser (chat works, install prompt won't appear)

---

## 📱 Installing on Devices

### Android (Chrome)
1. Visit the app URL in Chrome
2. Tap the **"Install"** banner at the bottom, OR
3. Tap ⋮ menu → **"Add to Home Screen"**
4. The app appears on your home screen!

### iPhone / iPad (Safari)
1. Visit the app URL in Safari (must be Safari, not Chrome on iOS)
2. Tap the **Share** button (□ with arrow) at the bottom
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **"Add"** — done!

### Windows / Mac (Chrome or Edge Desktop)
1. Visit the app URL in Chrome or Edge
2. Look for the **install icon** (⊕) in the address bar, OR
3. Click ⋮ menu → **"Install Universal AI Chat"**
4. The app opens in its own window like a native app!

### Linux (Chrome)
Same as Windows — look for install icon in address bar.

---

## 🔑 First-Time Setup

1. Open the app
2. Click **Settings** (⚙️ in the sidebar)
3. Enter your **OpenRouter API Key**
   - Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys)
   - Many models have a **free tier** — no credit card needed!
4. Choose your **AI Model** (default: `deepseek/deepseek-r1:free`)
5. Click **Save** — start chatting!

---

## 🤖 Recommended Free Models

| Model | Best For |
|-------|----------|
| `deepseek/deepseek-r1:free` | Reasoning, coding, math |
| `meta-llama/llama-3.1-8b-instruct:free` | Fast general chat |
| `google/gemma-3-27b-it:free` | Creative writing |
| `mistralai/mistral-7b-instruct:free` | Balanced, fast |
| `anthropic/claude-3-haiku` | Smart, fast (paid) |
| `openai/gpt-4o` | Best overall (paid) |

Browse all models: [openrouter.ai/models](https://openrouter.ai/models)

---

## ✨ Features

- 💬 Real-time streaming AI responses
- 🌙 Dark / Light mode
- 📝 Markdown + code highlighting
- 🗂 Chat history (stored locally)
- ✏️ Rename & delete chats
- 🧠 Custom system prompt
- 📱 Works offline (loads from cache)
- 🔒 Your API key stays on your device

---

## 🔒 Privacy

- **No data is sent to any server** except OpenRouter for AI responses
- Your API key, chat history, and settings are stored **only on your device**
- Nothing is tracked or logged

---

## 🛠 Troubleshooting

**"Install" button not showing?**
- Must be served over HTTPS or localhost (not file://)
- Must use Chrome, Edge, or Samsung Internet (not Firefox for PWA install)
- On iOS, must use Safari

**Blank screen?**
- Make sure all files are in the same folder (icons/ must be present)
- Try clearing browser cache

**API not working?**
- Double-check your OpenRouter API key in Settings
- Make sure you selected a valid model name
- Check [openrouter.ai/status](https://openrouter.ai/status)
