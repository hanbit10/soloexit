import { GoogleGenAI } from "@google/genai";
import fs from "fs";
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeImage = async (filePath: string) => {
  try {
    const base64ImageFile = fs.readFileSync(filePath, {
      encoding: "base64",
    });

    const config = {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          calories: {
            type: "number",
          },
        },
      },
    };

    const interaction = await client.interactions.create({
      model: "gemini-3.5-flash",
      input: [
        { type: "text", text: "Extract the food name and estimated calories from the image and return the results in JSON format." },
        {
          type: "image",
          data: base64ImageFile,
          mime_type: "image/jpeg",
        },
      ],
    });

    return JSON.parse(interaction.output_text);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
