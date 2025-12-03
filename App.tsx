import React from 'react';
import { InkCursor } from './components/InkCursor';
import { Hero } from './components/Hero';
import { HistoryList } from './components/HistoryList';
import { AskTheInkwell } from './components/AskTheInkwell';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-white selection:text-black cursor-none">
      <InkCursor />
      
      {/* Navigation / Header (Minimalist) */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center mix-blend-exclusion pointer-events-none">
        <span className="font-serif font-bold text-xl tracking-widest text-white pointer-events-auto">INKY.ORIGINS</span>
        <a 
            href="https://github.com/google/genai-toolbox" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] hover:opacity-50 transition-opacity text-white pointer-events-auto"
        >
          About
        </a>
      </nav>

      <Hero />

      {/* Intro Text Block */}
      <section className="py-32 px-6 flex justify-center bg-[#09090b] relative z-10">
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-5xl font-serif text-center max-w-5xl leading-tight text-zinc-200"
        >
            <span className="text-zinc-600 block text-lg font-sans font-bold tracking-widest uppercase mb-8">Manifiesto</span>
            "La tinta es la sangre del pensamiento. Sin ella, las ideas se desvanecen como el humo en el viento."
        </motion.p>
      </section>

      {/* Interactive Timeline Section */}
      <HistoryList />

      <AskTheInkwell />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black text-center relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-[18vw] leading-none font-bold text-zinc-900 select-none pointer-events-none font-serif opacity-50">
                FINIS
            </h2>
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 text-sm text-zinc-500 uppercase tracking-widest pointer-events-auto">
                <span className="hover:text-white transition-colors cursor-none">React</span>
                <span className="hover:text-white transition-colors cursor-none">Tailwind</span>
                <span className="hover:text-white transition-colors cursor-none">Gemini</span>
            </div>
        </div>
      </footer>
    </main>
  );
};

export default App;