# WV Entrepreneur Navigator

A central resource hub where aspiring entrepreneurs in West Virginia can find programs, funding, mentorship, and technical resources at every stage of their journey.

**Built by [Vantage Ventures](https://business.wvu.edu/research-outreach/vantage-ventures)**

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
- **Colors & branding**: Update the color constants at the top of `src/App.jsx`
- **Links**: All resource cards link to real WV ecosystem websites

## Resource URLs Included

| Resource | URL |
|----------|-----|
| WV SBDC | https://wvsbdc.com |
| SCORE WV | https://score.org/wv |
| WV BusinessLink | https://wvbusinesslink.com |
| WV Hive Network | https://wvhive.com |
| Vantage Ventures | https://business.wvu.edu/research-outreach/vantage-ventures |
| TechConnect WV | https://techconnectwv.org |
| WV Jobs Investment Trust | https://wvjit.wv.gov |
| Country Roads Angel Network | https://wvcran.com |
| Ascend WV | https://ascendwv.com |
| SBA WV District | https://sba.gov/district/west-virginia |
| WV Economic Development | https://westvirginia.gov |

## Tech Stack

- React 18
- Vite 5
- Google Fonts (Playfair Display + DM Sans)
- Zero external UI libraries — pure CSS-in-JS
