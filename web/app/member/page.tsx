'use client';

import Link from 'next/link';
import { User, Coins, FileText, MessageSquare, Shield, HelpCircle } from 'lucide-react';

const menuSections = [
    {
        title: '會員管理',
        items: [
            { name: '會員中心', href: '/member/profile', icon: User, description: '個人資料管理', highlight: false },
            { name: 'MomCoin 錢包', href: '/momcoin', icon: Coins, description: '點數兌換商城入口', badge: '285', highlight: false },
        ],
    },
    {
        title: '內容管理',
        items: [
            { name: '文章管理', href: '/member/articles', icon: FileText, description: '我的文章', highlight: false },
            { name: '話題管理', href: '/member/topics', icon: MessageSquare, description: '我的話題', highlight: false },
        ],
    },
    {
        title: '實用工具',
        items: [
            { name: '補助算盤', href: '/subsidy', icon: Coins, description: '托育補助試算器', highlight: true },
            { name: '我的特派員等級', href: '/member/badges', icon: Shield, description: '徽章與成就', highlight: false },
        ],
    },
    {
        title: '關於我們',
        items: [
            { name: '品牌故事', href: '/brand-story', icon: HelpCircle, description: '了解 MomSafe 的初衷與願景', highlight: false },
            { name: '文章發表守則', href: '/member/article-rules', icon: FileText, description: '社群規範', highlight: false },
            { name: '話題發表守則', href: '/member/topic-rules', icon: MessageSquare, description: '討論規範', highlight: false },
        ],
    },
];

export default function MemberPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-100 to-cyan-100 px-6 pt-12 pb-8 rounded-b-[3rem]">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700 tracking-wide">🏠 我的護航</h1>
                        <p className="text-gray-500 text-sm mt-1 font-light">個人資產與工具管理</p>
                    </div>
                    <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 -mt-6 space-y-4 pb-8">
                {menuSections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-600 mb-4 px-1">{section.title}</h2>
                        <div className="space-y-2">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${item.highlight
                                            ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 hover:shadow-lg'
                                            : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.highlight ? 'bg-amber-200' : 'bg-blue-100'
                                            }`}>
                                            <Icon className={`w-5 h-5 ${item.highlight ? 'text-amber-700' : 'text-blue-600'
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm text-gray-800">{item.name}</span>
                                                {item.badge && (
                                                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {item.highlight && <span className="text-lg">⭐</span>}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Auth Buttons (Mobile) */}
                <div className="md:hidden space-y-3 pt-4">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all">
                        登入帳號
                    </button>
                    <button className="w-full bg-momsafe-pink hover:bg-pink-400 text-white py-3 rounded-xl font-bold transition-all">
                        免費註冊
                    </button>
                </div>
            </div>
        </div>
    );
}
