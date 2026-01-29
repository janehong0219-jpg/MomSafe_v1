'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "張小姐",
        role: "新手媽媽",
        text: "MomSafe 真的救了我！第一次找保母很緊張，還好有透明的評價機制。",
        rating: 5
    },
    {
        name: "王太太",
        role: "職業婦女",
        text: "托育地圖太好用了，讓我輕鬆找到離公司近的友善廁所。",
        rating: 5
    },
    {
        name: "李先生",
        role: "二寶爸",
        text: "補助試算功能幫我省下好多時間，一目了然！",
        rating: 5
    }
];

export default function FounderStory() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Founder Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center md:justify-end"
                    >
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                            {/* Decorative Circle */}
                            <div className="absolute inset-0 rounded-full border-2 border-momsafe-pink/30 scale-110 animate-spin-slow" style={{ animationDuration: '20s' }} />
                            <div className="absolute inset-0 rounded-full border-2 border-momsafe-yellow/30 scale-125 animate-reverse-spin" style={{ animationDuration: '25s' }} />

                            {/* Main Image Container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-momsafe-pink/20">
                                <Image
                                    src="/images/founder.png"
                                    alt="MomSafe Founder"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring' }}
                                className="absolute bottom-0 right-4 lg:right-0 bg-white p-4 rounded-2xl shadow-xl border border-gray-50"
                            >
                                <p className="font-bold text-gray-800 text-sm">MomSafe 主理人</p>
                                <p className="text-momsafe-pink font-black text-lg">J</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 text-center md:text-left"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
                            MomSafe <span className="text-momsafe-pink">品牌故事</span>
                        </h2>

                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                過去，我以為育兒的困難在於「哄睡」或「餵奶」，直到我看見朋友為了找保母，在幾十個臉書社團裡大海撈針；直到我看到新聞上，一位母親因為不知道店家規定，抱著孩子尷尬地站在甜甜圈店門外。
                            </p>
                            <p>
                                那一刻我意識到，現代育兒的困境，不在於父母不夠愛孩子，而在於社會的支持系統是破碎的。
                            </p>
                            <p className="font-bold text-gray-800">
                                「資訊不對稱」讓找保母像在賭博；「空間不友善」讓帶孩子出門像在踩地雷。
                            </p>
                            <p>
                                身為一個擅長整合資源的「局外人」，我希望能運用科技與數據，為您搭建一個<span className="text-momsafe-pink font-bold">「透明、友善、可預期」</span>的護航系統。
                            </p>
                            <p>
                                育兒這場仗，您負責守護孩子，MomSafe 負責守護您。
                            </p>
                        </div>

                        <div className="pt-4">
                            <button className="bg-momsafe-text text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-gray-200">
                                閱讀更多品牌故事
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Success Cases (Testimonials) */}
                <div className="relative">
                    <div className="text-center mb-16 space-y-4">
                        <span className="bg-momsafe-green/10 text-momsafe-green px-4 py-1.5 rounded-full text-sm font-bold">
                            好評推薦
                        </span>
                        <h2 className="text-3xl font-black text-gray-800">
                            來自 10,000+ 個家庭的<span className="text-momsafe-pink">安心見證</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="bg-momsafe-cream p-8 rounded-[2rem] relative"
                            >
                                <Quote className="absolute top-8 right-8 w-10 h-10 text-momsafe-pink/10 fill-current" />
                                <div className="flex gap-1 mb-4">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                                    "{item.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-momsafe-pink/20 flex items-center justify-center font-bold text-momsafe-pink">
                                        {item.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
