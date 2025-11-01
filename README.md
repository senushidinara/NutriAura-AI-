# NutriAura AI 🌿 &mdash; Your Body’s Intelligent Wellness Mirror

**Tagline:** _Your inner health, revealed. Glow from within._ ✨

Welcome to **NutriAura AI**, a next-generation wellness platform where advanced AI meets engaging gamification. We transform your health journey into a fun, interactive RPG by analyzing your face and lifestyle to provide personalized, actionable guidance. 

Our AI doesn't just track metrics; it tracks your inner balance, nourishment, and glow. It's your pocket nutritionist, wellness coach, and personal cheerleader, all in one.

---

### **Table of Contents**
*   [🚀 Quick Start: Your 60-Second Wellness Check-In](#-quick-start-your-60-second-wellness-check-in)
*   [🧠 The AI Engine: Transparency & Trust](#-the-nutriaura-ai-engine-transparency--trust)
*   [🎮 Your Wellness RPG: Gamified Progression](#-your-wellness-rpg-gamified-progression)
*   [💖 Core Features: A Deep Dive into Your Hubs](#-core-features-a-deep-dive-into-your-hubs)
*   [🎨 Premium User Experience](#-premium-user-experience)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [🌱 Our Philosophy](#-our-philosophy)

---

<details>
<summary><h3>🚀 Quick Start: Your 60-Second Wellness Check-In</h3></summary>

Getting started is simple, fast, and insightful. A new visual **Stepper** guides you through the entire process, so you always know where you are in your journey.

1.  **📸 AI Face Scan (`CameraCapture.tsx`)**
    *   **Dual Input:** Choose between taking a live selfie with the **"Use Camera"** option or uploading an existing photo using **"Upload Photo"**.
    *   **Confirmation Step:** After capturing or uploading, you get a clear preview of your image to confirm before proceeding.

2.  **📝 Lifestyle Quiz (`LifestyleQuiz.tsx`)**
    *   **Interactive Sliders:** Visually engaging sliders for sleep, stress, and energy levels show a progress fill, making them intuitive to use.
    *   **Visual Radio Cards:** For diet and activity levels, select from beautiful, icon-driven cards that provide clear visual feedback with a checkmark upon selection.

3.  **🔮 AI Analysis (`AnalysisScreen.tsx`)**
    *   **Animated Progress:** While our AI works, an animated screen with reassuring (or chaotic!) messages keeps you engaged.
    *   **Powered by Gemini:** The analysis is performed by Google's powerful Gemini AI, which synthesizes all your data.

4.  **📜 Personalized Results (`ResultsScreen.tsx`)**
    *   Receive your detailed wellness report, including scores, key findings, and a personalized action plan.

</details>

<details>
<summary><h3>🧠 The NutriAura AI Engine: Transparency & Trust</h3></summary>

We believe in transparency. Our AI is powerful, and we want you to understand how it works.

*   **🤖 Google Gemini Power (`geminiService.ts`)**
    *   The core of our platform uses the `gemini-2.5-flash` model for its advanced **multimodal analysis** capabilities, processing both your image and your text-based quiz answers simultaneously.

*   **🌍 Grounded in Reality: Google Search & Maps**
    *   To provide the most accurate, up-to-date, and actionable advice, the AI uses **Google Search** and **Google Maps** grounding.
    *   **Geolocation-Aware:** With your permission, the app uses your location to provide hyper-relevant, localized recommendations like nearby healthy restaurants, parks for stress relief, or local wellness centers.
    *   **Source Attribution:** The results screen includes a **"Sources"** section with links to the web pages and map locations the AI used, so you can verify information and explore topics further.

*   **📖 "How Our AI Works" Screen (`AlgorithmInfoScreen.tsx`)**
    *   Accessible from your Profile, this dedicated screen breaks down our technology in simple terms.
    *   Learn about our **computer vision concepts**, **multimodal prompting techniques**, and our core **scoring philosophy**. We include links to external resources like Google's Gemini page to foster openness.

</details>

<details>
<summary><h3>🎮 Your Wellness RPG: Gamified Progression</h3></summary>

The path to better health should be fun! NutriAura is designed as a game where **YOU** are the main character.

*   **🚀 Level Up Your Life: Progression System**
    *   **Wellness Level (1-100):** A direct reflection of your commitment. Watch your level grow as you invest in your well-being.
    *   **Aura Points (AP):** Earn AP by completing your analysis, finishing quests, and engaging with the app. Your AP helps you level up!

*   **📜 Your Daily Grind: Wellness Quests (`QuestsScreen.tsx`)**
    *   Visit the **Quests Screen** for new challenges that keep you motivated.
    *   **Daily Quests:** Small, achievable tasks like "Hydration Heist" (drink 8 glasses of water).
    *   **Weekly Bosses:** Tackle bigger goals like "Sleep Saboteur" (fix your sleep schedule) for a huge AP reward.

*   **🏆 Show Off Your Skills: Profile & Achievements (`ProfileScreen.tsx`)**
    *   Your **Profile Screen** is your character sheet. Track your Level and AP with a visual progress bar.
    *   View your **Achievement Gallery**, where you can showcase earned badges for milestones like completing your first analysis or reaching Level 5.

</details>

<details>
<summary><h3>💖 Core Features: A Deep Dive into Your Hubs</h3></summary>

#### **The Results Screen (`ResultsScreen.tsx`)**
Your personalized wellness dashboard.
*   **Visual Score Rings:** See your scores for Nutrition, Sleep, Stress, and Hydration in beautiful, animated rings.
*   **Key Findings & Personalized Plan:** Get clear, actionable insights and a step-by-step plan to improve your well-being.
*   **Goal Setting:** Set meaningful goals based on your analysis. The app suggests goals for your lowest-scoring areas, or you can add your own custom ones.
*   **Shareable "Wanted Poster" Goals:** Share your commitment with friends using a fun, stylized "Wanted Poster" modal—a creative way to stay accountable!

#### **The Community Hub (`ForumScreen.tsx`)**
You're not on this journey alone.
*   **Community Feed:** Share your progress, ask questions, and support others.
*   **Community Challenges:** Join weekly wellness challenges like the "7-Day Hydration Challenge." Click any challenge to see a detailed modal with its goals, duration, and instructions.
*   **Leaderboard:** Feeling competitive? Check the leaderboard to see the top performers ranked by their total Aura Points!

#### **The Progress Screen (`ProgressScreen.tsx`)**
*   **Track Your Journey Over Time:** This screen features beautiful, custom-built, animated line charts that visualize your wellness scores from every analysis you've completed. Watch your trends for Nutrition, Sleep, and Stress improve over time!

</details>

<details>
<summary><h3>🎨 Premium User Experience</h3></summary>

*   **✨ Stunning UI & Animations**
    *   **Animated Gradient Background:** A gentle, calming gradient flows in the background, evoking the feeling of a shifting "aura."
    *   **Glassmorphism Header:** A sleek, "frosted glass" header floats elegantly above the content.
    *   **Interactive Card Glow:** Content cards have a subtle, interactive glow effect on hover, making the UI feel responsive and alive.
    *   **Shimmer Loading Skeletons:** Modern skeleton screens improve perceived performance while you wait for community content to load.
    *   **Fluid Transitions:** Screens slide in gracefully, making navigation feel smooth and polished.

*   **🌗 Beautiful Dark & Light Modes**
    *   A fully implemented, persistent dark mode that respects your system settings but can be toggled manually.

*   **🔥 Chaos Mode: Unleash the Fun!**
    *   Click the **🔥 icon** to activate a hidden, playful mode!
    *   The UI transforms with a "Comic Sans" font, glowing text, and jiggling buttons.
    *   The AI's personality becomes delightfully unhinged, providing absurdly funny analysis and recommendations (like our "Cosmic Pizza Alignment" theory). It's a perfect dose of fun for your wellness journey.

</details>

<details>
<summary><h3>🛠️ Tech Stack</h3></summary>

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **AI Model:** Google Gemini AI (`gemini-2.5-flash`)
*   **AI Features:** Multimodal Analysis, Google Search Grounding, Google Maps Grounding
*   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
*   **Data Persistence:** Browser `localStorage` is used to simulate a backend, saving all user progress, goals, history, and preferences.

</details>

<details>
<summary><h3>🌱 Our Philosophy</h3></summary>

Most apps track metrics. **NutriAura tracks balance.**

Our core innovation is blending **outer signals (face & skin)** with **inner patterns (mood & habits)**. This unique combination reveals what your body truly needs, providing insights that go beyond simple calorie or workout tracking. We help you listen to your body and nourish your inner glow.

**Disclaimer:** _NutriAura AI provides wellness suggestions and is not a substitute for professional medical advice, diagnosis, or treatment._

</details>
