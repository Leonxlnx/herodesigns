import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Mail, Instagram, Twitter, Linkedin, MoveUpRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className={`bg-[#18181b] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-white/5 ${className}`}
  >
    <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </motion.div>
);

const NeoHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-4 md:p-8 font-sans selection:bg-purple-500/30">
      
      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span className="text-xs font-medium uppercase tracking-wider">Back</span>
      </motion.button>

      <div className="max-w-7xl mx-auto pt-16 md:pt-12 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ARCHITECT</span>
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
             <div className="flex items-center gap-2 px-4 py-2 bg-[#18181b] rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-400">Available for work</span>
             </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-3 h-auto md:h-[800px]">
          
          {/* 1. Large Feature Card (Profile/Intro) */}
          <BentoCard className="md:col-span-2 md:row-span-2 relative !p-0">
             <img 
               src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
               alt="Portrait" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
             <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <MoveUpRight />
                </div>
                <h2 className="text-3xl font-bold">Bringing chaos to order.</h2>
                <p className="text-gray-400 mt-2 max-w-md">Specialized in high-end interactions and motion-heavy web experiences.</p>
             </div>
          </BentoCard>

          {/* 2. Location / Map */}
          <BentoCard className="md:col-span-1 md:row-span-1 bg-[#09090b] border-2 border-[#27272a]" delay={0.1}>
             <div className="flex justify-between items-start">
                <Globe className="text-gray-500" />
                <span className="text-xs font-mono text-gray-600">UTC-8</span>
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white">San Francisco</h3>
                <p className="text-sm text-gray-500">California, USA</p>
             </div>
             {/* Abstract Map Viz */}
             <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
                <div className="grid grid-cols-4 gap-1">
                   {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border border-white/30" />
                   ))}
                </div>
             </div>
          </BentoCard>

          {/* 3. Stack Marquee */}
          <BentoCard className="md:col-span-1 md:row-span-1 overflow-hidden" delay={0.2}>
             <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h3>
             <div className="space-y-3">
                {['React', 'TypeScript', 'WebGL', 'Node.js', 'Next.js'].map((tech, i) => (
                   <div key={tech} className="flex items-center gap-2 text-lg font-medium text-gray-300 group-hover:text-white transition-colors group-hover:translate-x-2 duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {tech}
                   </div>
                ))}
             </div>
          </BentoCard>

          {/* 4. Social Links (Small) */}
          <BentoCard className="md:col-span-1 md:row-span-1 flex items-center justify-center bg-purple-600 !border-none" delay={0.3}>
             <div className="text-center">
                <div className="flex gap-4 mb-4 justify-center">
                   <Twitter className="text-white/70 hover:text-white cursor-pointer transition-colors" />
                   <Instagram className="text-white/70 hover:text-white cursor-pointer transition-colors" />
                   <Linkedin className="text-white/70 hover:text-white cursor-pointer transition-colors" />
                </div>
                <h3 className="font-bold text-xl">Follow Me</h3>
             </div>
          </BentoCard>

          {/* 5. Services List */}
          <BentoCard className="md:col-span-1 md:row-span-2" delay={0.4}>
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <ArrowUpRight className="text-white" />
             </div>
             <h3 className="text-2xl font-bold mb-6">Services</h3>
             <ul className="space-y-4">
                {['Art Direction', 'Web Design', 'Development', 'Brand Identity'].map((service) => (
                   <li key={service} className="border-b border-white/10 pb-4 flex justify-between items-center group/item cursor-pointer">
                      <span className="text-gray-400 group-hover/item:text-white transition-colors">{service}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-purple-400" />
                   </li>
                ))}
             </ul>
          </BentoCard>

          {/* 6. Contact CTA (Wide) */}
          <BentoCard className="md:col-span-2 md:row-span-1 bg-gradient-to-r from-[#1c1c21] to-[#121214]" delay={0.5}>
             <div className="flex flex-col md:flex-row justify-between items-center h-full gap-4">
                <div>
                   <h3 className="text-3xl font-bold">Let's work together.</h3>
                   <p className="text-gray-400 mt-1">Accepting new projects for Q4 2024</p>
                </div>
                <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 group/btn">
                   <Mail size={18} />
                   Get in touch
                   <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
             </div>
          </BentoCard>

        </div>
      </div>
    </div>
  );
};

export default NeoHero;