import { UserProgress } from '../types/progress';
import { SubmissionResult } from '../types/coding';
import { QuizAttempt } from '../types/quiz';
import { TopicId } from '../types/dsa';

const STORAGE_KEY = 'dsa_vision_user_progress_v1';

const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

const initialProgress: UserProgress = {
  solvedQuestionIds: [],
  attemptedQuestionIds: [],
  submissions: {},
  quizAttempts: [],
  completedTopicModules: [],
  bookmarkedQuestionIds: [],
  notes: {},
  streak: {
    current: 1,
    longest: 1,
    lastActiveDate: getTodayDateString(),
  },
  customCodeDrafts: {},
};

export const getStoredProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgress(initialProgress);
      return initialProgress;
    }
    const parsed = JSON.parse(raw);
    return { ...initialProgress, ...parsed };
  } catch (e) {
    console.error('Error reading progress from storage:', e);
    return initialProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('dsa_vision_progress_updated'));
  } catch (e) {
    console.error('Error saving progress to storage:', e);
  }
};

export const recordSubmission = (result: SubmissionResult): void => {
  const current = getStoredProgress();
  const qId = result.questionId;
  
  if (!current.attemptedQuestionIds.includes(qId)) {
    current.attemptedQuestionIds.push(qId);
  }

  if (result.passed && !current.solvedQuestionIds.includes(qId)) {
    current.solvedQuestionIds.push(qId);
  }

  if (!current.submissions[qId]) {
    current.submissions[qId] = [];
  }
  current.submissions[qId].unshift(result);

  // Update streak
  updateStreak(current);
  saveProgress(current);
};

export const recordQuizAttempt = (attempt: QuizAttempt): void => {
  const current = getStoredProgress();
  current.quizAttempts.unshift(attempt);
  updateStreak(current);
  saveProgress(current);
};

export const toggleTopicCompleted = (topicId: TopicId): boolean => {
  const current = getStoredProgress();
  const index = current.completedTopicModules.indexOf(topicId);
  let isNowCompleted = false;
  if (index >= 0) {
    current.completedTopicModules.splice(index, 1);
  } else {
    current.completedTopicModules.push(topicId);
    isNowCompleted = true;
  }
  updateStreak(current);
  saveProgress(current);
  return isNowCompleted;
};

export const toggleBookmarkQuestion = (questionId: string): boolean => {
  const current = getStoredProgress();
  const index = current.bookmarkedQuestionIds.indexOf(questionId);
  let isBookmarked = false;
  if (index >= 0) {
    current.bookmarkedQuestionIds.splice(index, 1);
  } else {
    current.bookmarkedQuestionIds.push(questionId);
    isBookmarked = true;
  }
  saveProgress(current);
  return isBookmarked;
};

export const saveQuestionDraft = (questionId: string, lang: string, code: string): void => {
  const current = getStoredProgress();
  if (!current.customCodeDrafts[questionId]) {
    current.customCodeDrafts[questionId] = {};
  }
  current.customCodeDrafts[questionId][lang] = code;
  saveProgress(current);
};

export const saveUserNote = (id: string, note: string): void => {
  const current = getStoredProgress();
  current.notes[id] = note;
  saveProgress(current);
};

const updateStreak = (current: UserProgress): void => {
  const today = getTodayDateString();
  const lastActive = current.streak.lastActiveDate;

  if (today === lastActive) {
    return; // Already recorded today
  }

  const lastDate = new Date(lastActive);
  const nowDate = new Date(today);
  const diffDays = Math.round((nowDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 1) {
    current.streak.current += 1;
    if (current.streak.current > current.streak.longest) {
      current.streak.longest = current.streak.current;
    }
  } else if (diffDays > 1) {
    current.streak.current = 1;
  }

  current.streak.lastActiveDate = today;
};
