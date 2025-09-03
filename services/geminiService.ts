
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAdvice = async (occasion: string, preferences: string): Promise<string> => {
    try {
        const prompt = `You are an expert Nigerian fashion stylist. A user needs advice for an upcoming event.
        Event/Occasion: "${occasion}"
        Style Preferences: "${preferences}"
        
        Provide three distinct and stylish Nigerian outfit suggestions. For each suggestion, include:
        1. A creative name for the style (e.g., "Regal Aso-Oke Agbada").
        2. The best type of fabric to use (e.g., Aso-Oke, Ankara, Lace, Brocade).
        3. A brief description of the outfit.
        4. Suggested accessories to complete the look.
        
        Format your response in well-structured Markdown.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error getting style advice:", error);
        return "Sorry, I couldn't come up with any ideas right now. Please try again later.";
    }
};

export const generateOutfitPrompt = async (
    fabricImageBase64: string,
    mimeType: string,
    occasion: string
): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                data: fabricImageBase64,
                mimeType,
            },
        };

        const textPart = {
            text: `Analyze the provided fabric image. The user wants to create an outfit for the following occasion: "${occasion}". 
            
            Based on the fabric's pattern, texture, and colors, create a detailed, vivid, and artistic prompt for an AI image generator. The prompt should describe a complete, stunning Nigerian outfit made from this fabric, suitable for the occasion. 
            
            Describe the model wearing the outfit, the specific style of the garment (e.g., a flowing boubou, a structured iro and buba), the setting, and the lighting to ensure a photorealistic, high-fashion image. The prompt must be a single, concise paragraph. Focus on creating a visually compelling description.`,
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Error generating outfit prompt:", error);
        throw new Error("Failed to generate a creative prompt from the fabric.");
    }
};

export const generateOutfitImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '3:4',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }

    } catch (error) {
        console.error("Error generating outfit image:", error);
        throw new Error("Failed to generate the outfit image.");
    }
};
