import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { QuizItem } from '../types';

interface QuestionCardProps {
    question: QuizItem;
    selectedAnswer: number | null;
    onSelect: (index: number) => void;
    isSubmitted: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    selectedAnswer,
    onSelect,
    isSubmitted,
}) => {
    const isCorrect = selectedAnswer === question.correctAnswer;

    return (
        <div className="animate-fade-in w-full max-w-2xl mx-auto">
            {/* Question Context (Image/Text) if available */}
            {question.context && (
                <div className="mb-6 rounded-xl overflow-hidden border border-gray-200">
                    {question.context.image && (
                        <img
                            src={question.context.image}
                            alt="Context"
                            className="w-full h-48 object-cover"
                        />
                    )}
                    {question.context.text && (
                        <div className="p-4 bg-gray-50 text-sm italic text-gray-600 border-t border-gray-100">
                            {question.context.text}
                        </div>
                    )}
                </div>
            )}

            {/* Question Text */}
            <h3 className="text-xl font-medium text-gray-900 mb-6 leading-relaxed">
                {question.question}
            </h3>

            {/* Options Grid */}
            <div className="grid gap-3">
                {question.options.map((option, idx) => {
                    let stateClass = "border-gray-200 hover:border-gray-300 hover:bg-gray-50";

                    if (isSubmitted) {
                        if (idx === question.correctAnswer) {
                            stateClass = "border-green-500 bg-green-50 text-green-700 font-medium";
                        } else if (idx === selectedAnswer) {
                            stateClass = "border-red-500 bg-red-50 text-red-700";
                        } else {
                            stateClass = "border-gray-200 opacity-50";
                        }
                    } else if (selectedAnswer === idx) {
                        stateClass = "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-600";
                    }

                    return (
                        <button
                            key={idx}
                            disabled={isSubmitted}
                            onClick={() => onSelect(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${stateClass}`}
                        >
                            <span className="flex-1">{option}</span>
                            {isSubmitted && idx === question.correctAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {isSubmitted && idx === selectedAnswer && idx !== question.correctAnswer && (
                                <XCircle className="w-5 h-5 text-red-600" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Explanation Feedback */}
            {isSubmitted && (
                <div className={`mt-6 p-5 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'} animate-fade-in`}>
                    <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {isCorrect ? 'Correct Analysis' : 'Incorrect Analysis'}
                    </div>
                    <p className="text-gray-800 leading-relaxed">
                        {question.explanation}
                    </p>
                </div>
            )}
        </div>
    );
};
