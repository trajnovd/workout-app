import { clsx } from 'clsx';
import { CheckCircle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { exercises } from '../data/exercises';
import { workouts } from '../data/workouts';
import { saveCompletedWorkout } from '../utils/storage';

export default function WorkoutView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workouts.find(w => w.id === id);
  
  // Track expanded exercise
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  if (!workout) return <div className="text-white">Workout not found</div>;

  const handleComplete = () => {
    saveCompletedWorkout(id);
    navigate('/calendar');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">{workout.title}</h2>
          <p className="text-gray-400">{workout.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {workout.exercises.map((exId, index) => {
          const exercise = exercises[exId];
          if (!exercise) return null;
          
          const isActive = index === activeExerciseIndex;

          return (
            <div 
              key={exId}
              className={clsx(
                "rounded-2xl border transition-all overflow-hidden",
                isActive 
                  ? "bg-gray-900 border-blue-500/50 shadow-lg shadow-blue-900/10" 
                  : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
              )}
            >
              <button
                onClick={() => setActiveExerciseIndex(isActive ? -1 : index)}
                className="w-full text-left p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                    isActive ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-500"
                  )}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className={clsx("font-medium", isActive ? "text-white" : "text-gray-300")}>
                      {exercise.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {exercise.sets} sets • {exercise.type === 'reps' ? `${exercise.reps} reps` : `${exercise.duration}s`}
                    </p>
                  </div>
                </div>
                {isActive ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
              </button>

              {isActive && (
                <div className="p-4 pt-0 border-t border-gray-800/50">
                  <div className="mt-4 mb-4">
                     <VideoPlayer src={exercise.videoSource} />
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    {exercise.description}
                  </p>

                  {exercise.type === 'time' && (
                    <Timer duration={exercise.duration} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleComplete}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-white font-bold rounded-xl flex items-center justify-center gap-2"
      >
        <CheckCircle size={20} />
        Complete Workout
      </button>
    </div>
  );
}

function Timer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  return (
    <div className="flex items-center gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800">
      <div className="text-2xl font-mono font-bold text-white w-16 text-center">
        {timeLeft}s
      </div>
      <div className="flex gap-2 flex-1">
        <button 
          onClick={toggle}
          className={clsx(
            "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors",
            isActive 
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" 
              : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
          )}
        >
          {isActive ? 'Pause' : 'Start Timer'}
        </button>
        <button 
          onClick={reset}
          className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}
