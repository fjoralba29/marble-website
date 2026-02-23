import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Material } from '../types';

interface SelectedMaterials {
  island: string | null;
  backsplash: string | null;
}

export default function RoomDesignPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedSurface, setSelectedSurface] = useState<keyof SelectedMaterials | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterials>({
    island: null,
    backsplash: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from('materials').select('*').order('category', { ascending: true }).order('name');
    if (!error && data) {
      setMaterials(data);
      const categories = Array.from(new Set(data.map(m => m.category)));
      if (categories.length > 0) {
        setOpenCategories(new Set([categories[0]]));
      }
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleSurfaceClick = (surface: keyof SelectedMaterials) => {
    setSelectedSurface(surface);
    setIsModalOpen(true);
  };

  const handleMaterialSelect = (material: Material) => {
    if (selectedSurface) {
      setSelectedMaterials((prev) => ({ ...prev, [selectedSurface]: material.image_url }));
      setIsModalOpen(false);
      setSelectedSurface(null);
    }
  };

  const surfaceLabels: Record<keyof SelectedMaterials, string> = {
    island: 'Ishulli & Banak',
    backsplash: 'Muri i Pasëm / Backsplash',
  };

  const islandPaths = [
    { key: 'islandTop', d: "M654 637.5L311.5 569L853.5 486L1101.5 504.5L654 637.5Z" },
    { key: 'baseCabinet', d: "M654.75 638L310.5 569L305.75 903H654.75V638Z" },
    { key: 'islandFront', d: "M1101.5 504L655 637.5V661.5L1101.5 519.5V504Z" },
    { key: 'islandLeg', d: "M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z" }
  ];

  const backsplashPath = "M622 452V361.5L3.5 347V486L622 452Z";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dizajni i Dhomës
          </h1>
          <p className="text-xl text-gray-300">
            Klikoni në sipërfaqe për të zgjedhur mermerin
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">

          <div className="lg:col-span-3 bg-white rounded-2xl shadow-2xl p-4 relative overflow-hidden">
            <svg viewBox="0 0 1200 903" className="w-full h-auto block rounded-lg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {islandPaths.map(({ key }) => (
                  <pattern key={key} id={`${key}Pattern`} patternUnits="userSpaceOnUse" width="1000" height="1000">
                    <image href={selectedMaterials.island || ''} width="1000" height="1000" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                ))}
                <pattern id="backsplashPattern" patternUnits="userSpaceOnUse" width="800" height="800">
                  <image href={selectedMaterials.backsplash || ''} width="800" height="800" preserveAspectRatio="xMidYMid slice" />
                </pattern>
              </defs>

              <g id="marble-fills">
                {islandPaths.map(({ key, d }) => (
                  <path
                    key={key}
                    d={d}
                    fill={selectedMaterials.island ? `url(#${key}Pattern)` : '#E5E7EB'}
                  />
                ))}
                <path
                  d={backsplashPath}
                  fill={selectedMaterials.backsplash ? 'url(#backsplashPattern)' : '#E5E7EB'}
                />
              </g>

              <image
                href="/dc4564-004-rt_15.png"
                width="1200"
                height="903"
                style={{ mixBlendMode: '', pointerEvents: 'none' }}
              />

              <g fill="transparent" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                {islandPaths.map(({ key, d }) => (
                  <path
                    key={`hitbox-${key}`}
                    d={d}
                    onClick={() => handleSurfaceClick('island')}
                  />
                ))}
                <path
                  d={backsplashPath}
                  onClick={() => handleSurfaceClick('backsplash')}
                />
              </g>
            </svg>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 border-b pb-4">Zgjidhni Mermerin</h2>
              <div className="space-y-6">
                <div className="relative">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">
                    {surfaceLabels.island}
                  </label>
                  <button
                    onClick={() => handleSurfaceClick('island')}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${
                      selectedMaterials.island
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 shadow-sm border border-black/5">
                      {selectedMaterials.island ? (
                        <img src={selectedMaterials.island} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">+</div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm font-bold text-gray-700 block">
                        {selectedMaterials.island ? 'Ndrysho Mermerin' : 'Zgjidh Mermerin'}
                      </span>
                      <span className="text-xs text-gray-500">Aplikohet për të gjitha sipërfaqet e ishullit</span>
                    </div>
                  </button>
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">
                    {surfaceLabels.backsplash}
                  </label>
                  <button
                    onClick={() => handleSurfaceClick('backsplash')}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${
                      selectedMaterials.backsplash
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 shadow-sm border border-black/5">
                      {selectedMaterials.backsplash ? (
                        <img src={selectedMaterials.backsplash} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">+</div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm font-bold text-gray-700 block">
                        {selectedMaterials.backsplash ? 'Ndrysho Mermerin' : 'Zgjidh Mermerin'}
                      </span>
                      <span className="text-xs text-gray-500">Materiali i murit të pasëm</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-3xl font-black text-gray-900">Koleksioni i Materialeve</h2>
                <p className="text-gray-500 font-medium">Zgjidhni një përfundim premium për {selectedSurface && surfaceLabels[selectedSurface]}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 transition-all text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-8 overflow-y-auto space-y-3">
              {Array.from(new Set(materials.map(m => m.category))).map((category) => {
                const isOpen = openCategories.has(category);
                const categoryMaterials = materials.filter((material) => material.category === category);

                return (
                  <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {category}
                        </h3>
                        <span className="text-sm text-gray-500 font-medium">
                          ({categoryMaterials.length})
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-6 bg-white">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                          {categoryMaterials.map((material) => (
                            <button
                              key={material.id}
                              onClick={() => handleMaterialSelect(material)}
                              className="group"
                            >
                              <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-transparent group-hover:border-orange-500 transition-all shadow-lg hover:shadow-orange-100">
                                <img src={material.image_url} alt={material.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              </div>
                              <p className="mt-3 text-sm font-bold text-gray-800 text-center group-hover:text-orange-600 transition-colors">{material.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
