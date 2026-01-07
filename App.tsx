import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import FlowlyHero from './components/FlowlyHero';
import CollectorDashboard from './components/CollectorDashboard';
import AwwwardsJourney from './components/AwwwardsJourney';
import { AnimatePresence, motion } from 'framer-motion';

// Defined before usage to prevent hoisting issues
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

// Wrapper for animated route transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <CollectorDashboard />
            </PageTransition>
          } 
        />
        <Route 
          path="/template/flowly" 
          element={
            <PageTransition>
              <FlowlyHero />
            </PageTransition>
          } 
        />
        <Route 
          path="/template/awwwards" 
          element={
            <PageTransition>
              <AwwwardsJourney />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="antialiased text-slate-900 dark:text-slate-50">
        <AnimatedRoutes />
      </div>
    </HashRouter>
  );
};

export default App;
