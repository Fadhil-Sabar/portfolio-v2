<script lang="ts">
	import type { PageData } from './$types';
	import { reveal } from '$lib/actions/reveal';
	import NoiseOverlay from '$lib/components/NoiseOverlay.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Nav from '$lib/components/sections/Nav.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	let { data }: { data: PageData } = $props();
	const { project: p } = data;

	const SITE = 'https://fadhil-andriawan.dev';
	const DESC = p.blurb;
	const URL = SITE + '/projects/' + p.slug;
	const OG_IMAGE = p.image ? SITE + p.image : SITE + '/images/profile-pic.jpeg';

	const fullTitle = p.title + ' — Fadhil Andriawan';

	const webpageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: fullTitle,
		description: DESC,
		url: URL,
		image: OG_IMAGE,
		inLanguage: 'en',
		about: {
			'@type': 'SoftwareApplication',
			name: p.title,
			applicationCategory: 'WebApplication',
			operatingSystem: 'Web',
			description: p.blurb
		},
		author: {
			'@type': 'Person',
			name: 'Fadhil Andriawan'
		}
	};

	const ldHtml = `<script type="application/ld+json">${JSON.stringify(webpageSchema)}<\/script>`;
</script>

<svelte:head>
	<title>{p.title} — Fadhil Andriawan</title>
	<meta name="description" content={p.blurb} />
	<link rel="canonical" href={URL} />

	<!-- Open Graph -->
	<meta property="og:title" content="{p.title} — Fadhil Andriawan" />
	<meta property="og:description" content={p.blurb} />
	<meta property="og:url" content={URL} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content={p.title} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Fadhil Andriawan" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{p.title} — Fadhil Andriawan" />
	<meta name="twitter:description" content={p.blurb} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content={p.title} />

</svelte:head>

{@html ldHtml}

<NoiseOverlay />
<Cursor />
<Nav />

<main>
	<div class="back-row" use:reveal>
		<a href="/#projects" class="back-link">← Back to projects</a>
	</div>

	<div class="hero-section">
		<div class="section-container">
			<div class="project-meta-top" use:reveal>
				<span class="meta-index">// {p.index}</span>
				<span class="meta-type">{p.type}</span>
				<span class="meta-year">{p.year}</span>
			</div>
			<h1 class="project-title" use:reveal={100}>{p.title}</h1>
			<p class="project-blurb" use:reveal={200}>{p.blurb}</p>

			<div class="stack-row" use:reveal={300}>
				{#each p.stack as tag}
					<span class="stack-tag">{tag}</span>
				{/each}
			</div>

			{#if p.live}
				<div class="cta-row" use:reveal={400}>
					<a href={p.live} target="_blank" rel="noopener" class="live-btn">
						View Live ↗
					</a>
				</div>
			{/if}
		</div>
	</div>

	<div class="section-divider"></div>

	<div class="cover-image" use:reveal>
		<div class="cover-stripes"></div>
		{#if p.image}
			<picture>
				<source srcset={p.image.replace(/\.(jpe?g|png)$/, '.webp')} type="image/webp" />
				<img src={p.image} alt={p.title} class="cover-img" />
			</picture>
		{/if}
		<div class="cover-label">
			<span>PROJECT COVER</span>
			<span class="cover-sub">// {p.index}</span>
		</div>
	</div>

	<div class="section-divider"></div>

	<div class="detail-section">
		<div class="section-container">
			<div class="detail-grid" use:reveal>
				<div class="detail-col">
					<div class="detail-col-label">// Role</div>
					<div class="detail-col-value">{p.role}</div>
				</div>
				<div class="detail-col">
					<div class="detail-col-label">// Type</div>
					<div class="detail-col-value">{p.type}</div>
				</div>
				<div class="detail-col">
					<div class="detail-col-label">// Year</div>
					<div class="detail-col-value">{p.year}</div>
				</div>
			</div>
		</div>
	</div>

	{#if p.description}
		<div class="section-divider"></div>

		<div class="description-section">
			<div class="section-container">
				<div class="description-grid" use:reveal>
					<div class="description-col">
						<div class="detail-col-label">// Description</div>
					</div>
					<div class="description-content">
						{@html p.description}
					</div>
				</div>
				{#if p.repo}
					<div class="repo-row" use:reveal={200}>
						<a href={p.repo} target="_blank" rel="noopener" class="repo-btn">
							View Source Code ↗
						</a>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="section-divider"></div>
</main>

<Footer />

<style>
	main { padding-top: 57px; }

	.back-row {
		max-width: 1200px;
		margin: 0 auto;
		padding: 32px 48px 0;
	}
	.back-link {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	.back-link:hover { color: var(--text-base); }

	.section-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 48px;
	}

	.hero-section { padding: 64px 0 80px; }

	.project-meta-top {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		display: flex;
		gap: 20px;
		margin-bottom: 24px;
	}

	.project-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text-bright);
		line-height: 1;
		margin-bottom: 24px;
	}

	.project-blurb {
		font-size: 1.05rem;
		color: var(--text-soft);
		line-height: 1.75;
		max-width: 62ch;
		margin-bottom: 32px;
	}

	.stack-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 40px; }
	.stack-tag {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.09em;
		color: var(--text-muted);
		border: 1px solid var(--border-soft);
		padding: 4px 9px;
		text-transform: uppercase;
		background: var(--bg-elevated);
	}

	.live-btn {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-decoration: none;
		border: 1px solid var(--border-soft);
		padding: 10px 20px;
		background: transparent;
		clip-path: polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%);
		transition: color 0.2s, border-color 0.2s, background 0.2s;
		display: inline-block;
	}
	.live-btn:hover {
		color: var(--text-base);
		border-color: var(--border-hard);
		background: var(--bg-elevated);
	}

	.section-divider {
		height: 1px;
		background: var(--border-faint);
		position: relative;
		overflow: hidden;
	}
	.section-divider::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--border-hard), transparent);
		animation: divScan 6s linear infinite;
	}
	@keyframes divScan {
		0% { left: -100%; right: 100%; }
		100% { left: 100%; right: -100%; }
	}

	.cover-image {
		width: 100%;
		aspect-ratio: 16/6;
		background: var(--bg-elevated);
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cover-stripes {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(-45deg, transparent, transparent 11px, rgba(255,255,255,0.011) 11px, rgba(255,255,255,0.011) 12px);
		z-index: 1;
		pointer-events: none;
	}
	.cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
		filter: grayscale(1);
		transition: filter 0.4s ease;
	}
	.cover-image:hover .cover-img {
		filter: grayscale(0);
	}
	.cover-label {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--border-hard);
		text-transform: uppercase;
		text-align: center;
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.cover-sub { font-size: 8px; }

	.detail-section { padding: 80px 0; }
	.detail-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--border-faint);
		border: 1px solid var(--border-faint);
	}
	.detail-col {
		background: var(--bg-elevated);
		padding: 28px 24px;
	}
	.detail-col-label {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 10px;
	}
	.detail-col-value {
		font-family: var(--font-display);
		font-size: 1rem;
		color: var(--text-base);
	}

	.description-section { padding: 80px 0; }
	.description-grid {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 48px;
		align-items: start;
	}
	.description-content {
		font-size: 0.95rem;
		color: var(--text-soft);
		line-height: 1.85;
		max-width: 68ch;
	}
	.description-content :global(p) {
		margin-bottom: 16px;
	}
	.description-content :global(p:last-child) {
		margin-bottom: 0;
	}
	.description-content :global(b) {
		color: var(--text-base);
		font-weight: 600;
	}
	.repo-row {
		margin-top: 40px;
		padding-top: 32px;
		border-top: 1px solid var(--border-faint);
	}
	.repo-btn {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-decoration: none;
		border: 1px solid var(--border-soft);
		padding: 10px 20px;
		background: transparent;
		clip-path: polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%);
		transition: color 0.2s, border-color 0.2s, background 0.2s;
		display: inline-block;
	}
	.repo-btn:hover {
		color: var(--text-base);
		border-color: var(--border-hard);
		background: var(--bg-elevated);
	}

	@media (max-width: 768px) {
		.back-row { padding: 24px 20px 0; }
		.section-container { padding: 0 20px; }
		.detail-grid { grid-template-columns: 1fr; }
		.description-grid { grid-template-columns: 1fr; gap: 24px; }
	}
	@media (max-width: 480px) {
		.section-container { padding: 0 16px; }
	}
</style>
