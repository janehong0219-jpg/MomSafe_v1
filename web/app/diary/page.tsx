'use client';

import { useState } from 'react';
import { Milk, Moon, Baby, Droplet, AlertTriangle } from 'lucide-react';
import StageSelector from '@/components/Diary/StageSelector';
import PrivacyToggle from '@/components/Diary/PrivacyToggle';
import AIAdviceCard from '@/components/Diary/AIAdviceCard';
import RecordList from '@/components/Diary/RecordList';
import RecordForm, { type RecordFormData } from '@/components/Diary/RecordForm';
import type { BabyStage, PrivacySettings, AIAdvice, DiaryRecord, RecordType } from '@/components/Diary/types';
import { SAMPLE_RECORDS, SAMPLE_AI_ADVICE, SAMPLE_BABY } from '@/lib/diaryData';

export default function DiaryPage() {
    const [currentStage, setCurrentStage] = useState<BabyStage>('0-6m');
    const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
        aiAnalysisEnabled: false,
        collaborativeMode: false,
        dataRetentionDays: 365,
    });
    const [records, setRecords] = useState<DiaryRecord[]>(SAMPLE_RECORDS);
    const [aiAdvices, setAiAdvices] = useState<AIAdvice[]>(SAMPLE_AI_ADVICE);
    const [showConsentModal, setShowConsentModal] = useState(false);
    const [showRecordForm, setShowRecordForm] = useState(false);
    const [selectedRecordType, setSelectedRecordType] = useState<RecordType>('feed');
    const [isLoadingAI, setIsLoadingAI] = useState(false);

    const handleRequestAnalysis = () => {
        setShowConsentModal(true);
    };

    const handleConsentAnalysis = async () => {
        setPrivacySettings({ ...privacySettings, aiAnalysisEnabled: true });
        setShowConsentModal(false);

        // 呼叫 AI API
        await fetchAIAdvice();
    };

    const fetchAIAdvice = async () => {
        setIsLoadingAI(true);
        try {
            const response = await fetch('/api/ai-advice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    records: records,
                    babyAgeInMonths: 3, // 可從 SAMPLE_BABY.birthDate 計算
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.advices) {
                    setAiAdvices(data.advices);
                }
            }
        } catch (error) {
            console.error('Failed to fetch AI advice:', error);
        } finally {
            setIsLoadingAI(false);
        }
    };

    const handleMarkAdviceRead = (id: string) => {
        setAiAdvices(advices =>
            advices.map(a => a.id === id ? { ...a, isRead: true } : a)
        );
    };

    const handleQuickRecord = (type: RecordType) => {
        setSelectedRecordType(type);
        setShowRecordForm(true);
    };

    const handleSubmitRecord = (formData: RecordFormData) => {
        const newRecord: DiaryRecord = {
            id: `record-${Date.now()}`,
            type: formData.type,
            timestamp: new Date(),
            title: formData.title,
            details: formData.details,
            note: formData.note,
            mood: formData.mood,
            temperature: formData.temperature,
            poopColor: formData.poopColor,
            milkAmount: formData.milkAmount,
            sleepDuration: formData.sleepDuration,
            solidFoodType: formData.solidFoodType,
            solidFoodAmount: formData.solidFoodAmount,
            foodAllergy: formData.foodAllergy,
            isCollaborative: false,
        };

        setRecords([newRecord, ...records]);

        // 如果 AI 已啟用，重新分析
        if (privacySettings.aiAnalysisEnabled) {
            setTimeout(() => fetchAIAdvice(), 500);
        }
    };

    // 計算今日記錄統計
    const todayRecords = records.filter(r => {
        const today = new Date();
        const recordDate = new Date(r.timestamp);
        return recordDate.toDateString() === today.toDateString();
    });

    // 檢查協作模式異常（超過2小時未更新）
    const collaborativeRecords = records.filter(r => r.isCollaborative);
    const lastCollaborativeRecord = collaborativeRecords[0];
    const showCollaborativeAlert = privacySettings.collaborativeMode && lastCollaborativeRecord &&
        (Date.now() - new Date(lastCollaborativeRecord.timestamp).getTime()) > 2 * 60 * 60 * 1000;

    return (
        <div className="min-h-screen bg-[#FFF9F0] pb-32">
            {/* Header with Mint Background */}
            <div className="bg-gradient-to-b from-[#B5E7D3] to-[#D4F1E6] px-6 pt-12 pb-8 rounded-b-[3rem]">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700 tracking-wide">AI 日記</h1>
                        <p className="text-gray-500 text-sm mt-1 font-light">懂寶寶生理時鐘的育兒顧問</p>
                    </div>
                    <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Baby className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 -mt-6 space-y-4">
                {/* Stage Selector */}
                <StageSelector
                    currentStage={currentStage}
                    onStageChange={setCurrentStage}
                />

                {/* Collaborative Mode Alert */}
                {showCollaborativeAlert && (
                    <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-orange-900 text-sm">⚠️ 協作者超過 2 小時未更新</p>
                                <p className="text-xs text-orange-700 mt-1">
                                    {lastCollaborativeRecord.caregiverName} 最後更新於 {new Date(lastCollaborativeRecord.timestamp).toLocaleTimeString('zh-TW')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Privacy Toggle */}
                <PrivacyToggle
                    settings={privacySettings}
                    onToggle={(enabled) => setPrivacySettings({ ...privacySettings, aiAnalysisEnabled: enabled })}
                    onRequestAnalysis={handleRequestAnalysis}
                />

                {/* AI Advice Cards */}
                {privacySettings.aiAnalysisEnabled && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-xs font-bold text-gray-600 tracking-wide">AI 建議</h3>
                            {isLoadingAI && (
                                <span className="text-xs text-purple-600">分析中...</span>
                            )}
                        </div>
                        {aiAdvices.length > 0 ? (
                            aiAdvices.map((advice) => (
                                <AIAdviceCard
                                    key={advice.id}
                                    advice={advice}
                                    onMarkRead={handleMarkAdviceRead}
                                />
                            ))
                        ) : (
                            <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                <p className="text-sm text-gray-500">記錄更多資料後，AI 會提供建議</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Record List */}
                <RecordList records={todayRecords} />

                {/* Encouragement Message */}
                <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5F0] rounded-2xl p-4 border border-orange-100">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">💝</span>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">辛苦了，妳做得很棒！</p>
                            <p className="text-xs text-gray-400 mt-1">
                                今日已記錄 {todayRecords.length} 筆
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Quick Actions */}
            <div className="fixed bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-lg rounded-[2rem] shadow-xl p-3 border border-gray-100">
                    <div className="text-[10px] text-center text-gray-500 mb-2 font-medium">快速記錄</div>
                    <div className="grid grid-cols-4 gap-2">
                        <button
                            onClick={() => handleQuickRecord('feed')}
                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-pink-50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Milk className="w-5 h-5 text-pink-500" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">Feed</span>
                        </button>

                        <button
                            onClick={() => handleQuickRecord('sleep')}
                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-blue-50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Moon className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">Sleep</span>
                        </button>

                        <button
                            onClick={() => handleQuickRecord('diaper')}
                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-orange-50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Baby className="w-5 h-5 text-orange-500" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">Diaper</span>
                        </button>

                        <button
                            onClick={() => handleQuickRecord('solid_food')}
                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-cyan-50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Droplet className="w-5 h-5 text-cyan-500" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">Food</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Record Form Modal */}
            {showRecordForm && (
                <RecordForm
                    stage={currentStage}
                    initialType={selectedRecordType}
                    onClose={() => setShowRecordForm(false)}
                    onSubmit={handleSubmitRecord}
                />
            )}

            {/* Consent Modal */}
            {showConsentModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowConsentModal(false)}>
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">✨</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">授權 AI 分析</h3>
                            <p className="text-sm text-gray-600">是否授權 AI 讀取您的日記以提供建議？</p>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-4 mb-6 text-sm text-gray-700">
                            <p className="mb-2">✅ 系統會移除個資後才分析</p>
                            <p className="mb-2">✅ 您隨時可以關閉此功能</p>
                            <p>✅ 建議內容僅供參考，非醫療診斷</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConsentModal(false)}
                                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleConsentAnalysis}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg transition-all"
                            >
                                授權分析
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
