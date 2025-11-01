import React, { useState, useEffect } from 'react';
import { getMissions, completeMission, getCompletedMissions } from '../services/wellnessService';
import type { Mission } from '../types';
import { QuestIcon, AuraPointsIcon } from './icons';

interface QuestsScreenProps {
    onAwardAp: (points: number) => void;
}

const QuestsScreen: React.FC<QuestsScreenProps> = ({ onAwardAp }) => {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [completedMissions, setCompletedMissions] = useState<string[]>([]);

    useEffect(() => {
        setMissions(getMissions());
        setCompletedMissions(getCompletedMissions());
    }, []);

    const handleCompleteMission = (mission: Mission) => {
        if (completedMissions.includes(mission.id)) return;
        
        onAwardAp(mission.apReward);
        const updatedCompleted = completeMission(mission.id);
        setCompletedMissions(updatedCompleted);
    };

    const renderMissionList = (title: string, type: 'daily' | 'weekly') => {
        const filteredMissions = missions.filter(m => m.type === type);
        return (
            <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">{title}</h3>
                <div className="space-y-3">
                    {filteredMissions.map(mission => {
                        const isCompleted = completedMissions.includes(mission.id);
                        return (
                            <div key={mission.id} className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg flex items-center justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-full ${isCompleted ? 'bg-slate-200 dark:bg-slate-700' : 'bg-emerald-100 dark:bg-emerald-900/50'}`}>
                                      <mission.icon className={`w-7 h-7 ${isCompleted ? 'text-slate-400' : 'text-emerald-500'}`} />
                                    </div>
                                    <div className={isCompleted ? 'opacity-60' : ''}>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-100">{mission.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-base">{mission.description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        onClick={() => handleCompleteMission(mission)}
                                        disabled={isCompleted}
                                        className={`py-2 px-4 rounded-lg text-sm font-bold transition whitespace-nowrap ${
                                            isCompleted 
                                                ? 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400 cursor-default' 
                                                : 'bg-emerald-500 text-white hover:bg-emerald-600'
                                        }`}
                                    >
                                        {isCompleted ? 'Done!' : 'Complete'}
                                    </button>
                                     <div className={`flex items-center gap-1 text-xs font-bold ${isCompleted ? 'text-slate-400' : 'text-amber-500'}`}>
                                        <AuraPointsIcon className="w-3 h-3" />
                                        <span>+{mission.apReward} AP</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
             <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center flex items-center justify-center gap-2">
                <QuestIcon className="w-8 h-8" />
                Wellness Quests
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 text-center">Complete quests to earn Aura Points and level up!</p>
            <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8">
                {renderMissionList("Daily Quests", "daily")}
                {renderMissionList("Weekly Quests", "weekly")}
            </div>
        </div>
    );
};

export default QuestsScreen;