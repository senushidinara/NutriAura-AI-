import React, { useState, useCallback, useEffect } from 'react';
import { AppState, QuizAnswers, AnalysisResult, WellnessDataPoint, Goal, UserProfile } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import CameraCapture from './components/CameraCapture';
import LifestyleQuiz from './components/LifestyleQuiz';
import AnalysisScreen from './components/AnalysisScreen';
import ResultsScreen from './components/ResultsScreen';
import ErrorScreen from './components/ErrorScreen';
import ForumScreen from './components/ForumScreen';
import ProgressScreen from './components/ProgressScreen';
import QuestsScreen from './components/QuestsScreen';
import ProfileScreen from './components/ProfileScreen';
import AlgorithmInfoScreen from './components/AlgorithmInfoScreen';
import { getWellnessAnalysis } from './services/geminiService';
import { getHistory, addHistoryPoint, getGoals, saveGoals, getUserProfile, awardAp as awardApService, getEarnedBadges, earnBadge as earnBadgeService } from './services/wellnessService';
import { LeafIcon, MoonIcon, SunIcon, UsersIcon, ChartBarIcon, QuestIcon, ProfileIcon, FireIcon, ArrowLeftIcon } from './components/icons';

const App: React.FC = () => {
  const [navigationStack, setNavigationStack] = useState<AppState[]>([AppState.WELCOME]);
  const appState = navigationStack[navigationStack.length - 1];

  const [userImage, setUserImage] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [history, setHistory] = useState<WellnessDataPoint[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(getUserProfile());
  const [earnedBadges, setEarnedBadges] = useState<string[]>(getEarnedBadges());

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isChaosMode, setIsChaosMode] = useState(() => {
    return localStorage.getItem('chaosMode') === 'true';
  });
  
  useEffect(() => {
    setHistory(getHistory());
    setGoals(getGoals());
    setUserProfile(getUserProfile());
    setEarnedBadges(getEarnedBadges());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  useEffect(() => {
    const root = document.documentElement;
    if (isChaosMode) {
      root.classList.add('chaos-mode');
      localStorage.setItem('chaosMode', 'true');
      const randomHue = Math.floor(Math.random() * 360);
      root.style.setProperty('--chaos-primary-color', `hsl(${randomHue}, 80%, 60%)`);
    } else {
      root.classList.remove('chaos-mode');
      localStorage.setItem('chaosMode', 'false');
      root.style.removeProperty('--chaos-primary-color');
    }
  }, [isChaosMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleChaosMode = () => setIsChaosMode(prev => !prev);

  const awardAp = useCallback((points: number) => {
    const newProfile = awardApService(points);
    setUserProfile(newProfile);
    // Check for new badges
    if(newProfile.level >= 5 && !earnedBadges.includes('level_5')) {
      earnBadgeService('level_5');
      setEarnedBadges(getEarnedBadges());
    }
  }, [earnedBadges]);

  const navigateTo = (state: AppState) => setNavigationStack(prev => [...prev, state]);
  const goBack = () => setNavigationStack(prev => prev.slice(0, -1));
  const resetTo = (state: AppState) => setNavigationStack([state]);

  const handleStart = useCallback(() => navigateTo(AppState.CAMERA), []);
  
  const handlePhotoCapture = useCallback((imageDataUrl: string) => {
    setUserImage(imageDataUrl);
    navigateTo(AppState.QUIZ);
  }, []);

  const handleQuizSubmit = useCallback((answers: QuizAnswers) => {
    setQuizAnswers(answers);
    resetTo(AppState.ANALYZING); // Use resetTo to clear nav history for analysis flow
  }, []);
  
  const handleReset = useCallback(() => {
    setUserImage(null);
    setQuizAnswers(null);
    setAnalysisResult(null);
    setError(null);
    resetTo(AppState.WELCOME);
  }, []);

  const handleBack = useCallback(() => {
    if (navigationStack.length > 1) {
        goBack();
    }
  }, [navigationStack.length]);

  const handleNavigate = useCallback((state: AppState) => {
    resetTo(state);
  }, []);
  
  const handleNavigateToInfo = useCallback(() => {
    navigateTo(AppState.ALGORITHM_INFO);
  }, []);

  const handleGoalsUpdate = useCallback((updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  }, []);

  const requestLocation = (): Promise<{ latitude: number, longitude: number } | null> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.warn("Geolocation is not supported by this browser.");
            resolve(null);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.warn("Could not get user location:", error.message);
                resolve(null); // Resolve with null on error to not block the process
            }
        );
    });
  };
  
  const analyzeWellness = useCallback(async () => {
    if (!userImage || !quizAnswers) return;

    try {
      setError(null);
      
      // Request location before analysis for grounded results
      const location = await requestLocation();
      
      const result = await getWellnessAnalysis(userImage, quizAnswers, location);
      setAnalysisResult(result);
      
      const newDataPoint: WellnessDataPoint = {
        timestamp: new Date().toISOString(),
        scores: result.scores,
      };
      const updatedHistory = addHistoryPoint(newDataPoint);
      setHistory(updatedHistory);
      
      awardAp(100);

      if(!earnedBadges.includes('first_analysis')) {
        earnBadgeService('first_analysis');
        setEarnedBadges(getEarnedBadges());
      }
      
      resetTo(AppState.RESULTS);
    } catch (err) {
      console.error("Analysis failed:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis.";
      setError(errorMessage);
      resetTo(AppState.ERROR);
    }
  }, [userImage, quizAnswers, awardAp, earnedBadges]);
  
  useEffect(() => {
    if (appState === AppState.ANALYZING) {
      analyzeWellness();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  const renderContent = () => {
    const key = `${appState}-${navigationStack.length}`;
    const showBackButton = navigationStack.length > 1 && appState !== AppState.WELCOME;

    return (
       <div key={key} className="w-full animate-slide-in">
        {showBackButton && (
            <button onClick={handleBack} className="mb-4 text-sm flex items-center gap-1 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
              <ArrowLeftIcon className="w-4 h-4"/> Back
            </button>
        )}
        {(() => {
          switch (appState) {
            case AppState.CAMERA:
              return <CameraCapture onCapture={handlePhotoCapture} />;
            case AppState.QUIZ:
              return <LifestyleQuiz onSubmit={handleQuizSubmit} />;
            case AppState.ANALYZING:
              return <AnalysisScreen isChaosMode={isChaosMode} />;
            case AppState.RESULTS:
              return analysisResult && <ResultsScreen result={analysisResult} goals={goals} onGoalsUpdate={handleGoalsUpdate} onReset={handleReset} isChaosMode={isChaosMode} />;
            case AppState.FORUM:
              return <ForumScreen />;
            case AppState.PROGRESS:
              return <ProgressScreen history={history} />;
            case AppState.QUESTS:
              return <QuestsScreen onAwardAp={awardAp} />;
            case AppState.PROFILE:
              return <ProfileScreen profile={userProfile} earnedBadges={earnedBadges} onNavigateToInfo={handleNavigateToInfo} />;
            case AppState.ALGORITHM_INFO:
              return <AlgorithmInfoScreen />;
            case AppState.ERROR:
              return <ErrorScreen message={error || "An unknown error occurred."} onReset={handleReset} />;
            case AppState.WELCOME:
            default:
              return <WelcomeScreen onStart={handleStart} isChaosMode={isChaosMode} />;
          }
        })()}
      </div>
    )
  };
  
  const NavButton: React.FC<{ targetState: AppState; label: string; children: React.ReactNode }> = ({ targetState, label, children }) => (
    <button 
      onClick={() => handleNavigate(targetState)} 
      className={`p-2 rounded-lg transition-all duration-200 no-chaos relative ${appState === targetState ? 'bg-slate-200/80 dark:bg-slate-700/80' : 'hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}
      aria-label={label}
    >
      {children}
      {appState === targetState && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>}
    </button>
  );


  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col items-center p-4">
       <header className="fixed top-0 left-0 right-0 z-10 w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50">
         <div className="max-w-4xl mx-auto p-3 flex justify-between items-center">
            <button onClick={handleReset} className="flex items-center gap-2 group">
              <LeafIcon className="w-8 h-8 text-emerald-500 group-hover:rotate-12 transition-transform" />
              <h1 className="text-xl font-bold text-slate-700 dark:text-slate-200 hidden sm:block">NutriAura AI</h1>
            </button>
            <nav className="flex items-center gap-1 sm:gap-2">
               <NavButton targetState={AppState.PROFILE} label="Your Profile">
                 <ProfileIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
               </NavButton>
               <NavButton targetState={AppState.QUESTS} label="Wellness Quests">
                 <QuestIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
               </NavButton>
               <NavButton targetState={AppState.PROGRESS} label="View Progress">
                 <ChartBarIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
               </NavButton>
               <NavButton targetState={AppState.FORUM} label="Community Forum">
                 <UsersIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
               </NavButton>
               <button onClick={toggleChaosMode} className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors no-chaos" aria-label="Toggle Chaos Mode">
                 <FireIcon className={`w-6 h-6 transition-colors ${isChaosMode ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'}`} />
               </button>
               <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors no-chaos" aria-label="Toggle dark mode">
                {isDarkMode ? <SunIcon className="w-6 h-6 text-amber-400" /> : <MoonIcon className="w-6 h-6 text-slate-600" />}
               </button>
            </nav>
         </div>
       </header>
       <main className="w-full max-w-lg mx-auto pt-24 pb-12">
         {renderContent()}
       </main>
    </div>
  );
};

export default App;