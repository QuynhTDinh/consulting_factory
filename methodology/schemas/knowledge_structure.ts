/**
 * Meta-Schema for Consulting Knowledge
 * Defines the atomic structure of a Framework.
 */

// A "Concept" is a specific term or idea (e.g., "Functional Job", "Pain Point")
export interface Concept {
    id: string;
    name: string;
    definition: string; // The standard definition
    misconceptions: string[]; // Common wrong understandings (Anti-patterns)
    examples: string[]; // Positive examples
    counter_examples?: string[]; // Negative examples (What is NOT this concept)
}

// A "Principle" is a rule of nature or a guideline (e.g., "Customers buy holes, not drills")
export interface Principle {
    id: string;
    statement: string; // The rule itself
    explanation: string; // Why this rule exists
    application: string; // How to apply this rule in practice
}

// A "Test Case" to verify if an Agent understands the concept
export interface QuizQuestion {
    question: string;
    scenario?: string; // Optional context/story
    options: string[];
    correct_index: number;
    explanation: string; // Why the answer is correct (referencing a Concept or Principle)
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

// A "Framework Module" is a collection of concepts and principles about a specific topic
export interface FrameworkModule {
    id: string;
    title: string; // e.g., "JTBD Analysis", "Insight vs Need"
    domain: 'Customer_Understanding' | 'Strategy' | 'Execution';
    level: 'Fundamental' | 'Advanced' | 'Expert';

    description: string;

    concepts: Concept[];
    principles: Principle[];

    // Assessment to prove mastery
    assessment: QuizQuestion[];
}
