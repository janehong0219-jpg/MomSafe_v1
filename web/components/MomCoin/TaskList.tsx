'use client';

import { MapPin, TrendingUp } from 'lucide-react';
import type { Task } from '@/lib/momcoin';

interface TaskListProps {
    tasks: Task[];
    onCompleteTask: (taskId: string) => void;
}

export default function TaskList({ tasks, onCompleteTask }: TaskListProps) {
    const getTaskIcon = (category: Task['category']) => {
        switch (category) {
            case 'lbs':
                return '📍';
            case 'dispute':
                return '🍩⚔️';
            case 'review':
                return '✍️';
            case 'community':
                return '🤝';
            default:
                return '🎯';
        }
    };

    const getCategoryColor = (category: Task['category']) => {
        switch (category) {
            case 'lbs':
                return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' };
            case 'dispute':
                return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' };
            case 'review':
                return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' };
            case 'community':
                return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">✨</div>
                <p className="text-gray-600 text-sm">目前沒有可用任務</p>
                <p className="text-gray-400 text-xs mt-1">稍後再回來看看吧！</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => {
                const colors = getCategoryColor(task.category);

                return (
                    <div
                        key={task.id}
                        className={`${colors.bg} rounded-2xl p-4 border-2 ${colors.border} transition-all hover:shadow-md`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="text-2xl">{getTaskIcon(task.category)}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 text-sm mb-1">{task.title}</h3>
                                    <p className="text-xs text-gray-600">{task.description}</p>

                                    {/* LBS 任務顯示位置 */}
                                    {task.location && (
                                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                            <MapPin className="w-3 h-3" />
                                            <span>{task.location.name}</span>
                                            {task.location.distance && (
                                                <span className="text-gray-400">· {Math.round(task.location.distance)}m</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 獎勵金額 */}
                            <div className="text-right ml-3">
                                <div className="flex items-center gap-1">
                                    <span className="text-xl font-bold text-amber-600">+{task.reward}</span>
                                    <span className="text-2xl">💰</span>
                                </div>
                                <div className="text-[10px] text-gray-400">MomCoin</div>
                            </div>
                        </div>

                        {/* 完成按鈕 */}
                        <button
                            onClick={() => onCompleteTask(task.id)}
                            className={`w-full ${colors.bg} border-2 ${colors.border} ${colors.text} py-2 rounded-xl font-bold text-sm hover:bg-white transition-all hover:scale-105`}
                        >
                            立即完成
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
