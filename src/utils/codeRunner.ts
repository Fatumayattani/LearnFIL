import type { ValidationTest } from '../lib/supabase';
import type { TestResult } from '../components/CodeEditor';

export function runTests(code: string, tests: ValidationTest[]): TestResult[] {
  const results: TestResult[] = [];

  for (const test of tests) {
    try {
      const testFunction = new Function('code', test.test);
      const passed = testFunction(code);

      results.push({
        description: test.description,
        passed: Boolean(passed)
      });
    } catch (error) {
      results.push({
        description: test.description,
        passed: false,
        error: error instanceof Error ? error.message : 'Test failed'
      });
    }
  }

  return results;
}
