import { CheckCircle2, Circle, ChevronLeft } from 'lucide-react';
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
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Modules</span>
        </button>
        <h2 className="text-xl font-bold text-gray-900">{moduleTitle}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {completedLessonIds.size} of {lessons.length} completed
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.has(lesson.id);
          const isCurrent = lesson.id === currentLessonId;

          return (
            <button
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                isCurrent ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      Lesson {index + 1}
                    </span>
                  </div>
                  <h3 className={`font-medium ${isCurrent ? 'text-orange-700' : 'text-gray-900'}`}>
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
