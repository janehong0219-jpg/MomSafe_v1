'use client';

import { TrendingUp, AlertTriangle, Heart, Milestone, AlertCircle } from 'lucide-react';
import type { AIAdvice } from './types';

interface AIAdviceCardProps {
    advice: AIAdvice;
    onMarkRead: (id: string) => void;
}

export default function AIAdviceCard({ advice, onMarkRead }: AIAdviceCardProps) {
    // 根據類型選擇圖標和顏色
    const getTypeConfig = (type: AIAdvice['analysisType']) => {
        switch (type) {
            case 'sleep_pattern':
                return {
                    icon: <TrendingUp className="w-4 h-4" />,
                    gradient: 'from-blue-50 to-purple-50',
                    borderColor: 'border-blue-200',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    label: '睡眠模式',
                };
            case 'feeding_advice':
                return {
                    icon: <Heart className="w-4 h-4" />,
                    gradient: 'from-pink-50 to-rose-50',
                    borderColor: 'border-pink-200',
                    iconBg: 'bg-pink-100',
                    iconColor: 'text-pink-600',
                    label: '餵食建議',
                };
            case 'emotion_alert':
                return {
                    icon: <AlertCircle className="w-4 h-4" />,
                    gradient: 'from-orange-50 to-yellow-50',
                    borderColor: 'border-orange-200',
                    iconBg: 'bg-orange-100',
                    iconColor: 'text-orange-600',
                    label: '情緒提醒',
                };
            case 'health_warning':
                return {
                    icon: <AlertTriangle className="w-4 h-4" />,
                    gradient: 'from-red-50 to-orange-50',
                    borderColor: 'border-red-200',
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    label: '健康警示',
                };
            case 'milestone':
                return {
                    icon: <Milestone className="w-4 h-4" />,
                    gradient: 'from-green-50 to-emerald-50',
                    borderColor: 'border-green-200',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    label: '成長里程碑',
                };
        }
    };

    const config = getTypeConfig(advice.analysisType);
    const confidencePercent = Math.round(advice.confidence * 100);

    return (
        <div className={`bg-gradient-to-r ${config.gradient} rounded-2xl p-4 border ${config.borderColor} ${advice.isRead ? 'opacity-75' : ''
            }`}>
            <div className="flex items-start gap-3">
                {/* 圖標 */}
                <div className={`${config.iconBg} p-2 rounded-xl flex-shrink-0`}>
                    <div className={config.iconColor}>
                        {config.icon}
                    </div>
                </div>

                {/* 內容 */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-700">{config.label}</span>
                        {!advice.isRead && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {advice.adviceText}
                    </p>

                    {/* 信心度 */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full ${confidencePercent >= 80 ? 'bg-green-500' :
                                            confidencePercent >= 60 ? 'bg-yellow-500' :
                                                'bg-orange-500'
                                        }`}
                                    style={{ width: `${confidencePercent}%` }}
                                ></div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">信心度 {confidencePercent}%</span>
                    </div>

                    {/* 已讀按鈕 */}
                    {!advice.isRead && (
                        <button
                            onClick={() => onMarkRead(advice.id)}
                            className="mt-3 text-xs text-purple-600 hover:text-purple-700 font-medium"
                        >
                            標記為已讀
                        </button>
                    )}
                </div>
            </div>

            {/* 時間戳 */}
            <div className="mt-2 text-xs text-gray-400 text-right">
                {new Date(advice.timestamp).toLocaleString('zh-TW', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
        </div>
    );
}
