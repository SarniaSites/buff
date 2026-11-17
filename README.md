# Buff — website

Single-page site for Buff, the nail salon at 14 Le Pollet, St Peter Port. Plain HTML + Tailwind CSS v3 (compiled and committed) + a small vanilla JS file. No frameworks, no runtime CDNs.

## Folder layout

```
index.html              the whole site, sections split by big comment banners
thanks.html             shown after the booking form is sent
404.html                not-found page (uses /buff/ absolute paths – see Going live)
assets/css/styles.css   compiled Tailwind – don't edit by hand, run npm run build
assets/js/main.js       menu, header, reveals/wipes/line-draws, treatments explorer, colour picker (hand), lightbox, form checks
assets/fonts/           self-hosted Bodoni Moda + Jost (woff2) with OFL licences
images/brand/           buff-logo.svg (redrawn from the Facebook logo) + buff-mark.svg (favicon mark)
images/work/            nail photos, each as name.webp (large) + name-sm.webp (small)
images/                 favicons, og-image.jpg (share card), site.webmanifest
src/input.css           Tailwind source, @font-face, animations
tailwind.config.js      brand colours + fonts
sitemap.xml, robots.txt
_fb-pack/               Facebook research pack (not published – leading underscore)
_shots/                 screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| blush-200 | `#f2dcdf` | Logo background; arch behind hero photo, colour picker circle, theme colour |
| blush-50 / 100 | `#fcf7f7` / `#f8eced` | Page background, booking section |
| gold-400 | `#c3a577` | Logo gold; hairline frames, sparkles |
| gold-600 | `#96743f` | Gold text (darker so it stays readable) |
| ink-900 | `#231d1b` | Body text, buttons, footer |
| kraft-100 | `#f6efe6` | Colours section – picks up the kraft paper in the photos |

Fonts: **Bodoni Moda** (headings) and **Jost** (body – a geometric sans close to the logo lettering).
Logo: the Facebook logo is a 2048px raster with a gold gradient; it has been **redrawn as a clean SVG** (same lettering, layout and frame, flat gold).

## Editing

- **Text** – edit `index.html` directly.
- **Colours** – change `tailwind.config.js`, then `npm install` (first time) and `npm run build`.
- **Add a work photo** – export `name.webp` (~1400px) and `name-sm.webp` (~760px) into `images/work/`, then copy one `<figure>` in the *RECENT WORK* section and update `src`, `alt`, `data-full` and `data-caption`.
- **Treatments explorer** – each treatment is a `role="tab"` button plus a matching `role="tabpanel"` block in the *TREATMENTS* section. To add one, copy both and give them new matching ids, and add the option to the form's Treatment `<select>`.
- **Colour picker** – each shade is a `.swatch` button in the *COLOURS* section with `data-colour` (hex) and `data-name`; the drawn hand repaints its nails.
- **Animations** – the hero brush/wave loop is SVG `<animate>` inside the hero (8s cycle); scroll reveals use the classes `reveal`, `wipe` (photos) and `draw` (line drawings) in `src/input.css`. All motion is switched off for visitors with reduced motion set.
- No before/after slider, testimonials or FAQ on this site (see notes below).

## Going live — checklist

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg)
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap `https://sarniasites.github.io/buff/` for the real domain everywhere: canonical, og/twitter tags, JSON-LD, sitemap.xml, robots.txt, the form's `_next`; in `404.html` change the `/buff/` paths to `/`
- [ ] Switch the form from the team's email to the client's (`salon@buffbeauty.gg`?) and activate FormSubmit
- [ ] Confirm phone/email; get the client to sign off the treatments wording
- [ ] Assumptions to check with Buff:
  - Treatment list (Manicures / French tips / Nail art) and the "what's included" points are inferred from their photos and bio. Do they also do pedicures, gel/BIAB, extensions or other beauty treatments (the logo says "Buff Beauty")? Add any to the explorer.
  - Opening hours aren't in the pack, so none are shown.
  - The colour picker shades are taken from their photos, not their actual stock.
  - Only one written review in the pack, so no testimonials section (it names "Katie" – worth asking if she's the owner for an About line).
- [ ] Left out of the site: the Easter greeting post, a COVID-19 notice graphic, the plants cover photo, review/follower counts and the £££ price band (kept only in JSON-LD as `priceRange`).
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

## Source

Built from the Facebook pack in `_fb-pack/` (not published on the live site).
