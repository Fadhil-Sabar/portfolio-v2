import { describe, expect, test } from 'bun:test';
import en from '../src/lib/i18n/en.json';
import id from '../src/lib/i18n/id.json';

const idKeys = Object.keys(id).sort();
const enKeys = Object.keys(en).sort();

/**
 * `t()` falls back to returning the raw key when a lookup misses, so a key present
 * in one dictionary but not the other shows up as literal "stats.title" on the page
 * rather than failing a build. This guards that.
 */
describe('i18n dictionaries', () => {
	test('id and en define exactly the same keys', () => {
		expect(idKeys).toEqual(enKeys);
	});

	test('no value is blank', () => {
		for (const [key, value] of Object.entries(id)) {
			expect(value.trim(), `id.${key}`).not.toBe('');
		}
		for (const [key, value] of Object.entries(en)) {
			expect(value.trim(), `en.${key}`).not.toBe('');
		}
	});

	test('translations actually differ for the stats section', () => {
		// Catches a copy-paste that ships Indonesian text under the English key.
		// Some terms are genuinely identical in both languages — "Total XP" and
		// "Pull Request" are used as-is in Indonesian too — so those are listed
		// rather than allowed by length.
		const identicalByDesign = new Set(['stats.xp', 'stats.pullRequest']);

		for (const key of idKeys.filter(
			(k) => (k.startsWith('stats.') || k === 'nav.stats') && !identicalByDesign.has(k)
		)) {
			expect(en[key as keyof typeof en], key).not.toBe(id[key as keyof typeof id]);
		}
	});
});
