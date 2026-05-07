# Panduan Port HTML → SvelteKit dengan Claude Code

> **Konteks:** Kamu punya 1 file HTML (CSS inline di `<style>`) hasil dari Claude design, dan SvelteKit project yang sudah scaffold dan jalan. Tujuan: port HTML → struktur SvelteKit yang rapi, modular, dan bilingual.

---

## Bagian 1 — Persiapan sebelum buka Claude Code

Sebelum mulai sesi Claude Code, lakukan ini dulu:

### 1.1 Pastikan struktur project siap

Project SvelteKit kamu minimal harus punya:
```
your-portfolio/
├── src/
│   ├── lib/
│   ├── routes/
│   │   └── +page.svelte
│   └── app.html
├── static/
├── package.json
├── svelte.config.js
└── ...
```

### 1.2 Taruh file HTML di lokasi yang gampang dirujuk

Buat folder `_design-reference/` di root project (underscore prefix biar Claude Code paham ini bukan source code):
```bash
mkdir _design-reference
mv path/to/portfolio.html _design-reference/portfolio.html
```

### 1.3 Pastikan dependency penting sudah terinstall

```bash
bun add -D tailwindcss@next @tailwindcss/vite
bun add lucide-svelte
bun add -D @sveltejs/adapter-static  # untuk prerender (SEO)
```

### 1.4 Siapkan PRD sebagai context

Taruh `portfolio-prd.md` (yang saya kasih sebelumnya) di root project. Claude Code bakal baca ini sebagai sumber kebenaran untuk decision-decision yang nggak ada di HTML.

### 1.5 Init git & commit baseline

```bash
git init
git add .
git commit -m "chore: initial sveltekit scaffold + design reference"
```

Ini penting — kalau ada langkah yang salah, kamu tinggal `git reset`.

---

## Bagian 2 — Prompt Utama untuk Claude Code

Buka Claude Code di root project, lalu paste prompt di bawah ini. Prompt ini didesain agar Claude Code mengerjakan port secara bertahap, bukan sekali jadi (lebih aman, lebih mudah review).

### 📋 Copy-paste prompt ini:

```
Saya punya portfolio website dalam 1 file HTML dengan CSS inline di 
`_design-reference/portfolio.html`, dan project SvelteKit yang sudah 
ter-scaffold di repo ini. Tugasmu adalah port HTML tersebut ke struktur 
SvelteKit yang rapi dan modular.

KONTEKS WAJIB DIBACA DULU:
1. Baca `_design-reference/portfolio.html` — ini design reference yang 
   harus dipertahankan visual fidelity-nya 100%.
2. Baca `portfolio-prd.md` di root — ini PRD lengkap, sumber kebenaran 
   untuk hal yang nggak terlihat di HTML (bilingual, project detail pages, 
   reduced-motion, dll).
3. Cek `package.json` untuk lihat dependency yang sudah ada.

PRINSIP UTAMA:
- Jangan mulai coding sebelum bikin rencana. Tunjukkan rencananya ke saya 
  dulu, baru tunggu approval.
- Visual harus identik dengan HTML reference. Kalau ada bagian yang harus 
  diubah, kasih tau saya dulu dengan alasannya.
- Kerjakan SATU FASE sekaligus, lalu stop dan minta saya verifikasi sebelum 
  lanjut ke fase berikutnya.
- Setelah setiap fase selesai, jalankan `bun dev` (atau `npm run dev`) 
  dan kasih tau saya apa yang harus saya cek.

FASE PORTING (kerjakan berurutan):

FASE 0 — ANALYSIS & PLAN
- Baca HTML reference, PRD, dan struktur project.
- Identifikasi: section apa saja, komponen apa yang perlu dipecah, 
  CSS variables yang dipakai, animasi yang ada, font yang dipakai, 
  asset yang dibutuhkan.
- Output: rencana porting dalam markdown (tanpa kode dulu) yang 
  mencakup file-file yang akan dibuat, urutan pengerjaan, dan 
  potensi blocker.
- STOP. Tunggu approval saya.

FASE 1 — FOUNDATION (global styling & layout)
- Migrasikan CSS variables dari HTML ke `src/app.css` (atau ke 
  `@theme` block Tailwind v4).
- Setup font loading (kalau pakai @fontsource, install package-nya).
- Buat `src/routes/+layout.svelte` dengan noise overlay, custom 
  cursor (kalau ada di HTML), dan global wrapper.
- Verifikasi: `bun dev` jalan, font ke-load, warna dasar match.
- STOP.

FASE 2 — KOMPONEN ATOMIK
- Pecah elemen yang reusable: SectionHeading, MonoLabel, GlitchText, 
  NoiseOverlay, Cursor (kalau ada), LangToggle.
- Letakkan di `src/lib/components/`.
- Pakai TypeScript untuk props.
- STOP.

FASE 3 — LANDING PAGE SECTIONS
- Pecah landing page jadi: Hero, About, ProjectsGrid, SkillsGrid, 
  ExperienceTimeline, Contact, Footer.
- Compose semua di `src/routes/+page.svelte`.
- Pastikan animasi scroll-triggered tetap jalan (pakai 
  IntersectionObserver via Svelte action, atau svelte/transition).
- STOP.

FASE 4 — DATA LAYER
- Buat `src/lib/data/projects.ts`, `skills.ts`, `experience.ts` sesuai 
  schema di PRD section 7.
- Refactor section components untuk consume data dari sini, bukan 
  hardcoded di markup.
- Isi dengan placeholder data dari PRD.
- STOP.

FASE 5 — BILINGUAL (i18n)
- Buat `src/lib/i18n/id.json` dan `en.json`.
- Buat svelte store `src/lib/stores/lang.ts` yang persist ke localStorage.
- Wire up LangToggle component, refactor semua text untuk pakai i18n.
- Default language: Indonesia.
- STOP.

FASE 6 — PROJECT DETAIL ROUTES
- Buat `src/routes/projects/[slug]/+page.svelte` dan `+page.ts` (load 
  data dari `projects.ts` by slug).
- Implement layout case-study sesuai PRD section 4.3.
- Pastikan navigasi card → detail jalan.
- Pastikan page transition (line sweep) sesuai PRD section 5.4.
- STOP.

FASE 7 — SEO & POLISH
- Tambah `<svelte:head>` di setiap route: title, meta description, 
  Open Graph tags (bilingual via i18n).
- Buat `src/routes/sitemap.xml/+server.ts`.
- Tambah JSON-LD structured data di landing page.
- Konfigurasi `adapter-static` di `svelte.config.js` untuk prerender.
- Implementasi `prefers-reduced-motion` di animasi.
- Verifikasi keyboard navigation & focus rings.
- STOP.

FASE 8 — FINAL CHECK
- Jalankan `bun build` lalu `bun preview`.
- Buka di browser, cek semua section + project detail page.
- Pastikan Lighthouse score 90+ di semua kategori (laporkan score-nya).
- Update README dengan setup, dev, deploy instructions.

MULAI DARI FASE 0. Tunjukkan rencanamu, jangan tulis kode dulu.
```

---

## Bagian 3 — Tips selama Claude Code mengerjakan

### 3.1 Verifikasi visual setiap fase
Setiap kali Claude Code bilang fase selesai, **selalu**:
1. Buka `bun dev` di terminal terpisah
2. Compare side-by-side dengan `_design-reference/portfolio.html` (buka langsung di browser)
3. Cek di mobile viewport juga (DevTools responsive mode)

Kalau ada yang beda, kasih feedback spesifik:
> "Spacing antara hero dan about lebih tight di reference, sekitar 80px bukan 120px."

### 3.2 Kalau Claude Code keluar jalur
Stop pakai prompt:
> "Stop. Kembali ke rencana fase yang kita sepakati. Sekarang kita di fase X, fokus selesaikan itu dulu."

### 3.3 Commit per fase
Setelah setiap fase di-approve, commit:
```bash
git add .
git commit -m "feat: phase X - <description>"
```

Ini bikin gampang rollback kalau fase berikutnya bermasalah.

### 3.4 Animasi yang tricky
Animasi seringkali jadi yang paling beda antara HTML dan port-nya, karena:
- Vanilla JS animations beda pendekatan dengan Svelte
- IntersectionObserver di HTML mungkin di-handle inline, di Svelte lebih clean pakai action

Kalau visualnya beda dikit di animasi, prompt:
> "Animasi [nama] timing-nya beda. Di reference durasinya ~600ms dengan easing cubic-bezier(0.7, 0, 0.2, 1). Sesuaikan."

### 3.5 Kalau Tailwind v4 bikin masalah
Tailwind v4 masih relatif baru, beberapa Claude Code session mungkin nggak update soal syntax `@theme`. Kalau Claude Code coba bikin `tailwind.config.js`, koreksi:
> "Pakai Tailwind v4 syntax: `@theme` directive di CSS, bukan tailwind.config.js. Lihat docs Tailwind v4 atau struktur yang sudah ada di src/app.css."

---

## Bagian 4 — Checklist akhir

Sebelum deploy, pastikan:

- [ ] `bun build` sukses tanpa error/warning
- [ ] Visual identik dengan HTML reference (desktop + mobile)
- [ ] Bilingual toggle jalan, persist setelah reload
- [ ] Klik project card → ke detail page, tombol back jalan
- [ ] Animasi scroll-triggered hanya fire sekali per session
- [ ] `prefers-reduced-motion: reduce` mematikan glitch & heavy motion
- [ ] Keyboard navigation lengkap (Tab order benar, focus visible)
- [ ] Meta tags & OG image muncul di [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] `sitemap.xml` accessible di `/sitemap.xml`

---

## Bagian 5 — Deploy (setelah port selesai)

Karena pakai `adapter-static`, bisa deploy ke:

**Vercel:**
```bash
bun dlx vercel
```

**Cloudflare Pages:** connect repo, build command: `bun build`, output dir: `build`.

**GitHub Pages:** push ke branch `gh-pages`, atau pakai action `actions/deploy-pages`.

Ketiganya gratis untuk personal portfolio.

---

## Catatan penting

- **Jangan biarkan Claude Code port semuanya dalam satu shot.** Pasti ada yang lolos. Bertahap = lebih lambat tapi hasil lebih bersih.
- **HTML reference adalah source of truth visual**, PRD adalah source of truth struktural. Kalau dua-duanya konflik, prioritaskan HTML untuk visual dan PRD untuk arsitektur.
- **Simpan `_design-reference/portfolio.html`** sampai project benar-benar selesai. Jangan delete di tengah jalan.
