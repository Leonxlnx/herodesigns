import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';

// --- VISUAL ASSETS (CSS ART) ---

const ThumbnailFlowlyTech = () => (
  <div className="relative w-full h-full bg-[#02040a] overflow-hidden group-hover:scale-105 transition-transform duration-700">
    {/* Grid & Glows */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
    <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-blue-600/20 blur-[80px]" />
    <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-600/10 blur-[60px]" />
    
    {/* Mini Interface */}
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="relative w-full h-full border border-white/10 bg-[#0f1115]/80 backdrop-blur-md rounded-lg shadow-2xl flex flex-col overflow-hidden transform group-hover:rotate-x-2 group-hover:rotate-y-[-2deg] transition-transform duration-500 perspective-1000">
         {/* Window Header */}
         <div className="h-4 border-b border-white/5 flex items-center px-2 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
         </div>
         {/* Body */}
         <div className="flex-1 flex p-2 gap-2">
            <div className="w-8 border-r border-white/5 flex flex-col gap-2 pt-1">
               <div className="w-4 h-4 rounded bg-blue-500/20" />
               <div className="w-4 h-4 rounded bg-white/5" />
               <div className="w-4 h-4 rounded bg-white/5" />
            </div>
            <div className="flex-1 flex gap-2">
               {[1,2,3].map(i => (
                  <div key={i} className="flex-1 bg-white/[0.02] rounded border border-white/[0.02] p-1 space-y-1">
                     <div className="w-full h-1 bg-white/10 rounded-full" />
                     <div className="w-3/4 h-8 bg-[#15171b] border border-white/5 rounded" />
                     <div className="w-full h-8 bg-[#15171b] border border-white/5 rounded opacity-50" />
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  </div>
);

const ThumbnailFlowlyWarm = () => (
  <div className="relative w-full h-full bg-[#1a1510] overflow-hidden group-hover:scale-105 transition-transform duration-700">
    {/* Warm Glows */}
    <div className="absolute top-0 right-0 w-[100%] h-[100%] bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.15),transparent_50%)]" />
    <div className="absolute bottom-0 left-0 w-[100%] h-[100%] bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.1),transparent_50%)]" />
    
    {/* Content Layout */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
       {/* Fake Text */}
       <div className="text-center space-y-1 z-10">
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#e8dac0] to-[#b39b6d] rounded-full mx-auto" />
          <div className="w-16 h-1 bg-[#e8dac0]/30 rounded-full mx-auto" />
       </div>

       {/* Floating Cards */}
       <div className="relative w-32 h-20">
          <div className="absolute top-0 left-0 w-20 h-14 bg-[#2a241c]/60 border border-[#e8dac0]/20 backdrop-blur-sm rounded-lg shadow-xl transform -rotate-6 z-0" />
          <div className="absolute top-2 right-0 w-20 h-14 bg-[#2a241c]/80 border border-[#e8dac0]/30 backdrop-blur-sm rounded-lg shadow-2xl transform rotate-6 z-10 flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-[#e8dac0]/50 flex items-center justify-center">
                <div className="w-4 h-4 bg-[#e8dac0]/80 rounded-full" />
             </div>
          </div>
       </div>
    </div>
  </div>
);

const ThumbnailNeo = () => (
   <div className="relative w-full h-full bg-[#09090b] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
      
      {/* Bento Grid Mini */}
      <div className="grid grid-cols-4 grid-rows-3 gap-1.5 w-48 h-32 opacity-80 group-hover:opacity-100 transition-opacity">
         {/* Large Item */}
         <div className="col-span-2 row-span-2 bg-[#18181b] rounded border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/10" />
            <div className="absolute bottom-2 left-2 w-8 h-1 bg-white/20 rounded-full" />
         </div>
         {/* Small Items */}
         <div className="col-span-1 row-span-1 bg-[#27272a] rounded border border-white/10" />
         <div className="col-span-1 row-span-1 bg-purple-600 rounded border border-white/10" />
         
         {/* Med Items */}
         <div className="col-span-1 row-span-2 bg-[#18181b] rounded border border-white/10 flex flex-col gap-1 p-1">
             {[1,2,3].map(i => <div key={i} className="w-full h-1 bg-white/10 rounded-full" />)}
         </div>
         <div className="col-span-1 row-span-1 bg-[#18181b] rounded border border-white/10" />
         
         {/* Wide Item */}
         <div className="col-span-2 row-span-1 bg-[#1c1c21] rounded border border-white/10 flex items-center justify-center">
             <div className="w-16 h-1.5 bg-white/10 rounded-full" />
         </div>
      </div>
   </div>
);

// --- MAIN COMPONENT ---

const items = [
  {
    id: 'flowly',
    title: 'Flowly Tech',
    description: 'SaaS / Product',
    thumbnail: <ThumbnailFlowlyTech />,
    status: 'Ready'
  },
  {
    id: 'flowly-warm',
    title: 'Flowly Warm',
    description: 'Luxury / Agency',
    thumbnail: <ThumbnailFlowlyWarm />,
    status: 'Ready'
  },
  {
    id: 'neo',
    title: 'Neo Portfolio',
    description: 'Bento / Grid',
    thumbnail: <ThumbnailNeo />,
    status: 'Ready'
  }
];

const CollectorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans selection:bg-white/20 overflow-x-hidden">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-white/[0.02] blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-20">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 space-y-4"
        >
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
             Hero Designs<span className="text-white/30">.</span>
           </h1>
           <p className="text-lg text-white/50">
             High-fidelity headers for inspiration.
           </p>
        </motion.header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => item.status === 'Ready' && navigate(`/template/${item.id}`)}
              className={`group flex flex-col gap-6 ${item.status === 'Ready' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
            >
              {/* Thumbnail Frame */}
              <div className="relative aspect-[16/10] w-full bg-[#0a0a0a] rounded-xl border border-white/[0.08] overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.07)]">
                 {/* Inner Thumbnail Component */}
                 <div className="w-full h-full">
                    {item.thumbnail}
                 </div>

                 {/* Hover Overlay */}
                 <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hovered === item.id ? 'opacity-0' : 'opacity-100'}`} />
                 
                 {/* Action Button */}
                 {item.status === 'Ready' && (
                   <div className="absolute top-4 right-4 z-20">
                      <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                         <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                   </div>
                 )}
              </div>

              {/* Meta Info */}
              <div className="px-1 flex justify-between items-start">
                 <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-white/80 transition-colors">{item.title}</h3>
                    <p className="text-sm text-white/40 mt-1">{item.description}</p>
                 </div>
                 {item.status === 'Locked' && (
                    <div className="text-[10px] font-bold uppercase tracking-widest py-1 px-2 rounded border border-white/5 text-white/30">
                       Locked
                    </div>
                 )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-40 pt-10 border-t border-white/[0.08] flex justify-between items-center text-xs text-white/30 uppercase tracking-widest">
           <span>Flowly © 2026</span>
        </div>

      </div>
    </div>
  );
};

export default CollectorDashboard;