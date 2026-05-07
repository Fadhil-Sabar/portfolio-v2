import { derived } from 'svelte/store';
import { lang } from './lang';
import id from '$lib/i18n/id.json';
import en from '$lib/i18n/en.json';

const dicts = { id, en } as const;

export const t = derived(lang, ($lang) => (key: string): string => {
	return (dicts[$lang] as Record<string, string>)[key] ?? key;
});
