import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Send, Brain, BookOpen, Target, Lightbulb, Calculator } from "lucide-react";
import { renderMathInElement } from "@/lib/math-renderer";
import QuizModal from "@/components/quiz-modal";

interface TutorMessage {
  id: string;
  type: 'user' | 'tutor';
  content: string;
  timestamp: Date;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  hasQuestion?: boolean;
  evaluation?: {
    correct: boolean;
    explanation: string;
    nextLevel: 'advance' | 'reinforce' | 'remediate';
  };
}

interface TutorSession {
  messages: TutorMessage[];
  currentTopic?: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  weaknessAreas: string[];
  strengthAreas: string[];
}

export default function TutorMe() {
  const [input, setInput] = useState("");
  const [session, setSession] = useState<TutorSession>({
    messages: [],
    userLevel: 'beginner',
    weaknessAreas: [],
    strengthAreas: []
  });
  const [isAwaitingAnswer, setIsAwaitingAnswer] = useState(false);
  const [showSymbolKeyboard, setShowSymbolKeyboard] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Symbol categories for the keyboard
  const logicalSymbols = [
    { symbol: '∀', name: 'For all' },
    { symbol: '∃', name: 'There exists' },
    { symbol: '∧', name: 'And' },
    { symbol: '∨', name: 'Or' },
    { symbol: '¬', name: 'Not' },
    { symbol: '→', name: 'Implies' },
    { symbol: '↔', name: 'If and only if' },
    { symbol: '⊃', name: 'Material conditional' },
    { symbol: '≡', name: 'Equivalent' },
    { symbol: '⊨', name: 'Entails' },
    { symbol: '⊢', name: 'Proves' },
    { symbol: '⊥', name: 'Contradiction' }
  ];

  const mathSymbols = [
    { symbol: '≤', name: 'Less than or equal' },
    { symbol: '≥', name: 'Greater than or equal' },
    { symbol: '≠', name: 'Not equal' },
    { symbol: '∈', name: 'Element of' },
    { symbol: '∉', name: 'Not element of' },
    { symbol: '⊆', name: 'Subset' },
    { symbol: '⊊', name: 'Proper subset' },
    { symbol: '∪', name: 'Union' },
    { symbol: '∩', name: 'Intersection' },
    { symbol: '∅', name: 'Empty set' },
    { symbol: '∞', name: 'Infinity' },
    { symbol: '±', name: 'Plus minus' }
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [session.messages]);

  // Render math after messages update
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        renderMathInElement(document.body);
      }, 100);
    }
  }, [session.messages]);

  const tutorMutation = useMutation({
    mutationFn: async ({ message, isAnswer }: { message: string; isAnswer: boolean }) => {
      const response = await apiRequest('/api/tutor', {
        method: 'POST',
        body: JSON.stringify({ 
          message, 
          isAnswer,
          session: {
            messages: session.messages,
            currentTopic: session.currentTopic,
            userLevel: session.userLevel,
            weaknessAreas: session.weaknessAreas,
            strengthAreas: session.strengthAreas
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    },
    onSuccess: (data: any, variables) => {
      // Add user message
      const userMessage: TutorMessage = {
        id: Date.now().toString() + '_user',
        type: 'user',
        content: variables.message,
        timestamp: new Date()
      };

      // Add tutor response
      const tutorMessage: TutorMessage = {
        id: Date.now().toString() + '_tutor',
        type: 'tutor',
        content: data.response,
        timestamp: new Date(),
        difficulty: data.difficulty,
        hasQuestion: data.hasQuestion,
        evaluation: data.evaluation
      };

      setSession(prev => {
        const newSession = {
          ...prev,
          messages: [...prev.messages, userMessage, tutorMessage],
          userLevel: data.performance?.currentLevel || prev.userLevel
        };

        // Update session based on evaluation
        if (data.evaluation) {
          if (data.evaluation.correct) {
            newSession.strengthAreas = Array.from(new Set([...prev.strengthAreas, data.topic || 'general']));
          } else {
            newSession.weaknessAreas = Array.from(new Set([...prev.weaknessAreas, data.topic || 'general']));
          }
        }

        if (data.topic) {
          newSession.currentTopic = data.topic;
        }

        return newSession;
      });

      setIsAwaitingAnswer(data.hasQuestion);
      setInput("");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || tutorMutation.isPending) return;

    tutorMutation.mutate({ 
      message: input.trim(), 
      isAnswer: isAwaitingAnswer 
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const insertSymbol = (symbol: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = input.slice(0, start) + symbol + input.slice(end);
      setInput(newValue);
      
      // Set cursor position after the inserted symbol
      setTimeout(() => {
        textarea.setSelectionRange(start + symbol.length, start + symbol.length);
        textarea.focus();
      }, 0);
    }
  };

  // Format tutor messages to make THE SINGLE QUESTION distinct and prominent
  const formatTutorMessage = (content: string) => {
    // Look for questions marked with **Question:** pattern and make them stand out
    let formatted = content.replace(
      /\*\*Question:\*\*(.*?)(?=\n\n|$)/g,
      '<div class="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4 rounded-r">' +
      '<div class="font-bold text-blue-800 dark:text-blue-200 mb-2 text-lg">📝 Question:</div>' +
      '<div class="text-blue-700 dark:text-blue-300 font-medium text-base leading-relaxed">$1</div>' +
      '</div>'
    );

    // Also catch standalone questions that end with ?
    formatted = formatted.replace(
      /^(.+\?)\s*$/gm,
      '<div class="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-3 rounded-r text-blue-700 dark:text-blue-300 font-medium text-base">📝 $1</div>'
    );

    return formatted;
  };

  const getMessageIcon = (message: TutorMessage) => {
    if (message.type === 'user') return null;
    
    if (message.evaluation) {
      return message.evaluation.correct ? 
        <Target className="h-4 w-4 text-green-600" /> : 
        <Lightbulb className="h-4 w-4 text-yellow-600" />;
    }
    
    if (message.hasQuestion) {
      return <BookOpen className="h-4 w-4 text-blue-600" />;
    }
    
    return <Brain className="h-4 w-4 text-purple-600" />;
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              Tutor Me
            </h1>
            <p className="text-muted-foreground mt-1">
              Get personalized tutoring with adaptive questions and feedback
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(session.userLevel)}>
              Level: {session.userLevel}
            </Badge>
            {session.currentTopic && (
              <Badge variant="outline">
                Topic: {session.currentTopic}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Performance Tracking Display */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Questions Answered</div>
            <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
              {session.messages.filter(m => m.evaluation).length}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3">
            <div className="text-sm font-medium text-green-800 dark:text-green-200">Overall Accuracy</div>
            <div className="text-xl font-bold text-green-900 dark:text-green-100">
              {session.messages.filter(m => m.evaluation).length > 0 
                ? Math.round((session.messages.filter(m => m.evaluation?.correct).length / 
                   session.messages.filter(m => m.evaluation).length) * 100)
                : 0}%
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-3">
            <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Difficulty Level</div>
            <div className="text-xl font-bold text-purple-900 dark:text-purple-100 capitalize">
              {session.userLevel}
            </div>
          </div>
        </div>

        {(session.strengthAreas.length > 0 || session.weaknessAreas.length > 0) && (
          <div className="mt-4 flex gap-4">
            {session.strengthAreas.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-600">Strengths:</span>
                <div className="flex gap-1">
                  {session.strengthAreas.map(area => (
                    <Badge key={area} variant="outline" className="text-green-600 border-green-200">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {session.weaknessAreas.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-yellow-600">Focus Areas:</span>
                <div className="flex gap-1">
                  {session.weaknessAreas.map(area => (
                    <Badge key={area} variant="outline" className="text-yellow-600 border-yellow-200">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4">
            {session.messages.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Welcome to Your Personal Tutor!
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Ask me about any topic you're learning. I'll provide explanations, 
                    ask you questions to check your understanding, and adapt to your level.
                  </p>
                  <div className="mt-6 space-y-3">
                    <Button 
                      onClick={() => setShowQuizModal(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      🎯 Start Practice Quiz (10 Questions)
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Or ask: "I'm confused about logical models" or "Explain deductive reasoning"
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {session.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  } rounded-lg p-4`}
                >
                  <div className="flex items-start gap-3">
                    {message.type === 'tutor' && (
                      <div className="flex-shrink-0 mt-1">
                        {getMessageIcon(message)}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      {message.type === 'tutor' && message.difficulty && (
                        <Badge className={`${getDifficultyColor(message.difficulty)} mb-2`}>
                          {message.difficulty}
                        </Badge>
                      )}
                      
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: formatTutorMessage(message.content) }}
                      />
                      

                      
                      <div className="text-xs text-muted-foreground mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-6 border-t border-border bg-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isAwaitingAnswer 
                  ? "📝 ANSWER THE QUESTION ABOVE: Type your response to the specific question shown above..."
                  : "Ask me anything you want to learn about Critical Thinking..."
              }
              className="min-h-[120px] text-base resize-none pr-16"
              disabled={tutorMutation.isPending}
            />
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || tutorMutation.isPending}
              className="absolute bottom-3 right-3"
            >
              {tutorMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Symbol Keyboard */}
          {showSymbolKeyboard && (
            <Card className="border border-border">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-foreground">Logical Symbols</h4>
                    <div className="grid grid-cols-6 gap-2">
                      {logicalSymbols.map((item) => (
                        <Button
                          key={item.symbol}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => insertSymbol(item.symbol)}
                          className="h-8 w-12 text-lg font-medium hover:bg-primary hover:text-primary-foreground"
                          title={item.name}
                        >
                          {item.symbol}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-foreground">Mathematical Symbols</h4>
                    <div className="grid grid-cols-6 gap-2">
                      {mathSymbols.map((item) => (
                        <Button
                          key={item.symbol}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => insertSymbol(item.symbol)}
                          className="h-8 w-12 text-lg font-medium hover:bg-primary hover:text-primary-foreground"
                          title={item.name}
                        >
                          {item.symbol}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div>
                {isAwaitingAnswer ? (
                  <span className="text-blue-600 font-medium">Waiting for your answer...</span>
                ) : (
                  "Press Enter to send, Shift+Enter for new line"
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSymbolKeyboard(!showSymbolKeyboard)}
                className="text-xs h-6 px-2"
              >
                <Calculator className="h-3 w-3 mr-1" />
                {showSymbolKeyboard ? 'Hide' : 'Show'} Symbols
              </Button>
            </div>
            <div className="text-xs">
              Click symbols or type: ∀, ∃, ∧, ∨, →, ↔, ¬, ≡, ⊃, ⊨
            </div>
          </div>
        </form>
      </div>

      {/* Quiz Modal for Practice Quizzes */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        sourceText="Critical Thinking concepts including reasoning, fallacies, argument analysis, evidence evaluation, and logical principles"
        selectedModel="openai"
      />
    </div>
  );
}