import { projects } from '$lib/data/projects';

const SITE = 'https://fadhil-andriawan.dev';

export const prerender = true;

/** Format a date as YYYY-MM-DD */
function fmt(d: Date): string {
	return d.toISOString().slice(0, 10);
}

export function GET() {
	const today = fmt(new Date());

	const urls: { loc: string; priority: string; changefreq: string; lastmod?: string }[] = [
		{ loc: '/', priority: '1.0', changefreq: 'monthly' },
		...projects.map((p) => ({
			loc: `/projects/${p.slug}`,
			priority: '0.8',
			changefreq: 'monthly' as const
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
