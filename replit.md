# Philosophical Learning Platform

## Overview

An advanced philosophical learning platform that leverages AI to create an engaging, personalized educational experience for philosophical texts. The platform now readily integrates with any philosophical content, focusing on guiding users through complex subjects like symbolic logic or academic writing. It aims to provide interactive tools for understanding, analyzing, and generating content based on the provided material.

## User Preferences

Preferred communication style: Simple, everyday language.
- Chat interface should be much larger (made 420px wide)
- User input should be a large textarea, not small input field
- Email functionality should only appear when user clicks on a specific response, not as a persistent input field
- AI responses should be very short (3-4 sentences maximum) unless user specifically asks for elaboration
- Enter key should send messages (Shift+Enter for new lines)

## Recent Progress (August 2025)

### Content Generation Token Limit Fix ✅
- Fixed critical truncation issue affecting study guides, quizzes, and practice tests
- Increased AI model token limits from 500 to 4000 tokens for comprehensive content generation
- Created high-token specialized functions for all AI models (OpenAI, Anthropic, DeepSeek, Perplexity)
- All content generation features now produce complete, full-length responses without cutting off mid-sentence

### Show Practice Quiz Fix ✅
- Fixed "Show Practice Quiz" button incorrectly redirecting to generation instead of displaying preset content
- Updated content rendering logic to handle both object and string-based preset quiz content
- Added proper markdown formatting for string-based quiz content with headers and styling
- Users can now instantly access pre-existing practice quizzes without waiting for generation

### Show Solutions Feature Implementation ✅
- Added "Show Solutions" button to all practice homework, quizzes, and tests
- Students can instantly view answers and explanations without completing assignments
- Solutions appear alongside submit button, allowing students to study then still complete practice
- Enhanced practice content structure with proper answers and explanations for interactive learning

### HTML Rendering Fix ✅  
- Fixed lecture summary display showing raw HTML markup instead of formatted content
- Implemented proper HTML rendering with dangerouslySetInnerHTML for preset content
- Added dark mode support and prose styling for lecture summaries
- Enhanced content processing to handle both preset HTML and AI-generated markdown

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

### Development Environment
- **Dev Server**: Vite with HMR and error overlay
- **Environment**: Replit-optimized with cartographer integration
- **Type Checking**: TypeScript strict mode enabled

### Key Capabilities
- **Document Processing**: Pre-loaded academic content with structured sections, auto-generated navigation, and mathematical notation rendering.
- **AI Integration**: Multi-model support (DeepSeek, OpenAI GPT-4, Claude 4, Perplexity) with full document context for chat Q&A and content modification.
- **Interactive Features**: Text highlighting and selection with context-aware "Discuss" functionality, rewrite capabilities (full document or selected chunks), quiz/test creation, study guide generation, and podcast script summarization.
- **Practice System**: Complete interactive practice homework, quizzes, and tests with instant "Show Solutions" functionality, symbolic logic keyboard, and performance tracking.
- **User Interface**: Responsive design with a navigation sidebar, AI model selector, chat interface, and instruction box. Export features include PDF generation and text copying.
- **Freemium Model**: Provides real AI-generated previews for unregistered users, with full functionality enabled by credit purchases.
- **Security**: Secure payment verification system.

### System Design Choices
- **UI/UX**: Focus on maximizing content display space, clear typography, and accessible component primitives. Responsive design for mobile and desktop.
- **Data Flow**: Static content loading, user interaction via chat/instruction, AI processing with document context, response handling with math rendering, and session persistence in the database.
- **Content Handling**: Implemented robust text extraction and formatting to maintain academic integrity and readability, including precise handling of mathematical notation and philosophical propositions.
- **AI Integration**: Utilizes multiple AI models with a focus on context-awareness and user-defined instructions, enabling diverse applications from content analysis to interactive learning tools.
- **Scalability**: Features like intelligent chunking for large documents ensure performance and prevent payload overflow.

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