import React from 'react';
import { RestartIcon } from './icons';

interface ErrorScreenProps {
  message: string;
  onReset: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onReset }) => {
  return (
    <div className="text-center flex flex-col items-center p-6 sm:p-8 interactive-card rounded-xl shadow-lg border border-rose-200 dark:border-rose-500/30">
      <div className="mb-4 text-rose-500 dark:text-rose-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-rose-800 dark:text-rose-200 mb-2">An Error Occurred</h2>
      <p className="text-rose-600 dark:text-rose-300 mb-6 max-w-md">
        {message}
      </p>
      <button
        onClick={onReset}
        className="w-full max-w-xs bg-rose-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-rose-600 transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 dark:focus-visible:ring-rose-600 flex items-center justify-center gap-2"
      >
        <RestartIcon className="w-5 h-5" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;
