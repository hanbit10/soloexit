import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeImage = async (filePath: string) => {
  try {
    const base64ImageFile = fs.readFileSync(filePath, {
      encoding: "base64",
    });

    const payload = {
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
    };

    let response;

    try {
      // Option A: Shift your primary model to Flash-Lite for high-throughput stability
      response = await client.models.generateContent({
        model: "gemini-3.1-flash-lite",
        ...payload,
      });
    } catch (primaryError: any) {
      if (primaryError?.status === 503 || primaryError?.status === 429) {
        console.warn("Primary Lite model busy. Dropping down to 2.5 Lite...");

        // Option B: Secondary safety valve
        response = await client.models.generateContent({
          model: "gemini-2.5-flash-lite",
          ...payload,
        });
      } else {
        throw primaryError;
      }
    }

    if (!response.text) {
      throw new Error("No response text received from Gemini.");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};
