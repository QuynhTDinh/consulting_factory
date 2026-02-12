/**
 * Output Schemas
 * Defines the structure of the Finished Products (Lessons, Articles).
 */

import { Context } from './input';

export interface Lesson {
    id: string;
    title: string;
    learning_objective: string; // What the student will be able to do after this
    target_audience: string; // Who is this for?

    // The Core Content Flow
    content: {
        hook: string; // The "Pain" or "Myth" to grab attention
        concept: string; // The Framework/Theory explaining why the Myth is wrong
        example: string; // A "Victory" story illustrating the concept
        actionable_step: string; // Concrete step to practice tomorrow
    };

    quiz: {
        question: string;
        options: string[];
        correct_answer: number; // Index of correct option
        explanation: string; // Why this answer is correct (referencing the Framework)
    }[];

    metadata: {
        generated_by: string; // Which Agent version?
        based_on_scars: string[]; // IDs of Scars used as input
        review_status: 'Draft' | 'Approved' | 'Rejected';
    };
}
