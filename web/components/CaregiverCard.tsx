'use client';

import { MapPin, Star, Shield, Award, TrendingUp } from 'lucide-react';
import type { Caregiver } from '@/lib/caregiverData';

interface CaregiverCardProps {
    caregiver: Caregiver;
    onClick?: () => void;
}

export default function CaregiverCard({ caregiver, onClick }: CaregiverCardProps) {
    const isNanny = caregiver.type === 'nanny';
    const isGold = caregiver.shieldLevel === 'gold';

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:scale-[1.02] overflow-hidden group"
        >
            {/* 卡片頂部 */}
            <div className="relative p-6 pb-4">
                {/* 認證徽章（浮動在右上角） */}
                <div className="absolute top-4 right-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg ${isGold
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900'
                        : 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white'
                        }`}>
                        <Shield className="w-4 h-4" />
                        {isGold ? '金盾' : '銀盾'}
                    </div>
                </div>

                {/* 大頭照和基本資訊 */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={caregiver.avatar}
                            alt={caregiver.name}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-gray-800 mb-1 truncate">
                            {caregiver.name}
                        </h3>

                        {/* 學校/年資 */}
                        <div className="text-sm text-gray-600 mb-2">
                            {isNanny ? (
                                <span>經驗 {caregiver.experience} 年</span>
                            ) : (
                                <span className="truncate block">{caregiver.school}</span>
                            )}
                        </div>

                        {/* 地點 */}
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{caregiver.location}</span>
                        </div>
                    </div>
                </div>

                {/* 評價和服務次數 */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-gray-800">{caregiver.rating}</span>
                        <span className="text-sm text-gray-500">({caregiver.reviewCount}則)</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>已服務 {caregiver.serviceCount} 次</span>
                    </div>
                </div>

                {/* 專長標籤 */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {caregiver.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${isGold
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-indigo-100 text-indigo-800'
                                }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* 銀盾專屬：測驗成績 */}
                {!isNanny && caregiver.testScore && (
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3 mb-4 border border-indigo-100">
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-bold text-indigo-900">
                                MomSafe 測驗：{caregiver.testScore} 分
                            </span>
                        </div>
                    </div>
                )}

                {/* 評價標籤統計 */}
                <div className="space-y-1 mb-4">
                    {caregiver.positiveTagsStats.slice(0, 2).map((stat) => (
                        <div key={stat.tag} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">#{stat.tag}</span>
                            <span className="font-bold text-green-600">{stat.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 卡片底部：價格和按鈕 */}
            <div className={`border-t px-6 py-4 ${isGold ? 'bg-amber-50 border-amber-100' : 'bg-indigo-50 border-indigo-100'
                }`}>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs text-gray-500 mb-1">
                            {caregiver.price.unit === 'month' ? '月費' : '時薪'}
                        </div>
                        <div className="font-bold text-2xl text-gray-800">
                            ${caregiver.price.min.toLocaleString()}
                            {caregiver.price.min !== caregiver.price.max && (
                                <span> - ${caregiver.price.max.toLocaleString()}</span>
                            )}
                        </div>
                        {caregiver.price.unit === 'hour' && caregiver.minHours && (
                            <div className="text-xs text-gray-500 mt-1">
                                最短預約 {caregiver.minHours} 小時
                            </div>
                        )}
                    </div>

                    <button className={`px-6 py-2 rounded-xl font-bold text-white transition-all group-hover:scale-110 ${isGold
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg hover:shadow-amber-200'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-200'
                        }`}>
                        查看詳情
                    </button>
                </div>
            </div>
        </div>
    );
}
