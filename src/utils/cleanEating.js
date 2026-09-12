import moment from 'moment';
import { getAppToday } from './dateUtils';
import { getWeekStartKey } from './scheduleUtils';

// Clean eating works by exception: every day is assumed clean, and only
// slips get logged (which foods broke the rules). One free day per ISO week
// forgives its slips. Slip data lives on the day doc as `slips: [key]` plus
// an optional `freeDay: true`.

export const SLIP_FOODS = [
  { key: 'bread', label: 'Bread' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'fried', label: 'Fried' },
  { key: 'sweets', label: 'Sweets' },
  { key: 'alcohol', label: 'Alcohol' },
];

export const slipLabel = (key) =>
  SLIP_FOODS.find((f) => f.key === key)?.label || key;

// A day is clean when nothing was logged against it, or its free day covers it
export const isDayClean = (dayData) =>
  !!dayData?.freeDay || !(dayData?.slips?.length > 0);

/**
 * Consecutive clean days walking back from asOfDate. Only recorded days
 * count (a day with no doc at all is unknown, not clean — except the asOf
 * day itself, which simply isn't over yet and is skipped when empty).
 */
export const calculateCleanStreak = (data, asOfDate) => {
  const today = getAppToday().startOf('day');
  if (asOfDate.isAfter(today, 'day')) return 0;

  let streak = 0;
  const checkDate = asOfDate.clone().startOf('day');

  for (let i = 0; i < 365; i++) {
    const dayData = data[checkDate.format('YYYY-MM-DD')];
    if (!dayData) {
      if (i === 0) {
        checkDate.subtract(1, 'days');
        continue;
      }
      break;
    }
    if (dayData.slips?.length > 0 && !dayData.freeDay) break;
    streak += 1;
    checkDate.subtract(1, 'days');
  }

  return streak;
};

/**
 * The date (YYYY-MM-DD) that used this ISO week's free day, or null.
 */
export const getWeekFreeDay = (data, date) => {
  const d = moment(getWeekStartKey(date));
  for (let i = 0; i < 7; i++) {
    const key = d.format('YYYY-MM-DD');
    if (data[key]?.freeDay) return key;
    d.add(1, 'days');
  }
  return null;
};

/**
 * Week-at-a-glance for the Sunday reflection: how many of the ISO week's
 * seven days were clean (unrecorded days count as clean — tracking is by
 * exception), and which day used the free day, if any.
 */
export const getWeekCleanSummary = (data, date) => {
  const d = moment(getWeekStartKey(date));
  let cleanDays = 0;
  for (let i = 0; i < 7; i++) {
    if (isDayClean(data[d.format('YYYY-MM-DD')])) cleanDays += 1;
    d.add(1, 'days');
  }
  return { cleanDays, freeDayUsedOn: getWeekFreeDay(data, date) };
};

/**
 * Slip tallies per food over the trailing window (free-day slips included —
 * forgiveness is for the streak, not the data). Sorted worst-first,
 * zero-count foods omitted.
 */
export const getSlipCounts = (data, endDate, windowDays = 30) => {
  const counts = {};
  const d = moment(endDate);
  for (let i = 0; i < windowDays; i++) {
    (data[d.format('YYYY-MM-DD')]?.slips || []).forEach((key) => {
      counts[key] = (counts[key] || 0) + 1;
    });
    d.subtract(1, 'days');
  }
  return SLIP_FOODS
    .filter((f) => counts[f.key] > 0)
    .map((f) => ({ ...f, count: counts[f.key] }))
    .sort((a, b) => b.count - a.count);
};
