import { describe, it, expect } from 'vitest';
import moment from 'moment';
import {
  SLIP_FOODS,
  slipLabel,
  isDayClean,
  calculateCleanStreak,
  getWeekFreeDay,
  getWeekCleanSummary,
  getSlipCounts,
} from './cleanEating';

describe('SLIP_FOODS', () => {
  it('tracks the five trigger foods in display order', () => {
    expect(SLIP_FOODS.map((f) => f.key)).toEqual([
      'gluten', 'dairy', 'fried', 'sweets', 'alcohol',
    ]);
  });

  it('maps keys to labels, falling back to the key', () => {
    expect(slipLabel('alcohol')).toBe('Alcohol');
    expect(slipLabel('mystery')).toBe('mystery');
  });
});

describe('isDayClean', () => {
  it('treats missing or slip-free days as clean', () => {
    expect(isDayClean(undefined)).toBe(true);
    expect(isDayClean({})).toBe(true);
    expect(isDayClean({ slips: [] })).toBe(true);
  });

  it('is dirty when slips are logged', () => {
    expect(isDayClean({ slips: ['alcohol'] })).toBe(false);
  });

  it('is clean when the free day covers the slips', () => {
    expect(isDayClean({ slips: ['alcohol'], freeDay: true })).toBe(true);
  });
});

describe('calculateCleanStreak', () => {
  // Recorded, slip-free day
  const clean = () => ({ habits: { pullups: true } });

  const range = (endDate, n, build) => {
    const data = {};
    const d = moment(endDate);
    for (let i = 0; i < n; i++) {
      data[d.format('YYYY-MM-DD')] = build();
      d.subtract(1, 'day');
    }
    return data;
  };

  it('counts consecutive recorded clean days', () => {
    const asOf = moment('2024-03-15');
    expect(calculateCleanStreak(range(asOf, 4, clean), asOf)).toBe(4);
  });

  it('breaks on a day with unforgiven slips', () => {
    const asOf = moment('2024-03-15');
    const data = range(asOf, 4, clean);
    data['2024-03-13'].slips = ['sweets'];
    expect(calculateCleanStreak(data, asOf)).toBe(2);
  });

  it('forgives slips on the free day', () => {
    const asOf = moment('2024-03-15');
    const data = range(asOf, 4, clean);
    data['2024-03-13'].slips = ['sweets'];
    data['2024-03-13'].freeDay = true;
    expect(calculateCleanStreak(data, asOf)).toBe(4);
  });

  it('skips an empty asOf day (today is not over) but stops at older gaps', () => {
    const asOf = moment('2024-03-15');
    // No record for the 15th; 14th and 13th recorded clean; 12th missing
    const data = range(moment('2024-03-14'), 2, clean);
    expect(calculateCleanStreak(data, asOf)).toBe(2);
  });

  it('returns 0 for a future date', () => {
    const future = moment().add(3, 'day');
    expect(calculateCleanStreak(range(future, 3, clean), future)).toBe(0);
  });
});

describe('getWeekFreeDay', () => {
  it('finds the free day within the same ISO week', () => {
    // 2024-03-13 is a Wednesday; its week is Mon 03-11 .. Sun 03-17
    const data = { '2024-03-11': { freeDay: true } };
    expect(getWeekFreeDay(data, moment('2024-03-13'))).toBe('2024-03-11');
  });

  it('ignores free days from other weeks', () => {
    const data = { '2024-03-10': { freeDay: true } }; // Sunday of prior week
    expect(getWeekFreeDay(data, moment('2024-03-13'))).toBeNull();
  });

  it('returns null when the week is unused', () => {
    expect(getWeekFreeDay({}, moment('2024-03-13'))).toBeNull();
  });
});

describe('getWeekCleanSummary', () => {
  // Week of Wed 2024-03-13 runs Mon 03-11 .. Sun 03-17
  const wed = () => moment('2024-03-13');

  it('counts an untracked week as fully clean (tracking is by exception)', () => {
    expect(getWeekCleanSummary({}, wed())).toEqual({ cleanDays: 7, freeDayUsedOn: null });
  });

  it('subtracts days with unforgiven slips', () => {
    const data = {
      '2024-03-12': { slips: ['sweets'] },
      '2024-03-14': { slips: ['fried'] },
    };
    expect(getWeekCleanSummary(data, wed())).toEqual({ cleanDays: 5, freeDayUsedOn: null });
  });

  it('keeps a free day clean and reports which day it was', () => {
    const data = { '2024-03-12': { slips: ['alcohol'], freeDay: true } };
    expect(getWeekCleanSummary(data, wed())).toEqual({
      cleanDays: 7,
      freeDayUsedOn: '2024-03-12',
    });
  });

  it('ignores slips from other weeks', () => {
    const data = { '2024-03-10': { slips: ['sweets'] } }; // prior Sunday
    expect(getWeekCleanSummary(data, wed())).toEqual({ cleanDays: 7, freeDayUsedOn: null });
  });
});

describe('getSlipCounts', () => {
  it('tallies slips worst-first with labels, omitting clean foods', () => {
    const data = {
      '2024-03-15': { slips: ['alcohol', 'fried'] },
      '2024-03-14': { slips: ['alcohol'] },
      '2024-03-10': { slips: ['alcohol'], freeDay: true }, // still counts as data
    };
    const counts = getSlipCounts(data, moment('2024-03-15'), 30);
    expect(counts).toEqual([
      { key: 'alcohol', label: 'Alcohol', count: 3 },
      { key: 'fried', label: 'Fried', count: 1 },
    ]);
  });

  it('respects the window boundary', () => {
    const data = {
      '2024-03-15': { slips: ['sweets'] },
      '2024-01-01': { slips: ['sweets'] }, // outside a 30-day window
    };
    const counts = getSlipCounts(data, moment('2024-03-15'), 30);
    expect(counts).toEqual([{ key: 'sweets', label: 'Sweets', count: 1 }]);
  });

  it('returns an empty list for a clean window', () => {
    expect(getSlipCounts({}, moment('2024-03-15'), 30)).toEqual([]);
  });
});
