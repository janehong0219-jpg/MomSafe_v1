'use client';

import Link from 'next/link';
import { Calendar, TrendingUp, Lock, BarChart3 } from 'lucide-react';

const subMenuItems = [
    {
        name: '每日紀錄',
        href: '/diary',
        icon: Calendar,
        description: '吃睡便便 AI 建議',
    },
    {
        name: '成長曲線',
        href: '/diary/growth',
        icon: TrendingUp,
        description: '身高體重追蹤',
    },
    {
        name: '隱私鎖設定',
        href: '/diary/privacy',
        icon: Lock,
        description: 'AI 授權開關',
    },
    {
        name: '協作日記',
        href: '/diary/collaboration',
        icon: BarChart3,
        description: '保母共享模式',
    },
];

export default function DiaryNav() {
    return (
        <div className="bg-gradient-to-b from-[#B5E7D3] to-[#D4F1E6] rounded-b-3xl px-6 py-8 mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">📒 寶寶日記功能</h2>
            <div className="grid grid-cols-2 gap-3">
                {subMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 hover:bg-white hover:shadow-lg transition-all"
                        >
                            <Icon className="w-6 h-6 text-[#5CB89A] mb-2" />
                            <div className="font-bold text-sm text-gray-800">{item.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
