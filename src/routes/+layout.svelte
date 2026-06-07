<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#0a0a0b" />
	<meta name="color-scheme" content="dark" />
</svelte:head>

{@render children()}
