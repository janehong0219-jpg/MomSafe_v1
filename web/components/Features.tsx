'use client';

import { MapPin, Users, BookOpen, Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Pillars = [
    {
        title: '安心出門',
        subtitle: 'Safe Outing',
        desc: '從找廁所到避雷指南，我們標示了城市中每一個對媽咪友善的角落。',
        icon: <MapPin className="w-8 h-8 text-green-700" />,
        color: 'bg-green-100', // Stronger bg
        border: 'border-green-200',
        hover: 'group-hover:bg-green-200',
        tags: ['友善地圖', '推車微導航', '親子車廂'],
        href: '/map'
    },
    {
        title: '找神隊友',
        subtitle: 'Find Partner',
        desc: '無論是專業保母或陪玩哥哥姊姊，皆經過雙軌身分認證與紅線測試。',
        icon: <Users className="w-8 h-8 text-pink-700" />,
        color: 'bg-pink-100',
        border: 'border-pink-200',
        hover: 'group-hover:bg-pink-200',
        tags: ['雙軌審核', '行情透視鏡', '黑名單查詢'],
        href: '/price'
    },
    {
        title: '寶寶管家',
        subtitle: 'Baby Manager',
        desc: '全自動記錄寶寶生活，AI 隨時分析生長曲線與異常狀況，隱私由您掌控。',
        icon: <BookOpen className="w-8 h-8 text-blue-700" />,
        color: 'bg-blue-100',
        border: 'border-blue-200',
        hover: 'group-hover:bg-blue-200',
        tags: ['成長日記', 'AI 顧問', '隱私鎖'],
        href: '/diary'
    },
    {
        title: '精算補助',
        subtitle: 'Subsidy Calc',
        desc: '別讓您的權益睡著了！輸入戶籍地，系統自動算出您應得的每一筆津貼。',
        icon: <Calculator className="w-8 h-8 text-purple-700" />,
        color: 'bg-purple-100',
        border: 'border-purple-200',
        hover: 'group-hover:bg-purple-200',
        tags: ['一鍵試算', '公托抽籤', '進度追蹤'],
        href: '/subsidy'
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-momsafe-pink font-bold tracking-wider text-sm uppercase mb-2 block">Our Core Pillars</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-momsafe-text mb-6">
                        四大核心支柱，<br className="md:hidden" />守護您的育兒之路
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        我們將繁瑣的育兒任務拆解為四個簡單的情境，讓您單手就能解決問題。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Pillars.map((pillar, index) => (
                        <Link
                            href={pillar.href}
                            key={index}
                            className={`group p-8 rounded-[2rem] bg-white border-2 border-transparent hover:border-momsafe-pink hover:bg-momsafe-cream transition-all duration-300 relative overflow-hidden`}
                        >
                            {/* Top Icon */}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors bg-white shadow-sm group-hover:scale-110 duration-300`}>
                                {pillar.icon}
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{pillar.title}</h3>
                            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-4">{pillar.subtitle}</p>

                            <p className="text-gray-600 leading-relaxed mb-6 h-20">
                                {pillar.desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {pillar.tags.map(tag => (
                                    <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action */}
                            <div className="flex items-center text-sm font-bold text-momsafe-text group-hover:text-momsafe-pink transition-colors">
                                了解更多 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>

                            {/* Hover Decoration */}
                            <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${pillar.color}`} />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
