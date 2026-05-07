<script lang="ts">
	import NoiseOverlay from '$lib/components/NoiseOverlay.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';
	import Nav from '$lib/components/sections/Nav.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Skills from '$lib/components/sections/Skills.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
</script>

<svelte:head>
	<title>Fadhil Andriawan — Web Developer</title>
	<meta name="description" content="Web Developer based in Jakarta, Indonesia. Building digital products that are clean and resilient." />
</svelte:head>

<NoiseOverlay />
<Cursor />

<Nav />
<Hero />
<SectionDivider />
<About />
<SectionDivider />
<Projects />
<SectionDivider />
<Skills />
<SectionDivider />
<Experience />
<SectionDivider />
<Contact />
<Footer />
