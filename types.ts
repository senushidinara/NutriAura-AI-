// FIX: Import 'React' to resolve type error for 'React.ElementType'.
import React from 'react';

export enum AppState {
  WELCOME,
  CAMERA,
  CONFIRM_PHOTO, // New state for photo confirmation
  QUIZ,
  ANALYZING,
  RESULTS,
  FORUM,
  PROGRESS,
  QUESTS,
  PROFILE,
  ALGORITHM_INFO,
  ERROR,
}

export interface QuizAnswers {
  sleepHours: number;
  stressLevel: number;
  energyLevel: number;
  dietQuality: string;
  hydration: string;
  activityLevel: string;
}

export interface AnalysisScores {
  nutrition: number;
  sleep: number;
  stress: number;
  hydration: number;
}

export interface GroundingChunk {
  web?: { uri: string; title: string };
  maps?: { uri: string; title: string };
}

export interface AnalysisResult {
  scores: AnalysisScores;
  keyFindings: {
    title: string;
    description: string;
    icon: 'nutrition' | 'sleep' | 'stress' | 'hydration' | 'pizza';
  }[];
  recommendations: {
    title: string;
    description: string;
    items: string[];
  }[];
  groundingAttribution?: GroundingChunk[];
}

export interface ForumPost {
    id: string;
    author: string;
    content: string;
    timestamp: string;
}

export interface WellnessDataPoint {
  timestamp: string;
  scores: AnalysisScores;
}

export interface Goal {
  id: string;
  text: string;
  category: 'nutrition' | 'sleep' | 'stress' | 'hydration' | 'general';
  completed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  details: string[];
}

export interface UserProfile {
  level: number;
  ap: number;
  apForNextLevel: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  apReward: number;
  icon: React.ElementType;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}