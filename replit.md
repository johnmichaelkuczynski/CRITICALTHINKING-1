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

### AI & Speech Services API Key Activation ✅
- Successfully activated all AI model API keys: OpenAI GPT-4, Anthropic Claude, Perplexity, and DeepSeek
- Configured Azure Speech services with regional endpoint for speech-to-text and text-to-speech
- Added Google Speech API integration for enhanced voice recognition capabilities
- All AI content generation features now fully operational with multiple model options
- Speech services enabled for audio transcription and voice interaction features

### View in Book Navigation Fix ✅
- Fixed "View in Book" buttons that were sending users to beginning instead of correct sections
- Implemented automatic section scrolling with visual highlighting when navigating from syllabus
- Added comprehensive section mapping for all course weeks with fallback text search
- Navigation now smoothly scrolls to target sections with temporary yellow highlighting for 3 seconds

### Comprehensive Practice Content Expansion ✅
- Replaced all simple one-question homework with full-length comprehensive assignments
- Week 1-8 homework now ranges from 50-100 points with multiple problems and detailed questions
- Added complex multi-part problems covering translation, proofs, Boolean algebra, quantifiers, models, and advanced topics
- Each assignment includes detailed explanations and progressive difficulty levels

### Complete Course Content Structure ✅
- Week 1: Basic concepts, notation, operators (3 problems, 8 questions, 60 points)
- Week 2: Truth tables, elementary proofs (4 problems, 9 questions, 70 points) 
- Week 3: Boolean algebra, equivalences (3 problems, 10 questions, 75 points)
- Week 4: Quantifier logic, predicates (3 problems, 10 questions, 80 points)
- Week 5: Complex translation, mathematical logic (3 problems, 10 questions, 85 points)
- Week 6: Models, validity proofs (3 problems, 12 questions, 90 points)
- Week 7: Number systems, statement classes (3 problems, 10 questions, 95 points)
- Week 8: Comprehensive review, advanced topics (3 problems, 11 questions, 100 points)

### Practice Center → Analytics Transformation ✅
- Completely replaced Practice Center tab with comprehensive Analytics dashboard
- Renamed tab from "Practice Center" to "Analytics" focusing on performance insights
- Implemented thorough learning analytics including performance trends, strengths/weaknesses analysis
- Added visual performance tracking by practice type, weekly progress, and recent session history
- Removed practice generation functionality from Analytics tab - practice creation now exclusively in Modules
- Enhanced authentication system to properly support API endpoints for practice data retrieval

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

### Grading System Overhaul ✅
- Fixed overly narrow grading that rejected correct logical symbolizations due to notation differences
- Implemented liberal grading logic that accepts multiple notation systems (∧/&/and, ∨/|/or, ¬/~/not, etc.)
- Added semantic equivalence checking that focuses on logical correctness rather than syntax
- Automatic answer reveal after submission - students immediately see correct answers and explanations
- Enhanced post-submission feedback with clear indication that solutions are displayed

### Show Solutions Feature Implementation ✅
- Added "Show Solutions" button to all practice homework, quizzes, and tests
- Students can instantly view answers and explanations without completing assignments
- Solutions appear alongside submit button, allowing students to study then still complete practice
- Enhanced practice content structure with proper answers and explanations for interactive learning

### Complete Preset Quiz Coverage ✅
- Added comprehensive preset practice quizzes for all 8 weeks of content
- Each "Show Practice Quiz" button displays immediate content without generation delays
- Enhanced Week 6 quiz with advanced logic translation and proof problems
- Added Week 7 and 8 quizzes covering temporal logic, second-order logic, and comprehensive review
- All preset quizzes include diverse question types and progressive difficulty levels

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
- **AI Integration**: Multi-model support (DeepSeek, OpenAI GPT-4, Claude 4, Perplexity) with full document context for chat Q&A and content modification. All API services fully activated and operational.
- **Speech Services**: Azure Speech-to-Text/Text-to-Speech and Google Speech API integration for audio transcription and voice interaction features.
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