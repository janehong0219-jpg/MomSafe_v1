export type FriendlinessLevel = 'green' | 'yellow' | 'red';
export type NoiseLevel = 'quiet' | 'white_noise' | 'loud';
export type Amenity = 'nursing_room' | 'elevator' | 'stroller_access' | 'family_toilet' | 'hot_water' | 'parking';
export type GovType = 'public' | 'quasi-public' | 'private' | 'general'; // Gov-Tech Layer

export type TransportDetail = {
    carLocation: string; // e.g. "第12車廂 (親子車廂)"
    elevatorPath: string; // e.g. "進站後由西側電梯直達月台層"
    platformInfo: string; // e.g. "2A月台 第12號地貼"
    facilities: string[]; // e.g. ["娃娃車停放區", "哺乳室(12車)"]
};

export type FriendlySpot = {
    id: string;
    name: string;
    category: 'nursing_room' | 'shelter' | 'family_toilet' | 'friendly_store' | 'park' | 'transport' | 'discharge_area' | 'parent_child_center' | 'kindergarten';
    lat: number;
    lng: number;
    address: string;
    description?: string;
    district: string;
    friendliness: FriendlinessLevel;
    noiseLevel: NoiseLevel;
    amenities: Amenity[];
    rules?: string[]; // Survival tips / Restrictions
    imageUrl?: string;
    transportDetails?: TransportDetail;
    govType?: GovType; // New: For Resource Map
    influencerRecommended?: boolean;
    influencerName?: string;
};

export const taichungSpots: FriendlySpot[] = [
    // Civil District (中區)
    {
        id: 'c1',
        name: '臺中火車站',
        category: 'transport',
        lat: 24.137424,
        lng: 120.686985,
        address: '臺中市中區臺灣大道一段1號',
        description: '站體寬敞，設有親子專用車廂候車處',
        district: '中區',
        friendliness: 'green',
        noiseLevel: 'white_noise',
        amenities: ['elevator', 'nursing_room', 'family_toilet', 'stroller_access'],
        rules: ['第12車廂為親子車廂', '電梯位於站體兩側'],
        transportDetails: {
            carLocation: '第 12 車廂 (親子車廂)',
            platformInfo: '2A/2B 月台 第 12 號地貼',
            elevatorPath: '由大廳層搭乘西側電梯，出電梯後直行 50m 即達',
            facilities: ['娃娃車專屬停放區', '車廂內哺乳室', '親子互動區', '親子廁所']
        },
        govType: 'public'
    },
    {
        id: 'c2',
        name: '第二市場',
        category: 'friendly_store',
        lat: 24.1422,
        lng: 120.6797,
        address: '臺中市中區三民路二段87號',
        description: '傳統市場美食，人潮眾多需注意',
        district: '中區',
        friendliness: 'yellow',
        noiseLevel: 'loud',
        amenities: ['family_toilet'],
        rules: ['走道狹窄建議收推車', '無獨立哺乳室'],
        govType: 'general'
    },

    // West District (西區)
    {
        id: 'w1',
        name: '勤美 誠品綠園道',
        category: 'friendly_store',
        lat: 24.151125,
        lng: 120.663583,
        address: '臺中市西區公益路68號',
        description: '極度友善，設施完善，適合全家消磨時間',
        district: '西區',
        friendliness: 'green',
        noiseLevel: 'white_noise',
        amenities: ['nursing_room', 'elevator', 'stroller_access', 'family_toilet', 'parking'],
        rules: ['B1/3F 設有哺乳室', '提供嬰兒推車租借'],
        govType: 'private'
    },
    {
        id: 'w2',
        name: '國立自然科學博物館',
        category: 'park',
        lat: 24.157335,
        lng: 120.665985,
        address: '臺中市西區館前路1號',
        description: '寓教於樂，冷氣開放，夏天避暑首選',
        district: '西區',
        friendliness: 'green',
        noiseLevel: 'white_noise',
        amenities: ['nursing_room', 'elevator', 'stroller_access', 'family_toilet', 'hot_water'],
        rules: ['雖然安靜但允許兒童聲音', '生命科學廳有大恐龍'],
        govType: 'public'
    },

    // North District (北區)
    {
        id: 'n1',
        name: '中友百貨',
        category: 'friendly_store',
        lat: 24.152342,
        lng: 120.684893,
        address: '臺中市北區三民路三段161號',
        description: '五星級廁所聞名，逛街舒適',
        district: '北區',
        friendliness: 'green',
        noiseLevel: 'white_noise',
        amenities: ['nursing_room', 'elevator', 'stroller_access', 'family_toilet', 'parking', 'hot_water'],
        rules: ['A棟7F親子廁所極佳', 'B棟服務台可借推車'],
        govType: 'private'
    },
    {
        id: 'n2',
        name: '臺中公園',
        category: 'park',
        lat: 24.1453,
        lng: 120.6835,
        address: '臺中市北區雙十路一段65號',
        description: '戶外空間，蚊蟲較多需注意',
        district: '北區',
        friendliness: 'yellow',
        noiseLevel: 'loud',
        amenities: ['stroller_access', 'family_toilet'],
        rules: ['地面有部分碎石子', '建議攜帶防蚊液'],
        govType: 'public'
    },

    // Xitun District (西屯區)
    {
        id: 'x1',
        name: '新光三越 臺中中港店',
        category: 'friendly_store',
        lat: 24.165207,
        lng: 120.643267,
        address: '臺中市西屯區臺灣大道三段301號',
        description: '頂級育兒補給站，什麼都有',
        district: '西屯區',
        friendliness: 'green',
        noiseLevel: 'white_noise',
        amenities: ['nursing_room', 'elevator', 'stroller_access', 'family_toilet', 'parking', 'hot_water'],
        rules: ['6F 兒童館設施最齊全', '假日電梯需久候'],
        govType: 'private'
    },

    // Gov-Tech Mock Data: Childcare Institutions
    {
        id: 'edu1',
        name: '臺中市立西屯幼兒園',
        category: 'kindergarten',
        lat: 24.1700,
        lng: 120.6350,
        address: '臺中市西屯區',
        description: '公立資源，師資穩定，費用最省',
        district: '西屯區',
        friendliness: 'green',
        noiseLevel: 'loud',
        amenities: ['family_toilet', 'stroller_access'],
        rules: ['需抽籤入學', '優先招收弱勢家庭'],
        govType: 'public'
    },
    {
        id: 'edu2',
        name: '快樂寶貝準公共托嬰中心',
        category: 'kindergarten',
        lat: 24.1450,
        lng: 120.6700,
        address: '臺中市西區',
        description: '政府補助高，CP值首選',
        district: '西區',
        friendliness: 'green',
        noiseLevel: 'white_noise',
        amenities: ['nursing_room', 'elevator'],
        rules: ['名額有限需排隊', '符合政府收費標準'],
        govType: 'quasi-public'
    },
    {
        id: 'edu3',
        name: '愛因斯坦菁英雙語幼兒園',
        category: 'kindergarten',
        lat: 24.1600,
        lng: 120.6500,
        address: '臺中市西屯區',
        description: '全美語教學，設施豪華',
        district: '西屯區',
        friendliness: 'green',
        noiseLevel: 'loud',
        amenities: ['elevator', 'parking'],
        rules: ['學費較高', '提供延托服務'],
        govType: 'private'
    },

    // Taichung Parent-Child Centers (親子館)
    {
        id: 'pc1',
        name: '臺中市北區親子館',
        category: 'parent_child_center',
        lat: 24.1495,
        lng: 120.6865,
        address: '臺中市北區民權路400號',
        description: '專為兒童設計，最安全的放電所',
        district: '北區',
        friendliness: 'green',
        noiseLevel: 'loud',
        amenities: ['nursing_room', 'elevator', 'stroller_access', 'family_toilet', 'hot_water'],
        rules: ['⚠️ 需提前預約', '大人需著襪'],
        govType: 'public'
    },
    {
        id: 'pc2',
        name: '臺中市南屯親子館',
        category: 'parent_child_center',
        lat: 24.1384,
        lng: 120.6405,
        address: '臺中市南屯區南屯路二段407號',
        description: '豐富教具，志工友善',
        district: '南屯區',
        friendliness: 'green',
        noiseLevel: 'loud',
        amenities: ['nursing_room', 'elevator', 'stroller_access', 'family_toilet', 'hot_water'],
        rules: ['⚠️ 需提前預約', '大人需著襪', '有戶外沙坑'],
        govType: 'public'
    }
];
