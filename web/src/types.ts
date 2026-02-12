
export type QuizType = 'single-choice' | 'multi-choice' | 'true-false';

export interface QuizItem {
    id: string;
    type: QuizType;
    question: string;
    options: string[]; // For true-false, use ["True", "False"] or localized equivalent
    correctAnswer: number | number[]; // index or array of indices
    explanation: string;
    context?: {
        image?: string;
        text?: string;
    };
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface CaseStudy {
    id: string;
    title: string;
    input: string;
    analysis: {
        factGuard: {
            status: string;
            facts: string[];
        };
        inputClassification?: {
            data: string[];
            doing: string[];
            interpretation: string[];
        };
        contextGame?: {
            gameName: string;
            unwrittenRules: string[];
            winCriteria: string;
        };
        empathyMap?: {
            see: string;
            hear: string;
            say_and_do: string;
            think_and_feel: string;
            pain: string;
            gain: string;
        };
        decoder: {
            jobs: {
                functional: string;
                emotional: string;
                social: string;
            };
            tension: string;
            insight: {
                context: string;
                doing: string;
                tension: string;
                truth: string;
            };
        };
        builder: {
            microLesson: {
                concept: string;
                source: string;
                misconception: string;
                example: string;
            };
            quizzes: QuizItem[]; // Updated from single object to array
            script: Array<{ role: string; text: string }>;
        };
    };
}
