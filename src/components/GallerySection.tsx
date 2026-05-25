"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const images = [
    {
        src: "/Gallery1.jpg",
        title: "Shkallë Rezidenciale",
        category: "Mermer",
        span: "md:col-span-2 md:row-span-1",
    },
    {
        src: "/Gallery2.jpg",
        title: "Oxhak Modern",
        category: "Granit",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        src: "/Gallery3.jpg",
        title: "Minibar Komercial",
        category: "Kuarcit Premium",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        src: "/Gallery4.jpg",
        title: "Kuzhinë Rezidenciale",
        category: "Granit ",
        span: "md:col-span-2 md:row-span-1",
    },
    {
        src: "/Gallery5.jpg",
        title: "Tualet",
        category: "Mermer Carrara",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        src: "/Gallery6.png",
        title: "Shkallë të Brendshme",
        category: "Mermer",
        span: "md:col-span-2 md:row-span-1",
    },
];

export default function GallerySection() {
    return (
        <section className='w-full py-24 lg:py-32 bg-[#FAF8F5] border-t border-neutral-100'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                {/* HEADER */}
                <div className='flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6'>
                    <div className='text-left'>
                        <span className='text-xs font-semibold tracking-[0.25em] uppercase text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full'>
                            Portfolio
                        </span>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 mt-4 leading-tight'>
                            Projekte të Përzgjedhura
                        </h2>
                        <div className='w-12 h-[1px] bg-neutral-300 mt-4 hidden md:block' />
                    </div>
                    <p className='text-neutral-500 text-base font-light max-w-md leading-relaxed md:mb-1'>
                        Një pasqyrim i saktësisë sonë artizanale në objekte
                        rezidenciale dhe hapësira komerciale bashkëkohore.
                    </p>
                </div>

                {/* ASYMMETRIC PHOTOGRAPHY GRID */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[440px]'>
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.1,
                                ease: [0.21, 0.47, 0.32, 0.98],
                            }}
                            className={`relative overflow-hidden rounded-xl group cursor-pointer border border-neutral-200/40 bg-neutral-100 shadow-sm ${img.span}`}
                        >
                            {/* Image Frame */}
                            <img
                                src={img.src}
                                alt={img.title}
                                className='w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105'
                                loading='lazy'
                            />

                            {/* High-End Ambient Vignette Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent transition-opacity duration-500 group-hover:from-neutral-950/90' />

                            {/* Meta Typography Data Frame */}
                            <div className='absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
                                <div className='flex items-end justify-between gap-4'>
                                    <div className='space-y-1'>
                                        <p className='text-amber-400 text-xs font-medium tracking-widest uppercase'>
                                            {img.category}
                                        </p>
                                        <h3 className='text-white text-lg sm:text-xl font-serif font-medium tracking-wide'>
                                            {img.title}
                                        </h3>
                                    </div>

                                    {/* Luxury Minimal Action Icon */}
                                    <div className='w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg'>
                                        <ArrowUpRight
                                            size={18}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FOOTER ACTION BUTTON */}
                <div className='mt-16 flex justify-center'>
                    <Link to='/gallery'>
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            className='px-10 py-4 bg-neutral-950 text-white hover:bg-neutral-900 text-sm font-medium tracking-wider uppercase rounded-md transition-all duration-300 shadow-md hover:shadow-xl border border-neutral-900'
                        >
                            Shiko Galerinë e Plotë
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
