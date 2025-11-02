import React from 'react';
import { LeafIcon, PizzaIcon } from './icons';

interface WelcomeScreenProps {
  onStart: () => void;
  isChaosMode: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, isChaosMode }) => {
  return (
    <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8 text-center flex flex-col items-center">
      <div className="mb-6 bg-emerald-100 dark:bg-emerald-900/50 p-6 rounded-full">
        {isChaosMode ? <PizzaIcon className="w-16 h-16 text-amber-500" /> : <LeafIcon className="w-16 h-16 text-emerald-500" />}
      </div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        {isChaosMode ? "Welcome to NutriAura: Chaos Edition" : "Welcome to NutriAura AI"}
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        {isChaosMode ? "Your body's chaotic pizza delivery service. Get wildly inaccurate insights about your need for more pepperoni." : "Your body's intelligent wellness mirror. Get personalized insights by analyzing your face and lifestyle."}
      </p>
      <button
        onClick={onStart}
        className="w-full max-w-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-green-600 transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 dark:focus-visible:ring-emerald-700"
      >
        {isChaosMode ? "Unleash the Chaos" : "Begin Your Wellness Journey"}
      </button>
      <p className="text-sm text-slate-400 dark:text-slate-500 mt-6 max-w-sm">
        Disclaimer: NutriAura AI provides wellness suggestions and is not a substitute for professional medical advice, diagnosis, or treatment. Especially in Chaos Mode.
      </p>
    </div>
  );
};

export default WelcomeScreen;
