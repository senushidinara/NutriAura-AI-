# NutriAura AI 🌿 &mdash; Your Body’s Intelligent Wellness Mirror

**Tagline:** _Your inner health, revealed. Glow from within._ ✨

Welcome to **NutriAura AI**, a next-generation wellness platform where advanced AI meets engaging gamification. We transform your health journey into a fun, interactive RPG by analyzing your face and lifestyle to provide personalized, actionable guidance that is grounded in the real world.

Our AI doesn't just track metrics; it tracks your inner balance, nourishment, and glow. It's your pocket nutritionist, wellness coach, and personal cheerleader, all in one.

---

### **Table of Contents**
*   [🏗️ Application Architecture](#️-application-architecture)
*   [🚀 Your 60-Second Jumpstart: The NutriAura Protocol](#-your-60-second-jumpstart-the-nutriaura-protocol)
*   [🧠 The NutriAura AI Core: Beyond the Algorithm](#-the-nutriaura-ai-core-beyond-the-algorithm)
*   [🎮 Your Wellness Quest: More Than an App, It's Your Life RPG](#-your-wellness-quest-more-than-an-app-its-your-life-rpg)
*   [💖 Core Features: A Deep Dive into Your Hubs](#-core-features-a-deep-dive-into-your-hubs)
*   [🎨 A High-Fidelity Experience: The Art of Interaction](#-a-high-fidelity-experience-the-art-of-interaction)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [⚙️ Local Development & Setup](#️-local-development--setup)
*   [🌱 Our Philosophy](#-our-philosophy)

---

### 🏗️ Application Architecture

This diagram illustrates the flow of data and interactions within the NutriAura AI application, from user input to AI analysis and data persistence.

```ascii
      +-----------------------------------------------------------------------------------------+
      |  🌐                                NutriAura AI Architecture                          🌐  |
      +-----------------------------------------------------------------------------------------+

              🧑‍💻 User
                 |
     (Interactions & Permissions)
                 |
   +-------------V------------------------------------------------------------------------------+
   |   🖥️                                     FRONTEND (React)                                  |
   |                                                                                              |
   |  +---------------------------+       +-------------------------+       +------------------+  |
   |  |   App.tsx (State Logic)   |<----->|     UI Components       |------>|  Browser APIs    |  |
   |  +---------------------------+       | - 📸 CameraCapture      |       | - Camera         |  |
   |              ^                       | - 🎤 LifestyleQuiz      |       | - Geolocation    |  |
   |              |                       | - 📊 ResultsScreen      |       | - Microphone     |  |
   |    (State Updates & Data)            | - 👾 Chaos Mode UI      |       +------------------+  |
   |              |                       +-------------------------+                           |
   |   +----------V------------------+                                                          |
   |   |   LocalStorage Services     |                                                          |
   |   | - wellnessService.ts        |                                                          |
   |   | - forumService.ts           |                                                          |
   |   +----------V------------------+                                                          |
   |              |                                                                              |
   |   (Read/Write Data to Disk)                                                                  |
   |              |                                                                              |
   |   +----------V------------------+                                                          |
   |   |   💾 Local Storage          |                                                          |
   |   | - Wellness History, Goals   |                                                          |
   |   | - Profile, AP, Badges       |                                                          |
   |   | - Theme, Forum Posts        |                                                          |
   |   +-----------------------------+                                                          |
   |                                                                                              |
   +--------------------------------|-------------------------------------------------------------+
                                    |
            (Image + Quiz Answers +📍Location)
                                    |
   +--------------------------------V-------------------------------------------------------------+
   |   🧠                            EXTERNAL: Google Gemini API                             🧠  |
   |                                                                                              |
   |  +---------------------------------------------------------------------------------------+  |
   |  |                             geminiService.ts (API Handler)                            |  |
   |  | - Constructs multimodal prompt (image + text)                                         |  |
   |  | - Configures tools for Google Search & Maps grounding                                 |  |
   |  | - Sends secure request to the Gemini model endpoint                                   |  |
   |  +-----------------------------------------V---------------------------------------------+  |
   |                                            |                                                |
   |                               (Secure API Request)                                           |
   |                                            |                                                |
   |  +-----------------------------------------V---------------------------------------------+  |
   |  |                                Google Cloud Services                                  |  |
   |  |                                                                                       |  |
   |  |     [ Gemini 2.5 Flash Model ] <-----> [ Google Search ] <-----> [ Google Maps ]       |  |
   |  |     (AI Analysis & Reasoning)        (Real-time Web Data)     (Hyper-local Places)     |  |
   |  +-----------------------------------------V---------------------------------------------+  |
   |                                            |                                                |
   |                      (JSON Response with Grounding Attribution)                             |
   |                                            |                                                |
   |                                            +------------------------------------------------+
   |                                                                                              |
   +----------------------------------------------------------------------------------------------+
```

<details>
<summary><h3>🚀 Your 60-Second Jumpstart: The NutriAura Protocol</h3></summary>

Getting started is simple, fast, and insightful. A new visual **Stepper** guides you through the entire process, so you always know where you are in your journey.

1.  **📸 AI Face Scan (`CameraCapture.tsx`)**
    *   **Dual Input:** Choose between taking a live selfie with the **"Activate Camera"** option or uploading an existing photo using **"Upload Image File"**.
    *   **Confirmation Step:** After capturing or uploading, you get a clear preview of your image to confirm before proceeding, ensuring the highest quality input for the AI.

2.  **📝 Lifestyle Quiz (`LifestyleQuiz.tsx`)**
    *   **Interactive Sliders:** Visually engaging sliders for sleep, stress, and energy levels provide a tactile feel, show a live progress fill, and trigger **haptic feedback** on supported devices for a more responsive experience.
    *   **Visual Radio Cards:** For diet and activity levels, select from beautiful, icon-driven cards that provide clear visual feedback with a checkmark upon selection.
    *   **🗣️ Futuristic Voice Commands:** For a truly hands-free experience, activate the microphone and answer questions with your voice! The app's speech recognition can process commands like _"Set diet to balanced"_ or _"High-output activity,"_ making data entry fast, accessible, and fun.

3.  **🔮 AI Analysis (`AnalysisScreen.tsx`)**
    *   **Animated Progress:** While our AI works, an animated screen with reassuring (or chaotic!) messages keeps you engaged.
    *   **Powered by Gemini:** The analysis is performed by Google's powerful Gemini AI, which synthesizes all your data into a coherent wellness profile.

4.  **📜 Personalized Results (`ResultsScreen.tsx`)**
    *   Receive your detailed wellness report, including scores, key findings, and a personalized action plan.

</details>

<details>
<summary><h3>🧠 The NutriAura AI Core: Beyond the Algorithm</h3></summary>

We believe in AI that is not only smart but also transparent and connected to the real world. Our engine is built on three pillars: advanced analysis, real-world context, and user transparency.

*   **🤖 Google Gemini Power (`geminiService.ts`)**
    *   The core of our platform uses the `gemini-2.5-flash` model for its advanced **multimodal analysis** capabilities. This means it doesn't just look at your photo and then read your answers separately; it processes both your image and your text-based quiz data *simultaneously* to find deeper, more meaningful correlations between your physical appearance and your lifestyle habits.

*   **🌍 Grounded in Your World: The Hyper-Local Advantage**
    *   This is where NutriAura AI transcends typical wellness apps. Our AI isn't just smart; it's street-smart. By grounding its analysis with **Google Search** and **Google Maps**, we transform generic advice into a hyper-personalized, real-world action plan.
    *   **📍 Hyper-Local Intelligence:** With your permission, the app uses your **geolocation** to provide relevant, actionable suggestions rooted in your immediate environment.
        *   **Feeling Stressed?** Instead of just saying "go for a walk," the AI might suggest a visit to the nearby 'Serenity Park,' which has a 4.8-star rating on Maps for its quiet atmosphere.
        *   **Nutrition Score Low?** It can recommend 'GreenLeaf Organics,' a top-rated health food store just two blocks away, or even suggest specific healthy dishes from local restaurants.
        *   **Need to Recharge?** It could point out a local yoga studio with upcoming beginner classes that fit a low-stress profile.
    *   **🌐 Real-Time, Verified Information:** By leveraging Google Search, the AI's "Deep Dive" explanations are backed by current, scientifically relevant information, moving beyond the static knowledge of a traditional model.
    *   **🔗 Total Transparency:** To ensure you can trust our recommendations, the results screen includes a **"Data Sources"** section with direct links to the web pages and map locations the AI used. You can verify information, check reviews, and explore topics further with a single tap.

*   **📖 "How Our AI Works" Screen (`AlgorithmInfoScreen.tsx`)**
    *   Accessible from your Profile, this dedicated screen breaks down our technology in simple terms.
    *   Learn about our **computer vision concepts**, **multimodal prompting techniques**, and our core **scoring philosophy**. We include links to external resources like Google's Gemini page to foster openness and trust.

</details>

<details>
<summary><h3>🎮 Your Wellness Quest: More Than an App, It's Your Life RPG</h3></summary>

The path to better health should be fun! NutriAura is designed as a game where **YOU** are the main character. It's not just a health app; it's a life RPG.

*   **🚀 Level Up Your Life: Progression System (`wellnessService.ts`)**
    *   **Wellness Level (1-100):** A direct reflection of your commitment. Watch your level grow as you invest in your well-being.
    *   **Aura Points (AP):** Earn AP by completing your analysis, finishing missions, and engaging with the app. Your AP helps you level up!

*   **📜 Your Daily Grind: Wellness Missions (`QuestsScreen.tsx`)**
    *   Visit the **Mission Log** for new challenges that keep you motivated.
    *   **Daily Missions:** Small, achievable tasks like "Hydration Synthesis" (drink 8 units of H2O).
    *   **Weekly Missions:** Tackle bigger goals like "Sleep Cycle Optimization" for a huge AP reward.
    *   **Animated Feedback:** When you complete a mission, the UI provides a satisfying animation, celebrating your achievement.

*   **🏆 Show Off Your Skills: Profile & Achievements (`ProfileScreen.tsx`)**
    *   Your **Profile Screen** is your character sheet. Track your Level and AP with a visual progress bar.
    *   View your **Achievement Gallery**, where you can showcase earned badges for milestones like completing your first analysis or reaching Level 5.

*   **🥇 Climb the Ranks: The Leaderboard (`ForumScreen.tsx`)**
    *   Think you're a top wellness agent? Head to the Community Hub and switch to the Leaderboard tab. Compete with other users to claim the top spot, ranked by total Aura Points.

</details>

<details>
<summary><h3>💖 Core Features: A Deep Dive into Your Hubs</h3></summary>

#### **The Results Screen (`ResultsScreen.tsx`)**
Your personalized wellness dashboard.
*   **Visual Score Rings:** See your scores for Nutrition, Sleep, Stress, and Hydration in beautiful, animated rings that fill up to reveal your rating.
*   **Key Findings & Personalized Plan:** Get clear, actionable insights and a step-by-step plan to improve your well-being.
*   **📖 Collapsible Deep Dives:** Get more context with "Deep Dive" sections that provide scientific backing for findings and recommendations without cluttering the UI.
*   **🎯 Goal Setting:** Set meaningful goals based on your analysis. The app suggests goals for your lowest-scoring areas, or you can add your own custom ones.
*   **💌 Shareable "Directive" Goals:** Share your commitment with friends using a fun, stylized "Directive" modal—a creative way to stay accountable!

#### **The Community Hub (`ForumScreen.tsx`)**
You're not on this journey alone.
*   **💬 Community Feed:** Share your progress, ask questions, and support others in the "Data Stream".
*   **🤝 Community Directives (Challenges):** Join weekly wellness challenges like the "7-Day Hydration Protocol." Click any challenge to see a detailed modal with its goals, duration, and instructions.
*   **🎯 AI-Recommended Directives:** The Hub intelligently suggests a Community Challenge based on your lowest score from your latest analysis, helping you focus where it matters most.

#### **The Progress Screen (`ProgressScreen.tsx`)**
*   **📈 Track Your Journey Over Time:** This screen features beautiful, custom-built, animated line charts that visualize your wellness scores from every analysis you've completed. Watch your trends for Nutrition, Sleep, Stress, and Hydration improve over time!

</details>

<details>
<summary><h3>🎨 A High-Fidelity Experience: The Art of Interaction</h3></summary>

*   **🎨 Dynamic Theming & UI**
    *   **Four Beautiful Themes:** Personalize your experience from your Profile by choosing from four distinct themes: Lavender Dream, Minty Fresh, Peach Sunset, and the default Living Aurora.
    *   **✨ Living Aurora Background:** The "Living Aurora" dark theme features a mesmerizing, animated background with gently drifting lights and holographic card borders that pulse and glow on interaction.
    *   **Glassmorphism Header:** A sleek, "frosted glass" navigation bar floats elegantly above the content.
    *   **Fluid Transitions:** Screens slide in gracefully, making navigation feel smooth and polished.
    
*   **🔥 Chaos Mode: Unleash the Fun!**
    *   Click the **🔥 icon** to activate a hidden, playful mode!
    *   The UI transforms with glitch effects, glowing text, and different icons.
    *   The AI's personality becomes delightfully unhinged, providing absurdly funny analysis and recommendations (like our "Cosmic Pizza Alignment" theory). It's a perfect dose of fun for your wellness journey.

*   **Futuristic & Intuitive UI**
    *   **Visual Stepper:** A clear, 3-step visual guide at the top of the analysis process so you always know your progress.
    *   **Animated Charts:** The progress screen doesn't just show data; it brings it to life with custom-built SVG line charts that animate into view.
    *   **🗣️ Voice Input:** The quiz supports voice commands, making it accessible and adding to the high-tech feel.
    *   **Contextual Navigation:** A persistent top navigation bar allows quick access to all major hubs, and a contextual "Back" button ensures you never lose your place in a flow.

</details>

<details>
<summary><h3>🛠️ Tech Stack</h3></summary>

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **AI Model:** Google Gemini AI (`gemini-2.5-flash`)
*   **AI Features:** Multimodal Analysis, Google Search Grounding, Google Maps Grounding, Geolocation-Aware Recommendations
*   **Browser APIs:** `getUserMedia` (Camera), `Geolocation API`, `Web Speech API` (Microphone)
*   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
*   **Data Persistence:** Browser `localStorage` is used to simulate a backend, saving all user progress, goals, history, and preferences.

</details>

<details>
<summary><h3>⚙️ Local Development & Setup</h3></summary>

Want to run NutriAura AI on your own machine? Here's how:

1.  **Clone the Repository:**
    *   If you were working with a Git repository, you would clone it here. For this environment, you already have the files.

2.  **API Key Configuration:**
    *   This project requires a Google Gemini API key to function.
    *   The application is designed to use an environment variable named `API_KEY`. In a real-world scenario, you would need to ensure this variable is available in the environment where you serve the application.
    *   For testing purposes, you might temporarily replace `process.env.API_KEY` in `services/geminiService.ts` with your key. **Remember to never commit your API key to version control!**

3.  **Launch a Local Server:**
    *   You need a simple HTTP server to run the `index.html` file and its modules correctly.
    *   If you have Python installed: `python -m http.server`
    *   If you have Node.js and `npm` installed: `npx serve`

4.  **Open in Browser:**
    *   Navigate to the local URL provided by your server (e.g., `http://localhost:8000`).
    *   Grant camera, microphone, and geolocation permissions when prompted by the browser to unlock all features.

</details>

<details>
<summary><h3>🌱 Our Philosophy</h3></summary>

Most apps track metrics. **NutriAura tracks balance.**

Our core innovation is blending **outer signals (face & skin)** with **inner patterns (mood & habits)**. This unique combination reveals what your body truly needs, providing insights that go beyond simple calorie or workout tracking. We help you listen to your body and nourish your inner glow.

**Disclaimer:** _NutriAura AI provides wellness suggestions and is not a substitute for professional medical advice, diagnosis, or treatment._

</details>
