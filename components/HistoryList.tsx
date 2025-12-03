import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { InkEra } from '../types';
import { INK_HISTORY } from '../constants';

interface HistoryItemProps {
    data: InkEra;
    index: number;
    setHoveredEra: (data: InkEra | null) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ 
    data, 
    index, 
    setHoveredEra 
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredEra(data)}
            onMouseLeave={() => setHoveredEra(null)}
            className="group relative flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 py-12 border-b border-white/10 transition-colors duration-300 hover:bg-white/5 px-6 md:px-12 cursor-none"
        >
            <span className="text-zinc-500 font-serif text-lg min-w-[100px] group-hover:text-zinc-300 transition-colors">
                {data.year}
            </span>
            
            <div className="flex-1">
                <h3 className="text-4xl md:text-6xl font-bold text-zinc-300 group-hover:text-white transition-colors duration-300 font-serif mb-4">
                    {data.title}
                </h3>
                <p className="max-w-xl text-zinc-500 group-hover:text-zinc-400 transition-colors font-light leading-relaxed">
                    {data.description}
                </p>
            </div>

            <div className="hidden md:block w-8 text-right opacity-0 group-hover:opacity-100 transition-opacity text-white/50">
                →
            </div>
        </motion.div>
    );
};

export const HistoryList: React.FC = () => {
    const [hoveredEra, setHoveredEra] = useState<InkEra | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Mouse tracking for floating image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Position relative to viewport for fixed image
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            className="relative py-20 bg-[#09090b] z-20"
        >
             <div className="px-6 md:px-12 mb-16">
                <motion.h2 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8"
                >
                    Cronología de la Tinta
                </motion.h2>
             </div>

            <div className="border-t border-white/10">
                {INK_HISTORY.map((era, index) => (
                    <HistoryItem 
                        key={era.id} 
                        data={era} 
                        index={index} 
                        setHoveredEra={setHoveredEra} 
                    />
                ))}
            </div>

            {/* Floating Image Reveal */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-[300px] h-[400px] overflow-hidden rounded-lg"
            >
                <motion.div
                    animate={{
                        opacity: hoveredEra ? 1 : 0,
                        scale: hoveredEra ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full bg-zinc-900 shadow-2xl"
                >
                    {hoveredEra && (
                        <>
                        <div className="absolute inset-0 bg-black/20 z-10 mix-blend-multiply" />
                        <img 
                            src={`https://picsum.photos/seed/${hoveredEra.id}/600/800?grayscale`} 
                            alt={hoveredEra.imageAlt}
                            className="w-full h-full object-cover"
                        />
                         <div className="absolute bottom-4 left-4 z-20">
                            <span className="text-xs font-bold bg-white text-black px-2 py-1 uppercase tracking-widest">
                                {hoveredEra.year}
                            </span>
                         </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
};