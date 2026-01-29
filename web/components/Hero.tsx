'use client';

import Link from 'next/link';
import { Shield, Search, Heart, Star, Baby, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const quickActions = [
    {
        title: "友善地圖",
        desc: "尋找哺乳室/親子友善廁所",
        icon: <MapPin className="w-6 h-6 text-momsafe-green" />,
        href: "/map",
        bgColor: "bg-momsafe-green/10",
        hoverColor: "group-hover:bg-momsafe-green/20"
    },
    {
        title: "補助試算",
        desc: "全台托育補助一鍵試算",
        icon: <Star className="w-6 h-6 text-momsafe-yellow" />,
        href: "/subsidy",
        bgColor: "bg-momsafe-yellow/10",
        hoverColor: "group-hover:bg-momsafe-yellow/20"
    },
    {
        title: "育兒日記",
        desc: "紀錄寶寶成長點滴",
        icon: <Heart className="w-6 h-6 text-momsafe-purple" />,
        href: "/diary",
        bgColor: "bg-momsafe-purple/10",
        hoverColor: "group-hover:bg-momsafe-purple/20"
    },
    {
        title: "信任機制",
        desc: "查看保母/托嬰中心評價",
        icon: <Shield className="w-6 h-6 text-momsafe-blue" />,
        href: "/trust",
        bgColor: "bg-momsafe-blue/10",
        hoverColor: "group-hover:bg-momsafe-blue/20"
    }
];

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-momsafe-cream py-20 lg:py-28">
            {/* Animated Decorative Blobs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-20 -left-20 w-80 h-80 bg-momsafe-green/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute top-40 right-10 w-60 h-60 bg-momsafe-pink/10 rounded-full blur-3xl opacity-60"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -bottom-10 left-1/3 w-96 h-96 bg-momsafe-purple/10 rounded-full blur-3xl"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100/50 relative"
                        >
                            <p className="text-momsafe-text-light text-base md:text-lg leading-8 text-justify">
                                「MomSafe 相信，母親的腳步不該被焦慮束縛。我們將繁瑣的法規、混亂的行情與未知的環境，轉化為您身後最堅定的支持。讓科技化作無聲的體貼，陪您寫下更多與孩子的溫暖故事。」
                            </p>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-black text-momsafe-text leading-tight tracking-tight"
                        >
                            安心育兒，
                            <span className="block text-momsafe-pink mt-2">從這裡開始。</span>
                        </motion.h1>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative max-w-lg"
                        >
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-14 pr-4 py-5 rounded-full border-2 border-gray-100 bg-white placeholder-gray-400 focus:outline-none focus:border-momsafe-pink focus:ring-4 focus:ring-momsafe-pink/10 shadow-lg shadow-gray-100 text-lg transition-all"
                                placeholder="搜尋保母 / 托嬰中心 / 友善設施..."
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-momsafe-text hover:bg-gray-800 text-white px-8 rounded-full font-bold transition-transform hover:scale-105 active:scale-95">
                                搜尋
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Content - Mock UI or Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {/* Mock Phone UI Container */}
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-[3rem] p-6 shadow-2xl border-8 border-white ring-4 ring-gray-50 h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-8 bg-gray-100 z-10" />
                                <div className="space-y-4 pt-8">
                                    <div className="h-40 bg-momsafe-pink/20 rounded-3xl w-full" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider">今日行程</p>
                                        <p className="font-bold mt-1">預防針接種</p>
                                        <p className="text-xs mt-2 opacity-90">14:00 兒科</p>
                                    </div>
                                    <div className="bg-momsafe-yellow p-6 rounded-3xl text-momsafe-text shadow-lg shadow-momsafe-yellow/20 border-none">
                                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider">營養補給</p>
                                        <p className="font-bold mt-1">副食品推薦</p>
                                        <p className="text-xs mt-2 opacity-90">南瓜泥嘗試</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
