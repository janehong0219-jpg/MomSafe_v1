// 基礎類型
export type RecordType = 'feed' | 'sleep' | 'diaper' | 'growth' | 'other' | 'solid_food' | 'medicine' | 'milestone';

// 寶寶成長階段
export type BabyStage = 'pregnancy' | '0-6m' | '6m-1y' | '1y-2y' | '2y+';

// 情緒心情
export type MoodType = 'happy' | 'crying' | 'sleepy' | 'excited' | 'grumpy' | 'calm';

// 排泄顏色（布里斯托分類）
export type PoopColor = 'yellow' | 'green' | 'brown' | 'black' | 'red' | 'white';

// 副食品類型
export type SolidFoodType = 'puree' | 'mashed' | 'finger_food' | 'family_food';

// 隱私設置
export interface PrivacySettings {
    aiAnalysisEnabled: boolean;      // 是否允許 AI 分析
    collaborativeMode: boolean;       // 是否開啟協作模式（保母）
    dataRetentionDays: number;        // 資料保留天數（預設 365）
}

// AI 分析結果
export interface AIAdvice {
    id: string;
    diaryRecordIds: string[];         // 關聯的日記記錄
    analysisType: 'sleep_pattern' | 'feeding_advice' | 'emotion_alert' | 'milestone' | 'health_warning';
    adviceText: string;               // AI 建議內容
    confidence: number;               // 信心度 0-1
    timestamp: Date;
    userConsented: boolean;           // 用戶是否授權此次分析
    isRead: boolean;                  // 是否已讀
}

// 擴展的日記記錄
export interface DiaryRecord {
    id: string;
    type: RecordType;
    timestamp: Date;
    title: string;
    details: string;                  // e.g., "120ml", "Left Breast 10m", "Soft Yellow"
    note?: string;
    tags?: string[];                  // e.g., ["Cry", "Happy"]

    // 新增欄位
    mood?: MoodType;                  // 寶寶心情
    temperature?: number;             // 體溫（發燒追蹤）
    poopColor?: PoopColor;            // 便便顏色
    milkAmount?: number;              // 奶量 (ml)
    sleepDuration?: number;           // 睡眠時長（分鐘）
    solidFoodType?: SolidFoodType;    // 副食品類型
    solidFoodAmount?: number;         // 副食品份量 (g)
    foodAllergy?: boolean;            // 是否過敏
    photoUrl?: string;                // 照片URL（便便/疹子等）

    // 協作相關
    caregiverName?: string;           // 協作者姓名（保母時使用）
    gpsLocation?: string;            // GPS 簽到（保母模式）
    isCollaborative: boolean;         // 是否為協作記錄
}

// 日摘要（擴展）
export interface DaySummary {
    date: Date;
    totalFeed: number;                // ml
    totalSleep: number;               // minutes
    diaperCount: number;
    solidFoodCount?: number;          // 副食品次數
    averageMood?: MoodType;           // 平均心情
    collaborativeRecordCount: number; // 協作記錄數
}

// 寶寶資訊（新增）
export interface BabyInfo {
    id: string;
    name: string;
    birthDate: Date;
    gender?: 'male' | 'female';
    currentStage: BabyStage;
}
