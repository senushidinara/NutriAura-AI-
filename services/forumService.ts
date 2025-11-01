import type { ForumPost } from '../types';

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