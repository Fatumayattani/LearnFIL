import { BookOpen, Trophy } from 'lucide-react';
import type { Lesson } from '../lib/supabase';

interface LessonContentProps {
  lesson: Lesson;
  isCompleted: boolean;
  onMarkComplete?: () => void;
}

export function LessonContent({ lesson, isCompleted, onMarkComplete }: LessonContentProps) {
  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-6">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mb-3 mt-5">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-900 mb-2 mt-4">{line.slice(4)}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-gray-900 mb-2">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 mb-1 ml-4">
            {line.slice(2)}
          </li>
        );
      }
      if (line.startsWith('`') && line.endsWith('`')) {
        return (
          <code key={index} className="block bg-gray-100 p-3 rounded-md font-mono text-sm text-gray-800 my-2">
            {line.slice(1, -1)}
          </code>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }
      return <p key={index} className="text-gray-700 mb-3 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-3xl mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          </div>
        </div>

        {isCompleted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <Trophy className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Lesson Completed!</p>
              <p className="text-sm text-green-700">Great work! You've finished this lesson.</p>
            </div>
          </div>
        )}

        <div className="prose prose-gray max-w-none">
          {formatContent(lesson.content)}
        </div>

        {!isCompleted && onMarkComplete && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onMarkComplete}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Mark as Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
