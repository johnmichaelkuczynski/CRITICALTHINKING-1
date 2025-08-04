# Philosophical Learning Platform

## Overview
An advanced philosophical learning platform that leverages AI to create an engaging, personalized educational experience for philosophical texts. The platform integrates with philosophical content to guide users through complex subjects like symbolic logic or academic writing. It provides interactive tools for understanding, analyzing, and generating content based on provided material, aiming to enhance learning and critical thinking skills.

## User Preferences
Preferred communication style: Simple, everyday language.
- Chat interface should be much larger (made 420px wide)
- User input should be a large textarea, not small input field
- Email functionality should only appear when user clicks on a specific response, not as a persistent input field
- AI responses should be very short (3-4 sentences maximum) unless user specifically asks for elaboration
- Enter key should send messages (Shift+Enter for new lines)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Math Rendering**: KaTeX for mathematical notation display

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL
- **Build System**: Vite for frontend, esbuild for backend bundling

### Key Capabilities
- **Document Processing**: Handles pre-loaded academic content with structured sections, auto-generated navigation, and mathematical notation rendering.
- **AI Integration**: Multi-model support (DeepSeek, OpenAI GPT-4, Anthropic Claude, Perplexity) with full document context for chat Q&A and content modification. Features comprehensive content generation and a pure LLM passthrough grading system that evaluates semantic correctness, accepting any correct reasoning regardless of phrasing.
- **Speech Services**: Azure Speech-to-Text/Text-to-Speech and Google Speech API integration for audio transcription and voice interaction features.
- **Interactive Features**: Text highlighting and selection with context-aware "Discuss" functionality, rewrite capabilities, quiz/test creation, study guide generation, podcast script summarization, and interactive homework references that navigate to relevant sections.
- **Practice System**: Interactive homework, quizzes, and tests with instant "Show Solutions," symbolic logic keyboard, and performance tracking via an Analytics dashboard. All practice content (homework, quizzes, tests) transformed from Symbolic Logic to Critical Thinking, maintaining all AI and interactive features.
- **User Interface**: Responsive design with a navigation sidebar, AI model selector, chat interface, and instruction box. Supports PDF generation and text copying.
- **Monetization**: Freemium model with real AI-generated previews for unregistered users, full functionality with credit purchases, and secure payment verification.

### System Design Choices
- **UI/UX**: Prioritizes content display space, clear typography, and accessible component primitives, with responsive design.
- **Data Flow**: Static content loading, user interaction via chat/instruction, AI processing with document context, response handling with math rendering, and session persistence.
- **Content Handling**: Robust text extraction and formatting for academic integrity, including mathematical notation and philosophical propositions.
- **AI Integration**: Utilizes multiple AI models focusing on context-awareness and user-defined instructions for diverse applications. Implements intelligent chunking for large documents to ensure performance.
- **Grading System**: Features a revolutionary LLM passthrough grading system (GPT-4) that uses semantic evaluation, accepting diverse phrasing and examples. It includes a grade dispute system and transparent grading with AI model reasoning. All hardcoded answer keys have been removed.

## External Dependencies

### Core Libraries
- **@anthropic-ai/sdk**: Claude AI integration
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Server state management and caching
- **@paypal/paypal-server-sdk**: PayPal integration

### UI Components
- **@radix-ui/***: Accessible component primitives
- **class-variance-authority**: Component variant styling
- **cmdk**: Command palette functionality
- **date-fns**: Date formatting utilities
- **KaTeX**: Mathematical notation rendering

### Development Tools
- **drizzle-kit**: Database schema management and migrations
- **tsx**: TypeScript execution for development
- **wouter**: Lightweight routing solution
- **vite**: Frontend build tool
- **esbuild**: Backend bundling