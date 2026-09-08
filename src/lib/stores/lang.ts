import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Lang = 'id' | 'en';

function getStoredLang(): Lang | null {
	if (!browser) return null;

	try {
		const stored = localStorage.getItem('pf-lang');
		return stored === 'id' || stored === 'en' ? stored : null;
	} catch {
		return null;
	}
}

export const lang = writable<Lang>(getStoredLang() ?? 'en');

export function setLang(l: Lang) {
	lang.set(l);
	if (browser) {
		document.documentElement.lang = l;
		try {
			localStorage.setItem('pf-lang', l);
		} catch {
			// Language switching should still work when storage is unavailable.
		}
	}
}
