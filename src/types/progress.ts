import { TopicId } from './dsa';
import { SubmissionResult } from './coding';
import { QuizAttempt } from './quiz';

export interface UserProgress {
  solvedQuestionIds: string[];
  attemptedQuestionIds: string[];
  submissions: Record<string, SubmissionResult[]>; // questionId -> submissions
  quizAttempts: QuizAttempt[];
  completedTopicModules: TopicId[];
  bookmarkedQuestionIds: string[];
  notes: Record<string, string>; // topic or question ID -> student note
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;
  };
  customCodeDrafts: Record<string, Record<string, string>>; // questionId -> { [lang]: code }
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
