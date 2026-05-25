"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const stats = [
    { value: 200, suffix: "+", label: "Projekte të Realizuara" },
    { value: 10, suffix: "+", label: "Vite Eksperiencë" },
    { value: 500, suffix: "+", label: "Klientë të Kënaqur" },
    { value: 100, suffix: "%", label: "Garanci Cilësie" },
];

const testimonials = [
    {
        name: "Ardit K.",
        role: "Pronar Rezidence, Tiranë",
        text: "Punë jashtëzakonisht profesionale dhe saktësi milimetrike në montimin e banakut të kuzhinës. Materiali i përzgjedhur është kryevepër.",
    },
    {
        name: "Elona M.",
        role: "Arkitekte Interieri",
        text: "Bashkëpunim perfekt në çdo fazë. Si arkitekte, vlerësoj maksimalisht vëmendjen ndaj detajeve dhe prerjet e pastra pa asnjë sforcim.",
    },
    {
        name: "Blerim T.",
        role: "Zhvillues Imobiliar",
        text: "Mermeri i shkallëve dhe fasadës ka ngritur vlerën e të gjithë objektit. Korrektësi maksimale me afatet e dorëzimit.",
    },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        const duration = 2000; // Smoother 2-second ease-out animation

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Smooth cubic easeOut implementation
            const progressPercentage = Math.min(progress / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progressPercentage, 3);

            const currentCount = Math.floor(easeOutProgress * value);

            if (progressPercentage < 1) {
                setCount(currentCount);
                requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
        <div
            ref={ref}
            className='font-serif'
        >
            <span className='text-4xl md:text-5xl lg:text-6xl font-medium text-[#f5deb3] tracking-tight '>
                {count}
            </span>
            <span className='text-2xl md:text-3xl font-light text-amber-500 ml-0.5'>
                {suffix}
            </span>
        </div>
    );
}

export default function TestimonialsStatsSection() {
    return (
        <section className='w-full py-24 lg:py-32 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 border-t border-neutral-100'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                {/* SECTION HEADER */}
                <div className='text-center mb-20'>
                    <span className='text-xs font-semibold tracking-[0.25em] uppercase text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full'>
                        Dëshmi & Arritje
                    </span>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 mt-6 max-w-2xl mx-auto'>
                        Çfarë Thonë Klientët Tanë
                    </h2>
                    <div className='w-12 h-[1px] bg-neutral-200 mx-auto mt-6' />
                    <p className='mt-4 text-neutral-500 text-base font-light max-w-xl mx-auto'>
                        Besimi i bashkëpunëtorëve dhe klientëve tanë është
                        dëshmia më e pastër e përkushtimit tonë ndaj
                        përsosmërisë.
                    </p>
                </div>

                {/* TESTIMONIALS GRID */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24'>
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                ease: [0.21, 0.47, 0.32, 0.98],
                            }}
                            className='bg-white border border-neutral-200/60 rounded-xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group'
                        >
                            <div>
                                {/* Visual Accent/Quote Mark */}
                                <div className='absolute top-6 right-8 text-neutral-100 group-hover:text-amber-500/10 transition-colors duration-300 pointer-events-none'>
                                    <Quote
                                        size={40}
                                        fill='currentColor'
                                        stroke='none'
                                    />
                                </div>

                                {/* Stars Component */}
                                <div className='flex gap-1 mb-5'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className='w-3.5 h-3.5 text-amber-500 fill-amber-500'
                                            strokeWidth={1}
                                        />
                                    ))}
                                </div>

                                <p className='text-neutral-600 text-sm font-light leading-relaxed mb-6 italic'>
                                    “{item.text}”
                                </p>
                            </div>

                            <div className='border-t border-neutral-100 pt-4 mt-auto'>
                                <h4 className='font-medium text-sm text-neutral-900 tracking-wide'>
                                    {item.name}
                                </h4>
                                <p className='text-neutral-400 text-xs font-light mt-0.5'>
                                    {item.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* STATS COUNTDOWN PLATFORM */}
                <div className='bg-neutral-950 text-white rounded-2xl p-10 md:p-14 border border-neutral-900 shadow-2xl relative overflow-hidden'>
                    {/* Subtle geometry backing */}
                    <div className='absolute -right-16 -bottom-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none' />

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 text-center relative z-10'>
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className='flex flex-col space-y-2 '
                            >
                                <Counter
                                    value={item.value}
                                    suffix={item.suffix}
                                />
                                <p className='text-neutral-400 text-xs md:text-sm font-light tracking-wide uppercase max-w-[160px] mx-auto leading-snug'>
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
