import { useState } from 'react';
import { CheckIcon } from './icons';
import { SLIP_FOODS, slipLabel } from '../utils/cleanEating';

// Clean eating by exception: the day starts clean and costs zero taps.
// Slips are logged against the trigger foods; one free day per week
// forgives a day's slips (streak-wise — the slips still count in Trends).
// A free day can only be declared on the day itself: planned exceptions,
// never retroactive pardons. Slips stay editable on any past day.
function CleanEatingRow({ slips, freeDay, weekFreeDayUsedOn, isToday, disabled, onSetSlips, onSetFreeDay }) {
  const [open, setOpen] = useState(false);

  const clean = freeDay || slips.length === 0;

  const label = freeDay
    ? `Free day${slips.length > 0 ? ` — ${slips.map(slipLabel).join(', ')}` : ''}`
    : slips.length > 0
      ? slips.map(slipLabel).join(', ')
      : 'Clean eating';

  const toggleSlip = (key) => {
    onSetSlips(
      slips.includes(key) ? slips.filter((s) => s !== key) : [...slips, key]
    );
  };

  const checkboxClasses = [
    'habit-checkbox',
    clean && (freeDay ? 'habit-checkbox--reward' : 'habit-checkbox--checked'),
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'habit-label',
    clean && !freeDay && 'habit-label--checked',
    freeDay && 'habit-label--reward',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className="tally-row">
        <div className={checkboxClasses}>{clean && <CheckIcon />}</div>
        <span className={labelClasses}>{label}</span>
        {!disabled && (
          <button
            className="habit-action-btn"
            type="button"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Done' : slips.length > 0 || freeDay ? 'Edit' : 'Log slip'}
          </button>
        )}
      </div>

      {open && !disabled && (
        <div className="clean-panel">
          <div className="slip-chips">
            {SLIP_FOODS.map((f) => (
              <button
                key={f.key}
                className={`slip-chip${slips.includes(f.key) ? ' slip-chip--on' : ''}`}
                type="button"
                onClick={() => toggleSlip(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          {freeDay ? (
            <button
              className="free-day-btn free-day-btn--on"
              type="button"
              onClick={() => onSetFreeDay(false)}
            >
              ★ Free day
            </button>
          ) : isToday && !weekFreeDayUsedOn ? (
            <button
              className="free-day-btn"
              type="button"
              onClick={() => onSetFreeDay(true)}
            >
              Use my free day
            </button>
          ) : isToday ? (
            <p className="free-day-note">Free day already used this week</p>
          ) : null}
        </div>
      )}
    </>
  );
}

export default CleanEatingRow;
