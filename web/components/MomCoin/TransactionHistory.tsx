'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { getTransactionDescription } from '@/lib/rewards';
import type { Transaction } from '@/lib/momcoin';

interface TransactionHistoryProps {
    transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
    if (transactions.length === 0) {
        return (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">📜</div>
                <p className="text-gray-600 text-sm">尚無交易記錄</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {transactions.map((tx) => {
                const isEarn = tx.amount > 0;

                return (
                    <div
                        key={tx.id}
                        className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                                {/* 圖標 */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isEarn ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                    {isEarn ? (
                                        <ArrowUp className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <ArrowDown className="w-4 h-4 text-red-600" />
                                    )}
                                </div>

                                {/* 交易資訊 */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-gray-800 text-sm truncate">
                                            {getTransactionDescription(tx.type, tx.metadata)}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {new Date(tx.timestamp).toLocaleString('zh-TW', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* 金額與餘額 */}
                            <div className="text-right ml-3">
                                <div className={`text-lg font-bold ${isEarn ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {isEarn ? '+' : ''}{tx.amount}
                                </div>
                                <div className="text-xs text-gray-400">
                                    餘額 {tx.balance}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
