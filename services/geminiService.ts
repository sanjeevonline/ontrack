
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis } from "../types";

// Safety: This assumes process.env.API_KEY is available as per instructions
const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function analyzeLeadResponse(leadMessage: string, context: any): Promise<AIAnalysis> {
  const model = 'gemini-3-flash-preview';

  const systemInstruction = `You are a friendly, warm real estate AI assistant for Ontrack Realty. 
    Your goal is to follow up with leads and qualify them for human agents. 
    You should NOT sound like an annoying bot. Use a helpful, conversational tone.
    Context:
    - Lead Zip Code: ${context.zipCodes?.join(', ')}
    - Budget: ${context.budget}
    - Property Type: ${context.propertyType}
    - Previous Conversation: ${JSON.stringify(context.history)}
    
    Return a structured JSON analysis of the lead's message.`;

  try {
    const response = await genAI.models.generateContent({
      model,
      contents: leadMessage,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            response: { type: Type.STRING, description: "Your friendly follow-up message to the lead" },
            urgency: { type: Type.STRING, enum: ["high", "medium", "low"], description: "The urgency level based on lead's message" },
            escalate: { type: Type.BOOLEAN, description: "Whether to hand off to a human agent immediately" },
            intent: { type: Type.STRING, description: "Summarized intent of the lead (e.g. 'Scheduling viewing', 'Pricing inquiry')" },
            qualityScore: { type: Type.NUMBER, description: "Lead quality score from 1-5" }
          },
          required: ["response", "urgency", "escalate", "intent", "qualityScore"]
        }
      }
    });

    return JSON.parse(response.text.trim()) as AIAnalysis;
  } catch (error) {
    console.error("Gemini API error, using fallback logic:", error);
    return getFallbackResponse(leadMessage, context);
  }
}

export async function generateSocialContent(details: any): Promise<{ caption: string; hashtags: string[] }> {
  const model = 'gemini-3-flash-preview';
  const systemInstruction = `You are a creative social media manager for Ontrack Realty. 
    Generate a high-engagement caption for a real estate post based on the property details provided.
    The tone should be ${details.tone || 'Excited and Professional'}.
    Include emojis. Return JSON.`;

  const prompt = `Property: ${details.address}, Price: ${details.price}, Features: ${details.features}, Platform: ${details.platform}`;

  try {
    const response = await genAI.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["caption", "hashtags"]
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini error in social generation:", error);
    return {
      caption: `🏡 Just Listed at Ontrack Realty! Check out this beautiful property at ${details.address}. Offered at ${details.price}. It features ${details.features}. Contact us today to see it!`,
      hashtags: ["#OntrackRealty", "#RealEstate", "#JustListed", "#DreamHome"]
    };
  }
}

function getFallbackResponse(message: string, context: any): AIAnalysis {
  const msg = message.toLowerCase();
  
  if (msg.includes("see") || msg.includes("schedule") || msg.includes("visit") || msg.includes("appointment")) {
    return {
      response: `I'd love to set that up! Our agent specializing in ${context.zipCodes?.[0]} will reach out shortly to find a time that works best for you. Does tomorrow morning work?`,
      urgency: "high",
      escalate: true,
      intent: "Scheduling Viewing",
      qualityScore: 5
    };
  }

  if (msg.includes("price") || msg.includes("budget") || msg.includes("how much")) {
    return {
      response: `Properties in ${context.zipCodes?.[0]} within your range (${context.budget}) are quite popular right now. I can send over a few similar listings to your email. Would you like that?`,
      urgency: "medium",
      escalate: false,
      intent: "Price Inquiry",
      qualityScore: 3
    };
  }

  return {
    response: "Thanks for getting back to me! I'm here to help with any questions you have about the local market. What else can I help you with today?",
    urgency: "low",
    escalate: false,
    intent: "General Inquiry",
    qualityScore: 2
  };
}
