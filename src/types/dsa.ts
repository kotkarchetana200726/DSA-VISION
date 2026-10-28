export type TopicId = 
  | 'arrays'
  | 'searching'
  | 'sorting'
  | 'linked-lists'
  | 'stacks'
  | 'queues'
  | 'trees'
  | 'heaps'
  | 'graphs'
  | 'hash-tables';

export interface VisualizerStep {
  id: number;
  description: string;
  codeLine: number;
  dataState: any;
  highlightedIndices?: number[];
  secondaryIndices?: number[];
  swappedIndices?: [number, number];
  visitedNodes?: (string | number)[];
  activeNode?: string | number | null;
  message?: string;
  counters?: {
    comparisons?: number;
    swaps?: number;
    accesses?: number;
    writes?: number;
    depth?: number;
  };
}

export interface TopicInfo {
  id: TopicId;
  name: string;
  icon: string;
  tagline: string;
  definition: string;
  realWorldApplications: string[];
  timeComplexity: {
    access?: string;
    search?: string;
    insertion?: string;
    deletion?: string;
    space?: string;
  };
  keyOperations: {
    name: string;
    description: string;
    averageTime: string;
    worstTime: string;
  }[];
  commonMistakes: string[];
  vivaQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface SortAlgorithmResult {
  name: string;
  comparisons: number;
  swaps: number;
  writes: number;
  measuredTimeMs: number;
  bestTime: string;
  averageTime: string;
  worstTime: string;
  spaceComplexity: string;
  isStable: boolean;
}
