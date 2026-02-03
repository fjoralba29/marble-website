import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Material } from '../types';

interface SelectedMaterials {
  leftWall: string | null;
  floor: string | null;
  sidePanel: string | null;
  countertop: string | null;
  verticalStrip: string | null;
}

export default function KitchenVisualizerPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedSurface, setSelectedSurface] = useState<keyof SelectedMaterials | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterials>({
    leftWall: null,
    floor: null,
    sidePanel: null,
    countertop: null,
    verticalStrip: null,
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

  const getFilteredMaterials = () => {
    if (!selectedSurface) return materials;
    return selectedSurface === 'leftWall' 
      ? materials.filter((m) => m.category?.toLowerCase() === 'marble')
      : materials.filter((m) => m.category?.toLowerCase() !== 'marble');
  };

  const surfaceLabels: Record<keyof SelectedMaterials, string> = {
    leftWall: 'Backsplash',
    floor: 'Left Base',
    sidePanel: 'Island Top',
    countertop: 'Island Front Edge',
    verticalStrip: 'Island Side Leg',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kitchen Visualizer</h1>
          <p className="text-lg text-gray-600">Select a surface to apply premium marble textures</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
            {/* Base Kitchen Image */}
            <img src="/dc4564-004-rt_1.png" alt="Kitchen" className="w-full h-auto block" />

            {/* SVG Overlay */}
            <svg viewBox="0 0 1200 904" className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                {/* 1. Left Wall / Backsplash */}
                {selectedMaterials.leftWall && (
                  <pattern id="leftWallPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href={selectedMaterials.leftWall} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                )}

                {/* 2. Left Base Cabinet Area (Floor path) */}
                {selectedMaterials.floor && (
                  <pattern id="floorPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href={selectedMaterials.floor} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                )}

                {/* 3. Island Top (Perspective projection) */}
                {selectedMaterials.sidePanel && (
                  <pattern id="sidePanelPattern" patternUnits="userSpaceOnUse" width="1200" height="904" 
                    patternTransform="matrix(1.5, -0.3, 1.2, 1, -600, 200)">
                    <image href={selectedMaterials.sidePanel} width="1200" height="1200" />
                  </pattern>
                )}

                {/* 4. Island Front Edge */}
                {selectedMaterials.countertop && (
                  <pattern id="countertopPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href={selectedMaterials.countertop} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                )}

                {/* 5. Island Vertical Leg */}
                {selectedMaterials.verticalStrip && (
                  <pattern id="verticalStripPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href={selectedMaterials.verticalStrip} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                )}
              </defs>

              {/* Paths from your original SVG with assigned fills */}
              <g className="pointer-events-auto">
                {/* Backsplash */}
                <path d="M624 368.5L6 351H1V502L624 476V368.5Z" 
                  fill={selectedMaterials.leftWall ? 'url(#leftWallPattern)' : 'transparent'} 
                  className="cursor-pointer hover:fill-blue-500/20 transition-all"
                  onClick={() => handleSurfaceClick('leftWall')} />

                {/* Island Top */}
                <path d="M656.5 637L306 567L852 475L1149.5 492.5L656.5 637Z" 
                  fill={selectedMaterials.sidePanel ? 'url(#sidePanelPattern)' : 'transparent'} 
                  className="cursor-pointer hover:fill-blue-500/20 transition-all"
                  onClick={() => handleSurfaceClick('sidePanel')} />

                {/* Left Base */}
                <path d="M654.75 638L305.75 568V903H654.75V638Z" 
                  fill={selectedMaterials.floor ? 'url(#floorPattern)' : 'transparent'} 
                  className="cursor-pointer hover:fill-blue-500/20 transition-all"
                  onClick={() => handleSurfaceClick('floor')} />

                {/* Island Front Edge */}
                <path d="M1115 501.5L655 637V661.5L1115 524.5V501.5Z" 
                  fill={selectedMaterials.countertop ? 'url(#countertopPattern)' : 'transparent'} 
                  className="cursor-pointer hover:fill-blue-500/20 transition-all"
                  onClick={() => handleSurfaceClick('countertop')} />

                {/* Island Side Leg */}
                <path d="M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z" 
                  fill={selectedMaterials.verticalStrip ? 'url(#verticalStripPattern)' : 'transparent'} 
                  className="cursor-pointer hover:fill-blue-500/20 transition-all"
                  onClick={() => handleSurfaceClick('verticalStrip')} />
              </g>
            </svg>
          </div>

          {/* Selection Sidebar */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Materials</h2>
            <div className="space-y-6">
              {(Object.keys(selectedMaterials) as Array<keyof SelectedMaterials>).map((surface) => (
                <div key={surface}>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">{surfaceLabels[surface]}</h3>
                  <button onClick={() => handleSurfaceClick(surface)}
                    className="w-full flex items-center gap-3 p-2 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all">
                    {selectedMaterials[surface] ? (
                      <>
                        <img src={selectedMaterials[surface]!} alt="" className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                        <span className="text-sm font-semibold text-gray-700">Change Marble</span>
                      </>
                    ) : (
                      <div className="py-2 px-4 text-sm text-gray-500 font-medium">Click to apply material</div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Unchanged but included for completeness */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold">Select {selectedSurface && surfaceLabels[selectedSurface]}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">✕</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[65vh] grid grid-cols-2 md:grid-cols-3 gap-4">
              {getFilteredMaterials().map((material) => (
                <button key={material.id} onClick={() => handleMaterialSelect(material)}
                  className="group relative aspect-square overflow-hidden rounded-xl border hover:border-blue-500 transition-all">
                  <img src={material.image_url} alt={material.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-bold truncate">{material.name}</p>
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