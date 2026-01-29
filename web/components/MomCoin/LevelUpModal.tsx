'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Share2, X } from 'lucide-react';
import { LEVEL_CONFIG } from '@/lib/rewards';
import type { UserLevel } from '@/lib/momcoin';

interface LevelUpModalProps {
    oldLevel: UserLevel;
    newLevel: UserLevel;
    onClose: () => void;
}

export default function LevelUpModal({ oldLevel, newLevel, onClose }: LevelUpModalProps) {
    const [showFireworks, setShowFireworks] = useState(true);
    const newLevelConfig = LEVEL_CONFIG[newLevel];

    useEffect(() => {
        // 3秒後關閉煙火特效
        const timer = setTimeout(() => setShowFireworks(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleShare = () => {
        // 未來可整合分享功能
        alert('分享功能開發中！即將可以分享到社群 🎉');
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
            {/* 煙火效果 */}
            {showFireworks && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-firework"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        >
                            {['🎆', '✨', '🎉', '⭐', '💫'][Math.floor(Math.random() * 5)]}
                        </div>
                    ))}
                </div>
            )}

            {/* 主卡片 */}
            <div
                className="bg-white rounded-3xl p-8 max-w-md w-full relative animate-scaleIn shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 關閉按鈕 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                    <X className="w-4 h-4 text-gray-600" />
                </button>

                {/* 標題 */}
                <div className="text-center mb-6">
                    <div className="text-5xl mb-3 animate-bounce">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">恭喜升級！</h2>
                    <p className="text-sm text-gray-500">您的努力獲得了回報</p>
                </div>

                {/* 等級變化 */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    {/* 舊等級 */}
                    <div className="text-center opacity-50">
                        <div className={`bg-gradient-to-br ${LEVEL_CONFIG[oldLevel].gradient} px-6 py-3 rounded-2xl border-2 border-gray-200`}>
                            <div className="text-3xl mb-1">{LEVEL_CONFIG[oldLevel].emoji}</div>
                            <div className="text-xs font-bold text-gray-600">{LEVEL_CONFIG[oldLevel].name}</div>
                        </div>
                    </div>

                    {/* 箭頭 */}
                    <div className="text-3xl">→</div>

                    {/* 新等級 */}
                    <div className="text-center animate-pulse">
                        <div className={`bg-gradient-to-br ${newLevelConfig.gradient} px-6 py-3 rounded-2xl border-2 border-white shadow-lg`}>
                            <div className="text-5xl mb-1">{newLevelConfig.emoji}</div>
                            <div className="text-xs font-bold">{newLevelConfig.name}</div>
                        </div>
                    </div>
                </div>

                {/* 解鎖權益 */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-purple-900 text-sm">解鎖新權益</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <p className="text-xs text-purple-800">
                                每日登入獎勵：+{newLevelConfig.dailyLoginBonus} MomCoin
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <p className="text-xs text-purple-800">
                                評論權重：{newLevelConfig.reviewWeight}x（影響力更高）
                            </p>
                        </div>
                        {newLevel === 'guardian' && (
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                <p className="text-xs text-purple-800">
                                    專屬守護女神徽章 👑
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 按鈕區 */}
                <div className="flex gap-3">
                    <button
                        onClick={handleShare}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                        <Share2 className="w-4 h-4" />
                        分享成就
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm hover:shadow-lg transition-all hover:scale-105"
                    >
                        繼續努力
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { 
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes firework {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(0);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(-100px) scale(1.5);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-200px) scale(0.5);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.5s ease-out;
                }
                .animate-firework {
                    animation: firework 2s ease-out forwards;
                    font-size: 2rem;
                }
            `}</style>
        </div>
    );
}
