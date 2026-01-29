// MomCoin 信任貨幣系統 - 核心資料結構

// MomCoin 交易類型
export type TransactionType =
    | 'earn_lbs_verification'      // LBS 基礎驗證 +5
    | 'earn_dispute_report'        // 糾紛排雷 +50
    | 'earn_review'                // 真實交易評論 +20-100
    | 'earn_community_answer'      // 新手村導師 +10
    | 'earn_daily_login'           // 每日登入 +2-10（等級加成）
    | 'burn_childcare_discount'    // 折抵臨托費用
    | 'burn_product_redeem'        // 兌換商品
    | 'burn_vip_feature'           // 解鎖特權功能
    | 'penalty_false_report';      // 不實回報扣款 -雙倍

// 用戶等級
export type UserLevel = 'rookie' | 'explorer' | 'guardian';

// 任務狀態
export type TaskStatus = 'available' | 'in_progress' | 'completed' | 'expired';

// 任務類別
export type TaskCategory = 'lbs' | 'dispute' | 'review' | 'community';

// 即將過期的 Coin
export interface ExpiringCoin {
    amount: number;
    expiryDate: Date;             // 6 個月有效期
}

// 用戶 MomCoin 餘額
export interface MomCoinBalance {
    userId: string;
    balance: number;              // 當前餘額
    totalEarned: number;          // 累計賺取
    totalBurned: number;          // 累計消費
    level: UserLevel;             // 當前等級
    levelProgress: number;        // 升級進度 0-100
    badges: string[];             // 徽章列表
    expiringCoins: ExpiringCoin[]; // 即將過期的 Coin
    verificationCount: number;    // 驗證次數
    disputeReportCount: number;   // 糾紛報告次數
    lastLoginDate?: Date;         // 最後登入日期
}

// MomCoin 交易記錄
export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;
    amount: number;               // 正數為賺取，負數為消費
    balance: number;              // 交易後餘額
    description: string;
    metadata?: {
        taskId?: string;
        locationId?: string;
        productId?: string;
        [key: string]: any;
    };
    timestamp: Date;
}

// 任務定義
export interface Task {
    id: string;
    type: TransactionType;
    category: TaskCategory;
    title: string;
    description: string;
    reward: number;               // MomCoin 獎勵
    location?: {
        name: string;
        address: string;
        lat: number;
        lng: number;
        distance?: number;        // 距離（公尺）
    };
    status: TaskStatus;
    expiresAt?: Date;
    metadata?: any;
    completedAt?: Date;
}

// 兌換商品
export interface RewardProduct {
    id: string;
    category: 'childcare' | 'product' | 'vip';
    name: string;
    description: string;
    imageUrl?: string;
    price: number;                // 所需 MomCoin
    stock?: number;               // 庫存（-1 表示無限）
    validDays?: number;           // 有效天數（VIP 功能用）
    metadata?: {
        discountAmount?: number;  // 折抵金額
        productCode?: string;
        featureCode?: string;
    };
}

// 用戶兌換記錄
export interface RedemptionRecord {
    id: string;
    userId: string;
    productId: string;
    productName: string;
    coinSpent: number;
    timestamp: Date;
    status: 'pending' | 'completed' | 'expired';
    expiresAt?: Date;
    usedAt?: Date;
}
