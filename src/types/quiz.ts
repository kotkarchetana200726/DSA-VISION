import { TopicId } from './dsa';

export type QuestionType = 'mcq' | 'viva' | 'dry-run';

export interface QuizQuestion {
  id: string;
  topic: TopicId;
  type: QuestionType;
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctOptionIndex?: number;
  answerExplanation: string;
  vivaAnswer?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizAttempt {
  id: string;
  topic: TopicId;
  timestamp: string;
  totalQuestions: number;
  score: number;
  percentage: number;
}
