import { CheckCircle2, ChevronLeft } from 'lucide-react';
import type { Lesson } from '../lib/supabase';

interface LessonListProps {
  lessons: Lesson[];
  completedLessonIds: Set<string>;
  currentLessonId: string | null;
  onLessonSelect: (lesson: Lesson) => void;
  onBack: () => void;
  moduleTitle: string;
}

export function LessonList({
  lessons,
  completedLessonIds,
  currentLessonId,
  onLessonSelect,
  onBack,
  moduleTitle
}: LessonListProps) {
  return (
    <div className="w-80 bg-white border-r-4 border-gray-900 flex flex-col">
      <div className="p-5 border-b-3 border-gray-900 bg-cream-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-3 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back to Modules</span>
        </button>
        <h2 className="text-xl font-bold text-gray-900">{moduleTitle}</h2>
        <div className="mt-2 inline-block bg-sunshine-300 px-3 py-1 rounded-full border-2 border-gray-900">
          <p className="text-sm text-gray-900 font-bold">
            {completedLessonIds.size} of {lessons.length} completed
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-cream-50">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.has(lesson.id);
          const isCurrent = lesson.id === currentLessonId;

          return (
            <button
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className={`w-full p-4 text-left border-b-2 border-gray-200 hover:bg-cream-100 transition-colors ${
                isCurrent ? 'bg-sunshine-200 border-l-4 border-l-gray-900' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-teal-300 border-2 border-gray-900 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-gray-900" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-600 bg-cream-200 px-2 py-0.5 rounded-full">
                      Lesson {index + 1}
                    </span>
                  </div>
                  <h3 className={`font-bold ${isCurrent ? 'text-gray-900' : 'text-gray-800'}`}>
                    {lesson.title}
                  </h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
