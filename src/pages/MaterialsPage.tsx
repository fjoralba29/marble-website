import { Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Material } from '../types';

interface MaterialsPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

interface CategoryCount {
  category: string;
  count: number;
}

export default function MaterialsPage({ onNavigate }: MaterialsPageProps) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);

  const colors = ['all', 'Bardhe', 'black', 'gray', 'beige', 'brown', 'green', 'red', 'gold'];

  useEffect(() => {
    loadMaterials();
  }, []);

  useEffect(() => {
    if (materials.length > 0) {
      const categoryCounts = materials.reduce((acc, material) => {
        const existing = acc.find(c => c.category === material.category);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ category: material.category, count: 1 });
        }
        return acc;
      }, [] as CategoryCount[]);

      categoryCounts.sort((a, b) => a.category.localeCompare(b.category));
      setCategories(categoryCounts);

      if (!selectedCategory && categoryCounts.length > 0) {
        setSelectedCategory(categoryCounts[0].category);
      }
    }
  }, [materials]);

  useEffect(() => {
    filterAndSortMaterials();
  }, [materials, selectedCategory, selectedColor, sortBy]);

  const loadMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*');

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMaterials = () => {
    let filtered = materials.filter(m => m.category === selectedCategory);

    if (selectedColor !== 'all') {
      filtered = filtered.filter(m =>
        m.color.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

    setFilteredMaterials(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Materiale Premium
          </h1>
          <p className="text-xl text-gray-300">
            Zbuloni koleksionin tonë të gjerë të mermerit dhe gurit natyror
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Materiale</h2>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => {
                        setSelectedCategory(cat.category);
                        setSelectedColor('all');
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedCategory === cat.category
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{cat.category}</span>
                        <span
                          className={`text-sm px-2 py-1 rounded ${
                            selectedCategory === cat.category
                              ? 'bg-orange-700 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {cat.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedCategory}</h2>
                    <p className="text-gray-600">
                      {filteredMaterials.length} {filteredMaterials.length === 1 ? 'lloj' : 'lloje'} në dispozicion
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Filter size={20} />
                      Filtrat
                    </button>

                    <div className="hidden md:flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Ngjyra:</label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {colors.map(color => (
                          <option key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Rendit:</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="name">A-Z</option>
                        <option value="name-desc">Z-A</option>
                      </select>
                    </div>
                  </div>
                </div>

                {showFilters && (
                  <div className="md:hidden mt-4 pt-4 border-t space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngjyra</label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
                      >
                        {colors.map(color => (
                          <option key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rendit sipas</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="name">A-Z</option>
                        <option value="name-desc">Z-A</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {filteredMaterials.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMaterials.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={material.image_url}
                          alt={material.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{material.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{material.color}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-500 text-lg">Nuk u gjetën lloje materialesh që përputhen me filtrat tuaj.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedMaterial.name}</h2>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <img
                  src={selectedMaterial.image_url}
                  alt={selectedMaterial.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Përshkrimi</h3>
                  <p className="text-gray-700">{selectedMaterial.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Ngjyra</h4>
                    <p className="text-gray-600 capitalize">{selectedMaterial.color}</p>
                  </div>

                  {selectedMaterial.origin && (
                    <div>
                      <h4 className="font-semibold mb-1">Origjina</h4>
                      <p className="text-gray-600">{selectedMaterial.origin}</p>
                    </div>
                  )}

                  {selectedMaterial.price_range && (
                    <div>
                      <h4 className="font-semibold mb-1">Gama e Çmimeve</h4>
                      <p className="text-gray-600">{selectedMaterial.price_range}</p>
                    </div>
                  )}

                  {selectedMaterial.finish_types && selectedMaterial.finish_types.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1">Përfundimet në Dispozicion</h4>
                      <p className="text-gray-600">{selectedMaterial.finish_types.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
