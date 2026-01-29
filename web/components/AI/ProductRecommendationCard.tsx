'use client';

import { Coins, Package, ShoppingCart } from 'lucide-react';
import type { ProductRecommendation } from '@/lib/aiNutritionist';

interface ProductRecommendationCardProps {
    product: ProductRecommendation;
    onAddToCart?: (productId: string) => void;
    onRedeemSample?: (productId: string) => void;
}

export default function ProductRecommendationCard({
    product,
    onAddToCart,
    onRedeemSample
}: ProductRecommendationCardProps) {
    return (
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-momsafe-purple/10 hover:shadow-momsafe-purple/20 transition-all duration-300">
            {/* 營養師標記 */}
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-momsafe-purple text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md shadow-momsafe-purple/20">
                    <span>👩‍⚕️</span>
                    <span>營養師建議</span>
                </div>
            </div>

            <div className="flex gap-5">
                {/* 產品圖片 */}
                <div className="w-24 h-24 bg-momsafe-cream rounded-[1.5rem] flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Package className="w-10 h-10 text-momsafe-pink/40" />
                    {/* <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[1.5rem]" /> */}
                </div>

                {/* 產品資訊 */}
                <div className="flex-1">
                    <h4 className="font-bold text-momsafe-text text-lg mb-1 leading-tight">{product.name}</h4>
                    <p className="text-xs text-momsafe-text-light mb-3 leading-relaxed">{product.description}</p>

                    {/* 營養師專業建議 */}
                    <div className="bg-momsafe-green/10 rounded-[1.2rem] px-4 py-3 mb-4 border border-momsafe-green/20">
                        <p className="text-xs text-momsafe-text leading-relaxed">
                            <span className="font-bold text-momsafe-green block mb-1">💡 營養師說：</span>
                            {product.nutritionistNote}
                        </p>
                    </div>

                    {/* 價格與按鈕 */}
                    <div className="flex items-center gap-3">
                        {product.isSample && product.sampleMomcoinPrice && (
                            <button
                                onClick={() => onRedeemSample?.(product.productId)}
                                className="flex-1 bg-momsafe-yellow hover:bg-momsafe-yellow/90 text-momsafe-text px-4 py-3 rounded-full font-bold text-xs transition-all transform hover:scale-105 flex items-center justify-center gap-1.5 shadow-lg shadow-momsafe-yellow/20"
                            >
                                <Coins className="w-4 h-4" />
                                <span>{product.sampleMomcoinPrice} 幣換試用</span>
                            </button>
                        )}
                        <button
                            onClick={() => onAddToCart?.(product.productId)}
                            className="flex-1 bg-momsafe-purple hover:bg-momsafe-purple/90 text-white px-4 py-3 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-momsafe-purple/20 transform hover:scale-105"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>加入補給清單</span>
                        </button>
                    </div>

                    {product.momcoinPrice && (
                        <p className="text-[10px] text-momsafe-text-light mt-3 text-center font-medium">
                            正貨 ${product.price} 或 {product.momcoinPrice} MomCoin
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
