import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeImage = async (filePath: string) => {
  try {
    const base64ImageFile = fs.readFileSync(filePath, {
      encoding: "base64",
    });

    // Use standard generateContent for stateless, low-latency execution
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          text: "Analyze this image and return the meal name and estimated calories.",
        },
        {
          inlineData: {
            data: base64ImageFile,
            mimeType: "image/jpeg",
          },
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            calories: { type: "NUMBER" },
          },
          required: ["name", "calories"],
        },
      },
    });

    // response.text handles text extraction safely
    if (!response.text) {
      throw new Error("No response text received from Gemini.");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};
