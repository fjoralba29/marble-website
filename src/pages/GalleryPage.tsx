import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { GalleryCategory, GalleryImage } from '../types';

interface GalleryPageProps {
  onNavigate: (page: string, data?: unknown) => void;
  categoryId?: string;
}

export default function GalleryPage({ onNavigate, categoryId }: GalleryPageProps) {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      loadCategoryDetails(categoryId);
    } else {
      loadCategories();
    }
  }, [categoryId]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryDetails = async (catId: string) => {
    try {
      const { data: category, error: catError } = await supabase
        .from('gallery_categories')
        .select('*')
        .eq('id', catId)
        .maybeSingle();

      if (catError) throw catError;
      setSelectedCategory(category);

      const { data: imgs, error: imgError } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('category_id', catId)
        .order('created_at', { ascending: false });

      if (imgError) throw imgError;
      setImages(imgs || []);
    } catch (error) {
      console.error('Error loading category details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: GalleryCategory) => {
    onNavigate('gallery-detail', { categoryId: category.id });
  };

  if (categoryId && selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => onNavigate('gallery')}
              className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Gallery
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {selectedCategory.name}
            </h1>
            <p className="text-xl text-gray-300">
              {selectedCategory.description}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-gray-600 text-sm">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && images.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No images available in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-300">
            Explore stunning spaces featuring our premium marble and stone
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 group"
              >
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={category.thumbnail_url}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white w-full">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-200 text-sm mb-3">{category.description}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-orange-400 group-hover:text-orange-300">
                        View Gallery
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No gallery categories available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
