// 日記相關工具函數與範例資料

import { BabyStage, DiaryRecord, AIAdvice, BabyInfo, MoodType } from '../components/Diary/types';

// 根據出生日期判斷成長階段
export function getBabyStage(birthDate: Date): BabyStage {
    const now = new Date();
    const ageInMonths = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

    if (ageInMonths < 0) return 'pregnancy';
    if (ageInMonths <= 6) return '0-6m';
    if (ageInMonths <= 12) return '6m-1y';
    if (ageInMonths <= 24) return '1y-2y';
    return '2y+';
}

// 根據階段返回建議記錄欄位
export function getSuggestedFields(stage: BabyStage): string[] {
    const fieldMap: Record<BabyStage, string[]> = {
        'pregnancy': ['產檢日期', '體重', '血壓', '胎動次數', '情緒'],
        '0-6m': ['奶量', '睡眠時長', '尿布次數', '便便顏色', '心情'],
        '6m-1y': ['奶量', '副食品', '睡眠', '爬行/站立', '語言發展'],
        '1y-2y': ['副食品', '語言詞彙', '如廁訓練', '社交互動'],
        '2y+': ['飲食', '語言句子', '如廁', '幼兒園適應', '情緒管理'],
    };

    return fieldMap[stage] || [];
}

// 簡單的睡眠模式分析（本地，不需 AI）
export function analyzeSleepPattern(records: DiaryRecord[]): string {
    const sleepRecords = records.filter(r => r.type === 'sleep' && r.sleepDuration);

    if (sleepRecords.length === 0) return '尚無足夠的睡眠記錄';

    const avgSleep = sleepRecords.reduce((sum, r) => sum + (r.sleepDuration || 0), 0) / sleepRecords.length;
    const totalSleep = sleepRecords.reduce((sum, r) => sum + (r.sleepDuration || 0), 0);

    if (avgSleep < 30) return '小睡時間偏短，可能需要調整作息';
    if (totalSleep > 900) return '睡眠充足，寶寶作息良好！';
    return `平均小睡 ${Math.round(avgSleep)} 分鐘`;
}

// 將記錄轉換為 AI 提示（去識別化）
export function formatAIPrompt(records: DiaryRecord[], babyAgeInMonths: number): string {
    const maskedRecords = records.map(r => ({
        type: r.type,
        timestamp: r.timestamp.toISOString(),
        mood: r.mood,
        milkAmount: r.milkAmount,
        sleepDuration: r.sleepDuration,
        temperature: r.temperature,
    }));

    return `你是一位專業的育兒顧問。根據以下 ${babyAgeInMonths} 個月大寶寶的日記，給予溫暖且專業的建議：

${JSON.stringify(maskedRecords, null, 2)}

請分析可能原因並給予建議，語氣溫和有同理心。`;
}

// 範例寶寶資訊
export const SAMPLE_BABY: BabyInfo = {
    id: 'baby-1',
    name: '小寶',
    birthDate: new Date(2025, 9, 15), // 2025-10-15（約3個月大）
    gender: 'male',
    currentStage: '0-6m',
};

// 範例日記記錄
export const SAMPLE_RECORDS: DiaryRecord[] = [
    {
        id: 'record-1',
        type: 'feed',
        timestamp: new Date(2026, 0, 28, 8, 0),
        title: '早晨餵奶',
        details: '母乳',
        milkAmount: 120,
        mood: 'happy',
        isCollaborative: false,
        note: '寶寶喝得很順',
    },
    {
        id: 'record-2',
        type: 'sleep',
        timestamp: new Date(2026, 0, 28, 9, 30),
        title: '上午小睡',
        details: '小床',
        sleepDuration: 90,
        mood: 'calm',
        isCollaborative: false,
    },
    {
        id: 'record-3',
        type: 'diaper',
        timestamp: new Date(2026, 0, 28, 12, 0),
        title: '換尿布',
        details: '正常',
        poopColor: 'yellow',
        isCollaborative: true,
        caregiverName: '林保母',
        gpsLocation: '台中市西屯區',
        note: '便便顏色正常，軟軟的',
    },
    {
        id: 'record-4',
        type: 'feed',
        timestamp: new Date(2026, 0, 28, 15, 0),
        title: '下午餵奶',
        details: '母乳',
        milkAmount: 80,
        mood: 'crying',
        isCollaborative: true,
        caregiverName: '林保母',
        note: '喝得較少，有點不安',
    },
    {
        id: 'record-5',
        type: 'sleep',
        timestamp: new Date(2026, 0, 28, 21, 0),
        title: '晚上睡眠',
        details: '嬰兒床',
        sleepDuration: 180,
        mood: 'sleepy',
        isCollaborative: false,
        note: '睡前哭了一下',
    },
];

// 範例 AI 建議
export const SAMPLE_AI_ADVICE: AIAdvice[] = [
    {
        id: 'advice-1',
        diaryRecordIds: ['record-4', 'record-5'],
        analysisType: 'sleep_pattern',
        adviceText: '寶寶下午喝奶量減少且情緒不安，晚上睡前哭鬧，可能進入 3-4 個月的睡眠倒退期。建議保持規律作息，睡前建立固定儀式（如洗澡、唱搖籃曲）。',
        confidence: 0.75,
        timestamp: new Date(2026, 0, 28, 22, 0),
        userConsented: true,
        isRead: false,
    },
    {
        id: 'advice-2',
        diaryRecordIds: ['record-1', 'record-2'],
        analysisType: 'feeding_advice',
        adviceText: '寶寶早晨喝奶狀況良好（120ml），之後小睡也很穩定。這是很棒的循環！繼續保持這樣的作息。',
        confidence: 0.9,
        timestamp: new Date(2026, 0, 28, 11, 0),
        userConsented: true,
        isRead: true,
    },
];

// 階段配色
export const STAGE_COLORS: Record<BabyStage, { primary: string; secondary: string; gradient: string }> = {
    'pregnancy': {
        primary: '#B794F4',
        secondary: '#E9D5FF',
        gradient: 'from-purple-50 to-pink-50',
    },
    '0-6m': {
        primary: '#60A5FA',
        secondary: '#BFDBFE',
        gradient: 'from-blue-50 to-pink-50',
    },
    '6m-1y': {
        primary: '#FBBF24',
        secondary: '#FEF3C7',
        gradient: 'from-yellow-50 to-orange-50',
    },
    '1y-2y': {
        primary: '#34D399',
        secondary: '#A7F3D0',
        gradient: 'from-green-50 to-cyan-50',
    },
    '2y+': {
        primary: '#60A5FA',
        secondary: '#BAE6FD',
        gradient: 'from-cyan-50 to-blue-50',
    },
};

// 心情 Emoji 對應
export const MOOD_EMOJIS: Record<MoodType, string> = {
    'happy': '😊',
    'crying': '😢',
    'sleepy': '😴',
    'excited': '🤩',
    'grumpy': '😠',
    'calm': '😌',
};
