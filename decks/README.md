# decks/ — slide deck inbox

Drop a finished deck here as `<slug>.html` and run:

```bash
npm run deck:add            # publishes every .html here that isn't on the site yet
```

The HTML files in this folder are git-ignored — the published copy lives in
R2. Only `src/content/slide-decks.json` (the list the site renders) gets
committed.

## Name the file after its URL

`decks/a-complete-guide-to-useeffect.html` → `/slides/a-complete-guide-to-useeffect`

Lowercase `a–z`, `0–9` and hyphens only.

## Put the metadata in the deck's `<head>`

```html
<title>A Complete Guide to useEffect</title>
<meta name="description" content="One or two sentences for the list card and link previews.">
<meta name="deck:source-author" content="Dan Abramov">
<meta name="deck:source-url" content="https://overreacted.io/a-complete-guide-to-useeffect/">

<!-- optional -->
<meta name="deck:source-title" content="A Complete Guide to useEffect"> <!-- default: <title> -->
<meta name="deck:date" content="2026-10-28">                           <!-- default: today -->
<meta name="deck:tags" content="React, Hooks">
<meta name="deck:slides" content="14">                                  <!-- default: number of <section> tags -->
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
