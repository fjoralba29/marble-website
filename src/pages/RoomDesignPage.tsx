import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Material } from '../types';

export default function RoomDesignPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<'countertop' | 'backsplash' | 'both'>('both');

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kitchen Visualizer</h1>
          <p className="text-xl text-gray-300">Zgjidhni mermerin për kuzhinën tuaj</p>
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
                
                {/* CONTAINER-I KRYESOR I FOTOS */}
                <div className="relative w-full aspect-[1100/825] bg-gray-100">
                  
                  {/* SHTRESA 1: Fotoja origjinale */}
                  <img
                    src="/DC4564-004-RT.jpg"
                    alt="Kitchen Base"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* SHTRESA 2: SVG MASKING LAYER */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none" 
                    viewBox="0 0 1100 825" // DUHET TE JETË IDENTIKE ME DIMENSIONET E FOTOS TËNDE
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      {/* Maskat e tua nga Photoshop/Figma */}
                      <clipPath id="island-top">
                        <path d="M545.099 0.502686L0.0986328 84.0027L344.099 153.003L790.599 18.0027L545.099 0.502686Z" />
                      </clipPath>
                      <clipPath id="backsplash">
                        <path d="M603 14.5117L0.5 0.511719V126.512L603 90.0117V14.5117Z" />
                      </clipPath>
                      <clipPath id="island-side">
                        <path d="M34.5 255.164H0.5V10.1643L33.5 0.664307V255.164Z" />
                        {/* Shto këtu edhe path-et e tjera anësore nëse i ke */}
                      </clipPath>
                    </defs>

                    {selectedMaterial && (
                      <g style={{ mixBlendMode: 'multiply', opacity: 0.92 }}>
                        {/* Island Top */}
                        {(selectedArea === 'countertop' || selectedArea === 'both') && (
                          <image
                            xlinkHref={selectedMaterial.image_url}
                            width="100%" height="100%"
                            preserveAspectRatio="none"
                            clipPath="url(#island-top)"
                          />
                        )}
                        {/* Island Side */}
                        {(selectedArea === 'countertop' || selectedArea === 'both') && (
                          <image
                            xlinkHref={selectedMaterial.image_url}
                            width="100%" height="100%"
                            preserveAspectRatio="none"
                            clipPath="url(#island-side)"
                          />
                        )}
                        {/* Backsplash */}
                        {(selectedArea === 'backsplash' || selectedArea === 'both') && (
                          <image
                            xlinkHref={selectedMaterial.image_url}
                            width="100%" height="100%"
                            preserveAspectRatio="none"
                            clipPath="url(#backsplash)"
                          />
                        )}
                      </g>
                    )}
                  </svg>
                  
                  {/* SHTRESA 3: OVERLAY (Opsionale - për vazo/detaje sipër) */}
                  {/* Nëse ke një PNG transparente vetëm me vazon dhe karriget, vendose këtu */}
                </div>

                {/* Kontrollet e zonave */}
                <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-md shadow-md">
                   <p className="text-xs font-bold mb-2 uppercase">Aplikoni në:</p>
                   <div className="flex gap-2">
                      {['countertop', 'backsplash', 'both'].map((area) => (
                        <button 
                          key={area}
                          onClick={() => setSelectedArea(area as any)}
                          className={`px-3 py-1 text-xs rounded ${selectedArea === area ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
                        >
                          {area}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Sidebar me Materialet */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Zgjidhni Materialin</h2>
                <div className="space-y-3 overflow-y-auto max-h-[70vh]">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`flex gap-3 p-2 cursor-pointer border-2 rounded-lg transition-all ${
                        selectedMaterial?.id === material.id ? 'border-orange-600' : 'border-gray-100'
                      }`}
                    >
                      <img src={material.image_url} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-bold text-sm">{material.name}</p>
                        <p className="text-xs text-gray-500">{material.color}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}