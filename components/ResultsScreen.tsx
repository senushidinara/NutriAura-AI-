import React, { useState, useMemo } from 'react';
import type { AnalysisResult, Goal } from '../types';
import { LeafIcon, MoonIcon, HeartIcon, DropletIcon, RestartIcon, TargetIcon, ShareIcon, AuraPointsIcon, PizzaIcon } from './icons';

interface ResultsScreenProps {
  result: AnalysisResult;
  goals: Goal[];
  onGoalsUpdate: (goals: Goal[]) => void;
  onReset: () => void;
  isChaosMode: boolean;
}

// FIX: Changed type from 'JSX.Element' to 'React.ReactElement' to resolve 'Cannot find namespace JSX' error.
const iconMap: { [key: string]: React.ReactElement } = {
  nutrition: <LeafIcon className="w-6 h-6 text-emerald-500" />,
  sleep: <MoonIcon className="w-6 h-6 text-indigo-500" />,
  stress: <HeartIcon className="w-6 h-6 text-rose-500" />,
  hydration: <DropletIcon className="w-6 h-6 text-sky-500" />,
  general: <TargetIcon className="w-6 h-6 text-amber-500" />,
  pizza: <PizzaIcon className="w-6 h-6 text-amber-500" />,
};

const ringColorMap = {
  nutrition: 'stroke-emerald-500 dark:stroke-emerald-400',
  sleep: 'stroke-indigo-500 dark:stroke-indigo-400',
  stress: 'stroke-rose-500 dark:stroke-rose-400',
  hydration: 'stroke-sky-500 dark:stroke-sky-400',
}

const ShareGoalModal: React.FC<{ goal: Goal | null; onClose: () => void; }> = ({ goal, onClose }) => {
    if (!goal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[#fdf6e4] dark:bg-[#3a342a] border-4 border-[#5c4b31] dark:border-[#e5d8b4] rounded-lg p-6 max-w-sm w-full text-center text-[#5c4b31] dark:text-[#fdf6e4] font-serif relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 text-[#5c4b31] dark:text-[#fdf6e4] hover:opacity-70">&times;</button>
                <h2 className="text-5xl font-extrabold uppercase tracking-widest mb-4">WANTED</h2>
                <div className="w-24 h-24 mx-auto mb-4 bg-[#e5d8b4] dark:bg-[#5c4b31] rounded-full flex items-center justify-center border-2 border-current">
                    {React.cloneElement(iconMap[goal.category], { className: "w-12 h-12" })}
                </div>
                <p className="text-lg mb-2 font-semibold">For achieving wellness:</p>
                <p className="text-2xl font-bold mb-4 bg-[#e5d8b4]/50 dark:bg-[#5c4b31]/50 p-2 rounded">{goal.text}</p>
                <p className="font-bold text-xl uppercase">REWARD</p>
                <p className="text-lg">A Healthier, Happier You</p>
                <div className="mt-4 text-xs uppercase">Issued by NutriAura AI Wellness Division</div>
            </div>
        </div>
    );
};


const ScoreRing: React.FC<{ score: number; label: string, colorClass: string }> = ({ score, label, colorClass }) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const [offset, setOffset] = useState(circumference);
    
    React.useEffect(() => {
        const progress = circumference - (score / 100) * circumference;
        setOffset(progress);
    }, [score, circumference]);

    return (
        <div className="flex flex-col items-center justify-center relative">
            <svg className="w-32 h-32 transform -rotate-90">
                <circle className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="10" fill="transparent" r={radius} cx="64" cy="64" />
                <circle
                    className={`${colorClass}`}
                    style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1s ease-out' }}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="64"
                    cy="64"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-3xl font-bold ${colorClass.replace('stroke', 'text')}`}>{score}</span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
            </div>
        </div>
    );
};

const GoalSetter: React.FC<{ result: AnalysisResult; goals: Goal[]; onGoalsUpdate: (goals: Goal[]) => void; onShare: (goal: Goal) => void; }> = ({ result, goals, onGoalsUpdate, onShare }) => {
    const [customGoal, setCustomGoal] = useState('');

    const suggestedGoals = useMemo(() => {
        const sortedScores = (Object.keys(result.scores) as Array<keyof typeof result.scores>)
            .sort((a, b) => result.scores[a] - result.scores[b]);
        
        const suggestions = {
            sleep: "Get 7-8 hours of quality sleep.",
            stress: "Practice 5 minutes of mindfulness daily.",
            nutrition: "Add a serving of greens to one meal daily.",
            hydration: "Drink 8 glasses of water a day."
        };

        return sortedScores.slice(0, 2).map(key => ({
            text: suggestions[key],
            category: key,
        }));

    }, [result.scores]);

    const handleAddGoal = (text: string, category: Goal['category']) => {
        if (!text.trim()) return;
        const newGoal: Goal = {
            id: new Date().toISOString(),
            text,
            category,
            completed: false,
        };
        onGoalsUpdate([...goals, newGoal]);
    };

    const handleAddCustomGoal = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddGoal(customGoal, 'general');
        setCustomGoal('');
    };

    const handleToggleGoal = (id: string) => {
        const updatedGoals = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
        onGoalsUpdate(updatedGoals);
    };

    const handleDeleteGoal = (id: string) => {
        onGoalsUpdate(goals.filter(g => g.id !== id));
    };

    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <TargetIcon className="w-6 h-6 text-amber-500" />
                Set Your Goals
            </h3>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Suggested For You</h4>
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    {suggestedGoals.map(sg => (
                        <button key={sg.text} onClick={() => handleAddGoal(sg.text, sg.category as Goal['category'])} className="flex-1 text-left text-sm p-2 bg-emerald-50 dark:bg-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 rounded-md transition text-emerald-800 dark:text-emerald-300">
                           + {sg.text}
                        </button>
                    ))}
                </div>
                
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Your Current Goals</h4>
                <div className="space-y-2 mb-4">
                    {goals.length > 0 ? goals.map(goal => (
                        <div key={goal.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md group">
                            <div className="flex items-center">
                                <input type="checkbox" id={`goal-${goal.id}`} checked={goal.completed} onChange={() => handleToggleGoal(goal.id)} className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor={`goal-${goal.id}`} className={`ml-2 text-sm font-medium ${goal.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-300'}`}>{goal.text}</label>
                            </div>
                            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onShare(goal)} className="p-1 text-slate-400 hover:text-emerald-500" title="Share Goal"><ShareIcon className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteGoal(goal.id)} className="p-1 text-slate-400 hover:text-rose-500" title="Remove Goal">&times;</button>
                            </div>
                        </div>
                    )) : <p className="text-sm text-slate-500 dark:text-slate-400">No goals set yet. Add one!</p>}
                </div>

                <form onSubmit={handleAddCustomGoal} className="flex gap-2">
                    <input type="text" value={customGoal} onChange={(e) => setCustomGoal(e.target.value)} placeholder="Add a custom goal..." className="flex-grow p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition text-sm" />
                    <button type="submit" className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition disabled:bg-slate-400" disabled={!customGoal.trim()}>Add</button>
                </form>
            </div>
        </div>
    );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, goals, onGoalsUpdate, onReset, isChaosMode }) => {
  const [showApNotification, setShowApNotification] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedGoalToShare, setSelectedGoalToShare] = useState<Goal | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowApNotification(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleShareGoal = (goal: Goal) => {
    setSelectedGoalToShare(goal);
    setIsShareModalOpen(true);
  };
  
  const modifiedResult = useMemo(() => {
    if (!isChaosMode) return result;

    const chaoticResult = JSON.parse(JSON.stringify(result));

    chaoticResult.keyFindings.unshift({
        title: "Cosmic Pizza Alignment",
        description: "Your facial scan indicates a severe deficiency in cheese and pepperoni. This is a critical wellness indicator.",
        icon: 'pizza',
    });
    
    chaoticResult.recommendations.unshift({
        title: "Embrace the Chaos",
        description: "Sometimes, the best plan is no plan. Your aura suggests a dose of pure, unadulterated fun.",
        items: [
            "Eat pizza for breakfast.",
            "Wear mismatched socks with confidence.",
            "Replace one workout with a spontaneous dance party."
        ]
    });

    return chaoticResult;
  }, [result, isChaosMode]);


  return (
    <div className="p-1 w-full animate-fade-in max-w-2xl mx-auto">
      {showApNotification && (
         <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-amber-400/90 dark:bg-amber-500/90 text-slate-900 dark:text-white font-bold py-2 px-4 rounded-full shadow-lg z-20 flex items-center gap-2 animate-fade-in-down">
            <AuraPointsIcon className="w-5 h-5" />
            <span>+100 Aura Points Earned!</span>
         </div>
      )}
      <ShareGoalModal goal={selectedGoalToShare} onClose={() => setIsShareModalOpen(false)} />

      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">
        {isChaosMode ? "Your Chaotic Aura" : "Your Wellness Aura"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Here's what your body is telling you.</p>

      {/* Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
        <ScoreRing score={modifiedResult.scores.nutrition} label="Nutrition" colorClass={ringColorMap.nutrition} />
        <ScoreRing score={modifiedResult.scores.sleep} label="Sleep" colorClass={ringColorMap.sleep} />
        <ScoreRing score={modifiedResult.scores.stress} label="Stress" colorClass={ringColorMap.stress} />
        <ScoreRing score={modifiedResult.scores.hydration} label="Hydration" colorClass={ringColorMap.hydration} />
      </div>

      {/* Key Findings */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">Key Findings</h3>
        <div className="space-y-3">
          {modifiedResult.keyFindings.map((finding, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm flex items-start gap-4">
              <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-700 p-3 rounded-full">{iconMap[finding.icon]}</div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{finding.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{finding.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommendations */}
       <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">Your Personalized Plan</h3>
         <div className="space-y-4">
            {modifiedResult.recommendations.map((rec, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{rec.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{rec.description}</p>
                    <ul className="space-y-2">
                        {rec.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <span className="text-emerald-500 dark:text-emerald-400 mt-1">&#10003;</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
         </div>
      </div>
      
      {/* Goal Setter */}
      <GoalSetter result={modifiedResult} goals={goals} onGoalsUpdate={onGoalsUpdate} onShare={handleShareGoal} />

      <button
        onClick={onReset}
        className="w-full bg-slate-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-400 dark:focus:ring-slate-500 flex items-center justify-center gap-2"
      >
        <RestartIcon className="w-5 h-5"/>
        <span>Analyze Again</span>
      </button>
    </div>
  );
};

export default ResultsScreen;