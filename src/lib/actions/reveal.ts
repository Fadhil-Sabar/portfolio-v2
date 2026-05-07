import type { Action } from 'svelte/action';

export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
	node.classList.add('reveal');
	if (delay) node.style.transitionDelay = delay + 'ms';

	const obs = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					obs.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.08 }
	);
	obs.observe(node);

	return { destroy: () => obs.disconnect() };
};
