import React, { useState, useEffect } from 'react';
import { LeafIcon } from './icons';

const analysisSteps = [
  "Initializing biometric reading...",
  "Analyzing facial and skin indicators...",
  "Cross-referencing lifestyle habits...",
  "Identifying potential nutrient imbalances...",
  "Profiling mood and energy patterns...",
  "Generating personalized insights...",
];

const AnalysisScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % analysisSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center flex flex-col items-center p-4 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <LeafIcon className="w-16 h-16 text-emerald-500" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-emerald-300 dark:border-emerald-500/50 animate-ping"></div>
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Analyzing Your Aura...</h2>
      
      <div className="h-8 mt-4 w-full max-w-sm text-center">
        <p className="text-slate-600 dark:text-slate-400 transition-opacity duration-500 animate-fade-in-out" key={currentStep}>
          {analysisSteps[currentStep]}
        </p>
      </div>
      
      {/* FIX: Removed the non-standard 'jsx' prop from the <style> tag to conform with standard React/TSX syntax. */}
      <style>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: 1; }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default AnalysisScreen;