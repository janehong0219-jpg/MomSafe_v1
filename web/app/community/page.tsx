import { MessageCircle, BookOpen, Star, HelpCircle } from 'lucide-react';
import Image from 'next/image';

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-momsafe-cream py-24 pb-32 px-4">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-black text-momsafe-text">
                        媽咪圈 <span className="text-momsafe-pink">Community</span>
                    </h1>
                    <p className="text-momsafe-text-light max-w-2xl mx-auto">
                        全台最大的媽咪互助社群，這裡有專家、有達人，還有懂妳的姐妹。
                    </p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:border-momsafe-pink transition-colors">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-gray-700">急救聊天室</span>
                    </button>
                    <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:border-momsafe-pink transition-colors">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-gray-700">專家專欄</span>
                    </button>
                    <button className="p-4 bg-white rounded-2xl shadow-sm border border-momsafe-pink ring-2 ring-pink-100 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-momsafe-pink">
                            <Star className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-momsafe-pink">達人帶路</span>
                    </button>
                    <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:border-momsafe-pink transition-colors">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-gray-700">匿名樹洞</span>
                    </button>
                </div>

                {/* KOL Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Star className="w-6 h-6 text-momsafe-pink fill-current" />
                            達人媽咪推薦
                        </h2>
                        <button className="text-momsafe-text-light text-sm font-bold hover:text-momsafe-pink">更看多 &rarr;</button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
                                <div className="h-48 bg-gray-200 relative">
                                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                                        育兒好物
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-300" />
                                        <span className="font-bold text-sm text-gray-600">林叨囝仔</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-momsafe-pink transition-colors">
                                        【開箱】2025 最強外出神器！這款推車能不能買？
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2">
                                        帶五個小孩出門真的是大工程，最近入手的這款推車真的拯救了我...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
