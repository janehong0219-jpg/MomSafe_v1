'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, X, Clock, TrendingUp } from 'lucide-react';
import type { AIRecommendation } from '@/lib/aiNutritionist';

interface AIPushNotificationProps {
    recommendation: AIRecommendation;
    onDismiss: () => void;
    onRead: () => void;
}

export default function AIPushNotification({ recommendation, onDismiss, onRead }: AIPushNotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
    };

    const handleRead = () => {
        onRead();
    };

    const getPriorityColor = () => {
        switch (recommendation.priority) {
            case 'urgent':
                return 'from-red-400 to-orange-500';
            case 'important':
                return 'from-purple-400 to-pink-500';
            default:
                return 'from-blue-400 to-cyan-500';
        }
    };

    const getPriorityIcon = () => {
        switch (recommendation.trigger.severity) {
            case 'high':
                return '🚨';
            case 'medium':
                return '💡';
            default:
                return '📌';
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40 animate-slideIn">
            <div className={`bg-gradient-to-r ${getPriorityColor()} rounded-2xl shadow-2xl p-1`}>
                <div className="bg-white rounded-xl p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-lg">{getPriorityIcon()}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-800">{recommendation.pushTitle}</h4>
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                    <Clock className="w-3 h-3" />
                                    閱讀約 {recommendation.article.readTime} 分鐘
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Message */}
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        {recommendation.pushMessage}
                    </p>

                    {/* Rewards Badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <span className="text-sm">💰</span>
                            <span className="text-xs font-bold text-amber-700">
                                閱讀完成可獲得 {recommendation.article.momcoinReward} MomCoin
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Link
                            href={`/knowledge/nutrition/${recommendation.article.id}`}
                            onClick={handleRead}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm text-center transition-all transform hover:scale-105"
                        >
                            立即閱讀
                        </Link>
                        <button
                            onClick={handleDismiss}
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-colors"
                        >
                            稍後
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
