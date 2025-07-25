import { generateAIResponse } from "./ai-models";
import { createAzureSpeechService } from "./azure-speech";
import type { AIModel } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";

export interface PodcastOptions {
  sourceText: string;
  instructions?: string;
  model: AIModel;
}

export interface PodcastResult {
  script: string;
  audioBuffer?: Buffer;
}

export class PodcastGenerator {
  private azureSpeech = createAzureSpeechService();

  async generatePodcastScript(options: PodcastOptions): Promise<string> {
    const { sourceText, instructions, model } = options;
    
    // Limit source text to first 2000-5000 words
    const words = sourceText.split(/\s+/);
    const limitedText = words.slice(0, Math.min(5000, words.length)).join(' ');
    
    const defaultInstructions = `Create a podcast-style summary of the following text. Follow this exact structure:

1. **Brief Summary**: Provide a concise overview of the main points and themes
2. **Analysis**: Discuss the strengths and weaknesses of the text
3. **Reader Benefits**: Explain what readers might gain from this text and what they may find challenging
4. **Representative Quotations**: Select and present 5 high-quality, meaningful quotations from the text

Write in a conversational, engaging podcast style suitable for audio narration. Use clear transitions between sections. Keep the total length appropriate for a 5-10 minute podcast.`;

    const customInstructions = instructions || defaultInstructions;
    
    const prompt = `${customInstructions}

TEXT TO ANALYZE:
${limitedText}

Generate the podcast script now:`;

    try {
      const script = await generateAIResponse(model, prompt, true);
      return this.cleanScriptForSpeech(script);
    } catch (error) {
      throw new Error(`Failed to generate podcast script: ${(error as Error).message}`);
    }
  }

  async generateAudio(script: string): Promise<Buffer | null> {
    if (!this.azureSpeech) {
      console.warn("Azure Speech service not available");
      return null;
    }

    try {
      return await this.azureSpeech.synthesizeToBuffer(script);
    } catch (error) {
      console.error("Failed to generate audio:", error);
      return null;
    }
  }

  async generateCompletePodcast(options: PodcastOptions): Promise<PodcastResult> {
    const script = await this.generatePodcastScript(options);
    const audioBuffer = await this.generateAudio(script);
    
    return {
      script,
      audioBuffer: audioBuffer || undefined,
    };
  }

  private cleanScriptForSpeech(script: string): string {
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

  generatePreviewScript(fullScript: string, wordLimit: number = 100): string {
    const words = fullScript.split(/\s+/);
    if (words.length <= wordLimit) {
      return fullScript;
    }
    
    const preview = words.slice(0, wordLimit).join(' ');
    return `${preview}... [PREVIEW - Register and purchase credits to access the complete podcast script and audio]`;
  }

  generatePreviewAudio(audioBuffer: Buffer, durationSeconds: number = 30): Buffer {
    // For simplicity, we'll just return the first part of the audio
    // In a more sophisticated implementation, you might use audio processing libraries
    // to extract exactly the first 30 seconds
    const previewSize = Math.floor(audioBuffer.length * (durationSeconds / 300)); // Assume ~5min total
    return audioBuffer.slice(0, previewSize);
  }
}

export const podcastGenerator = new PodcastGenerator();