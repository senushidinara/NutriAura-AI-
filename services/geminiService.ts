import { GoogleGenAI } from "@google/genai";
import type { QuizAnswers, AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Schema description for the prompt, to guide the model's JSON output
const analysisSchemaDescription = `
{
  "scores": {
    "nutrition": number,
    "sleep": number,
    "stress": number,
    "hydration": number
  },
  "keyFindings": [
    {
      "title": "string",
      "description": "string",
      "icon": "nutrition" | "sleep" | "stress" | "hydration"
    }
  ],
  "recommendations": [
    {
      "title": "string",
      "description": "string",
      "items": ["string"]
    }
  ]
}
`;

function imageToBase64(imageDataUrl: string): { mimeType: string; data: string } {
    const parts = imageDataUrl.split(',');
    const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const data = parts[1];
    return { mimeType, data };
}

export const getWellnessAnalysis = async (
  imageDataUrl: string,
  answers: QuizAnswers,
  location: { latitude: number; longitude: number } | null
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
    
    ${location ? `The user's current approximate location is latitude ${location.latitude}, longitude ${location.longitude}.` : ''}

    Based on all this information, generate a comprehensive wellness analysis. The scores should be your best estimation based on the combined data. For the stress score, a higher user-reported stress level should result in a lower wellness score (e.g. stress level 5 -> score around 20-30).
    Provide key findings and actionable recommendations. Your tone should be calming, supportive, and scientifically confident.
    
    For recommendations, leverage Google Search and Google Maps to provide up-to-date, relevant, and localized suggestions. For example, recommend specific healthy restaurants or grocery stores near the user, or suggest nearby parks or wellness centers for stress relief.

    Your entire response MUST be a single JSON object enclosed in a markdown code block (\`\`\`json ... \`\`\`). The JSON object must conform to this schema:
    ${analysisSchemaDescription}
  `;

  const modelConfig: any = {
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data: imageBase64 } },
          { text: prompt },
        ],
      },
      config: {
        tools: [{googleSearch: {}}, {googleMaps: {}}],
      },
  };

  if (location) {
    modelConfig.config.toolConfig = {
        retrievalConfig: {
            latLng: {
                latitude: location.latitude,
                longitude: location.longitude,
            }
        }
    };
  }

  try {
    const response = await ai.models.generateContent(modelConfig);

    const rawText = response.text.trim();
    // Regex to extract JSON from ```json ... ``` block
    const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
    
    if (!jsonMatch || !jsonMatch[1]) {
      console.error("Could not find valid JSON in AI response:", rawText);
      throw new Error("The AI returned an unexpected response format. Please try again.");
    }

    const analysis = JSON.parse(jsonMatch[1]) as AnalysisResult;
    
    // Attach grounding metadata to the result for attribution
    analysis.groundingAttribution = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return analysis;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from the AI. The service may be temporarily unavailable.");
  }
};