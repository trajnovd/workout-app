const STORAGE_KEY = 'workout_app_data';

export const getCompletedWorkouts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load workouts", e);
    return [];
  }
};

export const saveCompletedWorkout = (workoutId) => {
  try {
    const current = getCompletedWorkouts();
    const newEntry = {
      workoutId,
      date: new Date().toISOString(),
    };
    const updated = [...current, newEntry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save workout", e);
    return [];
  }
};

export const hasDoneWorkoutThisWeek = (workoutId) => {
  const completed = getCompletedWorkouts();
  const now = new Date();
  // Simple check: is there an entry for this workoutId since the last Monday?
  
  // Get Monday of current week
  const day = now.getDay() || 7; // Get current day number, converting Sun. to 7
  if( day !== 1 )
      now.setHours(-24 * (day - 1));
  now.setHours(0,0,0,0);
  const startOfWeek = now;

  return completed.some(entry => {
    if (entry.workoutId !== workoutId) return false;
    const entryDate = new Date(entry.date);
    return entryDate >= startOfWeek;
  });
};
