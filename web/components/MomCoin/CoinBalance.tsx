'use client';

import { TrendingUp, AlertCircle, Gift } from 'lucide-react';
import { LEVEL_CONFIG } from '@/lib/rewards';
import type { MomCoinBalance } from '@/lib/momcoin';

interface CoinBalanceProps {
    balance: MomCoinBalance;
    onQuickAction: (action: 'earn' | 'shop' | 'history') => void;
}

export default function CoinBalance({ balance, onQuickAction }: CoinBalanceProps) {
    const levelConfig = LEVEL_CONFIG[balance.level];

    // 計算即將過期的總額
    const expiringTotal = balance.expiringCoins.reduce((sum, coin) => sum + coin.amount, 0);
    const hasExpiringSoon = expiringTotal > 0;

    return (
        <div className="space-y-4">
            {/* 餘額卡片 */}
            <div className={`bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 rounded-3xl p-6 border-2 border-yellow-200 shadow-lg`}>
                {/* 餘額顯示 */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-3xl">💰</span>
                            <span className="text-sm font-medium text-gray-600">MomCoin 餘額</span>
                        </div>
                        <div className="text-5xl font-bold text-amber-600">
                            {balance.balance}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            累計賺取 {balance.totalEarned} · 已使用 {balance.totalBurned}
                        </div>
                    </div>

                    {/* 等級徽章 */}
                    <div className={`bg-gradient-to-br ${levelConfig.gradient} px-4 py-2 rounded-2xl border-2 border-white shadow-md`}>
                        <div className="text-2xl text-center mb-1">{levelConfig.emoji}</div>
                        <div className="text-xs font-bold text-center whitespace-nowrap">{levelConfig.name}</div>
                    </div>
                </div>

                {/* 升級進度條 */}
                {balance.level !== 'guardian' && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600">升級進度</span>
                            <span className="text-xs text-gray-500">{Math.round(balance.levelProgress)}%</span>
                        </div>
                        <div className="w-full bg-white/60 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${balance.levelProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            還需 {balance.level === 'rookie' ? 10 - balance.verificationCount : 30 - balance.verificationCount} 次驗證升級
                        </p>
                    </div>
                )}

                {/* 快速入口 */}
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => onQuickAction('earn')}
                        className="bg-white/80 hover:bg-white rounded-xl p-3 transition-all hover:scale-105 group"
                    >
                        <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-gray-700">賺取任務</div>
                    </button>

                    <button
                        onClick={() => onQuickAction('shop')}
                        className="bg-white/80 hover:bg-white rounded-xl p-3 transition-all hover:scale-105 group"
                    >
                        <Gift className="w-5 h-5 text-pink-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-gray-700">兌換商店</div>
                    </button>

                    <button
                        onClick={() => onQuickAction('history')}
                        className="bg-white/80 hover:bg-white rounded-xl p-3 transition-all hover:scale-105 group"
                    >
                        <div className="text-lg mx-auto mb-1">📜</div>
                        <div className="text-xs font-bold text-gray-700">交易紀錄</div>
                    </button>
                </div>
            </div>

            {/* 過期警示 */}
            {hasExpiringSoon && (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-orange-900 text-sm">⏰ 即將過期提醒</p>
                            <p className="text-xs text-orange-700 mt-1">
                                {expiringTotal} MomCoin 將在 {new Date(balance.expiringCoins[0].expiryDate).toLocaleDateString('zh-TW')} 過期
                            </p>
                            <button
                                onClick={() => onQuickAction('shop')}
                                className="mt-2 text-xs font-bold text-orange-700 underline"
                            >
                                立即使用 →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
