# WV Founder Hub

West Virginia's startup ecosystem navigator — a single landing page where aspiring entrepreneurs can find the right programs, funding, grants, mentorship, and technical resources at every stage of their journey.

**Built by [Vantage Ventures](https://vantageventures.com) · Wheeling, WV**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy to Vercel

### Option A: Via GitHub
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Vite — click **Deploy**

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — ready for any static hosting.

## Customization

- **Resources & programs**: Edit the `RESOURCES` array in `src/App.jsx`
- **Founder stages**: Edit the `STAGES` array in `src/App.jsx`
- **Colors & branding**: Update CSS variables and color values in the component
- **Links**: Replace `href="#"` placeholders with real URLs

## Tech Stack

- React 18
- Vite 5
- Google Fonts (Playfair Display + DM Sans)
- Zero external UI libraries — pure CSS-in-JS
