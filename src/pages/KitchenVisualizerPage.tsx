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
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('name');

    if (!error && data) {
      setMaterials(data);
    }
  };

  const handleSurfaceClick = (surface: keyof SelectedMaterials) => {
    setSelectedSurface(surface);
    setIsModalOpen(true);
  };

  const handleMaterialSelect = (material: Material) => {
    if (selectedSurface) {
      setSelectedMaterials((prev) => ({
        ...prev,
        [selectedSurface]: material.image_url,
      }));
      setIsModalOpen(false);
      setSelectedSurface(null);
    }
  };

  const surfaceLabels: Record<keyof SelectedMaterials, string> = {
    leftWall: 'Left Wall',
    floor: 'Floor',
    sidePanel: 'Side Panel',
    countertop: 'Countertop',
    verticalStrip: 'Vertical Strip',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kitchen Visualizer</h1>
          <p className="text-lg text-gray-600">Click on any surface to apply a marble material</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* SVG Visualizer */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 904"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <defs>
                {selectedMaterials.leftWall && (
                  <pattern id="leftWallPattern" patternUnits="objectBoundingBox" width="1" height="1">
                    <image
                      href={selectedMaterials.leftWall}
                      width="620"
                      height="151"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                )}
                {selectedMaterials.floor && (
                  <pattern id="floorPattern" patternUnits="objectBoundingBox" width="1" height="1">
                    <image
                      href={selectedMaterials.floor}
                      width="546"
                      height="336"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                )}
                {selectedMaterials.sidePanel && (
                  <pattern id="sidePanelPattern" patternUnits="objectBoundingBox" width="1" height="1">
                    <image
                      href={selectedMaterials.sidePanel}
                      width="349"
                      height="335"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                )}
                {selectedMaterials.countertop && (
                  <pattern id="countertopPattern" patternUnits="objectBoundingBox" width="1" height="1">
                    <image
                      href={selectedMaterials.countertop}
                      width="494"
                      height="23"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                )}
                {selectedMaterials.verticalStrip && (
                  <pattern id="verticalStripPattern" patternUnits="objectBoundingBox" width="1" height="1">
                    <image
                      href={selectedMaterials.verticalStrip}
                      width="33"
                      height="251"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                )}
              </defs>

              {/* Background Kitchen Image */}
              <image
                href="/dc4564-004-rt_1.png"
                width="1200"
                height="903"
                opacity="0.3"
              />

              {/* Left Wall */}
              <path
                d="M624 368.5L6 351H1V502L624 476V368.5Z"
                fill={selectedMaterials.leftWall ? 'url(#leftWallPattern)' : '#E5E7EB'}
                stroke="#1F2937"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSurfaceClick('leftWall')}
              />

              {/* Floor */}
              <path
                d="M654.75 638L305.75 568V903H654.75V638Z"
                fill={selectedMaterials.floor ? 'url(#floorPattern)' : '#E5E7EB'}
                stroke="#1F2937"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSurfaceClick('floor')}
              />

              {/* Side Panel */}
              <path
                d="M656.5 637L306 567L852 475L1149.5 492.5L656.5 637Z"
                fill={selectedMaterials.sidePanel ? 'url(#sidePanelPattern)' : '#E5E7EB'}
                stroke="#1F2937"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSurfaceClick('sidePanel')}
              />

              {/* Countertop */}
              <path
                d="M1115 501.5L655 637V661.5L1115 524.5V501.5Z"
                fill={selectedMaterials.countertop ? 'url(#countertopPattern)' : '#E5E7EB'}
                stroke="#1F2937"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSurfaceClick('countertop')}
              />

              {/* Vertical Strip */}
              <path
                d="M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z"
                fill={selectedMaterials.verticalStrip ? 'url(#verticalStripPattern)' : '#E5E7EB'}
                stroke="#1F2937"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSurfaceClick('verticalStrip')}
              />
            </svg>
          </div>

          {/* Material Selection Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Selection</h2>
            <div className="space-y-4">
              {(Object.keys(selectedMaterials) as Array<keyof SelectedMaterials>).map((surface) => (
                <div key={surface} className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">{surfaceLabels[surface]}</h3>
                  <button
                    onClick={() => handleSurfaceClick(surface)}
                    className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                  >
                    {selectedMaterials[surface] ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedMaterials[surface]!}
                          alt="Selected material"
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span>Change Material</span>
                      </div>
                    ) : (
                      'Select Material'
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Material Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Select Material for {selectedSurface && surfaceLabels[selectedSurface]}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedSurface(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => handleMaterialSelect(material)}
                    className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={material.image_url}
                      alt={material.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-end">
                      <div className="w-full p-3 bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <h3 className="font-semibold text-gray-900">{material.name}</h3>
                        {material.category && (
                          <p className="text-sm text-gray-600">{material.category}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
