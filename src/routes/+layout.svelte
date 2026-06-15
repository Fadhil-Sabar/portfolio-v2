<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#0a0a0b" />
	<meta name="color-scheme" content="dark" />
	<link rel="sitemap" href="/sitemap.xml" />
	<link rel="alternate" hreflang="en" href="https://fadhil-andriawan.dev/" />
	<link rel="alternate" hreflang="id" href="https://fadhil-andriawan.dev/" />
	<link rel="alternate" hreflang="x-default" href="https://fadhil-andriawan.dev/" />
</svelte:head>

{@render children()}
