import React, { useState } from 'react';
import { X, ArrowRight, Play, Trophy } from 'lucide-react';
import { QuizItem } from '../types';
import { QuestionCard } from './QuestionCard';

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    questions: QuizItem[];
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, title, questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showResult, setShowResult] = useState(false);

    if (!isOpen) return null;

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    const handleSelectAnswer = (index: number) => {
        if (isSubmitted) return;
        const newAnswers = [...selectedAnswers];
        newAnswers[currentIndex] = index;
        setSelectedAnswers(newAnswers);
    };

    const handleSubmitAnswer = () => {
        setIsSubmitted(true);
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowResult(true);
        } else {
            setCurrentIndex(prev => prev + 1);
            setIsSubmitted(false);
        }
    };

    // Calculate Score
    const correctCount = selectedAnswers.reduce((acc, ans, idx) => {
        return ans === questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    if (showResult) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
                <div className="bg-white w-full max-w-lg rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                        <Trophy className="w-10 h-10 text-yellow-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                    <p className="text-gray-500 mb-8">You showed great understanding of the customer psychology.</p>

                    <div className="flex justify-center items-center gap-4 mb-8">
                        <div className="text-center p-4 bg-gray-50 rounded-2xl w-32">
                            <div className="text-3xl font-bold text-indigo-600">{correctCount}/{questions.length}</div>
                            <div className="text-xs uppercase tracking-wide text-gray-400 font-bold mt-1">Score</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl w-32">
                            <div className="text-3xl font-bold text-green-600">{Math.round((correctCount / questions.length) * 100)}%</div>
                            <div className="text-xs uppercase tracking-wide text-gray-400 font-bold mt-1">Accuracy</div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-6 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                setShowResult(false);
                                setCurrentIndex(0);
                                setSelectedAnswers(new Array(questions.length).fill(null));
                                setIsSubmitted(false);
                            }}
                            className="flex-1 py-3 px-6 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Retry Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-fade-in">
            {/* Header */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white relative">
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="absolute left-1/2 transform -translate-x-1/2 font-medium text-gray-600">
                    {title}
                </div>

                <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Q{currentIndex + 1}/{questions.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-100">
                <div
                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto py-12 px-4 bg-gray-50/30">
                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswers[currentIndex]}
                    onSelect={handleSelectAnswer}
                    isSubmitted={isSubmitted}
                />
            </div>

            {/* Footer Controls */}
            <div className="h-24 bg-white border-t border-gray-100 flex items-center justify-center px-8 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
                <div className="w-full max-w-2xl flex justify-between items-center">
                    <button
                        disabled={currentIndex === 0}
                        onClick={() => {
                            setCurrentIndex(prev => prev - 1);
                            setIsSubmitted(true); // Assuming going back shows state
                        }}
                        className={`text-sm font-medium transition-colors ${currentIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Previous
                    </button>

                    {!isSubmitted ? (
                        <button
                            disabled={selectedAnswers[currentIndex] === null}
                            onClick={handleSubmitAnswer}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-black shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
                        >
                            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
