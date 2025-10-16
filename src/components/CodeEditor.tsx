import { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  onCodeChange: (code: string) => void;
  onRun: (code: string) => void;
  testResults?: TestResult[];
  isRunning?: boolean;
}

export interface TestResult {
  description: string;
  passed: boolean;
  error?: string;
}

export function CodeEditor({ initialCode, onCodeChange, onRun, testResults, isRunning }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange(initialCode);
  };

  const allTestsPassed = testResults && testResults.length > 0 && testResults.every(t => t.passed);

  return (
    <div className="flex flex-col h-full bg-white border-l-4 border-gray-900">
      <div className="flex items-center justify-between px-4 py-4 bg-cream-100 border-b-3 border-gray-900">
        <h3 className="text-sm font-bold text-gray-900">Code Sandbox</h3>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 bg-white hover:bg-cream-50 rounded-full border-2 border-gray-900 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={() => onRun(code)}
            disabled={isRunning}
            className="px-4 py-2 text-sm font-bold text-gray-900 bg-sunshine-400 hover:bg-sunshine-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-full border-2 border-gray-900 transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-cream-50">
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="w-full h-full p-4 bg-cream-50 text-gray-900 font-mono text-sm resize-none focus:outline-none border-2 border-transparent focus:border-gray-900 rounded-lg m-2"
          style={{
            tabSize: 2,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
          }}
          spellCheck={false}
        />
      </div>

      {testResults && testResults.length > 0 && (
        <div className="border-t-3 border-gray-900 bg-cream-100 p-4 max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-900">Test Results</h4>
            {allTestsPassed && (
              <span className="px-3 py-1 bg-teal-300 text-gray-900 text-xs font-bold rounded-full border-2 border-gray-900">
                All Tests Passed!
              </span>
            )}
          </div>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl border-3 ${
                  result.passed ? 'bg-teal-100 border-gray-900' : 'bg-blob-100 border-gray-900'
                }`}
              >
                <div className="flex items-start gap-2">
                  {result.passed ? (
                    <div className="w-6 h-6 rounded-full bg-teal-300 border-2 border-gray-900 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-gray-900" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blob-300 border-2 border-gray-900 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <XCircle className="w-4 h-4 text-gray-900" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {result.description}
                    </p>
                    {result.error && (
                      <p className="text-xs text-gray-800 mt-1 font-mono">{result.error}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
