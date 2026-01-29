'use client';

import { CirclePercent, Clock, Sparkles } from 'lucide-react';
import type { RewardProduct } from '@/lib/momcoin';

interface RewardShopProps {
    products: RewardProduct[];
    currentBalance: number;
    onRedeem: (productId: string) => void;
}

export default function RewardShop({ products, currentBalance, onRedeem }: RewardShopProps) {
    const getCategoryConfig = (category: RewardProduct['category']) => {
        switch (category) {
            case 'childcare':
                return { name: '臨托折抵', emoji: '💆‍♀️', color: 'pink' };
            case 'product':
                return { name: '母嬰用品', emoji: '🍼', color: 'blue' };
            case 'vip':
                return { name: 'VIP 功能', emoji: '⭐', color: 'purple' };
        }
    };

    const canAfford = (price: number) => currentBalance >= price;

    // 按類別分組
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, RewardProduct[]>);

    return (
        <div className="space-y-6">
            {Object.entries(groupedProducts).map(([category, items]) => {
                const config = getCategoryConfig(category as RewardProduct['category']);

                return (
                    <div key={category}>
                        <div className="flex items-center gap-2 mb-3 px-1">
                            <span className="text-xl">{config.emoji}</span>
                            <h3 className="text-sm font-bold text-gray-700">{config.name}</h3>
                        </div>

                        <div className="space-y-3">
                            {items.map((product) => {
                                const affordable = canAfford(product.price);
                                const isLimited = product.stock !== undefined && product.stock > 0 && product.stock !== -1;
                                const isSoldOut = product.stock === 0;

                                return (
                                    <div
                                        key={product.id}
                                        className={`bg-white rounded-2xl p-4 border-2 transition-all ${affordable && !isSoldOut
                                                ? 'border-amber-200 hover:shadow-lg'
                                                : 'border-gray-200 opacity-60'
                                            }`}
                                    >
                                        <div className="flex gap-4">
                                            {/* 商品圖片佔位 */}
                                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-3xl">{config.emoji}</span>
                                            </div>

                                            {/* 商品資訊 */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-800 text-sm mb-1">{product.name}</h4>
                                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>

                                                <div className="flex items-center gap-3 flex-wrap">
                                                    {/* 價格 */}
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-lg font-bold text-amber-600">{product.price}</span>
                                                        <span className="text-xl">💰</span>
                                                    </div>

                                                    {/* 限量標記 */}
                                                    {isLimited && (
                                                        <div className="flex items-center gap-1 text-xs text-orange-600">
                                                            <CirclePercent className="w-3 h-3" />
                                                            <span>剩 {product.stock}</span>
                                                        </div>
                                                    )}

                                                    {/* VIP 天數 */}
                                                    {product.validDays && (
                                                        <div className="flex items-center gap-1 text-xs text-purple-600">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{product.validDays} 天</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* 兌換按鈕 */}
                                                <button
                                                    onClick={() => onRedeem(product.id)}
                                                    disabled={!affordable || isSoldOut}
                                                    className={`mt-3 w-full py-2 rounded-xl font-bold text-sm transition-all ${isSoldOut
                                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                            : affordable
                                                                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg hover:scale-105'
                                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {isSoldOut
                                                        ? '已兌換完'
                                                        : affordable
                                                            ? '立即兌換'
                                                            : `還需 ${product.price - currentBalance} Coin`}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* 特別優惠提示 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-purple-900 text-sm">💡 小提示</p>
                        <p className="text-xs text-purple-700 mt-1">
                            完成更多驗證任務，賺取 MomCoin，即可兌換更多好康！
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
