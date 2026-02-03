import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Material } from '../types';

interface SelectedMaterials {
  islandTop: string | null;
  baseCabinet: string | null;
  islandFront: string | null;
  islandLeg: string | null;
  backsplash: string | null;
}

export default function KitchenVisualizerPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedSurface, setSelectedSurface] = useState<keyof SelectedMaterials | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterials>({
    islandTop: null,
    baseCabinet: null,
    islandFront: null,
    islandLeg: null,
    backsplash: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from('materials').select('*').order('name');
    if (!error && data) setMaterials(data);
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
    backsplash: 'Backsplash Wall',
    baseCabinet: 'Left Base Cabinet',
    islandTop: 'Island Countertop',
    islandFront: 'Island Front Face',
    islandLeg: 'Island Side Leg',
  };

  // UPDATED PATHS
  const paths = {
    islandTop: "M654 637.5L311.5 569L853.5 486L1101.5 504.5L654 637.5Z",
    baseCabinet: "M654.75 638L310.5 569L305.75 903H654.75V638Z",
    islandFront: "M1101.5 504L655 637.5V661.5L1101.5 519.5V504Z",
    islandLeg: "M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z",
    backsplash: "M615.5 443.5V367.5L8 355.5V481.5L615.5 443.5Z"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* VISUALIZER SECTION */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-xl p-4 relative">
            <svg viewBox="0 0 1200 903" className="w-full h-auto block rounded-lg shadow-inner" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {Object.entries(selectedMaterials).map(([key, url]) => (
                  <pattern key={key} id={`${key}Pattern`} patternUnits="userSpaceOnUse" width="600" height="600">
                    <image href={url || ''} width="600" height="600" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                ))}
              </defs>

              {/* 1. MARBLE LAYER (BOTTOM) */}
              <g>
                {Object.entries(paths).map(([key, d]) => (
                  <path 
                    key={key} 
                    d={d} 
                    fill={selectedMaterials[key as keyof SelectedMaterials] ? `url(#${key}Pattern)` : '#f3f4f6'} 
                  />
                ))}
              </g>

              {/* 2. OVERLAY IMAGE (MIDDLE) */}
              {/* mixBlendMode: multiply keeps the chairs/plates/shadows on top of the marble */}
              <image 
                href="/dc4564-004-rt_1.png" 
                width="1200" 
                height="903" 
                style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }} 
              />

              {/* 3. INTERACTIVE HIT-BOXES (TOP) */}
              <g fill="transparent" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                {Object.entries(paths).map(([key, d]) => (
                  <path 
                    key={`hit-${key}`} 
                    d={d} 
                    onClick={() => handleSurfaceClick(key as keyof SelectedMaterials)} 
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* SIDE MENU SECTION */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Selections</h2>
              <div className="space-y-5">
                {(Object.keys(selectedMaterials) as Array<keyof SelectedMaterials>).map((key) => (
                  <div key={key}>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block tracking-tight">
                      {surfaceLabels[key]}
                    </label>
                    <button
                      onClick={() => handleSurfaceClick(key)}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedMaterials[key] 
                        ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 border border-black/5 shadow-inner">
                        {selectedMaterials[key] ? (
                          <img src={selectedMaterials[key]!} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">+</div>
                        )}
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {selectedMaterials[key] ? 'Replace Marble' : 'Add Marble'}
                        </p>
                        <p className="text-[10px] text-gray-400">Click to customize</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL WINDOW */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Select Finish</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-8 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {materials.map((material) => (
                <button 
                  key={material.id} 
                  onClick={() => handleMaterialSelect(material)}
                  className="group flex flex-col items-center"
                >
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-transparent group-hover:border-indigo-500 transition-all shadow-md group-hover:shadow-indigo-200">
                    <img src={material.image_url} alt={material.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="mt-3 text-xs font-bold text-gray-600 group-hover:text-indigo-600 transition-colors">{material.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}