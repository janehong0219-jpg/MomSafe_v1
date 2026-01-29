'use client';

import { STAGE_COLORS } from '@/lib/diaryData';
import type { BabyStage } from './types';

interface StageSelectorProps {
    currentStage: BabyStage;
    onStageChange: (stage: BabyStage) => void;
}

const STAGES: { value: BabyStage; label: string; emoji: string }[] = [
    { value: 'pregnancy', label: '懷孕期', emoji: '🤰' },
    { value: '0-6m', label: '0-6 個月', emoji: '👶' },
    { value: '6m-1y', label: '6-12 個月', emoji: '🍼' },
    { value: '1y-2y', label: '1-2 歲', emoji: '🧸' },
    { value: '2y+', label: '2 歲+', emoji: '🎈' },
];

export default function StageSelector({ currentStage, onStageChange }: StageSelectorProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-600 mb-3 tracking-wide">成長階段</h3>

            <div className="grid grid-cols-5 gap-2">
                {STAGES.map((stage) => {
                    const isActive = currentStage === stage.value;
                    const colors = STAGE_COLORS[stage.value];

                    return (
                        <button
                            key={stage.value}
                            onClick={() => onStageChange(stage.value)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive
                                    ? `bg-gradient-to-br ${colors.gradient} border-2 scale-110 shadow-md`
                                    : 'bg-gray-50 border border-transparent hover:border-gray-200'
                                }`}
                            style={isActive ? { borderColor: colors.primary } : undefined}
                        >
                            <span className="text-2xl">{stage.emoji}</span>
                            <span className={`text-[10px] font-medium text-center leading-tight ${isActive ? 'text-gray-800' : 'text-gray-500'
                                }`}>
                                {stage.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
