import { describe, expect, test } from 'bun:test';
import { barPercent, formatJoinDate, joinYear } from '../src/lib/data/duolingo';

describe('formatJoinDate', () => {
	test('converts unix seconds to an ISO date', () => {
		expect(formatJoinDate(1652537442)).toBe('2022-05-14');
	});

	test('rejects missing or unusable input instead of showing NaN', () => {
		expect(formatJoinDate(undefined)).toBeNull();
		expect(formatJoinDate(null)).toBeNull();
		expect(formatJoinDate(0)).toBeNull();
		expect(formatJoinDate(-1)).toBeNull();
		expect(formatJoinDate(Number.NaN)).toBeNull();
		expect(formatJoinDate(Number.POSITIVE_INFINITY)).toBeNull();
	});
});

describe('joinYear', () => {
	test('takes the year off an ISO date', () => {
		expect(joinYear('2022-05-14')).toBe('2022');
	});

	test('passes null through', () => {
		expect(joinYear(null)).toBeNull();
	});
});

describe('barPercent', () => {
	test('scales the largest course to 100', () => {
		expect(barPercent(17577, 17577)).toBe(100);
	});

	test('keeps a tiny course visible instead of rounding it to nothing', () => {
		// English is 227 of 17577 — 1.3%, which would floor to a 1% hairline.
		expect(barPercent(227, 17577)).toBe(2);
	});

	test('does not divide by zero on an empty course list', () => {
		expect(barPercent(100, 0)).toBe(0);
		expect(barPercent(0, 100)).toBe(2);
	});
});
