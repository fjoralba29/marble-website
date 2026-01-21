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
        // Default selections
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
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kitchen Visualizer</h1>
          <p className="text-xl text-gray-300">Mix and match premium marble for your island and backsplash</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: Visualizer Display */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden relative">
                
                {/* The Visualizer Container */}
                <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
                  
                  {/* LAYER 1: Backsplash Marble (Lowest Z-Index) */}
                  {backsplashMaterial && (
                    <div
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
                      style={{
                        backgroundImage: `url(${backsplashMaterial.image_url})`,
                        backgroundSize: '400px auto',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        // Clip-path keeps it in the upper section
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 65%, 0% 65%)',
                        zIndex: 10,
                      }}
                    />
                  )}

                  {/* LAYER 2: Island Marble (Middle Z-Index) */}
                  {islandMaterial && (
                    <div
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
                      style={{
                        backgroundImage: `url(${islandMaterial.image_url})`,
                        backgroundSize: '600px auto',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        // Clip-path keeps it in the lower section
                        clipPath: 'polygon(0% 35%, 100% 35%, 100% 100%, 0% 100%)',
                        zIndex: 20,
                      }}
                    />
                  )}

                  {/* LAYER 3: The Kitchen Mask (Highest Z-Index) */}
                  {/* This image must have transparent cutouts for the marble to show through */}
                  <img
                    src="/dc4564-004-rt_1 copy.png"
                    alt="Kitchen Overlay"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ zIndex: 30 }}
                  />
                  
                  {/* Floating Selection Control */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-xl z-40 border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Target Area</p>
                    <div className="flex flex-col gap-3">
                      {(['island', 'backsplash', 'both'] as const).map((area) => (
                        <label key={area} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="area"
                            value={area}
                            checked={selectedArea === area}
                            onChange={(e) => setSelectedArea(e.target.value as any)}
                            className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                          />
                          <span className={`text-sm font-medium capitalize ${selectedArea === area ? 'text-orange-600' : 'text-gray-700 group-hover:text-orange-500'}`}>
                            {area}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Material Details Footer */}
                <div className="grid grid-cols-2 divide-x border-t">
                  <div className="p-4 bg-gray-50/50">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Island</p>
                    <p className="font-semibold text-gray-800">{islandMaterial?.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50/50">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Backsplash</p>
                    <p className="font-semibold text-gray-800">{backsplashMaterial?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Material Selection Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Choose Marble</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Applying to: <span className="text-orange-600 font-bold capitalize">{selectedArea}</span>
                  </p>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                  {materials.map((material) => {
                    // Check if this material is currently used in the selected area
                    const isSelected = 
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
                        className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all duration-200 ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-50' 
                            : 'border-gray-100 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                          <img src={material.image_url} alt={material.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="text-left">
                          <p className={`font-bold text-sm ${isSelected ? 'text-orange-900' : 'text-gray-900'}`}>
                            {material.name}
                          </p>
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