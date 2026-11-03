# decks/ — slide deck inbox

Drop a finished deck here as `<slug>.html` and run:

```bash
npm run deck:add            # publishes every .html here that isn't on the site yet
```

The HTML files in this folder are git-ignored — the published copy lives in
R2. Only `src/content/slide-decks.json` (the list the site renders) gets
committed.

## Name the file after its URL

`decks/tanstack-redact.html` → `/slides/tanstack-redact`

Lowercase `a–z`, `0–9` and hyphens only. If the slide tool named the file
after the deck title, `deck:add` suggests a slug.

## Put the metadata in the deck's `<head>` — in English

The site is English, so write the title and description in English even
when the deck itself is Thai or bilingual. Leave the slide tool's `<title>`
as it is and set `deck:title` — it takes precedence.

```html
<meta name="deck:title" content="TanStack Redact: a lighter React runtime"> <!-- default: <title> -->
<meta name="description" content="One or two sentences for the list card and link previews.">
<meta name="deck:source-author" content="Atharva Deosthale">
<meta name="deck:source-url" content="https://appwrite.io/blog/post/tanstack-redact-lighter-react-runtime">

<!-- optional -->
<meta name="deck:source-title" content="TanStack Redact brings a lighter React runtime"> <!-- default: deck:title -->
<meta name="deck:date" content="2026-11-03">                    <!-- default: today -->
<meta name="deck:tags" content="React, TanStack, Performance">
<meta name="deck:slides" content="10">                          <!-- default: number of <section> tags -->
```

## Commands

```bash
npm run deck:add                          # every new deck in decks/
npm run deck:add decks/my-deck.html       # one file (from anywhere); re-run to update a deck
npm run deck:add -- --dry-run             # check metadata only — uploads and writes nothing
npm run deck:remove my-deck               # unpublish: delete from R2 + the list
```

Then commit `src/content/slide-decks.json` and push to deploy.

## One-time setup

1. `npx wrangler login`
2. `.env.local`:
   ```bash
   SLIDES_R2_BUCKET=your-bucket-name
   NEXT_PUBLIC_SLIDES_URL=https://your-r2-public-domain   # also set this in Cloudflare Pages
   ```
