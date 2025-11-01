import React, { useState, useEffect, useCallback } from 'react';
import type { ForumPost } from '../types';
import { getPosts, addPost } from '../services/forumService';
import { MessageSquareIcon, LeafIcon } from './icons';

const timeSince = (date: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

const communityTips = [
    {
        tip: "Feeling stressed? Try the 4-7-8 breathing technique: inhale for 4s, hold for 7s, exhale for 8s.",
    },
    {
        tip: "For better sleep, try to get 10-15 minutes of morning sunlight. It helps regulate your circadian rhythm.",
    },
    {
        tip: "A simple tip for hydration: keep a water bottle on your desk at all times. Out of sight, out of mind!",
    }
];

const CommunityTips: React.FC = () => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <LeafIcon className="w-6 h-6 text-emerald-500" />
                Community Tips
            </h3>
            <div className="space-y-3">
                {communityTips.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <p className="text-slate-600 dark:text-slate-300 text-sm">"{item.tip}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ForumScreen: React.FC = () => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setPosts(getPosts());
    }, []);

    const handlePostSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setTimeout(() => {
            const updatedPosts = addPost(newPostContent);
            setPosts(updatedPosts);
            setNewPostContent('');
            setIsSubmitting(false);
        }, 500);
    }, [newPostContent, isSubmitting]);

    const handleReport = useCallback((postId: string) => {
        console.log(`Post ${postId} reported.`);
        alert("Thank you for your report. Our moderators will review this post.");
    }, []);

    return (
        <div className="w-full animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Community Hub</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Share your journey, and connect with others.</p>

            <CommunityTips />

            {/* New Post Form */}
            <form onSubmit={handlePostSubmit} className="my-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
                <label htmlFor="new-post" className="sr-only">Share your thoughts</label>
                <textarea
                    id="new-post"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your progress, ask a question..."
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    rows={3}
                />
                <div className="flex justify-end mt-3">
                    <button
                        type="submit"
                        disabled={!newPostContent.trim() || isSubmitting}
                        className="bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-emerald-600 transition disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>

            {/* Posts List */}
            <div>
                 <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                            <MessageSquareIcon className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">{post.author}</p>
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{timeSince(post.timestamp)}</span>
                                </div>
                                <p className="mt-3 text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{post.content}</p>
                                <div className="text-right mt-2">
                                    <button onClick={() => handleReport(post.id)} className="text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition">
                                        Report
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400">No posts yet. Be the first to share!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForumScreen;