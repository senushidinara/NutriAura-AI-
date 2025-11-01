import React from 'react';
import { CameraIcon, LeafIcon, QuestIcon } from './icons'; // Using QuestIcon for "Results" as a placeholder

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const stepDetails = [
  { name: 'Face Scan', icon: CameraIcon },
  { name: 'Lifestyle', icon: LeafIcon },
  { name: 'Results', icon: QuestIcon },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between">
        {stepDetails.map((step, index) => {
          const stepIndex = index + 1;
          const isCompleted = currentStep > stepIndex;
          const isActive = currentStep === stepIndex;

          return (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive ? 'bg-emerald-500 border-emerald-500' : ''}
                    ${isCompleted ? 'bg-emerald-500 border-emerald-500' : ''}
                    ${!isActive && !isCompleted ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600' : ''}
                  `}
                >
                  <step.icon
                    className={`w-6 h-6
                      ${isActive ? 'text-white' : ''}
                      ${isCompleted ? 'text-white' : ''}
                      ${!isActive && !isCompleted ? 'text-slate-400 dark:text-slate-500' : ''}
                    `}
                  />
                </div>
                <p
                  className={`mt-2 text-xs font-semibold transition-colors duration-300
                    ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}
                    ${isCompleted ? 'text-slate-600 dark:text-slate-300' : ''}
                    ${!isActive && !isCompleted ? 'text-slate-400 dark:text-slate-500' : ''}
                  `}
                >
                  {step.name}
                </p>
              </div>
              {index < stepDetails.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-500
                    ${currentStep > stepIndex ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;