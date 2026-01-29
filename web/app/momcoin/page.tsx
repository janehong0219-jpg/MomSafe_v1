'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, ShoppingBag, Trophy } from 'lucide-react';
import CoinBalance from '@/components/MomCoin/CoinBalance';
import TaskList from '@/components/MomCoin/TaskList';
import RewardShop from '@/components/MomCoin/RewardShop';
import TransactionHistory from '@/components/MomCoin/TransactionHistory';
import LevelUpModal from '@/components/MomCoin/LevelUpModal';
import BadgeWall from '@/components/MomCoin/BadgeWall';
import LeaderboardCard from '@/components/MomCoin/LeaderboardCard';
import { SAMPLE_BALANCE, SAMPLE_TASKS, SAMPLE_PRODUCTS, SAMPLE_TRANSACTIONS } from '@/lib/momcoinData';
import { SAMPLE_LEADERBOARD } from '@/lib/leaderboardData';
import { calculateUserLevel, checkBadgeUnlock } from '@/lib/rewards';
import type { MomCoinBalance, Transaction, UserLevel } from '@/lib/momcoin';

export default function MomCoinPage() {
    const router = useRouter();
    const [balance, setBalance] = useState<MomCoinBalance>(SAMPLE_BALANCE);
    const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
    const [tasks, setTasks] = useState(SAMPLE_TASKS);
    const [activeTab, setActiveTab] = useState<'tasks' | 'shop' | 'history' | 'badges' | 'leaderboard'>('tasks');
    const [showLevelUpModal, setShowLevelUpModal] = useState(false);
    const [levelUpData, setLevelUpData] = useState<{ old: UserLevel; new: UserLevel } | null>(null);

    const handleQuickAction = (action: 'earn' | 'shop' | 'history') => {
        if (action === 'earn') {
            setActiveTab('tasks');
        } else if (action === 'shop') {
            setActiveTab('shop');
        } else {
            setActiveTab('history');
        }
    };

    const handleCompleteTask = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const oldLevel = balance.level;
        const newVerificationCount = task.category === 'lbs' ? balance.verificationCount + 1 : balance.verificationCount;
        const newDisputeReportCount = task.category === 'dispute' ? balance.disputeReportCount + 1 : balance.disputeReportCount;
        const newLevel = calculateUserLevel(newVerificationCount, newDisputeReportCount);

        // 檢查升級
        const didLevelUp = oldLevel !== newLevel;

        // 檢查新徽章
        const newBadges = checkBadgeUnlock(
            balance.balance + task.reward,
            newVerificationCount,
            newDisputeReportCount,
            0, // reviewCount - 可從 transactions 計算
            balance.totalEarned + task.reward,
            balance.badges
        );

        const newBalance = balance.balance + task.reward;
        const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            userId: balance.userId,
            type: task.type,
            amount: task.reward,
            balance: newBalance,
            description: task.title,
            metadata: task.location ? { locationName: task.location.name } : {},
            timestamp: new Date(),
        };

        setBalance({
            ...balance,
            balance: newBalance,
            totalEarned: balance.totalEarned + task.reward,
            verificationCount: newVerificationCount,
            disputeReportCount: newDisputeReportCount,
            level: newLevel,
            badges: [...balance.badges, ...newBadges],
        });

        setTransactions([newTransaction, ...transactions]);
        setTasks(tasks.filter(t => t.id !== taskId));

        // 顯示升級動畫
        if (didLevelUp) {
            setLevelUpData({ old: oldLevel, new: newLevel });
            setShowLevelUpModal(true);
        } else {
            alert(`✨ 任務完成！獲得 +${task.reward} MomCoin`);
        }

        // 顯示新徽章提示
        if (newBadges.length > 0) {
            setTimeout(() => {
                alert(`🏆 恭喜解鎖新徽章！\n${newBadges.map(b => `• ${b}`).join('\n')}`);
            }, didLevelUp ? 2000 : 500);
        }
    };

    const handleRedeem = (productId: string) => {
        const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
        if (!product || balance.balance < product.price) return;

        if (confirm(`確定要兌換「${product.name}」嗎？\n將扣除 ${product.price} MomCoin`)) {
            const newBalance = balance.balance - product.price;
            const newTransaction: Transaction = {
                id: `tx-${Date.now()}`,
                userId: balance.userId,
                type: 'burn_product_redeem',
                amount: -product.price,
                balance: newBalance,
                description: `兌換「${product.name}」`,
                metadata: { productName: product.name, productId: product.id },
                timestamp: new Date(),
            };

            setBalance({
                ...balance,
                balance: newBalance,
                totalBurned: balance.totalBurned + product.price,
            });

            setTransactions([newTransaction, ...transactions]);
            alert(`🎉 兌換成功！\n「${product.name}」已發放至您的帳戶`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-b from-amber-100 to-orange-100 px-6 pt-12 pb-8 rounded-b-[3rem]">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700 tracking-wide">MomCoin 媽咪幣</h1>
                        <p className="text-gray-500 text-sm mt-1 font-light">信任貨幣・賺越多省越多</p>
                    </div>
                    <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-2xl">💰</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 -mt-6 space-y-4">
                {/* 餘額卡片 */}
                <CoinBalance balance={balance} onQuickAction={handleQuickAction} />

                {/* Tab 切換 */}
                <div className="flex gap-1 bg-white rounded-2xl p-1 border border-gray-100 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'tasks'
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        賺取
                    </button>
                    <button
                        onClick={() => setActiveTab('shop')}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'shop'
                                ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <ShoppingBag className="w-3 h-3 inline mr-1" />
                        兌換
                    </button>
                    <button
                        onClick={() => setActiveTab('badges')}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'badges'
                                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <Trophy className="w-3 h-3 inline mr-1" />
                        徽章
                    </button>
                    <button
                        onClick={() => setActiveTab('leaderboard')}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'leaderboard'
                                ? 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        🏆 排行
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeTab === 'history'
                                ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        📜 紀錄
                    </button>
                </div>

                {/* 內容區域 */}
                <div className="pb-4">
                    {activeTab === 'tasks' && (
                        <div>
                            <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">🎯 可用任務</h2>
                            <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} />
                        </div>
                    )}

                    {activeTab === 'shop' && (
                        <div>
                            <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">🛍️ 兌換商店</h2>
                            <RewardShop
                                products={SAMPLE_PRODUCTS}
                                currentBalance={balance.balance}
                                onRedeem={handleRedeem}
                            />
                        </div>
                    )}

                    {activeTab === 'badges' && (
                        <div>
                            <BadgeWall unlockedBadges={balance.badges} />
                        </div>
                    )}

                    {activeTab === 'leaderboard' && (
                        <div>
                            <LeaderboardCard
                                entries={SAMPLE_LEADERBOARD}
                                region="台中市西屯區"
                                currentUserId={balance.userId}
                            />
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">📜 交易記錄</h2>
                            <TransactionHistory transactions={transactions} />
                        </div>
                    )}
                </div>
            </div>

            {/* 升級彈窗 */}
            {showLevelUpModal && levelUpData && (
                <LevelUpModal
                    oldLevel={levelUpData.old}
                    newLevel={levelUpData.new}
                    onClose={() => setShowLevelUpModal(false)}
                />
            )}
        </div>
    );
}
