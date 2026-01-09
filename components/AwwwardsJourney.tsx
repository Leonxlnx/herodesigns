import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- UTILS & MICRO-INTERACTIONS ---

const ANIM_TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

// Text Splitting for "Word-by-word reveal"
const SplitText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em] align-top">
          <motion.span
            initial={{ y: "110%", rotateZ: 5, opacity: 0 }}
            animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
            transition={{ ...ANIM_TRANSITION, delay: delay + i * 0.05 }}
            className="inline-block origin-top-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// Magnetic Cursor Button
const MagneticButton: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- MAIN COMPONENT ---

export default function AwwwardsHero() {
  const navigate = useNavigate();
  
  // Global Noise & Cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="bg-[#FDFCF8] h-screen w-full relative selection:bg-[#1A1A1A] selection:text-white font-sans overflow-hidden flex flex-col">
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Abstract Background Blurs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -5, 0], x: [0, 50, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#E8E6D9] rounded-full blur-[120px] opacity-60" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 5, 0], x: [0, -30, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#EFECE6] rounded-full blur-[100px] opacity-60" 
        />
      </div>

      {/* Custom Cursor (Hidden on Mobile) */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-6 h-6 bg-[#1A1A1A] rounded-full pointer-events-none z-[60] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference" />

      {/* Navigation */}
      <nav className="relative w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-start z-40">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold tracking-tighter text-[#1A1A1A]">FLOWLY.STUDIO</span>
          <span className="text-[10px] uppercase tracking-widest text-[#999]">Est. 2024</span>
        </div>
        
        <div className="flex gap-4">
           <button 
             onClick={() => navigate('/')}
             className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#1A1A1A]/10 hover:bg-[#1A1A1A] hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-none md:cursor-pointer"
           >
             <ArrowLeft size={12} /> Back
           </button>
           <div className="w-12 h-1 bg-[#1A1A1A] self-center" />
        </div>
      </nav>

      {/* Main Hero Content */}
      <main className="flex-grow flex flex-col justify-center px-6 md:px-12 relative z-10">
        <div className="max-w-[90vw]">
           <div className="overflow-hidden mb-2">
             <motion.div 
               initial={{ y: "100%" }} 
               animate={{ y: "0%" }} 
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="flex items-center gap-4 text-[#999] text-sm md:text-base font-mono uppercase tracking-widest mb-4"
             >
                <span className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-pulse" />
                Digital Experience Design
             </motion.div>
           </div>

           <h1 className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-[#1A1A1A] mix-blend-multiply uppercase -ml-[0.05em]">
             <div className="flex flex-col">
               <SplitText text="Digital" />
               <div className="flex items-center gap-4 md:gap-12">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "auto" }} 
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[8vw] md:h-[10vw] aspect-video rounded-full overflow-hidden hidden md:block relative"
                  >
                     <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover scale-110" alt="Abstract" />
                  </motion.div>
                  <SplitText text="Alchemy" delay={0.2} />
               </div>
             </div>
           </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mt-12 md:mt-20 gap-8">
           <div className="max-w-md">
             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ delay: 0.8, duration: 1 }}
               className="text-lg md:text-xl text-[#4A4A4A] font-medium leading-relaxed"
             >
               We reject the static. If it doesn't move, it's broken. We believe in the physics of emotion and the architecture of awe.
             </motion.p>
           </div>
           
           <div className="flex items-center gap-8">
              <MagneticButton className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-lg uppercase tracking-wider hover:bg-blue-600 transition-colors duration-500 cursor-none md:cursor-pointer">
                 <span className="relative z-10 mix-blend-difference">Explore</span>
              </MagneticButton>
           </div>
        </div>
      </main>

      {/* Footer Marquee */}
      <div className="absolute bottom-0 left-0 w-full py-6 border-t border-[#1A1A1A]/10 bg-[#FDFCF8]/50 backdrop-blur-sm overflow-hidden z-20">
         <motion.div 
           animate={{ x: "-50%" }}
           transition={{ duration: 20, ease: "linear", repeat: Infinity }}
           className="flex gap-12 whitespace-nowrap text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#1A1A1A]"
         >
           {Array(10).fill("Strategy • Design • Motion • Development • ").map((text, i) => (
             <span key={i}>{text}</span>
           ))}
         </motion.div>
      </div>

    </div>
  );
}