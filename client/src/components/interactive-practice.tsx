import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Calculator, ToggleLeft, ToggleRight, Keyboard } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  answer?: string;
  options?: string[];
  correct?: number;
  explanation: string;
}

interface Problem {
  id: string;
  title: string;
  points: number;
  type: 'multiple_choice' | 'text_input' | 'truth_table' | 'calculation';
  context?: string;
  questions: Question[];
}

interface PracticeContent {
  instructions: string;
  totalPoints: number;
  problems: Problem[];
}

interface InteractivePracticeProps {
  title: string;
  content: PracticeContent;
  practiceType: 'homework' | 'quiz' | 'test';
  weekNumber: number;
  onComplete: (score: number, answers: Record<string, any>, timeSpent: number) => void;
}

export function InteractivePractice({ 
  title, 
  content, 
  practiceType, 
  weekNumber, 
  onComplete 
}: InteractivePracticeProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [logicSymbolMode, setLogicSymbolMode] = useState<Record<string, boolean>>({});
  const [showLogicKeyboard, setShowLogicKeyboard] = useState<Record<string, boolean>>({});
  const [activeTextarea, setActiveTextarea] = useState<string | null>(null);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const updateAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const logicSymbols = [
    { symbol: '¬', label: 'NOT', desc: 'Negation' },
    { symbol: '∧', label: 'AND', desc: 'Conjunction' },
    { symbol: '∨', label: 'OR', desc: 'Disjunction' },
    { symbol: '→', label: 'IF-THEN', desc: 'Conditional' },
    { symbol: '↔', label: 'IFF', desc: 'Biconditional' },
    { symbol: '∀', label: 'FOR ALL', desc: 'Universal quantifier' },
    { symbol: '∃', label: 'EXISTS', desc: 'Existential quantifier' },
    { symbol: '⊃', label: 'IMPLIES', desc: 'Material conditional' },
    { symbol: '≡', label: 'EQUIV', desc: 'Material equivalence' },
    { symbol: '⊥', label: 'CONTRADICTION', desc: 'Contradiction' },
    { symbol: '⊤', label: 'TAUTOLOGY', desc: 'Tautology' },
    { symbol: '∴', label: 'THEREFORE', desc: 'Therefore' }
  ];

  const insertSymbol = (questionId: string, symbol: string) => {
    const textarea = textareaRefs.current[questionId];
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = answers[questionId] || '';
      const newValue = currentValue.slice(0, start) + symbol + currentValue.slice(end);
      
      updateAnswer(questionId, newValue);
      
      // Set cursor position after the inserted symbol
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + symbol.length, start + symbol.length);
      }, 0);
    }
  };

  const toggleLogicMode = (questionId: string) => {
    setLogicSymbolMode(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleKeyboard = (questionId: string) => {
    setShowLogicKeyboard(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
    setActiveTextarea(questionId);
  };

  const calculateScore = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;

    content.problems.forEach(problem => {
      problem.questions.forEach(question => {
        totalQuestions++;
        const userAnswer = answers[question.id];
        
        if (problem.type === 'multiple_choice') {
          if (userAnswer === question.correct) {
            totalCorrect++;
          }
        } else if (problem.type === 'text_input' || problem.type === 'calculation') {
          if (userAnswer && question.answer) {
            // Normalize answers for comparison
            const normalizedUser = userAnswer.toLowerCase().replace(/\s+/g, '');
            const normalizedCorrect = question.answer.toLowerCase().replace(/\s+/g, '');
            if (normalizedUser === normalizedCorrect) {
              totalCorrect++;
            }
          }
        }
        // TODO: Add truth table scoring logic
      });
    });

    return Math.round((totalCorrect / totalQuestions) * 100);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    setScore(finalScore);
    setShowResults(true);
    setSubmitted(true);
    
    onComplete(finalScore, answers, timeSpent);
  };

  const renderQuestion = (problem: Problem, question: Question, index: number) => {
    const questionKey = question.id;
    
    switch (problem.type) {
      case 'multiple_choice':
        return (
          <div key={questionKey} className="space-y-3">
            <div className="font-medium">{index + 1}. {question.question}</div>
            <RadioGroup
              value={answers[questionKey]?.toString()}
              onValueChange={(value) => updateAnswer(questionKey, parseInt(value))}
              disabled={submitted}
            >
              {question.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={optionIndex.toString()} id={`${questionKey}-${optionIndex}`} />
                  <Label htmlFor={`${questionKey}-${optionIndex}`}>{option}</Label>
                  {showResults && (
                    <div className="ml-2">
                      {optionIndex === question.correct && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {answers[questionKey] === optionIndex && optionIndex !== question.correct && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
            {showResults && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Explanation:</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">{question.explanation}</div>
              </div>
            )}
          </div>
        );

      case 'text_input':
      case 'calculation':
        return (
          <div key={questionKey} className="space-y-3">
            <div className="font-medium">{index + 1}. {question.question}</div>
            
            {/* Logic symbols toggle and keyboard controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toggleLogicMode(questionKey)}
                  className={`flex items-center space-x-1 text-xs ${logicSymbolMode[questionKey] ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''}`}
                  disabled={submitted}
                >
                  {logicSymbolMode[questionKey] ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  <span>Logic Symbols</span>
                </Button>
                
                {logicSymbolMode[questionKey] && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleKeyboard(questionKey)}
                    className={`flex items-center space-x-1 text-xs ${showLogicKeyboard[questionKey] ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' : ''}`}
                    disabled={submitted}
                  >
                    <Keyboard className="w-4 h-4" />
                    <span>Keyboard</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Logic symbols keyboard */}
            {logicSymbolMode[questionKey] && showLogicKeyboard[questionKey] && (
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Click symbols to insert:</div>
                <div className="grid grid-cols-4 gap-2">
                  {logicSymbols.map((sym) => (
                    <Button
                      key={sym.symbol}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertSymbol(questionKey, sym.symbol)}
                      className="flex flex-col items-center h-auto py-2 text-xs"
                      disabled={submitted}
                      title={sym.desc}
                    >
                      <span className="text-lg font-bold">{sym.symbol}</span>
                      <span className="text-xs text-gray-500">{sym.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <Textarea
              ref={(el) => {
                textareaRefs.current[questionKey] = el;
              }}
              value={answers[questionKey] || ''}
              onChange={(e) => updateAnswer(questionKey, e.target.value)}
              placeholder={logicSymbolMode[questionKey] ? "Type naturally or use symbols from keyboard above..." : "Enter your answer..."}
              disabled={submitted}
              className="min-h-[80px]"
              onFocus={() => setActiveTextarea(questionKey)}
            />
            
            {logicSymbolMode[questionKey] && (
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Logic Symbol Mode: ON - Use the keyboard above or type naturally
              </div>
            )}
            
            {showResults && (
              <div className="space-y-2">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-sm font-medium text-green-700 dark:text-green-300">Correct Answer:</div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-mono">{question.answer}</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Explanation:</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">{question.explanation}</div>
                </div>
                {answers[questionKey] && (
                  <div className="flex items-center space-x-2">
                    {answers[questionKey].toLowerCase().replace(/\s+/g, '') === 
                     question.answer?.toLowerCase().replace(/\s+/g, '') ? (
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Correct
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Incorrect
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'truth_table':
        return (
          <div key={questionKey} className="space-y-3">
            <div className="font-medium">{index + 1}. {question.question}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Formula: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{question.answer}</span>
            </div>
            <div className="text-sm text-orange-600 dark:text-orange-400">
              Truth table functionality coming soon - for now, work this out on paper and check your answer after submission.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const totalQuestions = content.problems.reduce((sum, problem) => sum + problem.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{title}</span>
            <div className="flex items-center space-x-4 text-sm">
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                Week {weekNumber}
              </Badge>
              <Badge variant="outline">
                <Calculator className="h-3 w-3 mr-1" />
                {content.totalPoints} pts
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>{content.instructions}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!submitted && (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="text-sm font-medium">Progress: {answeredQuestions}/{totalQuestions} questions answered</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
          )}

          {content.problems.map((problem, problemIndex) => (
            <Card key={problem.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{problem.title}</span>
                  <Badge variant="secondary">{problem.points} points</Badge>
                </CardTitle>
                {problem.context && (
                  <CardDescription className="whitespace-pre-line">{problem.context}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {problem.questions.map((question, questionIndex) => 
                  renderQuestion(problem, question, questionIndex)
                )}
              </CardContent>
            </Card>
          ))}

          {!submitted ? (
            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleSubmit}
                size="lg"
                disabled={answeredQuestions === 0}
                className="min-w-[200px]"
              >
                Submit {practiceType === 'homework' ? 'Homework' : practiceType === 'quiz' ? 'Quiz' : 'Test'}
              </Button>
            </div>
          ) : (
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Practice Complete!</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-lg font-semibold">
                    Score: {score}% ({Math.round((score / 100) * totalQuestions)}/{totalQuestions} correct)
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Time spent: {Math.round((Date.now() - startTime) / 1000 / 60)} minutes
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Your performance has been logged for analysis. Keep practicing to improve!
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}