'use client';

import { Milk, Moon, Baby, Droplet, Clock, MapPin, User } from 'lucide-react';
import { MOOD_EMOJIS } from '@/lib/diaryData';
import type { DiaryRecord } from './types';

interface RecordListProps {
    records: DiaryRecord[];
}

export default function RecordList({ records }: RecordListProps) {
    const getRecordIcon = (type: DiaryRecord['type']) => {
        switch (type) {
            case 'feed':
                return <Milk className="w-4 h-4" />;
            case 'sleep':
                return <Moon className="w-4 h-4" />;
            case 'diaper':
                return <Baby className="w-4 h-4" />;
            case 'solid_food':
                return <Droplet className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const getRecordColor = (type: DiaryRecord['type']) => {
        switch (type) {
            case 'feed':
                return { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-500', iconBg: 'bg-pink-100' };
            case 'sleep':
                return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', iconBg: 'bg-blue-100' };
            case 'diaper':
                return { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-500', iconBg: 'bg-orange-100' };
            case 'solid_food':
                return { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', iconBg: 'bg-yellow-100' };
            default:
                return { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-500', iconBg: 'bg-gray-100' };
        }
    };

    if (records.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <Baby className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">今天還沒有記錄</p>
                <p className="text-gray-400 text-xs mt-1">點擊底部按鈕開始記錄</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-600 mb-3 tracking-wide px-1">今日記錄</h3>

            {records.map((record) => {
                const colors = getRecordColor(record.type);
                const time = new Date(record.timestamp).toLocaleTimeString('zh-TW', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                return (
                    <div
                        key={record.id}
                        className={`${colors.bg} rounded-2xl p-4 border ${colors.border} transition-all hover:shadow-md`}
                    >
                        {/* 頂部：時間和類型 */}
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`${colors.iconBg} p-2 rounded-xl`}>
                                    <div className={colors.icon}>
                                        {getRecordIcon(record.type)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{record.title}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-gray-500">{time}</span>
                                        {record.mood && (
                                            <span className="text-sm">{MOOD_EMOJIS[record.mood]}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 協作者標記 */}
                            {record.isCollaborative && record.caregiverName && (
                                <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                                    <User className="w-3 h-3 text-blue-600" />
                                    <span className="text-[10px] font-medium text-blue-700">{record.caregiverName}</span>
                                </div>
                            )}
                        </div>

                        {/* 詳細資訊 */}
                        <div className="space-y-1 text-xs text-gray-600 ml-12">
                            <p>{record.details}</p>

                            {/* 特定類型的額外資訊 */}
                            {record.milkAmount && (
                                <p>• 奶量：{record.milkAmount} ml</p>
                            )}
                            {record.sleepDuration && (
                                <p>• 睡眠時長：{record.sleepDuration} 分鐘</p>
                            )}
                            {record.poopColor && (
                                <p>• 便便顏色：{record.poopColor}</p>
                            )}
                            {record.temperature && (
                                <p>• 體溫：{record.temperature}°C</p>
                            )}

                            {/* GPS 位置（協作者） */}
                            {record.gpsLocation && (
                                <div className="flex items-center gap-1 mt-2 text-[10px] text-blue-600">
                                    <MapPin className="w-3 h-3" />
                                    <span>{record.gpsLocation}</span>
                                </div>
                            )}

                            {/* 備註 */}
                            {record.note && (
                                <p className="mt-2 italic text-gray-500">💭 {record.note}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
