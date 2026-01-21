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
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src="/dc4564-004-rt.jpg"
                      alt="Kitchen"
                      className="w-full h-full object-cover"
                    />

                    {(selectedArea === 'backsplash' || selectedArea === 'both') && selectedMaterial && (
                      <div
                        className="absolute inset-0 opacity-90 mix-blend-multiply"
                        style={{
                          backgroundImage: `url(${selectedMaterial.image_url})`,
                          backgroundSize: '400px 400px',
                          backgroundRepeat: 'repeat',
                          clipPath: 'polygon(2% 23.5%, 98% 23.5%, 98% 33%, 2% 33%)',
                        }}
                      />
                    )}

                    {(selectedArea === 'countertop' || selectedArea === 'both') && selectedMaterial && (
                      <>
                        <div
                          className="absolute inset-0 opacity-90 mix-blend-multiply"
                          style={{
                            backgroundImage: `url(${selectedMaterial.image_url})`,
                            backgroundSize: '500px 500px',
                            backgroundRepeat: 'repeat',
                            clipPath: 'polygon(20% 64%, 85% 64%, 95% 75%, 95% 100%, 5% 100%, 5% 75%)',
                          }}
                        />

                        <div
                          className="absolute inset-0 opacity-90 mix-blend-multiply"
                          style={{
                            backgroundImage: `url(${selectedMaterial.image_url})`,
                            backgroundSize: '300px 300px',
                            backgroundRepeat: 'repeat',
                            clipPath: 'polygon(5% 75%, 20% 64%, 20% 100%, 5% 100%)',
                          }}
                        />

                        <div
                          className="absolute inset-0 opacity-90 mix-blend-multiply"
                          style={{
                            backgroundImage: `url(${selectedMaterial.image_url})`,
                            backgroundSize: '300px 300px',
                            backgroundRepeat: 'repeat',
                            clipPath: 'polygon(85% 64%, 95% 75%, 95% 100%, 85% 100%)',
                          }}
                        />
                      </>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
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
                Choose to apply to island, backsplash, or both
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
