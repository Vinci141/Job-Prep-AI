
import { GoogleGenAI, Type } from "@google/genai";
import { PrepPlan } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const prepPlanSchema = {
  type: Type.OBJECT,
  properties: {
    jobRole: { type: Type.STRING, description: "The job role provided by the user." },
    keySkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 5-7 essential technical and soft skills for this role."
    },
    technicalQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING, description: "A concise, expert-level answer to the question." }
        },
        required: ["question", "answer"]
      },
      description: "A list of 3-5 common technical interview questions with sample answers."
    },
    behavioralQuestions: {
       type: Type.ARRAY,
       items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING, description: "A concise, expert-level answer using a framework like STAR." }
        },
        required: ["question", "answer"]
      },
      description: "A list of 3-5 common behavioral interview questions with sample answers."
    },
    learningResources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          url: { type: Type.STRING, description: "A valid URL." },
          description: { type: Type.STRING }
        },
        required: ["title", "url", "description"]
      },
      description: "A curated list of 3-5 online resources for learning and practice."
    }
  },
  required: ["jobRole", "keySkills", "technicalQuestions", "behavioralQuestions", "learningResources"]
};


export const generatePrepPlan = async (jobRole: string): Promise<PrepPlan> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a comprehensive job preparation plan for the role of: ${jobRole}. Focus on the most critical areas for a candidate to succeed.`,
      config: {
        systemInstruction: "You are an expert career coach and senior technical recruiter, creating a concise and actionable job prep plan. Your response must be a valid JSON object matching the provided schema.",
        responseMimeType: "application/json",
        responseSchema: prepPlanSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    return parsedData as PrepPlan;
  } catch (error) {
    console.error("Error generating prep plan:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate prep plan: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the prep plan.");
  }
};
