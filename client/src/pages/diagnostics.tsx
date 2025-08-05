import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Brain, TrendingUp, TrendingDown, Target, BarChart3, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { renderMathInElement } from "@/lib/math-renderer";

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

interface DiagnosticResult {
  questionId: string;
  userAnswer: number;
  correct: boolean;
  timeSpent: number;
  difficulty: string;
  category: string;
}

interface DiagnosticSession {
  questions: DiagnosticQuestion[];
  results: DiagnosticResult[];
  currentQuestionIndex: number;
  startTime: Date;
  weakAreas: string[];
  strongAreas: string[];
  currentDifficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function Diagnostics() {
  const [session, setSession] = useState<DiagnosticSession>({
    questions: [],
    results: [],
    currentQuestionIndex: 0,
    startTime: new Date(),
    weakAreas: [],
    strongAreas: [],
    currentDifficulty: 'beginner'
  });
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [isSessionActive, setIsSessionActive] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Generate new question based on performance
  const generateQuestionMutation = useMutation({
    mutationFn: async () => {
      const performance = calculatePerformance();
      const response = await apiRequest('/api/diagnostic-question', {
        method: 'POST',
        body: JSON.stringify({ 
          difficulty: performance.recommendedDifficulty,
          weakAreas: session.weakAreas,
          totalAnswered: session.results.length,
          recentPerformance: performance
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    },
    onSuccess: (data: DiagnosticQuestion) => {
      setSession(prev => ({
        ...prev,
        questions: [...prev.questions, data],
        currentQuestionIndex: prev.questions.length
      }));
      setSelectedAnswer(null);
      setShowExplanation(false);
      setQuestionStartTime(new Date());
      setTimeout(() => renderMathInElement(document.body), 100);
    }
  });

  // Calculate performance metrics
  const calculatePerformance = () => {
    const totalAnswered = session.results.length;
    const correctAnswers = session.results.filter(r => r.correct).length;
    const overallAccuracy = totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0;
    
    // Recent performance (last 5 questions)
    const recentResults = session.results.slice(-5);
    const recentCorrect = recentResults.filter(r => r.correct).length;
    const recentAccuracy = recentResults.length > 0 ? (recentCorrect / recentResults.length) * 100 : 0;

    // Difficulty distribution
    const difficultyStats = {
      beginner: session.results.filter(r => r.difficulty === 'beginner'),
      intermediate: session.results.filter(r => r.difficulty === 'intermediate'), 
      advanced: session.results.filter(r => r.difficulty === 'advanced')
    };

    // Category performance
    const categoryStats = session.results.reduce((acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = { total: 0, correct: 0 };
      }
      acc[result.category].total++;
      if (result.correct) acc[result.category].correct++;
      return acc;
    }, {} as Record<string, { total: number; correct: number }>);

    // Recommend next difficulty
    let recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (totalAnswered >= 3) {
      if (recentAccuracy >= 80 && overallAccuracy >= 75) {
        recommendedDifficulty = session.currentDifficulty === 'beginner' ? 'intermediate' : 'advanced';
      } else if (recentAccuracy <= 40 || overallAccuracy <= 50) {
        recommendedDifficulty = session.currentDifficulty === 'advanced' ? 'intermediate' : 'beginner';
      } else {
        recommendedDifficulty = session.currentDifficulty;
      }
    }

    return {
      totalAnswered,
      overallAccuracy: Math.round(overallAccuracy),
      recentAccuracy: Math.round(recentAccuracy),
      difficultyStats,
      categoryStats,
      recommendedDifficulty,
      averageTime: session.results.length > 0 ? 
        Math.round(session.results.reduce((sum, r) => sum + r.timeSpent, 0) / session.results.length) : 0
    };
  };

  // Start diagnostic session
  const startSession = () => {
    setIsSessionActive(true);
    setSession({
      questions: [],
      results: [],
      currentQuestionIndex: 0,
      startTime: new Date(),
      weakAreas: [],
      strongAreas: [],
      currentDifficulty: 'beginner'
    });
    generateQuestionMutation.mutate();
  };

  // Submit answer
  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = session.questions[session.currentQuestionIndex];
    const timeSpent = Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const result: DiagnosticResult = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      correct: isCorrect,
      timeSpent,
      difficulty: currentQuestion.difficulty,
      category: currentQuestion.category
    };

    setSession(prev => {
      const newResults = [...prev.results, result];
      const newWeakAreas = isCorrect ? prev.weakAreas : 
        Array.from(new Set([...prev.weakAreas, currentQuestion.category]));
      const newStrongAreas = isCorrect ? 
        Array.from(new Set([...prev.strongAreas, currentQuestion.category])) : prev.strongAreas;
      
      return {
        ...prev,
        results: newResults,
        weakAreas: newWeakAreas,
        strongAreas: newStrongAreas,
        currentDifficulty: calculatePerformance().recommendedDifficulty
      };
    });

    setShowExplanation(true);
  };

  // Get next question
  const nextQuestion = () => {
    generateQuestionMutation.mutate();
  };

  // End session
  const endSession = () => {
    setIsSessionActive(false);
  };

  const performance = calculatePerformance();
  const currentQuestion = session.questions[session.currentQuestionIndex];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Diagnostics
            </h1>
            <p className="text-muted-foreground mt-1">
              Test yourself with adaptive questions and track your progress
            </p>
          </div>
          <div className="flex gap-2">
            {isSessionActive && (
              <>
                <Badge variant="outline">
                  Questions: {session.results.length}
                </Badge>
                <Badge className={
                  session.currentDifficulty === 'advanced' ? 'bg-red-600' :
                  session.currentDifficulty === 'intermediate' ? 'bg-yellow-600' : 'bg-green-600'
                }>
                  {session.currentDifficulty}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      {!isSessionActive ? (
        /* Welcome Screen */
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Diagnostic Testing
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Start a diagnostic session to test your critical thinking skills. The system will:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Adaptive Difficulty
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Questions automatically adjust based on your performance - get harder as you succeed, easier if you struggle
                    </p>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Focused Practice
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      More questions in areas where you need help, maintaining challenge in your strong areas
                    </p>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      Progress Tracking
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed analytics on your performance across different topics and difficulty levels
                    </p>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-orange-600" />
                      Unlimited Questions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Answer as many or as few questions as you want - the more data, the better the insights
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={startSession}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Start Diagnostic Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Active Session */
        <div className="flex-1 flex gap-6 p-6">
          {/* Question Area */}
          <div className="flex-1">
            {currentQuestion && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Question {session.results.length + 1}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={
                        currentQuestion.difficulty === 'advanced' ? 'border-red-200 text-red-700' :
                        currentQuestion.difficulty === 'intermediate' ? 'border-yellow-200 text-yellow-700' :
                        'border-green-200 text-green-700'
                      }>
                        {currentQuestion.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {currentQuestion.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="text-foreground leading-relaxed">
                      {currentQuestion.question}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !showExplanation && setSelectedAnswer(index)}
                        className={`w-full p-4 text-left border rounded-lg transition-colors ${
                          selectedAnswer === index
                            ? showExplanation
                              ? index === currentQuestion.correctAnswer
                                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                                : 'border-red-500 bg-red-50 dark:bg-red-950'
                              : 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                            : showExplanation && index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-50 dark:bg-green-950'
                              : 'border-border hover:border-muted-foreground hover:bg-accent'
                        } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                        disabled={showExplanation}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm font-medium">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                          {showExplanation && (
                            <div className="ml-auto">
                              {index === currentQuestion.correctAnswer && (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              )}
                              {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Explanation
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {!showExplanation ? (
                      <Button 
                        onClick={submitAnswer}
                        disabled={selectedAnswer === null}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <>
                        <Button 
                          onClick={nextQuestion}
                          disabled={generateQuestionMutation.isPending}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {generateQuestionMutation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Loading...
                            </>
                          ) : (
                            'Next Question'
                          )}
                        </Button>
                        <Button 
                          onClick={endSession}
                          variant="outline"
                        >
                          End Session
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {generateQuestionMutation.isPending && !currentQuestion && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Generating your next question...</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Performance Sidebar */}
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performance.totalAnswered > 0 ? (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Accuracy</span>
                        <span className="text-lg font-bold text-green-600">
                          {performance.overallAccuracy}%
                        </span>
                      </div>
                      <Progress value={performance.overallAccuracy} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Recent Accuracy</span>
                        <span className="text-lg font-bold text-blue-600">
                          {performance.recentAccuracy}%
                        </span>
                      </div>
                      <Progress value={performance.recentAccuracy} className="h-2" />
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Questions by Difficulty</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Beginner</span>
                          <span className="text-green-600">
                            {performance.difficultyStats.beginner.filter(r => r.correct).length}/
                            {performance.difficultyStats.beginner.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Intermediate</span>
                          <span className="text-yellow-600">
                            {performance.difficultyStats.intermediate.filter(r => r.correct).length}/
                            {performance.difficultyStats.intermediate.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Advanced</span>
                          <span className="text-red-600">
                            {performance.difficultyStats.advanced.filter(r => r.correct).length}/
                            {performance.difficultyStats.advanced.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {Object.keys(performance.categoryStats).length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2">Category Performance</h4>
                          <div className="space-y-2 text-sm">
                            {Object.entries(performance.categoryStats)
                              .sort(([,a], [,b]) => (b.correct/b.total) - (a.correct/a.total))
                              .map(([category, stats]) => (
                                <div key={category} className="flex justify-between">
                                  <span className="truncate">{category}</span>
                                  <span className={
                                    stats.correct / stats.total >= 0.8 ? 'text-green-600' :
                                    stats.correct / stats.total >= 0.6 ? 'text-yellow-600' : 'text-red-600'
                                  }>
                                    {Math.round((stats.correct / stats.total) * 100)}%
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {performance.totalAnswered}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Questions
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {performance.averageTime}s
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avg Time
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Answer questions to see your performance metrics
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}