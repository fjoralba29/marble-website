"use client";

import { motion } from "framer-motion";

const images = [
    {
        src: "/Gallery1.jpg",
        title: "Kitchen Luxury",
    },
    {
        src: "/Gallery2.jpg",
        title: "Modern Bathroom",
    },
    {
        src: "/Gallery3.jpg",
        title: "Black Fusion",
    },
    {
        src: "/Gallery4.jpg",
        title: "White Elegance",
    },
    {
        src: "/Gallery5.jpg",
        title: "Golden Veins",
    },
    {
        src: "/Gallery6.png",
        title: "Minimal Interior",
    },
];

export default function GallerySection() {
    return (
        <section className='w-full py-20 bg-white'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Header */}
                <div className='text-center mb-14'>
                    <h2 className='text-4xl md:text-5xl font-semibold text-[#1a1a1a]'>
                        Galeria Jonë
                    </h2>
                    <p className='mt-4 text-[#6b6b6b] max-w-2xl mx-auto'>
                        Shikoni disa nga projektet dhe materialet tona më të
                        bukura në përdorim real.
                    </p>
                </div>

                {/* Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='relative overflow-hidden rounded-2xl group cursor-pointer'
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                className='w-full h-[480px] object-cover transition-transform duration-500 group-hover:scale-110'
                            />

                            {/* Overlay
                            <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-4'>
                                <h3 className='text-white text-lg font-semibold'>
                                    {img.title}
                                </h3>
                            </div> */}
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className='mt-14 flex justify-center'>
                    <button className='px-8 py-3 bg-[#ff6b00] text-white rounded-full hover:bg-[#e65c00] transition'>
                        Shiko Më Shumë
                    </button>
                </div>
            </div>
        </section>
    );
}
