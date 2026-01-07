import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  style = {},
  hoverEffect = false
}) => {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden ${className}`}
      style={style}
      whileHover={hoverEffect ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Shine effect */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 blur-2xl group-hover:animate-shine" />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};