/**
 * Publish slide decks to R2 and register them on the site.
 *
 *   npm run deck:add                       every new .html in decks/
 *   npm run deck:add decks/my-deck.html    specific file(s); re-running updates
 *   npm run deck:add -- --dry-run          check metadata only, change nothing
 *   npm run deck:remove my-deck            unpublish (R2 file + list entry)
 *
 * Metadata comes from each deck's <head> (see decks/README.md); the slug is
 * the file name. Uploads go through Wrangler (`npx wrangler login` once) to
 * the bucket in SLIDES_R2_BUCKET (.env.local). Every file is validated
 * before anything is uploaded, and src/content/slide-decks.json is written
 * last, so the site never lists a deck that isn't on R2.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const INBOX = join(ROOT, "decks");
const MANIFEST = join(ROOT, "src/content/slide-decks.json");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

class DeckError extends Error {}

try {
  process.loadEnvFile(join(ROOT, ".env.local"));
} catch {
  /* no .env.local — fine for --dry-run */
}

const rel = (file) => relative(process.cwd(), file) || file;
const today = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local

// ---------- reading a deck's <head> ----------

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text) {
  return text
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
      const key = entity.toLowerCase();
      if (key.startsWith("#x")) return String.fromCodePoint(Number.parseInt(key.slice(2), 16));
      if (key.startsWith("#")) return String.fromCodePoint(Number.parseInt(key.slice(1), 10));
      return ENTITIES[key] ?? match;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function readHead(html) {
  const head = html.match(/<head[\s>][\s\S]*?<\/head>/i)?.[0] ?? html;
  const meta = new Map();
  for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = {};
    for (const [, key, , dq, sq, bare] of tag.matchAll(
      /([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g
    )) {
      attrs[key.toLowerCase()] = dq ?? sq ?? bare;
    }
    if (attrs.name && attrs.content !== undefined) {
      meta.set(attrs.name.toLowerCase(), decode(attrs.content));
    }
  }
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return {
    title: title ? decode(title) : "",
    meta,
    sectionCount: (html.match(/<section\b/gi) ?? []).length,
  };
}

/** Builds the manifest entry for one deck file; collects every problem. */
function deckFromFile(file, existing) {
  const slug = basename(file, extname(file));
  if (!SLUG_RE.test(slug)) {
    throw new DeckError(
      `${rel(file)}: rename the file to a URL-safe slug, e.g. "my-deck-title.html" (a–z, 0–9 and hyphens).`
    );
  }

  const { title, meta, sectionCount } = readHead(readFileSync(file, "utf8"));
  const problems = [];
  const required = (value, hint) => {
    if (!value) problems.push(`missing ${hint}`);
    return value ?? "";
  };

  const summary = required(meta.get("description"), '<meta name="description" content="…">');
  const author = required(meta.get("deck:source-author"), '<meta name="deck:source-author" content="…">');
  const url = required(meta.get("deck:source-url"), '<meta name="deck:source-url" content="https://…">');
  required(title, "<title>…</title>");
  if (url && !/^https?:\/\/\S+$/.test(url)) problems.push(`deck:source-url "${url}" must be an http(s) URL`);

  const date = meta.get("deck:date") ?? existing?.date ?? today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    problems.push(`deck:date "${date}" must be YYYY-MM-DD`);
  }

  const slideMeta = meta.get("deck:slides");
  const slideCount = Number(slideMeta ?? sectionCount);
  if (!Number.isInteger(slideCount) || slideCount < 1) {
    problems.push(
      slideMeta
        ? `deck:slides "${slideMeta}" must be a whole number`
        : 'missing <meta name="deck:slides" content="12"> (no <section> slides to count)'
    );
  }

  if (problems.length > 0) {
    throw new DeckError(`${rel(file)}\n  - ${problems.join("\n  - ")}`);
  }

  return {
    deck: {
      slug,
      title,
      summary,
      date,
      slideCount,
      source: { title: meta.get("deck:source-title") || title, author, url },
      tags: (meta.get("deck:tags") ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    },
    countedSlides: slideMeta === undefined,
  };
}

// ---------- R2 + manifest ----------

function bucket() {
  const name = process.env.SLIDES_R2_BUCKET;
  if (!name) {
    throw new DeckError(
      "Set SLIDES_R2_BUCKET=<your bucket name> in .env.local (or the environment) first."
    );
  }
  return name;
}

function wrangler(args) {
  const result = spawnSync("npx", ["--yes", "wrangler@4", ...args, "--remote"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new DeckError(
      `wrangler ${args.slice(0, 3).join(" ")} failed. Logged in? Run "npx wrangler login". Bucket right? SLIDES_R2_BUCKET=${process.env.SLIDES_R2_BUCKET}`
    );
  }
}

const readManifest = () => JSON.parse(readFileSync(MANIFEST, "utf8"));

function writeManifest(decks) {
  decks.sort((a, b) => b.date.localeCompare(a.date));
  writeFileSync(MANIFEST, `${JSON.stringify(decks, null, 2)}\n`);
}

function publicUrl(key) {
  const base = (process.env.NEXT_PUBLIC_SLIDES_URL ?? "").replace(/\/+$/, "");
  return base ? `${base}/${key}` : key;
}

// ---------- commands ----------

function add(paths, dryRun) {
  const decks = readManifest();
  const bySlug = new Map(decks.map((d) => [d.slug, d]));

  let files = paths.map((p) => resolve(p));
  if (files.length === 0) {
    files = existsSync(INBOX)
      ? readdirSync(INBOX)
          .filter((name) => name.endsWith(".html") && !bySlug.has(basename(name, ".html")))
          .map((name) => join(INBOX, name))
      : [];
    if (files.length === 0) {
      console.log("No new decks in decks/. Drop an .html file there, or pass a path.");
      return;
    }
  }

  // 1. validate everything before touching R2
  const errors = [];
  const ready = [];
  for (const file of files) {
    if (!existsSync(file)) {
      errors.push(`${rel(file)}: file not found`);
      continue;
    }
    try {
      ready.push({ file, ...deckFromFile(file, bySlug.get(basename(file, extname(file)))) });
    } catch (error) {
      if (!(error instanceof DeckError)) throw error;
      errors.push(error.message);
    }
  }
  if (errors.length > 0) {
    throw new DeckError(`Fix these first (nothing was uploaded):\n\n${errors.join("\n\n")}`);
  }

  for (const { deck, countedSlides } of ready) {
    const verb = bySlug.has(deck.slug) ? "update" : "add";
    console.log(`\n${verb.padEnd(6)} ${deck.slug}`);
    console.log(`       "${deck.title}" · ${deck.date} · ${deck.slideCount} slides${countedSlides ? " (counted <section> tags)" : ""}`);
    console.log(`       via ${deck.source.author} — ${deck.source.url}`);
    if (deck.tags.length > 0) console.log(`       tags: ${deck.tags.join(", ")}`);
  }
  if (dryRun) {
    console.log("\n--dry-run: metadata looks good; nothing uploaded or written.");
    return;
  }

  // 2. upload, 3. record — in that order
  const target = bucket();
  for (const { file, deck } of ready) {
    const key = `${deck.slug}.html`;
    wrangler([
      "r2", "object", "put", `${target}/${key}`,
      "--file", file,
      "--content-type", "text/html; charset=utf-8",
      "--cache-control", "public, max-age=300",
    ]);
    bySlug.set(deck.slug, deck);
    console.log(`✓ ${publicUrl(key)}`);
  }
  writeManifest([...bySlug.values()]);

  console.log(
    `\nUpdated ${relative(ROOT, MANIFEST)}. Commit and push it to publish:\n` +
      `  git add ${relative(ROOT, MANIFEST)} && git commit -m "Add slide deck" && git push`
  );
}

function remove(slugs, dryRun) {
  if (slugs.length !== 1) throw new DeckError("Usage: npm run deck:remove <slug>");
  const [slug] = slugs;
  const decks = readManifest();
  const deck = decks.find((d) => d.slug === slug);
  if (!deck) {
    throw new DeckError(`No deck "${slug}". Published: ${decks.map((d) => d.slug).join(", ")}`);
  }
  if (decks.length === 1) {
    throw new DeckError(
      "That's the last deck — the static build needs at least one /slides page. Add the next deck first."
    );
  }

  const key = deck.file ?? `${slug}.html`;
  console.log(`remove ${slug} ("${deck.title}") and R2 object ${key}`);
  if (dryRun) {
    console.log("--dry-run: nothing deleted.");
    return;
  }
  wrangler(["r2", "object", "delete", `${bucket()}/${key}`]);
  writeManifest(decks.filter((d) => d !== deck));
  console.log(`✓ removed. Commit and push ${relative(ROOT, MANIFEST)} to publish.`);
}

const [command, ...rest] = process.argv.slice(2);
const dryRun = rest.includes("--dry-run");
const args = rest.filter((arg) => !arg.startsWith("--"));

try {
  if (command === "add") add(args, dryRun);
  else if (command === "remove") remove(args, dryRun);
  else throw new DeckError("Usage: node scripts/deck.mjs <add|remove> [...]");
} catch (error) {
  if (!(error instanceof DeckError)) throw error;
  console.error(`\n✖ ${error.message}`);
  process.exitCode = 1;
}
