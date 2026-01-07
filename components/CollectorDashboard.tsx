import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from './ui/GlassCard';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutTemplate, Star, Zap, Layers } from 'lucide-react';

const templates = [
  {
    id: 'flowly',
    title: 'Flowly Tech Hero',
    description: 'Dark mode, blue tech aesthetics, 3D tilt interface. High fidelity SaaS reproduction.',
    tags: ['SaaS', 'Tech', 'Blue'],
    gradient: 'from-blue-900 to-slate-900',
    status: 'LIVE'
  },
  {
    id: 'flowly-warm',
    title: 'Flowly Warm Hero',
    description: 'Luxury wood & gold aesthetic with centered layout and floating glass elements.',
    tags: ['Luxury', 'Warm', 'Gold'],
    gradient: 'from-amber-900 to-stone-900',
    status: 'NEW'
  },
  {
    id: 'awwwards',
    title: 'Awwwards Journey',
    description: '12-section vertical odyssey. Hyper-motion, parallax, and luxury aesthetics.',
    tags: ['Motion', 'Luxury', 'Scroll'],
    gradient: 'from-orange-900 to-stone-900',
    status: 'LIVE'
  }
];

const CollectorDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 md:p-12 font-sans relative overflow-hidden">
      {/* Background Noise */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <header className="relative z-10 mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300"
        >
          <Star size={12} className="fill-blue-300" />
          <span>Professional Collector</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold tracking-tight"
        >
          Section Collector
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-lg text-lg"
        >
          A curated library of high-fidelity website sections. Built with React, Tailwind, and Framer Motion.
        </motion.p>
      </header>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            onClick={() => {
              if(template.status !== 'SOON') navigate(`/template/${template.id}`);
            }}
            className={template.status !== 'SOON' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
          >
            <div className={`h-full group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${template.gradient} transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1`}>
              
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    {template.id === 'awwwards' ? <Zap size={24} /> : 
                     template.id === 'flowly' ? <Layers size={24} /> :
                     <LayoutTemplate size={24} />}
                  </div>
                  <div className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    template.status === 'LIVE' ? 'bg-green-500/20 text-green-300 border-green-500/20' :
                    template.status === 'NEW' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20' :
                    'bg-gray-500/20 text-gray-400 border-gray-500/20'
                  }`}>
                    {template.status}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">{template.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{template.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-black/30 rounded border border-white/5 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                  {template.status !== 'SOON' ? 'View Template' : 'In Progress'} 
                  {template.status !== 'SOON' && <ArrowRight size={16} />}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollectorDashboard;