import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAIRecommendation = async (query: string): Promise<string> => {
  if (!apiKey) return "عذراً، خدمة الذكاء الاصطناعي غير متوفرة حالياً (API Key missing).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User is asking for game recommendations on a free-to-play game site called "El Ghalaba".
      Query: "${query}".
      
      Respond in Arabic. Be friendly, concise, and suggest 2-3 specific free games that match the query (even if they are not in the mock database). 
      Format the response as a helpful tip.`,
    });
    return response.text || "لم أتمكن من العثور على اقتراح مناسب، جرب البحث بكلمات أخرى.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ أثناء الاتصال بالمساعد الذكي.";
  }
};