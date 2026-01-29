'use client';

import { Crown, MapPin } from 'lucide-react';

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    userName: string;
    avatar?: string;
    verificationCount: number;
    isCurrentUser?: boolean;
    isLocalGuardian?: boolean;
}

interface LeaderboardCardProps {
    entries: LeaderboardEntry[];
    region: string;
    currentUserId: string;
}

export default function LeaderboardCard({ entries, region, currentUserId }: LeaderboardCardProps) {
    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return 'from-yellow-100 to-amber-200 border-yellow-300';
            case 2:
                return 'from-gray-100 to-slate-200 border-gray-300';
            case 3:
                return 'from-orange-100 to-amber-200 border-orange-300';
            default:
                return 'from-white to-gray-50 border-gray-200';
        }
    };

    const getRankEmoji = (rank: number) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return `${rank}`;
        }
    };

    return (
        <div className="space-y-4">
            {/* 標題 */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-gray-700">{region} 排行榜</h3>
                </div>
                <span className="text-xs text-gray-500">本週更新</span>
            </div>

            {/* 排行榜列表 */}
            <div className="space-y-2">
                {entries.map((entry) => {
                    const isCurrentUser = entry.userId === currentUserId;
                    const isTop3 = entry.rank <= 3;

                    return (
                        <div
                            key={entry.userId}
                            className={`bg-gradient-to-r ${getRankColor(entry.rank)} rounded-2xl p-4 border-2 transition-all ${isCurrentUser ? 'ring-2 ring-purple-400 ring-offset-2' : ''
                                } ${isTop3 ? 'hover:shadow-lg' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                {/* 排名 */}
                                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                    {entry.rank <= 3 ? (
                                        <span className="text-3xl">{getRankEmoji(entry.rank)}</span>
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-gray-600">{entry.rank}</span>
                                        </div>
                                    )}
                                </div>

                                {/* 頭像 */}
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                                    {entry.avatar ? (
                                        <img src={entry.avatar} alt={entry.userName} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <span className="text-xl">👤</span>
                                    )}
                                </div>

                                {/* 用戶資訊 */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-bold text-sm truncate ${isCurrentUser ? 'text-purple-900' : 'text-gray-800'
                                            }`}>
                                            {entry.userName}
                                            {isCurrentUser && <span className="ml-1 text-purple-600">（我）</span>}
                                        </h4>
                                        {entry.isLocalGuardian && (
                                            <div className="flex items-center gap-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                                                <Crown className="w-3 h-3" />
                                                <span>守護官</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        驗證 {entry.verificationCount} 次
                                    </p>
                                </div>

                                {/* Top 1 特別標記 */}
                                {entry.rank === 1 && (
                                    <div className="text-3xl animate-bounce">👑</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 守護官說明 */}
            {entries.some(e => e.isLocalGuardian) && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                    <div className="flex items-start gap-3">
                        <Crown className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-purple-900 text-sm mb-1">地區守護官</p>
                            <p className="text-xs text-purple-700">
                                本區域驗證第一名，在地圖介面上將顯示您的貢獻！
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
