import { useState, useEffect } from 'react';
import { BookMarked, User } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { Module, Lesson } from './lib/supabase';
import { LandingPage } from './components/LandingPage';
import { ModuleCard } from './components/ModuleCard';
import { LessonList } from './components/LessonList';
import { LessonContent } from './components/LessonContent';
import { CodeEditor, TestResult } from './components/CodeEditor';
import { useProgress } from './hooks/useProgress';
import { runTests } from './utils/codeRunner';

type View = 'landing' | 'modules' | 'lessons' | 'lesson';

function App() {
  const [view, setView] = useState<View>('landing');
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [userId] = useState('demo-user-123');

  const { progress, loading, markLessonComplete, isLessonComplete, getCompletedLessonIds } = useProgress(userId);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Error loading modules:', error);
      return;
    }

    setModules(data || []);
  };

  const loadLessons = async (moduleId: string) => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index');

    if (error) {
      console.error('Error loading lessons:', error);
      return;
    }

    setLessons(data || []);
  };

  const handleModuleClick = async (module: Module) => {
    setCurrentModule(module);
    await loadLessons(module.id);
    setView('lessons');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setCurrentCode(lesson.starter_code);
    setTestResults([]);
    setView('lesson');
  };

  const handleBackToModules = () => {
    setView('modules');
    setCurrentModule(null);
    setLessons([]);
  };

  const handleRunCode = async (code: string) => {
    if (!currentLesson) return;

    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const results = runTests(code, currentLesson.validation_tests);
    setTestResults(results);

    const allPassed = results.every(r => r.passed);
    if (allPassed && !isLessonComplete(currentLesson.id)) {
      await markLessonComplete(currentLesson.id, code);
    }

    setIsRunning(false);
  };

  const handleMarkComplete = async () => {
    if (!currentLesson) return;
    await markLessonComplete(currentLesson.id, currentCode);
  };

  const getLessonStats = (moduleId: string) => {
    const moduleLessons = lessons.filter(l => l.module_id === moduleId);
    const completed = moduleLessons.filter(l => isLessonComplete(l.id)).length;
    return { total: moduleLessons.length, completed };
  };

  if (loading && view !== 'landing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('modules')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setView('modules')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <BookMarked className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LearnFIL</h1>
              <p className="text-sm text-gray-600">Master Filecoin Development</p>
            </div>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Demo User</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {view === 'modules' && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome to LearnFIL
                </h2>
                <p className="text-lg text-gray-600">
                  Start your journey to becoming a Filecoin developer with interactive, hands-on lessons.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map(module => {
                  const completedCount = lessons.filter(l =>
                    l.module_id === module.id && isLessonComplete(l.id)
                  ).length;
                  const totalCount = lessons.filter(l => l.module_id === module.id).length;

                  return (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      lessonsCount={totalCount}
                      completedCount={completedCount}
                      onClick={() => handleModuleClick(module)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {view === 'lessons' && currentModule && (
          <div className="flex-1 flex overflow-hidden">
            <LessonList
              lessons={lessons}
              completedLessonIds={getCompletedLessonIds()}
              currentLessonId={currentLesson?.id || null}
              onLessonSelect={handleLessonSelect}
              onBack={handleBackToModules}
              moduleTitle={currentModule.title}
            />
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center max-w-md px-6">
                <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a lesson to begin
                </h3>
                <p className="text-gray-600">
                  Choose a lesson from the sidebar to start learning about {currentModule.title.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        )}

        {view === 'lesson' && currentLesson && currentModule && (
          <div className="flex-1 flex overflow-hidden">
            <LessonList
              lessons={lessons}
              completedLessonIds={getCompletedLessonIds()}
              currentLessonId={currentLesson.id}
              onLessonSelect={handleLessonSelect}
              onBack={handleBackToModules}
              moduleTitle={currentModule.title}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex overflow-hidden">
                <LessonContent
                  lesson={currentLesson}
                  isCompleted={isLessonComplete(currentLesson.id)}
                  onMarkComplete={handleMarkComplete}
                />
                {currentLesson.starter_code && (
                  <div className="w-1/2 border-l border-gray-200">
                    <CodeEditor
                      initialCode={currentLesson.starter_code}
                      onCodeChange={setCurrentCode}
                      onRun={handleRunCode}
                      testResults={testResults}
                      isRunning={isRunning}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
