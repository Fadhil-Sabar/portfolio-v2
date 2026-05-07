<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { experience } from '$lib/data/experience';
	import { t } from '$lib/stores/t';
</script>

<section id="experience">
	<div class="section-container">
		<div class="section-label" use:reveal>// 03 — History</div>
		<h2 class="section-title" use:reveal>{$t('experience.title')}</h2>
		<div class="timeline">
			{#each experience as e, i}
				<div class="timeline-item" use:reveal={i * 80}>
					<div class="timeline-dot"></div>
					<div class="timeline-period">{e.period}</div>
					<div class="timeline-role">{e.role}</div>
					<div class="timeline-company">{e.company}</div>
					<div class="timeline-desc">{e.description}</div>
					<div class="timeline-tech">
						{#each e.tech as tag}
							<span class="timeline-tag">{tag}</span>
						{/each}
					</div>
				</div>
			{/each}
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
	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--border-soft);
	}
	.timeline-item {
		padding-left: 36px;
		padding-bottom: 52px;
		position: relative;
	}
	.timeline-item:last-child { padding-bottom: 0; }
	.timeline-dot {
		position: absolute;
		left: -4px;
		top: 6px;
		width: 9px;
		height: 9px;
		border: 1px solid var(--border-hard);
		background: var(--bg-base);
		transform: rotate(45deg);
	}
	.timeline-period {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 6px;
	}
	.timeline-role {
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-bright);
		letter-spacing: -0.01em;
		margin-bottom: 3px;
	}
	.timeline-company {
		font-size: 0.875rem;
		color: var(--text-soft);
		margin-bottom: 14px;
	}
	.timeline-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.75;
		max-width: 58ch;
	}
	.timeline-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-top: 14px;
	}
	.timeline-tag {
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.09em;
		color: var(--text-muted);
		border: 1px solid var(--border-faint);
		padding: 3px 6px;
		text-transform: uppercase;
	}
	@media (max-width: 768px) { .section-container { padding: 72px 20px; } }
	@media (max-width: 480px) { .section-container { padding: 56px 16px; } }
</style>
