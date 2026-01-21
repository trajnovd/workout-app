import { clsx } from 'clsx';
import { CheckCircle2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkoutCard({ workout, completed }) {
  return (
    <Link 
      to={`/workout/${workout.id}`}
      className={clsx(
        "group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-[1.02]",
        completed 
          ? "bg-gray-900 border border-gray-800 opacity-75 grayscale-[0.5] hover:opacity-100 hover:grayscale-0" 
          : "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={clsx(
          "p-3 rounded-full",
          completed ? "bg-gray-800 text-gray-500" : "bg-blue-500/20 text-blue-400"
        )}>
          {completed ? <CheckCircle2 size={24} /> : <Play size={24} fill="currentColor" />}
        </div>
        
        {completed && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
            Completed this week
          </span>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-1">{workout.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{workout.subtitle}</p>
        
        <div className="text-sm text-gray-500">
          {workout.exercises.length} Exercises
        </div>
      </div>

      {/* Hover decoration */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
    </Link>
  );
}
