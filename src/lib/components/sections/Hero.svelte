<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/t';

	const GC = '!<>-_\\/[]{}—=+*^?#$@%&';

	function glitchText(el: HTMLElement, orig: string, dur = 400) {
		const frames = Math.floor(dur / 40);
		let f = 0;
		el.classList.add('glitching');
		const iv = setInterval(() => {
			if (f >= frames) {
				el.textContent = orig;
				el.classList.remove('glitching');
				clearInterval(iv);
				return;
			}
			const prog = f / frames;
			let r = '';
			for (let i = 0; i < orig.length; i++) {
				if (orig[i] === ' ') { r += ' '; continue; }
				r += i / orig.length < prog ? orig[i] : GC[Math.floor(Math.random() * GC.length)];
			}
			el.textContent = r;
			f++;
		}, 40);
	}

	onMount(() => {
		if (!sessionStorage.getItem('hero-glitched')) {
			const g1 = document.getElementById('hg1');
			const g2 = document.getElementById('hg2');
			if (g1 && g2) {
				setTimeout(() => {
					glitchText(g1, 'Fadhil', 400);
					setTimeout(() => glitchText(g2, 'Andriawan', 440), 140);
					sessionStorage.setItem('hero-glitched', '1');
				}, 650);
			}
		}
	});
</script>

<section id="hero">
	<div class="hero-left">
		<div class="hero-status">
			<span class="status-dot"></span>
			<span>{$t('hero.status')}</span>
			<span style="color:var(--border-hard)">·</span>
			<span>Jakarta, ID</span>
		</div>
		<div class="hero-name-wrap">
			<h1 class="hero-name">
				<div class="glitch-wrap" id="hg1" data-text="Fadhil">Fadhil</div>
				<div class="glitch-wrap" id="hg2" data-text="Andriawan">Andriawan</div>
			</h1>
		</div>
		<p class="hero-tagline">{$t('hero.tagline')}</p>
		<div class="hero-meta">
			<div class="hero-meta-item">// EXP <span>3+ Yrs</span></div>
			<div class="hero-meta-item">// STACK <span>Full-Stack</span></div>
			<div class="hero-meta-item">// LOC <span>Jakarta, ID</span></div>
		</div>
	</div>
	<div class="hero-right" aria-hidden="true">
		<div class="hero-grid-bg"></div>
		<div class="hero-diagonal"></div>
		<div class="hero-vline"></div>
		<div class="hero-accent-bar"></div>
		<div class="hero-corner">// SYS NOMINAL</div>
	</div>
	<div class="scroll-cue" aria-hidden="true">
		<span class="scroll-line"></span>
		<span>{$t('hero.scroll')}</span>
	</div>
</section>

<style>
	section {
		min-height: 100vh;
		padding-top: 57px;
		display: grid;
		grid-template-columns: 55% 45%;
		position: relative;
		overflow: hidden;
	}
	.hero-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 80px 44px 80px 48px;
		position: relative;
		z-index: 2;
		border-right: 1px solid var(--border-faint);
	}
	.hero-status {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 28px;
		display: flex;
		align-items: center;
		gap: 10px;
		opacity: 0;
		transform: translateY(8px);
		animation: fadeUp 0.4s ease-out 0.6s forwards;
	}
	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #4caf50;
		box-shadow: 0 0 8px #4caf50;
		animation: pip 2s infinite;
		flex-shrink: 0;
	}
	.hero-name-wrap {
		opacity: 0;
		animation: fadeIn 0.3s ease-out 0.3s forwards;
	}
	.hero-name {
		font-family: var(--font-display);
		font-size: clamp(2.8rem, 5.5vw, 5.2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text-bright);
		line-height: 0.93;
		margin-bottom: 22px;
	}
	.hero-tagline {
		font-size: clamp(0.875rem, 1.3vw, 1.05rem);
		color: var(--text-soft);
		max-width: 46ch;
		line-height: 1.7;
		margin-bottom: 44px;
		opacity: 0;
		transform: translateY(8px);
		animation: fadeUp 0.4s ease-out 0.85s forwards;
	}
	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		opacity: 0;
		transform: translateY(8px);
		animation: fadeUp 0.4s ease-out 1s forwards;
	}
	.hero-meta-item {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		color: var(--text-muted);
		text-transform: uppercase;
	}
	.hero-meta-item :global(span) { color: var(--text-soft); }
	.hero-right {
		position: relative;
		overflow: hidden;
	}
	.hero-grid-bg {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--border-faint) 1px, transparent 1px),
			linear-gradient(90deg, var(--border-faint) 1px, transparent 1px);
		background-size: 48px 48px;
		opacity: 0.55;
	}
	.hero-diagonal {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.013) 50%);
	}
	.hero-vline {
		position: absolute;
		top: 20%;
		bottom: 20%;
		left: 40%;
		width: 1px;
		background: linear-gradient(to bottom, transparent, var(--border-hard), transparent);
	}
	.hero-accent-bar {
		position: absolute;
		left: 0;
		top: 28%;
		bottom: 28%;
		width: 2px;
		background: linear-gradient(to bottom, transparent, var(--border-hard) 40%, var(--border-hard) 60%, transparent);
	}
	.hero-corner {
		position: absolute;
		bottom: 28px;
		right: 28px;
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--border-hard);
		text-transform: uppercase;
	}
	.scroll-cue {
		position: absolute;
		bottom: 32px;
		left: 48px;
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		opacity: 0;
		animation: fadeUp 0.4s ease-out 1.2s forwards;
	}
	.scroll-line {
		width: 36px;
		height: 1px;
		background: var(--border-hard);
		position: relative;
		overflow: hidden;
	}
	.scroll-line::after {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: var(--text-soft);
		animation: scanR 2s ease-in-out 1.5s infinite;
	}

	@media (max-width: 900px) {
		section { grid-template-columns: 1fr; }
		.hero-right { display: none; }
		.hero-left {
			padding: 60px 24px 80px;
			border-right: none;
			border-bottom: 1px solid var(--border-faint);
		}
		.scroll-cue { left: 24px; }
	}
	@media (max-width: 480px) {
		.hero-left { padding: 48px 20px 72px; }
		.hero-name { font-size: 2.6rem; }
	}
</style>
