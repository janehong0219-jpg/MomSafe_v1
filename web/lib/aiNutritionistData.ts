// AI 營養師推薦範例資料

import type { NutritionArticle, AIRecommendation, ProductRecommendation } from './aiNutritionist';

export const SAMPLE_PRODUCTS: ProductRecommendation[] = [
    {
        id: 'prod-001',
        productId: 'probiotic-baby-001',
        name: '嬰兒專用益生菌',
        category: 'probiotic',
        image: '/products/probiotic.jpg',
        description: '含 10 億活性益生菌，幫助腸道健康',
        nutritionistNote: '針對寶寶便秘，建議補充益生菌調整腸道菌叢。此款含有專利菌株，適合 0-3 歲寶寶。',
        price: 1280,
        momcoinPrice: 1000,
        isSample: true,
        sampleMomcoinPrice: 50,
        link: '/shop/probiotic-baby-001',
    },
    {
        id: 'prod-002',
        productId: 'formula-hydrolyzed-001',
        name: '水解蛋白配方奶粉',
        category: 'formula',
        image: '/products/formula.jpg',
        description: '水解技術，降低過敏風險',
        nutritionistNote: '如果寶寶有消化不良或過敏風險，水解配方能減少蛋白質分子大小，更易吸收。',
        price: 980,
        momcoinPrice: 800,
        isSample: true,
        sampleMomcoinPrice: 50,
        link: '/shop/formula-hydrolyzed-001',
    },
    {
        id: 'prod-003',
        productId: 'rice-cereal-organic-001',
        name: '有機米精',
        category: 'solid_food',
        image: '/products/rice-cereal.jpg',
        description: '100% 有機認證，寶寶第一口副食品',
        nutritionistNote: '4 個月以上寶寶可開始嘗試副食品。有機米精不含農藥殘留，是最安全的第一口選擇。',
        price: 450,
        momcoinPrice: 350,
        isSample: false,
        link: '/shop/rice-cereal-organic-001',
    },
];

export const SAMPLE_ARTICLE_CONSTIPATION: NutritionArticle = {
    id: 'article-001',
    title: '寶寶三天沒嗯嗯了嗎？',
    subtitle: '營養師教妳 3 招緩解腸絞痛與便秘',
    issueType: 'constipation',
    author: {
        name: '陳雅婷',
        title: '國家級營養師 / 母嬰營養專家',
        avatar: '/nutritionists/chen.jpg',
    },
    readTime: 5,
    tags: ['便秘', '益生菌', '腸道健康', '0-1歲'],
    summary: '當寶寶連續 3 天未排便，或便便乾硬時，可能是腸絞痛或便秘的徵兆。本文將告訴您如何透過飲食調整與益生菌補充來改善。',
    content: `
# 寶寶便秘的 3 大主因

## 1. 配方奶粉不適應
部分配方奶粉的蛋白質分子較大，寶寶腸道尚未發育完全時容易消化不良。

## 2. 水分攝取不足
尤其是喝配方奶的寶寶，需要額外補充水分。

## 3. 腸道菌叢失衡
腸道內好菌不足，導致蠕動變慢。

---

# 營養師的 3 招解決方案

### 第一招：順時針按摩肚子
每天 2-3 次，每次 5 分鐘，幫助腸道蠕動。

### 第二招：補充益生菌
選擇嬰兒專用益生菌，含有 Lactobacillus 和 Bifidobacterium 菌株。

### 第三招：適度補充水分
配方奶寶寶可在兩餐之間補充 30-50ml 溫開水。

---

# 什麼時候需要就醫？

如果出現以下狀況，請立即就醫：
- 連續 5 天以上未排便
- 便便帶血
- 寶寶腹部鼓脹且哭鬧不止
    `,
    quiz: {
        id: 'quiz-001',
        questions: [
            {
                id: 'q1',
                question: '益生菌應該在幾度以下保存？',
                options: ['10°C', '4°C', '0°C', '常溫即可'],
                correctAnswer: 1,
                explanation: '益生菌屬於活菌，需要在 4°C 以下冷藏保存，才能維持活性。',
            },
            {
                id: 'q2',
                question: '寶寶便秘時，以下哪種做法是錯的？',
                options: ['順時針按摩肚子', '減少奶量', '補充益生菌', '適度補水'],
                correctAnswer: 1,
                explanation: '減少奶量會導致營養不足，正確做法是維持奶量並調整配方或補充益生菌。',
            },
            {
                id: 'q3',
                question: '配方奶寶寶每次可補充多少水分？',
                options: ['10-20ml', '30-50ml', '100ml', '不需要額外補水'],
                correctAnswer: 1,
                explanation: '配方奶寶寶建議在兩餐之間補充 30-50ml 溫開水。',
            },
        ],
        passingScore: 3,
        reward: 10,
    },
    recommendedProducts: SAMPLE_PRODUCTS.filter(p =>
        p.category === 'probiotic' || p.category === 'formula'
    ),
    momcoinReward: 10,
    publishedAt: new Date('2026-01-15'),
};

export const SAMPLE_ARTICLE_GROWTH: NutritionArticle = {
    id: 'article-002',
    title: '寶寶吃得多卻不長肉？',
    subtitle: '營養師分析 3 大吸收地雷',
    issueType: 'growth_lag',
    author: {
        name: '陳雅婷',
        title: '國家級營養師 / 母嬰營養專家',
    },
    readTime: 6,
    tags: ['生長曲線', '營養吸收', '配方奶', '6-12個月'],
    summary: '當寶寶體重百分位持續下降，可能是營養吸收出了問題。本文將分析常見的吸收障礙原因。',
    content: `...`,
    quiz: {
        id: 'quiz-002',
        questions: [],
        passingScore: 2,
        reward: 10,
    },
    recommendedProducts: SAMPLE_PRODUCTS.filter(p => p.category === 'formula'),
    momcoinReward: 10,
    publishedAt: new Date('2026-01-20'),
};

export const SAMPLE_RECOMMENDATION: AIRecommendation = {
    id: 'rec-001',
    userId: 'user-1',
    trigger: {
        id: 'trigger-001',
        issueType: 'constipation',
        triggerConditions: {
            daysWithoutPoop: 3,
            poopType: 'hard',
        },
        detectedAt: new Date(),
        severity: 'medium',
    },
    article: SAMPLE_ARTICLE_CONSTIPATION,
    pushTitle: '🔔 AI 營養師提醒',
    pushMessage: '寶寶三天沒嗯嗯了嗎？營養師教妳 3 招緩解腸絞痛與便秘。',
    priority: 'important',
    read: false,
    actionTaken: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天後過期
};
