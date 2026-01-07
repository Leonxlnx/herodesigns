import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';

// --- UTILS & MICRO-INTERACTIONS ---

const ANIM_TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

// Text Splitting for "Word-by-word reveal"
const SplitText = ({ children, className = "", delay = 0 }: { children: string, className?: string, delay?: number }) => {
  const words = children.split(" ");
  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em] align-top">
          <motion.span
            initial={{ y: "110%", rotateZ: 5, opacity: 0 }}
            whileInView={{ y: "0%", rotateZ: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...ANIM_TRANSITION, delay: delay + i * 0.03 }}
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
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
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
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
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

// Parallax Image
const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.15, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale }}
        className="w-full h-full object-cover will-change-transform" 
      />
    </div>
  );
};

// --- SECTIONS ---

// 1. Hero
const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[60vh] bg-[#E8E6D9] rounded-bl-full opacity-50 blur-3xl -z-10" />
      <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-[#1A1A1A] mix-blend-multiply uppercase">
        <SplitText>Digital</SplitText> <br />
        <SplitText delay={0.1}>Alchemy</SplitText>
      </h1>
      <div className="flex justify-between items-end mt-20">
        <p className="max-w-md text-lg text-[#4A4A4A] font-medium leading-relaxed">
          <SplitText delay={0.3}>Crafting digital experiences that feel organic, fluid, and inevitably alive.</SplitText>
        </p>
        <MagneticButton className="hidden md:flex w-32 h-32 rounded-full border border-[#1A1A1A] items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 group">
          <span className="group-hover:rotate-45 transition-transform duration-300">Scroll</span>
        </MagneticButton>
      </div>
    </section>
  );
};

// 2. Manifesto
const Manifesto = () => {
  return (
    <section className="py-40 px-6 md:px-20 bg-[#FDFCF8]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif leading-tight text-[#1A1A1A]">
          <SplitText>
            We reject the static. If it doesn't move, it's broken. We believe in the physics of emotion and the architecture of awe.
          </SplitText>
        </h2>
      </div>
    </section>
  );
};

// 3. Marquee
const Marquee = () => {
  return (
    <div className="py-20 overflow-hidden bg-[#1A1A1A] text-[#FDFCF8] whitespace-nowrap">
      <motion.div 
        animate={{ x: "-50%" }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="flex gap-20 items-center text-8xl md:text-9xl font-bold tracking-tighter uppercase opacity-80"
      >
        <span>Strategy</span><span>Design</span><span>Motion</span><span>Development</span>
        <span>Strategy</span><span>Design</span><span>Motion</span><span>Development</span>
      </motion.div>
    </div>
  );
};

// 4. Collage Grid
const Collage = () => {
  return (
    <section className="py-40 px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-7 h-[60vh]">
        <ParallaxImage src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract 1" className="w-full h-full rounded-2xl" />
      </div>
      <div className="md:col-span-5 flex flex-col gap-8 mt-20 md:mt-0">
        <div className="h-[40vh]">
           <ParallaxImage src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop" alt="Abstract 2" className="w-full h-full rounded-2xl" />
        </div>
        <p className="text-xl md:text-2xl font-light italic self-end max-w-xs">
          "Chaos organized into silence."
        </p>
      </div>
    </section>
  );
};

// 5. Detail Focus
const DetailFocus = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
         <ParallaxImage src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" alt="Detail" className="w-full h-full opacity-20 grayscale" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <h3 className="text-7xl font-bold text-[#1A1A1A] vertical-rl">PRECISION</h3>
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-xl shadow-2xl border border-white/20">
          <p className="text-xl leading-relaxed text-[#333]">
            Every pixel is a decision. Every ease curve is a statement. We zoom in until the abstract becomes concrete.
          </p>
        </div>
      </div>
    </section>
  );
};

// 6. Philosophy
const Philosophy = () => {
  return (
    <section className="py-40 px-6 md:px-20 bg-[#EFECE6]">
      <div className="flex flex-col gap-20">
        {['Obsession', 'Timelessness', 'Utility'].map((item, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="flex items-baseline justify-between border-b border-[#1A1A1A]/20 pb-4 group-hover:pb-8 transition-all duration-500">
              <span className="text-sm font-mono text-[#666]">0{i + 1}</span>
              <h4 className="text-6xl md:text-8xl font-light text-[#1A1A1A] group-hover:italic transition-all">{item}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 7. Video Reel (Simulated)
const VideoReel = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const width = useTransform(scrollYProgress, [0.2, 0.8], ["80%", "100%"]);
  
  return (
    <section ref={ref} className="py-20 flex justify-center bg-[#FDFCF8]">
      <motion.div style={{ width }} className="h-[80vh] bg-black rounded-3xl overflow-hidden relative">
        <video 
          className="w-full h-full object-cover opacity-80"
          autoPlay muted loop playsInline
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_24fps.mp4"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// 8. Materials (3D Tilt)
const Materials = () => {
  const Card = ({ title, img }: { title: string, img: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    };

    return (
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="relative h-[500px] w-full bg-white rounded-2xl shadow-xl overflow-hidden group perspective-1000"
      >
        <div className="absolute inset-0">
          <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        </div>
        <div className="absolute bottom-8 left-8 transform translate-z-20">
          <h5 className="text-white text-3xl font-bold">{title}</h5>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-40 px-6 md:px-20 bg-[#FDFCF8]">
       <h3 className="text-4xl mb-20 text-[#1A1A1A]">Selected Materials</h3>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card title="Obsidian" img="https://images.unsplash.com/photo-1516981879613-9f5da904015f?q=80&w=2574&auto=format&fit=crop" />
          <Card title="Alabaster" img="https://images.unsplash.com/photo-1594913785162-e678a0c2bd74?q=80&w=2574&auto=format&fit=crop" />
          <Card title="Vanta" img="https://images.unsplash.com/photo-1550100136-e074f01d8a3d?q=80&w=2670&auto=format&fit=crop" />
       </div>
    </section>
  );
};

// 9. Selected Works (Horizontal Scroll)
const SelectedWorks = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  const works = [
    { title: "Vogue Italia", cat: "Fashion" },
    { title: "Rimowa", cat: "Product" },
    { title: "SpaceX", cat: "Aerospace" },
    { title: "MoMA", cat: "Culture" }
  ];

  return (
    <section ref={targetRef} className="h-[300vh] relative bg-[#1A1A1A] text-[#FDFCF8]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-20">
          {works.map((work, i) => (
            <div key={i} className="w-[80vw] md:w-[60vw] h-[70vh] flex-shrink-0 bg-[#333] rounded-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
               <div className="absolute bottom-10 left-10 z-20">
                  <span className="text-sm uppercase tracking-widest text-gray-400 mb-2 block">{work.cat}</span>
                  <h3 className="text-6xl md:text-8xl font-serif">{work.title}</h3>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// 10. The Team
const Team = () => {
  const members = [
    { name: "Alex V.", role: "Creative Director" },
    { name: "Sarah J.", role: "Lead Developer" },
    { name: "Marcus K.", role: "3D Artist" }
  ];

  return (
    <section className="py-40 px-6 md:px-20 bg-[#FDFCF8]">
      <h3 className="text-sm uppercase tracking-widest text-[#999] mb-20">The Architects</h3>
      <div className="space-y-4">
        {members.map((m, i) => (
          <div key={i} className="group border-t border-[#1A1A1A]/10 py-10 flex justify-between items-center hover:bg-[#F5F5F0] transition-colors px-4 cursor-pointer">
            <h4 className="text-4xl md:text-5xl text-[#1A1A1A] group-hover:translate-x-10 transition-transform duration-500">{m.name}</h4>
            <span className="text-xl text-[#999]">{m.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// 11. Reviews
const Reviews = () => {
  return (
    <section className="py-40 px-6 md:px-20 bg-[#1A1A1A] text-[#FDFCF8]">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-5xl font-serif leading-tight">"They didn't just build a website. They built a digital cathedral."</h3>
            <p className="mt-8 text-gray-400">— CMO, Luxury Brand</p>
          </div>
          <div>
            <h3 className="text-5xl font-serif leading-tight">"Absolute madness. The conversion rate doubled because people just wouldn't leave."</h3>
            <p className="mt-8 text-gray-400">— Founder, Tech Unicorn</p>
          </div>
       </div>
    </section>
  );
};

// 12. Footer
const Footer = () => {
  return (
    <footer className="h-screen bg-[#FDFCF8] flex flex-col justify-between p-6 md:p-20 relative">
      <div className="flex-grow flex items-center justify-center">
        <h2 className="text-[15vw] font-bold leading-none tracking-tighter text-[#1A1A1A] hover:text-blue-600 transition-colors cursor-pointer text-center">
          LET'S<br/>TALK
        </h2>
      </div>
      <div className="flex justify-between items-end text-sm font-medium uppercase tracking-widest text-[#1A1A1A]">
         <div>© 2024 Flowly Inc.</div>
         <div className="flex gap-8">
            <a href="#" className="hover:line-through">Instagram</a>
            <a href="#" className="hover:line-through">Twitter</a>
            <a href="#" className="hover:line-through">LinkedIn</a>
         </div>
      </div>
    </footer>
  );
};

// --- MAIN COMPONENT ---

export default function AwwwardsJourney() {
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
    <div className="bg-[#FDFCF8] min-h-screen w-full relative selection:bg-[#1A1A1A] selection:text-white font-sans overflow-x-hidden">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 bg-blue-600 rounded-full mix-blend-difference pointer-events-none z-[60] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out hidden md:block" />

      {/* Navigation (Minimal) */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-40 mix-blend-difference text-white">
        <span className="text-xl font-bold tracking-tighter">FLOWLY.STUDIO</span>
        <div className="w-12 h-1 bg-white" />
      </nav>

      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <Collage />
        <DetailFocus />
        <Philosophy />
        <VideoReel />
        <Materials />
        <SelectedWorks />
        <Team />
        <Reviews />
        <Footer />
      </main>
    </div>
  );
}
