import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Ensure audio directory exists
const audioDir = path.join(process.cwd(), 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

export async function synthesizeSpeech(text: string, podcastId: number): Promise<{ audioPath: string | null; hasAudio: boolean }> {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    console.log("OpenAI API key not configured");
    return { audioPath: null, hasAudio: false };
  }

  try {
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    console.log(`Using OpenAI TTS with alloy voice`);

    // Define output file path
    const audioFileName = `podcast_${podcastId}_${Date.now()}.mp3`;
    const audioFilePath = path.join(audioDir, audioFileName);

    // Generate speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd', // Using high-quality model
      voice: 'alloy',
      input: text,
    });

    // Convert the response to a buffer and save to file
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(audioFilePath, buffer);

    console.log(`Audio synthesis completed: ${audioFilePath}`);
    return { audioPath: audioFilePath, hasAudio: true };

  } catch (error) {
    console.error("OpenAI TTS synthesis error:", error);
    return { audioPath: null, hasAudio: false };
  }
}