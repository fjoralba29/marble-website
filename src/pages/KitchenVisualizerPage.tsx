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

  // Updated paths based on your SVG coordinates
  const paths = {
    islandTop: "M654 637.5L311.5 569L853.5 486L1101.5 504.5L654 637.5Z",
    baseCabinet: "M654.75 638L310.5 569L305.75 903H654.75V638Z",
    islandFront: "M1101.5 504L655 637.5V661.5L1101.5 519.5V504Z",
    islandLeg: "M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z",
    backsplash: "M614 443L615 368.5L9 356L8 481L614 443Z" // Filled wall path
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDE: VISUALIZER */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-2xl p-4 relative overflow-hidden">
            <svg viewBox="0 0 1200 903" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {Object.entries(selectedMaterials).map(([key, url]) => (
                  <pattern key={key} id={`${key}Pattern`} patternUnits="userSpaceOnUse" width="400" height="400">
                    <image href={url || ''} width="400" height="400" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                ))}
              </defs>

              {/* BOTTOM LAYER: THE MARBLE */}
              <g id="marble-layer">
                {Object.entries(paths).map(([key, d]) => (
                  <path 
                    key={key} 
                    d={d} 
                    fill={selectedMaterials[key as keyof SelectedMaterials] ? `url(#${key}Pattern)` : '#eeeeee'} 
                  />
                ))}
              </g>

              {/* TOP LAYER: THE ORIGINAL IMAGE (Masked/Blended) */}
              {/* Note: Ensure this image has 'multiply' blend to show chairs/plates over the marble */}
              <image 
                href="/dc4564-004-rt_1.png" 
                width="1200" 
                height="903" 
                style={{ mixBlendMode: '', pointerEvents: 'none' }} 
              />

              {/* INTERACTION LAYER: INVISIBLE BUTTONS */}
              <g fill="transparent" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                {Object.entries(paths).map(([key, d]) => (
                  <path 
                    key={`click-${key}`} 
                    d={d} 
                    onClick={() => handleSurfaceClick(key as keyof SelectedMaterials)} 
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* RIGHT SIDE: THE MENU */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Edit Surfaces</h2>
              <div className="space-y-4">
                {(Object.keys(selectedMaterials) as Array<keyof SelectedMaterials>).map((key) => (
                  <div key={key} className="group">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
                      {surfaceLabels[key]}
                    </label>
                    <button
                      onClick={() => handleSurfaceClick(key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        selectedMaterials[key] 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded shadow-inner bg-gray-200 overflow-hidden flex-shrink-0">
                        {selectedMaterials[key] ? (
                          <img src={selectedMaterials[key]!} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">+</div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {selectedMaterials[key] ? 'Change Marble' : 'Select Material'}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MATERIAL SELECTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-800">Available Marbles</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-3xl text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {materials.map((material) => (
                <button 
                  key={material.id} 
                  onClick={() => handleMaterialSelect(material)}
                  className="group relative rounded-xl border-2 border-transparent hover:border-blue-500 overflow-hidden transition-all shadow-sm hover:shadow-md"
                >
                  <img src={material.image_url} alt={material.name} className="w-full aspect-square object-cover" />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-bold text-gray-700 truncate">{material.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}