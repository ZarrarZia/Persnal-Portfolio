# Muhammad Zarrar Zia — Portfolio

**AI Developer & Agentic AI Engineer · Karachi, Pakistan**

### 🌐 Live site: **[zarrarzia.netlify.app](https://zarrarzia.netlify.app/)**

[![Live](https://img.shields.io/badge/live-zarrarzia.netlify.app-C9A961?style=flat-square)](https://zarrarzia.netlify.app/)
![Next.js](https://img.shields.io/badge/Next.js-15-000?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000?style=flat-square&logo=three.js)
![Netlify](https://img.shields.io/badge/deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

My personal portfolio, built in Next.js 15. It covers my work on autonomous agents, LLM integrations (OpenAI, Claude, Gemini), RAG pipelines and AI automation.

The design is called **"The Atelier"**. It uses oxblood and aged gold, Cormorant Garamond headings, and has both a day and a night theme. A slowly turning 3D jewel sits in the hero.

---

## ✨ Features

- **Day / night themes.** Every color is a CSS variable, so the whole palette switches with one class. A small inline script picks the theme before the page paints, so there is no flash of the wrong theme.
- **3D jewel in the hero.** An oxblood gem with gold edges, built with React Three Fiber. It reacts to the cursor and recolors itself for each theme.
- **Zia, a chat assistant.** It answers questions about my experience, projects and skills using only the portfolio's own data. It runs fully in the browser with no API key.
- **Small touches:** a gold-ring cursor, a gold-rule loading screen, an optional background sound made live with the Web Audio API (no audio file), a side nav that highlights the current section, and Lenis smooth scrolling.
- **SEO and AI search:** metadata, Open Graph and Twitter cards, Person JSON-LD, a generated social image and favicon, a sitemap, robots rules, an `llms.txt`, and a plain-text fallback for visitors without JavaScript.
- **Speed and accessibility:** the 3D code loads separately so it doesn't slow the first page load, fonts are self-hosted with `next/font`, and heavy motion turns off when `prefers-reduced-motion` is set.
- **Security headers** (HSTS, CSP, Permissions-Policy) set in `netlify.toml`.

## 📑 Sections

Hero · About · Experience · Projects · Skills · Leadership · Education · Achievements · Contact

Featured projects include **AdCraft AI**, **Agent Builder**, **Multi-Agent AI Workflows**, **AI Calling Agent**, **AI LMS Automation**, and enterprise **CRM / CMS SaaS** platforms.

---

## 🧱 Tech Stack

| Layer | Tech |
|---|---|
| Framework | **Next.js 15** (App Router), **React 19**, **TypeScript** |
| Styling | **Tailwind CSS** with CSS-variable design tokens, `tailwindcss-animate` |
| Animation | **Framer Motion**, **GSAP** (ScrollTrigger) |
| 3D | **Three.js**, **React Three Fiber**, **Drei** |
| Smooth scroll | **Lenis** |
| Fonts | Cormorant Garamond (headings) and Inter (body), via `next/font` |
| Hosting | **Netlify** |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Metadata, fonts, JSON-LD, theme script, no-JS fallback
│   ├── page.tsx              # Puts the sections together
│   ├── globals.css           # Design tokens for both themes
│   ├── opengraph-image.tsx   # Generated 1200×630 social card
│   ├── icon.tsx              # Generated favicon
│   └── sitemap.ts · robots.ts
├── components/
│   ├── layout/               # TopBar, SideNav, Navbar, Footer
│   ├── providers/            # ThemeProvider, SmoothScrollProvider
│   ├── sections/             # Hero, About, Experience, Projects, Skills, …
│   ├── three/                # Jewel + JewelScene (3D hero)
│   └── ui/                   # Loader, CustomCursor, ThemeToggle, ZiaAssistant, …
├── hooks/                    # useAmbientSound, useMousePosition, usePrefersReducedMotion
├── lib/
│   ├── site.ts               # ⭐ Name, role, contact details, social links, live URL
│   ├── data.ts               # ⭐ All portfolio content
│   ├── sections.ts           # Section order (drives the side nav)
│   └── zia-brain.ts          # How the Zia assistant matches questions to answers
└── types/
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/ZarrarZia/Persnal-Portfolio.git
cd Persnal-Portfolio
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint
```

Needs Node 18.18 or newer. No environment variables are required.

## ✏️ Editing Content

The site reads all its content from data files, so you rarely need to touch the components:

- **`src/lib/site.ts`** has the name, role, bio, contact details, social links and the live URL (`siteConfig.url`). The URL is used for canonical links, Open Graph tags, the sitemap and JSON-LD.
- **`src/lib/data.ts`** has the timeline, experience, projects, skills, leadership and achievements.
- **`src/lib/zia-brain.ts`** controls what the Zia assistant answers.

## ☁️ Deployment

The site is deployed on **Netlify** at **https://zarrarzia.netlify.app/**. Netlify's Next.js adapter handles the build, and `netlify.toml` only adds security and caching headers. To deploy your own copy, import the repo into Netlify or Vercel. The Next.js framework preset is detected automatically.

---

## 📬 Contact

- **Portfolio:** [zarrarzia.netlify.app](https://zarrarzia.netlify.app/)
- **LinkedIn:** [muhammad-zarrar-zia](https://linkedin.com/in/muhammad-zarrar-zia-677788293)
- **Email:** [mzarrar03@gmail.com](mailto:mzarrar03@gmail.com)

## 📜 License

[MIT](LICENSE) © 2026 Muhammad Zarrar Zia
