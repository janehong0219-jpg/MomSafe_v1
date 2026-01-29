'use client';

import { Heart, Shield, Sparkles, MapPin, Search, MessageSquare, Baby, Lightbulb } from 'lucide-react';

export default function BrandStoryPage() {
    return (
        <div className="min-h-screen bg-momsafe-cream pb-20">
            {/* Hero Section */}
            <div className="bg-momsafe-pink/10 pt-20 pb-16 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h2 className="text-momsafe-pink font-bold tracking-[0.2em] text-sm md:text-base uppercase flex items-center justify-center gap-2">
                        <span className="w-8 h-[2px] bg-momsafe-pink" />
                        BRAND STORY
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-black text-momsafe-text leading-tight">
                        MomSafe 媽咪護航 <br />
                        <span className="text-momsafe-pink">妳的育兒首航夥伴</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-8 space-y-12">
                {/* 緣起 Section */}
                <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-orange-200/10 border border-white/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-momsafe-pink/5 rounded-full -mr-16 -mt-16" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-momsafe-pink/20 rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-momsafe-pink" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-momsafe-text">緣起：那一刻，我們不讓妳獨自站在門外</h2>
                    </div>

                    <div className="space-y-6 text-momsafe-text-light text-lg leading-8">
                        <p>
                            在這個繁忙的城市裡，每一位推著嬰兒車的母親，都像是一位孤獨的艦長，駕駛著名為「育兒」的小船，駛向未知的海域。
                        </p>
                        <p>
                            故事的起點，來自許多媽媽共同的心碎時刻：也許是站在貼著「謝絕兒童」的精緻店門外，手足無措地安撫著哭泣的孩子，感受著周遭路人無聲的壓力；
                            或者是第一次將孩子交給陌生保母時，那種既需要幫手、卻又害怕受傷的忐忑。
                        </p>
                        <div className="bg-momsafe-cream p-6 rounded-3xl border-l-4 border-momsafe-pink italic">
                            我們發現，現代媽咪缺的不是資訊，而是 <span className="text-momsafe-pink font-bold">「信任」</span>；缺的不是導航，而是一條確保能安全抵達的 <span className="text-momsafe-pink font-bold">「友善路徑」</span>。
                        </div>
                        <p>
                            於是，MomSafe (媽咪護航) 誕生了。我們不只是一個 App，我們是妳在這趟育兒首航中，最堅定的塔台與副駕駛。
                        </p>
                    </div>
                </section>

                {/* 我們的承諾 Section */}
                <section className="space-y-6">
                    <div className="text-center space-y-2 mb-8">
                        <h2 className="text-3xl font-black text-momsafe-text">我們的承諾</h2>
                        <p className="text-momsafe-pink font-bold text-lg">將城市的「警示燈」，變成一路暢通的「綠燈」</p>
                    </div>

                    <div className="grid gap-6">
                        {/* Promise 1 */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-gray-50 flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-16 h-16 bg-momsafe-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-8 h-8 text-momsafe-green" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-black text-momsafe-text">1. 妳守護孩子，我們守護妳的路 (Friendly Map)</h3>
                                <p className="text-momsafe-text-light leading-7">
                                    帶孩子出門不該是一場踩地雷的冒險。當 Google Maps 只能告訴妳「哪裡有路」，MomSafe 告訴妳「哪裡有愛」。
                                    我們集結全台「特派員媽咪」的力量，為妳標記出城市裡的友善綠洲——哪裡的走道推車好過？哪裡的店員看到孩子會微笑？
                                    我們幫妳避開尷尬的紅燈雷區，讓妳的每一次出門，都是優雅的抵達。
                                </p>
                            </div>
                        </div>

                        {/* Promise 2 */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-gray-50 flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-16 h-16 bg-momsafe-yellow/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Search className="w-8 h-8 text-momsafe-yellow" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-black text-momsafe-text">2. 點亮黑箱，讓「神隊友」看得見 (Trust Engine)</h3>
                                <p className="text-momsafe-text-light leading-7">
                                    我們深知，將寶貝託付給陌生人需要多大的勇氣。因此，MomSafe 拒絕模糊的行情與不透明的履歷。
                                    我們建立比政府更嚴格的「雙軌分級審核」，並提供透明的行情計算機。在這裡，沒有資訊落差，只有經過嚴格驗證、值得信賴的「神隊友」。
                                </p>
                            </div>
                        </div>

                        {/* Promise 3 */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-gray-50 flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-16 h-16 bg-momsafe-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="w-8 h-8 text-momsafe-purple" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-black text-momsafe-text">3. 深夜三點的溫柔亮光 (AI Companion)</h3>
                                <p className="text-momsafe-text-light leading-7">
                                    在無數個餵奶的深夜，當全世界都睡了，只有妳還醒著。MomSafe 的「寶寶日記」不只是冰冷的紀錄工具，而是懂妳的夥伴。
                                    當妳紀錄下寶寶的哭鬧，我們的 AI 顧問會輕聲告訴妳：「辛苦了，寶寶可能是長牙了，試試看這樣安撫...」。
                                    我們在數據中注入溫度，將焦慮轉化為行動建議。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 願景 Section */}
                <section className="bg-momsafe-pink text-white p-10 md:p-16 rounded-[4rem] text-center space-y-8 relative overflow-hidden shadow-2xl shadow-momsafe-pink/30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />

                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black">願景：不讓妳孤單，也不讓妳受騙</h2>
                        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-medium">
                            MomSafe 相信，育兒不該是犧牲自我的苦行，而是一段與孩子共同成長的美好旅程。
                        </p>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                            <MapPin className="w-8 h-8 mx-auto mb-3" />
                            <p className="font-bold">我們用地圖，<br />對抗城市的冷漠。</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                            <Shield className="w-8 h-8 mx-auto mb-3" />
                            <p className="font-bold">我們用數據，<br />對抗市場的黑箱。</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                            <MessageSquare className="w-8 h-8 mx-auto mb-3" />
                            <p className="font-bold">我們用社群，<br />對抗育兒的孤單。</p>
                        </div>
                    </div>

                    <div className="relative z-10 pt-8 border-t border-white/20 max-w-2xl mx-auto">
                        <p className="text-xl md:text-2xl font-black leading-relaxed">
                            在這個生態系裡，每一位媽咪都是彼此的守護者。我們是 MomSafe 媽咪護航 —— 妳負責守護全世界最珍貴的寶貝，而我們，負責守護妳。
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
