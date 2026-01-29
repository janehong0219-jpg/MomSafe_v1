// 托育媒合資料結構與範例資料

export type ShieldLevel = 'gold' | 'silver';

export interface VerificationBadge {
    id: string;
    name: string;
    icon: string;
    description: string;
    level: ShieldLevel;
}

export interface Caregiver {
    id: string;
    name: string;
    avatar: string;
    type: 'nanny' | 'playmate';
    shieldLevel: ShieldLevel;
    location: string;
    rating: number;
    reviewCount: number;
    serviceCount: number;
    tags: string[];

    // 認證資訊
    verifications: VerificationBadge[];
    certifiedDate: string;
    certValidUntil?: string;

    // 金盾專屬（保母）
    experience?: number; // 年資
    license?: string; // 證照編號
    insurance?: boolean;
    canDoFullCare?: boolean;

    // 銀盾專屬（陪玩夥伴）
    school?: string;
    testScore?: number; // MomSafe 測驗分數
    minHours?: number; // 最短預約時數

    // 服務資訊
    availableDays: string[];
    specialNeeds: boolean;
    price: {
        min: number;
        max: number;
        unit: 'month' | 'hour';
    };

    // 評價標籤統計
    positiveTagsStats: { tag: string; percentage: number }[];

    description: string;
}

// 認證徽章定義
export const GOLD_BADGES: VerificationBadge[] = [
    { id: 'identity', name: '身份已驗證', icon: '✓', description: '真實身份確認', level: 'gold' },
    { id: 'license', name: '托育登記證查核', icon: '📜', description: '專業托育證照', level: 'gold' },
    { id: 'background', name: '良民證通過', icon: '🛡️', description: '無犯罪紀錄', level: 'gold' },
    { id: 'health', name: '健康檢查合格', icon: '💊', description: '健康狀況良好', level: 'gold' },
    { id: 'insurance', name: '保險齊全', icon: '🏥', description: '勞健保完整', level: 'gold' },
];

export const SILVER_BADGES: VerificationBadge[] = [
    { id: 'identity', name: '身份已驗證', icon: '✓', description: '學生證/身分證確認', level: 'silver' },
    { id: 'background', name: '良民證通過', icon: '🛡️', description: '無犯罪紀錄', level: 'silver' },
    { id: 'test', name: 'MomSafe 安全測驗', icon: '📝', description: '通過平台安全測驗', level: 'silver' },
    { id: 'firstaid', name: '基礎急救知識', icon: '🚑', description: '基本急救處理', level: 'silver' },
];

// 範例資料 - 金盾保母
export const SAMPLE_NANNIES: Caregiver[] = [
    {
        id: 'nanny-1',
        name: '王小華',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
        type: 'nanny',
        shieldLevel: 'gold',
        location: '台中市西屯區',
        rating: 4.9,
        reviewCount: 48,
        serviceCount: 156,
        tags: ['溫柔耐心', '英文共讀', '蒙特梭利'],
        verifications: GOLD_BADGES,
        certifiedDate: '2023-03-15',
        experience: 7,
        license: '中市保登字第1234號',
        insurance: true,
        canDoFullCare: true,
        availableDays: ['週一', '週二', '週三', '週四', '週五'],
        specialNeeds: true,
        price: { min: 26000, max: 30000, unit: 'month' },
        positiveTagsStats: [
            { tag: '不滑手機', percentage: 96 },
            { tag: '會主動洗手', percentage: 100 },
            { tag: '情緒穩定', percentage: 98 },
        ],
        description: '擁有7年專業托育經驗，持有保母技術士證及托育登記證。專精0-3歲嬰幼兒照護，熟悉蒙特梭利教學法，可提供英文共讀。重視衛生習慣，細心照料每位寶寶。',
    },
    {
        id: 'nanny-2',
        name: '林美玲',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lin',
        type: 'nanny',
        shieldLevel: 'gold',
        location: '台中市北區',
        rating: 4.7,
        reviewCount: 32,
        serviceCount: 89,
        tags: ['CPR 證照', '音樂啟蒙', '副食品達人'],
        verifications: GOLD_BADGES,
        certifiedDate: '2024-01-20',
        experience: 3,
        license: '中市保登字第5678號',
        insurance: true,
        canDoFullCare: true,
        availableDays: ['週一', '週二', '週三', '週四', '週五', '週六'],
        specialNeeds: false,
        price: { min: 24000, max: 28000, unit: 'month' },
        positiveTagsStats: [
            { tag: '守時準時', percentage: 94 },
            { tag: '副食品好吃', percentage: 100 },
            { tag: '孩子很喜歡', percentage: 97 },
        ],
        description: '3年專業托育經驗，持有 CPR 急救證照。擅長製作營養均衡的副食品，並透過音樂啟發寶寶的感官發展。耐心照顧，讓每個寶寶都能快樂成長。',
    },
    {
        id: 'nanny-3',
        name: '陳雅婷',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
        type: 'nanny',
        shieldLevel: 'gold',
        location: '台中市南屯區',
        rating: 4.8,
        reviewCount: 56,
        serviceCount: 203,
        tags: ['資深保母', '感統訓練', '繪本達人'],
        verifications: GOLD_BADGES,
        certifiedDate: '2021-06-10',
        experience: 12,
        license: '中市保登字第2468號',
        insurance: true,
        canDoFullCare: true,
        availableDays: ['週一', '週二', '週三', '週四', '週五'],
        specialNeeds: true,
        price: { min: 28000, max: 32000, unit: 'month' },
        positiveTagsStats: [
            { tag: '經驗豐富', percentage: 100 },
            { tag: '專業細心', percentage: 98 },
            { tag: '溝通良好', percentage: 96 },
        ],
        description: '12年資深托育經驗，專長感覺統合訓練與繪本共讀。可接受特殊需求兒童，提供個別化照護計畫。經驗豐富，深受家長信賴。',
    },
];

// 範例資料 - 銀盾陪玩夥伴
export const SAMPLE_PLAYMATES: Caregiver[] = [
    {
        id: 'play-1',
        name: '陳欣怡',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenxin',
        type: 'playmate',
        shieldLevel: 'silver',
        location: '台中市西區',
        rating: 4.8,
        reviewCount: 24,
        serviceCount: 67,
        tags: ['唸繪本高手', '英文會話', '美勞創作'],
        verifications: SILVER_BADGES,
        certifiedDate: '2025-09-15',
        certValidUntil: '2026-03-15',
        school: '台中教育大學 幼兒教育學系',
        testScore: 85,
        minHours: 2,
        availableDays: ['週六', '週日', '平日晚上'],
        specialNeeds: false,
        price: { min: 280, max: 280, unit: 'hour' },
        positiveTagsStats: [
            { tag: '很有耐心', percentage: 92 },
            { tag: '孩子很喜歡', percentage: 96 },
            { tag: '準時到達', percentage: 100 },
        ],
        description: '台中教大幼教系大三學生，熱愛與孩子互動。擅長英文繪本共讀和創意美勞，能設計有趣的遊戲活動。通過 MomSafe 安全測驗（85分），具備基礎急救知識。',
    },
    {
        id: 'play-2',
        name: '李承恩',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lichen',
        type: 'playmate',
        shieldLevel: 'silver',
        location: '台中市北屯區',
        rating: 4.9,
        reviewCount: 18,
        serviceCount: 45,
        tags: ['樂高達人', '戶外放電王', '體能遊戲'],
        verifications: SILVER_BADGES,
        certifiedDate: '2025-10-20',
        certValidUntil: '2026-04-20',
        school: '東海大學 體育學系',
        testScore: 88,
        minHours: 2,
        availableDays: ['週六', '週日'],
        specialNeeds: false,
        price: { min: 300, max: 300, unit: 'hour' },
        positiveTagsStats: [
            { tag: '活力充沛', percentage: 100 },
            { tag: '會陪玩', percentage: 94 },
            { tag: '體力好', percentage: 100 },
        ],
        description: '東海大學體育系學生，喜歡帶孩子進行戶外活動。擅長樂高積木教學和體能遊戲，讓孩子在玩樂中學習。體力充沛，適合需要放電的活潑寶貝。',
    },
    {
        id: 'play-3',
        name: '張雅筑',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangyazhu',
        type: 'playmate',
        shieldLevel: 'silver',
        location: '台中市西屯區',
        rating: 4.7,
        reviewCount: 15,
        serviceCount: 38,
        tags: ['音樂遊戲', '說故事', '安靜陪伴'],
        verifications: SILVER_BADGES,
        certifiedDate: '2025-11-01',
        certValidUntil: '2026-05-01',
        school: '靜宜大學 兒童與家庭學系',
        testScore: 82,
        minHours: 2,
        availableDays: ['週一', '週三', '週五', '週六', '週日'],
        specialNeeds: false,
        price: { min: 260, max: 260, unit: 'hour' },
        positiveTagsStats: [
            { tag: '溫柔細心', percentage: 93 },
            { tag: '聲音好聽', percentage: 100 },
            { tag: '不滑手機', percentage: 100 },
        ],
        description: '靜宜大學兒家系學生，個性溫柔細心。擅長音樂遊戲和說故事，聲音溫柔動聽。適合需要安靜陪伴或睡前共讀的寶寶。',
    },
    {
        id: 'play-4',
        name: '黃柏翔',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=huangboxiang',
        type: 'playmate',
        shieldLevel: 'silver',
        location: '台中市南區',
        rating: 4.6,
        reviewCount: 12,
        serviceCount: 29,
        tags: ['科學實驗', 'STEAM 教育', '邏輯遊戲'],
        verifications: SILVER_BADGES,
        certifiedDate: '2025-12-05',
        certValidUntil: '2026-06-05',
        school: '中興大學 化學系',
        testScore: 90,
        minHours: 3,
        availableDays: ['週六', '週日'],
        specialNeeds: false,
        price: { min: 320, max: 320, unit: 'hour' },
        positiveTagsStats: [
            { tag: '有創意', percentage: 95 },
            { tag: '學習效果好', percentage: 92 },
            { tag: '專業知識', percentage: 100 },
        ],
        description: '中興大學化學系學生，熱愛科學教育。能設計適合幼兒的簡易科學實驗，培養孩子的好奇心和探索精神。適合 4 歲以上對科學有興趣的孩子。',
    },
    {
        id: 'play-5',
        name: '林佳蓉',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linjiarong',
        type: 'playmate',
        shieldLevel: 'silver',
        location: '台中市北區',
        rating: 4.9,
        reviewCount: 21,
        serviceCount: 58,
        tags: ['手作達人', '黏土創作', '感統遊戲'],
        verifications: SILVER_BADGES,
        certifiedDate: '2025-08-10',
        certValidUntil: '2026-02-10',
        school: '台中科技大學 幼兒保育系',
        testScore: 87,
        minHours: 2,
        availableDays: ['週一', '週二', '週四', '週六', '週日'],
        specialNeeds: true,
        price: { min: 290, max: 290, unit: 'hour' },
        positiveTagsStats: [
            { tag: '耐心十足', percentage: 100 },
            { tag: '會收拾玩具', percentage: 95 },
            { tag: '創意豐富', percentage: 98 },
        ],
        description: '台中科大幼保系學生，擅長手作和黏土創作。具備感統遊戲設計能力，可接受輕度特殊需求兒童。耐心細緻，深受家長好評。',
    },
];

// 地區選項
export const LOCATION_OPTIONS = [
    '全部地區',
    '台中市中區',
    '台中市東區',
    '台中市南區',
    '台中市西區',
    '台中市北區',
    '台中市北屯區',
    '台中市西屯區',
    '台中市南屯區',
    '台中市太平區',
    '台中市大里區',
    '台中市霧峰區',
];

// 評價標籤
export const POSITIVE_TAGS = [
    '不滑手機',
    '會主動洗手',
    '情緒穩定',
    '守時準時',
    '孩子很喜歡',
    '溫柔耐心',
    '專業細心',
    '溝通良好',
    '會收拾玩具',
    '很有創意',
];
