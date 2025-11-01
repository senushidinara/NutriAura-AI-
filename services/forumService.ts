import type { ForumPost, UserProfile } from '../types';

const FORUM_STORAGE_KEY = 'nutriaura_forum_posts';

// Seed with some initial data if the forum is empty
const getInitialPosts = (): ForumPost[] => {
    return [
        {
            id: '1',
            author: 'WellnessExplorer',
            content: 'Just got my first analysis! The sleep score was a real eye-opener. Anyone have tips for winding down at night?',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        },
        {
            id: '2',
            author: 'GlowingGrace',
            content: 'My hydration score was low, so I bought a new water bottle to keep at my desk. Small changes!',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        }
    ];
};

export const getPosts = (): ForumPost[] => {
    try {
        const postsJson = localStorage.getItem(FORUM_STORAGE_KEY);
        if (!postsJson) {
            const initialPosts = getInitialPosts();
            localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(initialPosts));
            return initialPosts;
        }
        return JSON.parse(postsJson);
    } catch (error) {
        console.error("Failed to parse forum posts from localStorage", error);
        return getInitialPosts();
    }
};

export const addPost = (content: string): ForumPost[] => {
    const currentPosts = getPosts();
    const newPost: ForumPost = {
        id: new Date().toISOString(),
        author: 'You', // In a real app, this would be the logged-in user
        content,
        timestamp: new Date().toISOString(),
    };
    const updatedPosts = [newPost, ...currentPosts];
    try {
        localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(updatedPosts));
    } catch (error) {
        console.error("Failed to save new post to localStorage", error);
    }
    return updatedPosts;
};


// --- Leaderboard Service ---
export interface LeaderboardUser {
    rank: number;
    name: string;
    level: number;
    totalAp: number;
}

// In a real app, this data would come from a backend.
// We simulate it here for demonstration.
const simulatedUsers = [
    { name: 'WellnessExplorer', level: 12, totalAp: 8850 },
    { name: 'GlowingGrace', level: 10, totalAp: 6200 },
    { name: 'ZenMaster', level: 15, totalAp: 12500 },
    { name: 'HydrationHero', level: 8, totalAp: 4100 },
    { name: 'NutriNinja', level: 11, totalAp: 7300 },
];

export const getLeaderboardData = (currentUserProfile: UserProfile): LeaderboardUser[] => {
    const { level, ap, apForNextLevel } = currentUserProfile;
    // Calculate total AP for the current user
    let totalCurrentUserAp = ap;
    for (let i = 1; i < level; i++) {
        totalCurrentUserAp += i * 100 + 100;
    }

    const allUsers = [
        ...simulatedUsers,
        { name: 'You', level: currentUserProfile.level, totalAp: totalCurrentUserAp }
    ];

    return allUsers
        .sort((a, b) => b.totalAp - a.totalAp)
        .map((user, index) => ({
            ...user,
            rank: index + 1
        }));
};