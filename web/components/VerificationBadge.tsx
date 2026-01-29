'use client';

import { Shield, Award, Star } from 'lucide-react';
import type { ShieldLevel, VerificationBadge } from '@/lib/caregiverData';

interface VerificationBadgeProps {
    level: ShieldLevel;
    badges: VerificationBadge[];
    testScore?: number;
    certValidUntil?: string;
    compact?: boolean;
}

export default function VerificationBadgeComponent({
    level,
    badges,
    testScore,
    certValidUntil,
    compact = false
}: VerificationBadgeProps) {
    const isGold = level === 'gold';

    if (compact) {
        return (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm shadow-md ${isGold
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900'
                    : 'bg-gradient-to-r from-purple-400 to-indigo-500 text-indigo-900'
                }`}>
                <Shield className="w-4 h-4" />
                <span>{isGold ? '金盾認證' : '銀盾認證'}</span>
            </div>
        );
    }

    return (
        <div className={`relative rounded-2xl p-6 border-2 ${isGold
                ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-300'
                : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-indigo-300'
            }`}>
            {/* 標題 */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${isGold ? 'bg-amber-100' : 'bg-indigo-100'
                    }`}>
                    <Shield className={`w-6 h-6 ${isGold ? 'text-amber-600' : 'text-indigo-600'
                        }`} />
                </div>
                <div>
                    <h3 className={`font-bold text-lg ${isGold ? 'text-amber-900' : 'text-indigo-900'
                        }`}>
                        {isGold ? '🟡 專業保母認證' : '🔵 陪玩夥伴認證'}
                    </h3>
                    <p className={`text-sm ${isGold ? 'text-amber-700' : 'text-indigo-700'
                        }`}>
                        {isGold ? '可執行全日托育與專業照護' : '限陪伴玩耍，不執行醫療行為'}
                    </p>
                </div>
            </div>

            {/* 認證項目列表 */}
            <div className="space-y-2 mb-4">
                {badges.map((badge) => (
                    <div
                        key={badge.id}
                        className="flex items-center gap-2 text-sm"
                    >
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-gray-700">{badge.name}</span>
                    </div>
                ))}
            </div>

            {/* 銀盾專屬：測驗成績 */}
            {!isGold && testScore && (
                <div className="bg-white rounded-xl p-4 border border-indigo-200 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-indigo-600" />
                        <span className="font-bold text-indigo-900">MomSafe 安全測驗</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-indigo-600">{testScore}</span>
                        <span className="text-gray-500">分通過</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 space-y-1">
                        <div>✓ 紅線安全意識</div>
                        <div>✓ 情緒安撫技巧</div>
                        <div>✓ 服務邊界認知</div>
                        <div>✓ 平台操作規範</div>
                    </div>
                </div>
            )}

            {/* 證書有效期 */}
            {certValidUntil && (
                <div className="text-xs text-gray-500 border-t border-gray-200 pt-3">
                    證書有效期至：{certValidUntil}
                    <span className="text-orange-600 ml-2">（6個月需複測）</span>
                </div>
            )}
        </div>
    );
}
