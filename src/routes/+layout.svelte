<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#0a0a0b" />
	<meta name="color-scheme" content="dark" />
	<link rel="sitemap" href="/sitemap.xml" />
	<!-- No hreflang: language is a client-side store (localStorage 'pf-lang'), so every
	     crawlable URL serves the same HTML. Alternate links would all point at one page. -->
</svelte:head>

{@render children()}
