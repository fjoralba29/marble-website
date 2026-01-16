import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Material } from '../types';

export default function RoomDesignPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<'countertop' | 'backsplash' | 'both'>('countertop');

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
        setSelectedMaterial(data[0]);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kitchen Visualizer
          </h1>
          <p className="text-xl text-gray-300">
            See how different marble types will look in your kitchen
          </p>
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
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="h-[500px] bg-gray-200 relative overflow-hidden">
                    <svg viewBox="0 0 800 500" className="w-full h-full">
                      <rect x="0" y="0" width="800" height="500" fill="#f5f5f5" />

                      <rect x="50" y="200" width="700" height="150" fill="#8B7355" />
                      <rect x="50" y="220" width="700" height="10" fill="#6B5345" />

                      {(selectedArea === 'countertop' || selectedArea === 'both') && selectedMaterial && (
                        <>
                          <defs>
                            <pattern id="countertopPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                              <image href={selectedMaterial.image_url} x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice" />
                            </pattern>
                          </defs>
                          <rect x="50" y="200" width="700" height="40" fill="url(#countertopPattern)" opacity="0.95" />
                          <rect x="50" y="200" width="700" height="40" fill="rgba(255,255,255,0.1)" />
                        </>
                      )}

                      <rect x="100" y="250" width="150" height="100" fill="#ffffff" stroke="#333" strokeWidth="2" />
                      <rect x="300" y="250" width="150" height="100" fill="#ffffff" stroke="#333" strokeWidth="2" />
                      <rect x="500" y="250" width="150" height="100" fill="#ffffff" stroke="#333" strokeWidth="2" />

                      <rect x="50" y="50" width="700" height="140" fill="#e8e8e8" />

                      {(selectedArea === 'backsplash' || selectedArea === 'both') && selectedMaterial && (
                        <>
                          <defs>
                            <pattern id="backsplashPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                              <image href={selectedMaterial.image_url} x="0" y="0" width="150" height="150" preserveAspectRatio="xMidYMid slice" />
                            </pattern>
                          </defs>
                          <rect x="50" y="50" width="700" height="140" fill="url(#backsplashPattern)" opacity="0.95" />
                        </>
                      )}

                      <rect x="350" y="80" width="100" height="80" fill="#4a5568" rx="5" />
                      <circle cx="400" cy="110" r="8" fill="#718096" />
                      <circle cx="400" cy="135" r="8" fill="#718096" />

                      <rect x="600" y="260" width="80" height="60" fill="#c0c0c0" stroke="#999" strokeWidth="2" />
                      <circle cx="670" cy="280" r="3" fill="#666" />
                    </svg>
                  </div>

                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4">
                    <p className="text-sm font-semibold mb-2">Apply to:</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="area"
                          value="countertop"
                          checked={selectedArea === 'countertop'}
                          onChange={(e) => setSelectedArea(e.target.value as 'countertop')}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm">Countertop</span>
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
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="area"
                          value="both"
                          checked={selectedArea === 'both'}
                          onChange={(e) => setSelectedArea(e.target.value as 'both')}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm">Both</span>
                      </label>
                    </div>
                  </div>
                </div>

                {selectedMaterial && (
                  <div className="p-6 bg-gray-50 border-t">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedMaterial.image_url}
                        alt={selectedMaterial.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{selectedMaterial.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{selectedMaterial.color}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Select Material</h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedMaterial?.id === material.id
                          ? 'border-orange-600 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex gap-3 p-3">
                        <img
                          src={material.image_url}
                          alt={material.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1 truncate">
                            {material.name}
                          </h3>
                          <p className="text-xs text-gray-500 capitalize">{material.color}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
              <h3 className="font-semibold mb-2">Choose Material</h3>
              <p className="text-sm text-gray-600">
                Browse through our collection and select a marble type
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Select Area</h3>
              <p className="text-sm text-gray-600">
                Choose to apply to countertop, backsplash, or both
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Visualize</h3>
              <p className="text-sm text-gray-600">
                See how the marble looks in your kitchen design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
