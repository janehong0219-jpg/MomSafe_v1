// 台中市托育補助資料和計算邏輯

export type CenterType = 'public' | 'quasi-public' | 'private';
export type BirthOrder = 'first' | 'second' | 'third-plus';
export type FamilyStatus = 'general' | 'low-middle-income' | 'low-income';

// Gov-Tech: Fee Caps for Taichung (Estimated 2024/2025)
export const FEE_CAPS: Record<CenterType, number> = {
    'public': 7000,        // 公托由政府定價
    'quasi-public': 15000, // 準公共化上限 (居家/托嬰略有不同，取均值)
    'private': 25000       // 私立無上限，此為參考預警值
};

export interface SubsidyInput {
    centerType: CenterType;
    birthOrder: BirthOrder;
    familyStatus: FamilyStatus;
    isTaichungResident: boolean; // 設籍台中滿半年
    taxRate: number; // 綜合所得稅稅率 (%)
}

export interface SubsidyResult {
    centralSubsidy: number; // 中央政府補助
    taichungSubsidy: number; // 台中市加碼補助
    monthlyTotal: number; // 每月總補助
    yearlyTotal: number; // 年度總補助
    breakdown: string[]; // 補助明細說明
    warnings: string[]; // 注意事項
}

// 中央政府補助基本金額（公立托嬰中心）
const PUBLIC_CENTER_SUBSIDY = {
    first: 7000,
    second: 8000,
    'third-plus': 9000,
};

// 中央政府補助基本金額（準公共托嬰中心）
const QUASI_PUBLIC_SUBSIDY = {
    first: 13000,
    second: 14000,
    'third-plus': 15000,
};

// 特殊身份加成
const FAMILY_STATUS_BONUS = {
    general: 0,
    'low-middle-income': 2000, // 中低收入戶
    'low-income': 4000, // 低收入戶/弱勢家庭
};

// 台中市加碼補助（準公共托嬰中心）
const TAICHUNG_BONUS = 1400;

// 機構類型中文名稱
export const CENTER_TYPE_NAMES: Record<CenterType, string> = {
    public: '公立托嬰中心',
    'quasi-public': '準公共托嬰中心',
    private: '私立托嬰中心（未加入準公共）',
};

// 胎次中文名稱
export const BIRTH_ORDER_NAMES: Record<BirthOrder, string> = {
    first: '第一胎',
    second: '第二胎',
    'third-plus': '第三胎以上',
};

// 家庭身份中文名稱
export const FAMILY_STATUS_NAMES: Record<FamilyStatus, string> = {
    general: '一般家庭',
    'low-middle-income': '中低收入戶',
    'low-income': '低收入戶/弱勢家庭',
};

/**
 * 計算托育補助金額
 */
export function calculateSubsidy(input: SubsidyInput): SubsidyResult {
    const breakdown: string[] = [];
    const warnings: string[] = [];
    let centralSubsidy = 0;
    let taichungSubsidy = 0;

    // 私立托嬰中心（未加入準公共）無托育補助
    if (input.centerType === 'private') {
        warnings.push('私立托嬰中心（未加入準公共化）無法申請托育補助');
        warnings.push('但可以申請育兒津貼，每月第一胎 5,000 元');

        return {
            centralSubsidy: 0,
            taichungSubsidy: 0,
            monthlyTotal: 0,
            yearlyTotal: 0,
            breakdown,
            warnings,
        };
    }

    // 計算中央政府補助
    if (input.centerType === 'public') {
        centralSubsidy = PUBLIC_CENTER_SUBSIDY[input.birthOrder];
        breakdown.push(`公立托嬰中心基本補助（${BIRTH_ORDER_NAMES[input.birthOrder]}）: ${centralSubsidy.toLocaleString()} 元`);
    } else if (input.centerType === 'quasi-public') {
        centralSubsidy = QUASI_PUBLIC_SUBSIDY[input.birthOrder];
        breakdown.push(`準公共托嬰中心基本補助（${BIRTH_ORDER_NAMES[input.birthOrder]}）: ${centralSubsidy.toLocaleString()} 元`);
    }

    // 特殊身份加成
    const statusBonus = FAMILY_STATUS_BONUS[input.familyStatus];
    if (statusBonus > 0) {
        centralSubsidy += statusBonus;
        breakdown.push(`${FAMILY_STATUS_NAMES[input.familyStatus]}加成: +${statusBonus.toLocaleString()} 元`);
    }

    // 台中市加碼補助（僅限準公共托嬰中心）
    if (input.centerType === 'quasi-public' && input.isTaichungResident && input.taxRate < 20) {
        taichungSubsidy = TAICHUNG_BONUS;
        breakdown.push(`台中市政府加碼補助: +${taichungSubsidy.toLocaleString()} 元`);
    } else if (input.centerType === 'quasi-public') {
        if (!input.isTaichungResident) {
            warnings.push('未設籍台中滿半年，無法領取台中市加碼補助');
        }
        if (input.taxRate >= 20) {
            warnings.push('綜合所得稅稅率達 20% 以上，無法領取台中市加碼補助');
        }
    }

    const monthlyTotal = centralSubsidy + taichungSubsidy;
    const yearlyTotal = monthlyTotal * 12;

    return {
        centralSubsidy,
        taichungSubsidy,
        monthlyTotal,
        yearlyTotal,
        breakdown,
        warnings,
    };
}

/**
 * 取得補助比較表資料
 */
export function getSubsidyComparisonTable() {
    return {
        public: {
            name: '公立托嬰中心',
            description: '社區公共托育家園、公設民營托嬰中心',
            subsidies: {
                first: PUBLIC_CENTER_SUBSIDY.first,
                second: PUBLIC_CENTER_SUBSIDY.second,
                thirdPlus: PUBLIC_CENTER_SUBSIDY['third-plus'],
            },
            taichungBonus: false,
        },
        quasiPublic: {
            name: '準公共托嬰中心',
            description: '與政府簽約的私立托嬰中心或保母',
            subsidies: {
                first: QUASI_PUBLIC_SUBSIDY.first,
                second: QUASI_PUBLIC_SUBSIDY.second,
                thirdPlus: QUASI_PUBLIC_SUBSIDY['third-plus'],
            },
            taichungBonus: true,
            taichungBonusAmount: TAICHUNG_BONUS,
        },
        private: {
            name: '私立托嬰中心',
            description: '未加入準公共化的私立機構',
            subsidies: {
                first: 0,
                second: 0,
                thirdPlus: 0,
            },
            taichungBonus: false,
            note: '無托育補助，但可領育兒津貼',
        },
    };
}

/**
 * 申請資格說明
 */
export const ELIGIBILITY_REQUIREMENTS = [
    '幼兒年齡：0 歲至未滿 3 歲',
    '送托時數：每週須達 30 小時以上',
    '不可同時領取育兒津貼或幼兒園就學補助',
    '幼兒未經政府公費安置收容',
    '原則上不得指定一對一收托（特殊狀況除外）',
];

/**
 * 申請方式說明
 */
export const APPLICATION_INFO = {
    title: '如何申請',
    steps: [
        '孩子開始送托後 15 天內提出申請',
        '向托嬰中心或居家托育服務中心申請',
        '逾期申請，補助從收件日起算',
    ],
};
