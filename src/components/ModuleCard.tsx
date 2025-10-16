import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import type { Module } from '../lib/supabase';

interface ModuleCardProps {
  module: Module;
  lessonsCount: number;
  completedCount: number;
  onClick: () => void;
}

const iconColors = [
  'bg-sunshine-400',
  'bg-teal-300',
  'bg-blob-300',
  'bg-sky-300',
  'bg-sunshine-300',
];

export function ModuleCard({ module, lessonsCount, completedCount, onClick }: ModuleCardProps) {
  const isCompleted = lessonsCount > 0 && completedCount === lessonsCount;
  const progress = lessonsCount > 0 ? (completedCount / lessonsCount) * 100 : 0;
  const colorIndex = parseInt(module.id.slice(-1), 16) % iconColors.length;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-3xl p-6 text-left border-4 border-gray-900 hover:translate-y-[-4px] transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-full ${iconColors[colorIndex]} border-3 border-gray-900 flex items-center justify-center flex-shrink-0`}>
            <BookOpen className="w-7 h-7 text-gray-900" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-700 font-semibold">{module.estimated_minutes} min</span>
            </div>
          </div>
        </div>
        {isCompleted && (
          <div className="w-8 h-8 rounded-full bg-teal-300 border-3 border-gray-900 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-gray-900" />
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">{module.description}</p>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 font-semibold">{completedCount} of {lessonsCount} lessons</span>
          <span className="font-bold text-gray-900">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-cream-300 rounded-full h-3 overflow-hidden border-2 border-gray-900">
          <div
            className="h-full bg-sunshine-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </button>
  );
}
