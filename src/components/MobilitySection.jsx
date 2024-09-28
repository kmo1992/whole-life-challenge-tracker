import React from 'react';
import moment from 'moment';
import { getMobilityPractice, getLivingRoomWorkout } from '../utils/practiceUtils';
import { getChallengeStartDate } from '../utils/dateUtils';

function MobilitySection({ date }) {
  const dayOfWeek = date.isoWeekday(); // 1 (Monday) to 7 (Sunday)

  if (dayOfWeek === 7) {
    // Sunday
    return (
      <div className="mobility">
        <span>Rest Day</span>
        <span>&nbsp;</span>
      </div>
    );
  } else {
    const startDate = getChallengeStartDate();
    const daysSinceStart = date.clone().startOf('day').diff(startDate.clone().startOf('day'), 'days');
    const numSundays = Math.floor((daysSinceStart + startDate.isoWeekday() - 1) / 7);
    const workoutIndex = daysSinceStart - numSundays;

    const livingRoomWorkout = getLivingRoomWorkout(workoutIndex);
    const mobilityPractice = getMobilityPractice(dayOfWeek);

    return (
      <div className="mobility">
        {livingRoomWorkout ? (
          <>
            <a href={livingRoomWorkout.url} target="_blank" rel="noopener noreferrer">
              {livingRoomWorkout.name}
            </a>
            <a href={mobilityPractice.url} target="_blank" rel="noopener noreferrer">
              {mobilityPractice.name}
            </a>
          </>
        ) : (
          <>
            <span>No Living Room Workout</span>
            <a href={mobilityPractice.url} target="_blank" rel="noopener noreferrer">
              {mobilityPractice.name}
            </a>
          </>
        )}
      </div>
    );
  }
}

export default MobilitySection;
