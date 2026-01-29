// AI 營養師推薦系統資料結構

export type HealthIssueType =
    | 'constipation'      // 便秘
    | 'growth_lag'        // 生長曲線滯後
    | 'starting_solids'   // 副食品啟蒙
    | 'lactose_intolerance' // 乳糖不耐
    | 'sleep_regression'  // 睡眠倒退
    | 'teething';         // 長牙不適

export interface DiaryTrigger {
    id: string;
    issueType: HealthIssueType;
    triggerConditions: {
        daysWithoutPoop?: number;        // 未排便天數
        poopType?: string;                // 便便類型（布里斯托分類）
        weightPercentileDrop?: number;    // 體重百分位下降
        ageInMonths?: number;             // 月齡
        milestoneReached?: string;        // 達到的里程碑
    };
    detectedAt: Date;
    severity: 'low' | 'medium' | 'high';
}

export interface NutritionArticle {
    id: string;
    title: string;
    subtitle: string;
    issueType: HealthIssueType;
    author: {
        name: string;
        title: string;
        avatar?: string;
    };
    readTime: number; // 分鐘
    tags: string[];
    summary: string;
    content: string; // Markdown 格式
    quiz: Quiz;
    recommendedProducts: ProductRecommendation[];
    momcoinReward: number;
    publishedAt: Date;
}

export interface Quiz {
    id: string;
    questions: QuizQuestion[];
    passingScore: number; // 需答對題數
    reward: number; // MomCoin 獎勵
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // 正確答案的索引 (0-based)
    explanation: string;
}

export interface ProductRecommendation {
    id: string;
    productId: string;
    name: string;
    category: 'probiotic' | 'formula' | 'solid_food' | 'supplement' | 'utensil';
    image: string;
    description: string;
    nutritionistNote: string; // 營養師專業建議
    price: number;
    momcoinPrice?: number; // MomCoin 兌換價格
    isSample: boolean; // 是否為試用包
    sampleMomcoinPrice?: number; // 試用包 MomCoin 價格
    link: string;
}

export interface AIRecommendation {
    id: string;
    userId: string;
    trigger: DiaryTrigger;
    article: NutritionArticle;
    pushTitle: string;
    pushMessage: string;
    priority: 'urgent' | 'important' | 'suggestion';
    read: boolean;
    actionTaken: boolean; // 是否已採取行動（閱讀/購買）
    createdAt: Date;
    expiresAt: Date;
}

export interface PrivacySettings {
    userId: string;
    aiAnalysisEnabled: boolean;
    dataCollectionConsent: boolean;
    nutritionistRecommendationEnabled: boolean;
    productRecommendationEnabled: boolean;
    pushNotificationEnabled: boolean;
    lastUpdated: Date;
}
