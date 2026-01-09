import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useVelocity } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play, Zap, ArrowLeft, Disc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative group inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full text-[#D4FF00] opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full text-red-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

const KinetikHero: React.FC = () => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Velocity-based skewing for the main text
  const xVelocity = useVelocity(mouseX);
  const skewX = useTransform(xVelocity, [-1000, 1000], [10, -10]);
  const springSkew = useSpring(skewX, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div 
      className="relative w-full h-screen bg-[#080808] text-white overflow-hidden font-sans selection:bg-[#D4FF00] selection:text-black flex flex-col"
      onMouseMove={handleMouseMove}
    >
      
      {/* --- GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Vertical Lines */}
         <div className="absolute inset-0 flex justify-between px-8 md:px-24 opacity-[0.03]">
            <div className="w-px h-full bg-white" />
            <div className="w-px h-full bg-white" />
            <div className="w-px h-full bg-white" />
            <div className="w-px h-full bg-white" />
            <div className="w-px h-full bg-white" />
         </div>
         {/* Noise */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay" />
         
         {/* Volt Glow */}
         <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#D4FF00] rounded-full blur-[200px] opacity-[0.05]" />
      </div>

      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-black border border-white/20 text-white hover:bg-[#D4FF00] hover:text-black hover:border-[#D4FF00] transition-colors cursor-pointer uppercase font-mono text-xs tracking-widest"
      >
        <ArrowLeft size={14} />
        <span>Exit</span>
      </motion.button>

      {/* --- NAVIGATION --- */}
      <nav className="relative z-40 w-full px-8 py-8 flex justify-between items-center border-b border-white/[0.05]">
         <div className="flex items-center gap-2 ml-24 md:ml-0">
            <Zap className="text-[#D4FF00] fill-[#D4FF00]" size={24} />
            <span className="font-bold text-2xl tracking-tighter italic">KINETIK</span>
         </div>

         <div className="hidden md:flex gap-12 font-mono text-xs tracking-widest text-gray-400">
            {['01. MISSION', '02. HARDWARE', '03. STUDIO', '04. SHOP'].map((item) => (
               <a key={item} href="#" className="hover:text-[#D4FF00] transition-colors">{item}</a>
            ))}
         </div>

         <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase text-sm tracking-wide hover:bg-[#D4FF00] transition-colors clip-path-slant">
            Pre-Order <ArrowUpRight size={16} />
         </button>
      </nav>

      {/* --- HERO CONTENT --- */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center">
         
         {/* Floating Label */}
         <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-[15%] flex items-center gap-4"
         >
            <div className="h-px w-12 bg-[#D4FF00]" />
            <span className="font-mono text-[#D4FF00] text-xs tracking-[0.2em] uppercase">System Override V.9.0</span>
            <div className="h-px w-12 bg-[#D4FF00]" />
         </motion.div>

         {/* MAIN TYPOGRAPHY */}
         <div className="relative z-20 mix-blend-difference">
            <motion.h1 
               style={{ skewX: springSkew }}
               className="text-[14vw] leading-[0.8] font-black tracking-tighter text-center uppercase flex flex-col items-center select-none"
            >
               <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
                  >
                     <GlitchText text="Unleash" />
                  </motion.span>
               </div>
               
               <div className="flex items-center gap-4 md:gap-8">
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-[8vw] aspect-video bg-[#D4FF00] hidden md:flex items-center justify-center overflow-hidden relative"
                  >
                     <video 
                        autoPlay muted loop playsInline 
                        className="w-full h-full object-cover mix-blend-multiply opacity-80"
                        src="https://cdn.coverr.co/videos/coverr-skateboarding-at-sunset-2636/1080p.mp4" 
                     />
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  </motion.div>
                  
                  <div className="overflow-hidden">
                    <motion.span 
                       initial={{ y: "100%" }}
                       animate={{ y: "0%" }}
                       transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                       className="block italic text-[#D4FF00]"
                    >
                       <GlitchText text="Velocity" />
                    </motion.span>
                  </div>
               </div>
            </motion.h1>
         </div>

         {/* Description */}
         <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 max-w-md text-center text-gray-400 font-mono text-xs md:text-sm leading-relaxed uppercase tracking-wide"
         >
            Engineered for the outliers. <br/>
            The world's first neural-linked performance interface.
         </motion.p>

         {/* CTA Grid */}
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-2 gap-px bg-white/10 border border-white/10"
         >
            <button className="w-48 h-16 bg-[#080808] text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-wider group">
               <Play size={16} className="group-hover:fill-black" /> Watch Film
            </button>
            <button className="w-48 h-16 bg-[#080808] text-white hover:bg-[#D4FF00] hover:text-black transition-colors flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-wider">
               Explore <ArrowRight size={16} />
            </button>
         </motion.div>

      </main>

      {/* --- FOOTER TICKER --- */}
      <div className="relative z-30 w-full bg-[#D4FF00] py-3 overflow-hidden flex items-center">
         <motion.div 
            animate={{ x: "-50%" }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            className="flex whitespace-nowrap text-black font-black text-xl italic uppercase tracking-tighter"
         >
            {Array(20).fill(" • NO LIMITS • PURE ADRENALINE • DEFY GRAVITY").map((t, i) => (
               <span key={i}>{t}</span>
            ))}
         </motion.div>
      </div>

    </div>
  );
};

export default KinetikHero;