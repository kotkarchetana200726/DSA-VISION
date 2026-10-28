import { TopicId } from './dsa';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type SupportedLanguage = 'cpp' | 'python' | 'javascript';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isSample: boolean; // if true, visible in problem description
  explanation?: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  topic: TopicId;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  sampleCases: TestCase[];
  hiddenTestCases: TestCase[];
  starterCode: Record<SupportedLanguage, string>;
  solutionCode?: Record<SupportedLanguage, string>;
  hints: string[];
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTimeMs: number;
  errorMessage?: string;
  isSample: boolean;
}

export interface SubmissionResult {
  questionId: string;
  passed: boolean;
  totalTests: number;
  passedTests: number;
  testResults: TestResult[];
  totalTimeMs: number;
  submittedAt: string;
  language: SupportedLanguage;
  code: string;
  compileError?: string;
}
