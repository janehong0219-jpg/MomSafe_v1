import FriendlyMap from '@/components/Map';

export default function MapPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                    臺中市育兒友善地圖
                </h1>
                <p className="text-gray-600 mt-2">
                    探索臺中市北區、中區、西區及西屯區的友善設施盡在指尖
                </p>
            </div>

            <FriendlyMap />

            <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
                {['哺集乳室', '親子廁所', '友善店家', '親子公園', '放電專區', '親子館'].map((tag) => (
                    <div key={tag} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-default">
                        <span className="text-pink-500 font-medium">{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
