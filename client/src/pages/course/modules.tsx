import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Clock, ExternalLink, Play, Keyboard } from "lucide-react";
import LogicKeyboard from "@/components/logic-keyboard";
import { useAuth } from "@/hooks/use-auth";

interface ModulesProps {
  onNavigateToLivingBook: (sectionId?: string) => void;
  selectedWeek?: number;
  onWeekChange?: (week: number) => void;
}

interface ModuleData {
  week: number;
  title: string;
  livingBookSection: string;
  lectureGenerated: boolean;
  homeworkAvailable: boolean;
  testAvailable: boolean;
  status: "available" | "completed";
}

export default function Modules({ onNavigateToLivingBook, selectedWeek, onWeekChange }: ModulesProps) {
  const { user } = useAuth();
  const [selectedModule, setSelectedModule] = useState(selectedWeek || 1);
  const [homeworkStarted, setHomeworkStarted] = useState<{[key: number]: boolean}>({});
  const [homeworkAnswers, setHomeworkAnswers] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedHomework, setGeneratedHomework] = useState<{[key: number]: string}>({});
  const [selectedAIModel, setSelectedAIModel] = useState<'openai' | 'anthropic' | 'perplexity'>('openai');
  const [logicKeyboardOpen, setLogicKeyboardOpen] = useState(false);
  const [activeTextarea, setActiveTextarea] = useState<string | null>(null);

  // Update selected module when selectedWeek prop changes
  useEffect(() => {
    if (selectedWeek) {
      setSelectedModule(selectedWeek);
    }
  }, [selectedWeek]);
  const [generatingLecture, setGeneratingLecture] = useState(false);
  const [generatingHomework, setGeneratingHomework] = useState(false);

  const modules: ModuleData[] = [
    {
      week: 1,
      title: "Basic Concepts, Notation, and Logical Operators",
      livingBookSection: "section-1",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 2,
      title: "Truth Tables and Proof Methods",
      livingBookSection: "section-2",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 3,
      title: "Boolean Algebra and Functions",
      livingBookSection: "section-3",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 4,
      title: "Quantifier Logic and Translation",
      livingBookSection: "section-4",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: true,
      status: "available"
    },
    {
      week: 5,
      title: "Complex Translation and Mathematical Logic",
      livingBookSection: "section-5",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 6,
      title: "Using Models to Prove Invalidity and Consistency",
      livingBookSection: "section-6",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: true,
      status: "available"
    }
  ];

  const generateLecture = async (weekNumber: number) => {
    setGeneratingLecture(true);
    // TODO: Implement LLM-generated lecture creation
    setTimeout(() => {
      setGeneratingLecture(false);
    }, 2000);
  };

  const generateHomework = async (weekNumber: number) => {
    setGeneratingHomework(true);
    
    const weekTopic = modules.find(m => m.week === weekNumber)?.title || '';
    
    try {
      const response = await fetch('/api/homework/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weekNumber,
          topic: weekTopic,
          courseMaterial: `Week ${weekNumber} covers ${weekTopic}. This is part of a 6-week symbolic logic course.`,
          aiModel: selectedAIModel
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Store the generated homework
        setGeneratedHomework(prev => ({
          ...prev,
          [weekNumber]: data.homework
        }));
      } else {
        console.error('Homework generation failed:', data.error);
        alert('Failed to generate homework: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating homework:', error);
      alert('Error generating homework. Please try again.');
    } finally {
      setGeneratingHomework(false);
    }
  };

  const handleSymbolInsert = (symbol: string) => {
    if (activeTextarea) {
      const currentValue = homeworkAnswers[activeTextarea] || '';
      setHomeworkAnswers(prev => ({
        ...prev,
        [activeTextarea]: currentValue + symbol
      }));
    }
  };

  const startHomework = (weekNumber: number) => {
    setHomeworkStarted(prev => ({ ...prev, [weekNumber]: true }));
  };

  const updateAnswer = (questionId: string, answer: string) => {
    setHomeworkAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const submitHomework = async (weekNumber: number) => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Homework ${weekNumber} submitted successfully! You will receive your grade within 24 hours.`);
    }, 2000);
  };

  const getStatusBadge = (status: ModuleData["status"]) => {
    switch (status) {
      case "available":
        return <Badge variant="default">📖 Available</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">✅ Completed</Badge>;
    }
  };

  const selectedModuleData = modules.find(m => m.week === selectedModule);

  return (
    <div className="flex h-full">
      {/* Module Selection Sidebar */}
      <div className="w-80 border-r bg-muted/30 p-4">
        <h2 className="text-lg font-semibold mb-4">Course Modules</h2>
        <div className="space-y-2">
          {modules.map((module) => (
            <Card 
              key={module.week}
              className={`cursor-pointer transition-colors ${
                selectedModule === module.week 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => {
                setSelectedModule(module.week);
                onWeekChange?.(module.week);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Week {module.week}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {module.title}
                    </p>
                  </div>
                  <div className="ml-2">
                    {getStatusBadge(module.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Special modules */}
          <Card 
            className={`cursor-pointer transition-colors hover:bg-muted/50 mt-4 ${
              selectedModule === 7 ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => {
              setSelectedModule(7);
              onWeekChange?.(7);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">Midterm Exam</h3>
                  <p className="text-xs text-muted-foreground">Comprehensive midterm</p>
                </div>
                <Badge variant="default">📝 Available</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedModule === 8 ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => {
              setSelectedModule(8);
              onWeekChange?.(8);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">Final Exam</h3>
                  <p className="text-xs text-muted-foreground">Comprehensive final</p>
                </div>
                <Badge variant="default">📝 Available</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Module Content */}
      <div className="flex-1 p-6">
        {selectedModule === 7 ? (
          // Midterm Exam Module
          <div className="max-w-4xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Midterm Exam</h1>
              <div className="flex items-center space-x-4">
                <Badge variant="default">📝 Available</Badge>
                <Badge variant="outline">100 points</Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Midterm Examination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    This exam covers material from Weeks 1-4: Basic Concepts, Truth Tables, Boolean Algebra, and Quantifier Logic.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notice</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• You have 90 minutes to complete this exam</li>
                      <li>• Once started, the timer cannot be paused</li>
                      <li>• Late submissions receive an automatic 0</li>
                      <li>• GPTZero score above 50% results in automatic 0</li>
                      <li>• You can only take this exam once</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <Button size="lg" className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Start Midterm Exam</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : selectedModule === 8 ? (
          // Final Exam Module
          <div className="max-w-4xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Final Exam</h1>
              <div className="flex items-center space-x-4">
                <Badge variant="default">📝 Available</Badge>
                <Badge variant="outline">150 points</Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Final Examination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    This exam covers all course material from Weeks 1-6: Complete symbolic logic curriculum including models and proofs.
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Important Notice</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• You have 120 minutes to complete this exam</li>
                      <li>• Once started, the timer cannot be paused</li>
                      <li>• Late submissions receive an automatic 0</li>
                      <li>• GPTZero score above 50% results in automatic 0</li>
                      <li>• You can only take this exam once</li>
                      <li>• This exam determines 40% of your final grade</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <Button size="lg" className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Start Final Exam</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : selectedModuleData && (
          <div className="max-w-4xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                Week {selectedModuleData.week}: {selectedModuleData.title}
              </h1>
              <div className="flex items-center space-x-4">
                {getStatusBadge(selectedModuleData.status)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigateToLivingBook(selectedModuleData.livingBookSection)}
                  className="flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View in Living Book</span>
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="lecture" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lecture">Lecture Summary</TabsTrigger>
                <TabsTrigger value="homework">Homework</TabsTrigger>
                <TabsTrigger value="quiz">Quiz/Test</TabsTrigger>
              </TabsList>

              <TabsContent value="lecture" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Lecture Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!selectedModuleData.lectureGenerated ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          Generate an AI-powered lecture summary for this week's material.
                        </p>
                        <Button
                          onClick={() => generateLecture(selectedModuleData.week)}
                          disabled={generatingLecture}
                          className="flex items-center space-x-2"
                        >
                          {generatingLecture ? (
                            <>
                              <Clock className="w-4 h-4 animate-spin" />
                              <span>Generating Lecture...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Generate Lecture Summary</span>
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p>Lecture content would appear here after generation.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="homework" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Graded Homework</span>
                      </div>
                      <Badge variant="outline">50 points</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!generatedHomework[selectedModuleData.week] ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          Generate an AI-powered homework assignment based on this week's material.
                        </p>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Select AI Model:</label>
                          <select 
                            value={selectedAIModel} 
                            onChange={(e) => setSelectedAIModel(e.target.value as 'openai' | 'anthropic' | 'perplexity')}
                            className="w-full p-2 border rounded"
                          >
                            <option value="openai">OpenAI GPT-4o</option>
                            <option value="anthropic">Anthropic Claude</option>
                            <option value="perplexity">Perplexity AI</option>
                          </select>
                        </div>
                        
                        <Button
                          onClick={() => generateHomework(selectedModuleData.week)}
                          disabled={generatingHomework}
                          className="flex items-center space-x-2"
                        >
                          {generatingHomework ? (
                            <>
                              <Clock className="w-4 h-4 animate-spin" />
                              <span>Generating Homework...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Generate Homework</span>
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">✨ AI-Generated Homework</h4>
                          <p className="text-blue-700 text-sm">
                            This homework was generated using OpenAI GPT-4 based on the week's learning objectives.
                          </p>
                        </div>
                        
                        <div className="bg-white border rounded-lg p-6">
                          <div className="prose max-w-none">
                            {(() => {
                              try {
                                // Parse the homework JSON from the API response
                                const homeworkText = generatedHomework[selectedModuleData.week];
                                const jsonMatch = homeworkText.match(/```json\n([\s\S]*?)\n```/);
                                if (jsonMatch) {
                                  const homeworkData = JSON.parse(jsonMatch[1]);
                                  return (
                                    <div className="space-y-6">
                                      <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{homeworkData.title}</h2>
                                        <p className="text-gray-700 mb-4">{homeworkData.instructions}</p>
                                        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                                          <p className="text-sm text-blue-800">
                                            <strong>Total Points:</strong> {homeworkData.totalPoints} | <strong>Due:</strong> {homeworkData.dueInfo}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      {homeworkData.parts.map((part: any, partIndex: number) => (
                                        <div key={partIndex} className="border rounded-lg p-4 bg-gray-50">
                                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            {part.title} ({part.points} points)
                                          </h3>
                                          <div className="space-y-4">
                                            {part.questions.map((question: any, qIndex: number) => (
                                              <div key={qIndex} className="bg-white rounded border p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                  <h4 className="font-medium text-gray-900">Question {qIndex + 1}</h4>
                                                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    {question.points} pts
                                                  </span>
                                                </div>
                                                <p className="text-gray-700 whitespace-pre-wrap">{question.question}</p>
                                                <div className="mt-3 border-t pt-3">
                                                  <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                      Your Answer:
                                                    </label>
                                                    <Button
                                                      type="button"
                                                      variant="outline"
                                                      size="sm"
                                                      onClick={() => {
                                                        setActiveTextarea(`${selectedModuleData.week}_${question.id}`);
                                                        setLogicKeyboardOpen(true);
                                                      }}
                                                      className="flex items-center space-x-1"
                                                    >
                                                      <Keyboard className="w-4 h-4" />
                                                      <span>Logic Symbols</span>
                                                    </Button>
                                                  </div>
                                                  <textarea 
                                                    className="w-full p-3 border rounded-lg min-h-[100px] font-mono text-sm"
                                                    placeholder="Enter your answer using symbolic logic notation..."
                                                    value={homeworkAnswers[`${selectedModuleData.week}_${question.id}`] || ''}
                                                    onChange={(e) => setHomeworkAnswers(prev => ({
                                                      ...prev,
                                                      [`${selectedModuleData.week}_${question.id}`]: e.target.value
                                                    }))}
                                                    onFocus={() => setActiveTextarea(`${selectedModuleData.week}_${question.id}`)}
                                                  />
                                                  <div className="text-xs text-gray-500 mt-1">
                                                    Use the Logic Symbols button to insert ∀, ∃, →, ∧, ∨, ¬ and other symbolic logic notation
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                } else {
                                  // Fallback for non-JSON format
                                  return <div dangerouslySetInnerHTML={{ 
                                    __html: homeworkText.replace(/\n/g, '<br/>') 
                                  }} />;
                                }
                              } catch (error) {
                                // Fallback for parsing errors
                                return <div dangerouslySetInnerHTML={{ 
                                  __html: generatedHomework[selectedModuleData.week].replace(/\n/g, '<br/>') 
                                }} />;
                              }
                            })()}
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button 
                            size="lg" 
                            className="flex items-center space-x-2"
                            onClick={() => startHomework(selectedModuleData.week)}
                          >
                            <Play className="w-4 h-4" />
                            <span>Start Homework</span>
                          </Button>
                          <Button variant="outline" size="lg">
                            Download PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="lg"
                            onClick={() => generateHomework(selectedModuleData.week)}
                            disabled={generatingHomework}
                          >
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="space-y-6 hidden">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">⚠️ Important Notice</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• You have unlimited time to complete this homework</li>
                          <li>• Late submissions receive an automatic 0</li>
                          <li>• GPTZero score above 50% results in automatic 0</li>
                          <li>• You can only submit this homework once</li>
                          <li>• This homework is worth 50 points toward your final grade</li>
                        </ul>
                      </div>

                      <div className="bg-white border rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">
                          Homework {selectedModuleData.week}: {selectedModuleData.title}
                        </h4>
                        
                        <div className="space-y-6">
                          <div>
                            <h5 className="font-medium mb-2">Part 1: Translation (20 points)</h5>
                            <p className="text-sm text-muted-foreground mb-3">
                              Translate the following English statements into symbolic logic notation.
                            </p>
                            
                            {selectedModuleData.week === 1 && (
                              <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="mb-2">Let:</p>
                                  <ul className="text-sm space-y-1">
                                    <li>p = "It rains"</li>
                                    <li>q = "The streets are wet"</li>
                                    <li>r = "People use umbrellas"</li>
                                    <li>s = "Traffic slows down"</li>
                                  </ul>
                                </div>
                                
                                <div className="space-y-2">
                                  <p>1. "If it rains, then the streets are wet and people use umbrellas." (5 points)</p>
                                  <p>2. "Either traffic slows down or it's not raining." (5 points)</p>
                                  <p>3. "It's not true that when it rains, traffic slows down." (5 points)</p>
                                  <p>4. "If the streets are wet and people use umbrellas, then it must be raining." (5 points)</p>
                                </div>
                              </div>
                            )}

                            {selectedModuleData.week === 2 && (
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <p>1. Create a truth table for: (p ∧ q) → ¬r (10 points)</p>
                                  <p>2. Using natural deduction, prove: p → q, q → r ⊢ p → r (10 points)</p>
                                </div>
                              </div>
                            )}

                            {selectedModuleData.week === 3 && (
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <p>1. Simplify using Boolean laws: ¬(p ∧ ¬q) ∨ (¬p ∧ q) (10 points)</p>
                                  <p>2. Convert to DNF: (p → q) ∧ (q → r) (10 points)</p>
                                </div>
                              </div>
                            )}

                            {selectedModuleData.week === 4 && (
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <p>1. Translate: "All students who study pass the exam" (10 points)</p>
                                  <p>2. Translate: "Some professors teach both logic and mathematics" (10 points)</p>
                                </div>
                              </div>
                            )}

                            {selectedModuleData.week === 5 && (
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <p>1. Express uniqueness: "There is exactly one prime number that is even" (10 points)</p>
                                  <p>2. Translate the continuity definition using quantifiers (10 points)</p>
                                </div>
                              </div>
                            )}

                            {selectedModuleData.week === 6 && (
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <p>1. Construct a model that makes ∀x∃yR(x,y) true but ∃y∀xR(x,y) false (10 points)</p>
                                  <p>2. Prove consistency of: ∀x∃yR(x,y), ∀x¬R(x,x), ∀x∀y∀z((R(x,y) ∧ R(y,z)) → R(x,z)) (10 points)</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Part 2: Analysis (30 points)</h5>
                            <div className="space-y-2">
                              {selectedModuleData.week === 1 && (
                                <>
                                  <p>1. Explain the difference between material implication and strict implication using examples. (15 points)</p>
                                  <p>2. Analyze why ¬(p ∧ q) is logically equivalent to (¬p ∨ ¬q). (15 points)</p>
                                </>
                              )}
                              {selectedModuleData.week === 2 && (
                                <>
                                  <p>1. Compare truth-functional and natural deduction approaches to validity. (15 points)</p>
                                  <p>2. Explain when a truth table method is more efficient than natural deduction. (15 points)</p>
                                </>
                              )}
                              {selectedModuleData.week === 3 && (
                                <>
                                  <p>1. Explain the relationship between Boolean algebra and propositional logic. (15 points)</p>
                                  <p>2. Demonstrate why every Boolean function can be expressed in CNF and DNF. (15 points)</p>
                                </>
                              )}
                              {selectedModuleData.week === 4 && (
                                <>
                                  <p>1. Compare the expressive power of propositional vs predicate logic. (15 points)</p>
                                  <p>2. Explain why quantifier order matters with examples. (15 points)</p>
                                </>
                              )}
                              {selectedModuleData.week === 5 && (
                                <>
                                  <p>1. Analyze the logical structure of mathematical definitions like limits. (15 points)</p>
                                  <p>2. Explain how uniqueness quantifiers relate to existence and universal quantifiers. (15 points)</p>
                                </>
                              )}
                              {selectedModuleData.week === 6 && (
                                <>
                                  <p>1. Distinguish between semantic and syntactic approaches to logic. (15 points)</p>
                                  <p>2. Explain the role of models in proving invalidity vs consistency. (15 points)</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {!homeworkStarted[selectedModuleData.week] ? (
                        <div className="flex space-x-4">
                          <Button 
                            size="lg" 
                            className="flex items-center space-x-2"
                            onClick={() => startHomework(selectedModuleData.week)}
                          >
                            <Play className="w-4 h-4" />
                            <span>Start Homework</span>
                          </Button>
                          <Button variant="outline" size="lg">
                            Download PDF
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800 font-medium">🕒 Homework Started - Complete and submit below</p>
                          </div>

                          {/* Answer Input Forms */}
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h5 className="font-semibold text-lg">Part 1 Answers:</h5>
                              
                              {selectedModuleData.week === 1 && (
                                <div className="space-y-4">
                                  {[1, 2, 3, 4].map(num => (
                                    <div key={num} className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium">Question {num} Answer:</label>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setActiveTextarea(`w${selectedModuleData.week}_p1_q${num}`);
                                            setLogicKeyboardOpen(true);
                                          }}
                                          className="flex items-center space-x-1"
                                        >
                                          <Keyboard className="w-4 h-4" />
                                          <span>Logic Symbols</span>
                                        </Button>
                                      </div>
                                      <textarea
                                        className="w-full border rounded-lg p-3 min-h-[100px] font-mono"
                                        placeholder="Enter your symbolic logic translation here..."
                                        value={homeworkAnswers[`w${selectedModuleData.week}_p1_q${num}`] || ''}
                                        onChange={(e) => updateAnswer(`w${selectedModuleData.week}_p1_q${num}`, e.target.value)}
                                        onFocus={() => setActiveTextarea(`w${selectedModuleData.week}_p1_q${num}`)}
                                      />
                                      <div className="text-xs text-gray-500">
                                        Use the Logic Symbols button to insert ∀, ∃, →, ∧, ∨, ¬ and other notation
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {selectedModuleData.week > 1 && (
                                <div className="space-y-4">
                                  {[1, 2].map(num => (
                                    <div key={num} className="space-y-2">
                                      <label className="text-sm font-medium">Question {num} Answer:</label>
                                      <textarea
                                        className="w-full border rounded-lg p-3 min-h-[120px]"
                                        placeholder="Enter your detailed solution here..."
                                        value={homeworkAnswers[`w${selectedModuleData.week}_p1_q${num}`] || ''}
                                        onChange={(e) => updateAnswer(`w${selectedModuleData.week}_p1_q${num}`, e.target.value)}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-4">
                              <h5 className="font-semibold text-lg">Part 2 Answers:</h5>
                              {[1, 2].map(num => (
                                <div key={num} className="space-y-2">
                                  <label className="text-sm font-medium">Analysis Question {num}:</label>
                                  <textarea
                                    className="w-full border rounded-lg p-3 min-h-[150px]"
                                    placeholder="Provide your detailed analysis and explanation..."
                                    value={homeworkAnswers[`w${selectedModuleData.week}_p2_q${num}`] || ''}
                                    onChange={(e) => updateAnswer(`w${selectedModuleData.week}_p2_q${num}`, e.target.value)}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-4 pt-4 border-t">
                            <Button 
                              size="lg" 
                              className="flex items-center space-x-2"
                              onClick={() => submitHomework(selectedModuleData.week)}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Clock className="w-4 h-4 animate-spin" />
                                  <span>Submitting...</span>
                                </>
                              ) : (
                                <>
                                  <FileText className="w-4 h-4" />
                                  <span>Submit Homework</span>
                                </>
                              )}
                            </Button>
                            <Button variant="outline" size="lg">
                              Save Draft
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quiz" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Quiz/Test</span>
                      </div>
                      <Badge variant="outline">
                        {selectedModuleData.week === 4 ? "Midterm - 100 points" : "Quiz - 25 points"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Generate a timed quiz based on this week's material. Once you start, you'll have a limited time to complete it.
                      </p>
                      <Button className="flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Start Quiz</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <LogicKeyboard 
        isOpen={logicKeyboardOpen}
        onClose={() => setLogicKeyboardOpen(false)}
        onSymbolInsert={handleSymbolInsert}
      />
    </div>
  );
}