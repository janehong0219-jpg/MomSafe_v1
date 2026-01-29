'use client';

import { Shield, CheckCircle2, AlertTriangle, Lock, Eye, FileCheck, Heart, Users, Star, MessageCircle, TrendingUp } from 'lucide-react';
import CaregiverCheck from '@/components/CaregiverCheck';

export default function TrustSystemPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* 頁面標題 */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Shield className="w-12 h-12 text-momsafe-pink" />
                    <h1 className="text-4xl font-bold text-gray-800">MomSafe 信任機制</h1>
                </div>
                <p className="text-xl text-gray-600">比政府更嚴格、比臉書更透明的信任體系</p>
                <p className="text-gray-500 mt-2">證照只能證明技能下限，無法保證人品上限</p>
            </div>

            {/* 核心理念 */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 mb-12 border-2 border-momsafe-pink">
                <div className="flex items-start gap-4 mb-6">
                    <Heart className="w-8 h-8 text-momsafe-pink flex-shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">我們的核心理念</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            MomSafe 採用<span className="font-bold text-momsafe-pink">「雙軌分級審核機制」</span>搭配<span className="font-bold text-momsafe-pink">「動態行為監測」</span>，
                            將審核從「一次性的證照檢查」轉變為<span className="font-bold">「持續性的信任累積」</span>。
                        </p>
                    </div>
                </div>
            </div>

            {/* 雙軌分級審核 */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">一、雙軌分級審核機制</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* 金盾級 */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-6">
                        <div className="flex items-center gap-3 text-amber-900">
                            <Shield className="w-8 h-8" />
                            <h3 className="text-2xl font-bold">🟡 金盾級 - 專業保母</h3>
                        </div>
                        <p className="text-amber-800 mt-2">法規合規性 + 背景清查</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                <FileCheck className="w-5 h-5 text-amber-600" />
                                硬性門檻
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">居家式托育服務登記證</span>（非單純技術士證，代表已向政府納管）</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-gray-800 mb-3">必備文件</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">良民證</span>（警察刑事紀錄證明）：確保無犯罪紀錄</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">健康檢查報告</span>：排除傳染病風險</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">勞健保證明</span>：保障服務期間權益</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-gray-800 mb-3">技術驗證</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">AI 證件辨識</span>：自動檢測證件真偽與有效期限</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">人臉比對</span>：確保證件與本人相符，杜絕借牌上工</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 銀盾級 */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-6">
                        <div className="flex items-center gap-3 text-white">
                            <Shield className="w-8 h-8" />
                            <h3 className="text-2xl font-bold">🔵 銀盾級 - 陪玩夥伴</h3>
                        </div>
                        <p className="text-indigo-100 mt-2">身分真實性 + 基礎安全培訓</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-600" />
                                可追溯的真實身分
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">在學/畢業證明</span>：上傳學生證，綁定學校 Email<br />
                                        <span className="text-sm text-gray-500">（跑得了和尚跑不了廟，利用「校譽」作為擔保）</span></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">良民證</span>：不論層級都必須要求的底線</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-gray-800 mb-3">MomSafe 微證書</h4>
                            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                <p className="text-gray-700 mb-3">
                                    30 分鐘線上<span className="font-bold text-indigo-900">「基礎安撫與急救測驗」</span>
                                </p>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li>• 紅線安全意識（40%）- 異物哽塞、環境風險、過敏原管理</li>
                                    <li>• 情緒安撫技巧（30%）- 分離焦慮、公共場所應對</li>
                                    <li>• 服務邊界認知（20%）- 不執行醫療行為、數位隱私</li>
                                    <li>• 平台操作規範（10%）- 簽到、日誌、緊急回報</li>
                                </ul>
                                <p className="text-xs text-orange-700 mt-3 font-bold">
                                    ⚠️ 紅線題答錯一題即淘汰，確保基本安全觀念
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-gray-800 mb-3">證書管理</h4>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li className="flex items-start gap-2">
                                    <TrendingUp className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-bold">有效期 6 個月</span>，期滿需重新進行 10 分鐘複習測驗</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <span>家長端顯示：「已通過基礎安撫與安全測驗，適合陪伴玩耍、共讀」</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 動態信任機制 */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">二、動態信任機制</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
                執照是靜態的，人的行為是動態的。我們建立持續性的信任累積系統。
            </p>

            <div className="space-y-8 mb-16">
                {/* 協作日記 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="bg-pink-100 p-3 rounded-xl">
                            <FileCheck className="w-8 h-8 text-momsafe-pink" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">1. 強制簽到與「協作日記」</h3>
                            <p className="text-gray-600 mb-4">虐童往往發生在「黑箱」環境，我們用數位足跡建立透明度</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">服務開始時</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>必須在 App 上 <span className="font-bold">GPS 簽到打卡</span></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>開啟「協作日記」權限</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">服務期間</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>每 2 小時簡單紀錄（換尿布、喝水、遊戲內容）</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>上傳一張現況照片</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-orange-50 rounded-xl p-4 mt-4 border border-orange-200">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-orange-900">AI 異常監測</p>
                                        <p className="text-sm text-orange-800 mt-1">
                                            若保母長時間未紀錄，或紀錄頻率異常，系統主動推播提醒家長：<br />
                                            「保母已 3 小時未更新動態，建議您關心一下。」
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 驗證後評論 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <MessageCircle className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">2. 驗證後評論系統</h3>
                            <p className="text-gray-600 mb-4">只有真實服務過的家長才能評價，杜絕假評論</p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">嚴格驗證機制</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span>只有<span className="font-bold">「透過平台付款且完成服務」</span>的家長才能評論</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Star className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                            <span>不只星級評分，更有<span className="font-bold">具體行為標籤</span></span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">行為標籤系統</h4>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">#不滑手機</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">#會主動洗手</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">#情緒穩定</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">#守時準時</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">#孩子很喜歡</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        統計顯示如：「92% 家長認為她 #不滑手機」，比星級更具參考價值
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">透明度指標</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                            <span><span className="font-bold">退托率揭露</span>：若過去頻繁被「退貨」，系統標示「高流動率風險」</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                            <span><span className="font-bold">服務統計</span>：累計托育時數、完成次數一目了然</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI 心理快篩 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <Eye className="w-8 h-8 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">3. AI 心理/情緒快篩</h3>
                            <p className="text-gray-600 mb-4">創新的預防性審核機制</p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">運作機制</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>註冊時使用 <span className="font-bold">LLM（大型語言模型）</span>分析自我介紹用詞</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>持續分析與家長的對話紀錄</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                    <p className="font-bold text-purple-900 mb-2">預警機制</p>
                                    <p className="text-sm text-purple-800">
                                        若頻繁出現情緒性、急躁或負面字眼，系統在後台標記為<span className="font-bold">「潛在風險帳號」</span>，
                                        並由人工介入審核，在問題發生前就預防風險。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 服務範圍區隔 */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">三、明確的服務範圍區隔</h2>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-pink-100 to-purple-100">
                        <tr>
                            <th className="px-6 py-4 text-left font-bold text-gray-800">比較項目</th>
                            <th className="px-6 py-4 text-left font-bold text-amber-900">🟡 專業保母</th>
                            <th className="px-6 py-4 text-left font-bold text-indigo-900">🔵 陪玩夥伴</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-100">
                            <td className="px-6 py-4 font-bold text-gray-700">適用場景</td>
                            <td className="px-6 py-4 text-gray-700">換尿布、餵奶、洗澡、全日托育</td>
                            <td className="px-6 py-4 text-gray-700">唸繪本、玩積木、公園放電、家長在家時的替手</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            <td className="px-6 py-4 font-bold text-gray-700">技能要求</td>
                            <td className="px-6 py-4 text-gray-700">具備醫療與護理知識</td>
                            <td className="px-6 py-4 text-gray-700">具備耐心、體力好、有創意</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                            <td className="px-6 py-4 font-bold text-gray-700">系統提示</td>
                            <td className="px-6 py-4 text-gray-700">允許執行侵入性或生理照顧</td>
                            <td className="px-6 py-4">
                                <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                                    <p className="text-orange-900 font-bold text-sm">⚠️ 系統會彈窗提醒家長</p>
                                    <p className="text-orange-800 text-sm mt-1">「陪玩夥伴不建議執行餵奶、洗澡等專業照護」</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 黑名單機制 */}
            <div className="mb-16">
                <CaregiverCheck />
            </div>

            {/* 總結 */}
            <div className="bg-gradient-to-br from-momsafe-pink to-purple-400 rounded-2xl p-12 text-center text-white">
                <Shield className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">比政府更嚴格、比臉書更透明</h2>
                <p className="text-xl mb-6">
                    MomSafe 賣的不只是媒合，<br />
                    而是一套完整的<span className="font-bold">信任體系</span>
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">雙軌分級審核</div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">動態行為監測</div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">AI智能預警</div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">透明評價系統</div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">黑名單永久封鎖</div>
                </div>
            </div>
        </div>
    );
}
