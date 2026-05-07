import { projects } from '$lib/data/projects';

const SITE = 'https://fadhil-andriawan.dev';

export const prerender = true;

export function GET() {
	const urls = [
		'/',
		...projects.map((p) => `/projects/${p.slug}`)
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
