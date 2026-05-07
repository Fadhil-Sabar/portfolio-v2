import { projects } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) throw error(404, 'Project not found');
	return { project };
};

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));
