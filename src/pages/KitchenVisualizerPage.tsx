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
    floor: 'Cabinet Base',
    sidePanel: 'Island Top',
    countertop: 'Island Front',
    verticalStrip: 'Island Leg',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* VISUALIZER CONTAINER */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 relative">
            <svg viewBox="0 0 1200 904" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Patterns with Perspective Transforms */}
                <pattern id="leftWallPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.leftWall || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>

                <pattern id="floorPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.floor || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>

                {/* Island Top Perspective - Skewed to match 3D angle */}
                <pattern id="sidePanelPattern" patternUnits="userSpaceOnUse" width="1200" height="904" 
                  patternTransform="matrix(1, -0.16, 0.7, 1, -220, 160)">
                  <image href={selectedMaterials.sidePanel || ''} width="1200" height="1200" />
                </pattern>

                <pattern id="countertopPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.countertop || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>

                <pattern id="verticalStripPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.verticalStrip || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>
              </defs>

              {/* LAYER 1: THE MARBLE PATHS (IN THE BACK) */}
              <g>
                <path d="M624 368.5L6 351H1V502L624 476V368.5Z" 
                  fill={selectedMaterials.leftWall ? 'url(#leftWallPattern)' : 'white'} />
                
                <path d="M656.5 637L306 567L852 475L1149.5 492.5L656.5 637Z" 
                  fill={selectedMaterials.sidePanel ? 'url(#sidePanelPattern)' : 'white'} />

                <path d="M654.75 638L305.75 568V903H654.75V638Z" 
                  fill={selectedMaterials.floor ? 'url(#floorPattern)' : 'white'} />

                <path d="M1115 501.5L655 637V661.5L1115 524.5V501.5Z" 
                  fill={selectedMaterials.countertop ? 'url(#countertopPattern)' : 'white'} />

                <path d="M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z" 
                  fill={selectedMaterials.verticalStrip ? 'url(#verticalStripPattern)' : 'white'} />
              </g>

              {/* LAYER 2: THE ORIGINAL IMAGE (ON TOP) */}
              {/* Multiply mode makes white transparent, but keeps shadows/details visible */}
              <image 
                href="/dc4564-004-rt_1.png" 
                width="1200" 
                height="904" 
                style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }} 
              />

              {/* LAYER 3: INVISIBLE HIT-BOXES (FOR CLICKING) */}
              {/* These stay on top so you can click the surfaces through the image */}
              <g fill="transparent" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                <path d="M624 368.5L6 351H1V502L624 476V368.5Z" onClick={() => handleSurfaceClick('leftWall')} />
                <path d="M656.5 637L306 567L852 475L1149.5 492.5L656.5 637Z" onClick={() => handleSurfaceClick('sidePanel')} />
                <path d="M654.75 638L305.75 568V903H654.75V638Z" onClick={() => handleSurfaceClick('floor')} />
                <path d="M1115 501.5L655 637V661.5L1115 524.5V501.5Z" onClick={() => handleSurfaceClick('countertop')} />
                <path d="M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z" onClick={() => handleSurfaceClick('verticalStrip')} />
              </g>
            </svg>
          </div>

          {/* SIDEBAR UI */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Selections</h2>
            <div className="space-y-3">
              {(Object.keys(selectedMaterials) as Array<keyof SelectedMaterials>).map((surface) => (
                <button key={surface} onClick={() => handleSurfaceClick(surface)}
                  className="w-full flex items-center justify-between p-2 border rounded hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium">{surfaceLabels[surface]}</span>
                  {selectedMaterials[surface] ? (
                    <img src={selectedMaterials[surface]!} alt="" className="w-8 h-8 object-cover rounded" />
                  ) : (
                    <span className="text-xs text-gray-400">Empty</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MATERIAL MODAL (Simplified) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Choose Marble</h2>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {getFilteredMaterials().map((material) => (
                <button key={material.id} onClick={() => handleMaterialSelect(material)} className="border rounded overflow-hidden">
                  <img src={material.image_url} className="w-full aspect-square object-cover" alt={material.name} />
                  <p className="text-[10px] p-1 truncate">{material.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}