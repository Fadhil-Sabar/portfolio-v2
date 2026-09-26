import { projects } from '$lib/data/projects';

const SITE = 'https://fadhil-andriawan.dev';

export const prerender = true;

// `lastmod` is intentionally omitted. The data layer only carries a year (see
// `Project.year`), so any per-project date here would be invented, and stamping the
// build date instead falsely tells crawlers every URL changed on every deploy.
// Per the sitemap spec, `lastmod` is optional.
export function GET() {
	const urls: { loc: string; priority: string; changefreq: string }[] = [
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
