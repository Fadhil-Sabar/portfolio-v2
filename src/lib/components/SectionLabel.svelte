<script lang="ts">
	interface Props {
		text: string;
		class?: string;
	}
	let { text, class: cls = '' }: Props = $props();
</script>

<div class="section-label reveal {cls}">{text}</div>

<style>
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
</style>
