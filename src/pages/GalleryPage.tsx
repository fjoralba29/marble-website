import { ArrowLeft, ArrowRight } from "lucide-react";
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
            // LOAD CATEGORIES
            const { data, error } = await supabase
                .from("gallery_categories")
                .select("*")
                .order("name");

            if (error) throw error;

            setCategories(data || []);

            // LOAD ALL IMAGES
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

    // CATEGORY DETAILS PAGE
    if (categoryId && selectedCategory) {
        return (
            <>
                <div className='min-h-screen '>
                    {/* HERO */}
                    <div className='bg-[#1a1a1a] text-white py-20'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                            <button
                                onClick={() => navigate("/gallery")}
                                className='flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors'
                            >
                                <ArrowLeft size={20} />
                                Kthehu te Galeria
                            </button>

                            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                                {selectedCategory.name}
                            </h1>

                            <p className='text-xl text-gray-300 max-w-2xl'>
                                {selectedCategory.description}
                            </p>
                        </div>
                    </div>

                    {/* IMAGES */}
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                        {loading ? (
                            <div className='flex justify-center py-32'>
                                <div className='w-12 h-12 border-2 border-[#ff6b00] border-t-transparent rounded-full animate-spin' />
                            </div>
                        ) : (
                            <>
                                {/* SECTION HEADER */}

                                {/* MASONRY GALLERY */}
                                <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'>
                                    {images.map((image, index) => (
                                        <motion.div
                                            key={image.id}
                                            initial={{
                                                opacity: 0,
                                                y: 40,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
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
                                            className='group relative overflow-hidden rounded-[28px] cursor-pointer break-inside-avoid'
                                        >
                                            <img
                                                src={image.image_url}
                                                alt=''
                                                className='w-full object-cover group-hover:scale-105 transition-transform duration-700'
                                            />

                                            {/* OVERLAY */}
                                            {/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-5'>
                                                <div className='translate-y-4 group-hover:translate-y-0 transition duration-500'>
                                                    <p className='text-white text-sm tracking-[0.2em] uppercase mb-1'>
                                                        Luxury Marble
                                                    </p>

                                                    <h3 className='text-white font-semibold text-lg'>
                                                        Premium Interior
                                                    </h3>
                                                </div>
                                            </div> */}

                                            {/* SHINE EFFECT */}
                                            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700'>
                                                <div className='absolute -left-[100%] top-0 h-full w-[50%] bg-white/10 skew-x-12 group-hover:left-[150%] transition-all duration-1000' />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}

                        {!loading && images.length === 0 && (
                            <div className='text-center py-28'>
                                <p className='text-gray-500 text-lg'>
                                    Ende nuk ka imazhe të disponueshme në këtë
                                    kategori.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* LIGHTBOX */}
                {lightboxImage && (
                    <div
                        className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2'
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            onClick={() => setLightboxImage(null)}
                            className='absolute top-4 right-4 text-white hover:text-gray-300 text-4xl leading-none z-10'
                        >
                            &times;
                        </button>

                        <img
                            src={lightboxImage}
                            alt=''
                            className='w-[95vw] h-[95vh] object-contain'
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </>
        );
    }

    // MAIN GALLERY PAGE
    return (
        <>
            <div className='min-h-screen'>
                {/* HERO */}
                <div className='bg-[#1a1a1a] text-white py-20'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                            Galeria
                        </h1>

                        <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                            Eksploroni hapësira mahnitëse me mermer dhe gur
                            premium
                        </p>
                    </div>
                </div>

                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14'>
                    {/* CATEGORIES */}
                    {loading ? (
                        <div className='text-center py-20'>
                            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600'></div>
                        </div>
                    ) : (
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                        className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 group'
                                    >
                                        <div className='h-72 overflow-hidden relative'>
                                            <img
                                                src={category.thumbnail_url}
                                                alt={category.name}
                                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                            />

                                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end'>
                                                <div className='p-6 text-white w-full'>
                                                    <h3 className='text-2xl font-bold '>
                                                        {category.name}
                                                    </h3>

                                                    <p className='text-gray-200 text-sm mb-2'>
                                                        {category.description}
                                                    </p>

                                                    <div className='flex items-center gap-2 text-sm font-semibold text-[#ff6b00] group-hover:text-orange-300'>
                                                        Shiko Galerinë
                                                        <ArrowRight size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ALL IMAGES MIXED */}
                            {allImages.length > 0 && (
                                <div className='mt-28'>
                                    <div className='text-center mb-14'>
                                        <h2 className='text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4'>
                                            Të Gjitha Projektet
                                        </h2>

                                        <p className='text-[#6b6b6b] max-w-2xl mx-auto'>
                                            Eksploroni disa nga punimet tona më
                                            të bukura me mermer dhe gur premium.
                                        </p>
                                    </div>
                                    {/* MASONRY GALLERY */}
                                    <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'>
                                        {allImages.map((image, index) => (
                                            <motion.div
                                                key={image.id}
                                                initial={{
                                                    opacity: 0,
                                                    y: 40,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay: index * 0.03,
                                                }}
                                                viewport={{ once: true }}
                                                onClick={() =>
                                                    setLightboxImage(
                                                        image.image_url,
                                                    )
                                                }
                                                className='group relative overflow-hidden rounded-3xl cursor-pointer break-inside-avoid'
                                            >
                                                <img
                                                    src={image.image_url}
                                                    alt=''
                                                    className='w-full object-cover group-hover:scale-105 transition-transform duration-700'
                                                />

                                                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-5'>
                                                    <div>
                                                        <p className='text-white text-sm font-medium tracking-wide'>
                                                            Premium Collection
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
                        <div className='text-center py-20'>
                            <p className='text-gray-500 text-lg'>
                                Ende nuk ka kategori galerie të disponueshme.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* LIGHTBOX */}
            {lightboxImage && (
                <div
                    className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2'
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        className='absolute top-4 right-4 text-white hover:text-gray-300 text-4xl leading-none z-10'
                    >
                        &times;
                    </button>

                    <img
                        src={lightboxImage}
                        alt=''
                        className='w-[95vw] h-[95vh] object-contain'
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
