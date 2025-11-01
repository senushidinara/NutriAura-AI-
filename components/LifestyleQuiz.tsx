import React, { useState, useCallback } from 'react';
import type { QuizAnswers } from '../types';
import { DietHealthyIcon, DietAverageIcon, DietUnhealthyIcon, ActivitySedentaryIcon, ActivityLightIcon, ActivityModerateIcon, ActivityActiveIcon } from './icons';

interface LifestyleQuizProps {
  onSubmit: (answers: QuizAnswers) => void;
}

const dietOptions = [
  { value: 'Very Healthy', label: 'Very Healthy', icon: DietHealthyIcon },
  { value: 'Mostly Healthy', label: 'Mostly Healthy', icon: DietHealthyIcon },
  { value: 'Average', label: 'Average', icon: DietAverageIcon },
  { value: 'Unhealthy', label: 'Unhealthy', icon: DietUnhealthyIcon },
];

const activityOptions = [
  { value: 'Sedentary', label: 'Sedentary', icon: ActivitySedentaryIcon },
  { value: 'Light', label: 'Light', icon: ActivityLightIcon },
  { value: 'Moderate', label: 'Moderate', icon: ActivityModerateIcon },
  { value: 'Very Active', label: 'Very Active', icon: ActivityActiveIcon },
];

const RadioCardGroup: React.FC<{
  options: { value: string; label: string; icon: React.ElementType }[];
  selectedValue: string;
  onChange: (value: string) => void;
}> = ({ options, selectedValue, onChange }) => (
  <div className="grid grid-cols-2 gap-3">
    {options.map(({ value, label, icon: Icon }) => {
      const isSelected = selectedValue === value;
      return (
        <button
          type="button"
          key={value}
          onClick={() => onChange(value)}
          className={`p-3 rounded-lg text-sm transition-all duration-200 font-semibold flex flex-col items-center justify-center gap-2 border-2 ${
            isSelected
              ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-md dark:bg-emerald-900/50 dark:text-emerald-300'
              : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200 dark:bg-slate-700/80 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Icon className={`w-8 h-8 ${isSelected ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}`} />
          <span>{label}</span>
        </button>
      );
    })}
  </div>
);

const LifestyleQuiz: React.FC<LifestyleQuizProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<QuizAnswers>({
    sleepHours: 7,
    stressLevel: 3,
    energyLevel: 3,
    dietQuality: 'Average',
    hydration: 'Some water',
    activityLevel: 'Moderate'
  });

  const handleChange = useCallback((field: keyof QuizAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };
  
  const sliderThumbClass = "appearance-none w-5 h-5 bg-white dark:bg-slate-200 rounded-full shadow-md border-2 border-emerald-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800";
  
  return (
    <div className="w-full interactive-card rounded-xl shadow-lg p-6 sm:p-8">
      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2 text-center">Step 2 of 2: Lifestyle</p>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Lifestyle Intake</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Tell us about your recent habits. Be honest!</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sleep */}
        <div>
          <label htmlFor="sleep" className="block text-md font-medium text-slate-700 dark:text-slate-300">On average, how many hours do you sleep?</label>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="range"
              id="sleep"
              min="4"
              max="10"
              step="0.5"
              value={answers.sleepHours}
              onChange={(e) => handleChange('sleepHours', parseFloat(e.target.value))}
              className={`w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:${sliderThumbClass} [&::-moz-range-thumb]:${sliderThumbClass}`}
            />
            <span className="font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-md py-1 px-2 w-20 text-center">{answers.sleepHours.toFixed(1)} hrs</span>
          </div>
        </div>

        {/* Stress */}
        <div>
          <label htmlFor="stress" className="block text-md font-medium text-slate-700 dark:text-slate-300">Recent stress level? (1=Low, 5=High)</label>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="range"
              id="stress"
              min="1"
              max="5"
              value={answers.stressLevel}
              onChange={(e) => handleChange('stressLevel', parseInt(e.target.value, 10))}
               className={`w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:${sliderThumbClass} [&::-moz-range-thumb]:${sliderThumbClass}`}
            />
            <span className="font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-md py-1 px-2 w-20 text-center">{answers.stressLevel}</span>
          </div>
        </div>
        
        {/* Energy */}
        <div>
          <label htmlFor="energy" className="block text-md font-medium text-slate-700 dark:text-slate-300">Recent energy level? (1=Low, 5=High)</label>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="range"
              id="energy"
              min="1"
              max="5"
              value={answers.energyLevel}
              onChange={(e) => handleChange('energyLevel', parseInt(e.target.value, 10))}
               className={`w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:${sliderThumbClass} [&::-moz-range-thumb]:${sliderThumbClass}`}
            />
            <span className="font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-md py-1 px-2 w-20 text-center">{answers.energyLevel}</span>
          </div>
        </div>

        {/* Diet Quality */}
        <div>
           <label className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">How would you describe your diet?</label>
           <RadioCardGroup
             options={dietOptions}
             selectedValue={answers.dietQuality}
             onChange={(value) => handleChange('dietQuality', value)}
           />
        </div>
        
        {/* Activity Level */}
         <div>
           <label className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">How active are you weekly?</label>
           <RadioCardGroup
             options={activityOptions}
             selectedValue={answers.activityLevel}
             onChange={(value) => handleChange('activityLevel', value)}
           />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-amber-500/40 hover:from-amber-500 hover:to-orange-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-orange-600"
        >
          Submit & Analyze
        </button>
      </form>
    </div>
  );
};

export default LifestyleQuiz;