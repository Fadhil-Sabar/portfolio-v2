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

Always run `prepare` before `check`.

## Architecture
- **All routes prerendered** — `src/routes/+layout.ts` sets `export const prerender = true`
- **`$lib`** maps to `src/lib/`
- **Data**: static TS files in `src/lib/data/` (`projects.ts`, `skills.ts`, `experience.ts`)
- **i18n**: Custom svelte store (`src/lib/stores/lang.ts` + `t.ts`), JSON dicts in `src/lib/i18n/`. Persists to localStorage under key `pf-lang`. Default: `id`
- **Components**: Atomic in `src/lib/components/`, sections in `src/lib/components/sections/`
- **Reveal animation**: Svelte action in `src/lib/actions/reveal.ts` (IntersectionObserver, threshold 0.08)
- **Custom cursor**: `Cursor.svelte` component + `cursor: none` on `body` — do not remove
- **`prefers-reduced-motion: reduce`** respected in global CSS
- **Design reference**: `_design-reference/portfolio.html` (visual source of truth)
- **No test framework** installed

## Conventions
- Svelte 5 runes syntax (`$props()`, `$state()`, `{@render children()}`) — no legacy `export let` or `$$props`
- Components use `<script lang="ts">` + scoped `<style>` blocks
- Section components accept no props (data imported directly from `$lib/data/`)
- Font: Space Grotesk (display) + JetBrains Mono (mono), loaded via Google Fonts
- CSS custom properties defined as `@theme` tokens and `:root` vars in `src/app.css`

## Gotchas
- Tailwind v4 uses `@theme` in CSS, not `tailwind.config.js`. If agent tries to create config file, correct it.
- `svelte-kit sync` must run before `svelte-check` to generate `.svelte-kit/tsconfig.json`
- Language toggle buttons use `cursor: none` (custom cursor) — not a bug
- TypeScript 6 uses `rewriteRelativeImportExtensions` in tsconfig — `.js` extensions in imports may be required
