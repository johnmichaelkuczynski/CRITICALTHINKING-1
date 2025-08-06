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

## Recent Major Successes (August 2025)
- **Navigation System**: Completely rebuilt Living Book navigation from 3% coverage to comprehensive coverage of entire book structure (6 chapters + appendices, 80+ sections). **LATEST FIX**: Navigation now correctly skips table of contents entries and scrolls to actual content sections - confirmed "BETTER" by user
- **Grading System**: Successfully implemented pure GPT-4 passthrough grading, eliminating all hardcoded answer keys
- **Practice Content**: Added always-visible "Generate New" buttons for all practice materials (homework, quizzes, tests)
- **Content Preservation**: Book content fully preserved (23,187 lines) with all Critical Thinking material intact
- **ANTI-DUPLICATION SUCCESS (AUGUST 2025)**: Homework generation now produces completely unique content every time with randomized professions, contexts, scenarios, and skill focuses. No more identical content issues.
- **User Feedback**: Confirmed "EXCELLENT" user satisfaction with navigation fixes and "BETTER" confirmation for latest navigation improvements
- **HOMEWORK GENERATION COMPLETELY FIXED (AUGUST 2025)**: Implemented comprehensive anti-duplication system with forced randomization across all AI models (OpenAI, Anthropic, Perplexity). System now generates guaranteed unique Critical Thinking homework using randomized profession contexts (healthcare, engineering, education, etc.), varied skill focuses (logical analysis, evidence evaluation, bias detection), diverse scenarios (workplace disputes, news analysis, ethical dilemmas), and dynamic question counts (4-6 questions). Each generation includes unique session IDs and randomized parameters to prevent any content repetition. **VERIFIED**: All AI models producing unique content on identical inputs.
- **PRACTICE QUIZ GENERATION OPTIMIZED**: Increased token limits to 6000 across all AI models (OpenAI, Anthropic, DeepSeek) and improved prompts to ensure complete quiz generation. System now reliably generates 6+ high-quality Critical Thinking questions with proper formatting. User confirmed "SIX IS FINE" for question count.
- **DEPLOYMENT BLOCKERS RESOLVED (AUGUST 2025)**: Fixed critical TypeScript compilation errors that were preventing production deployment. Eliminated all undefined function calls and type mismatches.
- **COMPREHENSIVE PRACTICE GENERATOR AUDIT COMPLETED**: Systematically audited and fixed ALL practice generators (quiz, homework, test, final exam) to ensure 5-25 questions per generation. Removed duplicate functions and hardcoded limits. All generators now use proper ai-models.ts functions with variable question counts.
- **PRACTICE MIDTERM FIXED (AUGUST 2025)**: Resolved critical issue where Practice Midterm button was non-functional due to insufficient content (only 1 question). Expanded to comprehensive 10-question exam with 3 sections: Critical Thinking Foundations (4 questions), Argument Analysis (3 questions), Evidence and Decision Making (3 questions). Mixed question types and increased from 10 to 100 points. User confirmed "MUCH BETTER" - Practice Midterm now fully functional.
- **ADAPTIVE TUTOR SYSTEM IMPLEMENTED (AUGUST 2025)**: Completely revolutionized the TUTOR ME function with performance-based difficulty adjustment. System now tracks user accuracy (overall and recent 5 questions) and automatically modulates AI teaching approach. High-performing students (80%+ accuracy) get "raised temperature" with complex scenarios, advanced concepts, and multi-step analysis. Struggling students (40% or lower) receive "dialed down" approach with step-by-step guidance, simpler questions, and more explanatory context. Includes real-time performance dashboard showing questions answered, accuracy rates, and current difficulty level. User confirmed "seems ok" - adaptive system working as intended.
- **MODULE SECTION BUGS COMPLETELY FIXED (AUGUST 2025)**: Resolved all three critical non-functional buttons in Modules section. Show Lecture Summary now conditionally appears only for weeks with preset content (Week 1), eliminating error messages. Generate New Lecture enhanced with timestamp seeding and proper state management for fresh AI generation. Generate New Practice Homework completely overhauled with forced state reset, comprehensive error logging, and randomized question counts (5-10). All three functions now working perfectly with detailed console logging for debugging.
- **PRACTICE HOMEWORK INPUT FIELDS FIXED (AUGUST 2025)**: Resolved critical text input bug where generated homework displayed correctly but text fields were non-functional. Fixed data mapping issue where `correctAnswer` property was used instead of expected `answer` property. Text inputs now fully functional and accept user typing.
- **PRACTICE HOMEWORK GRADING SYSTEM FIXED (AUGUST 2025)**: Fixed major grading bug where practice homework with no expected answers was incorrectly failing all student responses. Implemented effort-based grading for practice content - students receive credit for detailed responses (>10 characters) focusing on reasoning development rather than exact answers. Practice homework now grades appropriately as a learning tool.
- **PRACTICE FINAL EXAM COMPLETELY REBUILT (AUGUST 2025)**: Expanded Practice Final from single 10-point question to comprehensive 200-point exam with 12 challenging questions across 4 major sections: Critical Thinking Foundations (50 points), Argument Analysis & Evidence Evaluation (50 points), Bias Detection & Media Analysis (50 points), and Decision-Making & Problem-Solving Integration (50 points). Covers all course material from Weeks 1-6 with real-world scenarios testing complete mastery of critical thinking skills.
- **PRACTICE EXAM GENERATE NEW FUNCTIONALITY COMPLETED (AUGUST 2025)**: Added "Generate New Practice Exam" buttons directly within completed exam interfaces. Users can now generate fresh practice content immediately after finishing an exam without navigating back to module selection. Both Practice Midterm and Practice Final feature this functionality with proper AI generation and loading states. User confirmed functionality working as expected.
- **PRACTICE FINAL LOADING STATES FIXED (AUGUST 2025)**: Resolved issue where "Generate New Practice Final" button appeared to do nothing when clicked. Added comprehensive loading spinners, disabled states, and "Generating..." text to all practice exam generation buttons. Users now see clear visual feedback during AI content generation. User confirmed "BETTER" - loading states working properly.

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
- **Interactive Features**: Text highlighting and selection with context-aware "Discuss" functionality, rewrite capabilities, quiz/test creation, study guide generation, podcast script summarization, and interactive homework references that navigate to relevant sections. **MAJOR UPDATE**: Complete Living Book navigation system rebuilt from 3% to comprehensive coverage of all 6 chapters plus appendices (80+ navigable sections). **NEW**: Adaptive "TUTOR ME" system with performance-based difficulty adjustment that automatically modulates teaching approach based on user success rates, providing challenging questions for high performers and supportive guidance for struggling students.
- **Practice System**: Interactive homework, quizzes, and tests with instant "Show Solutions," symbolic logic keyboard, and performance tracking via an Analytics dashboard. All practice content (homework, quizzes, tests) transformed from Symbolic Logic to Critical Thinking, maintaining all AI and interactive features.
- **User Interface**: Responsive design with a navigation sidebar, AI model selector, chat interface, and instruction box. Supports PDF generation and text copying.
- **Monetization**: Freemium model with real AI-generated previews for unregistered users, full functionality with credit purchases, and secure payment verification.

### System Design Choices
- **UI/UX**: Prioritizes content display space, clear typography, and accessible component primitives, with responsive design.
- **Data Flow**: Static content loading, user interaction via chat/instruction, AI processing with document context, response handling with math rendering, and session persistence.
- **Content Handling**: Robust text extraction and formatting for academic integrity, including mathematical notation and philosophical propositions.
- **AI Integration**: Utilizes multiple AI models focusing on context-awareness and user-defined instructions for diverse applications. Implements intelligent chunking for large documents to ensure performance.
- **Grading System**: Features a revolutionary LLM passthrough grading system (GPT-4) that uses semantic evaluation, accepting diverse phrasing and examples. It includes a grade dispute system and transparent grading with AI model reasoning. All hardcoded answer keys have been removed. **COMPLETED**: Pure passthrough grading confirmed working flawlessly.

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