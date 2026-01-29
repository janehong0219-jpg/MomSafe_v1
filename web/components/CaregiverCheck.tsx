'use client';

import { useState } from 'react';
import { ShieldCheck, AlertTriangle, Search, CheckCircle } from 'lucide-react';

export default function CaregiverCheck() {
    const [idNumber, setIdNumber] = useState('');
    const [result, setResult] = useState<'safe' | 'danger' | null>(null);

    const handleCheck = () => {
        // Mock Blacklist Logic
        // In real world, this would verify against a secure DB
        if (idNumber.includes('444')) { // Simulation: IDs containing 444 are blacklisted
            setResult('danger');
        } else if (idNumber.length > 5) {
            setResult('safe');
        } else {
            alert('請輸入有效的身分證字號或托育人員編號');
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">MomSafe 信任引擎</h2>
                <p className="text-gray-500 mt-2">輸入保母身分證字號，自動比對政府裁罰黑名單</p>
            </div>

            <div className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder="請輸入托育人員身分證字號 (Mock: 含444為黑名單)"
                        className="w-full pl-6 pr-14 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg font-bold"
                    />
                    <button
                        onClick={handleCheck}
                        className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-bold transition-all"
                    >
                        查詢
                    </button>
                </div>

                {/* Result Display */}
                {result === 'safe' && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4 animate-fade-in">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-green-800">✅ 驗證通過：政府核可托育人員</h3>
                            <p className="text-green-700 mt-1">
                                系統比對無裁罰紀錄，且登記證有效。
                            </p>
                            <div className="mt-3 inline-block bg-white px-3 py-1 rounded-full text-xs font-bold text-green-600 border border-green-200">
                                MomSafe 認證標章
                            </div>
                        </div>
                    </div>
                )}

                {result === 'danger' && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 animate-pulse">
                        <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-red-800">⚠️ 警告：發現風險紀錄</h3>
                            <p className="text-red-700 mt-1">
                                該人員曾在 112 年有違反兒少法裁罰紀錄。建議您尋找其他托育選擇。
                            </p>
                            <div className="mt-3 text-xs bg-red-100 px-3 py-1 rounded inline-block text-red-700 font-bold">
                                資料來源：衛福部裁罰與公告名單
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400">
                    本系統資料介接政府開放資料 (Open Data)，僅供參考，實際聘用請簽署定型化契約。
                </p>
            </div>
        </div>
    );
}
