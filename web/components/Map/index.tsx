'use client';

import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
    loading: () => (
        <div className="h-[600px] w-full rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            地圖載入中...
        </div>
    ),
    ssr: false
});

export default function FriendlyMap() {
    return <MapClient />;
}
