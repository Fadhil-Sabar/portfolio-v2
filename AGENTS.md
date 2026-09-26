# Portfolio Claude — Agent Guide

## Stack
- **Framework**: SvelteKit 2 + Svelte 5 (runes mode, enforced in `svelte.config.js`)
- **Language**: TypeScript 6 (strict)
- **CSS**: Tailwind CSS v4 (`@theme` directive in CSS, **no** `tailwind.config.js`)
- **Build**: Vite 8 with `@sveltejs/adapter-static` (SSG)
- **PM**: bun

## Commands
| Command | What |
|---|---|
| `bun dev` | Dev server |
| `bun run build` | Production build (output: `build/`) |
| `bun run preview` | Preview production build |
| `bun run prepare` | Generate `.svelte-kit/` types (needed before typecheck) |
| `bun run check` | Typecheck via `svelte-check` |
| `bun run check:watch` | Watch mode typecheck |
| `bun test` | Run the `bun:test` suite in `tests/` |
| `bun run stats:refresh` | Refresh the committed GitHub stats snapshot (fallback data) |
| `bun run deploy` | `wrangler pages deploy` of the `build/` output |

Always run `prepare` before `check`. `check` already chains it, so `bun run check` is enough.

## Architecture
- **All routes prerendered** — `src/routes/+layout.ts` sets `export const prerender = true`
- **`$lib`** maps to `src/lib/`
- **Data**: static TS files in `src/lib/data/` (`projects.ts`, `skills.ts`, `experience.ts`)
- **i18n**: Custom svelte store (`src/lib/stores/lang.ts` + `t.ts`), JSON dicts in `src/lib/i18n/`. Persists to localStorage under key `pf-lang`. Default: `en` (matches `<html lang="en">` in `app.html`; the store only reads storage in the browser, so prerendered HTML is always English)
- **Components**: Atomic in `src/lib/components/`, sections in `src/lib/components/sections/`
- **Reveal animation**: Svelte action in `src/lib/actions/reveal.ts` (IntersectionObserver, threshold 0.08)
- **Custom cursor**: `Cursor.svelte` component + `cursor: none` on `body` — do not remove
- **`prefers-reduced-motion: reduce`** respected in global CSS
- **Design reference**: `_design-reference/portfolio.html` (visual source of truth)
- **Tests**: `bun:test` (built into the bun runtime, no extra dependency) in `tests/`. `projects-localization.test.ts` asserts every project in `$lib/data/projects.ts` has both `en` and `id` values; `i18n-dictionaries.test.ts` asserts both dictionaries define the same keys with no blanks; `i18n-interpolation.test.ts` guards `{n}` placeholder parity; `github-stats.test.ts` covers the calendar/level/merge helpers; `duolingo-stats.test.ts` covers date and bar scaling. Run `bun test` after touching data or dictionaries.
- **Hosting**: Cloudflare Pages. `wrangler.jsonc` points at `./build`; cache/security headers live in `static/_headers`.

## Conventions
- Svelte 5 runes syntax (`$props()`, `$state()`, `{@render children()}`) — no legacy `export let` or `$$props`
- Components use `<script lang="ts">` + scoped `<style>` blocks
- Section components accept no props (data imported directly from `$lib/data/`)
- Font: Space Grotesk (display) + JetBrains Mono (mono), loaded via Google Fonts
- CSS custom properties defined as `@theme` tokens and `:root` vars in `src/app.css`

## Gotchas
- Tailwind v4 uses `@theme` in CSS, not `tailwind.config.js`. If agent tries to create config file, correct it.
- **GitHub stats section**: `Stats.svelte` is the one section that takes props. Its numbers are fetched at prerender time by `src/routes/+page.server.ts` → `$lib/server/github-stats` + `$lib/server/duolingo-stats`, so they cannot come from `$lib/data/` like the other sections' data. It is also the only section placed *after* `Contact`. Its GitHub panel is a two-column split: contribution calendar on the left, recent pull requests / issues on the right (`selectRecentActivity`, 90-day window, 5 items).
- **`GITHUB_TOKEN` is required at build time for the contribution calendar and the activity feed.** Both come from GraphQL `contributionsCollection`, which is not readable anonymously; the REST numbers (stars, repos, latest event) work without it. Set it in Cloudflare Pages → Settings → Environment variables (plain text, both production and preview) and in `.env` for local dev. Duolingo needs no token.
- **The stats fetches must never fail the build.** `getGitHubStats()` and `getDuolingoStats()` catch everything and return the committed snapshots in `src/lib/data/{github,duolingo}-stats.json`. Refresh them with `bun run stats:refresh` so the offline fallbacks do not drift.
- **A no-token build mixes sources on purpose.** `mergeSnapshot()` (pure, in `data/github.ts`, unit-tested) keeps live REST numbers but borrows the calendar and activity list from the snapshot, carrying the *snapshot's* `calendarFetchedAt` so the page cannot present them as fresh. Unauthenticated GitHub is 60 req/hr, so a build without a token can also 403 into the full-snapshot path.
- **Commit *totals* per repo are exact; per-commit *dates* are not.** GraphQL `contributions(first: N)` returns a sparse subset of `occurredAt` nodes, so the page shows a heatmap and never claims a date for an individual commit.
- **Duolingo's endpoint is undocumented and unversioned** (`/2017-06-30/users?username=`) and it already broke once — the ID endpoint is integer-only now. It also returns a lot of personal data (`location`, `hasPhoneNumber`, `emailVerified`, `hasGoogleId`, `joinedClassroomIds`); `duolingo-api.ts` extracts only the seven displayed fields so none of that reaches git. Don't "simplify" it into storing the raw payload.
- **`t()` takes optional `{name}` params** (`$t('stats.comments', { n: 2 })`) — the placeholders live in the dictionary strings. `tests/i18n-dictionaries.test.ts` allowlists the few strings that are legitimately identical in both languages (e.g. `Total XP`, `Pull Request`, singular `commit`, which Indonesian does not inflect); add to that set rather than loosening the check.
- `src/lib/server/github-api.ts` and `duolingo-api.ts` import `../data/*` relatively instead of via `$lib`, because `scripts/refresh-*-stats.ts` load them under plain `bun`, which does not know SvelteKit's path aliases. Keep `$lib/...` everywhere else.
- **`svelte-kit sync` must run before `svelte-check`** to generate `.svelte-kit/tsconfig.json`
- Language toggle buttons use `cursor: none` (custom cursor) — not a bug
- TypeScript 6 uses `rewriteRelativeImportExtensions` in tsconfig — `.js` extensions in imports may be required
- **JSON-LD must be injected with `{@html}` inside `<svelte:head>`**, not a plain `<script type="application/ld+json">{...}</script>` block — a plain block gets HTML-escaped by Svelte and corrupts the JSON. Both `+page.svelte` and `projects/[slug]/+page.svelte` do this.
- **No `hreflang` tags, by design.** Language is a client-side localStorage store, so every crawlable URL serves identical HTML; alternate links would all point at the same page. Don't "fix" this by adding them back — it needs URL-prefixed locales instead.
- `sitemap.xml` omits `lastmod` on purpose: the data layer only has `Project.year`, so any date would be invented and the build date falsely implies every page changed on every deploy.
