
function StreakDisplay({ streak, cleanStreak = 0 }) {
  const clean = cleanStreak > 0 && (
    <span className="streak-clean"> · {cleanStreak} clean</span>
  );

  if (streak === 0) {
    return (
      <div className="streak-display">
        <span className="streak-empty">Start your streak today</span>
        {clean}
      </div>
    );
  }

  return (
    <div className="streak-display">
      <span className="streak-count">{streak}</span>
      <span className="streak-label">day streak</span>
      {clean}
    </div>
  );
}

export default StreakDisplay;
