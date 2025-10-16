import { Trophy, Star, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Lesson } from '../lib/supabase';

interface CelebrationPageProps {
  lesson: Lesson;
  moduleTitle: string;
  completedCount: number;
  totalCount: number;
  hasNextLesson: boolean;
  onContinue: () => void;
  onNextLesson?: () => void;
}

export function CelebrationPage({
  lesson,
  moduleTitle,
  completedCount,
  totalCount,
  hasNextLesson,
  onContinue,
  onNextLesson
}: CelebrationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine-300 via-teal-200 to-blob-200 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-sunshine-400 rounded-full border-4 border-gray-900 animate-bounce"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-teal-300 rotate-45 border-4 border-gray-900"></div>
      <div className="absolute bottom-20 left-32 w-24 h-24 bg-blob-300 rounded-full border-4 border-gray-900"></div>
      <div className="absolute bottom-32 right-10 w-12 h-12 bg-sunshine-300 rotate-12 border-3 border-gray-900"></div>

      <div className="absolute top-1/4 left-1/4 animate-pulse">
        <Star className="w-8 h-8 text-sunshine-500 fill-sunshine-400" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-pulse delay-100">
        <Sparkles className="w-6 h-6 text-teal-500" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-pulse delay-200">
        <Star className="w-6 h-6 text-blob-400 fill-blob-300" />
      </div>

      <div className="max-w-2xl w-full bg-white rounded-3xl border-4 border-gray-900 shadow-brutal p-8 md:p-12 relative z-10 animate-scale-in">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-sunshine-400 rounded-full border-4 border-gray-900 mb-6 animate-bounce-slow">
            <Trophy className="w-14 h-14 text-gray-900" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lesson Complete!
          </h1>

          <div className="mb-6">
            <div className="inline-block bg-teal-200 px-4 py-2 rounded-full border-3 border-gray-900 mb-3">
              <p className="text-sm font-bold text-gray-900">{moduleTitle}</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h2>
            <p className="text-lg text-gray-700 font-semibold">
              Outstanding work! You've mastered this lesson.
            </p>
          </div>

          <div className="bg-cream-100 rounded-2xl border-3 border-gray-900 p-6 mb-8">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-teal-600" />
                  <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
                </div>
                <p className="text-sm text-gray-700 font-semibold">of {totalCount} Completed</p>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-sunshine-600" />
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round((completedCount / totalCount) * 100)}%
                  </p>
                </div>
                <p className="text-sm text-gray-700 font-semibold">Module Progress</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasNextLesson && onNextLesson ? (
              <>
                <button
                  onClick={onNextLesson}
                  className="px-8 py-4 bg-sunshine-400 hover:bg-sunshine-500 text-gray-900 font-bold rounded-full border-4 border-gray-900 transition-all hover:translate-y-[-2px] hover:shadow-brutal flex items-center justify-center gap-2"
                >
                  Next Lesson
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onContinue}
                  className="px-8 py-4 bg-white hover:bg-cream-100 text-gray-900 font-bold rounded-full border-4 border-gray-900 transition-all hover:translate-y-[-2px] hover:shadow-brutal"
                >
                  Back to Lessons
                </button>
              </>
            ) : (
              <button
                onClick={onContinue}
                className="px-8 py-4 bg-sunshine-400 hover:bg-sunshine-500 text-gray-900 font-bold rounded-full border-4 border-gray-900 transition-all hover:translate-y-[-2px] hover:shadow-brutal flex items-center justify-center gap-2"
              >
                Back to Lessons
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
