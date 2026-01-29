'use client';

import { useState } from 'react';
import { Clock, Tag, BookOpen, Award } from 'lucide-react';
import QuizComponent from '@/components/AI/QuizComponent';
import ProductRecommendationCard from '@/components/AI/ProductRecommendationCard';
import { SAMPLE_ARTICLE_CONSTIPATION } from '@/lib/aiNutritionistData';

export default function NutritionistArticlePage() {
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [earnedCoins, setEarnedCoins] = useState(0);
    const article = SAMPLE_ARTICLE_CONSTIPATION;

    const handleQuizComplete = (passed: boolean, score: number) => {
        if (passed) {
            setEarnedCoins(article.quiz.reward);
            setQuizCompleted(true);
        }
    };

    const handleRedeemSample = (productId: string) => {
        alert(`兌換試用包：${productId}`);
    };

    const handleAddToCart = (productId: string) => {
        alert(`已加入補給清單：${productId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-b from-purple-100 to-pink-100 px-6 pt-12 pb-8 rounded-b-[3rem]">
                <div className="max-w-3xl mx-auto">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👩‍⚕️</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{article.author.name}</h3>
                            <p className="text-xs text-gray-600">{article.author.title}</p>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{article.title}</h1>
                    <p className="text-lg text-gray-600 mb-4">{article.subtitle}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime} 分鐘閱讀</span>
                        </div>
                        {article.tags.map((tag, idx) => (
                            <div key={idx} className="bg-purple-200/70 px-3 py-1 rounded-full text-xs text-purple-700 font-medium">
                                #{tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 -mt-6 space-y-6">
                {/* MomCoin Reward Banner */}
                {!quizCompleted && (
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Award className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm">完成測驗即可獲得獎勵</h3>
                                <p className="text-xs opacity-90">閱讀文章後，通過隨堂小考可獲得 {article.momcoinReward} MomCoin</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Article Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        文章摘要
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{article.summary}</p>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-2xl p-6 shadow-lg prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }} />
                </div>

                {/* Nutritionist Product Recommendations */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 px-2">
                        <span className="text-2xl">👩‍⚕️</span>
                        營養師推薦補給清單
                    </h3>
                    <p className="text-sm text-gray-600 px-2">
                        根據寶寶便秘問題，營養師為您精選以下產品：
                    </p>
                    {article.recommendedProducts.map((product) => (
                        <ProductRecommendationCard
                            key={product.id}
                            product={product}
                            onRedeemSample={handleRedeemSample}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                {/* Quiz Section */}
                <div className="space-y-3">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 px-2">
                        <span className="text-2xl">🎯</span>
                        隨堂小考 - 測試您的理解
                    </h3>
                    <p className="text-sm text-gray-600 px-2">
                        完成以下 {article.quiz.questions.length} 題測驗，答對 {article.quiz.passingScore} 題即可獲得 {article.quiz.reward} MomCoin！
                    </p>
                    <QuizComponent
                        quiz={article.quiz}
                        onComplete={handleQuizComplete}
                    />
                </div>

                {/* Trust Badge */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">🛡️</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1">MomSafe 專業保證</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                本文由國家級營養師撰寫，所有建議皆基於最新醫學研究。推薦產品皆經過嚴格審核，確保品質與安全。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
