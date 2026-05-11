<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/stores/t';
</script>

<section id="about">
	<div class="section-container">
		<div class="section-label" use:reveal>{$t('nav.about') === 'Tentang' ? '// 00 — About' : '// 00 — About'}</div>
		<div class="about-grid">
			<div>
				<h2 class="section-title" use:reveal>{$t('about.title')}</h2>
				<div class="about-bio">
					<p use:reveal={100}>{$t('about.bio1')}</p>
					<p use:reveal={180}>{$t('about.bio2')}</p>
					<p use:reveal={260}>{$t('about.bio3')}</p>
				</div>
			</div>
			<div class="about-sidebar" use:reveal={200}>
			<div class="about-photo">
				<div class="about-photo-stripes"></div>
				<picture>
					<source srcset="/images/profile-pic.webp" type="image/webp" />
					<img src="/images/profile-pic.jpeg" alt="Fadhil Andriawan" class="about-photo-img" />
				</picture>
			</div>
			<div class="about-facts">
				<div class="about-fact">
					<span class="fact-label">{$t('about.fact1')}</span>
					<span class="fact-value">3+ YRS</span>
				</div>
				<div class="about-fact">
					<span class="fact-label">{$t('about.fact2')}</span>
					<span class="fact-value">FULL-STACK</span>
				</div>
				<div class="about-fact">
					<span class="fact-label">{$t('about.fact3')}</span>
					<span class="fact-value">JAKARTA</span>
				</div>
				<div class="about-fact">
					<span class="fact-label">EDUCATION</span>
					<span class="fact-value">{$t('about.edu')}</span>
				</div>
				<div class="about-fact">
					<span class="fact-label">{$t('about.gpa')}</span>
					<span class="fact-value">3.39</span>
				</div>
				<div class="about-fact">
					<span class="fact-label">TOEIC</span>
					<span class="fact-value">660</span>
				</div>
			</div>
			</div>
		</div>
	</div>
</section>

<style>
	.section-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 100px 48px;
	}
	.section-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 14px;
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.section-title {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 3.5vw, 3rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text-bright);
		line-height: 1.05;
		margin-bottom: 56px;
	}
	.about-grid {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 64px;
		align-items: start;
	}
	.about-bio p {
		color: var(--text-soft);
		font-size: 0.975rem;
		line-height: 1.8;
		max-width: 58ch;
		margin-bottom: 18px;
	}
	.about-bio p:last-child { margin-bottom: 0; }
	.about-sidebar {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.about-photo {
		width: 100%;
		aspect-ratio: 3/4;
		background: var(--bg-elevated);
		border: 1px solid var(--border-soft);
		clip-path: polygon(0 0,100% 0,100% calc(100% - 28px),calc(100% - 28px) 100%,0 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}
	.about-photo-stripes {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.013) 8px, rgba(255,255,255,0.013) 9px);
		z-index: 1;
		pointer-events: none;
	}
	.about-photo-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
	}
	.about-facts {
		display: flex;
		flex-direction: column;
		gap: 1px;
		border: 1px solid var(--border-soft);
		overflow: hidden;
	}
	.about-fact {
		padding: 14px 18px;
		background: var(--bg-elevated);
		border-bottom: 1px solid var(--border-faint);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.about-fact:last-child { border-bottom: none; }
	.fact-label {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.12em;
		color: var(--text-muted);
		text-transform: uppercase;
	}
	.fact-value {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-base);
		letter-spacing: 0.05em;
	}

	@media (max-width: 900px) {
		.about-grid { grid-template-columns: 1fr; gap: 40px; }
		.about-sidebar { flex-direction: row; flex-wrap: wrap; }
		.about-photo { width: 160px; aspect-ratio: 3/4; flex-shrink: 0; }
		.about-facts { flex: 1; min-width: 200px; }
	}
	@media (max-width: 768px) {
		.section-container { padding: 72px 20px; }
	}
	@media (max-width: 480px) {
		.section-container { padding: 56px 16px; }
	}
</style>
