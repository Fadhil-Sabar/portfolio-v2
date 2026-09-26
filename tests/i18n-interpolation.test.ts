import { describe, expect, test } from 'bun:test';
import en from '../src/lib/i18n/en.json';
import id from '../src/lib/i18n/id.json';
import type { TParams } from '../src/lib/stores/t';

/**
 * Mirrors the interpolation `t()` performs, so the store itself — which needs Svelte's
 * runtime to import — stays untested but the behaviour it depends on is not.
 */
function translate(dict: Record<string, string>, key: string, params?: TParams): string {
	const raw = dict[key] ?? key;
	if (!params) return raw;
	return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in params ? String(params[name]) : match
	);
}

describe('t() interpolation', () => {
	test('substitutes named placeholders', () => {
		expect(translate(en, 'stats.comment', { n: 1 })).toBe('1 comment');
		expect(translate(en, 'stats.comments', { n: 2 })).toBe('2 comments');
		expect(translate(id, 'stats.comments', { n: 2 })).toBe('2 komentar');
	});

	test('leaves a placeholder alone when no value is supplied', () => {
		expect(translate(en, 'stats.comments')).toBe('{n} comments');
		expect(translate(en, 'stats.comments', { other: 1 })).toBe('{n} comments');
	});

	test('a value of 0 still substitutes rather than being treated as missing', () => {
		// `name in params` is deliberate: `params[name] || fallback` would drop this.
		expect(translate(en, 'stats.comments', { n: 0 })).toBe('0 comments');
	});
	test('a missing key returns the key, as the store documents', () => {
		expect(translate(en, 'stats.nope')).toBe('stats.nope');
	});
});

describe('placeholder parity', () => {
	// Guards a subtle class of bug: a placeholder added to one language but not the
	// other would render a literal "{n}" on the page in that language only.
	const placeholders = (value: string) =>
		[...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

	const keys = Object.keys(id).filter((k) => placeholders(id[k as keyof typeof id]).length > 0);

	test('there is at least one parameterised key to check', () => {
		expect(keys.length).toBeGreaterThan(0);
	});

	test('id and en use the same placeholders for the same key', () => {
		for (const key of keys) {
			expect(placeholders(en[key as keyof typeof en]), key).toEqual(
				placeholders(id[key as keyof typeof id])
			);
		}
	});
});
