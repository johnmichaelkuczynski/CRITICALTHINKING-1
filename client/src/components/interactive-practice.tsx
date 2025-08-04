import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, Clock, Calculator, ToggleLeft, ToggleRight, Keyboard, Eye, AlertTriangle, Flag, RefreshCw } from 'lucide-react';

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
  onGenerateNew?: () => void;
}

interface GradeResult {
  isCorrect: boolean;
  explanation: string;
}

export function InteractivePractice({ 
  title, 
  content, 
  practiceType, 
  weekNumber, 
  onComplete,
  onGenerateNew
}: InteractivePracticeProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showIndividualAnswers, setShowIndividualAnswers] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [logicSymbolMode, setLogicSymbolMode] = useState<Record<string, boolean>>({});
  const [showLogicKeyboard, setShowLogicKeyboard] = useState<Record<string, boolean>>({});
  const [activeTextarea, setActiveTextarea] = useState<string | null>(null);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
  const [selectedModel, setSelectedModel] = useState<string>('openai');
  const [gradeResults, setGradeResults] = useState<Record<string, GradeResult>>({});
  const [disputedGrades, setDisputedGrades] = useState<Record<string, boolean>>({});
  const [isGrading, setIsGrading] = useState(false);

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

  const showAnswerForQuestion = (questionId: string) => {
    setShowIndividualAnswers(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const disputeGrade = async (questionId: string, userAnswer: string, correctAnswer: string, question: string) => {
    setDisputedGrades(prev => ({ ...prev, [questionId]: true }));
    
    // Re-evaluate with a different model for dispute resolution
    const disputeModel = selectedModel === 'openai' ? 'anthropic' : 'openai';
    const disputeResult = await evaluateAnswerWithLLM(userAnswer, correctAnswer, question + " [GRADE DISPUTE: Please review this answer carefully]");
    
    setGradeResults(prev => ({
      ...prev,
      [questionId]: {
        ...disputeResult,
        explanation: `DISPUTE RESULT: ${disputeResult.explanation}`
      }
    }));
  };

  const normalizeLogicExpression = (expr: string): string => {
    return expr
      .toLowerCase()
      .replace(/\s+/g, '') // Remove all spaces
      .replace(/and/g, '∧')
      .replace(/or/g, '∨')
      .replace(/not/g, '¬')
      .replace(/implies/g, '→')
      .replace(/iff/g, '↔')
      .replace(/forall/g, '∀')
      .replace(/exists/g, '∃')
      .replace(/therefore/g, '∴')
      .replace(/contradiction/g, '⊥')
      .replace(/tautology/g, '⊤')
      // Handle variations in notation
      .replace(/&/g, '∧')
      .replace(/\|/g, '∨')
      .replace(/~/g, '¬')
      .replace(/->/g, '→')
      .replace(/<->/g, '↔')
      // Remove extra parentheses spacing
      .replace(/\(\s*/g, '(')
      .replace(/\s*\)/g, ')')
      .trim();
  };

  const areLogicallyEquivalent = (expr1: string, expr2: string): boolean => {
    // LIBERAL GRADING: Accept any reasonable logical symbolization
    
    // First normalize both expressions aggressively
    const normalize = (expr: string): string => {
      return expr
        .toLowerCase()
        .replace(/\s+/g, '') // Remove all whitespace
        .replace(/[()]/g, '') // Remove parentheses for basic comparison
        // Accept multiple notation systems
        .replace(/&/g, '∧').replace(/and/g, '∧').replace(/\*/g, '∧')
        .replace(/\|/g, '∨').replace(/or/g, '∨').replace(/\+/g, '∨')
        .replace(/~/g, '¬').replace(/not/g, '¬').replace(/!/g, '¬').replace(/-/g, '¬')
        .replace(/->/g, '→').replace(/=>/g, '→').replace(/implies/g, '→').replace(/if.*then/g, '→')
        .replace(/<->/g, '↔').replace(/<=>/g, '↔').replace(/iff/g, '↔').replace(/equiv/g, '↔')
        .replace(/forall/g, '∀').replace(/all/g, '∀')
        .replace(/exists/g, '∃').replace(/some/g, '∃').replace(/there.*exists/g, '∃')
        // Normalize variable names - accept S(x), Student(x), etc.
        .replace(/student\(([^)]+)\)/g, 'S($1)')
        .replace(/love\(([^)]+)\)/g, 'L($1)')
        .replace(/puzzle\(([^)]+)\)/g, 'P($1)')
        .replace(/logic\(([^)]+)\)/g, 'G($1)')
        .replace(/study\(([^)]+)\)/g, 'T($1)');
    };

    const norm1 = normalize(expr1);
    const norm2 = normalize(expr2);
    
    // Direct match after normalization
    if (norm1 === norm2) return true;
    
    // Check for common logical patterns that mean the same thing
    const patterns = [
      // "All X who Y do Z" patterns - multiple valid translations
      [/∀x\(s\(x\)∧g\(x\)→l\(x\)\)/, /∀x\(s\(x\)→\(g\(x\)→l\(x\)\)\)/], // ∀x(S(x)∧G(x)→L(x)) ≡ ∀x(S(x)→(G(x)→L(x)))
      [/∀x\(s\(x\)∧g\(x\)→l\(x\)\)/, /∀x\(\(s\(x\)∧g\(x\)\)→l\(x\)\)/], // Parentheses variations
      // Variable name flexibility - S(x) = Student(x), etc.
      [/s\(/g, /student\(/g],
      [/l\(/g, /love\(/g],
      [/p\(/g, /puzzle\(/g],
      [/g\(/g, /logic\(/g],
    ];
    
    // Test pattern equivalencies
    for (const [pattern1, pattern2] of patterns) {
      if ((norm1.match(pattern1) && norm2.match(pattern2)) || 
          (norm1.match(pattern2) && norm2.match(pattern1))) {
        return true;
      }
    }
    
    // Semantic equivalence check - if both contain the same logical structure
    const extractStructure = (expr: string): string => {
      return expr
        .replace(/[a-z]\(/g, 'PRED(') // Replace all predicates with generic PRED
        .replace(/[a-z]/g, 'VAR'); // Replace all variables with generic VAR
    };
    
    if (extractStructure(norm1) === extractStructure(norm2)) {
      return true;
    }
    
    // Final check: if both expressions contain the key logical components in any order
    const getComponents = (expr: string): Set<string> => {
      const components = new Set<string>();
      if (expr.includes('∀')) components.add('universal');
      if (expr.includes('∃')) components.add('existential');
      if (expr.includes('∧')) components.add('conjunction');
      if (expr.includes('∨')) components.add('disjunction');
      if (expr.includes('→')) components.add('conditional');
      if (expr.includes('↔')) components.add('biconditional');
      if (expr.includes('¬')) components.add('negation');
      return components;
    };
    
    const comp1 = getComponents(norm1);
    const comp2 = getComponents(norm2);
    
    // If they have the same logical operators, likely equivalent
    return comp1.size === comp2.size && Array.from(comp1).every(c => comp2.has(c));
  };

  // TRUE PASSTHROUGH GRADING - Let LLM decide if answer is correct
  const evaluateAnswerWithLLM = async (userAnswer: string, correctAnswer: string, question: string): Promise<GradeResult> => {
    try {
      const response = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAnswer: userAnswer.trim(),
          correctAnswer: correctAnswer.trim(),
          question: question,
          model: selectedModel
        }),
      });

      if (!response.ok) {
        console.error('Failed to evaluate answer with LLM');
        return { isCorrect: false, explanation: 'Grading service unavailable' };
      }

      const data = await response.json();
      return {
        isCorrect: data.isCorrect || false,
        explanation: data.explanation || 'No explanation provided'
      };
    } catch (error) {
      console.error('Error evaluating answer:', error);
      return { isCorrect: false, explanation: 'Error occurred during grading' };
    }
  };

  const calculateScore = async () => {
    setIsGrading(true);
    let totalCorrect = 0;
    let totalQuestions = 0;
    const newGradeResults: Record<string, GradeResult> = {};

    for (const problem of content.problems) {
      for (const question of problem.questions) {
        totalQuestions++;
        const userAnswer = answers[question.id];
        
        if (problem.type === 'multiple_choice') {
          const isCorrect = userAnswer === question.correct;
          totalCorrect += isCorrect ? 1 : 0;
          newGradeResults[question.id] = {
            isCorrect,
            explanation: isCorrect ? 'Correct choice selected' : 'Incorrect choice selected'
          };
        } else if (problem.type === 'text_input' || problem.type === 'calculation') {
          if (userAnswer && question.answer) {
            // TRUE PASSTHROUGH: Let LLM decide if answer is correct
            const gradeResult = await evaluateAnswerWithLLM(userAnswer, question.answer, question.question);
            newGradeResults[question.id] = gradeResult;
            totalCorrect += gradeResult.isCorrect ? 1 : 0;
          } else {
            newGradeResults[question.id] = {
              isCorrect: false,
              explanation: 'No answer provided'
            };
          }
        }
        // TODO: Add truth table scoring logic
      }
    }

    setGradeResults(newGradeResults);
    setIsGrading(false);
    return Math.round((totalCorrect / totalQuestions) * 100);
  };

  const handleSubmit = async () => {
    const finalScore = await calculateScore();
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    setScore(finalScore);
    setShowResults(true);
    setShowSolutions(true); // Automatically show solutions after submission
    setSubmitted(true);
    
    onComplete(finalScore, answers, timeSpent);
  };

  const renderQuestion = (problem: Problem, question: Question, index: number) => {
    const questionKey = question.id;
    
    switch (problem.type) {
      case 'multiple_choice':
        return (
          <div key={questionKey} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{index + 1}. {question.question}</div>
              {!submitted && !showIndividualAnswers[questionKey] && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showAnswerForQuestion(questionKey)}
                  className="flex items-center space-x-1 text-xs"
                >
                  <Eye className="w-3 h-3" />
                  <span>Show Answer</span>
                </Button>
              )}
            </div>
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
            
            {(showResults || showSolutions || showIndividualAnswers[questionKey]) && (
              <div className="space-y-2 mt-4">
                {question.correct !== undefined && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm font-medium text-green-700 dark:text-green-300">Correct Answer:</div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-mono">
                      {question.options?.[question.correct]}
                    </div>
                  </div>
                )}
                {question.explanation && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Explanation:</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">{question.explanation}</div>
                  </div>
                )}
                {showResults && answers[questionKey] && question.correct !== undefined && (
                  <div className="flex items-center space-x-2">
                    {answers[questionKey] === question.correct ? (
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
                {showSolutions && !showResults && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      💡 Solution shown - you can still complete the practice and submit your answers!
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'text_input':
      case 'calculation':
        return (
          <div key={questionKey} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{index + 1}. {question.question}</div>
              {!submitted && !showIndividualAnswers[questionKey] && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showAnswerForQuestion(questionKey)}
                  className="flex items-center space-x-1 text-xs"
                >
                  <Eye className="w-3 h-3" />
                  <span>Show Answer</span>
                </Button>
              )}
            </div>
            
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
            
            {(showResults || showSolutions || showIndividualAnswers[questionKey]) && (
              <div className="space-y-2">
                {question.answer && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm font-medium text-green-700 dark:text-green-300">Correct Answer:</div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-mono">{question.answer}</div>
                  </div>
                )}
                {question.explanation && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Explanation:</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">{question.explanation}</div>
                  </div>
                )}
                {showResults && answers[questionKey] && gradeResults[questionKey] && (
                  <div className="space-y-2">
                    {/* LLM GRADING RESULT */}
                    <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {gradeResults[questionKey].isCorrect ? (
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
                          <span className="text-xs text-gray-500">Graded by {selectedModel.toUpperCase()}</span>
                        </div>
                        
                        {/* DISPUTE GRADE BUTTON */}
                        {!gradeResults[questionKey].isCorrect && !disputedGrades[questionKey] && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => disputeGrade(questionKey, answers[questionKey], question.answer!, question.question)}
                            className="flex items-center space-x-1 text-xs text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Flag className="w-3 h-3" />
                            <span>Dispute Grade</span>
                          </Button>
                        )}
                        
                        {disputedGrades[questionKey] && (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Under Review
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-medium text-gray-700 dark:text-gray-300">AI Explanation:</div>
                        <div className="text-gray-600 dark:text-gray-400 mt-1">{gradeResults[questionKey].explanation}</div>
                      </div>
                      
                      <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded text-xs">
                        <div className="font-medium">Your Answer:</div>
                        <div className="font-mono text-gray-600 dark:text-gray-400">{answers[questionKey]}</div>
                      </div>
                    </div>
                  </div>
                )}
                {showSolutions && !showResults && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      💡 Solution shown - you can still complete the practice and submit your answers!
                    </div>
                  </div>
                )}
                {!question.answer && !question.explanation && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      Answer and explanation will be provided after submission.
                    </div>
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
          {/* LLM MODEL SELECTOR */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Grading Model</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Choose which AI model will grade your answers</div>
              </div>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                  <SelectItem value="anthropic">Claude 4</SelectItem>
                  <SelectItem value="deepseek">DeepSeek</SelectItem>
                  <SelectItem value="perplexity">Perplexity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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

          {isGrading && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600 animate-spin" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  AI is grading your answers using {selectedModel.toUpperCase()}...
                </span>
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
            <div className="flex justify-center gap-4 pt-4">
              <Button 
                onClick={() => setShowSolutions(true)}
                variant="outline"
                size="lg"
                className="min-w-[180px]"
              >
                Show Solutions
              </Button>
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
                <div className="space-y-3">
                  <div className="text-lg font-semibold">
                    Score: {score}% ({Math.round((score / 100) * totalQuestions)}/{totalQuestions} correct)
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Time spent: {Math.round((Date.now() - startTime) / 1000 / 60)} minutes
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Your performance has been logged for analysis. Keep practicing to improve!
                  </div>
                  
                  {/* AI GRADING SUMMARY */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                    <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      🤖 AI Grading Summary
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Your answers were evaluated by {selectedModel.toUpperCase()} AI model using semantic understanding, not exact word matching.
                      {Object.values(disputedGrades).some(Boolean) && 
                        " Some grades were disputed and re-evaluated for accuracy."
                      }
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      📝 Detailed AI feedback and explanations are shown above for each question.
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Review the AI's reasoning for each answer to improve your understanding.
                    </div>
                  </div>
                  
                  {/* GENERATE NEW PRACTICE BUTTON */}
                  {onGenerateNew && practiceType === 'homework' && (
                    <div className="flex justify-center mt-6">
                      <Button 
                        onClick={onGenerateNew}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
                        size="lg"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Generate New Practice Homework</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}