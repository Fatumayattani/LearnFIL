import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import type { Module } from '../lib/supabase';

interface ModuleCardProps {
  module: Module;
  lessonsCount: number;
  completedCount: number;
  onClick: () => void;
}

export function ModuleCard({ module, lessonsCount, completedCount, onClick }: ModuleCardProps) {
  const isCompleted = lessonsCount > 0 && completedCount === lessonsCount;
  const progress = lessonsCount > 0 ? (completedCount / lessonsCount) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6 text-left border border-gray-200 hover:border-orange-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{module.estimated_minutes} min</span>
            </div>
          </div>
        </div>
        {isCompleted && (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{module.description}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{completedCount} of {lessonsCount} lessons</span>
          <span className="font-medium text-orange-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </button>
  );
}
