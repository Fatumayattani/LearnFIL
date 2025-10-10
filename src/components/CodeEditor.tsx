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
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-white">Code Sandbox</h3>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={() => onRun(code)}
            disabled={isRunning}
            className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
          style={{
            tabSize: 2,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
          }}
          spellCheck={false}
        />
      </div>

      {testResults && testResults.length > 0 && (
        <div className="border-t border-gray-700 bg-gray-800 p-4 max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white">Test Results</h4>
            {allTestsPassed && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded">
                All Tests Passed!
              </span>
            )}
          </div>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${
                  result.passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  {result.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${result.passed ? 'text-green-300' : 'text-red-300'}`}>
                      {result.description}
                    </p>
                    {result.error && (
                      <p className="text-xs text-red-300 mt-1 font-mono">{result.error}</p>
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
