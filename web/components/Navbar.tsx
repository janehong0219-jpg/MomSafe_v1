'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Baby, MapPin, BookOpen, MessageSquare, Shield, Users } from 'lucide-react'; // Added Users, Removed Menu, X, Trophy
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Removed AnimatePresence

const navigation = [
    { name: '寶寶日記', href: '/diary', icon: BookOpen },
    { name: '友善地圖', href: '/map', icon: MapPin },
    { name: '找神隊友', href: '/teammate', icon: Users }, // New
    { name: '媽咪圈', href: '/community', icon: MessageSquare }, // New
    { name: '我的護航', href: '/profile', icon: Shield }, // New
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-sm py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand Logo - Playful Bounce */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="bg-momsafe-pink p-2 rounded-full text-white shadow-lg shadow-momsafe-pink/30"
                            >
                                <Baby className="w-6 h-6" />
                            </motion.div>
                            <span className="font-bold text-2xl tracking-tight text-momsafe-text group-hover:text-momsafe-pink transition-colors">
                                MomSafe
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Jelly Hover */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative"
                                >
                                    <motion.div
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors relative z-10 ${isActive ? 'text-white' : 'text-momsafe-text-light hover:text-momsafe-pink'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="font-bold text-sm">{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-momsafe-pink rounded-full -z-10 shadow-lg shadow-momsafe-pink/30"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA Buttons - Pulse & Pop */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:block bg-white text-momsafe-pink border-2 border-momsafe-pink px-5 py-2.5 rounded-full font-bold text-sm hover:bg-pink-50 transition-colors shadow-sm"
                        >
                            登入
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: ["0px 4px 6px rgba(158, 214, 112, 0.2)", "0px 8px 15px rgba(158, 214, 112, 0.4)", "0px 4px 6px rgba(158, 214, 112, 0.2)"],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="bg-momsafe-pink hover:bg-momsafe-pink/90 text-white px-5 py-2 md:px-7 md:py-3 rounded-full font-bold text-xs md:text-sm shadow-md shadow-momsafe-pink/20"
                        >
                            免費註冊
                        </motion.button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
