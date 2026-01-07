import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Play, ArrowRight, LayoutGrid, BarChart3, Wallet, MessageSquare, CheckCircle2, User } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const FlowlyWarmHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax for floating elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    mouseX.set((x / width) - 0.5);
    mouseY.set((y / height) - 0.5);
  };

  // Parallax helper
  const useParallax = (factor: number) => {
    const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-factor * 50, factor * 50]), { stiffness: 150, damping: 20 });
    const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-factor * 50, factor * 50]), { stiffness: 150, damping: 20 });
    return { x, y };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-[#1a1510] text-white overflow-hidden font-sans selection:bg-orange-500/30 flex flex-col"
      onMouseMove={handleMouseMove}
    >
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Base Image with heavy blur/overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-110"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop')` }}
        />
        {/* Gradient Overlay to darken and warm it up */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510]/80 via-[#1a1510]/50 to-[#1a1510] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510] via-transparent to-[#1a1510]" />
        
        {/* Warm Ambient Glows */}
        <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] right-[20%] w-[25vw] h-[25vw] bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="relative z-50 w-full px-8 py-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[#e8dac0]">
          <LayoutGrid size={24} className="text-orange-300" />
          <span className="text-xl font-bold tracking-tight">flowly</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#e8dac0]/70">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>

        <div className="flex items-center gap-6 text-[#e8dac0]">
          <button className="text-sm font-medium hover:text-white transition-colors">Log in</button>
          <button className="px-6 py-2.5 text-sm font-semibold text-[#1a1510] bg-[#e8dac0] hover:bg-white rounded-lg transition-all shadow-[0_0_20px_rgba(232,218,192,0.15)]">
            Get Started
          </button>
        </div>
      </nav>

      {/* --- HERO CONTENT --- */}
      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4">
        
        {/* Typography */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative z-20 max-w-4xl mx-auto space-y-6"
        >
           <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-[#f5f0e6] drop-shadow-2xl">
             Build products <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5f0e6] via-[#e6cfa3] to-[#b39b6d]">
               faster, together
             </span>
           </h1>
           
           <p className="text-lg md:text-xl text-[#d4c5a9]/80 max-w-2xl mx-auto leading-relaxed">
             The all-in-one platform for teams to collaborate, design, and ship beautiful products. Simple, powerful, and built for the way you work.
           </p>

           <div className="flex items-center justify-center gap-4 pt-4">
              <button className="px-8 py-4 bg-[#1a1510]/50 border border-[#e8dac0]/20 hover:border-[#e8dac0]/40 text-[#e8dac0] rounded-full backdrop-blur-md transition-all flex items-center gap-2 group shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                 Start for free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-transparent hover:bg-[#e8dac0]/5 text-[#e8dac0] rounded-full transition-all flex items-center gap-2">
                 <Play size={18} className="fill-current" /> Watch demo
              </button>
           </div>
        </motion.div>

        {/* --- FLOATING ELEMENTS --- */}
        {/* We absolutely position these around the center content */}
        
        {/* Left Side Group */}
        <motion.div style={useParallax(1)} className="absolute left-[5%] top-[25%] hidden xl:block">
           <GlassCard className="p-4 w-64 bg-[#2a241c]/40 !border-[#e8dac0]/10 !rounded-xl">
              <div className="flex gap-3 mb-3">
                 <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
                    <User size={14} />
                 </div>
                 <div className="flex-1 space-y-2">
                    <div className="h-2 w-20 bg-[#e8dac0]/20 rounded-full" />
                    <div className="h-2 w-12 bg-[#e8dac0]/10 rounded-full" />
                 </div>
              </div>
              <div className="h-8 bg-[#1a1510]/40 rounded-lg flex items-center px-3">
                 <div className="h-1.5 w-full bg-[#e8dac0]/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-orange-400 rounded-full" />
                 </div>
              </div>
           </GlassCard>
        </motion.div>

        <motion.div style={useParallax(0.5)} className="absolute left-[10%] bottom-[20%] hidden lg:block">
           <GlassCard className="p-5 w-72 bg-[#2a241c]/60 !border-[#e8dac0]/10 !rounded-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-[#e8dac0]/5 pb-2">
                 <span className="text-xs font-semibold text-[#e8dac0]/60 uppercase tracking-widest">Tasks</span>
                 <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                 </div>
              </div>
              <div className="space-y-3">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                       <CheckCircle2 size={16} className={i === 1 ? "text-orange-400" : "text-[#e8dac0]/20"} />
                       <div className="h-2 w-full bg-[#e8dac0]/10 rounded-full" />
                    </div>
                 ))}
              </div>
           </GlassCard>
        </motion.div>

         {/* Small Pill Left */}
        <motion.div style={useParallax(1.5)} className="absolute left-[2%] top-[50%] hidden 2xl:block">
            <GlassCard className="flex items-center gap-2 px-3 py-2 !rounded-full bg-[#2a241c]/80 !border-[#e8dac0]/20">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-xs font-medium text-[#e8dac0]">System Online</span>
            </GlassCard>
        </motion.div>

        {/* Right Side Group */}
        <motion.div style={useParallax(-1)} className="absolute right-[5%] top-[20%] hidden xl:block">
           <GlassCard className="p-4 w-64 bg-[#2a241c]/40 !border-[#e8dac0]/10 !rounded-xl">
              <div className="flex justify-between items-end mb-4">
                 <div className="flex flex-col">
                    <span className="text-xs text-[#e8dac0]/50">Total Revenue</span>
                    <span className="text-xl font-bold text-[#e8dac0]">$84,230</span>
                 </div>
                 <BarChart3 size={20} className="text-orange-300 mb-1" />
              </div>
              <div className="flex items-end gap-1 h-16 opacity-80">
                 {[40, 70, 45, 90, 60, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-orange-500/10 to-orange-400/40 rounded-t-sm hover:to-orange-400/60 transition-colors" style={{ height: `${h}%` }} />
                 ))}
              </div>
           </GlassCard>
        </motion.div>

        <motion.div style={useParallax(-0.5)} className="absolute right-[12%] bottom-[25%] hidden lg:block">
           <GlassCard className="p-0 w-80 bg-[#2a241c]/60 !border-[#e8dac0]/10 !rounded-2xl overflow-hidden">
              <div className="p-4 bg-gradient-to-br from-neutral-800 to-neutral-900 border-b border-[#e8dac0]/5">
                 <div className="flex justify-between items-start">
                    <div className="w-8 h-5 rounded bg-[#e8dac0]/20" />
                    <Wallet size={16} className="text-[#e8dac0]/40" />
                 </div>
                 <div className="mt-4 space-y-1">
                    <div className="h-1.5 w-12 bg-[#e8dac0]/10 rounded-full" />
                    <div className="h-1.5 w-24 bg-[#e8dac0]/10 rounded-full" />
                 </div>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                 <div className="h-8 bg-[#e8dac0]/5 rounded flex items-center justify-center text-xs text-[#e8dac0]/40">Send</div>
                 <div className="h-8 bg-[#e8dac0]/10 rounded flex items-center justify-center text-xs text-[#e8dac0]">Receive</div>
              </div>
           </GlassCard>
        </motion.div>

        {/* Tiny Avatar Right */}
        <motion.div style={useParallax(-1.2)} className="absolute right-[4%] top-[60%] hidden 2xl:block">
           <GlassCard className="p-1 pr-3 flex items-center gap-2 !rounded-full bg-[#2a241c]/80 !border-[#e8dac0]/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-200 to-orange-100" />
              <div className="flex flex-col leading-none">
                 <span className="text-[10px] text-[#e8dac0]/60">Design</span>
                 <span className="text-xs font-bold text-[#e8dac0]">Team</span>
              </div>
           </GlassCard>
        </motion.div>

      </main>
    </div>
  );
};

export default FlowlyWarmHero;