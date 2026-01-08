import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ArrowRight, Layers, MessageSquare, Zap, Users, Plus, Search, Bell, Menu, ArrowLeft } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useNavigate } from 'react-router-dom';

const FlowlyHero: React.FC = () => {
  const navigate = useNavigate();
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // SMOOTHER PHYSICS: Higher damping/mass for a "heavy/premium" feel
  const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    mouseX.set((x / width) - 0.5);
    mouseY.set((y / height) - 0.5);
  };

  return (
    <div 
      className="relative w-full min-h-screen lg:h-screen bg-[#02040a] text-white overflow-x-hidden font-sans selection:bg-indigo-500/30 flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Intro Curtain */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black z-[100] pointer-events-none"
      />

      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-[60] group flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span className="text-[10px] font-medium uppercase tracking-wider">Back</span>
      </motion.button>

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute bottom-0 w-full h-[60vh] opacity-20 perspective-[1000px] transform-style-3d overflow-hidden">
           <div className="absolute inset-0 w-[200%] -ml-[50%] h-full grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(20,1fr)] transform rotate-x-[60deg]">
              {Array.from({ length: 800 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-indigo-500/10" />
              ))}
           </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between max-w-[1600px] mx-auto"
      >
        <div className="flex items-center gap-3 cursor-pointer ml-16 md:ml-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-blue-500 to-blue-700 shadow-lg shadow-blue-900/40 flex items-center justify-center text-white relative overflow-hidden group">
            <Layers size={16} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white/90">flowly</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] rounded-full p-1 backdrop-blur-md">
          {['Product', 'Solutions', 'Enterprise', 'Pricing'].map((item) => (
            <a key={item} href="#" className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.08] rounded-full transition-all">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:block text-xs font-medium text-gray-400 hover:text-white transition-colors">Sign In</button>
          <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </motion.nav>

      {/* --- HERO CONTENT --- */}
      <main className="flex-1 relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-0 pb-12 lg:pb-0">
        
        {/* LEFT COLUMN: TEXT */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-start space-y-6 md:space-y-8 lg:pl-12 pt-10 lg:pt-0">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-300 text-[10px] font-bold tracking-wide uppercase"
           >
             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
             v2.0 Now Available
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
             className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white"
           >
             Orchestrate your <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-white/50">
               entire workflow.
             </span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg"
           >
             The operating system for high-performance product teams. 
             Plan, track, and ship software with a tool that actually keeps up.
           </motion.p>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full"
           >
             <button className="group relative w-full sm:w-auto px-6 py-3 bg-white text-black rounded-xl font-bold text-sm shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all overflow-hidden">
               <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                 Start Building <ArrowRight size={16} />
               </span>
             </button>
             
             <button className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white/80 hover:text-white border border-white/10 hover:bg-white/[0.05] rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <Play size={16} className="fill-current" /> How it works
             </button>
           </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D INTERFACE */}
        <div className="w-full lg:w-[55%] h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center relative perspective-[2500px] mt-8 lg:mt-0">
          <motion.div 
            className="relative w-full max-w-[340px] md:max-w-[500px] lg:max-w-[650px] aspect-[16/11]"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
             {/* --- MAIN DASHBOARD WINDOW --- */}
             <GlassCard className="w-full h-full !rounded-xl !border-white/10 !bg-[#0f1115]/90 flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                {/* Window Header */}
                <div className="h-10 border-b border-white/[0.06] flex items-center justify-between px-3 bg-white/[0.02]">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FB5F58]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF2F]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#29C640]" />
                   </div>
                   <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded-md bg-black/20 border border-white/5 text-[9px] text-gray-500 font-mono">
                      <Search size={10} />
                      <span>flowly.app/dashboard</span>
                   </div>
                   <div className="flex gap-2 text-gray-500">
                      <Bell size={12} />
                      <Menu size={12} />
                   </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 flex overflow-hidden">
                   {/* Sidebar */}
                   <div className="w-12 border-r border-white/[0.06] flex flex-col items-center py-3 gap-4 bg-white/[0.01]">
                      <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-500/20"><Layers size={14}/></div>
                      <div className="w-7 h-7 rounded-lg text-gray-600 flex items-center justify-center hover:bg-white/5 transition-colors"><MessageSquare size={14}/></div>
                      <div className="w-7 h-7 rounded-lg text-gray-600 flex items-center justify-center hover:bg-white/5 transition-colors"><Users size={14}/></div>
                      <div className="mt-auto w-7 h-7 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10" />
                   </div>
                   
                   {/* Main View */}
                   <div className="flex-1 bg-[#0a0c10] p-4 md:p-5 flex flex-col gap-4">
                      <div className="flex justify-between items-end">
                         <div>
                            <h3 className="text-sm md:text-lg font-semibold text-white">Product Roadmap</h3>
                            <p className="text-[10px] text-gray-500 mt-0.5">Q4 2024 • 12 Active Sprints</p>
                         </div>
                         <button className="bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-md font-medium flex items-center gap-1 hover:bg-blue-500 transition-colors">
                           <Plus size={10} /> Sprint
                         </button>
                      </div>

                      {/* Kanban Board Simulation */}
                      <div className="flex gap-3 h-full overflow-hidden">
                         {['Backlog', 'In Progress', 'Done'].map((col, i) => (
                           <div key={col} className="flex-1 bg-white/[0.02] rounded-lg border border-white/[0.04] p-2 flex flex-col gap-2">
                              <div className="flex justify-between items-center text-[8px] uppercase font-bold text-gray-500 tracking-wider mb-0.5">
                                 <span>{col}</span>
                                 <span className="bg-white/5 px-1 rounded text-gray-400">{2 + i}</span>
                              </div>
                              {/* Task Cards */}
                              <div className="bg-[#15171b] p-2 rounded border border-white/[0.05] hover:border-blue-500/30 transition-colors cursor-pointer group shadow-sm">
                                 <div className="flex justify-between mb-1.5">
                                    <span className={`text-[8px] px-1 py-0.5 rounded ${i===1 ? 'bg-orange-500/10 text-orange-300' : 'bg-blue-500/10 text-blue-300'}`}>Design</span>
                                 </div>
                                 <div className="h-1.5 w-3/4 bg-white/10 rounded-full mb-1.5 group-hover:bg-white/20 transition-colors" />
                                 <div className="h-1.5 w-1/2 bg-white/10 rounded-full" />
                                 <div className="mt-2 flex -space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 border border-[#15171b]" />
                                    <div className="w-3 h-3 rounded-full bg-gray-600 border border-[#15171b]" />
                                 </div>
                              </div>
                              <div className="bg-[#15171b] p-2 rounded border border-white/[0.05] opacity-60">
                                 <div className="h-1.5 w-full bg-white/10 rounded-full mb-1.5" />
                                 <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </GlassCard>

             {/* --- FLOATING WIDGET 1: TEAM CHAT (Hidden on Mobile) --- */}
             <motion.div 
               className="hidden md:block absolute -right-6 lg:-right-12 top-10 lg:top-20 w-56 lg:w-64 z-20"
               initial={{ x: 40, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 1, duration: 0.8 }}
               style={{ transform: "translateZ(40px)" }}
             >
                <GlassCard className="p-3 lg:p-4 bg-[#1e2029]/80 !border-white/10 !rounded-xl backdrop-blur-xl">
                   <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-0.5">
                            <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-full h-full rounded-full border-2 border-[#1e2029]" />
                         </div>
                         <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1e2029] rounded-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-xs font-semibold text-white truncate">Sarah Jenkins</h4>
                            <span className="text-[9px] text-gray-500 flex-shrink-0">2m</span>
                         </div>
                         <div className="p-2 bg-blue-600/20 border border-blue-500/20 rounded-lg rounded-tl-none">
                            <p className="text-[10px] text-blue-100 leading-relaxed">
                               Just pushed the new dashboard updates. 🚀
                            </p>
                         </div>
                      </div>
                   </div>
                </GlassCard>
             </motion.div>

             {/* --- FLOATING WIDGET 2: PERFORMANCE METRIC (Hidden on Mobile) --- */}
             <motion.div 
               className="hidden md:block absolute -left-8 lg:-left-16 bottom-20 lg:bottom-32 w-40 lg:w-48 z-30"
               initial={{ x: -40, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 1.2, duration: 0.8 }}
               style={{ transform: "translateZ(60px)" }}
             >
                <GlassCard className="p-3 lg:p-4 bg-[#111318]/90 !border-green-500/20 !rounded-xl">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-green-500/20 rounded text-green-400">
                         <Zap size={12} />
                      </div>
                      <span className="text-[10px] font-medium text-gray-400">Velocity</span>
                   </div>
                   <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-white">+24%</span>
                      <span className="text-[9px] text-green-400 mb-1">vs last week</span>
                   </div>
                   <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 1.5 }}
                        className="h-full bg-green-500" 
                      />
                   </div>
                </GlassCard>
             </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FlowlyHero;