import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#09090b]">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-40">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-zinc-800 rounded-full blur-[150px]" 
                />
            </div>

            <motion.div 
                className="relative z-10 text-center px-4 w-full"
                style={{ y: y1, opacity }}
            >
                <motion.div
                    initial={{ filter: "blur(20px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <h1 className="text-[18vw] leading-[0.8] font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-800 tracking-tighter mix-blend-lighten select-none pointer-events-none">
                        INKY
                    </h1>
                </motion.div>
                
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 relative z-20"
                >
                    <p className="text-xl md:text-3xl text-zinc-400 font-light max-w-xl mx-auto tracking-wide">
                        Ecos de la historia 
                        <span className="text-white font-normal mx-2 italic font-serif">escritos</span>
                        en la oscuridad.
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-12 left-0 right-0 flex justify-center z-10"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
                    <motion.div 
                        animate={{ height: [0, 60, 0], y: [0, 0, 60] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] bg-zinc-500"
                    />
                </div>
            </motion.div>
        </section>
    );
};