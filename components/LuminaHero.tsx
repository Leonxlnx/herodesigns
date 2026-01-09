import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play, Command, Aperture, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- COMPONENTS ---

const NavPill = ({ children }: { children: React.ReactNode }) => (
  <button className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] transition-all backdrop-blur-md">
    {children}
  </button>
);

const GlassCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative overflow-hidden bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl ${className}`}>
     <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none" />
     {children}
  </div>
);

// --- MAIN HERO ---

const LuminaHero: React.FC = () => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse follow for gradient ORB
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <div 
      className="relative w-full h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-cyan-500/30 flex flex-col"
      onMouseMove={handleMouseMove}
    >
      
      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Mouse Follower Orb */}
         <motion.div 
            style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
            className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen opacity-40"
         />
         
         {/* Static Ambient Orbs */}
         <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse duration-[8s]" />
         <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[120px]" />
         
         {/* Grid Texture */}
         <div 
           className="absolute inset-0 opacity-[0.07]"
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
         />
      </div>

      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span className="text-xs font-medium uppercase tracking-wider">Back</span>
      </motion.button>

      {/* --- NAVIGATION --- */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-40 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center"
      >
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]">
               <Aperture size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight">Lumina</span>
         </div>

         <div className="hidden md:flex gap-4">
            {['Product', 'Integrations', 'Changelog', 'Pricing'].map(item => (
               <a key={item} href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{item}</a>
            ))}
         </div>

         <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-gray-400 hover:text-white">Sign in</button>
            <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               Start Building
            </button>
         </div>
      </motion.nav>

      {/* --- HERO CONTENT --- */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-4">
         
         {/* Badge */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
         >
            <button className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.08] transition-all">
               <span className="px-1.5 py-0.5 rounded-sm bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wide">New</span>
               <span className="text-sm text-gray-300">Lumina 2.0 is live</span>
               <ArrowRight size={12} className="text-gray-500 group-hover:text-white transition-colors" />
            </button>
         </motion.div>

         {/* Headline */}
         <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 max-w-4xl"
         >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Scale your</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">
               digital potential.
            </span>
         </motion.h1>

         {/* Subhead */}
         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
         >
            The modern infrastructure for ambitious developers. 
            Deploy worldwide in seconds with our distributed edge network.
         </motion.p>

         {/* CTA Buttons */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
         >
            <button className="h-12 px-8 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold flex items-center gap-2 hover:brightness-110 transition-all shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]">
               Start Deploying <ArrowRight size={16} />
            </button>
            <button className="h-12 px-8 rounded-full bg-[#111] border border-white/10 text-gray-300 font-medium flex items-center gap-2 hover:text-white hover:bg-white/5 transition-all">
               <Command size={16} /> Read Documentation
            </button>
         </motion.div>

         {/* Floating Interface Preview (Bottom Center) */}
         <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-4xl perspective-[1000px]"
         >
            <div className="relative group">
               {/* Glow underneath */}
               <div className="absolute inset-0 -bottom-10 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <GlassCard className="h-[400px] w-full border-b-0 rounded-b-none !bg-[#0a0a0a]/80 shadow-2xl">
                  {/* Fake UI Header */}
                  <div className="h-12 border-b border-white/[0.08] flex items-center justify-between px-4 bg-white/[0.02]">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                     </div>
                     <div className="h-6 px-3 rounded-full bg-black/40 border border-white/5 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Connected: us-east-1
                     </div>
                  </div>
                  
                  {/* Fake UI Body (Charts/Code) */}
                  <div className="p-6 grid grid-cols-3 gap-6 h-full">
                     {/* Col 1 */}
                     <div className="col-span-2 space-y-4">
                        <div className="h-32 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] p-4 relative overflow-hidden">
                           <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Traffic Spike</div>
                           <div className="flex items-end gap-1 h-16 w-full">
                              {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
                                 <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 1 + (i*0.05), duration: 0.5 }}
                                    className="flex-1 bg-gradient-to-t from-cyan-500/50 to-blue-500/50 rounded-t-sm" 
                                 />
                              ))}
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex-1 h-24 rounded-xl bg-white/[0.02] border border-white/[0.05]" />
                           <div className="flex-1 h-24 rounded-xl bg-white/[0.02] border border-white/[0.05]" />
                        </div>
                     </div>
                     {/* Col 2 */}
                     <div className="col-span-1 space-y-4">
                        <div className="h-full rounded-xl bg-[#050505] border border-white/[0.05] p-4 font-mono text-[10px] text-gray-500 leading-relaxed overflow-hidden">
                           <span className="text-purple-400">import</span> {`{ Client }`} <span className="text-purple-400">from</span> <span className="text-green-400">'@lumina/sdk'</span>;<br/><br/>
                           <span className="text-blue-400">const</span> client = <span className="text-purple-400">new</span> Client({`{`}<br/>
                           &nbsp;&nbsp;region: <span className="text-green-400">'global'</span>,<br/>
                           &nbsp;&nbsp;cache: <span className="text-orange-400">true</span><br/>
                           {`}`});<br/><br/>
                           <span className="text-gray-600">// Deploying to edge...</span>
                           <motion.div 
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="w-2 h-4 bg-cyan-500 mt-2"
                           />
                        </div>
                     </div>
                  </div>
               </GlassCard>
            </div>
         </motion.div>

      </main>
    </div>
  );
};

export default LuminaHero;