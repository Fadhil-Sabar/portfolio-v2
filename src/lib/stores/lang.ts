import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Lang = 'id' | 'en';

const stored = browser ? (localStorage.getItem('pf-lang') as Lang | null) : null;
export const lang = writable<Lang>(stored ?? 'id');

export function setLang(l: Lang) {
	lang.set(l);
	if (browser) localStorage.setItem('pf-lang', l);
}
