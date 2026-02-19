import { ArrowRight, Award, Clock, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Material } from '../types';

interface HomePageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [featuredMaterials, setFeaturedMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedMaterials();
  }, []);

  const loadFeaturedMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .limit(6);

      if (error) throw error;
      setFeaturedMaterials(data || []);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(/home.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Zbuloni Mermer Premium & Gur Natyror
          </h1>
<p className="text-xl md:text-2xl mb-8 text-gray-200">
            Mbi 2,000 ngjyra dhe modele guri për hapësirën tuaj të ëndrrave
          </p>
          <button
            onClick={() => onNavigate('materials')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-2 transition-colors"
          >
            Eksploroni Materialet
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Award className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cilësi Premium</h3>
              <p className="text-gray-600">
                Materiale të përzgjedhura me dorë nga guroret më të mira në botë
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Users className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shërbim Ekspert</h3>
              <p className="text-gray-600">
                Udhëzim profesional nga konsulta deri te instalimi
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Clock className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dërgim i Shpejtë</h3>
              <p className="text-gray-600">
                Kohë të shpejta përfundimi pa kompromentuar cilësinë
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Materiale të Veçanta
            </h2>
            <p className="text-xl text-gray-600">
              Eksploroni zgjedhjet tona më popullore të mermerit dhe gurit
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onNavigate('materials')}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={material.image_url}
                      alt={material.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {material.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('materials')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Shikoni Të Gjitha Materialet
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Dizajnoni Hapësirën Tuaj të Ëndrrave
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Eksploroni mjetet tona të dizajnit të dhomave për të vizualizuar se si llojet e ndryshme të mermerit do të duken në hapësirën tuaj para se të merrni një vendim.
              </p>
              <button
                onClick={() => onNavigate('design')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
              >
                Provoni Dizajnin e Dhomës
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/DC4564-004-RT.jpg"
                alt="Kitchen Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
