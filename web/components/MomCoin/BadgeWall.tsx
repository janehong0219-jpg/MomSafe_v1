'use client';

import { BADGES } from '@/lib/rewards';
import type { Badge } from '@/lib/rewards';

interface BadgeWallProps {
    unlockedBadges: string[];
}

export default function BadgeWall({ unlockedBadges }: BadgeWallProps) {
    const allBadges = Object.values(BADGES);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-gray-700">🏆 成就徽章</h3>
                <span className="text-xs text-gray-500">
                    {unlockedBadges.length} / {allBadges.length}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {allBadges.map((badge) => {
                    const isUnlocked = unlockedBadges.includes(badge.id);

                    return (
                        <div
                            key={badge.id}
                            className={`rounded-2xl p-4 border-2 transition-all ${isUnlocked
                                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg'
                                    : 'bg-gray-50 border-gray-200 opacity-50'
                                }`}
                        >
                            <div className="text-center">
                                {/* 徽章圖標 */}
                                <div className={`text-4xl mb-2 ${isUnlocked ? 'animate-bounce' : 'grayscale'}`}>
                                    {badge.emoji}
                                </div>

                                {/* 徽章名稱 */}
                                <h4 className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-gray-800' : 'text-gray-400'
                                    }`}>
                                    {badge.name}
                                </h4>

                                {/* 徽章描述 */}
                                <p className={`text-xs mb-2 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'
                                    }`}>
                                    {badge.description}
                                </p>

                                {/* 條件 */}
                                <div className={`text-[10px] px-2 py-1 rounded-full inline-block ${isUnlocked
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {isUnlocked ? '✓ 已解鎖' : badge.condition}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 提示區 */}
            {unlockedBadges.length < allBadges.length && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                    <p className="text-xs text-blue-700 text-center">
                        💡 繼續完成任務，解鎖更多成就徽章！
                    </p>
                </div>
            )}
        </div>
    );
}
