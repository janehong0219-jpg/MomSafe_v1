'use client';

import { useState } from 'react';
import { Shield, Bell, Lock, Brain, ShoppingBag, ChevronRight } from 'lucide-react';

interface PrivacySetting {
    id: string;
    title: string;
    description: string;
    icon: any;
    enabled: boolean;
    critical?: boolean;
}

export default function PrivacySettingsPage() {
    const [settings, setSettings] = useState<PrivacySetting[]>([
        {
            id: 'ai_analysis',
            title: 'AI 智能分析',
            description: '授權 AI 分析寶寶日記數據，以提供個人化的健康建議與營養師專欄推薦',
            icon: Brain,
            enabled: true,
            critical: true,
        },
        {
            id: 'data_collection',
            title: '數據收集同意',
            description: '同意 MomSafe 收集寶寶的生長數據、飲食紀錄等資訊，用於改善服務品質',
            icon: Shield,
            enabled: true,
        },
        {
            id: 'nutritionist_recommendation',
            title: '營養師專欄推薦',
            description: '當偵測到潛在健康問題時，推送相關營養師專欄文章',
            icon: Bell,
            enabled: true,
        },
        {
            id: 'product_recommendation',
            title: '產品推薦',
            description: '在營養師專欄中顯示相關的補給品建議',
            icon: ShoppingBag,
            enabled: true,
        },
        {
            id: 'push_notification',
            title: '推播通知',
            description: '允許 MomSafe 發送 AI 建議與重要提醒的推播通知',
            icon: Bell,
            enabled: false,
        },
    ]);

    const [showOptInDialog, setShowOptInDialog] = useState(false);

    const handleToggle = (id: string) => {
        setSettings(settings.map(setting =>
            setting.id === id
                ? { ...setting, enabled: !setting.enabled }
                : setting
        ));

        // 如果是關閉 AI 分析，顯示確認對話框
        const setting = settings.find(s => s.id === id);
        if (setting?.critical && setting.enabled) {
            setShowOptInDialog(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-100 to-cyan-100 px-6 pt-12 pb-8 rounded-b-[3rem]">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">隱私與授權設定</h1>
                            <p className="text-sm text-gray-600">控制您的數據如何被使用</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-6 -mt-6 space-y-6">
                {/* Important Notice */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 border-2 border-purple-200">
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">🔒</div>
                        <div>
                            <h3 className="font-bold text-gray-800 mb-1">您的隱私很重要</h3>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                MomSafe 承諾：所有數據皆經過加密處理，僅用於提供個人化服務。您可以隨時關閉以下功能，但部分 AI 建議功能可能會受到影響。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Settings List */}
                <div className="space-y-3">
                    {settings.map((setting) => {
                        const Icon = setting.icon;
                        return (
                            <div
                                key={setting.id}
                                className="bg-white rounded-2xl p-5 shadow-lg transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${setting.enabled ? 'bg-blue-100' : 'bg-gray-100'
                                        }`}>
                                        <Icon className={`w-6 h-6 ${setting.enabled ? 'text-blue-600' : 'text-gray-400'
                                            }`} />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                                    {setting.title}
                                                    {setting.critical && (
                                                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                                            核心功能
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                                    {setting.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Toggle Switch */}
                                        <button
                                            onClick={() => handleToggle(setting.id)}
                                            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${setting.enabled ? 'bg-blue-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${setting.enabled ? 'translate-x-8' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Data Management */}
                <div className="bg-white rounded-2xl p-5 shadow-lg">
                    <h3 className="font-bold text-gray-800 mb-3">數據管理</h3>
                    <div className="space-y-2">
                        <button className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left">
                            <span className="text-sm text-gray-700">查看 AI 分析紀錄</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left">
                            <span className="text-sm text-gray-700">下載我的數據</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between py-3 px-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-left">
                            <span className="text-sm text-red-600 font-medium">刪除所有數據</span>
                            <ChevronRight className="w-4 h-4 text-red-400" />
                        </button>
                    </div>
                </div>

                {/* Help */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-5 border border-teal-200">
                    <h3 className="font-bold text-gray-800 mb-2">❓ 常見問題</h3>
                    <div className="space-y-3 text-xs text-gray-700">
                        <div>
                            <p className="font-medium">Q: 關閉 AI 分析會怎麼樣？</p>
                            <p className="text-gray-600 mt-0.5">A: 您將無法收到個人化的營養師專欄推薦，但仍可手動瀏覽所有文章。</p>
                        </div>
                        <div>
                            <p className="font-medium">Q: 我的數據會被分享給第三方嗎？</p>
                            <p className="text-gray-600 mt-0.5">A: 絕對不會。所有數據僅用於 MomSafe 平台內部服務，不會販售或分享。</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Opt-out Confirmation Dialog */}
            {showOptInDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
                        <div className="text-center mb-4">
                            <div className="text-5xl mb-3">⚠️</div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">確定要關閉 AI 分析？</h3>
                            <p className="text-sm text-gray-600">
                                關閉後，您將無法收到個人化的健康建議與營養師專欄推薦。
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowOptInDialog(false)}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={() => {
                                    setShowOptInDialog(false);
                                    // 執行關閉邏輯
                                }}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-sm transition-colors"
                            >
                                確定關閉
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
