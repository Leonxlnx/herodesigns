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
      className={`backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden ${className}`}
      style={style}
      whileHover={hoverEffect ? { scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)" } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* High fidelity noise */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Specular highlight gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};