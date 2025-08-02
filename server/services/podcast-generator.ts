import { generateAIResponse } from "./ai-models.js";
import { synthesizeSpeech } from "./openai-tts.js";
import type { AIModel } from "@shared/schema";

interface PodcastRequest {
  sourceText: string;
  instructions?: string;
  model: AIModel;
  podcastId: number;
}

export async function generatePodcast(request: PodcastRequest): Promise<{
  script: string;
  hasAudio: boolean;
  audioPath: string | null;
}> {
  const { sourceText, instructions, model, podcastId } = request;

  // Create podcast prompt
  const prompt = `You are an expert podcast host creating an engaging, conversational summary. 

Source material:
${sourceText}

${instructions ? `Special instructions: ${instructions}` : ''}

Create a podcast-style summary that:
- Uses a warm, conversational tone like you're talking to a friend
- Includes natural speech patterns and transitions
- Breaks down complex concepts into accessible language
- Tells a story rather than just listing facts
- Uses "you" to engage the listener directly
- Includes rhetorical questions and pauses for emphasis
- Keeps the energy up throughout

Format as a complete podcast script ready for text-to-speech synthesis. Do not include any formatting, headers, or technical instructions - just the spoken content.`;

  try {
    // Generate the podcast script using AI
    const script = await generateAIResponse(model, prompt, true);
    
    // Try to synthesize speech with OpenAI TTS
    let hasAudio = false;
    let audioPath: string | null = null;
    
    try {
      const audioResult = await synthesizeSpeech(script, podcastId);
      hasAudio = audioResult.hasAudio;
      audioPath = audioResult.audioPath;
    } catch (error) {
      console.log("Audio synthesis not available:", error);
      hasAudio = false;
      audioPath = null;
    }

    return {
      script,
      hasAudio,
      audioPath,
    };
  } catch (error) {
    console.error("Error generating podcast:", error);
    throw new Error("Failed to generate podcast script");
  }
}

export function cleanScriptForSpeech(script: string): string {
  // Remove markdown formatting for better speech synthesis
  return script
    .replace(/#{1,6}\s*/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove code backticks
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/^[-*+]\s+/gm, '') // Remove bullet points
    .replace(/^\d+\.\s+/gm, '') // Remove numbered lists
    .replace(/\n{3,}/g, '\n\n') // Reduce excessive line breaks
    .trim();
}

export function generatePreviewScript(fullScript: string, wordLimit: number = 200): string {
  const words = fullScript.split(/\s+/);
  if (words.length <= wordLimit) {
    return fullScript;
  }
  
  const preview = words.slice(0, wordLimit).join(' ');
  return `${preview}... [PREVIEW - Register and purchase credits to access the complete podcast script and audio]`;
}