import React from 'react';
import type { WellnessDataPoint } from '../types';
import { ChartBarIcon, LeafIcon, MoonIcon, HeartIcon } from './icons';

interface LineChartProps {
    data: { value: number; label: string }[];
    color: string;
    label: string;
    Icon: React.ElementType;
}

const LineChart: React.FC<LineChartProps> = ({ data, color, label, Icon }) => {
    if (data.length < 2) {
        return (
            <div className="h-48 flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-500">Not enough data to show a trend.</p>
            </div>
        );
    }

    const width = 300;
    const height = 150;
    const padding = 20;
    const maxY = 100;
    const xStep = (width - padding * 2) / (data.length - 1);

    const points = data.map((point, i) => {
        const x = padding + i * xStep;
        const y = height - padding - (point.value / maxY) * (height - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <Icon className={`w-5 h-5 ${color.replace('stroke', 'text')}`} />
                {label} Trend
            </h4>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <defs>
                    <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color.replace('stroke', 'text').replace('text','bg')} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color.replace('stroke', 'text').replace('text','bg')} stopOpacity="0" />
                    </linearGradient>
                </defs>

                <polyline
                    fill={`url(#gradient-${label})`}
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    className="chart-line"
                />

                {data.map((point, i) => {
                    const x = padding + i * xStep;
                    const y = height - padding - (point.value / maxY) * (height - padding * 2);
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="3" fill={color} className="chart-dot" />
                            <title>{`Score: ${point.value} on ${point.label}`}</title>
                        </g>
                    );
                })}
            </svg>
             {/* FIX: Removed the non-standard 'jsx' prop from the <style> tag to conform with standard React/TSX syntax. */}
             <style>{`
                .chart-line {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: dash 1.5s ease-out forwards;
                }
                .chart-dot {
                    opacity: 0;
                    animation: fade-in 0.5s ease-out forwards;
                    animation-delay: 1.2s;
                }
                @keyframes dash {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes fade-in {
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};


interface ProgressScreenProps {
    history: WellnessDataPoint[];
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ history }) => {
    const chartData = (key: 'nutrition' | 'sleep' | 'stress' | 'hydration') => {
        return history.map(item => ({
            value: item.scores[key],
            label: new Date(item.timestamp).toLocaleDateString(),
        }));
    };
    
    return (
        <div className="w-full animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center flex items-center justify-center gap-2">
                <ChartBarIcon className="w-8 h-8"/>
                Your Progress
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Track your wellness scores over time.</p>

            {history.length === 0 ? (
                 <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                    <p className="text-slate-500 dark:text-slate-400">You don't have any history yet.</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Complete your first analysis to start tracking your progress!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <LineChart data={chartData('nutrition')} color="stroke-emerald-500 text-emerald-500 bg-emerald-500" label="Nutrition" Icon={LeafIcon} />
                    <LineChart data={chartData('sleep')} color="stroke-indigo-500 text-indigo-500 bg-indigo-500" label="Sleep" Icon={MoonIcon} />
                    <LineChart data={chartData('stress')} color="stroke-rose-500 text-rose-500 bg-rose-500" label="Stress" Icon={HeartIcon} />
                </div>
            )}
        </div>
    );
};

export default ProgressScreen;