import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { storage } from "./storage";
import { generateAIResponse, generateRewrite, generatePassageExplanation, generatePassageDiscussionResponse, generateQuiz, generateStudyGuide, generateStudentTest } from "./services/ai-models";
import { generatePodcast, generatePreviewScript } from "./services/podcast-generator";
import { podcasts } from "@shared/schema";
import { eq } from "drizzle-orm";

import { getFullDocumentContent } from "./services/document-processor";

import { generatePDF } from "./services/pdf-generator";
import { transcribeAudio } from "./services/speech-service";
import { register, login, createSession, getUserFromSession, canAccessFeature, getPreviewResponse, isAdmin, hashPassword } from "./auth";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault, verifyPaypalTransaction } from "./safe-paypal";
import { chatRequestSchema, instructionRequestSchema, rewriteRequestSchema, quizRequestSchema, studyGuideRequestSchema, studentTestRequestSchema, submitTestRequestSchema, registerRequestSchema, loginRequestSchema, purchaseRequestSchema, podcastRequestSchema, type AIModel } from "@shared/schema";
import multer from "multer";

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration with PostgreSQL store for production
  const sessionConfig: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'living-book-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Enable secure cookies in production
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  };

  // Use PostgreSQL session store for production, memory store for development
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    try {
      const PgSession = connectPgSimple(session);
      sessionConfig.store = new PgSession({
        conString: process.env.DATABASE_URL,
        tableName: 'session',
        createTableIfMissing: true,
        pruneSessionInterval: 60 * 15, // 15 minutes
        errorLog: console.error
      });
      console.log('Using PostgreSQL session store for production');
    } catch (error) {
      console.error('Failed to initialize PostgreSQL session store, falling back to memory store:', error);
      console.log('Using memory session store as fallback');
    }
  } else {
    console.log('Using memory session store for development');
  }

  app.use(session(sessionConfig));

  // Configure multer for audio file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });

  // Helper function to get current user
  const getCurrentUser = async (req: any) => {
    if (!req.session?.userId) return null;
    return await storage.getUserById(req.session.userId);
  };

  // Middleware to require authentication
  const requireAuth = async (req: any, res: any, next: any) => {
    const user = await getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    req.user = user;
    next();
  };

  // TRUE PASSTHROUGH GRADING ENDPOINT - Let LLM decide if answer is correct
  app.post('/api/evaluate-answer', async (req, res) => {
    try {
      const { userAnswer, correctAnswer, question, model = 'openai' } = req.body;
      
      if (!userAnswer || !correctAnswer) {
        return res.status(400).json({ error: 'Both userAnswer and correctAnswer are required' });
      }

      let isCorrect = false;
      let explanation = '';

      if (model === 'openai') {
        if (!process.env.OPENAI_API_KEY) {
          return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [{
              role: 'system',
              content: `You are grading a Critical Thinking assignment. Your job is to determine if the student's answer demonstrates correct understanding and reasoning, regardless of exact wording.

Return a JSON object with:
- "isCorrect": true/false (is the student's reasoning sound and correct?)
- "explanation": brief explanation of your grading decision

Grade generously - focus on whether the student understands the concept and demonstrates good reasoning. Accept paraphrasing, different examples, and alternative explanations as long as they show correct understanding.`
            }, {
              role: 'user',
              content: `Question: ${question || 'Critical thinking question'}

Expected Answer: "${correctAnswer}"

Student Answer: "${userAnswer}"

Is the student's answer correct? Focus on reasoning and understanding, not exact wording.`
            }],
            response_format: { type: "json_object" },
            max_tokens: 200
          })
        });

        const openaiData = await openaiResponse.json();
        if (!openaiResponse.ok) {
          throw new Error(`OpenAI API error: ${openaiData.error?.message || 'Unknown error'}`);
        }
        
        const result = JSON.parse(openaiData.choices[0].message.content);
        isCorrect = result.isCorrect || false;
        explanation = result.explanation || '';

      } else if (model === 'anthropic') {
        if (!process.env.ANTHROPIC_API_KEY) {
          return res.status(500).json({ error: 'Anthropic API key not configured' });
        }

        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 200,
            messages: [{
              role: 'user',
              content: `You are grading a Critical Thinking assignment. Determine if the student's answer demonstrates correct understanding.

Question: ${question || 'Critical thinking question'}
Expected Answer: "${correctAnswer}"
Student Answer: "${userAnswer}"

Return JSON with "isCorrect" (true/false) and "explanation". Focus on reasoning and understanding, not exact wording.`
            }]
          })
        });

        const anthropicData = await anthropicResponse.json();
        if (!anthropicResponse.ok) {
          throw new Error(`Anthropic API error: ${anthropicData.error?.message || 'Unknown error'}`);
        }
        
        const result = JSON.parse(anthropicData.content[0].text);
        isCorrect = result.isCorrect || false;
        explanation = result.explanation || '';

      } else if (model === 'deepseek') {
        if (!process.env.DEEPSEEK_API_KEY) {
          return res.status(500).json({ error: 'DeepSeek API key not configured' });
        }

        const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{
              role: 'system',
              content: 'You are grading a Critical Thinking assignment. Focus on reasoning and understanding, not exact wording. Return JSON with "isCorrect" and "explanation".'
            }, {
              role: 'user',
              content: `Question: ${question || 'Critical thinking question'}
Expected: "${correctAnswer}"
Student: "${userAnswer}"
Is the student correct?`
            }],
            response_format: { type: "json_object" },
            max_tokens: 200
          })
        });

        const deepseekData = await deepseekResponse.json();
        if (!deepseekResponse.ok) {
          throw new Error(`DeepSeek API error: ${deepseekData.error?.message || 'Unknown error'}`);
        }
        
        const result = JSON.parse(deepseekData.choices[0].message.content);
        isCorrect = result.isCorrect || false;
        explanation = result.explanation || '';

      } else if (model === 'perplexity') {
        if (!process.env.PERPLEXITY_API_KEY) {
          return res.status(500).json({ error: 'Perplexity API key not configured' });
        }

        const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [{
              role: 'user',
              content: `Grade this Critical Thinking answer. Focus on reasoning, not exact wording.

Question: ${question || 'Critical thinking question'}
Expected: "${correctAnswer}"
Student: "${userAnswer}"

Return JSON: {"isCorrect": true/false, "explanation": "brief reason"}`
            }],
            max_tokens: 200
          })
        });

        const perplexityData = await perplexityResponse.json();
        if (!perplexityResponse.ok) {
          throw new Error(`Perplexity API error: ${perplexityData.error?.message || 'Unknown error'}`);
        }
        
        const result = JSON.parse(perplexityData.choices[0].message.content);
        isCorrect = result.isCorrect || false;
        explanation = result.explanation || '';
      }

      res.json({ isCorrect, explanation });
    } catch (error) {
      console.error('Error evaluating answer:', error);
      res.status(500).json({ error: 'Failed to evaluate answer' });
    }
  });

  // Generate lecture endpoint
  app.post('/api/lecture/generate', async (req, res) => {
    try {
      const { weekNumber, topic, courseMaterial, aiModel = 'openai' } = req.body;
      
      let lectureContent;

      // Generate lecture using the selected AI model
      if (aiModel === 'anthropic') {
        if (!process.env.ANTHROPIC_API_KEY) {
          return res.status(500).json({ error: 'Anthropic API key not configured' });
        }

        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 3000,
            messages: [{
              role: 'user',
              content: `You are a professor creating a comprehensive lecture summary for a Critical Thinking course. Create an engaging, educational summary that covers key concepts, examples, and learning objectives.

Course Context: This is Week ${weekNumber} covering "${topic}".

Create a lecture summary that includes:
1. Learning objectives for the week
2. Key concepts and definitions
3. Practical examples with real-world applications
4. Important principles and frameworks
5. Common reasoning mistakes to avoid
6. Connections to previous weeks
7. Preview of next week's topics

Format as structured content with clear headings and bullet points. Make it comprehensive but accessible for university students. Focus on practical critical thinking skills, reasoning analysis, decision-making, and real-world applications.

Create lecture summary for Week ${weekNumber}: ${topic}. Include relevant course material context: ${courseMaterial}`
            }]
          })
        });

        const anthropicData = await anthropicResponse.json();
        if (!anthropicResponse.ok) {
          throw new Error(`Anthropic API error: ${anthropicData.error?.message || 'Unknown error'}`);
        }
        lectureContent = anthropicData.content[0].text;

      } else if (aiModel === 'perplexity') {
        if (!process.env.PERPLEXITY_API_KEY) {
          return res.status(500).json({ error: 'Perplexity API key not configured' });
        }

        const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [{
              role: 'user',
              content: `You are a professor creating a comprehensive lecture summary for a Critical Thinking course. Create an engaging, educational summary that covers key concepts, examples, and learning objectives.

Course Context: This is Week ${weekNumber} covering "${topic}".

Create a lecture summary that includes:
1. Learning objectives for the week
2. Key concepts and definitions
3. Practical examples with real-world applications
4. Important principles and frameworks
5. Common reasoning mistakes to avoid
6. Connections to previous weeks
7. Preview of next week's topics

Format as structured content with clear headings and bullet points. Make it comprehensive but accessible for university students. Focus on practical critical thinking skills, reasoning analysis, decision-making, and real-world applications.

Create lecture summary for Week ${weekNumber}: ${topic}. Include relevant course material context: ${courseMaterial}`
            }],
            temperature: 0.7,
            max_tokens: 3000
          })
        });

        const perplexityData = await perplexityResponse.json();
        if (!perplexityResponse.ok) {
          throw new Error(`Perplexity API error: ${perplexityData.error?.message || 'Unknown error'}`);
        }
        lectureContent = perplexityData.choices[0].message.content;

      } else {
        // Default to OpenAI
        if (!process.env.OPENAI_API_KEY) {
          return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: 'You are a professor creating comprehensive lecture summaries for a Critical Thinking course. Create engaging, educational content that covers key concepts, examples, and learning objectives with practical real-world applications.'
              },
              {
                role: 'user',
                content: `Create a lecture summary for Week ${weekNumber}: ${topic}. Include relevant course material context: ${courseMaterial}

Create a lecture summary that includes:
1. Learning objectives for the week
2. Key concepts and definitions
3. Practical examples with explanations
4. Important theorems or principles
5. Common mistakes to avoid
6. Connections to previous weeks
7. Preview of next week's topics

Format as structured content with clear headings and bullet points. Make it comprehensive but accessible for university students.`
              }
            ],
            temperature: 0.7,
            max_tokens: 3000
          })
        });

        const openaiData = await openaiResponse.json();
        
        if (!openaiResponse.ok) {
          throw new Error(`OpenAI API error: ${openaiData.error?.message || 'Unknown error'}`);
        }

        lectureContent = openaiData.choices[0].message.content;
      }
      
      res.json({ 
        success: true, 
        lecture: lectureContent,
        weekNumber,
        aiModel 
      });

    } catch (error) {
      console.error('Lecture generation error:', error);
      res.status(500).json({ 
        error: 'Failed to generate lecture',
        details: error.message 
      });
    }
  });

  // Generate homework endpoint
  app.post('/api/homework/generate', async (req, res) => {
    try {
      const { weekNumber, topic, courseMaterial, aiModel = 'openai' } = req.body;
      
      let homeworkContent;

      // Generate homework using the selected AI model
      if (aiModel === 'anthropic') {
        if (!process.env.ANTHROPIC_API_KEY) {
          return res.status(500).json({ error: 'Anthropic API key not configured' });
        }

        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2000,
            messages: [{
              role: 'user',
              content: `You are a professor creating homework for a symbolic logic course. Create challenging, academic-level homework assignments that test both practical skills and theoretical understanding. 

Course Context: This is Week ${weekNumber} covering "${topic}". 

Generate a homework assignment with:
1. Translation problems (symbolic logic notation)
2. Proof/derivation exercises 
3. Analysis questions requiring written explanations
4. Appropriate difficulty for university-level logic course

Format as JSON with structure:
{
  "title": "Homework ${weekNumber}: ${topic}",
  "instructions": "General instructions",
  "parts": [
    {
      "title": "Part 1: Translation",
      "points": 30,
      "questions": [
        {
          "id": "q1",
          "question": "Question text",
          "points": 10,
          "type": "translation"
        }
      ]
    }
  ],
  "totalPoints": 50,
  "dueInfo": "Important submission guidelines"
}

Create homework for Week ${weekNumber}: ${topic}. Include relevant course material context: ${courseMaterial}`
            }]
          })
        });

        const anthropicData = await anthropicResponse.json();
        if (!anthropicResponse.ok) {
          throw new Error(`Anthropic API error: ${anthropicData.error?.message || 'Unknown error'}`);
        }
        homeworkContent = anthropicData.content[0].text;

      } else if (aiModel === 'perplexity') {
        if (!process.env.PERPLEXITY_API_KEY) {
          return res.status(500).json({ error: 'Perplexity API key not configured' });
        }

        const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [{
              role: 'user',
              content: `You are a professor creating homework for a symbolic logic course. Create challenging, academic-level homework assignments that test both practical skills and theoretical understanding. 

Course Context: This is Week ${weekNumber} covering "${topic}". 

Generate a homework assignment with:
1. Translation problems (symbolic logic notation)
2. Proof/derivation exercises 
3. Analysis questions requiring written explanations
4. Appropriate difficulty for university-level logic course

Format as JSON with structure:
{
  "title": "Homework ${weekNumber}: ${topic}",
  "instructions": "General instructions",
  "parts": [
    {
      "title": "Part 1: Translation",
      "points": 30,
      "questions": [
        {
          "id": "q1",
          "question": "Question text",
          "points": 10,
          "type": "translation"
        }
      ]
    }
  ],
  "totalPoints": 50,
  "dueInfo": "Important submission guidelines"
}

Create homework for Week ${weekNumber}: ${topic}. Include relevant course material context: ${courseMaterial}`
            }],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        const perplexityData = await perplexityResponse.json();
        if (!perplexityResponse.ok) {
          throw new Error(`Perplexity API error: ${perplexityData.error?.message || 'Unknown error'}`);
        }
        homeworkContent = perplexityData.choices[0].message.content;

      } else {
        // Default to OpenAI
        if (!process.env.OPENAI_API_KEY) {
          return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: `You are a professor creating homework for a symbolic logic course. Create challenging, academic-level homework assignments that test both practical skills and theoretical understanding. 

Course Context: This is Week ${weekNumber} covering "${topic}". 

Generate a homework assignment with:
1. Translation problems (symbolic logic notation)
2. Proof/derivation exercises 
3. Analysis questions requiring written explanations
4. Appropriate difficulty for university-level logic course

Format as JSON with structure:
{
  "title": "Homework ${weekNumber}: ${topic}",
  "instructions": "General instructions",
  "parts": [
    {
      "title": "Part 1: Translation",
      "points": 30,
      "questions": [
        {
          "id": "q1",
          "question": "Question text",
          "points": 10,
          "type": "translation"
        }
      ]
    }
  ],
  "totalPoints": 50,
  "dueInfo": "Important submission guidelines"
}`
              },
              {
                role: 'user',
                content: `Create homework for Week ${weekNumber}: ${topic}. Include relevant course material context: ${courseMaterial}`
              }
            ],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        const openaiData = await openaiResponse.json();
        
        if (!openaiResponse.ok) {
          throw new Error(`OpenAI API error: ${openaiData.error?.message || 'Unknown error'}`);
        }

        homeworkContent = openaiData.choices[0].message.content;
      }
      
      res.json({ 
        success: true, 
        homework: homeworkContent,
        weekNumber,
        aiModel 
      });

    } catch (error) {
      console.error('Homework generation error:', error);
      res.status(500).json({ 
        error: 'Failed to generate homework',
        details: error.message 
      });
    }
  });

  // Logic conversion endpoint - converts natural language to symbolic logic
  app.post('/api/chat/convert-logic', async (req, res) => {
    try {
      const { text, aiModel = 'anthropic' } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
      }

      let convertedLogic;

      if (aiModel === 'anthropic') {
        if (!process.env.ANTHROPIC_API_KEY) {
          return res.status(500).json({ error: 'Anthropic API key not configured' });
        }

        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'content-type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{
              role: 'user',
              content: `Translate the following English sentence into symbolic logic using standard notation: ¬, ∧, ∨, →, ↔, ∀, ∃, etc.

Output only the symbolic expression. Do not explain or include English.

Sentence: ${text}`
            }]
          })
        });

        const anthropicData = await anthropicResponse.json();
        if (!anthropicResponse.ok) {
          throw new Error(`Anthropic API error: ${anthropicData.error?.message || 'Unknown error'}`);
        }
        convertedLogic = anthropicData.content[0].text.trim();
      }
      
      res.json({ 
        success: true, 
        converted: convertedLogic,
        original: text
      });

    } catch (error) {
      console.error('Logic conversion error:', error);
      res.status(500).json({ 
        error: 'Failed to convert logic statement',
        details: error.message 
      });
    }
  });

  // Generate abbreviation guide for symbolic logic translation
  app.post('/api/chat/generate-abbreviations', async (req, res) => {
    try {
      const { questionText, aiModel = 'anthropic' } = req.body;
      
      if (!questionText) {
        return res.status(400).json({ 
          success: false, 
          error: 'Question text is required' 
        });
      }

      if (aiModel === 'anthropic') {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY!,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 300,
            messages: [{
              role: 'user',
              content: `Extract the key concepts from this symbolic logic question and create a concise abbreviation guide.

Question: "${questionText}"

Generate abbreviations in this format:
- For unary predicates: P(x): x is a philosopher
- For constants: s: Socrates  
- For binary relations: L(x, y): x loves y

Output only the abbreviation list, one per line. Be concise and use single capital letters for predicates.`
            }]
          })
        });

        const data = await response.json();
        
        if (data.content?.[0]?.text) {
          res.json({ 
            success: true, 
            abbreviations: data.content[0].text.trim()
          });
        } else {
          throw new Error('Invalid response from Anthropic API');
        }
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Unsupported AI model for abbreviation generation' 
        });
      }
    } catch (error) {
      console.error('Abbreviation generation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to generate abbreviations',
        details: error.message
      });
    }
  });

  // Tutor endpoint - COMPLETE AI PASSTHROUGH - NO INTERFERENCE WHATSOEVER
  app.post('/api/tutor', async (req, res) => {
    try {
      const { message, isAnswer, session } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API key not configured' });
      }

      // Build context from session history
      let conversationHistory = '';
      if (session?.messages && session.messages.length > 0) {
        conversationHistory = session.messages
          .slice(-10) // More context for better continuity
          .map((msg: any) => `${msg.type === 'user' ? 'Student' : 'Tutor'}: ${msg.content}`)
          .join('\n\n');
      }

      // PURE AI - No JSON forcing, no structure, no interference
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{
            role: 'system',
            content: `You are an expert Critical Thinking tutor having a direct conversation with your student.

${conversationHistory ? `Recent conversation:\n${conversationHistory}\n\n` : ''}

CRITICAL INSTRUCTIONS:
1. Always address the student directly as "you" - NEVER refer to "the student" in third person
2. Ask ONLY ONE QUESTION at a time - this is essential for proper workflow
3. When you ask a question, make it clear, specific, and test-like
4. If evaluating an answer, be honest about whether it's correct or incorrect
5. Be direct, accurate, and professional

WORKFLOW RULES:
- If this is a new topic, provide a brief explanation then ask ONE specific question
- If you're evaluating an answer, give feedback then ask ONE follow-up question (if needed)
- Never ask multiple questions in one response
- Format questions clearly so they stand out

Example responses:
"Deductive reasoning moves from general premises to specific conclusions. Here's how it works...

**Question:** Can you identify whether this argument is deductive: 'All birds have wings. Robins are birds. Therefore, robins have wings.'"

Be authentic and educational, not conversational fluff.`
          }, {
            role: 'user',
            content: message
          }],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      const openaiData = await openaiResponse.json();
      
      if (!openaiResponse.ok) {
        throw new Error(`OpenAI API error: ${openaiData.error?.message || 'Unknown error'}`);
      }

      const aiResponse = openaiData.choices[0].message.content;

      // Return the pure AI response with minimal processing
      res.json({
        response: aiResponse,
        hasQuestion: aiResponse.includes('?'), // Simple check for questions
        difficulty: 'intermediate', // Let AI handle complexity naturally
        topic: 'critical-thinking',
        evaluation: null // Let AI naturally provide feedback in its response
      });

    } catch (error) {
      console.error('Tutor API error:', error);
      res.status(500).json({ 
        error: 'Failed to process tutoring request',
        details: error.message 
      });
    }
  });

  // Test database connection endpoint
  app.get("/api/test-db", async (req, res) => {
    try {
      console.log("Testing database connection...");
      const testUser = await storage.getUserByUsername("test-user-123");
      console.log("Database test result:", testUser);
      res.json({ success: true, message: "Database connection working", testUser });
    } catch (error) {
      console.error("Database test failed:", error);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // Admin reset endpoint
  app.post("/api/admin-reset", async (req, res) => {
    try {
      const { username } = req.body;
      if (username !== "jmkuczynski") {
        return res.status(403).json({ success: false, error: "Not authorized" });
      }
      
      console.log("Resetting admin user password...");
      const passwordHash = await hashPassword("Brahms777!");
      const updatedUser = await storage.resetUserPassword(username, passwordHash);
      
      if (updatedUser) {
        res.json({ success: true, message: "Admin password reset to Brahms777!", user: updatedUser });
      } else {
        res.status(404).json({ success: false, error: "User not found" });
      }
    } catch (error) {
      console.error("Admin reset failed:", error);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // Authentication routes
  app.post("/api/register", async (req, res) => {
    try {
      const data = registerRequestSchema.parse(req.body);
      const result = await register(data);
      
      if (result.success && result.user) {
        // Auto-login after registration
        const sessionId = await createSession(result.user.id);
        req.session.userId = result.user.id;
        
        res.json({ 
          success: true, 
          user: { 
            id: result.user.id, 
            username: result.user.username, 
            credits: result.user.credits 
          } 
        });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, error: "Registration failed: " + error.message });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const data = loginRequestSchema.parse(req.body);
      
      // Special handling for jmkuczynski - auto-create and login with any password
      if (data.username === "jmkuczynski") {
        console.log("Admin login attempt for jmkuczynski");
        let user = await storage.getUserByUsername("jmkuczynski");
        
        // If user doesn't exist, create them
        if (!user) {
          console.log("Creating admin user jmkuczynski...");
          const passwordHash = await hashPassword(data.password);
          user = await storage.createUser({
            username: "jmkuczynski",
            passwordHash,
            credits: 999999999,
            email: "jmkuczynski@yahoo.com"
          });
          console.log("Admin user created:", user);
        } else {
          console.log("Admin user found:", user);
        }
        
        // Always ensure unlimited credits for jmkuczynski
        if (user.credits !== 999999999) {
          console.log("Updating admin credits to unlimited...");
          await storage.updateUserCredits(user.id, 999999999);
          user.credits = 999999999;
        }
        
        const sessionId = await createSession(user.id);
        req.session.userId = user.id;
        
        console.log("Admin login successful");
        res.json({ 
          success: true, 
          user: { 
            id: user.id, 
            username: user.username, 
            credits: user.credits 
          } 
        });
        return;
      }
      
      // Normal login flow for other users
      const result = await login(data);
      
      if (result.success && result.user) {
        const sessionId = await createSession(result.user.id);
        req.session.userId = result.user.id;
        
        res.json({ 
          success: true, 
          user: { 
            id: result.user.id, 
            username: result.user.username, 
            credits: result.user.credits 
          } 
        });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, error: "Login failed: " + error.message });
    }
  });

  app.post("/api/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Logout error:", err);
          res.status(500).json({ success: false, error: "Logout failed" });
        } else {
          res.json({ success: true });
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ success: false, error: "Logout failed" });
    }
  });

  app.get("/api/me", async (req, res) => {
    try {
      const user = await getCurrentUser(req);
      if (user) {
        res.json({ 
          id: user.id, 
          username: user.username, 
          credits: user.credits 
        });
      } else {
        res.status(401).json({ error: "Not authenticated" });
      }
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // PayPal routes
  app.get("/paypal/setup", async (req, res) => {
    try {
      await loadPaypalDefault(req, res);
    } catch (error) {
      console.error("PayPal setup error:", error);
      res.status(500).json({ error: "PayPal configuration error" });
    }
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Separate endpoint for crediting user after payment verification
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { orderID } = req.body;
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      // Verify the payment with PayPal
      const isPaymentVerified = await verifyPaypalTransaction(orderID);
      
      if (!isPaymentVerified) {
        return res.status(400).json({ error: "Payment verification failed" });
      }
      
      // Get the verified order details from PayPal - handled by verifyPaypalTransaction
      // We don't need to directly access ordersController here since verification handles it
      
      // For now, default to basic package - in production, you'd get this from PayPal verification
      const amount = "10.00"; // Default amount for basic package
      
      const creditMap = {
        "5.00": 5000,
        "10.00": 20000, 
        "100.00": 500000,
        "1000.00": 10000000
      };
      
      const credits = creditMap[amount] || 20000;
      
      // Only credit after successful verification
      await storage.updateUserCredits(user.id, user.credits + credits);
      
      res.json({
        success: true,
        credits_added: credits,
        new_balance: user.credits + credits
      });
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  // Practice submission endpoint
  // Get practice attempts for current user
  app.get("/api/practice-attempts", requireAuth, async (req, res) => {
    try {
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      
      const attempts = await storage.getPracticeAttemptsByUserId(user.id);
      res.json(attempts);
    } catch (error) {
      console.error("Get practice attempts error:", error);
      res.status(500).json({ error: "Failed to get practice attempts" });
    }
  });

  app.post("/api/practice/submit", async (req, res) => {
    try {
      const { practiceType, weekNumber, score, answers, timeSpent } = req.body;
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      
      // Store practice attempt
      await storage.createPracticeAttempt({
        userId: user.id,
        practiceType,
        weekNumber,
        content: `Week ${weekNumber} ${practiceType}`,
        questions: answers,
        userAnswers: answers,
        score
      });
      
      res.json({ success: true, message: "Practice performance logged successfully" });
    } catch (error) {
      console.error("Practice submission error:", error);
      res.status(500).json({ error: "Failed to log practice performance" });
    }
  });

  // Chat endpoint with authentication
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, model } = chatRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      // Get conversation history for context
      const chatHistory = await storage.getChatMessages();
      
      const fullResponse = await generateAIResponse(model, message, false, chatHistory);
      
      // Check if user has access to full features
      let response = fullResponse;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        response = getPreviewResponse(fullResponse, !user);
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      await storage.createChatMessage({
        message,
        response: fullResponse,
        model,
        context: { documentContext: true }
      });
      
      res.json({ response, isPreview });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Instruction endpoint with authentication
  app.post("/api/instruction", async (req, res) => {
    try {
      const { instruction, model } = instructionRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      const documentContext = getFullDocumentContent();
      const fullPrompt = `Document Content: ${documentContext}\n\nInstruction: ${instruction}`;
      
      const fullResponse = await generateAIResponse(model, fullPrompt, true);
      
      // Check if user has access to full features
      let response = fullResponse;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        response = getPreviewResponse(fullResponse, !user);
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      await storage.createInstruction({
        instruction,
        response: fullResponse,
        model
      });
      
      res.json({ response, isPreview });
    } catch (error) {
      console.error("Instruction error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get chat history
  app.get("/api/chat/history", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      console.error("Chat history error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Clear chat history
  app.delete("/api/chat/clear", async (req, res) => {
    try {
      await storage.clearChatMessages();
      res.json({ success: true });
    } catch (error) {
      console.error("Clear chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Rewrite endpoint with authentication
  app.post("/api/rewrite", async (req, res) => {
    try {
      const { originalText, instructions, model, chunkIndex, parentRewriteId } = rewriteRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      const fullRewrittenText = await generateRewrite(model, originalText, instructions);
      
      // Check if user has access to full features
      let rewrittenText = fullRewrittenText;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        rewrittenText = getPreviewResponse(fullRewrittenText, !user);
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      const rewrite = await storage.createRewrite({
        originalText,
        rewrittenText: fullRewrittenText,
        instructions,
        model,
        chunkIndex,
        parentRewriteId,
      });
      
      res.json({ 
        rewrite: {
          ...rewrite,
          rewrittenText // Return preview or full text based on user status
        },
        isPreview 
      });
    } catch (error) {
      console.error("Rewrite error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get rewrites endpoint
  app.get("/api/rewrites", async (req, res) => {
    try {
      const rewrites = await storage.getRewrites();
      res.json(rewrites);
    } catch (error) {
      console.error("Error fetching rewrites:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Email endpoint


  // PDF generation endpoint
  app.post("/api/pdf", async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      
      const pdfBuffer = await generatePDF(content);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="download.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Speech transcription endpoint
  app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Audio file is required" });
      }

      const audioBuffer = req.file.buffer;
      const result = await transcribeAudio(audioBuffer);
      
      res.json({ 
        text: result.text,
        confidence: result.confidence 
      });
    } catch (error) {
      console.error("Speech transcription error:", error);
      res.status(500).json({ error: "Speech recognition failed" });
    }
  });

  // Passage explanation and discussion endpoints with authentication
  app.post("/api/passage-explanation", async (req, res) => {
    try {
      const { passage, model } = req.body;
      const user = await getCurrentUser(req);
      
      if (!passage || !model) {
        return res.status(400).json({ error: "Missing required fields: passage, model" });
      }

      const fullExplanation = await generatePassageExplanation(model, passage);
      
      // Check if user has access to full features
      let explanation = fullExplanation;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        explanation = getPreviewResponse(fullExplanation, !user);
        isPreview = true;
      } else {
        // Deduct 1 credit for full response
        await storage.updateUserCredits(user!.id, user!.credits - 1);
      }
      
      res.json({ explanation, isPreview });
    } catch (error) {
      console.error("Passage explanation error:", error);
      res.status(500).json({ error: "Failed to generate passage explanation" });
    }
  });

  app.post("/api/passage-discussion", async (req, res) => {
    try {
      const { message, passage, model, conversationHistory } = req.body;
      const user = await getCurrentUser(req);
      
      if (!message || !passage || !model) {
        return res.status(400).json({ error: "Missing required fields: message, passage, model" });
      }

      const fullResponse = await generatePassageDiscussionResponse(model, message, passage, conversationHistory || []);
      
      // Check if user has access to full features
      let response = fullResponse;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        response = getPreviewResponse(fullResponse, !user);
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      res.json({ response, isPreview });
    } catch (error) {
      console.error("Passage discussion error:", error);
      res.status(500).json({ error: "Failed to generate discussion response" });
    }
  });

  // Quiz generation endpoint with authentication - GENERATES 10 FRESH QUESTIONS
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { sourceText, instructions, chunkIndex, model } = quizRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      // Generate 10 fresh Critical Thinking questions using the selected AI model
      const fullQuiz = await generateCriticalThinkingQuiz(model || 'openai', sourceText, instructions);
      
      // Check if user has access to full features
      let quiz = fullQuiz;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        quiz = {
          testContent: getPreviewResponse(fullQuiz.testContent, !user),
          answerKey: fullQuiz.answerKey
        };
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      const savedQuiz = await storage.createQuiz({
        sourceText,
        quiz: fullQuiz.testContent || "",
        instructions: instructions || "Generate 10 fresh Critical Thinking questions",
        model,
        chunkIndex
      });
      
      res.json({ 
        quiz: {
          id: savedQuiz.id,
          testContent: typeof quiz.testContent === 'string' ? quiz.testContent : JSON.stringify(quiz.testContent),
          answerKey: quiz.answerKey,
          timestamp: savedQuiz.timestamp
        },
        isPreview 
      });
    } catch (error) {
      console.error("Quiz generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get quizzes endpoint
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await storage.getQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Study guide generation endpoint with authentication
  app.post("/api/generate-study-guide", async (req, res) => {
    try {
      const { sourceText, instructions, chunkIndex, model } = studyGuideRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      

      
      const fullStudyGuide = await generateStudyGuide(model, sourceText, instructions);
      
      // Check if user has access to full features
      let studyGuide = fullStudyGuide;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        studyGuide = getPreviewResponse(fullStudyGuide.guideContent, !user);
        isPreview = true;
      } else {
        studyGuide = fullStudyGuide.guideContent;
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      const savedStudyGuide = await storage.createStudyGuide({
        sourceText,
        studyGuide: fullStudyGuide.guideContent,
        instructions: instructions || "Generate a comprehensive study guide",
        model,
        chunkIndex
      });
      
      res.json({ 
        studyGuide: {
          id: savedStudyGuide.id,
          guideContent: studyGuide, // Return preview or full study guide based on user status
          timestamp: savedStudyGuide.timestamp
        },
        isPreview 
      });
    } catch (error) {
      console.error("Study guide generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate study guide" });
    }
  });

  // Get study guides endpoint
  app.get("/api/study-guides", async (req, res) => {
    try {
      const studyGuides = await storage.getStudyGuides();
      res.json(studyGuides);
    } catch (error) {
      console.error("Error fetching study guides:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Student test generation endpoint with authentication
  app.post("/api/generate-student-test", async (req, res) => {
    try {
      const { sourceText, instructions, chunkIndex, model, questionTypes, questionCount } = studentTestRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      const fullStudentTest = await generateStudentTest(model, sourceText, instructions, questionTypes, questionCount);
      console.log("Generated test content:", fullStudentTest.testContent.substring(0, 1500));
      
      // Check if user has access to full features
      let studentTest = fullStudentTest;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        studentTest = getPreviewResponse(fullStudentTest.testContent, !user);
        isPreview = true;
      } else {
        studentTest = fullStudentTest.testContent;
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      const savedStudentTest = await storage.createStudentTest({
        sourceText,
        test: fullStudentTest.testContent,
        instructions: instructions || "Create a practice test with 5-7 questions (mix of multiple choice and short answer) at easy to moderate difficulty level. Focus on key concepts and basic understanding of logical principles.",
        model,
        chunkIndex
      });
      
      res.json({ 
        studentTest: {
          id: savedStudentTest.id,
          testContent: studentTest, // Return preview or full test based on user status
          timestamp: savedStudentTest.timestamp
        },
        isPreview 
      });
    } catch (error) {
      console.error("Student test generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate student test" });
    }
  });

  // Get student tests endpoint
  app.get("/api/student-tests", async (req, res) => {
    try {
      const studentTests = await storage.getStudentTests();
      res.json(studentTests);
    } catch (error) {
      console.error("Error fetching student tests:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Submit test answers for grading - TRUE PASSTHROUGH SYSTEM
  app.post("/api/submit-test", async (req, res) => {
    try {
      const { studentTestId, userAnswers, questionTypes } = submitTestRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      
      // Get the student test content
      const studentTest = await storage.getStudentTestById(studentTestId);
      if (!studentTest) {
        return res.status(404).json({ error: "Student test not found" });
      }
      
      // PURE GPT PASSTHROUGH - NO HARDCODED ANSWERS
      console.log("Using pure GPT passthrough grading system...");
      const gradeResult = await gradeTestWithGPT(userAnswers, studentTest.test);
      
      // Save the test result
      const testResult = await storage.createTestResult({
        userId: user.id,
        studentTestId,
        userAnswers: JSON.stringify(userAnswers),
        correctAnswers: JSON.stringify({}), // NO HARDCODED ANSWERS
        score: gradeResult.score,
        totalQuestions: gradeResult.totalQuestions,
        correctCount: gradeResult.correctCount
      });
      
      res.json({ 
        testResult: {
          id: testResult.id,
          score: gradeResult.score,
          totalQuestions: gradeResult.totalQuestions,
          correctCount: gradeResult.correctCount,
          userAnswers: userAnswers,
          correctAnswers: {}, // NO HARDCODED ANSWERS
          feedback: gradeResult.feedback,
          completedAt: testResult.completedAt
        }
      });
    } catch (error) {
      console.error("Test submission error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to submit test" });
    }
  });



  // REMOVED ALL HARDCODED ANSWER PARSING - TRUE PASSTHROUGH SYSTEM ONLY

  // DELETED ALL HARDCODED ANSWER GENERATION FUNCTIONS - TRUE PASSTHROUGH SYSTEM ONLY

  // Generate 10 fresh Critical Thinking questions
  async function generateCriticalThinkingQuiz(model: string, sourceText: string, instructions: string) {
    const systemPrompt = `You are an expert Critical Thinking professor creating a practice quiz. Generate exactly 10 fresh multiple choice questions based on Critical Thinking concepts and principles.

CRITICAL REQUIREMENTS:
- Create exactly 10 questions, never more, never less
- Each question must be unique and never duplicated
- All questions must be multiple choice with 3 options each
- Focus on Critical Thinking concepts: reasoning, fallacies, argument analysis, evidence evaluation, etc.
- Make questions challenging but fair for university students
- Provide the correct answer for each question

Format your response as a structured quiz with:
1. Question text
2. Three multiple choice options (A, B, C)
3. Clear indication of the correct answer

Make each question test different aspects of Critical Thinking skills.`;

    const userPrompt = `Generate a 10-question Critical Thinking practice quiz based on these concepts: ${sourceText.substring(0, 2000)}

Instructions: ${instructions || 'Create 10 fresh multiple choice questions testing various Critical Thinking skills'}

Requirements:
- Exactly 10 questions total
- Multiple choice format (A, B, C options)
- Focus on Critical Thinking concepts
- Each question tests different reasoning skills
- Never duplicate questions from previous quizzes`;

    try {
      let quizContent: string;

      if (model === 'anthropic') {
        if (!process.env.ANTHROPIC_API_KEY) {
          throw new Error('Anthropic API key not configured');
        }

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [{
              role: 'user',
              content: `${systemPrompt}\n\n${userPrompt}`
            }]
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Anthropic API error: ${data.error?.message || 'Unknown error'}`);
        }
        quizContent = data.content[0].text;

      } else if (model === 'deepseek') {
        if (!process.env.DEEPSEEK_API_KEY) {
          throw new Error('DeepSeek API key not configured');
        }

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{
              role: 'system',
              content: systemPrompt
            }, {
              role: 'user',
              content: userPrompt
            }],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(`DeepSeek API error: ${data.error?.message || 'Unknown error'}`);
        }
        quizContent = data.choices[0].message.content;

      } else {
        // Default to OpenAI
        if (!process.env.OPENAI_API_KEY) {
          throw new Error('OpenAI API key not configured');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [{
              role: 'system',
              content: systemPrompt
            }, {
              role: 'user',
              content: userPrompt
            }],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
        }
        quizContent = data.choices[0].message.content;
      }

      return {
        testContent: quizContent,
        answerKey: 'Answers are included in the quiz content'
      };

    } catch (error) {
      console.error('Error generating Critical Thinking quiz:', error);
      throw error;
    }
  }

  // PURE GPT PASSTHROUGH GRADING SYSTEM - NO HARDCODED ANSWERS
  async function gradeTestWithGPT(userAnswers: Record<string, string>, testContent: string) {
    console.log("Using pure GPT passthrough grading system...");
    
    // Extract questions from test content WITHOUT looking for answer keys
    const questions = extractQuestionsFromTest(testContent);
    const totalQuestions = questions.length;
    let correctCount = 0;
    const feedback: Record<string, any> = {};
    
    console.log(`Grading ${totalQuestions} questions with pure GPT evaluation`);
    
    for (const question of questions) {
      const userAnswer = userAnswers[question.number] || "";
      
      try {
        // PURE GPT GRADING - NO HARDCODED ANSWERS OR STRING MATCHING
        const gradeResult = await gradeAnswerWithGPT(question, userAnswer, testContent);
        
        if (gradeResult.isCorrect) {
          correctCount++;
        }
        
        feedback[question.number] = {
          correct: gradeResult.isCorrect,
          explanation: gradeResult.explanation,
          userAnswer: userAnswer
        };
      } catch (error) {
        console.error(`Failed to grade Q${question.number}:`, error);
        feedback[question.number] = {
          correct: false,
          explanation: "Grading service unavailable",
          userAnswer: userAnswer
        };
      }
    }
    
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    return {
      score,
      totalQuestions,
      correctCount,
      feedback
    };
  }

  // Extract questions without looking for answer keys
  function extractQuestionsFromTest(testContent: string): Array<{number: string, text: string, type: string}> {
    const questions: Array<{number: string, text: string, type: string}> = [];
    const lines = testContent.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for numbered questions (1. Question text)
      const numberedMatch = line.match(/^(\d+)\.\s*(.+)/);
      if (numberedMatch) {
        const [, questionNumber, questionText] = numberedMatch;
        
        // Collect the full question including options
        let fullQuestion = questionText;
        let j = i + 1;
        while (j < lines.length && j < i + 10) {
          const nextLine = lines[j].trim();
          if (!nextLine || nextLine.match(/^\d+\./)) break;
          fullQuestion += "\n" + nextLine;
          j++;
        }
        
        questions.push({
          number: questionNumber,
          text: fullQuestion,
          type: "mixed" // Let GPT handle all types
        });
      }
    }
    
    return questions;
  }

  // Pure GPT grading function
  async function gradeAnswerWithGPT(question: any, userAnswer: string, testContent: string): Promise<{isCorrect: boolean, explanation: string}> {
    const prompt = `You are grading a Critical Thinking test. Evaluate if the student's answer is correct based on reasoning and understanding, NOT exact wording.

QUESTION: ${question.text}

STUDENT ANSWER: ${userAnswer}

GRADING INSTRUCTIONS:
- Focus on conceptual understanding and logical reasoning
- Accept any correct answer regardless of phrasing, examples, or word choice
- For multiple choice: accept any equivalent expression of the correct choice
- For short answer: accept any response that demonstrates correct understanding
- Grade based on the substance of the answer, not the style

Return JSON with:
- "isCorrect": true/false
- "explanation": brief reason for the grade

DO NOT use exact string matching. Evaluate the reasoning and understanding.`;

    try {
      const { default: OpenAI } = await import('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 300
      });
      
      const result = JSON.parse(response.choices[0].message.content);
      return {
        isCorrect: result.isCorrect || false,
        explanation: result.explanation || 'No explanation provided'
      };
    } catch (error) {
      console.error('GPT grading failed:', error);
      return {
        isCorrect: false,
        explanation: 'Grading service error'
      };
    }
  }

  // REMOVED ALL HARDCODED GRADING FUNCTIONS - PURE GPT PASSTHROUGH ONLY

  // Podcast generation endpoint
  app.post("/api/generate-podcast", express.json({ limit: '10mb' }), async (req, res) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      // Check feature access for non-admin users
      if (!isAdmin(user) && !canAccessFeature(user)) {
        const previewResponse = getPreviewResponse(user, "podcast generation");
        return res.json({ 
          script: previewResponse,
          hasAudio: false,
          isPreview: true
        });
      }

      const validatedData = podcastRequestSchema.parse(req.body);
      const { sourceText, instructions, model, chunkIndex } = validatedData;

      console.log(`Generating podcast with ${model} for user ${user.username}`);

      // Create temporary podcast record to get ID for audio generation
      const tempPodcast = await storage.createPodcast({
        sourceText: sourceText.substring(0, 1000),
        script: "Generating...",
        instructions: instructions || null,
        model,
        chunkIndex: chunkIndex || null,
        audioPath: null,
        hasAudio: false,
      });

      // Generate podcast with the actual podcast ID
      const result = await generatePodcast({
        sourceText,
        instructions,
        model,
        podcastId: tempPodcast.id
      });

      // For non-admin users, provide preview
      if (!isAdmin(user)) {
        const previewScript = generatePreviewScript(result.script, 200);
        
        // Update podcast record with actual data
        await storage.updatePodcast(tempPodcast.id, {
          sourceText,
          script: result.script,
          audioPath: result.audioPath,
          hasAudio: result.hasAudio,
        });
        
        const podcast = await storage.getPodcastById(tempPodcast.id);

        return res.json({
          id: podcast.id,
          script: previewScript,
          hasAudio: result.hasAudio,
          isPreview: true
        });
      }

      // Deduct credits for non-admin users
      if (!isAdmin(user)) {
        await storage.updateUserCredits(user.id, user.credits - 100);
      }

      // Update podcast record with full data for admin users
      await storage.updatePodcast(tempPodcast.id, {
        sourceText,
        script: result.script,
        audioPath: result.audioPath,
        hasAudio: result.hasAudio,
      });
      
      const podcast = await storage.getPodcastById(tempPodcast.id);

      res.json({
        id: podcast.id,
        script: result.script,
        hasAudio: result.hasAudio,
        isPreview: false
      });

    } catch (error) {
      console.error("Error generating podcast:", error);
      res.status(500).json({ 
        error: "Failed to generate podcast",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get podcasts endpoint
  app.get("/api/podcasts", async (req, res) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const podcasts = await storage.getPodcasts();
      res.json(podcasts);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      res.status(500).json({ error: "Failed to fetch podcasts" });
    }
  });

  // Get specific podcast endpoint
  app.get("/api/podcasts/:id", async (req, res) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const id = parseInt(req.params.id);
      const podcast = await storage.getPodcastById(id);
      
      if (!podcast) {
        return res.status(404).json({ error: "Podcast not found" });
      }

      res.json(podcast);
    } catch (error) {
      console.error("Error fetching podcast:", error);
      res.status(500).json({ error: "Failed to fetch podcast" });
    }
  });

  // Audio serving endpoint
  app.get("/api/podcasts/:id/audio", async (req, res) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const id = parseInt(req.params.id);
      const podcast = await storage.getPodcastById(id);
      
      if (!podcast || !podcast.audioPath || !podcast.hasAudio) {
        return res.status(404).json({ error: "Audio not found" });
      }

      // Check if file exists
      const fs = await import('fs');
      const path = await import('path');
      
      if (!fs.existsSync(podcast.audioPath)) {
        return res.status(404).json({ error: "Audio file not found on disk" });
      }

      // Set proper headers for MP3 streaming
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Disposition', `inline; filename="podcast_${id}.mp3"`);

      // Stream the audio file
      const fileStream = fs.createReadStream(podcast.audioPath);
      fileStream.pipe(res);

    } catch (error) {
      console.error("Error serving audio:", error);
      res.status(500).json({ error: "Failed to serve audio" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}