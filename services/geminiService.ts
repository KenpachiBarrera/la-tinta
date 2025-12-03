import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API Key missing");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const askInkHistorian = async (question: string): Promise<string> => {
    const client = getClient();
    if (!client) return "Error: API Key not configured.";

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
            config: {
                systemInstruction: "Eres un historiador experto en caligrafía, tintas y manuscritos antiguos. Responde de manera concisa, elegante y educativa en Español. Tu tono debe ser misterioso pero académico, acorde a la estética oscura y fluida de un sitio web sobre tintas.",
            }
        });
        return response.text || "No se pudo recuperar la información histórica en este momento.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Hubo un error al consultar los archivos históricos.";
    }
};