import { User, Wallet, Calculator, HelpCircle, ChevronRight, Settings, Shield } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-momsafe-cream py-24 pb-32 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold text-momsafe-text pl-2">我的護航</h1>

                {/* User Card */}
                <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="w-20 h-20 bg-momsafe-pink/20 rounded-full flex items-center justify-center text-momsafe-pink">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">快樂的媽咪</h2>
                        <p className="text-momsafe-text-light text-sm">MomSafe 加入第 128 天</p>
                        <div className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                            <Shield className="w-3 h-3 fill-current" />
                            金盾會員
                        </div>
                    </div>
                </div>

                {/* Wallet */}
                <div className="bg-momsafe-pink text-white p-8 rounded-[2.5rem] shadow-lg shadow-momsafe-pink/30 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-pink-100 text-sm font-bold mb-1">MomCoin 錢包餘額</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black">1,250</span>
                            <span className="text-sm">點</span>
                        </div>
                        <button className="mt-4 bg-white text-momsafe-pink px-6 py-2 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-shadow">
                            前往兌換
                        </button>
                    </div>
                    <Wallet className="absolute -bottom-4 -right-4 w-32 h-32 text-white/20 rotate-12" />
                </div>

                {/* Tools */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        <a href="/subsidy" className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-gray-700">補助試算</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        </a>
                        <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <HelpCircle className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-gray-700">關於我們 / 客服</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        </button>
                        <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-gray-700">系統設定</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
