'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FriendlySpot, taichungSpots } from './data';

// Fix for default marker icon in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

// Icon definition moved to createCustomIcon function

// Taichung Center
const TAICHUNG_CENTER: [number, number] = [24.1477, 120.6736];

export default function MapClient() {
    const [filterFriendliness, setFilterFriendliness] = useState<boolean>(false);
    const [filterNursing, setFilterNursing] = useState<boolean>(false);
    const [filterElevator, setFilterElevator] = useState<boolean>(false);
    const [isGovMode, setIsGovMode] = useState<boolean>(false); // Gov-Tech Resource Map Mode

    const filteredSpots = taichungSpots.filter(spot => {
        if (isGovMode) {
            // In Gov Mode, we might want to filter only "education" or just show everything with different colors.
            // For now, allow all, but markers change.
            return true;
        }
        if (filterFriendliness && spot.friendliness !== 'green') return false;
        if (filterNursing && !spot.amenities.includes('nursing_room')) return false;
        if (filterElevator && !spot.amenities.includes('elevator')) return false;
        return true;
    });

    return (
        <div className="h-[700px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white z-0 relative ring-4 ring-momsafe-pink/20">
            {/* Filter Overlay */}
            <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
                {!isGovMode && (
                    <>
                        <button
                            onClick={() => setFilterFriendliness(!filterFriendliness)}
                            className={`px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 ${filterFriendliness ? 'bg-momsafe-green text-white' : 'bg-white text-momsafe-text'
                                }`}
                        >
                            🟢 僅顯示全齡友善
                        </button>
                        <button
                            onClick={() => setFilterNursing(!filterNursing)}
                            className={`px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 ${filterNursing ? 'bg-momsafe-pink text-white' : 'bg-white text-momsafe-text'
                                }`}
                        >
                            🍼 有哺乳室
                        </button>
                        <button
                            onClick={() => setFilterElevator(!filterElevator)}
                            className={`px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 ${filterElevator ? 'bg-momsafe-yellow text-momsafe-text' : 'bg-white text-momsafe-text'
                                }`}
                        >
                            🛗 有電梯
                        </button>
                    </>
                )}

                {/* Mode Switcher */}
                <button
                    onClick={() => setIsGovMode(!isGovMode)}
                    className={`mt-2 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 border-2 ${isGovMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600'
                        }`}
                >
                    {isGovMode ? '🗺️ 回到友善地圖' : '🏫 切換托育戰略地圖'}
                </button>

                {isGovMode && (
                    <div className="bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg mt-2 border border-blue-100">
                        <div className="text-xs font-bold text-gray-500 mb-2">圖例說明</div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-xs text-gray-700">公立 (政府補助)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <span className="text-xs text-gray-700">準公共 (CP值高)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-xs text-gray-700">私立/一般</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <MapContainer
                center={TAICHUNG_CENTER}
                zoom={14}
                style={{ height: '100%', width: '100%', backgroundColor: '#FFF0F5' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                />
                <style jsx global>{`
                    .map-tiles {
                        filter: hue-rotate(320deg) saturate(0.6) contrast(0.9) brightness(1.05);
                    }
                    .leaflet-popup-content-wrapper {
                        background: rgba(255, 255, 255, 0.98);
                        border-radius: 24px;
                        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
                        border: none;
                        padding: 0;
                        overflow: hidden;
                    }
                    .leaflet-popup-content {
                        margin: 0;
                        width: 320px !important;
                    }
                    .leaflet-popup-tip {
                        background: white;
                    }
                    .custom-icon {
                        background: transparent;
                        border: none;
                    }
                `}</style>

                {filteredSpots.map((spot) => (
                    <Marker
                        key={spot.id}
                        position={[spot.lat, spot.lng]}
                        icon={isGovMode ? createGovIcon(spot.govType) : (spot.influencerRecommended ? createInfluencerIcon() : createCustomIcon(spot.friendliness))}
                    >
                        <Popup>
                            <div className="flex flex-col">
                                {/* Header with Traffic Light Color */}
                                <div className={`p-4 ${spot.friendliness === 'green' ? 'bg-momsafe-green/10' :
                                    spot.friendliness === 'yellow' ? 'bg-momsafe-yellow/10' :
                                        'bg-red-50'
                                    }`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-xl text-momsafe-text">{spot.name}</h3>
                                        <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${spot.friendliness === 'green' ? 'bg-momsafe-green text-white' :
                                            spot.friendliness === 'yellow' ? 'bg-momsafe-yellow text-momsafe-text' :
                                                'bg-red-500 text-white'
                                            }`}>
                                            {spot.friendliness === 'green' ? '🟢 全齡友善' :
                                                spot.friendliness === 'yellow' ? '🟡 有條件' : '🔴 成人專屬'}
                                        </div>
                                    </div>
                                    <p className="text-xs text-momsafe-text-light font-medium flex items-center gap-1">
                                        📍 {spot.district} | {spot.category}
                                    </p>
                                    {spot.influencerRecommended && (
                                        <div className="mt-2 bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-pink-200">
                                            <span className="text-lg">👑</span>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold leading-none">達人帶路</p>
                                                <p className="text-xs font-bold text-momsafe-pink">{spot.influencerName} 媽咪也來過！</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Body Content */}
                                <div className="p-4 space-y-4">
                                    {/* Noise & Description */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <p className="text-sm text-momsafe-text leading-relaxed">
                                                {spot.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-xl min-w-[60px]">
                                            <div className="text-xl mb-1">
                                                {spot.noiseLevel === 'quiet' ? '🔇' :
                                                    spot.noiseLevel === 'white_noise' ? '☕' : '🎉'}
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-500">
                                                {spot.noiseLevel === 'quiet' ? '靜音區' :
                                                    spot.noiseLevel === 'white_noise' ? '白噪音' : '放電區'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Amenities Icons */}
                                    <div className="grid grid-cols-4 gap-2">
                                        <AmenityIcon has={spot.amenities.includes('nursing_room')} icon="🍼" label="哺乳室" />
                                        <AmenityIcon has={spot.amenities.includes('elevator')} icon="🛗" label="電梯" />
                                        <AmenityIcon has={spot.amenities.includes('family_toilet')} icon="🚻" label="親子廁" />
                                        <AmenityIcon has={spot.amenities.includes('stroller_access')} icon="🚲" label="推車" />
                                    </div>

                                    {/* Survival Rules */}
                                    {spot.rules && spot.rules.length > 0 && (
                                        <div className="bg-momsafe-cream rounded-xl p-3 border border-momsafe-pink/10">
                                            <h4 className="text-xs font-bold text-momsafe-pink mb-2 flex items-center gap-1">
                                                ⚠️ 媽咪特派員筆記
                                            </h4>
                                            <ul className="space-y-1">
                                                {spot.rules.map((rule, idx) => (
                                                    <li key={idx} className="text-xs text-momsafe-text-light flex items-start gap-1.5">
                                                        <span className="mt-0.5 max-w-[4px]">•</span>
                                                        <span>{rule}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Transport Special Section */}
                                    {spot.transportDetails && (
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                            <h4 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                                                🚂 親子車廂戰術導航
                                            </h4>

                                            {/* Car Location */}
                                            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                                                <div className="text-[10px] text-gray-500 font-bold mb-1">目標位置</div>
                                                <div className="text-lg font-bold text-blue-600 flex items-center gap-2">
                                                    🎯 {spot.transportDetails.carLocation}
                                                </div>
                                                <div className="text-xs text-gray-600 mt-1 pl-6 border-l-2 border-blue-200 ml-1">
                                                    {spot.transportDetails.platformInfo}
                                                </div>
                                            </div>

                                            {/* Micro Navigation */}
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="text-[10px] text-gray-500 font-bold mb-1">無障礙路徑</div>
                                                    <div className="text-xs text-momsafe-text bg-white/60 p-2 rounded border border-blue-200/50 leading-relaxed">
                                                        🛗 {spot.transportDetails.elevatorPath}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-[10px] text-gray-500 font-bold mb-1">車廂設施透視</div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {spot.transportDetails.facilities.map((f, i) => (
                                                            <span key={i} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                                                {f}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

function createGovIcon(type?: 'public' | 'quasi-public' | 'private' | 'general') {
    const color = type === 'public' ? '#22c55e' : // Green
        type === 'quasi-public' ? '#facc15' : // Yellow
            '#3b82f6'; // Blue for Private/General

    return L.divIcon({
        className: 'custom-icon',
        html: `
        <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="font-size: 14px;">${type === 'public' ? '🏦' : type === 'quasi-public' ? '⭐' : '🏫'}</div>
        </div>
    `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -20]
    });
}

function AmenityIcon({ has, icon, label }: { has: boolean; icon: string; label: string }) {
    return (
        <div className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${has ? 'bg-green-50 text-momsafe-text' : 'bg-gray-50 opacity-40 grayscale'
            }`}>
            <span className="text-lg mb-1">{icon}</span>
            <span className="text-[10px] font-bold">{label}</span>
        </div>
    );
}

function createCustomIcon(level: 'green' | 'yellow' | 'red') {
    const color = level === 'green' ? '#9ED670' :
        level === 'yellow' ? '#FFC26F' : '#FF6B6B';

    return L.divIcon({
        className: 'custom-icon',
        html: `
        <div style="
            background-color: ${color};
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 4px solid white;
            box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        ">
            <div style="
                width: 14px;
                height: 14px;
                background-color: white;
                border-radius: 50%;
                transform: rotate(45deg);
            "></div>
        </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 42],
        popupAnchor: [0, -45]
    });
}
