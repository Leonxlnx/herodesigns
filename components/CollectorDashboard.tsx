import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Palette } from 'lucide-react';

// --- Mini Preview Components for the Thumbnails ---

const MiniFlowlyTech = () => (
  <div className="w-full h-full bg-[#02040a] relative overflow-hidden flex flex-col items-center pt-8 border-b border-white/5">
    {/* Background Glows */}
    <div className="absolute top-[-20%] left-[20%] w-[100%] h-[100%] bg-blue-900/20 blur-[60px]" />
    {/* Mini Navbar */}
    <div className="w-[80%] h-2 bg-white/5 rounded-full mb-6 flex justify-between items-center px-2">
      <div className="w-4 h-1 bg-blue-500 rounded-full" />
      <div className="flex gap-1"><div className="w-8 h-1 bg-white/10 rounded-full" /></div>
    </div>
    {/* Mini Content */}
    <div className="flex w-full px-8 gap-4">
      <div className="flex-1 space-y-2 pt-4">
        <div className="w-[80%] h-3 bg-gradient-to-r from-blue-200 to-white/10 rounded-sm" />
        <div className="w-[60%] h-3 bg-gradient-to-r from-blue-200 to-white/10 rounded-sm" />
        <div className="w-[90%] h-1 bg-white/10 rounded-full mt-2" />
        <div className="w-[70%] h-1 bg-white/10 rounded-full" />
        <div className="flex gap-2 mt-3">
           <div className="w-16 h-5 bg-white rounded-md" />
           <div className="w-16 h-5 border border-white/20 rounded-md" />
        </div>
      </div>
      {/* Mini 3D Tilt Element */}
      <div className="flex-1 perspective-[500px]">
         <div className="w-full h-32 bg-[#0f1115] border border-white/10 rounded-lg shadow-xl transform rotate-y-[-12deg] rotate-x-[5deg] p-2 flex gap-2">
            <div className="w-6 h-full bg-white/5 rounded-sm" />
            <div className="flex-1 space-y-2">
               <div className="w-full h-12 bg-white/5 rounded-sm border border-white/5" />
               <div className="flex gap-1 h-10">
                  <div className="flex-1 bg-white/5 rounded-sm" />
                  <div className="flex-1 bg-white/5 rounded-sm" />
               </div>
            </div>
         </div>
         {/* Floating bit */}
         <div className="absolute -right-2 top-8 w-12 h-8 bg-[#1e2029] border border-white/10 rounded-md shadow-lg transform translate-z-10" />
      </div>
    </div>
  </div>
);

const MiniFlowlyWarm = () => (
  <div className="w-full h-full bg-[#1a1510] relative overflow-hidden flex flex-col items-center pt-10 border-b border-white/5">
     {/* Background Glows */}
    <div className="absolute top-[20%] left-[20%] w-[80%] h-[80%] bg-orange-500/10 blur-[50px]" />
    {/* Mini Navbar */}
    <div className="w-[60%] h-2 bg-[#e8dac0]/10 rounded-full mb-8" />
    
    {/* Center Text */}
    <div className="text-center space-y-2 mb-6 z-10">
       <div className="w-32 h-2 bg-[#e8dac0] mx-auto rounded-sm" />
       <div className="w-24 h-2 bg-[#e8dac0]/50 mx-auto rounded-sm" />
       <div className="w-40 h-1 bg-[#e8dac0]/20 mx-auto rounded-full mt-2" />
    </div>

    {/* Floating Glass Cards */}
    <div className="absolute left-6 top-24 w-12 h-16 bg-[#2a241c]/60 border border-[#e8dac0]/20 rounded-md backdrop-blur-sm" />
    <div className="absolute right-8 top-20 w-16 h-12 bg-[#2a241c]/60 border border-[#e8dac0]/20 rounded-md backdrop-blur-sm" />
    <div className="absolute right-12 bottom-0 w-20 h-20 bg-[#2a241c]/60 border border-[#e8dac0]/20 rounded-t-lg backdrop-blur-sm" />
  </div>
);

const ComingSoonPlaceholder = () => (
   <div className="w-full h-full bg-[#050505] flex items-center justify-center border-b border-white/5">
      <div className="text-center space-y-2 opacity-30">
         <div className="w-12 h-12 border-2 border-dashed border-white/50 rounded-full mx-auto flex items-center justify-center">
            <Palette size={16} />
         </div>
         <div className="text-[10px] uppercase tracking-widest">In Development</div>
      </div>
   </div>
);

// --- Main Dashboard Component ---

const templates = [
  {
    id: 'flowly',
    title: 'Flowly SaaS',
    subtitle: 'Dark Mode • 3D Interface • Blue',
    component: <MiniFlowlyTech />,
    status: 'Ready'
  },
  {
    id: 'flowly-warm',
    title: 'Flowly Lux',
    subtitle: 'Warm • Glassmorphism • Gold',
    component: <MiniFlowlyWarm />,
    status: 'Ready'
  },
  {
    id: 'future',
    title: 'Neo Portfolio',
    subtitle: 'Grid • Minimalist • B&W',
    component: <ComingSoonPlaceholder />,
    status: 'Soon'
  }
];

const CollectorDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#111] to-transparent opacity-50" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
         <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-white/[0.02] blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="space-y-2"
           >
              <h6 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">The Collection</h6>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white">
                Hero Designs<span className="text-gray-600">.</span>
              </h1>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-right hidden md:block"
           >
              <div className="text-sm text-gray-400">Curated high-fidelity<br/>landing page headers.</div>
           </motion.div>
        </header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((item, i) => (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 + 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               onClick={() => item.status === 'Ready' && navigate(`/template/${item.id}`)}
               className={`group relative flex flex-col gap-4 ${item.status === 'Ready' ? 'cursor-pointer' : 'cursor-default opacity-50'}`}
             >
                {/* Visual Card */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_50px_-20px_rgba(255,255,255,0.1)]">
                   {/* Mini Preview Container */}
                   <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      {item.component}
                   </div>
                   
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                   
                   {/* Action Icon */}
                   {item.status === 'Ready' && (
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg">
                        <ArrowUpRight size={20} />
                     </div>
                   )}
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-start px-1">
                   <div>
                      <h3 className="text-lg font-medium text-white group-hover:text-gray-200 transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                   </div>
                   <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                      item.status === 'Ready' 
                        ? 'border-white/20 text-white/80 bg-white/5' 
                        : 'border-white/5 text-gray-600 bg-transparent'
                   }`}>
                      {item.status}
                   </div>
                </div>
             </motion.div>
          ))}
        </div>

        {/* Footer Minimal */}
        <footer className="mt-40 border-t border-white/5 pt-8 flex justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
           <div>Flowly Collector © 2024</div>
           <div>React • Tailwind • Motion</div>
        </footer>

      </div>
    </div>
  );
};

export default CollectorDashboard;