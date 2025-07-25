import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import * as fs from "fs";
import * as path from "path";

export interface SpeechConfig {
  subscriptionKey: string;
  region: string;
}

export class AzureSpeechService {
  private speechConfig: sdk.SpeechConfig;

  constructor(config: SpeechConfig) {
    this.speechConfig = sdk.SpeechConfig.fromSubscription(config.subscriptionKey, config.region);
    this.speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    this.speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
  }

  async synthesizeToFile(text: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const audioConfig = sdk.AudioConfig.fromAudioFileOutput(outputPath);
      const synthesizer = new sdk.SpeechSynthesizer(this.speechConfig, audioConfig);

      synthesizer.speakTextAsync(
        text,
        result => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log(`Audio synthesis completed. Audio saved to ${outputPath}`);
            synthesizer.close();
            resolve(outputPath);
          } else {
            console.error(`Speech synthesis canceled: ${result.errorDetails}`);
            synthesizer.close();
            reject(new Error(result.errorDetails));
          }
        },
        error => {
          console.error(`Speech synthesis error: ${error}`);
          synthesizer.close();
          reject(error);
        }
      );
    });
  }

  async synthesizeToBuffer(text: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const synthesizer = new sdk.SpeechSynthesizer(this.speechConfig);

      synthesizer.speakTextAsync(
        text,
        result => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            const audioBuffer = Buffer.from(result.audioData);
            synthesizer.close();
            resolve(audioBuffer);
          } else {
            console.error(`Speech synthesis canceled: ${result.errorDetails}`);
            synthesizer.close();
            reject(new Error(result.errorDetails));
          }
        },
        error => {
          console.error(`Speech synthesis error: ${error}`);
          synthesizer.close();
          reject(error);
        }
      );
    });
  }

  close() {
    this.speechConfig?.close();
  }
}

// Factory function to create Azure Speech Service
export function createAzureSpeechService(): AzureSpeechService | null {
  const subscriptionKey = process.env.AZURE_SPEECH_KEY;
  const endpoint = process.env.AZURE_SPEECH_ENDPOINT;

  if (!subscriptionKey || !endpoint) {
    console.warn("Azure Speech credentials not found. Speech synthesis will be disabled.");
    return null;
  }

  // Extract region from endpoint URL
  const region = endpoint.match(/https:\/\/(\w+)\.tts\.speech\.microsoft\.com/)?.[1] || "eastus";

  return new AzureSpeechService({
    subscriptionKey,
    region,
  });
}