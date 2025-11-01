import React from 'react';
import { RestartIcon } from './icons';

interface ErrorScreenProps {
  message: string;
  onReset: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onReset }) => {
  return (
    <div className="text-center flex flex-col items-center p-4 animate-fade-in bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-500/30 rounded-lg">
      <div className="mb-4 text-rose-500 dark:text-rose-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-rose-800 dark:text-rose-200 mb-2">An Error Occurred</h2>
      <p className="text-rose-600 dark:text-rose-300 mb-6 max-w-md">
        {message}
      </p>
      <button
        onClick={onReset}
        className="w-full max-w-xs bg-rose-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-rose-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-600 flex items-center justify-center gap-2"
      >
        <RestartIcon className="w-5 h-5" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;