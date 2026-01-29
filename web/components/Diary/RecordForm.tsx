'use client';

import { useState } from 'react';
import { X, Smile, Thermometer, Camera } from 'lucide-react';
import type { RecordType, MoodType, PoopColor, SolidFoodType, BabyStage } from './types';
import { MOOD_EMOJIS, getSuggestedFields } from '@/lib/diaryData';

interface RecordFormProps {
    stage: BabyStage;
    onClose: () => void;
    onSubmit: (record: RecordFormData) => void;
    initialType?: RecordType;
}

export interface RecordFormData {
    type: RecordType;
    title: string;
    details: string;
    note?: string;
    mood?: MoodType;
    temperature?: number;
    poopColor?: PoopColor;
    milkAmount?: number;
    sleepDuration?: number;
    solidFoodType?: SolidFoodType;
    solidFoodAmount?: number;
    foodAllergy?: boolean;
}

export default function RecordForm({ stage, onClose, onSubmit, initialType = 'feed' }: RecordFormProps) {
    const [type, setType] = useState<RecordType>(initialType);
    const [formData, setFormData] = useState<RecordFormData>({
        type: initialType,
        title: '',
        details: '',
        note: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, type });
        onClose();
    };

    const updateField = (field: keyof RecordFormData, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    // 根據階段顯示不同欄位
    const showSolidFood = ['6m-1y', '1y-2y', '2y+'].includes(stage);
    const showTemperature = true; // 所有階段都可記錄體溫

    return (
        <div className="fixed inset-0 bg-momsafe-text/20 backdrop-blur-sm flex items-end md:items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-momsafe-cream rounded-t-[2.5rem] md:rounded-[2.5rem] w-full md:max-w-lg md:mx-4 max-h-[85vh] overflow-y-auto shadow-2xl py-2 scrollbar-hide"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-momsafe-cream/95 backdrop-blur-sm border-b border-momsafe-pink/10 px-8 py-5 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold text-momsafe-text flex items-center gap-2">
                        <span className="w-2 h-6 bg-momsafe-pink rounded-full"></span>
                        新增記錄
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-50 shadow-sm transition-colors"
                    >
                        <X className="w-5 h-5 text-momsafe-text-light" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* 類型選擇 */}
                    <div>
                        <label className="block text-sm font-bold text-momsafe-text mb-4 pl-2">記錄類型</label>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { value: 'feed' as RecordType, label: '餵奶', emoji: '🍼' },
                                { value: 'sleep' as RecordType, label: '睡眠', emoji: '😴' },
                                { value: 'diaper' as RecordType, label: '尿布', emoji: '👶' },
                                ...(showSolidFood ? [{ value: 'solid_food' as RecordType, label: '副食品', emoji: '🍎' }] : []),
                            ].map((t) => (
                                <button
                                    key={t.value}
                                    type="button"
                                    onClick={() => setType(t.value)}
                                    className={`p-3 rounded-[1.5rem] transition-all duration-300 ${type === t.value
                                        ? 'bg-momsafe-pink text-white shadow-lg shadow-momsafe-pink/20 transform scale-105'
                                        : 'bg-white text-momsafe-text hover:bg-momsafe-pink/10 shadow-sm'
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{t.emoji}</div>
                                    <div className={`text-xs font-bold ${type === t.value ? 'text-white' : 'text-momsafe-text-light'}`}>{t.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 標題 */}
                    <div>
                        <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">標題</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            placeholder="例：早晨餵奶"
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text placeholder:text-momsafe-text-light/50 font-medium"
                            required
                        />
                    </div>

                    {/* 詳細資訊 */}
                    <div>
                        <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">詳細資訊</label>
                        <input
                            type="text"
                            value={formData.details}
                            onChange={(e) => updateField('details', e.target.value)}
                            placeholder={
                                type === 'feed' ? '母乳 / 配方奶' :
                                    type === 'sleep' ? '嬰兒床 / 小床' :
                                        type === 'diaper' ? '正常 / 稀便' :
                                            '詳細描述'
                            }
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text placeholder:text-momsafe-text-light/50 font-medium"
                            required
                        />
                    </div>

                    {/* 餵奶專屬 */}
                    {type === 'feed' && (
                        <div>
                            <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">奶量（ml）</label>
                            <input
                                type="number"
                                value={formData.milkAmount || ''}
                                onChange={(e) => updateField('milkAmount', Number(e.target.value))}
                                placeholder="120"
                                className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text placeholder:text-momsafe-text-light/50 font-medium"
                            />
                        </div>
                    )}

                    {/* 睡眠專屬 */}
                    {type === 'sleep' && (
                        <div>
                            <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">睡眠時長（分鐘）</label>
                            <input
                                type="number"
                                value={formData.sleepDuration || ''}
                                onChange={(e) => updateField('sleepDuration', Number(e.target.value))}
                                placeholder="90"
                                className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text placeholder:text-momsafe-text-light/50 font-medium"
                            />
                        </div>
                    )}

                    {/* 尿布專屬 */}
                    {type === 'diaper' && (
                        <div>
                            <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">便便顏色</label>
                            <div className="grid grid-cols-3 gap-3">
                                {(['yellow', 'green', 'brown'] as PoopColor[]).map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => updateField('poopColor', color)}
                                        className={`p-4 rounded-[1.5rem] transition-all duration-300 ${formData.poopColor === color
                                            ? 'bg-white ring-2 ring-momsafe-pink shadow-md transform scale-105'
                                            : 'bg-white hover:bg-gray-50 shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${color === 'yellow' ? 'bg-yellow-400' :
                                                color === 'green' ? 'bg-green-600' : 'bg-yellow-800'
                                                }`} />
                                            <div className="text-sm font-bold text-momsafe-text capitalize">{
                                                color === 'yellow' ? '黃色' : color === 'green' ? '綠色' : '褐色'
                                            }</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 副食品專屬 */}
                    {type === 'solid_food' && showSolidFood && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">食物類型</label>
                                <div className="relative">
                                    <select
                                        value={formData.solidFoodType || 'puree'}
                                        onChange={(e) => updateField('solidFoodType', e.target.value as SolidFoodType)}
                                        className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text appearance-none font-medium cursor-pointer"
                                    >
                                        <option value="puree">泥狀</option>
                                        <option value="mashed">塊狀</option>
                                        <option value="finger_food">手指食物</option>
                                        <option value="family_food">家庭餐</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-momsafe-text-light">
                                        ▼
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">份量（g）</label>
                                <input
                                    type="number"
                                    value={formData.solidFoodAmount || ''}
                                    onChange={(e) => updateField('solidFoodAmount', Number(e.target.value))}
                                    placeholder="50"
                                    className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text placeholder:text-momsafe-text-light/50 font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-3 bg-white p-4 rounded-[1.5rem] shadow-sm">
                                <input
                                    type="checkbox"
                                    checked={formData.foodAllergy || false}
                                    onChange={(e) => updateField('foodAllergy', e.target.checked)}
                                    className="w-5 h-5 accent-momsafe-pink rounded cursor-pointer"
                                />
                                <label className="text-sm font-bold text-momsafe-text cursor-pointer">出現過敏反應</label>
                            </div>
                        </>
                    )}

                    {/* 心情選擇器 */}
                    <div>
                        <label className="block text-sm font-bold text-momsafe-text mb-4 flex items-center gap-2 pl-2">
                            <Smile className="w-4 h-4 text-momsafe-yellow" />
                            寶寶心情
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                            {(Object.keys(MOOD_EMOJIS) as MoodType[]).map((mood) => (
                                <button
                                    key={mood}
                                    type="button"
                                    onClick={() => updateField('mood', mood)}
                                    className={`aspect-square rounded-[1rem] flex items-center justify-center transition-all ${formData.mood === mood
                                        ? 'bg-momsafe-yellow shadow-lg shadow-momsafe-yellow/20 transform scale-110'
                                        : 'bg-white hover:bg-gray-50 shadow-sm'
                                        }`}
                                >
                                    <div className="text-2xl">{MOOD_EMOJIS[mood]}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 體溫 */}
                    {showTemperature && (
                        <div>
                            <label className="block text-sm font-bold text-momsafe-text mb-2 flex items-center gap-2 pl-2">
                                <Thermometer className="w-4 h-4 text-momsafe-pink" />
                                體溫（°C）選填
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.temperature || ''}
                                onChange={(e) => updateField('temperature', Number(e.target.value))}
                                placeholder="36.5"
                                className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text placeholder:text-momsafe-text-light/50 font-medium"
                            />
                        </div>
                    )}

                    {/* 備註 */}
                    <div>
                        <label className="block text-sm font-bold text-momsafe-text mb-2 pl-2">備註</label>
                        <textarea
                            value={formData.note || ''}
                            onChange={(e) => updateField('note', e.target.value)}
                            placeholder="其他補充說明..."
                            rows={3}
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-2 focus:ring-momsafe-pink/20 outline-none text-momsafe-text placeholder:text-momsafe-text-light/50 font-medium resize-none leading-relaxed"
                        />
                    </div>

                    {/* 提交按鈕 */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-momsafe-pink hover:bg-momsafe-pink/90 text-white font-bold rounded-full text-lg shadow-lg shadow-momsafe-pink/30 transition-all hover:scale-105 active:scale-95 mt-4"
                    >
                        儲存記錄
                    </button>
                </form>
            </div>
        </div>
    );
}
