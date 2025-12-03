import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askInkHistorian } from '../services/geminiService';
import { Send, Droplets, Sparkles, Loader2 } from 'lucide-react';

export const AskTheInkwell: React.FC = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setResponse(null);
        
        const answer = await askInkHistorian(query);
        
        setResponse(answer);
        setLoading(false);
    };

    return (
        <section className="py-32 px-4 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-transparent pointer-events-none" />
            
            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="inline-block p-4 rounded-full bg-white/5 mb-6 backdrop-blur-sm border border-white/10"
                    >
                        <Droplets className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Consulta al Tintero</h2>
                    <p className="text-zinc-400">La IA descubre los secretos olvidados de la historia.</p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                    <form onSubmit={handleAsk} className="relative mb-8">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ej: ¿Qué usaban los egipcios para escribir?"
                            className="w-full bg-black/40 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 transition-all placeholder:text-zinc-600"
                        />
                        <button 
                            type="submit" 
                            disabled={loading || !query}
                            className="absolute right-3 top-3 bg-white text-black p-2 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </form>

                    <AnimatePresence mode="wait">
                        {response && (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="border-t border-white/10 pt-6">
                                    <div className="flex items-start gap-4">
                                        <Sparkles className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0" />
                                        <p className="text-zinc-200 leading-loose font-light">
                                            {response}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};