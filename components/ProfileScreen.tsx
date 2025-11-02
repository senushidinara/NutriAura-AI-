import React, { useState } from 'react';
import type { UserProfile, Badge } from '../types';
import { getBadges } from '../services/wellnessService';
import { ProfileIcon, AuraPointsIcon, BrainCircuitIcon } from './icons';

interface ProfileScreenProps {
    profile: UserProfile;
    earnedBadges: string[];
    onNavigateToInfo: () => void;
}

const BadgeDetailModal: React.FC<{ badge: Badge | null; onClose: () => void; }> = ({ badge, onClose }) => {
    if (!badge) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8 max-w-sm w-full text-center relative animate-slide-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl leading-none text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition rounded-full w-8 h-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">&times;</button>
                
                <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-amber-200 dark:bg-amber-800">
                    <badge.icon className="w-12 h-12 text-amber-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-200">{badge.title}</h3>
                
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {badge.description}
                </p>

                <button onClick={onClose} className="mt-6 w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-slate-800">
                    Close
                </button>
            </div>
        </div>
    );
};


const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, earnedBadges, onNavigateToInfo }) => {
    const allBadges = getBadges();
    const progressPercent = (profile.ap / profile.apForNextLevel) * 100;
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

    return (
        <div className="w-full text-center">
            <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-center gap-2">
                <ProfileIcon className="w-8 h-8"/>
                Your Profile
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">Your wellness journey and achievements.</p>

            <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8">
                {/* Level and AP */}
                <div className="p-6 rounded-lg mb-8 bg-slate-100 dark:bg-slate-700/50 shadow-inner">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-lg font-bold text-emerald-500">Level {profile.level}</span>
                        <span className="text-base text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <AuraPointsIcon className="w-4 h-4 text-amber-500"/> {profile.ap} / {profile.apForNextLevel} AP
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-emerald-400 to-sky-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>

                {/* Badges */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">Achievements</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {allBadges.map(badge => {
                            const isEarned = earnedBadges.includes(badge.id);
                            return (
                                <button 
                                    key={badge.id}
                                    onClick={() => setSelectedBadge(badge)}
                                    disabled={!isEarned}
                                    className={`p-4 rounded-lg text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 ${
                                        isEarned 
                                        ? 'bg-amber-100 dark:bg-amber-900/50 cursor-pointer hover:scale-105 hover:shadow-lg dark:focus-visible:ring-offset-amber-900/50' 
                                        : 'bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed'
                                    }`}
                                >
                                    <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${isEarned ? 'bg-amber-200 dark:bg-amber-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                        <badge.icon className={`w-8 h-8 ${isEarned ? 'text-amber-500' : 'text-slate-400'}`} />
                                    </div>
                                    <h4 className={`font-bold text-base ${isEarned ? 'text-amber-800 dark:text-amber-200' : 'text-slate-600 dark:text-slate-400'}`}>{badge.title}</h4>
                                    <p className={`text-sm ${isEarned ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-500'}`}>{badge.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Algorithm Info Button */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                     <button 
                        onClick={onNavigateToInfo}
                        className="w-full text-left p-4 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                        <div className="flex items-center gap-3">
                            <BrainCircuitIcon className="w-7 h-7 text-emerald-500"/>
                            <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-100">How Our AI Works</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Learn about our technology.</p>
                            </div>
                        </div>
                        <span className="text-slate-400 dark:text-slate-500">&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
