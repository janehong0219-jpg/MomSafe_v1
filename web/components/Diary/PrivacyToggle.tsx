'use client';

import { Lock, Sparkles, CheckCircle2, Info } from 'lucide-react';
import { useState } from 'react';
import type { PrivacySettings } from './types';

interface PrivacyToggleProps {
    settings: PrivacySettings;
    onToggle: (enabled: boolean) => void;
    onRequestAnalysis: () => void;
}

export default function PrivacyToggle({ settings, onToggle, onRequestAnalysis }: PrivacyToggleProps) {
    const [showInfoModal, setShowInfoModal] = useState(false);

    return (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-200">
            {/* 隱私狀態顯示 */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${settings.aiAnalysisEnabled
                            ? 'bg-purple-100'
                            : 'bg-gray-100'
                        }`}>
                        {settings.aiAnalysisEnabled ? (
                            <Sparkles className="w-5 h-5 text-purple-600" />
                        ) : (
                            <Lock className="w-5 h-5 text-gray-600" />
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-800 text-sm">
                                {settings.aiAnalysisEnabled ? '✅ AI 分析已啟用' : '🔒 隱私保護中'}
                            </h3>
                            <button
                                onClick={() => setShowInfoModal(true)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Info className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-gray-600 mt-1">
                            {settings.aiAnalysisEnabled
                                ? '系統會在您授權後分析日記並給予建議'
                                : '您的資料僅存於本地，不會傳送給 AI'}
                        </p>
                    </div>
                </div>
            </div>

            {/* AI 分析按鈕 */}
            {!settings.aiAnalysisEnabled ? (
                <button
                    onClick={onRequestAnalysis}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:scale-105"
                >
                    <Sparkles className="w-4 h-4" />
                    ✨ AI 幫我分析
                </button>
            ) : (
                <button
                    onClick={() => onToggle(false)}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-medium text-sm hover:bg-gray-300 transition-colors"
                >
                    關閉 AI 分析
                </button>
            )}

            {/* 資訊彈窗 */}
            {showInfoModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowInfoModal(false)}>
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <Lock className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">三層隱私保護</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-green-700">1</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">本地優先</h4>
                                    <p className="text-xs text-gray-600 mt-1">預設狀態下，日記資料僅存於您的裝置，完全不經過 AI。</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-blue-700">2</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">主動授權</h4>
                                    <p className="text-xs text-gray-600 mt-1">只有在您點擊「✨ AI 幫我分析」並確認後，才會發送資料。</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-purple-700">3</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">去識別化</h4>
                                    <p className="text-xs text-gray-600 mt-1">系統會移除姓名、地址等個資後才分析，保護隱私安全。</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInfoModal(false)}
                            className="w-full bg-purple-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-purple-600 transition-colors"
                        >
                            我了解了
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
