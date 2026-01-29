'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Coins } from 'lucide-react';
import type { Quiz, QuizQuestion } from '@/lib/aiNutritionist';

interface QuizComponentProps {
    quiz: Quiz;
    onComplete: (passed: boolean, score: number) => void;
}

export default function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const handleSelectAnswer = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // 計算分數
            const correctCount = quiz.questions.filter((q, idx) =>
                selectedAnswers[idx] === q.correctAnswer
            ).length;
            setScore(correctCount);
            setShowResults(true);

            const passed = correctCount >= quiz.passingScore;
            onComplete(passed, correctCount);
        }
    };

    const question = quiz.questions[currentQuestion];
    const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

    if (showResults) {
        const passed = score >= quiz.passingScore;

        return (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-momsafe-purple/10">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">
                        {passed ? '🎉' : '💪'}
                    </div>
                    <h3 className="text-2xl font-bold text-momsafe-text mb-2">
                        {passed ? '恭喜通過測驗！' : '再接再厲！'}
                    </h3>
                    <p className="text-momsafe-text-light mb-6">
                        你答對了 {score} / {quiz.questions.length} 題
                    </p>

                    {passed && (
                        <div className="bg-momsafe-yellow/10 text-momsafe-text rounded-[2rem] p-6 mb-6 border border-momsafe-yellow/20">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Coins className="w-6 h-6 text-momsafe-yellow" />
                                <span className="text-2xl font-bold">+{quiz.reward} MomCoin</span>
                            </div>
                            <p className="text-sm opacity-90 font-medium">已發放至您的錢包！</p>
                        </div>
                    )}

                    {/* 顯示錯誤題目的解析 */}
                    {!passed && (
                        <div className="space-y-3 mt-6">
                            <h4 className="font-bold text-momsafe-text text-sm">📚 錯誤題目解析</h4>
                            {quiz.questions.map((q, idx) => {
                                if (selectedAnswers[idx] !== q.correctAnswer) {
                                    return (
                                        <div key={q.id} className="bg-momsafe-cream rounded-[1.5rem] p-4 text-left">
                                            <p className="text-sm font-bold text-momsafe-text mb-2">{q.question}</p>
                                            <p className="text-xs text-momsafe-green font-bold">✓ 正確答案：{q.options[q.correctAnswer]}</p>
                                            <p className="text-xs text-momsafe-text-light mt-1">{q.explanation}</p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-momsafe-blue/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-momsafe-blue/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-momsafe-text-light">
                        題目 {currentQuestion + 1} / {quiz.questions.length}
                    </span>
                    <div className="flex gap-1.5">
                        {quiz.questions.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentQuestion
                                    ? 'bg-momsafe-blue w-4'
                                    : selectedAnswers[idx] !== undefined
                                        ? 'bg-momsafe-green'
                                        : 'bg-gray-100'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-momsafe-blue rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <h3 className="text-xl font-bold text-momsafe-text mb-6 leading-relaxed">{question.question}</h3>

            <div className="space-y-3 mb-8">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        className={`w-full text-left px-5 py-4 rounded-[1.5rem] transition-all duration-300 group ${selectedAnswers[currentQuestion] === idx
                            ? 'bg-momsafe-blue/10 ring-2 ring-momsafe-blue ring-inset'
                            : 'bg-gray-50 hover:bg-momsafe-blue/5'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${selectedAnswers[currentQuestion] === idx
                                ? 'bg-momsafe-blue text-white'
                                : 'bg-gray-200 text-transparent group-hover:bg-momsafe-blue/20'
                                }`}>
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-medium transition-colors ${selectedAnswers[currentQuestion] === idx ? 'text-momsafe-text' : 'text-momsafe-text-light'}`}>
                                {option}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={handleNext}
                disabled={!hasAnswered}
                className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl ${hasAnswered
                    ? 'bg-momsafe-blue text-white hover:bg-momsafe-blue/90 transform hover:-translate-y-1 shadow-momsafe-blue/20'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                    }`}
            >
                {currentQuestion < quiz.questions.length - 1 ? '下一題' : '完成測驗'}
            </button>
        </div>
    );
}
