# Newlex Designs — Website

**From unseen to unforgettable.** Portfolio website for Newlex Designs, built with **Next.js**, **Tailwind CSS** and **Motion**.

## Run it on your computer

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Where everything lives

```
src/
├── app/                       ← PAGES (each page just lists its sections)
│   ├── page.jsx               Home
│   ├── about/page.jsx         About
│   ├── services/page.jsx      Services
│   ├── portfolio/page.jsx     Portfolio
│   ├── portfolio/[slug]/      One project page (built automatically for every project)
│   ├── contact/page.jsx       Contact
│   ├── api/contact/route.js   Contact form → sends an email (Gmail App Password)
│   ├── layout.jsx             Fonts, navigation bar, footer (wraps every page)
│   └── globals.css            COLOURS, fonts and text styles
│
├── sections/                  ← ONE FILE PER SECTION, grouped by page
│   ├── home/                  Hero (+ HeroMosaic photo wall), WhoWeAre, SelectedWork, Disciplines, ServicesGrid
│   ├── about/                 AboutHero, OurStory, Team, Philosophy
│   ├── services/              ServiceList
│   ├── portfolio/             PortfolioGrid
│   ├── project/               ProjectHeader, ProjectOverview, ProjectResults, ProjectGallery, NextProject
│   └── contact/               ContactSection, ContactForm
│
├── components/
│   ├── layout/                Navbar, Footer, Preloader (intro), SmoothScroll, CursorLabel
│   ├── shared/                PageHeader, CtaBand, FaqSection (used on several pages)
│   └── ui/                    Button, Eyebrow, ProjectCard, RotatingBadge, AutoVideo, Lightbox, SplitText, Reveal…
│
├── content/                   ← TEXT & DATA (edit these without touching design code)
│   ├── hero.js                Home hero — headline text and the photos of the moving wall
│   ├── team.js                The team — names, roles, photos and hover lines
│   ├── projects/              ONE .js FILE PER PROJECT — see projects/README.md
│   ├── services.js
│   ├── studio.js              (not shown at the moment — used by the old Approach/Process sections)
│   └── faqs.js
│
└── config/site.js             Name, tagline, email, phone, location, social links, menu

public/brand/                  Logo files (see "Logo" below)
public/hero/                   Photos for the moving wall on the Home page (01.jpg … 18.jpg)
public/team/                   Team photos
scripts/generate-projects.mjs  Builds the project list automatically
```

Sections that exist but are not on any page right now: `home/Showreel.jsx`, `about/Approach.jsx`,
`about/Process.jsx`. Add them back by importing them in the page file.

## Design system

| Colour     | Name   | Use                                                        |
| ---------- | ------ | ---------------------------------------------------------- |
| `#ffc700`  | yellow | Brand accent — logo mark, highlights, buttons on dark       |
| `#f4f2ee`  | white  | Page background, text on dark backgrounds                   |
| `#08090b`  | black  | Headings, navigation, dark sections, buttons on light       |

Yellow text is hard to read on the light background, so on light sections accent words get a
yellow **marker** underneath instead (`mark` style); on dark sections they are simply yellow.

| Font        | Use                                   |
| ----------- | ------------------------------------- |
| **Manrope** | Headings — bold and modern            |
| **DM Sans** | Paragraphs, buttons and navigation    |

Text styles in `globals.css`: `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-lead`, `type-eyebrow`.

## Common edits

| I want to…                              | Edit                                                           |
| --------------------------------------- | -------------------------------------------------------------- |
| Change the hero photos                  | Replace the files in `public/hero/` (same names), or edit the list in `src/content/hero.js` |
| Change the hero headline / buttons      | `src/content/hero.js`                                          |
| Make the hero wall move faster / slower | `heroSpeed` in `src/content/hero.js`                           |
| Add / change a team member              | `src/content/team.js` + photo in `public/team/`                |
| Add a project                           | Add a file in `src/content/projects/` (see the README there)    |
| Change email, phone, social links       | `src/config/site.js`                                           |
| Change colours                          | Top of `src/app/globals.css`                                   |
| Edit a section                          | The matching file in `src/sections/<page>/`                    |
| Re-order or remove sections             | The page file in `src/app/…/page.jsx`                          |

### Hero photos

The hero is a bento board of 24 project tiles, wider than the screen, that works like a slider: it
slides sideways (and a little up and down) so new projects come in from one edge while others leave
from the other, and along the way one project grows big in the middle ("zooms in") before the board
evens out again ("zooms out"). Photos fill the tiles in list order and repeat after the last one, so
use **18 or more** (landscape, around 1400px wide) — then a photo never shows twice on screen.
The current ones are free placeholders from Unsplash. Photos can also be Cloudflare R2 links — just
paste the link into the list in `src/content/hero.js`. The route it follows (where it slides, which
project it zooms into) is the `ROUTE` list at the top of `src/sections/home/HeroMosaic.jsx`.

### Team photos

Portrait photos (2:3, e.g. 1024 × 1536) go in `public/team/`. The order in `src/content/team.js` is the
order on the website. Each person's `quote` appears over their photo on hover (or tap on phones), while
the photo turns black & white.

### Logo

| File                                | Use                                        |
| ----------------------------------- | ------------------------------------------ |
| `public/brand/newlex-logo-on-dark.png`  | Yellow mark + white text — for dark backgrounds (navigation, footer) |
| `public/brand/newlex-logo-on-light.png` | Yellow mark + black text — for light backgrounds |
| `public/brand/newlex-mark.png`          | The yellow mark on its own                 |
| `src/app/icon.png`                      | Browser tab icon                           |

> If you replace a logo with a new design, give the file a **new name** and update it where it's used —
> browsers keep images for a long time, so a file with the same name may keep showing the old logo.

## Contact form (email)

Enquiries are emailed using Gmail and an **App Password**:

1. Copy `.env.example` to `.env.local` and fill in `SMTP_USER`, `SMTP_PASS` and `CONTACT_TO_EMAIL`.
2. Add the same three values in **Vercel → Project → Settings → Environment Variables**.

Until these are set, form submissions are only printed in the terminal while running locally.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New Project** → import the repository → add the environment variables → **Deploy**.
