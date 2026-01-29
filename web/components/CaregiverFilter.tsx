'use client';

import { useState } from 'react';
import { SlidersHorizontal, MapPin, DollarSign, Star, Calendar } from 'lucide-react';
import { LOCATION_OPTIONS } from '@/lib/caregiverData';

export interface FilterOptions {
    location: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    availability: string;
    sortBy: string;
}

interface CaregiverFilterProps {
    onFilterChange: (filters: FilterOptions) => void;
    isNannyMode: boolean;
}

export default function CaregiverFilter({ onFilterChange, isNannyMode }: CaregiverFilterProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [filters, setFilters] = useState<FilterOptions>({
        location: '全部地區',
        minPrice: isNannyMode ? 20000 : 200,
        maxPrice: isNannyMode ? 35000 : 400,
        minRating: 0,
        availability: '全部時段',
        sortBy: 'rating',
    });

    const handleFilterChange = (key: keyof FilterOptions, value: string | number) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            {/* 標題 */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100 hover:bg-pink-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <SlidersHorizontal className="w-5 h-5 text-momsafe-pink" />
                    <h3 className="font-bold text-lg text-gray-800">篩選條件</h3>
                </div>
                <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
            </button>

            {/* 篩選內容 */}
            {isExpanded && (
                <div className="p-6 space-y-6">
                    {/* 地區選擇 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                            <MapPin className="w-4 h-4 text-momsafe-pink" />
                            服務地區
                        </label>
                        <select
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-momsafe-pink focus:outline-none font-medium text-gray-700"
                        >
                            {LOCATION_OPTIONS.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 價格範圍 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                            <DollarSign className="w-4 h-4 text-momsafe-pink" />
                            {isNannyMode ? '月費範圍' : '時薪範圍'}
                        </label>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">最低</span>
                                    <span className="text-sm font-bold text-gray-800">
                                        ${filters.minPrice.toLocaleString()}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={isNannyMode ? 20000 : 200}
                                    max={isNannyMode ? 35000 : 400}
                                    step={isNannyMode ? 1000 : 20}
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                                    className="w-full accent-momsafe-pink"
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">最高</span>
                                    <span className="text-sm font-bold text-gray-800">
                                        ${filters.maxPrice.toLocaleString()}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={isNannyMode ? 20000 : 200}
                                    max={isNannyMode ? 35000 : 400}
                                    step={isNannyMode ? 1000 : 20}
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                                    className="w-full accent-momsafe-pink"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 評價篩選 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                            <Star className="w-4 h-4 text-momsafe-pink" />
                            最低評價
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {[0, 4.0, 4.5, 4.8].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleFilterChange('minRating', rating)}
                                    className={`py-2 px-3 rounded-xl font-bold text-sm transition-all ${filters.minRating === rating
                                            ? 'bg-momsafe-pink text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {rating === 0 ? '全部' : `${rating}+`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 可服務時段 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                            <Calendar className="w-4 h-4 text-momsafe-pink" />
                            時段
                        </label>
                        <select
                            value={filters.availability}
                            onChange={(e) => handleFilterChange('availability', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-momsafe-pink focus:outline-none font-medium text-gray-700"
                        >
                            <option value="全部時段">全部時段</option>
                            <option value="平日">平日</option>
                            <option value="週末">週末</option>
                            <option value="彈性">彈性時段</option>
                        </select>
                    </div>

                    {/* 排序方式 */}
                    <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 block">
                            排序方式
                        </label>
                        <div className="space-y-2">
                            {[
                                { value: 'rating', label: '評價最高' },
                                { value: 'price-low', label: '價格最低' },
                                { value: 'price-high', label: '價格最高' },
                                { value: 'experience', label: isNannyMode ? '經驗最多' : '服務次數最多' },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${filters.sortBy === option.value
                                            ? 'bg-pink-50 border-2 border-momsafe-pink'
                                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="sortBy"
                                        value={option.value}
                                        checked={filters.sortBy === option.value}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        className="w-4 h-4 text-momsafe-pink"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 重置按鈕 */}
                    <button
                        onClick={() => {
                            const defaultFilters: FilterOptions = {
                                location: '全部地區',
                                minPrice: isNannyMode ? 20000 : 200,
                                maxPrice: isNannyMode ? 35000 : 400,
                                minRating: 0,
                                availability: '全部時段',
                                sortBy: 'rating',
                            };
                            setFilters(defaultFilters);
                            onFilterChange(defaultFilters);
                        }}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                    >
                        重置篩選
                    </button>
                </div>
            )}
        </div>
    );
}
