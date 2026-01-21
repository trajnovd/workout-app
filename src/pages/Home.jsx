import { useEffect, useState } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import { workouts } from '../data/workouts';
import { hasDoneWorkoutThisWeek } from '../utils/storage';

export default function Home() {
  // Force re-render on mount to ensure we get latest storage data
  const [completedMap, setCompletedMap] = useState({});

  useEffect(() => {
    const map = {};
    workouts.forEach(w => {
      map[w.id] = hasDoneWorkoutThisWeek(w.id);
    });
    setCompletedMap(map);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Select a workout to get started.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map(workout => (
          <WorkoutCard 
            key={workout.id} 
            workout={workout} 
            completed={completedMap[workout.id]} 
          />
        ))}
      </div>

      {Object.values(completedMap).some(Boolean) && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-300">
            Great job! You've already been active this week. 
            <br className="md:hidden" /> Remember, you can always do a workout again if you're feeling energetic!
          </p>
        </div>
      )}
    </div>
  );
}
