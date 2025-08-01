import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Clock, ExternalLink, Play } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface ModulesProps {
  onNavigateToLivingBook: (sectionId?: string) => void;
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

export default function Modules({ onNavigateToLivingBook }: ModulesProps) {
  const { user } = useAuth();
  const [selectedModule, setSelectedModule] = useState(1);
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
    // TODO: Implement LLM-generated homework creation
    setTimeout(() => {
      setGeneratingHomework(false);
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
              onClick={() => setSelectedModule(module.week)}
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
            onClick={() => setSelectedModule(7)}
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
            onClick={() => setSelectedModule(8)}
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
                    {!selectedModuleData.homeworkAvailable ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          Generate a graded homework assignment based on this week's material.
                        </p>
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
                      <div>
                        <p>Homework assignment would appear here after generation.</p>
                      </div>
                    )}
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
    </div>
  );
}