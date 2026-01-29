import { Shield, Coins, Users, Search } from 'lucide-react';

export default function TeammatePage() {
    return (
        <div className="min-h-screen bg-momsafe-cream py-24 pb-32 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-black text-momsafe-text">
                        找神隊友 <span className="text-momsafe-pink">Teammate</span>
                    </h1>
                    <p className="text-momsafe-text-light max-w-2xl mx-auto">
                        專業保母、陪玩夥伴與行情試算，解決您的托育剛需。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Pro Nanny */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-momsafe-yellow/20 rounded-2xl flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-momsafe-yellow" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">金盾級專業保母</h3>
                        <p className="text-gray-500 mb-6">經過嚴格審核與受訓的專業保母，提供最安心的托育服務。</p>
                        <button className="w-full py-3 rounded-xl bg-momsafe-yellow text-momsafe-text font-bold">
                            搜尋保母
                        </button>
                    </div>

                    {/* Play Partner */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-momsafe-green/20 rounded-2xl flex items-center justify-center mb-6">
                            <Users className="w-6 h-6 text-momsafe-green" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">銀盾級陪玩夥伴</h3>
                        <p className="text-gray-500 mb-6">大哥哥大姊姊陪伴玩耍，讓孩子放電，媽媽放鬆。</p>
                        <button className="w-full py-3 rounded-xl bg-momsafe-green text-white font-bold">
                            尋找夥伴
                        </button>
                    </div>

                    {/* Price & Check */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border border-gray-100 space-y-4">
                        <div className="w-12 h-12 bg-momsafe-pink/20 rounded-2xl flex items-center justify-center mb-2">
                            <Coins className="w-6 h-6 text-momsafe-pink" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">行情 & 查核</h3>
                        <div className="space-y-3">
                            <a href="/subsidy" className="block w-full py-3 px-4 rounded-xl border-2 border-momsafe-pink/20 text-center font-bold text-momsafe-pink hover:bg-pink-50 transition-colors">
                                透明行情計算機
                            </a>
                            <a href="/trust" className="block w-full py-3 px-4 rounded-xl border-2 border-gray-100 text-center font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                黑名單安心查
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
