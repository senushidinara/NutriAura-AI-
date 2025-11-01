import React from 'react';
import { BrainCircuitIcon, LeafIcon, HeartIcon } from './icons';

const AlgorithmInfoScreen: React.FC = () => {
    
    const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
            <div className="space-y-3 text-slate-600 dark:text-slate-400">{children}</div>
        </div>
    );

    const linkClass = "text-emerald-600 dark:text-emerald-400 font-semibold hover:underline";

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center flex items-center justify-center gap-2">
                <BrainCircuitIcon className="w-8 h-8" />
                How Our AI Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Fostering transparency in our wellness technology.</p>

            <div className="interactive-card rounded-xl shadow-lg p-6 sm:p-8">
                <InfoSection title="🧬 The Core Idea">
                    <p>
                        NutriAura AI is designed to be your body's intelligent mirror. We combine visual data from your face with self-reported lifestyle habits to create a holistic snapshot of your potential wellness patterns. Our goal is to find connections that might otherwise be missed.
                    </p>
                </InfoSection>

                <InfoSection title="📸 Step 1: The AI Face Scan">
                    <p>
                        When you provide a photo, our system analyzes it for common visual indicators related to wellness. This is not a medical diagnosis, but rather a pattern recognition task.
                    </p>
                    <p>
                        The AI looks for cues like:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                        <li><span className="font-semibold">Skin Health:</span> Signs of dehydration, dullness, or uneven tone.</li>
                        <li><span className="font-semibold">Fatigue Indicators:</span> The appearance of dark circles or puffiness under the eyes.</li>
                        <li><span className="font-semibold">Facial Tension:</span> Subtle cues that may relate to stress.</li>
                    </ul>
                    <p>
                        We leverage concepts from computer vision libraries like <a href="https://mediapipe.dev/" target="_blank" rel="noopener noreferrer" className={linkClass}>MediaPipe</a> to identify facial landmarks and analyze regions of interest.
                    </p>
                </InfoSection>

                <InfoSection title="📝 Step 2: The Lifestyle Analysis">
                    <p>
                        Your answers to the lifestyle quiz provide crucial context. The AI cross-references your visual data with your habits. For example, if the AI sees signs of fatigue and you report sleeping only 5 hours a night, it strengthens the confidence of a sleep-related finding.
                    </p>
                </InfoSection>
                
                <InfoSection title="🔮 Step 3: The Gemini Engine">
                    <p>
                        This is where it all comes together. We send the combined data—visual analysis summaries and quiz answers—to Google's powerful Gemini AI model. 
                    </p>
                    <p>
                        We use a technique called **multimodal prompting**, providing both text and images to the AI. We give it a specific "persona" (a wellness expert) and instruct it to synthesize the information and generate your scores, key findings, and recommendations in a structured JSON format. This ensures the output is consistent, relevant, and actionable.
                    </p>
                    <p>
                        You can learn more about the technology at the official <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className={linkClass}>Google Gemini page</a>.
                    </p>
                </InfoSection>

                <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6 text-center">
                    <HeartIcon className="w-8 h-8 text-rose-500 mx-auto mb-2"/>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">Our Scoring Philosophy</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                        Our scores are not medical metrics. They are guides to help you build awareness and make mindful choices. NutriAura AI is a tool for wellness exploration, not a substitute for professional medical advice.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AlgorithmInfoScreen;
