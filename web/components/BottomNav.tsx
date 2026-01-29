'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Map, Users, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { name: '日記', href: '/diary', icon: BookOpen },
    { name: '地圖', href: '/map', icon: Map },
    { name: '神隊友', href: '/teammate', icon: Users },
    { name: '媽咪圈', href: '/community', icon: MessageCircle },
    { name: '我的', href: '/profile', icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();

    // Hide on desktop
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative flex flex-col items-center gap-1 w-full"
                        >
                            <div className="relative p-1.5">
                                <Icon
                                    className={`w-6 h-6 transition-colors ${isActive ? 'text-momsafe-pink' : 'text-gray-400'
                                        }`}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="bottom-nav-indicator"
                                        className="absolute inset-0 bg-momsafe-pink/10 rounded-xl -z-10 scale-125"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <span className={`text-[10px] font-bold transition-colors ${isActive ? 'text-momsafe-pink' : 'text-gray-400'
                                }`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
