import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { GalleryCategory, GalleryImage } from "../types";
import { motion } from "framer-motion";

export default function GalleryPage() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<GalleryCategory[]>([]);
    const [selectedCategory, setSelectedCategory] =
        useState<GalleryCategory | null>(null);

    const [images, setImages] = useState<GalleryImage[]>([]);
    const [allImages, setAllImages] = useState<GalleryImage[]>([]);

    const [loading, setLoading] = useState(true);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    useEffect(() => {
        if (categoryId) {
            loadCategoryDetails(categoryId);
        } else {
            loadCategories();
        }
    }, [categoryId]);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("gallery_categories")
                .select("*")
                .order("name");

            if (error) throw error;
            setCategories(data || []);

            const { data: allImgs, error: imgsError } = await supabase
                .from("gallery_images")
                .select("*")
                .order("created_at", { ascending: false });

            if (imgsError) throw imgsError;
            setAllImages(allImgs || []);
        } catch (error) {
            console.error("Error loading categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategoryDetails = async (catId: string) => {
        try {
            setLoading(true);
            const { data: category, error: catError } = await supabase
                .from("gallery_categories")
                .select("*")
                .eq("id", catId)
                .maybeSingle();

            if (catError) throw catError;
            setSelectedCategory(category);

            const { data: imgs, error: imgError } = await supabase
                .from("gallery_images")
                .select("*")
                .eq("category_id", catId)
                .order("created_at", { ascending: false });

            if (imgError) throw imgError;
            setImages(imgs || []);
        } catch (error) {
            console.error("Error loading category details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category: GalleryCategory) => {
        navigate(`/gallery/${category.id}`);
    };

    // CATEGORY DETAILS VIEW
    if (categoryId && selectedCategory) {
        return (
            <div className='min-h-screen bg-[#faf9f6] text-stone-900 antialiased'>
                {/* HERO - MIDNIGHT PLUM AESTHETIC */}
                <div className='relative bg-[#1a111e] text-white py-24 border-b border-stone-800 overflow-hidden'>
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,38,68,0.6),transparent)]' />
                    <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <button
                            onClick={() => navigate("/gallery")}
                            className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-amber-500 mb-8 transition-colors'
                        >
                            <ArrowLeft size={14} /> Kthehu te Galeria
                        </button>

                        <span className='text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold block mb-3'>
                            Projekte të Realizuara
                        </span>
                        <h1 className='text-4xl md:text-6xl font-light tracking-tight font-serif mb-4'>
                            {selectedCategory.name}
                        </h1>
                        <p className='text-md text-stone-400 max-w-2xl font-light leading-relaxed tracking-wide'>
                            {selectedCategory.description}
                        </p>
                    </div>
                </div>

                {/* IMAGES MASONRY GRID */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                    {loading ? (
                        <div className='flex justify-center py-32'>
                            <div className='w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin' />
                        </div>
                    ) : (
                        <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'>
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.04,
                                    }}
                                    viewport={{ once: true }}
                                    onClick={() =>
                                        setLightboxImage(image.image_url)
                                    }
                                    className='group relative overflow-hidden bg-stone-100 cursor-pointer break-inside-avoid border border-stone-200/40 shadow-sm hover:shadow-md transition-all duration-300'
                                >
                                    <img
                                        src={image.image_url}
                                        alt=''
                                        className='w-full object-cover filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out'
                                        loading='lazy'
                                    />
                                    {/* Subtle Overlay on Hover */}
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6'>
                                        <div className='translate-y-2 group-hover:translate-y-0 transition-transform duration-400'>
                                            <p className='text-white text-[10px] tracking-widest font-mono uppercase mb-1'>
                                                Mermer Premium
                                            </p>
                                            <h4 className='text-white font-serif text-sm italic'>
                                                Detaj i Projektit
                                            </h4>
                                        </div>
                                    </div>
                                    {/* Pure Shine Effect */}
                                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none'>
                                        <div className='absolute -left-[100%] top-0 h-full w-[40%] bg-white/10 skew-x-12 group-hover:left-[150%] transition-all duration-1000' />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && images.length === 0 && (
                        <div className='text-center py-32 border border-stone-200 bg-white rounded-none'>
                            <p className='text-stone-400 font-serif italic text-sm font-light'>
                                Ende nuk ka imazhe të disponueshme në këtë
                                kategori.
                            </p>
                        </div>
                    )}
                </div>

                {/* LIGHTBOX COMPONENT */}
                {lightboxImage && (
                    <Lightbox
                        url={lightboxImage}
                        onClose={() => setLightboxImage(null)}
                    />
                )}
            </div>
        );
    }

    // MAIN GALLERY VIEW (CATEGORIES & ALL PROJECTS)
    return (
        <div className='min-h-screen bg-[#faf9f6] text-stone-900 antialiased'>
            {/* HERO */}
            <div className='relative bg-[#1a111e] text-white py-24 border-b border-stone-800 overflow-hidden'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,38,68,0.6),transparent)]' />
                <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <span className='text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold inline-block mb-3'>
                        Galeria Vizuale
                    </span>
                    <h1 className='text-4xl md:text-6xl font-light tracking-tight font-serif mb-4'>
                        Hapësira{" "}
                        <span className='italic text-stone-300'>
                            Frymëzuese
                        </span>
                    </h1>
                    <p className='text-md md:text-lg text-stone-400 max-w-xl mx-auto font-light leading-relaxed tracking-wide'>
                        Eksploroni aplikimet tona unike të mermerit dhe gurit
                        natyror në ambiente luksoze dhe moderne.
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                {loading ? (
                    <div className='text-center py-24'>
                        <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500'></div>
                    </div>
                ) : (
                    <>
                        {/* CATEGORIES GRID */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                    className='group bg-white border border-stone-200/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'
                                >
                                    <div className='h-80 overflow-hidden relative bg-stone-100'>
                                        <img
                                            src={category.thumbnail_url}
                                            alt={category.name}
                                            className='w-full h-full object-cover filter brightness-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end' />

                                        <div className='absolute inset-0 p-6 flex flex-col justify-end text-white z-10'>
                                            <span className='text-[9px] font-mono tracking-[0.25em] text-amber-400 uppercase mb-1 block opacity-80'>
                                                Koleksion i Curuar
                                            </span>
                                            <h3 className='text-2xl font-serif font-light tracking-wide mb-2'>
                                                {category.name}
                                            </h3>
                                            <p className='text-xs text-stone-300 font-light tracking-wide line-clamp-2 mb-4 max-w-sm'>
                                                {category.description}
                                            </p>
                                            <div className='flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-500 group-hover:text-amber-400 transition-colors'>
                                                Shiko Projektet{" "}
                                                <ArrowRight size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ALL IMAGES SECTION */}
                        {allImages.length > 0 && (
                            <div className='mt-32'>
                                <div className='text-center mb-16'>
                                    <span className='text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-2'>
                                        Arkiva e Plotë
                                    </span>
                                    <h2 className='text-3xl md:text-5xl font-light tracking-tight font-serif text-stone-900 mb-4'>
                                        Të Gjitha Projektet
                                    </h2>
                                    <div className='h-[1px] bg-stone-300 w-16 mx-auto mb-4' />
                                    <p className='text-stone-500 max-w-xl mx-auto font-light text-sm tracking-wide'>
                                        Një vështrim i hollësishëm mbi detajet e
                                        rafinuara dhe dizajnin bashkëkohor me
                                        gur premium.
                                    </p>
                                </div>

                                {/* ALL IMAGES MASONRY */}
                                <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'>
                                    {allImages.map((image, index) => (
                                        <motion.div
                                            key={image.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.03,
                                            }}
                                            viewport={{ once: true }}
                                            onClick={() =>
                                                setLightboxImage(
                                                    image.image_url,
                                                )
                                            }
                                            className='group relative overflow-hidden bg-stone-100 cursor-pointer break-inside-avoid border border-stone-200/50 shadow-sm hover:shadow-md transition-all duration-300'
                                        >
                                            <img
                                                src={image.image_url}
                                                alt=''
                                                className='w-full object-cover filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out'
                                                loading='lazy'
                                            />
                                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5'>
                                                <div>
                                                    <p className='text-white text-[10px] tracking-widest font-mono uppercase'>
                                                        Koleksioni Premium
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {!loading && categories.length === 0 && (
                    <div className='text-center py-32 border border-stone-200 bg-white'>
                        <p className='text-stone-400 font-serif italic text-sm font-light'>
                            Ende nuk ka kategori galerie të disponueshme.
                        </p>
                    </div>
                )}
            </div>

            {/* LIGHTBOX COMPONENT */}
            {lightboxImage && (
                <Lightbox
                    url={lightboxImage}
                    onClose={() => setLightboxImage(null)}
                />
            )}
        </div>
    );
}

// SUB-COMPONENT FOR REFINED LIGHTBOX
function Lightbox({ url, onClose }: { url: string; onClose: () => void }) {
    return (
        <div
            className='fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className='absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-white transition-colors rounded-full'
            >
                <X size={20} />
            </button>

            <img
                src={url}
                alt=''
                className='max-w-[95vw] max-h-[92vh] object-contain shadow-2xl'
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}
