"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const stats = [
    { value: 200, suffix: "+", label: "Projekte të Realizuara" },
    { value: 10, suffix: "+", label: "Vite Eksperiencë" },
    { value: 500, suffix: "+", label: "Klientë të Kënaqur" },
    { value: 100, suffix: "%", label: "Garanci Cilësie" },
];

const testimonials = [
    {
        name: "Ardit K.",
        text: "Punë shumë profesionale dhe material cilësor. Rezultati final ishte mbi pritshmëritë!",
    },
    {
        name: "Elona M.",
        text: "Komunikim perfekt dhe instalim i shpejtë. Do ju rekomandoja pa hezitim.",
    },
    {
        name: "Blerim T.",
        text: "Mermeri që zgjodhëm duket fantastik në kuzhinë. Shërbim shumë i mirë.",
    },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 1500;
        const increment = value / (duration / 16);

        const counter = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(counter);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(counter);
    }, [isInView, value]);

    return (
        <h3
            ref={ref}
            className='text-4xl md:text-5xl font-bold text-[#ff6b00]'
        >
            {count}
            {suffix}
        </h3>
    );
}

export default function TestimonialsStatsSection() {
    return (
        <section className='w-full py-24 bg-gradient-to-b from-[#f3ede7] to-[#ffffff]'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* TITLE */}
                <div className='text-center mb-14'>
                    <h2 className='text-4xl md:text-5xl font-semibold text-[#1a1a1a]'>
                        Çfarë Thonë Klientët Tanë
                    </h2>
                    <p className='mt-4 text-[#6b6b6b] max-w-2xl mx-auto'>
                        Besimi i klientëve është prova më e fortë e cilësisë së
                        punës sonë.
                    </p>
                </div>

                {/* TESTIMONIALS */}
                <div className='grid md:grid-cols-3 gap-6'>
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className='bg-white/80 backdrop-blur-md border border-[#eee] rounded-2xl p-6 shadow-sm hover:shadow-2xl transition'
                        >
                            {/* Stars */}
                            <div className='flex mb-3'>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className='w-4 h-4 text-[#ff6b00] fill-[#ff6b00]'
                                    />
                                ))}
                            </div>

                            <p className='text-[#4a4a4a] text-sm leading-relaxed mb-4'>
                                “{item.text}”
                            </p>

                            <h4 className='font-semibold text-[#1a1a1a]'>
                                {item.name}
                            </h4>
                        </motion.div>
                    ))}
                </div>
                {/* STATS */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-10 text-center mt-20'>
                    {stats.map((item, index) => (
                        <div key={index}>
                            <Counter
                                value={item.value}
                                suffix={item.suffix}
                            />
                            <p className='mt-2 text-[#6b6b6b] text-sm'>
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
