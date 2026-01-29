'use client';

import { useState, useMemo } from 'react';
import { Users, Baby, Shield, AlertCircle } from 'lucide-react';
import CaregiverCard from '@/components/CaregiverCard';
import CaregiverFilter, { type FilterOptions } from '@/components/CaregiverFilter';
import { SAMPLE_NANNIES, SAMPLE_PLAYMATES, type Caregiver } from '@/lib/caregiverData';

export default function PricePage() {
    const [activeTab, setActiveTab] = useState<'nanny' | 'playmate'>('nanny');
    const [filters, setFilters] = useState<FilterOptions>({
        location: '全部地區',
        minPrice: 20000,
        maxPrice: 35000,
        minRating: 0,
        availability: '全部時段',
        sortBy: 'rating',
    });

    const isNannyMode = activeTab === 'nanny';

    // 篩選和排序邏輯
    const filteredCaregivers = useMemo(() => {
        const data = isNannyMode ? SAMPLE_NANNIES : SAMPLE_PLAYMATES;

        let result = data.filter((caregiver) => {
            // 地區篩選
            if (filters.location !== '全部地區' && !caregiver.location.includes(filters.location)) {
                return false;
            }

            // 價格篩選
            const price = caregiver.price.min;
            if (price < filters.minPrice || price > filters.maxPrice) {
                return false;
            }

            // 評價篩選
            if (caregiver.rating < filters.minRating) {
                return false;
            }

            // 時段篩選（簡化版）
            if (filters.availability !== '全部時段') {
                const availStr = caregiver.availableDays.join(',');
                if (filters.availability === '平日' && !availStr.includes('週')) {
                    return false;
                }
                if (filters.availability === '週末' && !(availStr.includes('週六') || availStr.includes('週日'))) {
                    return false;
                }
            }

            return true;
        });

        // 排序
        result.sort((a, b) => {
            switch (filters.sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'price-low':
                    return a.price.min - b.price.min;
                case 'price-high':
                    return b.price.min - a.price.min;
                case 'experience':
                    return (b.experience || b.serviceCount) - (a.experience || a.serviceCount);
                default:
                    return 0;
            }
        });

        return result;
    }, [isNannyMode, filters]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* 頁面標題 */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <Users className="w-10 h-10 text-momsafe-pink" />
                    <h1 className="text-4xl font-bold text-gray-800">找神隊友</h1>
                </div>
                <p className="text-gray-500 text-lg">經過嚴格審核的專業保母和陪玩夥伴</p>
            </div>

            {/* 分類切換 Tab */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('nanny')}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${activeTab === 'nanny'
                            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <Shield className="w-6 h-6" />
                    🟡 找保母（金盾級）
                </button>

                <button
                    onClick={() => setActiveTab('playmate')}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${activeTab === 'playmate'
                            ? 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <Baby className="w-6 h-6" />
                    🔵 找陪玩夥伴（銀盾級）
                </button>
            </div>

            {/* 說明橫幅 */}
            <div className={`mb-8 p-6 rounded-2xl border-2 ${isNannyMode
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-purple-50 border-purple-200'
                }`}>
                <div className="flex items-start gap-4">
                    {isNannyMode ? (
                        <>
                            <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-amber-900 mb-2">
                                    專業保母服務
                                </h3>
                                <p className="text-amber-800">
                                    ✓ 可提供全日托育、換尿布、餵奶等專業照護<br />
                                    ✓ 持有托育登記證與相關專業證照<br />
                                    ✓ 勞健保齊全，保障您的權益
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <AlertCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-purple-900 mb-2">
                                    陪玩夥伴服務
                                </h3>
                                <p className="text-purple-800">
                                    <span className="font-bold text-orange-700">⚠️ 服務限制：</span>
                                    陪玩夥伴僅限陪伴玩耍、共讀繪本、戶外活動<br />
                                    <span className="font-bold">不執行</span>：換尿布、餵藥、洗澡等醫療或侵入性行為<br />
                                    ✓ 已通過 MomSafe 安全測驗與基礎急救訓練
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 主要內容區 */}
            <div className="grid lg:grid-cols-4 gap-8">
                {/* 左側篩選器 */}
                <div className="lg:col-span-1">
                    <CaregiverFilter
                        onFilterChange={setFilters}
                        isNannyMode={isNannyMode}
                    />
                </div>

                {/* 右側人員列表 */}
                <div className="lg:col-span-3">
                    {/* 結果數量 */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-gray-600">
                            找到 <span className="font-bold text-momsafe-pink text-xl">{filteredCaregivers.length}</span> 位符合條件的{isNannyMode ? '保母' : '陪玩夥伴'}
                        </p>
                    </div>

                    {/* 人員卡片網格 */}
                    {filteredCaregivers.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                            {filteredCaregivers.map((caregiver) => (
                                <CaregiverCard
                                    key={caregiver.id}
                                    caregiver={caregiver}
                                    onClick={() => {
                                        // TODO: 打開詳細頁面 Modal
                                        console.log('查看詳情:', caregiver.name);
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-2">找不到符合條件的夥伴</p>
                            <p className="text-gray-400">試試調整篩選條件或切換分類</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
