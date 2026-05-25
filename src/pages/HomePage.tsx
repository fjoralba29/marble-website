import { ArrowRight, Award, Clock, Users, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { Material } from "../types";
import MarbleQualitySection from "../components/MarbleQualitySection";
import GallerySection from "../components/GallerySection";
import TestimonialsStatsSection from "../components/TestimonialsStatsSection";

export default function HomePage() {
    const navigate = useNavigate();
    const [featuredMaterials, setFeaturedMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeaturedMaterials();
    }, []);

    const loadFeaturedMaterials = async () => {
        try {
            const { data, error } = await supabase
                .from("materials")
                .select("*")
                .limit(6);

            if (error) throw error;
            setFeaturedMaterials(data || []);
        } catch (error) {
            console.error("Error loading materials:", error);
        } finally {
            setLoading(false);
        }
    };

    // Animation presets for luxury fade-in
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    return (
        <div className='min-h-screen bg-[#FAF9F6] text-slate-900 overflow-x-hidden selection:bg-amber-200'>
            {/* HERO SECTION - Immersive Cinematic Scale */}
            <section className='relative h-[85vh] min-h-[650px] bg-neutral-950 flex items-center text-white overflow-hidden'>
                <div
                    className='absolute inset-0 opacity-45 scale-105 animate-[subtle-zoom_20s_infinite_alternate]'
                    style={{
                        backgroundImage: "url(/home.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                {/* Dark Luxury Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent' />

                <div className='relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center'>
                    <motion.div
                        initial='hidden'
                        animate='visible'
                    >
                        <span className='inline-flex items-center gap-2 uppercase tracking-[0.3em] text-xs font-semibold text-amber-400 mb-6 bg-amber-500/10 px-4 py-1.5 rounded-full backdrop-blur-sm'>
                            <Sparkles
                                size={12}
                                className='text-amber-400'
                            />{" "}
                            Gur Natyror Ekskluziv
                        </span>
                        <h1 className='text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6 font-serif leading-[1.15] text-neutral-50'>
                            Zbuloni Mermer Premium <br />
                            <span className='italic font-normal text-amber-100'>
                                & Arkitekturë Unike
                            </span>
                        </h1>
                        <p className='text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-neutral-300 font-light leading-relaxed tracking-wide'>
                            Mbi 2,000 nuanca, blloqe ekskluzive dhe tekstura
                            guri natyror të përzgjedhura për projektet tuaja më
                            elitare.
                        </p>
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
                            <button
                                onClick={() => navigate("/materials")}
                                className='group bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-4 rounded-md text-base font-medium inline-flex items-center gap-3 transition-all duration-300 shadow-xl shadow-amber-950/20 hover:-translate-y-0.5'
                            >
                                Eksploroni Katalogun
                                <ArrowRight
                                    size={18}
                                    className='group-hover:translate-x-1 transition-transform'
                                />
                            </button>
                            <button
                                onClick={() => navigate("/design")}
                                className='group bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-md text-base font-medium inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5'
                            >
                                Studio e Vizualizimit
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Elegant bottom border line */}
                <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent'></div>
            </section>

            {/* VALUE PROPOSITION - Minimalist & Trust-focused */}
            <section className='py-24 bg-white relative z-10'>
                <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {/* Card 1 */}
                        <motion.div className='text-left flex flex-col items-start group'>
                            <div className='inline-flex items-center justify-center w-14 h-14 bg-neutral-50 text-neutral-900 border border-neutral-100 rounded-lg mb-6 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300 shadow-sm'>
                                <Award
                                    size={26}
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className='text-xl font-medium tracking-wide mb-3 font-serif text-neutral-900'>
                                Cilësi Premium e Çertifikuar
                            </h3>
                            <p className='text-neutral-500 font-light leading-relaxed text-sm sm:text-base'>
                                Çdo pllakë përzgjidhet me dorë direkt nga
                                guroret më prestigjoze në Itali, Greqi dhe
                                Spanjë.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div className='text-left flex flex-col items-start group'>
                            <div className='inline-flex items-center justify-center w-14 h-14 bg-neutral-50 text-neutral-900 border border-neutral-100 rounded-lg mb-6 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300 shadow-sm'>
                                <Users
                                    size={26}
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className='text-xl font-medium tracking-wide mb-3 font-serif text-neutral-900'>
                                Asistencë për Arkitektët
                            </h3>
                            <p className='text-neutral-500 font-light leading-relaxed text-sm sm:text-base'>
                                Ofrojmë mbështetje teknike CAD/3D, skedarë me
                                rezolucion të lartë të damarëve dhe konsulencë
                                inxhinierike.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div className='text-left flex flex-col items-start group'>
                            <div className='inline-flex items-center justify-center w-14 h-14 bg-neutral-50 text-neutral-900 border border-neutral-100 rounded-lg mb-6 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300 shadow-sm'>
                                <Clock
                                    size={26}
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className='text-xl font-medium tracking-wide mb-3 font-serif text-neutral-900'>
                                Prerje & Logjistikë CNC
                            </h3>
                            <p className='text-neutral-500 font-light leading-relaxed text-sm sm:text-base'>
                                Teknologji precize e prerjes me makineri CNC për
                                detaje perfekte të banakëve dhe profileve tuaja.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURED INVENTORY - The B2B High-End Catalog Layer */}
            <section className='py-24 bg-neutral-50/60 border-t border-b border-neutral-100'>
                <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                    <div className='flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4'>
                        <div>
                            <span className='text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 block mb-2'>
                                Koleksioni Live
                            </span>
                            <h2 className='text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-serif'>
                                Materiale Ekskluzive në Magazinë
                            </h2>
                        </div>
                        <p className='text-neutral-500 font-light max-w-md text-sm sm:text-base leading-relaxed'>
                            Ekzemplarë unikë të disponueshëm për inspektim të
                            menjëhershëm në bllok ose pllakë.
                        </p>
                    </div>

                    {loading ? (
                        <div className='text-center py-24'>
                            <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neutral-900'></div>
                        </div>
                    ) : (
                        <motion.div
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerContainer}
                        >
                            {featuredMaterials.map((material) => (
                                <motion.div
                                    key={material.id}
                                    onClick={() => navigate("/materials")}
                                    className='group bg-white rounded-xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col'
                                >
                                    <div className='h-72 overflow-hidden relative bg-neutral-100'>
                                        {/* Status Tag for B2B Premium perception */}

                                        <img
                                            src={material.image_url}
                                            alt={material.name}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
                                            loading='lazy'
                                        />
                                        <div className='absolute inset-0 bg-neutral-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                    </div>
                                    <div className='p-6 flex-grow flex flex-col justify-between border-t border-neutral-50'>
                                        <div>
                                            <div className='flex items-center justify-between mb-2'>
                                                <h3 className='text-lg font-medium tracking-wide text-neutral-900 font-serif group-hover:text-amber-600 transition-colors'>
                                                    {material.name}
                                                </h3>
                                                <span className='text-xs text-neutral-400 font-mono'>
                                                    20mm / 30mm
                                                </span>
                                            </div>
                                            <p className='text-neutral-500 text-sm font-light line-clamp-2 leading-relaxed'>
                                                {material.description ||
                                                    "Strukturë kompakte me damarë elegantë, e përshtatshme për sipërfaqe luksoze të brendshme dhe veshje fasadash."}
                                            </p>
                                        </div>
                                        <div className='mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400'>
                                            <span className='flex items-center gap-1.5'>
                                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block'></span>
                                                Në Dispozicion
                                            </span>
                                            <span className='group-hover:text-neutral-900 font-medium inline-flex items-center gap-1 transition-colors'>
                                                Detajet <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    <div className='text-center mt-16'>
                        <button
                            onClick={() => navigate("/materials")}
                            className='group bg-transparent hover:bg-neutral-950 text-neutral-900 hover:text-white border border-neutral-900 px-8 py-3.5 rounded-md font-medium text-sm tracking-wider uppercase inline-flex items-center gap-3 transition-all duration-300'
                        >
                            Shikoni Të Gjithë Koleksionin
                            <ArrowRight
                                size={16}
                                className='group-hover:translate-x-1 transition-transform'
                            />
                        </button>
                    </div>
                </div>
            </section>

            {/* EXISTING MIDDLE SECTIONS WITH HIGH-END PADDING CONTROLS */}
            <MarbleQualitySection />
            <GallerySection />
            <TestimonialsStatsSection />

            {/* CALL TO ACTION VISUALIZER - Interactive Conversion Layer */}
            <section className='py-24 bg-white relative overflow-hidden border-t border-neutral-100'>
                <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
                        <motion.div
                            className='lg:col-span-5'
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className='text-xs font-semibold tracking-[0.25em] uppercase text-amber-600 block mb-3'>
                                Mjet Interaktiv
                            </span>
                            <h2 className='text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-serif mb-6 leading-tight'>
                                Dizenjoni Hapësirën <br />
                                Tuaj në Kohë Reale
                            </h2>
                            <p className='text-neutral-500 font-light text-base leading-relaxed mb-8'>
                                Përdorni studion tonë dixhitale për të testuar
                                teksturat e mermerit Calacatta, Nero Marquina
                                apo Quartzite direkt mbi strukturat e kuzhinave
                                apo tualeteve para se të merrni vendimin
                                përfundimtar.
                            </p>
                            <button
                                onClick={() => navigate("/design")}
                                className='group bg-neutral-950 hover:bg-neutral-800 text-white px-8 py-4 rounded-md font-medium text-sm tracking-wider uppercase inline-flex items-center gap-3 transition-all duration-300 shadow-lg shadow-neutral-950/10'
                            >
                                Provo Studion e Vizualizimit
                                <ArrowRight
                                    size={16}
                                    className='group-hover:translate-x-1 transition-transform'
                                />
                            </button>
                        </motion.div>

                        <motion.div
                            className='lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl relative group bg-neutral-100 aspect-[16/10]'
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src='/dc4564-004-rt.jpg'
                                alt='Kitchen Luxury Stone Design Render'
                                className='w-full h-full object-cover transform duration-1000 group-hover:scale-102'
                            />
                            {/* Visual effect mimicry of interactive interface */}
                            <div className='absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-neutral-200 shadow-md text-[11px] font-medium tracking-wide uppercase text-neutral-800 flex items-center gap-2'>
                                <span className='w-2 h-2 rounded-full bg-amber-500 animate-pulse'></span>{" "}
                                Klikoni për të ndryshuar materialin
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
