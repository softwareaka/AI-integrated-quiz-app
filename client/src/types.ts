export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  correctExplanation: string;
  incorrectExplanations: Record<string, string>;
}

export interface QuizPayload {
  questions: QuizQuestion[];
}

export type AppView = "home" | "quiz" | "results";
