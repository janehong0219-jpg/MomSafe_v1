import { NextRequest, NextResponse } from 'next/server';
import type { DiaryRecord } from '@/components/Diary/types';

// 簡化版 AI 建議 API（不使用真實 Gemini，僅模擬）
// 未來可整合 Google Vertex AI

interface AnalysisRequest {
    records: DiaryRecord[];
    babyAgeInMonths: number;
}

// 去識別化處理
function maskData(records: DiaryRecord[]) {
    return records.map(r => ({
        type: r.type,
        timestamp: r.timestamp,
        mood: r.mood,
        milkAmount: r.milkAmount,
        sleepDuration: r.sleepDuration,
        temperature: r.temperature,
        poopColor: r.poopColor,
        solidFoodAmount: r.solidFoodAmount,
        // 移除個資：caregiverName, gpsLocation, photoUrl
    }));
}

// 簡單的規則引擎（模擬 AI）
function generateAdvice(maskedRecords: any[], babyAgeInMonths: number) {
    const advices = [];

    // 睡眠分析
    const sleepRecords = maskedRecords.filter(r => r.type === 'sleep' && r.sleepDuration);
    if (sleepRecords.length >= 2) {
        const avgSleep = sleepRecords.reduce((sum, r) => sum + (r.sleepDuration || 0), 0) / sleepRecords.length;

        if (avgSleep < 60 && babyAgeInMonths < 6) {
            advices.push({
                analysisType: 'sleep_pattern',
                adviceText: `寶寶的小睡時間較短（平均 ${Math.round(avgSleep)} 分鐘）。${babyAgeInMonths} 個月大的寶寶可能正在調整作息，建議觀察是否有外在干擾，並保持規律的睡前儀式。`,
                confidence: 0.75,
            });
        }
    }

    // 餵奶分析
    const feedRecords = maskedRecords.filter(r => r.type === 'feed' && r.milkAmount);
    if (feedRecords.length >= 2) {
        const amounts = feedRecords.map(r => r.milkAmount);
        const avgMilk = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
        const hasDecrease = amounts[amounts.length - 1] < avgMilk * 0.7;

        if (hasDecrease) {
            advices.push({
                analysisType: 'feeding_advice',
                adviceText: '最近一次的喝奶量明顯少於平均值。可能是寶寶不餓、長牙不適，或是環境太吵影響專注。建議觀察是否有其他症狀（如發燒、腹瀉），必要時諮詢醫師。',
                confidence: 0.68,
            });
        } else {
            advices.push({
                analysisType: 'feeding_advice',
                adviceText: `寶寶的喝奶狀況穩定（平均 ${Math.round(avgMilk)} ml）。繼續保持這樣的節奏，您做得很棒！`,
                confidence: 0.92,
            });
        }
    }

    // 情緒分析
    const moodRecords = maskedRecords.filter(r => r.mood);
    const cryingCount = moodRecords.filter(r => r.mood === 'crying').length;
    const grumpyCount = moodRecords.filter(r => r.mood === 'grumpy').length;

    if ((cryingCount + grumpyCount) >= 3) {
        advices.push({
            analysisType: 'emotion_alert',
            adviceText: '您記錄了多次寶寶哭鬧或不安的情緒。這可能是成長階段的正常現象，但如果症狀持續，建議檢查是否有不適（腹脹、長牙）。您辛苦了，記得照顧好自己！',
            confidence: 0.70,
        });
    }

    // 健康警示
    const tempRecords = maskedRecords.filter(r => r.temperature && r.temperature > 37.5);
    if (tempRecords.length > 0) {
        advices.push({
            analysisType: 'health_warning',
            adviceText: `記錄到體溫超過 37.5°C。請持續監測並注意是否有其他症狀（如食慾不振、活力下降）。若體溫超過 38°C 或持續發燒，建議儘快就醫。`,
            confidence: 0.95,
        });
    }

    // 里程碑提醒
    if (babyAgeInMonths === 6) {
        advices.push({
            analysisType: 'milestone',
            adviceText: '🎉 寶寶滿 6 個月了！現在可以開始嘗試副食品囉！建議從單一成分的米糊或蔬菜泥開始，每次只引入一種新食物，觀察 3-5 天確認無過敏反應。',
            confidence: 1.0,
        });
    }

    return advices;
}

export async function POST(request: NextRequest) {
    try {
        const body: AnalysisRequest = await request.json();
        const { records, babyAgeInMonths } = body;

        // 驗證輸入
        if (!records || !Array.isArray(records) || records.length === 0) {
            return NextResponse.json(
                { error: '缺少有效的記錄資料' },
                { status: 400 }
            );
        }

        // 去識別化處理
        const maskedRecords = maskData(records);

        // 生成建議（簡化版規則引擎）
        // 未來可替換為：
        // const prompt = formatAIPrompt(maskedRecords, babyAgeInMonths);
        // const response = await geminiAPI.generateContent(prompt);

        const advices = generateAdvice(maskedRecords, babyAgeInMonths);

        // 返回建議
        return NextResponse.json({
            success: true,
            advices: advices.map((advice, index) => ({
                id: `advice-${Date.now()}-${index}`,
                diaryRecordIds: records.map(r => r.id),
                ...advice,
                timestamp: new Date(),
                userConsented: true,
                isRead: false,
            })),
        });
    } catch (error) {
        console.error('AI Advice API Error:', error);
        return NextResponse.json(
            { error: '分析過程發生錯誤' },
            { status: 500 }
        );
    }
}
