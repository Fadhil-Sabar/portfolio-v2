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

	const SITE = 'https://fadhil-andriawan.dev';
	const TITLE = 'Fadhil Andriawan — Web Developer';
	const DESC = 'Web Developer based in Jakarta, Indonesia. Building digital products that are clean and resilient.';
	const OG_IMAGE = SITE + '/images/profile-pic.jpeg';

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Fadhil Andriawan',
		givenName: 'Fadhil',
		familyName: 'Andriawan',
		jobTitle: 'Software Developer',
		url: SITE,
		image: OG_IMAGE,
		email: 'sabarfadhil@gmail.com',
		sameAs: [
			'https://github.com/Fadhil-Sabar',
			'https://linkedin.com/in/fadhil-andriawan-71b875212/'
		],
		knowsAbout: ['Web Development', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'Oracle DB', 'Next.js'],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Jakarta',
			addressCountry: 'Indonesia'
		}
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: SITE,
		name: TITLE,
		description: DESC,
		author: {
			'@type': 'Person',
			name: 'Fadhil Andriawan'
		}
	};

	const ldHtml = `<script type="application/ld+json">${JSON.stringify(personSchema)}<\/script><script type="application/ld+json">${JSON.stringify(websiteSchema)}<\/script>`;
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESC} />
	<link rel="canonical" href={SITE} />

	<!-- Open Graph -->
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESC} />
	<meta property="og:url" content={SITE} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="1600" />
	<meta property="og:image:alt" content="Fadhil Andriawan" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Fadhil Andriawan" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESC} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content="Fadhil Andriawan" />

	<!-- JSON-LD Structured Data -->
</svelte:head>

{@html ldHtml}

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
