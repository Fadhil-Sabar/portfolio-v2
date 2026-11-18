<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/stores/t';

	const steps = [
		{ n: '01', key: 'agents.step1' },
		{ n: '02', key: 'agents.step2' },
		{ n: '03', key: 'agents.step3' },
		{ n: '04', key: 'agents.step4' }
	];
</script>

<section id="agents">
	<div class="section-container">
		<div class="section-label" use:reveal>// 01 — Workflow</div>
		<h2 class="section-title" use:reveal>{$t('agents.title')}</h2>
		<p class="agents-body" use:reveal={100}>{$t('agents.body')}</p>
		<ol class="steps" use:reveal={180}>
			{#each steps as step}
				<li class="step">
					<span class="step-num">{step.n}</span>
					<span class="step-name">{$t(step.key)}</span>
					<span class="step-sub">{$t(step.key + '.sub')}</span>
				</li>
			{/each}
		</ol>
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
		margin-bottom: 32px;
	}
	.agents-body {
		color: var(--text-soft);
		font-size: 0.975rem;
		line-height: 1.8;
		max-width: 64ch;
		margin-bottom: 48px;
	}
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		background: var(--border-faint);
		border: 1px solid var(--border-faint);
	}
	.step {
		background: var(--bg-elevated);
		padding: 24px 22px 26px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		position: relative;
	}
	.step:not(:last-child)::after {
		content: '>';
		position: absolute;
		right: 14px;
		top: 22px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--border-hard);
	}
	.step-num {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
	}
	.step-name {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--text-bright);
	}
	.step-sub {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--text-soft);
		line-height: 1.6;
	}
	@media (max-width: 900px) { .steps { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) { .section-container { padding: 72px 20px; } }
	@media (max-width: 480px) {
		.section-container { padding: 56px 16px; }
		.steps { grid-template-columns: 1fr; }
		.step:not(:last-child)::after { content: 'v'; }
	}
</style>
