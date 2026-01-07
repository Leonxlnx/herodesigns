import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Play, ArrowRight, Layers, BarChart3, MessageSquare, CheckCircle2, MoreHorizontal, MousePointer2 } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const FlowlyHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects for the right side illustrations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    mouseX.set(mouseXFromCenter / width);
    mouseY.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered text animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0, rotateX: 10 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 50 } 
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#030712] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radial Gradients for Mood */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full blur-[100px]" />
        
        {/* The Curved "Ceiling" Effect - Simulating the arch in the image */}
        <div className="absolute top-0 right-0 w-3/4 h-full border-l border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-tl-[100px] transform skew-x-[-12deg] origin-top-right translate-x-[20%] pointer-events-none" />
        
        {/* Grid lines on floor */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-blue-950/20 to-transparent flex justify-center perspective-[1000px]">
           <div className="w-[150%] h-full grid grid-cols-12 gap-8 transform rotate-x-60 opacity-20">
             {[...Array(12)].map((_, i) => (
               <div key={i} className="h-full w-px bg-white/20" />
             ))}
           </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
            <Layers size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">flowly</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400"
        >
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</button>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-white/10 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-all">
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-20 flex flex-col lg:flex-row items-center">
        
        {/* Left Column: Text & CTA */}
        <motion.div 
          className="w-full lg:w-1/2 space-y-8 z-20"
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVars} className="space-y-4">
             {/* Abstract Title with subtle gradient text */}
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Build products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400">
                faster, together
              </span>
            </h1>
          </motion.div>
          
          <motion.p variants={itemVars} className="text-lg text-gray-400 max-w-xl leading-relaxed">
            The all-in-one platform for teams to collaborate, design, and ship beautiful products. Simple, powerful, and built for the way you work.
          </motion.p>
          
          <motion.div variants={itemVars} className="flex flex-wrap items-center gap-4">
            <button className="group relative px-8 py-4 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-blue-900/50 transition-all hover:shadow-blue-900/70 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Start for free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="px-8 py-4 rounded-xl font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-2 group">
              <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
              Watch demo
            </button>
          </motion.div>

          <motion.div variants={itemVars} className="pt-4 text-sm text-gray-500 font-medium">
            No credit card required · Free 14-day trial
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Floating Interface */}
        <div 
          className="w-full lg:w-1/2 h-[500px] md:h-[600px] relative perspective-[2000px] flex items-center justify-center mt-12 lg:mt-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="relative w-full h-full preserve-3d"
            style={{ rotateX, rotateY }}
          >
             {/* 
                We are building the "Floating UI" cluster here.
                1. Main Back Board (The Dashboard)
                2. Floating Elements (Chat, Popups)
             */}

             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

             {/* 1. Main Dashboard Card (Backmost) */}
             <motion.div 
                className="absolute top-[10%] left-[5%] md:left-[10%] w-[90%] md:w-[80%] h-[70%] z-10"
                initial={{ opacity: 0, z: -100, rotateY: 10 }}
                animate={{ opacity: 1, z: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
             >
               <GlassCard className="w-full h-full p-6 flex flex-col gap-6 bg-gray-900/60 !border-gray-700/50">
                  {/* Fake UI Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                  </div>
                  {/* Fake UI Body */}
                  <div className="flex gap-4 h-full">
                    {/* Sidebar */}
                    <div className="w-16 h-full border-r border-white/10 flex flex-col gap-4 py-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-white/5 mx-auto" />
                      ))}
                    </div>
                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="h-32 w-full bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                        {/* Chart Line */}
                        <svg className="absolute bottom-0 left-0 w-full h-20 text-blue-500/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <path d="M0 20 L0 15 Q20 5 40 12 T80 8 L100 15 L100 20 Z" fill="currentColor" />
                          <path d="M0 15 Q20 5 40 12 T80 8 L100 15" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </svg>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 bg-white/5 rounded-xl" />
                        <div className="h-20 bg-white/5 rounded-xl" />
                      </div>
                    </div>
                  </div>
               </GlassCard>
             </motion.div>

             {/* 2. Chat Widget (Floating Top Right) */}
             <motion.div 
               className="absolute top-[20%] right-[-5%] w-[220px] z-30"
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.8, type: "spring" }}
               style={{ transform: "translateZ(50px)" }}
             >
                <GlassCard className="p-4 flex flex-col gap-3 bg-gray-800/80 !border-gray-600/50">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
                    <div className="flex flex-col gap-1">
                      <div className="w-20 h-2 bg-white/20 rounded-full" />
                      <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <div className="bg-blue-500/20 p-2 rounded-lg rounded-tl-none self-start">
                        <div className="w-24 h-1.5 bg-blue-200/50 rounded-full" />
                     </div>
                     <div className="bg-white/10 p-2 rounded-lg rounded-tr-none self-end ml-auto">
                        <div className="w-20 h-1.5 bg-white/50 rounded-full" />
                     </div>
                  </div>
                </GlassCard>
             </motion.div>

             {/* 3. Status/Task Card (Floating Bottom Right) */}
             <motion.div 
                className="absolute bottom-[20%] right-[5%] w-[180px] z-40"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                style={{ transform: "translateZ(80px)" }}
             >
               <GlassCard className="p-4 space-y-3 bg-[#0f172a]/90 !border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-300">Tasks</span>
                    <MoreHorizontal size={14} className="text-gray-500" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2 group cursor-pointer">
                        <CheckCircle2 size={14} className={`text-blue-500 ${i === 1 ? 'opacity-100' : 'opacity-40'}`} />
                        <div className={`h-1.5 rounded-full w-full ${i === 1 ? 'bg-white/40' : 'bg-white/10'}`} />
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <button className="w-full py-1 text-[10px] font-medium bg-blue-600/20 text-blue-300 rounded hover:bg-blue-600/30 transition-colors">
                      + Done
                    </button>
                  </div>
               </GlassCard>
             </motion.div>

             {/* 4. Small Floater (Left) */}
             <motion.div
               className="absolute bottom-[25%] left-[-2%] z-50"
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 1, type: "spring" }}
               style={{ transform: "translateZ(100px)" }}
             >
                <GlassCard className="p-2 flex items-center gap-3 rounded-full pr-4 bg-gray-800/90">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-blue-400" />
                      <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-teal-400" />
                      <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-purple-400 flex items-center justify-center text-[10px] font-bold">+3</div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400">Team</span>
                      <span className="text-xs font-bold text-white">Online</span>
                   </div>
                </GlassCard>
             </motion.div>

             {/* Mouse Cursor Simulation */}
             <motion.div 
               className="absolute top-[40%] right-[30%] z-50 pointer-events-none drop-shadow-xl"
               animate={{ 
                 x: [0, 20, 0],
                 y: [0, -20, 0]
               }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
               <MousePointer2 className="fill-black stroke-white" size={24} />
               <div className="ml-4 mt-1 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-md font-bold whitespace-nowrap">
                 John is editing
               </div>
             </motion.div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FlowlyHero;