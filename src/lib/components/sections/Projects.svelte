<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/data/projects';
	import { t } from '$lib/stores/t';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section id="projects">
	<div class="section-container">
		<div class="section-label" use:reveal>// 01 — Selected Work</div>
		<h2 class="section-title" use:reveal>{$t('projects.title')}</h2>
		<div class="projects-grid">
			{#each projects as project, i}
				<ProjectCard {project} index={i} />
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
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2px;
	}
	@media (max-width: 768px) { .section-container { padding: 72px 20px; } }
	@media (max-width: 700px) { .projects-grid { grid-template-columns: 1fr; } }
	@media (max-width: 480px) { .section-container { padding: 56px 16px; } }
</style>
