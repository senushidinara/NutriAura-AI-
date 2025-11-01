import type { WellnessDataPoint, Goal, UserProfile, Mission, Badge, Challenge } from '../types';
import { LeafIcon, MoonIcon, DropletIcon, HeartIcon, TrophyIcon, BadgeIcon } from '../components/icons';

const HISTORY_KEY = 'nutriaura_wellness_history';
const GOALS_KEY = 'nutriaura_user_goals';
const CHALLENGES_KEY = 'nutriaura_joined_challenges';
const PROFILE_KEY = 'nutriaura_user_profile';
const COMPLETED_MISSIONS_KEY = 'nutriaura_completed_missions';
const EARNED_BADGES_KEY = 'nutriaura_earned_badges';


// --- Wellness History ---

export const getHistory = (): WellnessDataPoint[] => {
    try {
        const historyJson = localStorage.getItem(HISTORY_KEY);
        return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
        console.error("Failed to parse wellness history from localStorage", error);
        return [];
    }
};

export const addHistoryPoint = (dataPoint: WellnessDataPoint): WellnessDataPoint[] => {
    const history = getHistory();
    const updatedHistory = [...history, dataPoint];
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
        console.error("Failed to save history point to localStorage", error);
    }
    return updatedHistory;
};

// --- User Goals ---

export const getGoals = (): Goal[] => {
    try {
        const goalsJson = localStorage.getItem(GOALS_KEY);
        return goalsJson ? JSON.parse(goalsJson) : [];
    } catch (error) {
        console.error("Failed to parse goals from localStorage", error);
        return [];
    }
};

export const saveGoals = (goals: Goal[]): void => {
    try {
        localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    } catch (error) {
        console.error("Failed to save goals to localStorage", error);
    }
};

// --- Community Challenges ---

const allChallenges: Challenge[] = [
    { id: 'hydration_challenge_month', title: 'Hydration Challenge', description: 'Drink 2L of water every day for a week.', icon: DropletIcon },
    { id: 'mindful_eating_week', title: 'Mindful Eating Week', description: 'Eat without distractions for at least one meal a day.', icon: LeafIcon },
    { id: 'digital_detox_weekend', title: 'Digital Detox Weekend', description: 'Spend a weekend with minimal screen time.', icon: MoonIcon },
];

export const getChallenges = (): Challenge[] => allChallenges;

export const getJoinedChallenges = (): string[] => {
    try {
        const challengesJson = localStorage.getItem(CHALLENGES_KEY);
        return challengesJson ? JSON.parse(challengesJson) : [];
    } catch (error) {
        console.error("Failed to parse joined challenges from localStorage", error);
        return [];
    }
};

export const joinChallenge = (challengeId: string): string[] => {
    const joined = getJoinedChallenges();
    if (!joined.includes(challengeId)) {
        const updatedJoined = [...joined, challengeId];
        try {
            localStorage.setItem(CHALLENGES_KEY, JSON.stringify(updatedJoined));
            return updatedJoined;
        } catch (error) {
            console.error("Failed to save joined challenge to localStorage", error);
        }
    }
    return joined;
};

// --- Gamification: Profile, Missions, Badges ---

const calculateLevel = (level: number, ap: number): UserProfile => {
    let currentLevel = level;
    let currentAp = ap;
    let apForNextLevel = currentLevel * 100 + 100;

    while (currentAp >= apForNextLevel) {
        currentAp -= apForNextLevel;
        currentLevel++;
        apForNextLevel = currentLevel * 100 + 100;
    }
    return { level: currentLevel, ap: currentAp, apForNextLevel };
}

export const getUserProfile = (): UserProfile => {
    try {
        const profileJson = localStorage.getItem(PROFILE_KEY);
        if (profileJson) {
            const savedProfile = JSON.parse(profileJson);
            return calculateLevel(savedProfile.level, savedProfile.ap);
        }
    } catch (error) {
        console.error("Failed to parse user profile from localStorage", error);
    }
    return { level: 1, ap: 0, apForNextLevel: 200 };
}

export const saveUserProfile = (profile: {level: number, ap: number}): void => {
     try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
        console.error("Failed to save user profile to localStorage", error);
    }
}

export const awardAp = (points: number): UserProfile => {
    const profile = getUserProfile();
    const newAp = profile.ap + points;
    const { level, ap, apForNextLevel } = calculateLevel(profile.level, newAp);
    
    // Save the raw level and AP before recalculation
    const currentRawProfile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{"level":1, "ap":0}');
    saveUserProfile({level: currentRawProfile.level, ap: currentRawProfile.ap + points });

    return {level, ap, apForNextLevel};
}

const allMissions: Mission[] = [
    { id: 'daily_hydrate', title: 'Hydration Heist', description: 'Drink 8 glasses of water.', type: 'daily', apReward: 20, icon: DropletIcon },
    { id: 'daily_meditate', title: 'Mindful Moment', description: 'Complete a 5-minute meditation session.', type: 'daily', apReward: 25, icon: HeartIcon },
    { id: 'weekly_sleep', title: 'Sleep Saboteur', description: 'Get 7+ hours of sleep for 3 nights in a row.', type: 'weekly', apReward: 150, icon: MoonIcon },
    { id: 'weekly_greens', title: 'Fruit Ninja', description: 'Eat 5 servings of fruits or vegetables in one day.', type: 'weekly', apReward: 100, icon: LeafIcon },
];

export const getMissions = (): Mission[] => allMissions;

export const getCompletedMissions = (): string[] => {
    // In a real app, daily/weekly missions would reset. This is a simplified version.
    try {
        const missionsJson = localStorage.getItem(COMPLETED_MISSIONS_KEY);
        return missionsJson ? JSON.parse(missionsJson) : [];
    } catch (error) {
        return [];
    }
}

export const completeMission = (missionId: string): string[] => {
    const completed = getCompletedMissions();
    if(!completed.includes(missionId)) {
        const updated = [...completed, missionId];
        localStorage.setItem(COMPLETED_MISSIONS_KEY, JSON.stringify(updated));
        return updated;
    }
    return completed;
}


const allBadges: Badge[] = [
    { id: 'first_analysis', title: 'Wellness Pioneer', description: 'Completed your first wellness analysis.', icon: TrophyIcon },
    { id: 'level_5', title: 'Level 5!', description: 'Reached Wellness Level 5.', icon: BadgeIcon },
    { id: 'five_goals', title: 'Goal Getter', description: 'Set at least 5 personal goals.', icon: BadgeIcon },
];

export const getBadges = (): Badge[] => allBadges;

export const getEarnedBadges = (): string[] => {
     try {
        const badgesJson = localStorage.getItem(EARNED_BADGES_KEY);
        return badgesJson ? JSON.parse(badgesJson) : [];
    } catch (error) {
        return [];
    }
}

export const earnBadge = (badgeId: string): string[] => {
    const earned = getEarnedBadges();
    if(!earned.includes(badgeId)) {
        const updated = [...earned, badgeId];
        localStorage.setItem(EARNED_BADGES_KEY, JSON.stringify(updated));
        return updated;
    }
    return earned;
}