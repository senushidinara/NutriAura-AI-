
import { GoogleGenAI, Type } from "@google/genai";
import type { QuizAnswers, AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    scores: {
      type: Type.OBJECT,
      properties: {
        nutrition: { type: Type.NUMBER, description: "Score from 0-100 for nutrition" },
        sleep: { type: Type.NUMBER, description: "Score from 0-100 for sleep quality" },
        stress: { type: Type.NUMBER, description: "Score from 0-100 for stress management (lower is better)" },
        hydration: { type: Type.NUMBER, description: "Score from 0-100 for hydration level" },
      },
      required: ["nutrition", "sleep", "stress", "hydration"]
    },
    keyFindings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A short, catchy title for the finding." },
          description: { type: Type.STRING, description: "A brief, one-sentence explanation of the finding." },
          icon: { 
            type: Type.STRING, 
            description: "The relevant icon name: 'nutrition', 'sleep', 'stress', or 'hydration'",
            enum: ['nutrition', 'sleep', 'stress', 'hydration']
          },
        },
        required: ["title", "description", "icon"]
      }
    },
    recommendations: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "Category of recommendation (e.g., 'Nutrient-Rich Foods', 'Evening Wind-Down Routine')." },
                description: { type: Type.STRING, description: "Brief explanation of why this recommendation is important." },
                items: {
                    type: Type.ARRAY,
                    description: "List of 3-5 specific, actionable recommendation points.",
                    items: { type: Type.STRING }
                }
            },
            required: ["title", "description", "items"]
        }
    }
  },
  required: ["scores", "keyFindings", "recommendations"]
};


function imageToBase64(imageDataUrl: string): { mimeType: string; data: string } {
    const parts = imageDataUrl.split(',');
    const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const data = parts[1];
    return { mimeType, data };
}

export const getWellnessAnalysis = async (
  imageDataUrl: string,
  answers: QuizAnswers
): Promise<AnalysisResult> => {
  const { mimeType, data: imageBase64 } = imageToBase64(imageDataUrl);

  const prompt = `
    You are NutriAura AI, a world-class wellness and nutrition expert. Your goal is to provide a holistic wellness analysis based on a user's selfie and their lifestyle quiz answers.
    Do not diagnose diseases. Focus on potential imbalances, deficiencies, and wellness patterns related to nutrition, sleep, stress, and hydration.
    Analyze the provided selfie for visual cues (skin tone, under-eye circles, skin texture, signs of fatigue) and cross-reference them with the user's self-reported lifestyle habits.
    
    User's Selfie: [image attached]
    
    User's Lifestyle Quiz Answers:
    - Average sleep per night: ${answers.sleepHours} hours
    - Current stress level (1-5): ${answers.stressLevel}
    - Current energy level (1-5): ${answers.energyLevel}
    - Typical diet quality: ${answers.dietQuality}
    - Daily hydration: ${answers.hydration}
    - Weekly activity level: ${answers.activityLevel}

    Based on all this information, generate a comprehensive wellness analysis.
    The scores should be your best estimation based on the combined data. For the stress score, a higher user-reported stress level should result in a lower wellness score (e.g. stress level 5 -> score around 20-30).
    Provide key findings and actionable recommendations. Your tone should be calming, supportive, and scientifically confident.
    
    Generate the response strictly in the provided JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data: imageBase64 } },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please try again.");
  }
};
