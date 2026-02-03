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
          <p className="text-lg text-gray-600">Apply textures and see them blend with natural lighting</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 relative">
            
            {/* 1. THE SVG LAYER (Contains the textures) */}
            <svg viewBox="0 0 1200 904" className="w-full h-auto block">
              <defs>
                {/* Pattern definitions with improved perspective logic */}
                <pattern id="leftWallPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.leftWall || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>

                <pattern id="floorPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.floor || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>

                {/* Perspective skew for the Island Top */}
                <pattern id="sidePanelPattern" patternUnits="userSpaceOnUse" width="1200" height="904" 
                  patternTransform="matrix(1, -0.16, 0.7, 1, -200, 150)">
                  <image href={selectedMaterials.sidePanel || ''} width="1200" height="1200" />
                </pattern>

                <pattern id="countertopPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.countertop || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>

                <pattern id="verticalStripPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <image href={selectedMaterials.verticalStrip || ''} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>
              </defs>

              {/* DRAWING THE TEXTURED PATHS */}
              <g>
                <path d="M624 368.5L6 351H1V502L624 476V368.5Z" 
                  fill={selectedMaterials.leftWall ? 'url(#leftWallPattern)' : '#f3f4f6'} 
                  onClick={() => handleSurfaceClick('leftWall')} className="cursor-pointer" />

                <path d="M656.5 637L306 567L852 475L1149.5 492.5L656.5 637Z" 
                  fill={selectedMaterials.sidePanel ? 'url(#sidePanelPattern)' : '#f3f4f6'} 
                  onClick={() => handleSurfaceClick('sidePanel')} className="cursor-pointer" />

                <path d="M654.75 638L305.75 568V903H654.75V638Z" 
                  fill={selectedMaterials.floor ? 'url(#floorPattern)' : '#f3f4f6'} 
                  onClick={() => handleSurfaceClick('floor')} className="cursor-pointer" />

                <path d="M1115 501.5L655 637V661.5L1115 524.5V501.5Z" 
                  fill={selectedMaterials.countertop ? 'url(#countertopPattern)' : '#f3f4f6'} 
                  onClick={() => handleSurfaceClick('countertop')} className="cursor-pointer" />

                <path d="M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z" 
                  fill={selectedMaterials.verticalStrip ? 'url(#verticalStripPattern)' : '#f3f4f6'} 
                  onClick={() => handleSurfaceClick('verticalStrip')} className="cursor-pointer" />
              </g>

              {/* 2. THE IMAGE OVERLAY (Provides shadows and highlights) */}
              {/* This sits on top of the paths, but uses multiply to let color through */}
              <image 
                href="/dc4564-004-rt_1.png" 
                width="1200" 
                height="904" 
                style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }} 
              />
            </svg>
          </div>

          {/* Selection Sidebar (Kept same as before) */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Surface Settings</h2>
            <div className="space-y-4">
              {(Object.keys(selectedMaterials) as Array<keyof SelectedMaterials>).map((surface) => (
                <button key={surface} onClick={() => handleSurfaceClick(surface)}
                  className="w-full flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-600">{surfaceLabels[surface]}</span>
                  {selectedMaterials[surface] ? (
                    <img src={selectedMaterials[surface]!} alt="" className="w-10 h-10 object-cover rounded shadow-sm" />
                  ) : (
                    <span className="text-xs text-blue-500 font-bold">+ Select</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Kept same as before */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Pick Material</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl">×</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] grid grid-cols-2 md:grid-cols-3 gap-4">
              {getFilteredMaterials().map((material) => (
                <button key={material.id} onClick={() => handleMaterialSelect(material)}
                  className="group relative aspect-square overflow-hidden rounded-xl border">
                  <img src={material.image_url} alt={material.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-end p-2 transition-opacity">
                    <p className="text-xs text-white font-bold">{material.name}</p>
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