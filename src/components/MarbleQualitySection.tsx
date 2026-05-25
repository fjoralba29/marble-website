"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gem, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
    {
        icon: Gem,
        title: "Cilësi e Lartë",
        desc: "Bllqe mermeri të përzgjedhura direkt nga guroret më të njohura europiane me certifikim origjine.",
    },
    {
        icon: Clock,
        title: "Jetëgjatësi Maksimale",
        desc: "Strukturë kompakte me porozitet minimal, absolutisht rezistente ndaj lagështisë, konsumit dhe kohës.",
    },
    {
        icon: ShieldCheck,
        title: "Rezistencë & Qëndrueshmëri",
        desc: "Trajtim me mbrojtës sipërfaqësor premium që parandalon njollat dhe dëmtimet strukturore.",
    },
    {
        icon: Sparkles,
        title: "Përpunim Perfekt",
        desc: "Prerje me teknologji CNC të saktësisë milimetrike dhe lustrim artizanal për shkëlqim pasqyror.",
    },
];

export default function MarbleQualitySection() {
    return (
        <section className='w-full py-24 lg:py-32 bg-gradient-to-b from-neutral-50 via-[#FAF8F5] to-neutral-50 relative overflow-hidden'>
            {/* Decorative background stone grain line */}
            <div className='absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]' />

            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10'>
                {/* Subtle Section Divider Label */}
                <div className='flex flex-col items-center mb-6'>
                    <span className='text-xs font-semibold tracking-[0.25em] uppercase text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full'>
                        Standardi Beqaraj
                    </span>
                    <div className='w-12 h-[1px] bg-neutral-200 mt-4' />
                </div>

                {/* Section Header */}
                <div className='text-center mb-20'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 max-w-4xl mx-auto leading-[1.15]'>
                        Materiale Premium. Rezultate që sfidojnë kohën.
                    </h2>
                    <p className='mt-5 text-neutral-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed'>
                        Zgjedhim dhe përpunojmë gur natyral me teknologjinë më
                        të avancuar, duke garantuar sipërfaqe që ruajnë vlerën,
                        strukturën dhe elegancën e tyre përgjithmonë.
                    </p>
                </div>

                {/* Features Grid Layout */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                }}
                                whileHover={{ y: -6 }}
                                className='bg-white/70 backdrop-blur-md border border-neutral-200/60 rounded-xl p-8 shadow-sm hover:shadow-xl hover:bg-white hover:border-neutral-300/80 transition-all duration-300 group'
                            >
                                {/* Icon Container */}
                                <div className='w-12 h-12 flex items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 mb-6 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300 shadow-sm'>
                                    <Icon
                                        className='w-5 h-5 text-neutral-800 group-hover:text-neutral-950 transition-colors duration-300'
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <h3 className='text-lg font-medium text-neutral-900 mb-3 tracking-wide'>
                                    {item.title}
                                </h3>

                                <p className='text-neutral-500 text-sm font-light leading-relaxed'>
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Premium Call To Action */}
                <div className='mt-20 flex flex-col items-center justify-center gap-4'>
                    <Link to='/contact'>
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            className='px-8 py-4 bg-neutral-950 text-white hover:bg-neutral-900 text-sm font-medium tracking-wider uppercase rounded-md transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center gap-3 group'
                        >
                            Konsultoni Projektin Tuaj Falas
                            <ArrowRight
                                size={16}
                                className='text-amber-400 group-hover:translate-x-1 transition-transform'
                            />
                        </motion.button>
                    </Link>
                    <p className='text-xs text-neutral-400 font-light'>
                        Pa asnjë detyrim — analizë e detajuar e planeve dhe
                        materialeve.
                    </p>
                </div>
            </div>
        </section>
    );
}
