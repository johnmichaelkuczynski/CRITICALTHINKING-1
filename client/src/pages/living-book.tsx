import { useState, useEffect } from "react";
import { BookOpen, Edit3, FileText, User, LogOut, CreditCard, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation-sidebar";
import DocumentContent from "@/components/document-content";

import ChatInterface from "@/components/chat-interface";
import ModelSelector from "@/components/model-selector";
import MathToggle from "@/components/math-toggle";
import RewriteModal from "@/components/rewrite-modal";
import PassageDiscussionModal from "@/components/passage-discussion-modal";
import QuizModal from "@/components/quiz-modal";
import StudyGuideModal from "@/components/study-guide-modal";
import StudentTestModal from "@/components/student-test-modal";
import PodcastModal from "@/components/podcast-modal";

import ChunkingModal from "@/components/chunking-modal";
import AuthModal from "@/components/auth-modal";
import PaymentModal from "@/components/payment-modal";


import { initializeMathRenderer } from "@/lib/math-renderer";
import { bookContent } from "@shared/book-content";
import { useAuth } from "@/hooks/use-auth";

// Create local helper function
const getFullDocumentContent = (): string => {
  return bookContent.sections.map((section: any) => `${section.title}\n\n${section.content}`).join('\n\n');
};
import type { AIModel } from "@shared/schema";

interface LivingBookProps {
  openSection?: string | null;
}

export default function LivingBook({ openSection }: LivingBookProps = {}) {
  const { user, logout, isAuthenticated } = useAuth();
  const [selectedModel, setSelectedModel] = useState<AIModel>("openai");
  const [mathMode, setMathMode] = useState<boolean>(true);

  const [selectedTextForChat, setSelectedTextForChat] = useState<string>("");
  const [rewriteModalOpen, setRewriteModalOpen] = useState(false);
  const [rewriteMode, setRewriteMode] = useState<"selection" | "chunks">("chunks");
  const [selectedTextForRewrite, setSelectedTextForRewrite] = useState<string>("");
  const [passageDiscussionOpen, setPassageDiscussionOpen] = useState(false);
  const [selectedTextForDiscussion, setSelectedTextForDiscussion] = useState<string>("");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedTextForQuiz, setSelectedTextForQuiz] = useState<string>("");
  const [quizChunkIndex, setQuizChunkIndex] = useState<number | null>(null);
  const [studyGuideModalOpen, setStudyGuideModalOpen] = useState(false);
  const [selectedTextForStudyGuide, setSelectedTextForStudyGuide] = useState<string>("");
  const [studyGuideChunkIndex, setStudyGuideChunkIndex] = useState<number | null>(null);
  const [studentTestModalOpen, setStudentTestModalOpen] = useState(false);
  const [selectedTextForStudentTest, setSelectedTextForStudentTest] = useState<string>("");
  const [studentTestChunkIndex, setStudentTestChunkIndex] = useState<number | null>(null);
  const [podcastModalOpen, setPodcastModalOpen] = useState(false);
  const [selectedTextForPodcast, setSelectedTextForPodcast] = useState<string>("");
  const [podcastChunkIndex, setPodcastChunkIndex] = useState<number | null>(null);

  const [chunkingModalOpen, setChunkingModalOpen] = useState(false);
  const [pendingChunkText, setPendingChunkText] = useState<string>("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);



  useEffect(() => {
    initializeMathRenderer();
  }, []);

  // Auto-navigate to specific section when openSection prop changes
  useEffect(() => {
    if (openSection) {
      // Wait a bit for the content to render before trying to scroll
      setTimeout(() => {
        console.log(`Auto-navigating to section: ${openSection}`);
        
        // First try to find exact section ID match
        let element = document.getElementById(openSection);
        console.log(`Found element by ID: ${!!element}`);
        
        if (element) {
          console.log(`Scrolling to section: ${element.id}`);
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Add a temporary highlight to show the user where they landed
          element.style.backgroundColor = '#fef3c7';
          setTimeout(() => {
            if (element) {
              element.style.backgroundColor = '';
            }
          }, 3000);
        } else {
          // Fallback: try to find by text content patterns like NavigationSidebar does
          const titleMap: { [key: string]: string } = {
            // Week 1 content patterns
            "section-1": "Week 1",
            "introduction-to-logic": "Introduction to Logic",
            "basic-concepts": "Statement (Proposition):",
            "basic-logical-symbols": "Basic Logical Symbols",
            "material-vs-strict-implication": "Material vs. Strict Implication",
            "translation-practice": "Translation Practice",
            "homework-1": "Symbolic Logic - Homework 1",
            
            // Week 2 content patterns
            "section-2": "Week 2",
            "propositional-calculus": "The Propositional Calculus",
            "truth-tables": "Truth Tables",
            "elementary-proofs": "Elementary Proofs",
            "de-morgans-laws": "De Morgan's Laws",
            "homework-2": "Symbolic Logic - Homework 2",
            
            // Week 3 content patterns
            "section-3": "Week 3",
            "boolean-algebra": "Introduction to Boolean Algebra",
            "boolean-operations": "NOT (Complement) Symbol:",
            "boolean-laws": "Fundamental Laws of Boolean Algebra",
            "boolean-functions": "Boolean Functions and Truth Tables",
            "homework-3": "Symbolic Logic - Homework 3",
            
            // Week 4 content patterns
            "section-4": "Week 4",
            "quantification-concepts": "Basic Concepts of Quantification",
            "universal-quantifier": "Universal Quantifier (∀)",
            "existential-quantifier": "Existential Quantifier (∃)",
            "complex-quantification": "Complex Quantification",
            "homework-4": "Symbolic Logic - Homework 4",
            
            // Week 5 content patterns
            "section-5": "Week 5",
            "advanced-translation": "Advanced Translation Patterns",
            "uniqueness-quantifier": "Uniqueness Quantifier (∃!)",
            "mathematical-logic": "Mathematical Logic Applications",
            "homework-5": "Symbolic Logic - Homework 5",
            
            // Week 6 content patterns
            "section-6": "Week 6",
            "models-introduction": "Introduction to Models",
            "model-definition": "Definition of a Model",
            "proving-invalidity": "Proving Invalidity",
            "homework-6": "Symbolic Logic - Homework 6",
            
            // Week 7 content patterns
            "section-7": "Week 7",
            "recursive-number-systems": "Recursive Number Systems",
            "natural-numbers": "Natural Numbers (ℕ)",
            "statement-classes": "Statement Classes",
            "homework-7": "Symbolic Logic - Homework 7",
            
            // Week 8 content patterns
            "section-8": "Week 8",
            "basic-concepts-review": "Basic Concepts Review",
            "truth-tables-review": "Truth Tables Review",
            "quantifier-logic-review": "Quantifier Logic Review",
            "exam-preparation": "Exam Preparation",
            
            // Week 9 content patterns
            "section-9": "Week 9",
            "final-exam": "Final Exam",
            "course-conclusion": "Course Conclusion"
          };

          const searchPattern = titleMap[openSection];
          if (searchPattern) {
            console.log(`Searching for text pattern: ${searchPattern}`);
            
            // Search for headings or elements containing this text
            const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .chunk-content, p, div');
            for (let i = 0; i < allElements.length; i++) {
              const el = allElements[i];
              if (el.textContent && el.textContent.includes(searchPattern)) {
                console.log(`Found element with text: ${searchPattern}`);
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                
                // Add highlight
                (el as HTMLElement).style.backgroundColor = '#fef3c7';
                setTimeout(() => {
                  (el as HTMLElement).style.backgroundColor = '';
                }, 3000);
                break;
              }
            }
          }
        }
      }, 500); // Give content time to render
    }
  }, [openSection]);



  const handleTextSelectedForChat = (text: string) => {
    setSelectedTextForChat(text);
  };

  const handleSelectedTextUsed = () => {
    setSelectedTextForChat("");
  };



  const handleRewriteFromSelection = (text: string) => {
    setSelectedTextForRewrite(text);
    setRewriteMode("selection");
    setRewriteModalOpen(true);
  };

  const handleChunkRewrite = () => {
    setSelectedTextForRewrite("");
    setRewriteMode("chunks");
    setRewriteModalOpen(true);
  };

  const handleRewriteModalClose = () => {
    setRewriteModalOpen(false);
    setSelectedTextForRewrite("");
  };

  const handlePassageDiscussion = (text: string) => {
    setSelectedTextForDiscussion(text);
    setPassageDiscussionOpen(true);
  };

  const handlePassageDiscussionClose = () => {
    setPassageDiscussionOpen(false);
    setSelectedTextForDiscussion("");
  };



  const handleChunkAction = (chunk: string, chunkIndex: number, action: 'quiz' | 'chat' | 'rewrite' | 'study-guide' | 'student-test' | 'podcast') => {
    if (action === 'quiz') {
      setSelectedTextForQuiz(chunk);
      setQuizChunkIndex(chunkIndex);
      setQuizModalOpen(true);
    } else if (action === 'chat') {
      setSelectedTextForChat(chunk);
    } else if (action === 'rewrite') {
      setSelectedTextForRewrite(chunk);
      setRewriteMode("selection");
      setRewriteModalOpen(true);
    } else if (action === 'study-guide') {
      setSelectedTextForStudyGuide(chunk);
      setStudyGuideChunkIndex(chunkIndex);
      setStudyGuideModalOpen(true);
    } else if (action === 'student-test') {
      setSelectedTextForStudentTest(chunk);
      setStudentTestChunkIndex(chunkIndex);
      setStudentTestModalOpen(true);
    } else if (action === 'podcast') {
      setSelectedTextForPodcast(chunk);
      setPodcastChunkIndex(chunkIndex);
      setPodcastModalOpen(true);
    }
  };

  const handleCreateStudyGuideFromSelection = (text: string) => {
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      setPendingChunkText(text);
      setChunkingModalOpen(true);
    } else {
      setSelectedTextForStudyGuide(text);
      setStudyGuideChunkIndex(null);
      setStudyGuideModalOpen(true);
    }
  };

  const handleCreatePodcastFromSelection = (text: string) => {
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      setPendingChunkText(text);
      setChunkingModalOpen(true);
    } else {
      setSelectedTextForPodcast(text);
      setPodcastChunkIndex(null);
      setPodcastModalOpen(true);
    }
  };

  const handleTestMeFromSelection = (text: string) => {
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      setPendingChunkText(text);
      setChunkingModalOpen(true);
    } else {
      setSelectedTextForStudentTest(text);
      setStudentTestChunkIndex(null);
      setStudentTestModalOpen(true);
    }
  };

  const handleStudyGuideModalClose = () => {
    setStudyGuideModalOpen(false);
    setSelectedTextForStudyGuide("");
    setStudyGuideChunkIndex(null);
  };

  const handleStudentTestModalClose = () => {
    setStudentTestModalOpen(false);
    setSelectedTextForStudentTest("");
    setStudentTestChunkIndex(null);
  };

  const handlePodcastModalClose = () => {
    setPodcastModalOpen(false);
    setSelectedTextForPodcast("");
    setPodcastChunkIndex(null);
  };



  const handleQuizModalClose = () => {
    setQuizModalOpen(false);
    setSelectedTextForQuiz("");
    setQuizChunkIndex(null);
  };

  const handleChunkingModalClose = () => {
    setChunkingModalOpen(false);
    setPendingChunkText("");
  };

  const openAuthModal = (tab: "login" | "register") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };





  const getFullDocumentText = () => {
    return bookContent.sections
      .map((section: any) => section.content)
      .join('\n\n');
  };



  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-1 sm:space-x-3">
              <BookOpen className="text-primary text-base sm:text-lg" />
              <div className="flex flex-col">
                <h1 className="font-inter font-semibold text-sm sm:text-base text-foreground">
                  Critical Thinking
                </h1>
                <a 
                  href="mailto:contact@zhisystems.ai"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline hidden sm:block"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 overflow-x-auto">
              <MathToggle 
                mathMode={mathMode} 
                onToggle={setMathMode} 
              />

              <Button
                variant="outline"
                size="sm"
                onClick={handleChunkRewrite}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Rewrite Document</span>
                <span className="sm:hidden">Rewrite</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const fullText = getFullDocumentContent();
                  handleCreateStudyGuideFromSelection(fullText);
                }}
                className="flex items-center space-x-1 sm:space-x-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Study Guide</span>
                <span className="sm:hidden">Guide</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const fullText = getFullDocumentContent();
                  handleCreatePodcastFromSelection(fullText);
                }}
                className="flex items-center space-x-1 sm:space-x-2 text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">Podcast</span>
                <span className="sm:hidden">Audio</span>
              </Button>

              <ModelSelector 
                selectedModel={selectedModel} 
                onModelChange={setSelectedModel} 
              />

              {/* Authentication section - MOBILE RESPONSIVE */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-1 sm:space-x-2 border-l pl-1 sm:pl-2 ml-1 sm:ml-2">
                  <div className="text-xs sm:text-sm hidden md:block">
                    <span className="font-medium">{user.username}</span>
                    <div className="text-xs text-muted-foreground">
                      {(user.credits || 0).toLocaleString()} credits
                    </div>
                  </div>
                  <div className="text-xs block md:hidden">
                    <span className="font-medium">{(user.credits || 0).toLocaleString()}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentModalOpen(true)}
                    className="flex items-center space-x-1"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Buy Credits</span>
                    <span className="sm:hidden">Buy</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-1 sm:space-x-2 border-l pl-1 sm:pl-2 ml-1 sm:ml-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAuthModal("login")}
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openAuthModal("register")}
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Register</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-none w-full main-content-with-bottom-bar">
        {/* Navigation Sidebar - MOBILE FIX: Wider for readability, normal on desktop */}
        <div className="w-20 md:w-60 flex-shrink-0">
          <NavigationSidebar />
        </div>

        {/* Main Content Area - MOBILE FIX: Maximum space, normal on desktop */}
        <main className="flex-1 max-w-none md:max-w-5xl px-1 md:px-4">
          {/* Document Content */}
          <DocumentContent 
            mathMode={mathMode}
            onTextSelectedForChat={handleTextSelectedForChat}
            onRewriteFromSelection={handleRewriteFromSelection}
            onPassageDiscussion={handlePassageDiscussion}
            onCreateStudyGuide={handleCreateStudyGuideFromSelection}
            onTestMe={handleTestMeFromSelection}
            onCreatePodcast={handleCreatePodcastFromSelection}
          />
        </main>

        {/* Chat Panel - MOBILE FIX: Very narrow on mobile, normal on desktop */}
        <div className="w-4 md:w-96 flex-shrink-0">
          <ChatInterface 
            selectedModel={selectedModel} 
            mathMode={mathMode}
            selectedText={selectedTextForChat}
            onSelectedTextUsed={() => setSelectedTextForChat("")}
          />
        </div>
      </div>



      {/* Rewrite Modal */}
      <RewriteModal
        isOpen={rewriteModalOpen}
        onClose={handleRewriteModalClose}
        selectedModel={selectedModel}
        mode={rewriteMode}
        selectedText={selectedTextForRewrite}
        fullDocumentText={getFullDocumentContent()}
      />

      {/* Passage Discussion Modal */}
      <PassageDiscussionModal
        isOpen={passageDiscussionOpen}
        onClose={handlePassageDiscussionClose}
        selectedText={selectedTextForDiscussion}
        selectedModel={selectedModel}
        mathMode={mathMode}
      />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={quizModalOpen}
        onClose={handleQuizModalClose}
        sourceText={selectedTextForQuiz}
        chunkIndex={quizChunkIndex}
        selectedModel={selectedModel}
      />

      {/* Study Guide Modal */}
      <StudyGuideModal
        isOpen={studyGuideModalOpen}
        onClose={handleStudyGuideModalClose}
        sourceText={selectedTextForStudyGuide}
        chunkIndex={studyGuideChunkIndex}
        selectedModel={selectedModel}
      />

      {/* Student Test Modal */}
      <StudentTestModal
        isOpen={studentTestModalOpen}
        onClose={handleStudentTestModalClose}
        selectedText={selectedTextForStudentTest}
        selectedModel={selectedModel}
        mathMode={mathMode}
        chunkIndex={studentTestChunkIndex ?? undefined}
      />

      {/* Podcast Modal */}
      <PodcastModal
        isOpen={podcastModalOpen}
        onClose={handlePodcastModalClose}
        sourceText={selectedTextForPodcast}
        chunkIndex={podcastChunkIndex}
      />

      {/* Chunking Modal */}
      <ChunkingModal
        isOpen={chunkingModalOpen}
        onClose={handleChunkingModalClose}
        text={pendingChunkText}
        onChunkAction={handleChunkAction}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

    </div>
  );
}
