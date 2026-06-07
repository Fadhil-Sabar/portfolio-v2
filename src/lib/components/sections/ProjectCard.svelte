<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		project: Project;
		index: number;
	}
	let { project, index: i }: Props = $props();

	const { title, live, slug, index, blurb, stack, year, type, image } = project;
	const GC = '!<>-_\\/[]{}—=+*^?#$@%&';
	let titleEl: HTMLElement;
	let _glitching = false;

	function glitchTitle() {
		if (_glitching) return;
		_glitching = true;
		const orig = title;
		const dur = 200;
		const frames = Math.floor(dur / 40);
		let f = 0;
		titleEl.classList.add('glitching');
		const iv = setInterval(() => {
			if (f >= frames) {
				titleEl.textContent = orig;
				titleEl.classList.remove('glitching');
				clearInterval(iv);
				setTimeout(() => (_glitching = false), 120);
				return;
			}
			const prog = f / frames;
			let r = '';
			for (let j = 0; j < orig.length; j++) {
				if (orig[j] === ' ') { r += ' '; continue; }
				r += j / orig.length < prog ? orig[j] : GC[Math.floor(Math.random() * GC.length)];
			}
			titleEl.textContent = r;
			f++;
		}, 40);
	}

	const href = slug ? `/projects/${slug}` : '#';
	const isExternal = false;
</script>

<a
	{href}
	use:reveal={i * 55}
	class="project-card"
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener' : undefined}
	onmouseenter={glitchTitle}
>
	<div class="project-card-image">
		{#if image}
			<picture>
				<source srcset={image.replace(/\.(jpe?g|png)$/, '.webp')} type="image/webp" />
				<img src={image} alt={title} class="card-img" />
			</picture>
		{/if}
		<div class="pc-stripes"></div>
		<div class="pc-label">
			<span>COVER IMAGE</span>
			<span class="pc-index">{index}</span>
		</div>
		<div class="scanline-sweep"></div>
	</div>
	<div class="project-card-body">
		<div class="project-index">// {index} · {type.toUpperCase()}</div>
		<div class="project-title glitch-wrap" bind:this={titleEl} data-text={title}>{title}</div>
		<div class="project-blurb">{blurb}</div>
		<div class="project-tags">
			{#each stack as tag}
				<span class="project-tag">{tag}</span>
			{/each}
		</div>
		<div class="project-meta-row">
			<span class="project-year">→ {year}</span>
			<span class="project-arrow">→</span>
		</div>
	</div>
</a>

<style>
	.project-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-soft);
		clip-path: polygon(0 0,100% 0,100% calc(100% - 18px),calc(100% - 18px) 100%,0 100%);
		cursor: none;
		position: relative;
		overflow: hidden;
		transition: border-color 0.3s;
		text-decoration: none;
		display: block;
	}
	@media (pointer: coarse) { .project-card { cursor: pointer; } }
	.project-card:hover { border-color: var(--border-hard); }
	.project-card-image {
		width: 100%;
		aspect-ratio: 16/9;
		background: var(--bg-base);
		position: relative;
		overflow: hidden;
	}
	.pc-stripes {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(-45deg, transparent, transparent 11px, rgba(255,255,255,0.011) 11px, rgba(255,255,255,0.011) 12px);
		z-index: 1;
	}
	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
		filter: grayscale(1);
		transition: filter 0.4s ease;
	}
	.project-card:hover .card-img {
		filter: grayscale(0);
	}
	.pc-label {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.2em;
		color: var(--border-hard);
		text-transform: uppercase;
		gap: 4px;
	}
	.pc-index { font-size: 7px; color: var(--border-hard); }
	.scanline-sweep {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
		transform: translateY(-100%);
		pointer-events: none;
	}
	.project-card:hover .scanline-sweep {
		transform: translateY(200%);
		transition: transform 0.6s ease-in-out;
	}
	.project-card-body { padding: 24px 24px 28px; }
	.project-index {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 10px;
	}
	.project-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--text-bright);
		margin-bottom: 8px;
	}
	.project-blurb {
		font-size: 0.875rem;
		color: var(--text-soft);
		line-height: 1.7;
		margin-bottom: 16px;
	}
	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}
	.project-tag {
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.09em;
		color: var(--text-muted);
		border: 1px solid var(--border-soft);
		padding: 3px 7px;
		text-transform: uppercase;
		background: var(--bg-base);
	}
	.project-meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 16px;
		padding-top: 16px;
		border-top: 1px solid var(--border-faint);
	}
	.project-year {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}
	.project-arrow {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-muted);
		transition: color 0.2s, transform 0.2s;
	}
	.project-card:hover .project-arrow {
		color: var(--text-base);
		transform: translateX(4px);
	}
</style>
