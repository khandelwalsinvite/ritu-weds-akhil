# शुभ विवाह निमंत्रण — Ritu & Akhil

A traditional, mobile-first Indian wedding invitation website (plain HTML, CSS and JavaScript — no build step).
Deep maroon, antique gold and ivory, with Hindi as the primary language and small English captions.

## Edit your details
Everything on the page comes from **`config.js`**: names, families, events, family greetings, contact number,
share text, photo and music. No HTML editing is needed.

- **Events** — add or remove objects in `events`. Events with the same `iso` date are grouped under one date heading.
  Use `times` for one or more lines (`{ label, time }`; leave `label` empty for a single time).
- **Family greetings** — `familyGroups.groups`. Set `openByDefault: true` to show the list expanded.
- **Feature toggles** — `features` (opening screen, countdown, music, buttons, photo).
- **Photo / music** — replace `assets/images/couple.jpg` and the file in `assets/audio/`, or change the paths in `assets`.

## Preview locally
```bash
python -m http.server 8000     # then open http://localhost:8000
```

## Deploy
Upload the folder as-is to Cloudflare Pages, Netlify or GitHub Pages (no build command, output directory `/`).

## WhatsApp link preview
After deploying, change `og:image` in `index.html` to the full URL of your photo
(for example `https://your-site.pages.dev/assets/images/couple.jpg`) — WhatsApp ignores relative image paths.
Wait a few seconds after pasting the link before pressing Send so the preview can load.

## Files
`index.html` structure · `styles.css` design · `config.js` content · `script.js` behaviour · `404.html` not-found page
