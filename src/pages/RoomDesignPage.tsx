import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Material } from '../types';

export default function RoomDesignPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<'island' | 'backsplash' | 'both'>('both');
  const [islandMaterial, setIslandMaterial] = useState<Material | null>(null);
  const [backsplashMaterial, setBacksplashMaterial] = useState<Material | null>(null);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('name');

      if (error) throw error;
      if (data && data.length > 0) {
        setMaterials(data);
        setIslandMaterial(data[0]);
        setBacksplashMaterial(data[1] || data[0]);
      }
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Kitchen Visualizer</h1>
          <p className="text-gray-400">Select materials to customize your kitchen island and backsplash</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: VISUALIZER */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden relative">
                <div className="relative w-full aspect-[4/3] bg-gray-200">
                  
                  {/* 1. Backsplash Marble Layer (Bottom Layer) */}
                  {backsplashMaterial && (
                    <div
                      className="absolute inset-0 w-full h-full transition-all duration-500"
                      style={{
                        backgroundImage: `url(${backsplashMaterial.image_url})`,
                        backgroundSize: '300px 300px',
                        backgroundRepeat: 'repeat',
                        // Precise polygon for the backsplash area in your photo
                        clipPath: 'polygon(7% 40%, 52% 42%, 52% 53%, 7% 55%)',
                        zIndex: 10,
                      }}
                    />
                  )}

                  {/* 2. Island Marble Layer (Middle Layer - sits above Backsplash) */}
                  {islandMaterial && (
                    <div
                      className="absolute inset-0 w-full h-full transition-all duration-500"
                      style={{
                        backgroundImage: `url(${islandMaterial.image_url})`,
                        backgroundSize: '600px 600px',
                        backgroundRepeat: 'repeat',
                        // Precise polygon for the waterfall island in your photo
                        clipPath: 'polygon(25.5% 64.5%, 93.5% 56.5%, 96.5% 58%, 91.5% 91%, 58% 100%, 26% 100%)',
                        zIndex: 20,
                      }}
                    />
                  )}

                  {/* 3. Kitchen Mask Layer (Top Layer) */}
                  <img
                    src="/dc4564-004-rt_1 copy.png"
                    alt="Kitchen"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ zIndex: 30 }}
                  />

                  {/* Area Selector Overlay */}
                  <div className="absolute top-4 right-4 z-40 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-xs font-bold uppercase text-gray-500 mb-3">Target Area</p>
                    <div className="flex flex-col gap-2">
                      {['island', 'backsplash', 'both'].map((area) => (
                        <label key={area} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="area"
                            value={area}
                            checked={selectedArea === area}
                            onChange={(e) => setSelectedArea(e.target.value as any)}
                            className="text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-sm capitalize font-medium group-hover:text-orange-600 transition-colors">
                            {area}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="p-4 bg-gray-50 border-t flex justify-around text-sm">
                  <div><span className="text-gray-400">Island:</span> <strong>{islandMaterial?.name}</strong></div>
                  <div><span className="text-gray-400">Backsplash:</span> <strong>{backsplashMaterial?.name}</strong></div>
                </div>
              </div>
            </div>

            {/* RIGHT: MATERIAL SELECTION */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-4">
                <h2 className="text-xl font-bold mb-1">Select Material</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Applying to <span className="text-orange-600 font-bold capitalize">{selectedArea}</span>
                </p>
                
                <div className="space-y-3 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
                  {materials.map((material) => {
                    const isActive = 
                      (selectedArea === 'island' && islandMaterial?.id === material.id) ||
                      (selectedArea === 'backsplash' && backsplashMaterial?.id === material.id) ||
                      (selectedArea === 'both' && islandMaterial?.id === material.id && backsplashMaterial?.id === material.id);

                    return (
                      <button
                        key={material.id}
                        onClick={() => {
                          if (selectedArea === 'island' || selectedArea === 'both') setIslandMaterial(material);
                          if (selectedArea === 'backsplash' || selectedArea === 'both') setBacksplashMaterial(material);
                        }}
                        className={`w-full flex items-center gap-4 p-2 rounded-lg border-2 transition-all ${
                          isActive ? 'border-orange-500 bg-orange-50' : 'border-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <img src={material.image_url} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                        <div className="text-left">
                          <p className="font-bold text-sm leading-tight">{material.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{material.color}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}