import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ArrowRight, Layers, CheckCircle2, MessageSquare, Zap, Clock, Users, Plus, Search, Bell, Menu, ArrowLeft } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useNavigate } from 'react-router-dom';

const FlowlyHero: React.FC = () => {
  const navigate = useNavigate();
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    mouseX.set((x / width) - 0.5);
    mouseY.set((y / height) - 0.5);
  };

  return (
    <div 
      className="relative w-full h-screen bg-[#02040a] text-white overflow-hidden font-sans selection:bg-indigo-500/30 flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-[60] p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
      >
        <ArrowLeft size={20} />
      </motion.button>

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Main glow spots */}
        <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen" />
        
        {/* Grid Floor */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-[#02040a] to-transparent z-10" />
        <div className="absolute bottom-0 w-full h-[60vh] opacity-20 perspective-[1000px] transform-style-3d overflow-hidden">
           <div className="absolute inset-0 w-[200%] -ml-[50%] h-full grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(20,1fr)] transform rotate-x-[60deg]">
              {Array.from({ length: 800 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-indigo-500/10" />
              ))}
           </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="relative z-50 w-full px-8 py-6 flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 cursor-pointer ml-12 md:ml-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 shadow-lg shadow-blue-900/40 flex items-center justify-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Layers size={18} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white/90">flowly</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] rounded-full p-1.5 backdrop-blur-md">
          {['Product', 'Solutions', 'Enterprise', 'Pricing'].map((item) => (
            <a key={item} href="#" className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.08] rounded-full transition-all">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign In</button>
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      {/* --- HERO CONTENT --- */}
      <main className="flex-1 relative z-10 w-full max-w-[1600px] mx-auto px-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-0">
        
        {/* LEFT COLUMN: TEXT */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-start space-y-8 pl-4 lg:pl-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase"
           >
             <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
             v2.0 Now Available
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white"
           >
             Orchestrate your <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-white/50">
               entire workflow.
             </span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-gray-400 leading-relaxed max-w-lg"
           >
             The operating system for high-performance product teams. 
             Plan, track, and ship software with a tool that actually keeps up.
           </motion.p>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="flex items-center gap-4"
           >
             <button className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-sm shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all overflow-hidden">
               <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                 Start Building <ArrowRight size={16} />
               </span>
             </button>
             
             <button className="px-8 py-4 text-sm font-semibold text-white/80 hover:text-white border border-white/10 hover:bg-white/[0.05] rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm">
                <Play size={16} className="fill-current" /> How it works
             </button>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="flex items-center gap-6 pt-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
           >
              {/* Fake Logos */}
              {['ACME Corp', 'GlobalBank', 'Starlight'].map((logo, i) => (
                <div key={i} className="text-xs font-bold text-white/40 uppercase tracking-widest">{logo}</div>
              ))}
           </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D INTERFACE */}
        <div className="w-full lg:w-[55%] h-[600px] flex items-center justify-center relative perspective-[2500px]">
          <motion.div 
            className="relative w-[650px] h-[450px]"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
             {/* --- MAIN DASHBOARD WINDOW --- */}
             <GlassCard className="w-full h-full !rounded-xl !border-white/10 !bg-[#0f1115]/90 flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                {/* Window Header */}
                <div className="h-12 border-b border-white/[0.06] flex items-center justify-between px-4 bg-white/[0.02]">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FB5F58]" />
                      <div className="w-3 h-3 rounded-full bg-[#FBBF2F]" />
                      <div className="w-3 h-3 rounded-full bg-[#29C640]" />
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/20 border border-white/5 text-[10px] text-gray-500 font-mono">
                      <Search size={10} />
                      <span>flowly.app/dashboard</span>
                   </div>
                   <div className="flex gap-3 text-gray-500">
                      <Bell size={14} />
                      <Menu size={14} />
                   </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 flex overflow-hidden">
                   {/* Sidebar */}
                   <div className="w-16 border-r border-white/[0.06] flex flex-col items-center py-4 gap-6 bg-white/[0.01]">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-500/20"><Layers size={16}/></div>
                      <div className="w-8 h-8 rounded-lg text-gray-600 flex items-center justify-center hover:bg-white/5 transition-colors"><MessageSquare size={16}/></div>
                      <div className="w-8 h-8 rounded-lg text-gray-600 flex items-center justify-center hover:bg-white/5 transition-colors"><Users size={16}/></div>
                      <div className="mt-auto w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10" />
                   </div>
                   
                   {/* Main View */}
                   <div className="flex-1 bg-[#0a0c10] p-6 flex flex-col gap-6">
                      <div className="flex justify-between items-end">
                         <div>
                            <h3 className="text-xl font-semibold text-white">Product Roadmap</h3>
                            <p className="text-xs text-gray-500 mt-1">Q4 2024 • 12 Active Sprints</p>
                         </div>
                         <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md font-medium flex items-center gap-1 hover:bg-blue-500 transition-colors">
                           <Plus size={12} /> New Sprint
                         </button>
                      </div>

                      {/* Kanban Board Simulation */}
                      <div className="flex gap-4 h-full">
                         {['Backlog', 'In Progress', 'Done'].map((col, i) => (
                           <div key={col} className="flex-1 bg-white/[0.02] rounded-lg border border-white/[0.04] p-3 flex flex-col gap-3">
                              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">
                                 <span>{col}</span>
                                 <span className="bg-white/5 px-1.5 rounded text-gray-400">{2 + i}</span>
                              </div>
                              {/* Task Cards */}
                              <div className="bg-[#15171b] p-3 rounded border border-white/[0.05] hover:border-blue-500/30 transition-colors cursor-pointer group">
                                 <div className="flex justify-between mb-2">
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${i===1 ? 'bg-orange-500/20 text-orange-300' : 'bg-blue-500/20 text-blue-300'}`}>Design</span>
                                 </div>
                                 <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2 group-hover:bg-white/20 transition-colors" />
                                 <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                 <div className="mt-3 flex -space-x-1">
                                    <div className="w-4 h-4 rounded-full bg-gray-700 border border-[#15171b]" />
                                    <div className="w-4 h-4 rounded-full bg-gray-600 border border-[#15171b]" />
                                 </div>
                              </div>
                              <div className="bg-[#15171b] p-3 rounded border border-white/[0.05] opacity-60">
                                 <div className="h-2 w-full bg-white/10 rounded-full mb-2" />
                                 <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </GlassCard>

             {/* --- FLOATING WIDGET 1: TEAM CHAT --- */}
             <motion.div 
               className="absolute -right-12 top-20 w-64 z-20"
               initial={{ x: 40, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               style={{ transform: "translateZ(40px)" }}
             >
                <GlassCard className="p-4 bg-[#1e2029]/80 !border-white/10 !rounded-xl backdrop-blur-xl">
                   <div className="flex items-start gap-3">
                      <div className="relative">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-0.5">
                            <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-full h-full rounded-full border-2 border-[#1e2029]" />
                         </div>
                         <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1e2029] rounded-full" />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-semibold text-white">Sarah Jenkins</h4>
                            <span className="text-[10px] text-gray-500">2m ago</span>
                         </div>
                         <div className="mt-1.5 p-2 bg-blue-600/20 border border-blue-500/20 rounded-lg rounded-tl-none">
                            <p className="text-xs text-blue-100 leading-relaxed">
                               Just pushed the new dashboard updates. Check it out? 🚀
                            </p>
                         </div>
                      </div>
                   </div>
                </GlassCard>
             </motion.div>

             {/* --- FLOATING WIDGET 2: PERFORMANCE METRIC --- */}
             <motion.div 
               className="absolute -left-16 bottom-32 w-48 z-30"
               initial={{ x: -40, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.7, duration: 0.8 }}
               style={{ transform: "translateZ(60px)" }}
             >
                <GlassCard className="p-4 bg-[#111318]/90 !border-green-500/20 !rounded-xl">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 bg-green-500/20 rounded-md text-green-400">
                         <Zap size={14} />
                      </div>
                      <span className="text-xs font-medium text-gray-400">Velocity</span>
                   </div>
                   <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">+24%</span>
                      <span className="text-[10px] text-green-400 mb-1">vs last week</span>
                   </div>
                   <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-full bg-green-500" 
                      />
                   </div>
                </GlassCard>
             </motion.div>

             {/* --- FLOATING WIDGET 3: ACTIVE USERS --- */}
             <motion.div 
               className="absolute -bottom-8 right-8 z-40"
               initial={{ y: 40, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.9, duration: 0.8 }}
               style={{ transform: "translateZ(80px)" }}
             >
                <GlassCard className="px-4 py-3 flex items-center gap-3 bg-[#1a1d24]/90 !rounded-full !border-white/10">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                         <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-[#1a1d24]" />
                      ))}
                   </div>
                   <div className="w-px h-4 bg-white/10" />
                   <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-semibold text-white">124 Online</span>
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