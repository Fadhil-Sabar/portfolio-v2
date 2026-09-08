/// <reference types="bun" />
import { test, expect } from 'bun:test';
import { projects } from '../src/lib/data/projects';

test('every project has English and Indonesian values for translatable fields', () => {
	const fields = ['blurb', 'description', 'role', 'type'] as const;

	expect(projects).toHaveLength(11);
	for (const project of projects) {
		for (const field of fields) {
			const value = project[field];
			expect(typeof value).toBe('object');
			expect(typeof value.en).toBe('string');
			expect(typeof value.id).toBe('string');
			expect(value.en.trim()).not.toBe('');
			expect(value.id.trim()).not.toBe('');
		}
	}
});
