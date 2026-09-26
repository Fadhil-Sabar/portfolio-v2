import { derived } from 'svelte/store';
import { lang } from './lang';
import id from '$lib/i18n/id.json';
import en from '$lib/i18n/en.json';

const dicts = { id, en } as const;

export type TParams = Record<string, string | number>;

/**
 * Look up a translation, optionally interpolating `{name}` placeholders.
 *
 * A missing key returns the key itself rather than throwing, so a typo shows up on
 * the page as `stats.foo` instead of breaking the build. `tests/i18n-dictionaries.test.ts`
 * guards the other half of that: that both dictionaries define the same keys.
 */
export const t = derived(
	lang,
	($lang) =>
		(key: string, params?: TParams): string => {
			const raw = (dicts[$lang] as Record<string, string>)[key] ?? key;
			if (!params) return raw;
			return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
				name in params ? String(params[name]) : match
			);
		}
);
