import { mobilityPractices, livingRoomWorkouts } from '../data/practicesData';

export const getMobilityPractice = (dayOfWeek) => {
  if (dayOfWeek === 1) {
    return mobilityPractices[0]; // 'Thoracic Flow' on Mondays
  } else {
    return mobilityPractices[(dayOfWeek - 2) % (mobilityPractices.length - 1) + 1];
  }
};

export const getLivingRoomWorkout = (index) => {
  return livingRoomWorkouts[index] || null;
};
