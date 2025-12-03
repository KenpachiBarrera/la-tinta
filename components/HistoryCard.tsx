import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InkEra } from '../types';

interface Props {
    data: InkEra;
    index: number;
}

export const HistoryCard: React.FC<Props> = ({ data, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);

    const isEven = index % 2 === 0;

    return (
        <motion.div 
            ref={ref}
            style={{ opacity, y, scale }}
            className={`flex flex-col md:flex-row items-center gap-12 py-24 px-6 md:px-0 max-w-6xl mx-auto ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    {/* Placeholder for abstract ink imagery */}
                    <img 
                        src={`https://picsum.photos/seed/${data.id}/800/600?grayscale`} 
                        alt={data.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className="text-6xl md:text-8xl font-serif text-white/10 font-bold select-none absolute -top-12 -left-2">
                            {data.year}
                        </span>
                        <h3 className="text-3xl font-bold text-white relative mt-4">{data.title}</h3>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-6">
                <h4 className="text-zinc-500 font-serif italic text-xl">El Origen</h4>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
                    {data.description}
                </p>
                <div className="h-[1px] w-12 bg-white/30" />
                <p className="text-sm text-zinc-500 leading-relaxed">
                    {data.details}
                </p>
            </div>
        </motion.div>
    );
};