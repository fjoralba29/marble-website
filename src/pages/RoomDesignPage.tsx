import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Material } from '../types';

export default function RoomDesignPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<'island' | 'backsplash'>('island');
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
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kitchen Visualizer</h1>
          <p className="text-xl text-gray-300">See how different marble types will look in your kitchen</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                
                <div className="relative w-full aspect-[4/3] bg-gray-200">
                  {/* Layer 1: Marble texture - Backsplash area */}
                  {backsplashMaterial && (
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${backsplashMaterial.image_url})`,
                        backgroundSize: '400px 400px',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%)',
                      }}
                    />
                  )}

                  {/* Layer 2: Marble texture - Island area */}
                  {islandMaterial && (
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${islandMaterial.image_url})`,
                        backgroundSize: '600px 600px',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        clipPath: 'polygon(0% 30%, 100% 30%, 100% 100%, 0% 100%)',
                      }}
                    />
                  )}

                  {/* Layer 3: Kitchen image with transparency (PNG mask) */}
                  <img
                    src="/dc4564-004-rt_1 copy.png"
                    alt="Kitchen"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                   <p className="text-sm font-semibold mb-2">Editing:</p>
                   <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="area"
                          value="island"
                          checked={selectedArea === 'island'}
                          onChange={(e) => setSelectedArea(e.target.value as 'island')}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm">Island</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="area"
                          value="backsplash"
                          checked={selectedArea === 'backsplash'}
                          onChange={(e) => setSelectedArea(e.target.value as 'backsplash')}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm">Backsplash</span>
                      </label>
                   </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t">
                <div className="space-y-4">
                  {islandMaterial && (
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={islandMaterial.image_url}
                          alt={islandMaterial.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Island</p>
                        <h3 className="font-semibold text-lg">{islandMaterial.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{islandMaterial.color}</p>
                      </div>
                    </div>
                  )}
                  {backsplashMaterial && (
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="flex-shrink-0">
                        <img
                          src={backsplashMaterial.image_url}
                          alt={backsplashMaterial.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Backsplash</p>
                        <h3 className="font-semibold text-lg">{backsplashMaterial.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{backsplashMaterial.color}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-2">Select Material</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Choose material for: <span className="font-semibold text-orange-600">{selectedArea}</span>
                </p>
                <div className="space-y-3 overflow-y-auto max-h-[70vh]">
                  {materials.map((material) => {
                    const currentMaterial = selectedArea === 'island' ? islandMaterial : backsplashMaterial;
                    const isSelected = currentMaterial?.id === material.id;
                    return (
                      <div
                        key={material.id}
                        onClick={() => {
                          if (selectedArea === 'island') {
                            setIslandMaterial(material);
                          } else {
                            setBacksplashMaterial(material);
                          }
                        }}
                        className={`flex gap-3 p-2 cursor-pointer border-2 rounded-lg transition-all hover:shadow-md ${
                          isSelected ? 'border-orange-600 bg-orange-50' : 'border-gray-100'
                        }`}
                      >
                        <img src={material.image_url} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p className="font-bold text-sm">{material.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{material.color}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">How to Use the Visualizer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Select Area</h3>
              <p className="text-sm text-gray-600">
                Choose whether to edit the island or backsplash
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Material</h3>
              <p className="text-sm text-gray-600">
                Browse and select a marble type for the selected area
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Mix & Match</h3>
              <p className="text-sm text-gray-600">
                Switch areas and choose different materials to create your perfect design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}