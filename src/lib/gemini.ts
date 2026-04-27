import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateProductDescription(details: string) {
  const prompt = `You are a professional marketing expert for Pakistani small businesses. 
  The user will provide raw details about a product. 
  Generate a professional, SEO-friendly product description.
  Include: 
  1. A catchy formal English version.
  2. A polite and persuasive Urdu version (using Urdu script).
  3. A "WhatsApp Ready" combined version (short and punchy).
  
  Product Details: "${details}"`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}

export async function generateCustomerReply(message: string) {
  const prompt = `You are a courteous and professional customer service representative for a premium Pakistani brand. 
  A customer has sent the following message (it might be in English, Urdu, or Roman Urdu). 
  Generate a professional, polite, and helpful reply in the same language/style as the customer's message.
  Make the business sound established and trustworthy.
  
  Customer Message: "${message}"`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}

export async function askMarketTrends(query: string) {
  const prompt = `You are a Pakistani market analyst. 
  Based on current local trends and business environment in Pakistan, provide a data-driven (simulated from your knowledge base) summary for the following query. 
  Focus on facts, seasonal trends, and consumer behavior in Pakistan.
  
  Query: "${query}"`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}

export async function getBusinessTip() {
  const prompt = "Provide one short, actionable business tip for a small business owner or home-based entrepreneur in Pakistan. It should be encouraging and practical (e.g., about social media, pricing, customer service, or logistics).";
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}
