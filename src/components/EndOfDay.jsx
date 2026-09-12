import HydrationRow from './HydrationRow';
import CleanEatingRow from './CleanEatingRow';

function EndOfDay({ habits, dayData, weekFreeDayUsedOn, onSetHydration, onSetSlips, onSetFreeDay, disabled }) {
  // Normalize: legacy boolean true → 3, false/undefined → 0
  const bottles = habits.hydrate === true ? 3 : (Number(habits.hydrate) || 0);

  return (
    <section className="section">
      <h2 className="section-header">Fuel</h2>

      <HydrationRow
        bottles={bottles}
        onSetBottles={onSetHydration}
        disabled={disabled}
      />

      <CleanEatingRow
        slips={dayData.slips || []}
        freeDay={!!dayData.freeDay}
        weekFreeDayUsedOn={weekFreeDayUsedOn}
        disabled={disabled}
        onSetSlips={onSetSlips}
        onSetFreeDay={onSetFreeDay}
      />
    </section>
  );
}

export default EndOfDay;
