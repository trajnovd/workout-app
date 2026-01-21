import { clsx } from 'clsx';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { getCompletedWorkouts } from '../utils/storage';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const completedWorkouts = getCompletedWorkouts();

  // Calendar Logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Stats Logic - Recalculate based on completedWorkouts
  const workoutsThisMonth = completedWorkouts.filter(w => 
    isSameMonth(new Date(w.date), currentDate)
  ).length;

  const workoutsThisYear = completedWorkouts.filter(w => 
    new Date(w.date).getFullYear() === currentDate.getFullYear()
  ).length;

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Your Progress</h2>
        <p className="text-gray-400">Consistency is key!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">This Month</div>
          <div className="text-3xl font-bold text-white">{workoutsThisMonth}</div>
          <div className="text-gray-600 text-sm">Workouts</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">This Year</div>
          <div className="text-3xl font-bold text-emerald-400">{workoutsThisYear}</div>
          <div className="text-gray-600 text-sm">Total Workouts</div>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden p-6">
        <div className="flex items-center justify-between mb-8">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white">
            <ChevronLeft />
          </button>
          <h3 className="text-lg font-bold text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white">
            <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Detailed grid building with offset would be better, but simple 1-31 is okay for now. 
              Actually, let's do it properly with empty slots if needed, but date-fns eachDayOfInterval handles the days.
              But we need to align the first day. 
          */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
             <div key={`empty-${i}`} />
          ))}
          
          {daysInMonth.map(day => {
            const hasWorkout = completedWorkouts.some(w => isSameDay(new Date(w.date), day));
            return (
              <div 
                key={day.toISOString()} 
                className={clsx(
                  "aspect-square rounded-xl flex items-center justify-center text-sm font-medium relative group",
                  isToday(day) ? "bg-gray-800 text-white border border-gray-700" : "text-gray-400",
                  hasWorkout && "bg-emerald-500/10 text-emerald-500"
                )}
              >
                {format(day, 'd')}
                
                {hasWorkout && (
                  <div className="absolute bottom-2 flex gap-0.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
