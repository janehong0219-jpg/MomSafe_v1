'use client';

import { useState } from 'react';
import { Calculator, Baby, Home, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    calculateSubsidy,
    getSubsidyComparisonTable,
    ELIGIBILITY_REQUIREMENTS,
    APPLICATION_INFO,
    CENTER_TYPE_NAMES,
    BIRTH_ORDER_NAMES,
    FAMILY_STATUS_NAMES,
    FEE_CAPS,
    type CenterType,
    type BirthOrder,
    type FamilyStatus,
    type SubsidyResult,
} from '@/lib/subsidyData';

export default function SubsidyCalculator() {
    const [centerType, setCenterType] = useState<CenterType>('quasi-public');
    const [birthOrder, setBirthOrder] = useState<BirthOrder>('first');
    const [familyStatus, setFamilyStatus] = useState<FamilyStatus>('general');
    const [isTaichungResident, setIsTaichungResident] = useState(true);
    const [taxRate, setTaxRate] = useState(0);
    const [monthlyFee, setMonthlyFee] = useState<number>(15000); // Default fee
    const [result, setResult] = useState<SubsidyResult | null>(null);

    const handleCalculate = () => {
        const subsidyResult = calculateSubsidy({
            centerType,
            birthOrder,
            familyStatus,
            isTaichungResident,
            taxRate,
        });
        setResult(subsidyResult);
    };

    const comparisonTable = getSubsidyComparisonTable();
    const feeCap = FEE_CAPS[centerType];
    const isOverCap = monthlyFee > feeCap;
    const realPay = Math.max(0, monthlyFee - (result?.monthlyTotal || 0));

    return (
        <div className="space-y-8">
            {/* 標題區 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
            >
                <div className="flex items-center justify-center gap-3">
                    <Calculator className="w-10 h-10 text-momsafe-pink" />
                    <h1 className="text-4xl font-bold text-gray-800">托育補助試算 & 實付分析</h1>
                </div>
                <p className="text-gray-500 text-lg">Gov-Tech 引擎幫您精算家長實際負擔</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* 左側：輸入表單 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[2.5rem] shadow-lg p-8 border border-gray-100"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                        <Baby className="w-6 h-6 text-momsafe-pink" />
                        填寫托育狀況
                    </h2>

                    <div className="space-y-6">
                        {/* 預計月費 Gov-Tech Input */}
                        <div className="bg-yellow-50 p-6 rounded-[1.5rem] border border-yellow-100">
                            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                💰 預計保母/中心月費 (元)
                                <span className="text-xs bg-white px-2 py-0.5 rounded text-gray-500 border border-gray-200">
                                    行情參考: ${feeCap.toLocaleString()}
                                </span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input
                                    type="number"
                                    value={monthlyFee}
                                    onChange={(e) => setMonthlyFee(Number(e.target.value))}
                                    className={`w-full pl-8 pr-4 py-4 rounded-xl border-2 focus:outline-none font-bold text-lg text-gray-800 ${isOverCap ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-momsafe-pink'
                                        }`}
                                />
                            </div>
                            {isOverCap && centerType === 'quasi-public' && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"
                                >
                                    ⚠️ 注意：此金額高於台中市準公共化收費上限 (${feeCap.toLocaleString()})
                                </motion.p>
                            )}
                        </div>

                        {/* 送托機構類型 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                送托機構類型
                            </label>
                            <div className="space-y-2">
                                {(Object.keys(CENTER_TYPE_NAMES) as CenterType[]).map((type) => (
                                    <motion.label
                                        key={type}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${centerType === type
                                            ? 'border-momsafe-pink bg-pink-50'
                                            : 'border-gray-200 hover:border-pink-200'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="centerType"
                                            value={type}
                                            checked={centerType === type}
                                            onChange={(e) => setCenterType(e.target.value as CenterType)}
                                            className="mr-3 w-4 h-4 text-momsafe-pink"
                                        />
                                        <span className="font-medium text-gray-700">
                                            {CENTER_TYPE_NAMES[type]}
                                        </span>
                                    </motion.label>
                                ))}
                            </div>
                        </div>

                        {/* 胎次 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                寶寶胎次
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {(Object.keys(BIRTH_ORDER_NAMES) as BirthOrder[]).map((order) => (
                                    <motion.button
                                        key={order}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setBirthOrder(order)}
                                        className={`py-3 px-4 rounded-xl font-bold transition-all ${birthOrder === order
                                            ? 'bg-momsafe-pink text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {BIRTH_ORDER_NAMES[order]}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* 家庭身份 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                家庭身份
                            </label>
                            <select
                                value={familyStatus}
                                onChange={(e) => setFamilyStatus(e.target.value as FamilyStatus)}
                                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-momsafe-pink focus:outline-none font-medium text-gray-700"
                            >
                                {(Object.keys(FAMILY_STATUS_NAMES) as FamilyStatus[]).map((status) => (
                                    <option key={status} value={status}>
                                        {FAMILY_STATUS_NAMES[status]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 台中市設籍 */}
                        <div>
                            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-pink-200 transition-all">
                                <input
                                    type="checkbox"
                                    checked={isTaichungResident}
                                    onChange={(e) => setIsTaichungResident(e.target.checked)}
                                    className="w-5 h-5 text-momsafe-pink rounded"
                                />
                                <span className="font-medium text-gray-700">
                                    父母其中一方與幼兒設籍台中市滿半年
                                </span>
                            </label>
                        </div>

                        {/* 計算按鈕 */}
                        <motion.button
                            onClick={handleCalculate}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-momsafe-pink hover:bg-momsafe-pink/90 text-white font-bold py-4 px-6 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg shadow-momsafe-pink/30"
                        >
                            <Calculator className="w-6 h-6" />
                            分析實付金額
                        </motion.button>
                    </div>
                </motion.div>

                {/* 右側：試算結果 */}
                <div className="space-y-6">
                    <AnimatePresence mode='wait'>
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ type: "spring", duration: 0.6 }}
                            >
                                {/* 補助結果卡片 */}
                                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                        <CheckCircle2 className="w-6 h-6 text-momsafe-green" />
                                        分析報告
                                    </h2>

                                    {result.monthlyTotal > 0 ? (
                                        <div className="space-y-6">
                                            {/* Gov-Tech Visualization Bar */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                                    <span>總月費 ${monthlyFee.toLocaleString()}</span>
                                                    <span>自付佔比 {Math.round((realPay / monthlyFee) * 100)}%</span>
                                                </div>
                                                <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(result.monthlyTotal / monthlyFee) * 100}%` }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                        className="h-full bg-momsafe-green flex items-center justify-center text-[10px] text-white font-bold"
                                                    >
                                                        {(result.monthlyTotal / monthlyFee) * 100 > 15 && '補'}
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(realPay / monthlyFee) * 100}%` }}
                                                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                                        className="h-full bg-momsafe-text flex items-center justify-center text-[10px] text-white font-bold"
                                                    >
                                                        {(realPay / monthlyFee) * 100 > 15 && '付'}
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Real Pay Highlight */}
                                            <div className="bg-momsafe-cream rounded-[1.5rem] p-6 shadow-md border border-momsafe-pink/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-500">家長每月實付</p>
                                                    <p className="text-4xl font-bold text-momsafe-text mt-1">
                                                        ${realPay.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded inline-block mb-1">
                                                        已扣除補助
                                                    </p>
                                                    <p className="text-xl font-bold text-momsafe-pink">
                                                        -${result.monthlyTotal.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* 補助明細 */}
                                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                    <Info className="w-5 h-5 text-gray-400" />
                                                    補助組成
                                                </h3>
                                                <ul className="space-y-2">
                                                    {result.breakdown.map((item, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 + index * 0.1 }}
                                                            className="text-gray-600 flex items-start gap-2 text-sm"
                                                        >
                                                            <span className="text-momsafe-green mt-0.5">✓</span>
                                                            <span>{item}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                                            <p className="text-lg font-bold text-gray-800 mb-2">無托育補助</p>
                                            <p className="text-gray-600">
                                                {result.warnings[0]}
                                            </p>
                                        </div>
                                    )}

                                    {/* 注意事項 */}
                                    {result.warnings.length > 0 && result.monthlyTotal > 0 && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
                                            <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5" />
                                                注意事項
                                            </h4>
                                            <ul className="space-y-1">
                                                {result.warnings.map((warning, index) => (
                                                    <li key={index} className="text-sm text-yellow-700">
                                                        • {warning}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="bg-gray-50 rounded-2xl shadow-lg p-12 border border-gray-200 flex flex-col items-center justify-center text-center h-full"
                            >
                                <Home className="w-16 h-16 text-gray-300 mb-4" />
                                <p className="text-gray-400 text-lg">
                                    請填寫左側表單並點擊試算按鈕
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 補助比較表 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">補助金額比較表</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-4 px-4 font-bold text-gray-700">機構類型</th>
                                <th className="text-center py-4 px-4 font-bold text-gray-700">第一胎</th>
                                <th className="text-center py-4 px-4 font-bold text-gray-700">第二胎</th>
                                <th className="text-center py-4 px-4 font-bold text-gray-700">第三胎以上</th>
                                <th className="text-center py-4 px-4 font-bold text-gray-700">台中加碼</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-pink-50 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="font-bold text-gray-800">{comparisonTable.public.name}</div>
                                    <div className="text-sm text-gray-500">{comparisonTable.public.description}</div>
                                </td>
                                <td className="text-center py-4 px-4 font-bold text-momsafe-pink">
                                    ${comparisonTable.public.subsidies.first.toLocaleString()}
                                </td>
                                <td className="text-center py-4 px-4 font-bold text-momsafe-pink">
                                    ${comparisonTable.public.subsidies.second.toLocaleString()}
                                </td>
                                <td className="text-center py-4 px-4 font-bold text-momsafe-pink">
                                    ${comparisonTable.public.subsidies.thirdPlus.toLocaleString()}
                                </td>
                                <td className="text-center py-4 px-4 text-gray-400">-</td>
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="font-bold text-gray-800">{comparisonTable.quasiPublic.name}</div>
                                    <div className="text-sm text-gray-500">{comparisonTable.quasiPublic.description}</div>
                                </td>
                                <td className="text-center py-4 px-4 font-bold text-purple-600">
                                    ${comparisonTable.quasiPublic.subsidies.first.toLocaleString()}
                                </td>
                                <td className="text-center py-4 px-4 font-bold text-purple-600">
                                    ${comparisonTable.quasiPublic.subsidies.second.toLocaleString()}
                                </td>
                                <td className="text-center py-4 px-4 font-bold text-purple-600">
                                    ${comparisonTable.quasiPublic.subsidies.thirdPlus.toLocaleString()}
                                </td>
                                <td className="text-center py-4 px-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                        +${comparisonTable.quasiPublic.taichungBonusAmount?.toLocaleString()}
                                    </span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="font-bold text-gray-800">{comparisonTable.private.name}</div>
                                    <div className="text-sm text-gray-500">{comparisonTable.private.description}</div>
                                </td>
                                <td className="text-center py-4 px-4 text-gray-400" colSpan={4}>
                                    {comparisonTable.private.note}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 說明區塊 */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {/* 申請資格 */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            申請資格
                        </h3>
                        <ul className="space-y-2">
                            {ELIGIBILITY_REQUIREMENTS.map((req, index) => (
                                <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">✓</span>
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 申請方式 */}
                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5" />
                            {APPLICATION_INFO.title}
                        </h3>
                        <ul className="space-y-2">
                            {APPLICATION_INFO.steps.map((step, index) => (
                                <li key={index} className="text-sm text-green-800 flex items-start gap-2">
                                    <span className="font-bold text-green-600">{index + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
