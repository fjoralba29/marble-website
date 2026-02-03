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

  // The paths you provided
  const paths = {
    islandTop: "M654 637.5L311.5 569L853.5 486L1101.5 504.5L654 637.5Z",
    baseCabinet: "M654.75 638L310.5 569L305.75 903H654.75V638Z",
    islandFront: "M1101.5 504L655 637.5V661.5L1101.5 519.5V504Z",
    islandLeg: "M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z",
    backsplash: "M614 443L615 368.5L9 356L8 481L614 443Z"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 relative">
          <svg viewBox="0 0 1200 903" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {Object.entries(selectedMaterials).map(([key, url]) => (
                <pattern key={key} id={`${key}Pattern`} patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={url || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>
              ))}
            </defs>

            {/* LAYER 1: THE MARBLE PATHS (IN THE BACK) */}
            <g>
              {Object.entries(paths).map(([key, d]) => (
                <path 
                  key={key} 
                  d={d} 
                  fill={selectedMaterials[key as keyof SelectedMaterials] ? `url(#${key}Pattern)` : 'transparent'} 
                />
              ))}
            </g>

            {/* LAYER 2: THE ORIGINAL IMAGE (ON TOP) */}
            {/* mixBlendMode: multiply makes the image act as a lighting/shadow mask */}
            <image 
              href="/dc4564-004-rt_1.png" 
              width="1200" 
              height="903" 
              style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }} 
            />

            {/* LAYER 3: INVISIBLE HIT-BOXES (FOR CLICKING) */}
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
      </div>

      {/* MODAL CODE REMAINS THE SAME AS PREVIOUS STEP */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Select Material</h2>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {materials.map((material) => (
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