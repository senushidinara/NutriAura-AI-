
# NutriAura AI 🌿 &mdash; Your Body’s Intelligent Wellness Mirror

**Tagline:** _See your wellness. Glow from within._ ✨

NutriAura AI is a next-generation personal wellness intelligence platform that transforms your health journey into an engaging, gamified RPG. By analyzing a selfie and your lifestyle habits, our AI generates personalized insights and a clear path to improve your nutrition, sleep, mood, and overall well-being.

It feels like having a pocket nutritionist, a wellness coach, and a fun game all in one!

---

## ✨ Core Features

-   **🧬 AI-Powered Analysis:** Get a holistic wellness report using just a selfie and a quick quiz.
-   **🚀 Gamified Progression:** Level up, earn Aura Points (AP), and unlock badges as you improve.
-   **📜 Daily & Weekly Quests:** Stay motivated with fun, rewarding wellness challenges.
-   **🏆 Achievements & Badges:** Showcase your milestones in your personal profile gallery.
-   **🤝 Community Hub:** Connect with others, share tips, and join a supportive community.
-   **🎯 Personalized Goal Setting:** Set and track meaningful health goals, with fun sharing options.
-   **📈 Progress Tracking:** Visualize your wellness trends over time with beautiful charts.
-   **🌗 Dark & Light Modes:** A stunning, modern UI that's easy on the eyes, day or night.
-   **🤪 Chaos Mode:** A hidden, playful mode that turns your wellness journey upside down!

---

## 🎮 The NutriAura Experience: A Gamified Wellness RPG

We believe the path to wellness should be rewarding and fun. That's why NutriAura AI is designed as a game where **YOU** are the main character.

### The Main Quest: Your Wellness Analysis 🧬

This is the core of your adventure. The quest is simple but powerful:

1.  **📸 The Selfie Scan:** Begin by taking a selfie or uploading a photo. Our AI analyzes visual cues for wellness indicators.
2.  **📝 The Lifestyle Quiz:** Answer a few quick questions about your recent sleep, stress, and diet habits.
3.  **🔮 The AI Oracle:** Our Google Gemini-powered engine processes the data, analyzing your **Nutrition, Sleep, Stress, and Hydration**.
4.  **📜 The Scroll of Wisdom:** Receive your results! This includes:
    *   **Wellness Scores:** Four key stats (0-100) for each analysis area.
    *   **Key Findings:** AI-driven insights into what your body is telling you.
    *   **Personalized Plan:** Actionable recommendations to improve your well-being.

### Level Up Your Life: Progression System 🚀

Every action you take helps you grow stronger.

-   **Wellness Level:** Start at Level 1 and climb your way to Level 100. Your level is a direct reflection of your commitment to your wellness journey.
-   **Aura Points (AP):** The experience points of NutriAura. Earn AP by:
    *   Completing an AI Analysis (+100 AP)
    *   Finishing Daily & Weekly Quests

### Your Daily Grind: Wellness Quests 📜

Visit the **Quests Screen** to find new challenges that keep you engaged and earning rewards.

-   **Daily Quests:** Small, achievable tasks like "Hydration Heist" (drink 8 glasses of water) or "Mindful Moment" (meditate for 5 mins).
-   **Weekly Bosses:** Tackle bigger challenges like "Sleep Saboteur" (get consistent sleep) for a huge AP reward.

### Show Off Your Skills: Achievements & Badges 🏆

Your hard work deserves recognition! The **Profile Screen** features an achievement gallery where you can view your earned badges.

-   **Wellness Pioneer:** Complete your first analysis.
-   **Level 5!:** Reach Wellness Level 5.
-   **Goal Getter:** Set 5 personal goals.

### Your Personal Command Center: The Profile Screen 👤

This is your character sheet. Here you can track:
-   Your current **Wellness Level**.
-   Your **Aura Points (AP)** and progress to the next level.
-   Your collection of earned **Badges**.

---

## 💖 Community & Personalization

You're not on this journey alone.

### The Community Hub 🤝

Navigate to the **Forum** to:
-   **Share Your Story:** Post updates on your progress or ask for advice.
-   **Learn from Others:** Read posts from fellow wellness adventurers.
-   **Discover Community Tips:** A curated section of quick, effective wellness hacks contributed by the community.

### Personalized Goal Setting & Sharing 🎯

On the **Results Screen**, you can:
-   **Set Goals:** Add AI-suggested goals or create your own custom ones.
-   **Track Completion:** Check off goals as you achieve them.
-   **Share Your "Wanted Poster":** Click the share icon next to a goal to generate a fun, stylized "Wanted Poster" of your health goal. It's perfect for sharing on social media to keep yourself accountable!

### Track Your Journey: The Progress Screen 📈

Visit the **Progress Screen** to see beautiful, animated line charts that visualize your historical scores for Nutrition, Sleep, and Stress. Watch your stats improve over time!

---

## 🤪 Unleash the Chaos: Chaos Mode!

Feeling mischievous? Click the **🔥 icon** in the header to activate **Chaos Mode**!

-   **A Wild New Look:** The UI transforms with a "Comic Sans" font, glowing text, jiggling buttons, and a random, vibrant color scheme.
-   **Absurd Advice:** The app's personality flips from a calm wellness coach to a chaotic meme lord. Expect nonsensical analysis steps and hilarious recommendations.
-   **The Pizza Principle:** Your analysis will include a critical new finding: a "Cosmic Pizza Alignment" deficiency, with actionable advice to eat more pizza.

**Disclaimer:** Chaos Mode is for entertainment purposes only. Please do not eat pizza for every meal... unless you really want to.

---

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI Model:** Google Gemini API (`gemini-2.5-flash`) for multimodal analysis.
-   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
-   **Data Persistence:** `localStorage` is used to simulate a backend, saving all user progress, goals, history, and preferences.

---

## 📂 File Structure Overview

-   `index.html`: The main entry point, sets up styles and initial scripts for dark/chaos mode.
-   `index.tsx`: Renders the main React application.
-   `App.tsx`: The core component that manages app state, navigation, and all primary logic.
-   `/components`: Contains all UI components, neatly organized by screen/function.
-   `/services`: Houses the logic for interacting with external APIs (`geminiService.ts`) and `localStorage` (`wellnessService.ts`, `forumService.ts`).
-   `types.ts`: Defines all shared TypeScript types and enums for robust, type-safe code.
