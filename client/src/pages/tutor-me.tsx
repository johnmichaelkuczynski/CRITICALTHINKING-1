import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Send, Brain, BookOpen, Target, Lightbulb } from "lucide-react";
import { renderMathInElement } from "@/lib/math-renderer";

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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
          messages: [...prev.messages, userMessage, tutorMessage]
        };

        // Update session based on evaluation
        if (data.evaluation) {
          if (data.evaluation.correct) {
            newSession.strengthAreas = Array.from(new Set([...prev.strengthAreas, data.topic || 'general']));
            if (data.evaluation.nextLevel === 'advance') {
              newSession.userLevel = prev.userLevel === 'beginner' ? 'intermediate' : 'advanced';
            }
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
                  <div className="mt-4 text-sm text-muted-foreground">
                    Try: "I'm confused about logical models" or "Explain deductive reasoning"
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
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                      
                      {message.evaluation && (
                        <div className={`mt-3 p-3 rounded border-l-4 ${
                          message.evaluation.correct 
                            ? 'bg-green-50 border-green-400 dark:bg-green-950' 
                            : 'bg-yellow-50 border-yellow-400 dark:bg-yellow-950'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            {message.evaluation.correct ? (
                              <Target className="h-4 w-4 text-green-600" />
                            ) : (
                              <Lightbulb className="h-4 w-4 text-yellow-600" />
                            )}
                            <span className={`font-medium text-sm ${
                              message.evaluation.correct ? 'text-green-700' : 'text-yellow-700'
                            }`}>
                              {message.evaluation.correct ? "You really know your stuff!" : "You might need a little help here"}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            message.evaluation.correct ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {message.evaluation.explanation}
                          </p>
                        </div>
                      )}
                      
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
                  ? "Type your answer here... (use mathematical symbols if needed)"
                  : "Ask me anything you want to learn about..."
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
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {isAwaitingAnswer ? (
                <span className="text-blue-600 font-medium">Waiting for your answer...</span>
              ) : (
                "Press Enter to send, Shift+Enter for new line"
              )}
            </div>
            <div className="text-xs">
              Mathematical symbols: ∀, ∃, ∧, ∨, →, ↔, ¬, ≡, ⊃, ⊨
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}