import React, { useState, useEffect, useCallback } from 'react';
import type { ForumPost, Challenge } from '../types';
import { getPosts, addPost, getLeaderboardData } from '../services/forumService';
import { getChallenges, getJoinedChallenges, joinChallenge, getUserProfile } from '../services/wellnessService';
import type { LeaderboardUser } from '../services/forumService';
import { MessageSquareIcon, LeafIcon, TrophyIcon, LeaderboardIcon } from './icons';

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

const ChallengeDetailModal: React.FC<{ challenge: Challenge | null; onClose: () => void }> = ({ challenge, onClose }) => {
    if (!challenge) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8 max-w-lg w-full relative animate-slide-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">&times;</button>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50">
                        <challenge.icon className="w-8 h-8 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{challenge.title}</h3>
                        <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">{challenge.duration}</p>
                    </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{challenge.description}</p>
                <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2">How to Participate:</h4>
                <ul className="space-y-2">
                    {challenge.details.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <span className="text-emerald-500 dark:text-emerald-400 mt-1">&#10003;</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="mt-6 w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition">
                    Close
                </button>
            </div>
        </div>
    );
};

const WellnessChallenges: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        setChallenges(getChallenges());
        setJoinedChallenges(getJoinedChallenges());
    }, []);

    const handleJoin = (e: React.MouseEvent, challengeId: string) => {
        e.stopPropagation();
        const updatedJoined = joinChallenge(challengeId);
        setJoinedChallenges(updatedJoined);
    };

    return (
        <>
            <ChallengeDetailModal challenge={selectedChallenge} onClose={() => setSelectedChallenge(null)} />
            <div className="space-y-3">
                {challenges.map(challenge => {
                    const isJoined = joinedChallenges.includes(challenge.id);
                    return (
                        <div key={challenge.id} onClick={() => setSelectedChallenge(challenge)} className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-full ${isJoined ? 'bg-slate-200 dark:bg-slate-700' : 'bg-amber-100 dark:bg-amber-900/50'}`}>
                                    <challenge.icon className={`w-7 h-7 ${isJoined ? 'text-slate-400' : 'text-amber-500'}`} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{challenge.title}</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-base">{challenge.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => handleJoin(e, challenge.id)}
                                disabled={isJoined}
                                className={`py-2 px-4 rounded-lg text-sm font-bold transition whitespace-nowrap ${
                                    isJoined 
                                        ? 'bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-400 cursor-default' 
                                        : 'bg-amber-500 text-white hover:bg-amber-600'
                                }`}
                            >
                                {isJoined ? 'Joined!' : 'Join'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    
    useEffect(() => {
        const profile = getUserProfile();
        setLeaderboard(getLeaderboardData(profile));
    }, []);

    return (
        <div className="space-y-3">
            {leaderboard.map((user, index) => (
                <div key={user.name} className={`p-4 rounded-lg flex items-center justify-between gap-4 ${user.name === 'You' ? 'bg-emerald-50 dark:bg-emerald-900/50 border-2 border-emerald-500' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-lg w-6 text-slate-500 dark:text-slate-400">{user.rank}</span>
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-base">Level {user.level}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-amber-500">{user.totalAp.toLocaleString()} AP</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


const ForumScreen: React.FC = () => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newPostContent, setNewPostContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<'community' | 'leaderboard'>('community');

    useEffect(() => {
      // Simulate fetching data
      setTimeout(() => {
        setPosts(getPosts());
        setIsLoading(false);
      }, 700);
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

    const renderCommunityContent = () => (
        <>
            <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8 mb-8">
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <TrophyIcon className="w-6 h-6 text-amber-500" />
                    Community Challenges
                </h3>
                <WellnessChallenges />
            </div>
            {/* Posts Section */}
            <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">Recent Posts</h3>
                <form onSubmit={handlePostSubmit} className="mb-6 bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Share your progress, ask a question..." className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition" rows={3} />
                    <div className="flex justify-end mt-3">
                        <button type="submit" disabled={!newPostContent.trim() || isSubmitting} className="bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-emerald-600 transition disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <p className="font-semibold text-slate-700 dark:text-slate-200">{post.author}</p>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{timeSince(post.timestamp)}</span>
                            </div>
                            <p className="mt-3 text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    const renderLeaderboardContent = () => (
        <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <LeaderboardIcon className="w-6 h-6 text-amber-500" />
                Top Performers
            </h3>
            <Leaderboard />
        </div>
    );

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Community Hub</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 text-center">Share your journey, and connect with others.</p>
            
            <div className="mb-6 flex justify-center">
                <div className="bg-slate-200 dark:bg-slate-700 p-1 rounded-lg flex gap-1">
                    <button onClick={() => setActiveTab('community')} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === 'community' ? 'bg-white text-emerald-600 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300'}`}>Community</button>
                    <button onClick={() => setActiveTab('leaderboard')} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === 'leaderboard' ? 'bg-white text-emerald-600 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300'}`}>Leaderboard</button>
                </div>
            </div>

            {activeTab === 'community' ? renderCommunityContent() : renderLeaderboardContent()}
        </div>
    );
};

export default ForumScreen;