<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { skills } from '$lib/data/skills';
	import { t } from '$lib/stores/t';
</script>

<section id="skills">
	<div class="section-container">
		<div class="section-label" use:reveal>// 02 — Stack</div>
		<h2 class="section-title" use:reveal>{$t('skills.title')}</h2>
		<div class="skills-grid" use:reveal={100}>
			{#each skills as cat}
				<div class="skill-category">
					<div class="skill-cat-label">{$t(cat.labelKey)}</div>
					<div class="skill-list">
						{#each cat.items as item}
							<div class="skill-item">{item}</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	section { background: var(--bg-elevated); }
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
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		background: var(--border-faint);
		border: 1px solid var(--border-faint);
	}
	.skill-category { background: var(--bg-elevated); padding: 28px 24px; }
	.skill-cat-label {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 18px;
		padding-bottom: 14px;
		border-bottom: 1px solid var(--border-soft);
		display: flex;
		align-items: center;
		gap: 7px;
	}
	.skill-cat-label::before {
		content: '[ ]';
		font-size: 8px;
		color: var(--border-hard);
	}
	.skill-list { display: flex; flex-direction: column; gap: 9px; }
	.skill-item {
		font-size: 0.85rem;
		color: var(--text-soft);
		display: flex;
		align-items: center;
		gap: 9px;
	}
	.skill-item::before {
		content: '—';
		font-family: var(--font-mono);
		font-size: 9px;
		color: var(--border-hard);
		flex-shrink: 0;
	}
	@media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) { .section-container { padding: 72px 20px; } }
	@media (max-width: 480px) {
		.skills-grid { grid-template-columns: 1fr; }
		.section-container { padding: 56px 16px; }
	}
</style>
