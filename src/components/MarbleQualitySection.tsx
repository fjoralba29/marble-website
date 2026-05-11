"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gem, Clock, Sparkles } from "lucide-react";

const features = [
    {
        icon: Gem,
        title: "Cilësi e Lartë",
        desc: "Materiale të përzgjedhura nga burime të certifikuara me standarde premium.",
    },
    {
        icon: Clock,
        title: "Jetëgjatësi Maksimale",
        desc: "Rezistente ndaj konsumit, lagështisë dhe temperaturave për përdorim afatgjatë.",
    },
    {
        icon: ShieldCheck,
        title: "Rezistencë & Qëndrueshmëri",
        desc: "Sipërfaqe që ruajnë pamjen elegante dhe nuk dëmtohen lehtë.",
    },
    {
        icon: Sparkles,
        title: "Përpunim Perfekt",
        desc: "Precizion maksimal në prerje dhe përfundime për një rezultat flawless.",
    },
];

export default function MarbleQualitySection() {
    return (
        <section className='w-full py-20 bg-gradient-to-b from-[#fdfaf6] to-[#f3ede7]'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Top subtle divider */}
                <div className='h-px bg-gradient-to-r from-transparent via-[#ff6b00]/40 to-transparent mb-12' />

                {/* Header */}
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-semibold tracking-tight text-[#1a1a1a]'>
                        Materiale Premium. Rezultate që zgjasin një jetë.
                    </h2>
                    <p className='mt-4 text-[#6b6b6b] max-w-2xl mx-auto'>
                        Zgjedhim dhe përpunojmë mermer dhe gur natyral me
                        standardet më të larta, për projekte që ruajnë vlerën
                        dhe elegancën me kalimin e kohës.
                    </p>
                </div>

                {/* Features */}
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className='bg-white/80 backdrop-blur-md border border-[#eee] rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group'
                            >
                                <div className='w-12 h-12 flex items-center justify-center rounded-xl bg-[#fff3e8] mb-4 group-hover:bg-[#ff6b00] transition'>
                                    <Icon className='w-6 h-6 text-[#ff6b00] group-hover:text-white transition' />
                                </div>

                                <h3 className='text-lg font-semibold text-[#1a1a1a] mb-2'>
                                    {item.title}
                                </h3>

                                <p className='text-[#6b6b6b] text-sm leading-relaxed'>
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className='mt-16 flex justify-center'>
                    <a href='/contact'>
                        <button className='px-8 py-3 bg-[#ff6b00] text-white rounded-full hover:bg-[#e65c00] transition-all duration-300 shadow-md hover:shadow-lg'>
                            Kontakto për Konsultim Falas
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
