// 排行榜範例資料

import type { LeaderboardEntry } from '@/components/MomCoin/LeaderboardCard';

export const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
    {
        rank: 1,
        userId: 'user-101',
        userName: '陳媽咪',
        verificationCount: 45,
        isLocalGuardian: true,
    },
    {
        rank: 2,
        userId: 'user-1',
        userName: '林小姐',
        verificationCount: 38,
        isCurrentUser: true,
    },
    {
        rank: 3,
        userId: 'user-102',
        userName: '王太太',
        verificationCount: 32,
    },
    {
        rank: 4,
        userId: 'user-103',
        userName: '張媽媽',
        verificationCount: 28,
    },
    {
        rank: 5,
        userId: 'user-104',
        userName: '李小姐',
        verificationCount: 25,
    },
    {
        rank: 6,
        userId: 'user-105',
        userName: '黃媽咪',
        verificationCount: 22,
    },
    {
        rank: 7,
        userId: 'user-106',
        userName: '吳太太',
        verificationCount: 19,
    },
    {
        rank: 8,
        userId: 'user-107',
        userName: '劉媽媽',
        verificationCount: 15,
    },
    {
        rank: 9,
        userId: 'user-108',
        userName: '趙小姐',
        verificationCount: 12,
    },
    {
        rank: 10,
        userId: 'user-109',
        userName: '周媽咪',
        verificationCount: 10,
    },
];
