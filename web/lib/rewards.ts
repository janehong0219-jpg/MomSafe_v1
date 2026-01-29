// MomCoin 獎勵與等級配置

import type { UserLevel, TransactionType } from './momcoin';

// 等級配置
export const LEVEL_CONFIG: Record<UserLevel, {
    name: string;
    emoji: string;
    requiredVerifications: number;
    requiredDisputeReports?: number;
    dailyLoginBonus: number;
    reviewWeight: number;
    color: string;
    gradient: string;
}> = {
    rookie: {
        name: '實習媽咪',
        emoji: '🌱',
        requiredVerifications: 0,
        dailyLoginBonus: 2,
        reviewWeight: 1.0,
        color: '#A7F3D0',
        gradient: 'from-green-200 to-emerald-200',
    },
    explorer: {
        name: '探險隊長',
        emoji: '⭐',
        requiredVerifications: 10,
        dailyLoginBonus: 5,
        reviewWeight: 1.5,
        color: '#FCD34D',
        gradient: 'from-yellow-200 to-amber-300',
    },
    guardian: {
        name: '守護女神',
        emoji: '👑',
        requiredVerifications: 30,
        requiredDisputeReports: 3,
        dailyLoginBonus: 10,
        reviewWeight: 2.0,
        color: '#F472B6',
        gradient: 'from-pink-300 to-rose-400',
    },
};

// 獎勵金額配置
export const REWARD_AMOUNTS: Record<string, number> = {
    lbs_verification: 5,
    dispute_report: 50,
    review_basic: 20,
    review_detailed: 50,
    review_with_photo: 100,
    community_answer_helpful: 10,
    community_answer_best: 30,
};

// 徽章系統
export interface Badge {
    id: string;
    name: string;
    emoji: string;
    description: string;
    condition: string;
}

export const BADGES: Record<string, Badge> = {
    first_verification: {
        id: 'first_verification',
        name: '初次驗證',
        emoji: '🎯',
        description: '完成第一個店家驗證',
        condition: '完成 1 次驗證',
    },
    dispute_slayer: {
        id: 'dispute_slayer',
        name: 'The Donut Slayer',
        emoji: '🍩⚔️',
        description: '成功通報 3 個爭議店家',
        condition: '通報 3 個糾紛',
    },
    local_guardian: {
        id: 'local_guardian',
        name: '地區守護官',
        emoji: '🛡️',
        description: '成為該區域驗證第一名',
        condition: '區域排名第一',
    },
    trusted_reviewer: {
        id: 'trusted_reviewer',
        name: '信任評論家',
        emoji: '✍️',
        description: '撰寫 10 篇詳細評論',
        condition: '撰寫 10 篇評論',
    },
    daily_warrior: {
        id: 'daily_warrior',
        name: '每日勇者',
        emoji: '📅',
        description: '連續登入 7 天',
        condition: '連續 7 天登入',
    },
    coin_collector: {
        id: 'coin_collector',
        name: '幣值收藏家',
        emoji: '💰',
        description: '累計賺取 1000 MomCoin',
        condition: '累計 1000 Coin',
    },
};

// 計算用戶等級
export function calculateUserLevel(verificationCount: number, disputeReportCount: number): UserLevel {
    if (
        verificationCount >= LEVEL_CONFIG.guardian.requiredVerifications &&
        disputeReportCount >= (LEVEL_CONFIG.guardian.requiredDisputeReports || 0)
    ) {
        return 'guardian';
    }

    if (verificationCount >= LEVEL_CONFIG.explorer.requiredVerifications) {
        return 'explorer';
    }

    return 'rookie';
}

// 計算升級進度（0-100）
export function calculateLevelProgress(verificationCount: number, disputeReportCount: number, currentLevel: UserLevel): number {
    if (currentLevel === 'guardian') {
        return 100; // 已達最高等級
    }

    const nextLevel: UserLevel = currentLevel === 'rookie' ? 'explorer' : 'guardian';
    const currentRequired = LEVEL_CONFIG[currentLevel].requiredVerifications;
    const nextRequired = LEVEL_CONFIG[nextLevel].requiredVerifications;

    const progress = ((verificationCount - currentRequired) / (nextRequired - currentRequired)) * 100;
    return Math.min(100, Math.max(0, progress));
}

// 檢查是否解鎖新徽章
export function checkBadgeUnlock(
    balance: number,
    verificationCount: number,
    disputeReportCount: number,
    reviewCount: number,
    totalEarned: number,
    currentBadges: string[]
): string[] {
    const newBadges: string[] = [];

    // 初次驗證
    if (verificationCount >= 1 && !currentBadges.includes('first_verification')) {
        newBadges.push('first_verification');
    }

    // The Donut Slayer
    if (disputeReportCount >= 3 && !currentBadges.includes('dispute_slayer')) {
        newBadges.push('dispute_slayer');
    }

    // 信任評論家
    if (reviewCount >= 10 && !currentBadges.includes('trusted_reviewer')) {
        newBadges.push('trusted_reviewer');
    }

    // 幣值收藏家
    if (totalEarned >= 1000 && !currentBadges.includes('coin_collector')) {
        newBadges.push('coin_collector');
    }

    return newBadges;
}

// 獲取交易描述文字
export function getTransactionDescription(type: TransactionType, metadata?: any): string {
    switch (type) {
        case 'earn_lbs_verification':
            return metadata?.locationName
                ? `驗證「${metadata.locationName}」友善設施`
                : '完成店家驗證';
        case 'earn_dispute_report':
            return metadata?.locationName
                ? `通報「${metadata.locationName}」爭議問題`
                : '完成糾紛排雷';
        case 'earn_review':
            return '撰寫真實交易評論';
        case 'earn_community_answer':
            return '回答社群問題';
        case 'earn_daily_login':
            return '每日登入獎勵';
        case 'burn_childcare_discount':
            return '兌換臨托費用折抵';
        case 'burn_product_redeem':
            return metadata?.productName
                ? `兌換「${metadata.productName}」`
                : '兌換商品';
        case 'burn_vip_feature':
            return metadata?.featureName
                ? `解鎖「${metadata.featureName}」VIP 功能`
                : '解鎖 VIP 功能';
        case 'penalty_false_report':
            return '不實回報扣款';
        default:
            return 'MomCoin 交易';
    }
}
