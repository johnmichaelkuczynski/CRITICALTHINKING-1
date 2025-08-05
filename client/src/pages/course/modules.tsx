import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { BookOpen, FileText, Clock, ExternalLink, Play, ToggleLeft, ToggleRight, RefreshCw, GraduationCap, Eye } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { presetLectures, presetPracticeHomework, presetPracticeQuizzes, presetPracticeTests, presetPracticeExams } from "@shared/preset-content";
import { InteractivePractice } from "@/components/interactive-practice";

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
  const [logicSymbolMode, setLogicSymbolMode] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [abbreviationGuides, setAbbreviationGuides] = useState<{[key: string]: string}>({});
  const [practiceHomeworkStarted, setPracticeHomeworkStarted] = useState<{[key: number]: boolean}>({});
  const [practiceQuizStarted, setPracticeQuizStarted] = useState<{[key: number]: boolean}>({});
  const [practiceMidtermStarted, setPracticeMidtermStarted] = useState(false);
  const [practiceFinalStarted, setPracticeFinalStarted] = useState(false);
  const [generatedPracticeMidterm, setGeneratedPracticeMidterm] = useState<string>('');
  const [generatedPracticeFinal, setGeneratedPracticeFinal] = useState<string | null>(null);
  const [practiceAnswers, setPracticeAnswers] = useState<{[key: string]: string}>({});
  const [generatedPracticeHomework, setGeneratedPracticeHomework] = useState<{[key: number]: string}>({});
  const [generatedPracticeQuiz, setGeneratedPracticeQuiz] = useState<{[key: number]: string}>({});
  const [generatingPracticeHomework, setGeneratingPracticeHomework] = useState(false);
  const [generatingPracticeQuiz, setGeneratingPracticeQuiz] = useState(false);
  const [showingLecture, setShowingLecture] = useState<{[key: number]: boolean}>({});
  const [generatingLecture, setGeneratingLecture] = useState(false);
  const [generatedLectures, setGeneratedLectures] = useState<{[key: number]: string}>({});
  const [loadingStates, setLoadingStates] = useState<{midterm: boolean, final: boolean}>({ midterm: false, final: false });

  // Update selected module when selectedWeek prop changes
  useEffect(() => {
    if (selectedWeek) {
      setSelectedModule(selectedWeek);
    }
  }, [selectedWeek]);
  const [generatingHomework, setGeneratingHomework] = useState(false);
  const [showLogicKeyboard, setShowLogicKeyboard] = useState(false);
  const [keyboardPosition, setKeyboardPosition] = useState({ x: 100, y: 100 });
  const [keyboardSize, setKeyboardSize] = useState({ width: 300, height: 200 });

  const modules: ModuleData[] = [
    {
      week: 1,
      title: "Critical Thinking Foundations and Argument Recognition",
      livingBookSection: "section-1",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 2,
      title: "Understanding Arguments and Logical Structure",
      livingBookSection: "section-2",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 3,
      title: "Scientific and Empirical Reasoning",
      livingBookSection: "section-3",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 4,
      title: "Statistical Thinking and Data Analysis",
      livingBookSection: "section-4",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: true,
      status: "available"
    },
    {
      week: 5,
      title: "Media Analysis and Information Evaluation",
      livingBookSection: "section-5",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: false,
      status: "available"
    },
    {
      week: 6,
      title: "Applied Critical Reasoning and Decision Making",
      livingBookSection: "section-6",
      lectureGenerated: false,
      homeworkAvailable: true,
      testAvailable: true,
      status: "available"
    }
  ];

  const convertSelectedText = async (textareaId: string) => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (!selectedText.trim()) {
      alert('Please select text to convert to logic notation.');
      return;
    }

    setIsConverting(true);
    
    try {
      const response = await fetch('/api/chat/convert-logic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: selectedText,
          model: selectedAIModel
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Replace selected text with conversion
        const newValue = textarea.value.substring(0, start) + data.converted + textarea.value.substring(end);
        setPracticeAnswers(prev => ({
          ...prev,
          [textareaId]: newValue
        }));
        
        // Update textarea value
        textarea.value = newValue;
        
        // Position cursor after converted text
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + data.converted.length, start + data.converted.length);
        }, 0);
      } else {
        alert('Conversion failed: ' + data.error);
      }
    } catch (error) {
      console.error('Logic conversion error:', error);
      alert('Error converting text. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  // Show preset content functions
  const showPresetLecture = (weekNumber: number) => {
    console.log("Show Lecture Summary clicked for week:", weekNumber);
    const presetContent = presetLectures[weekNumber as keyof typeof presetLectures];
    console.log("Preset content found:", presetContent);
    
    if (presetContent) {
      setGeneratedLectures(prev => ({
        ...prev,
        [weekNumber]: presetContent.content
      }));
      setShowingLecture(prev => ({ ...prev, [weekNumber]: true }));
      console.log("Lecture content set successfully");
    } else {
      console.error("No preset content found for week", weekNumber);
      alert(`No preset lecture content available for Week ${weekNumber}`);
    }
  };

  const showPresetPracticeHomework = (weekNumber: number) => {
    const presetContent = presetPracticeHomework[weekNumber as keyof typeof presetPracticeHomework];
    if (presetContent) {
      // Don't set the content in generatedPracticeHomework for structured content
      // The InteractivePractice component will read directly from presetPracticeHomework
      setPracticeHomeworkStarted(prev => ({ ...prev, [weekNumber]: true }));
    }
  };



  const showPresetPracticeQuiz = (weekNumber: number) => {
    const presetContent = presetPracticeQuizzes[weekNumber as keyof typeof presetPracticeQuizzes];
    if (presetContent) {
      // Just mark as started - the InteractivePractice will read directly from presetPracticeQuizzes
      setPracticeQuizStarted(prev => ({ ...prev, [weekNumber]: true }));
    }
  };

  const insertLogicSymbol = (symbol: string, textareaId: string) => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = practiceAnswers[textareaId] || '';
    
    const newValue = currentValue.substring(0, start) + symbol + currentValue.substring(end);
    setPracticeAnswers(prev => ({
      ...prev,
      [textareaId]: newValue
    }));
    
    // Update textarea and focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + symbol.length, start + symbol.length);
    }, 0);
  };

  const generateLecture = async (weekNumber: number) => {
    console.log("Generate New Lecture clicked for week:", weekNumber);
    setGeneratingLecture(true);
    
    // Clear existing content to force fresh generation
    setGeneratedLectures(prev => ({
      ...prev,
      [weekNumber]: ''
    }));
    setShowingLecture(prev => ({
      ...prev,
      [weekNumber]: false
    }));
    
    const weekTopic = modules.find(m => m.week === weekNumber)?.title || 'Critical Thinking Foundations';
    const timestamp = Date.now();
    
    console.log("Sending lecture generation request:", { weekNumber, weekTopic });
    
    try {
      const response = await fetch('/api/lecture/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weekNumber,
          topic: weekTopic,
          courseMaterial: `Week ${weekNumber} covers ${weekTopic}. This is part of a 6-week Critical Thinking course. Generate fresh content - timestamp: ${timestamp}`,
          aiModel: selectedAIModel,
          seed: timestamp // Force unique generation
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("LLM response received:", data);
      
      if (data.success && data.lecture) {
        // Store the generated lecture content
        setGeneratedLectures(prev => ({
          ...prev,
          [weekNumber]: data.lecture
        }));
        setShowingLecture(prev => ({
          ...prev,
          [weekNumber]: true
        }));
        console.log('Lecture generated and stored successfully for week', weekNumber);
      } else {
        console.error('Lecture generation failed:', data.error || 'No lecture content returned');
        alert('Failed to generate lecture: ' + (data.error || 'No content returned from AI'));
      }
    } catch (error) {
      console.error('Error generating lecture:', error);
      alert('Error generating lecture. Please try again. Details: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setGeneratingLecture(false);
    }
  };

  const generatePracticeHomework = async (weekNumber: number) => {
    if (!user) {
      alert('Please log in to generate practice homework');
      return;
    }
    
    console.log("Generate New Practice Homework clicked for week:", weekNumber);
    setGeneratingPracticeHomework(true);
    
    // FORCE COMPLETE RESET - Clear all existing content to ensure fresh generation
    setPracticeHomeworkStarted(prev => ({ ...prev, [weekNumber]: false }));
    setGeneratedPracticeHomework(prev => ({
      ...prev,
      [weekNumber]: ''
    }));
    
    const timestamp = Date.now();
    const weekTopic = modules.find(m => m.week === weekNumber)?.title || 'Critical Thinking Foundations';
    
    console.log("Sending practice homework generation request:", { weekNumber, weekTopic });
    
    try {
      const response = await fetch('/api/homework/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weekNumber: weekNumber,
          topic: weekTopic,
          courseMaterial: `Week ${weekNumber} Critical Thinking Practice Session. This is part of an 8-week Critical Thinking course covering logical reasoning, argument analysis, decision-making, and problem-solving skills. Generate 5-10 unique questions - timestamp: ${timestamp}`,
          aiModel: selectedAIModel,
          isPractice: true,
          seed: timestamp, // Force unique generation
          questionCount: Math.floor(Math.random() * 6) + 5 // 5-10 questions randomly
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("LLM response received:", data);
      
      if (data.success && data.homework) {
        console.log('Practice homework generated successfully:', data.homework);
        setGeneratedPracticeHomework(prev => ({
          ...prev,
          [weekNumber]: data.homework
        }));
        setPracticeHomeworkStarted(prev => ({ ...prev, [weekNumber]: true }));
        console.log('Practice homework stored and session started');
      } else {
        console.error('Practice homework generation failed:', data.error || 'No homework content returned');
        throw new Error(data.error || 'No homework content returned from AI');
      }
      
    } catch (error) {
      console.error('Error generating practice homework:', error);
      alert('Failed to generate practice homework. Please try again. Details: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setGeneratingPracticeHomework(false);
    }
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
          courseMaterial: `Week ${weekNumber} covers ${weekTopic}. This is part of a 6-week Critical Thinking course.`,
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

  // Check if input is ready for conversion
  const isInputReadyForConversion = (text: string): boolean => {
    if (!text.trim()) return false;
    
    // Check minimum word count (at least 5 words)
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 5) return false;
    
    // Check parentheses balance
    const openParens = (text.match(/\(/g) || []).length;
    const closeParens = (text.match(/\)/g) || []).length;
    if (openParens !== closeParens) return false;
    
    // Check if already symbolic logic
    if (text.includes('∀') || text.includes('∃') || text.includes('∧') || text.includes('∨') || text.includes('→')) return false;
    
    return true;
  };

  // Generate abbreviation guide for translation questions
  const generateAbbreviationGuide = async (questionText: string, fieldId: string) => {
    if (abbreviationGuides[fieldId]) return; // Already generated
    
    try {
      const response = await fetch('/api/chat/generate-abbreviations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          questionText,
          aiModel: 'anthropic'
        })
      });
      
      const data = await response.json();
      if (data.success && data.abbreviations) {
        setAbbreviationGuides(prev => ({
          ...prev,
          [fieldId]: data.abbreviations
        }));
      }
    } catch (error) {
      console.error('Abbreviation generation error:', error);
    }
  };

  // Convert natural language to symbolic logic and replace textarea content
  const convertToSymbolicLogic = async (fieldId: string, text: string) => {
    if (!text.trim() || !logicSymbolMode) return;
    
    setIsConverting(true);
    try {
      const response = await fetch('/api/chat/convert-logic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text,
          aiModel: 'anthropic'
        })
      });
      
      const data = await response.json();
      if (data.success && data.converted) {
        // Replace the textarea content with converted symbolic logic
        setHomeworkAnswers(prev => ({
          ...prev,
          [fieldId]: data.converted
        }));
      }
    } catch (error) {
      console.error('Logic conversion error:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleTextareaChange = (fieldId: string, value: string) => {
    setHomeworkAnswers(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Auto-convert after user stops typing when logic mode is on
    if (logicSymbolMode && value.trim() && !isConverting) {
      setTimeout(() => {
        if (isInputReadyForConversion(value)) {
          convertToSymbolicLogic(fieldId, value);
        }
      }, 1500);
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

  const handlePracticeComplete = async (
    practiceType: 'homework' | 'quiz' | 'test',
    weekNumber: number,
    score: number,
    answers: Record<string, any>,
    timeSpent: number
  ) => {
    if (!user) return;

    try {
      const response = await fetch('/api/practice/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          practiceType,
          weekNumber,
          score,
          answers,
          timeSpent
        }),
      });

      if (response.ok) {
        console.log('Practice performance logged successfully');
      }
    } catch (error) {
      console.error('Error logging practice performance:', error);
    }
  };

  const generatePracticeQuiz = async (weekNumber: number) => {
    if (!user) {
      alert('Please log in to generate practice quiz');
      return;
    }
    
    console.log("Generate New Practice Quiz clicked for week:", weekNumber);
    setGeneratingPracticeQuiz(true);
    
    // FORCE COMPLETE RESET - Clear all existing content to ensure fresh generation
    setPracticeQuizStarted(prev => ({ ...prev, [weekNumber]: false }));
    setGeneratedPracticeQuiz(prev => ({
      ...prev,
      [weekNumber]: ''
    }));
    
    const timestamp = Date.now();
    const weekTopic = modules.find(m => m.week === weekNumber)?.title || 'Critical Thinking Foundations';
    
    console.log("Sending practice quiz generation request:", { weekNumber, weekTopic });
    
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceText: `Week ${weekNumber}: ${weekTopic}. This is part of a 6-week Critical Thinking course. Generate fresh content - timestamp: ${timestamp}`,
          instructions: 'Generate a practice quiz with 6-8 Critical Thinking problems, argument analysis, and reasoning assessment questions.',
          model: selectedAIModel,
          isPractice: true,
          questionCount: Math.floor(Math.random() * 3) + 6, // 6-8 questions randomly
          seed: timestamp // Force unique generation
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("LLM response received:", data);
      
      if (data.quiz && data.quiz.testContent) {
        console.log('Practice quiz generated successfully:', data.quiz.testContent);
        setGeneratedPracticeQuiz(prev => ({
          ...prev,
          [weekNumber]: data.quiz.testContent
        }));
        setPracticeQuizStarted(prev => ({ ...prev, [weekNumber]: true }));
        console.log('Practice quiz stored and session started');
      } else {
        console.error('Practice quiz generation failed:', 'No quiz content returned');
        throw new Error('No quiz content returned from AI');
      }
      
    } catch (error) {
      console.error('Error generating practice quiz:', error);
      alert('Failed to generate practice quiz. Please try again. Details: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setGeneratingPracticeQuiz(false);
    }
  };

  const startPracticeMidterm = async () => {
    console.log('Start Practice Midterm clicked - current state:', { generatedPracticeMidterm: !!generatedPracticeMidterm, practiceMidtermStarted });
    
    if (!generatedPracticeMidterm) {
      console.log('No generated content, creating new practice midterm...');
      setLoadingStates(prev => ({ ...prev, midterm: true }));
      await generateNewPracticeExam('midterm');
    } else {
      console.log('Starting practice midterm with existing content');
      setPracticeMidtermStarted(true);
      setTimeout(() => {
        console.log('Practice midterm started state after timeout:', practiceMidtermStarted);
      }, 200);
    }
  };

  const startPracticeFinal = async () => {
    console.log('Start Practice Final clicked - current state:', { generatedPracticeFinal: !!generatedPracticeFinal, practiceFinalStarted });
    
    if (!generatedPracticeFinal) {
      console.log('No generated content, creating new practice final...');
      setLoadingStates(prev => ({ ...prev, final: true }));
      // generateNewPracticeExam will automatically start the practice after generation
      await generateNewPracticeExam('final');
    } else {
      console.log('Starting practice final with existing content');
      setPracticeFinalStarted(true);
      setTimeout(() => {
        console.log('Practice final started state after timeout:', practiceFinalStarted);
      }, 200);
    }
  };

  const generateNewPracticeExam = async (examType: 'midterm' | 'final') => {
    if (examType === 'midterm') {
      // Generate new AI practice midterm
      console.log('Generate New Practice Midterm clicked');
      setLoadingStates(prev => ({ ...prev, midterm: true }));
      
      const requestData = {
        examType: 'midterm',
        totalQuestions: 10,
        sections: [
          'Critical Thinking Foundations',
          'Argument Analysis', 
          'Evidence and Decision Making'
        ]
      };
      
      console.log('Sending practice midterm generation request:', requestData);
      
      try {
        const response = await fetch('/api/practice-final/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        console.log('Practice midterm LLM response received:', result);
        
        if (result.success) {
          console.log('Practice midterm generated successfully:', result.finalExam);
          
          // Store the generated content and start practice session
          setGeneratedPracticeMidterm(result.finalExam);
          console.log('Practice midterm content stored, starting practice session...');
          
          // Clear existing state and start fresh
          setPracticeMidtermStarted(false);
          setTimeout(() => {
            setPracticeMidtermStarted(true);
            setLoadingStates(prev => ({ ...prev, midterm: false }));
            console.log('Practice midterm session started successfully');
          }, 200);
        } else {
          console.error('Practice midterm generation failed:', result.error);
          setLoadingStates(prev => ({ ...prev, midterm: false }));
          alert('Failed to generate practice midterm. Please try again.');
        }
      } catch (error) {
        console.error('Error generating practice midterm:', error);
        setLoadingStates(prev => ({ ...prev, midterm: false }));
        alert('Error generating practice midterm. Please try again.');
      }
    } else {
      // Generate new AI practice final
      console.log('Generate New Practice Final clicked');
      setLoadingStates(prev => ({ ...prev, final: true }));
      
      const requestData = {
        examType: 'final',
        totalQuestions: 12,
        sections: [
          'Critical Thinking Foundations',
          'Argument Analysis and Evidence Evaluation', 
          'Bias Detection and Media Analysis',
          'Decision-Making and Problem-Solving Integration'
        ]
      };
      
      console.log('Sending practice final generation request:', requestData);
      
      try {
        const response = await fetch('/api/practice-final/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        console.log('LLM response received:', result);
        
        if (result.success) {
          console.log('Practice final generated successfully:', result.finalExam);
          
          // Store the generated content and start practice session
          setGeneratedPracticeFinal(result.finalExam);
          console.log('Practice final content stored, starting practice session...');
          
          // Clear existing state and start fresh
          setPracticeFinalStarted(false);
          setTimeout(() => {
            setPracticeFinalStarted(true);
            setLoadingStates(prev => ({ ...prev, final: false }));
            console.log('Practice final session started successfully');
          }, 200);
        } else {
          console.error('Practice final generation failed:', result.error);
          setLoadingStates(prev => ({ ...prev, final: false }));
          alert('Failed to generate practice final. Please try again.');
        }
      } catch (error) {
        console.error('Error generating practice final:', error);
        setLoadingStates(prev => ({ ...prev, final: false }));
        alert('Error generating practice final. Please try again.');
      }
    }
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
              selectedModule === 6.5 ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => {
              setSelectedModule(6.5);
              onWeekChange?.(6.5);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">Practice Midterm</h3>
                  <p className="text-xs text-muted-foreground">Unlimited practice exams</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">🎯 Practice</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
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
              selectedModule === 7.5 ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => {
              setSelectedModule(7.5);
              onWeekChange?.(7.5);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">Practice Final</h3>
                  <p className="text-xs text-muted-foreground">Unlimited practice exams</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">🎯 Practice</Badge>
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
        {selectedModule === 6.5 ? (
          // Practice Midterm Module
          <div className="max-w-4xl">
            {!practiceMidtermStarted ? (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2">Practice Midterm Exam</h1>
                  <div className="flex items-center space-x-4">
                    <Badge variant="default" className="bg-green-100 text-green-800">🎯 Practice Mode</Badge>
                    <Badge variant="outline">100 points</Badge>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Practice Midterm Examination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Practice for your midterm exam with unlimited attempts. These exams cover material from Weeks 1-4.
                      </p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">✅ Practice Benefits</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Take as many practice exams as you want</li>
                          <li>• No time pressure - learn at your own pace</li>
                          <li>• No grades recorded - purely for learning</li>
                          <li>• Get immediate feedback on answers</li>
                          <li>• Similar format to the actual midterm</li>
                        </ul>
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          size="lg" 
                          className="flex items-center space-x-2" 
                          onClick={startPracticeMidterm}
                          disabled={loadingStates.midterm}
                        >
                          {loadingStates.midterm ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Starting...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Start Practice Midterm</span>
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="flex items-center space-x-2" 
                          onClick={() => generateNewPracticeExam('midterm')}
                          disabled={loadingStates.midterm}
                        >
                          {loadingStates.midterm ? (
                            <>
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-4 h-4" />
                              <span>Generate New Practice Midterm</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Show Interactive Practice Test (use generated content if available, otherwise preset)
              (() => {
                if (generatedPracticeMidterm) {
                  // Use AI-generated content
                  try {
                    const midtermData = JSON.parse(generatedPracticeMidterm);
                    const processedQuestions = midtermData.questions?.map((q: any, index: number) => {
                      console.log(`DEBUG: Processing question ${index + 1}:`, q);
                      return {
                        id: `midterm-problem-${index + 1}`,
                        title: `Question ${index + 1}: ${q.section || 'Critical Thinking'}`,
                        points: q.points || 10,
                        type: (q.type === 'short_answer' || q.type === 'essay') ? 'text_input' : 'multiple_choice' as const,
                        context: '',
                        questions: [
                          {
                            id: q.id || `pm-q${index + 1}`,
                            question: q.question,
                            options: q.options || [],
                            correct: q.correctAnswerIndex ?? q.correctAnswer ?? 0,
                            answer: q.correctAnswer || '',
                            explanation: `This question tests ${q.section || 'critical thinking skills'}.`
                          }
                        ]
                      };
                    }) || [];

                    const practiceContent = {
                      instructions: midtermData.instructions || "This is a practice midterm exam designed to test your critical thinking skills.",
                      totalPoints: midtermData.totalPoints || 100,
                      problems: processedQuestions
                    };

                    console.log('DEBUG: Practice midterm content structure:', practiceContent);
                    console.log('DEBUG: Problems count:', practiceContent.problems.length);

                    return (
                      <InteractivePractice
                        title="AI-Generated Practice Midterm"
                        content={practiceContent}
                        practiceType="test"
                        weekNumber={1}
                        onComplete={(score: number, answers: Record<string, any>, timeSpent: number) => 
                          handlePracticeComplete('test', 1, score, answers, timeSpent)
                        }
                      />
                    );
                  } catch (error) {
                    console.error('Error parsing generated practice midterm:', error);
                    // Fall back to preset content
                  }
                }
                
                // Use preset content as fallback
                const presetContent = presetPracticeExams.midterm;
                if (presetContent && typeof presetContent.content === 'object') {
                  return (
                    <InteractivePractice
                      title={presetContent.title}
                      content={presetContent.content as any}
                      practiceType="test"
                      weekNumber={1}
                      onComplete={(score: number, answers: Record<string, any>, timeSpent: number) => 
                        handlePracticeComplete('test', 1, score, answers, timeSpent)
                      }
                    />
                  );
                }
                return null;
              })()
            )}
          </div>
        ) : selectedModule === 7 ? (
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
        ) : selectedModule === 7.5 ? (
          // Practice Final Exam Module
          <div className="max-w-4xl">
            {!practiceFinalStarted ? (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2">Practice Final Exam</h1>
                  <div className="flex items-center space-x-4">
                    <Badge variant="default" className="bg-green-100 text-green-800">🎯 Practice Mode</Badge>
                    <Badge variant="outline">
                      {generatedPracticeFinal ? (
                        (() => {
                          try {
                            const data = JSON.parse(generatedPracticeFinal);
                            return `${data.questions?.length || 0} questions • ${data.totalPoints || 200} points`;
                          } catch {
                            return "200 points";
                          }
                        })()
                      ) : (
                        "200 points"
                      )}
                    </Badge>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Practice Final Examination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Practice for your final exam with unlimited attempts. This comprehensive exam covers all course material from Weeks 1-6.
                      </p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">✅ Practice Benefits</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Take as many practice exams as you want</li>
                          <li>• No time pressure - learn at your own pace</li>
                          <li>• No grades recorded - purely for learning</li>
                          <li>• Get immediate feedback on answers</li>
                          <li>• Same format as the actual final exam</li>
                        </ul>
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          size="lg" 
                          className="flex items-center space-x-2" 
                          onClick={startPracticeFinal}
                          disabled={loadingStates.final}
                        >
                          {loadingStates.final ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Starting...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Start Practice Final</span>
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="flex items-center space-x-2" 
                          onClick={() => generateNewPracticeExam('final')}
                          disabled={loadingStates.final}
                        >
                          {loadingStates.final ? (
                            <>
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-4 h-4" />
                              <span>Generate New Practice Final</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Show AI-Generated Practice Final
              (() => {
                // Use AI-generated content if available, otherwise show loading/error
                if (generatedPracticeFinal) {
                  try {
                    const finalExamData = JSON.parse(generatedPracticeFinal);
                    console.log('Rendering AI-generated practice final:', finalExamData.title);
                    console.log('DEBUG: Final exam data:', finalExamData);
                    console.log('DEBUG: Questions array:', finalExamData.questions);
                    console.log('DEBUG: Questions count:', finalExamData.questions?.length);
                    
                    // Convert AI-generated content to InteractivePractice format
                    const practiceContent = {
                      instructions: finalExamData.instructions || "Comprehensive Practice Final covering all course material from Weeks 1-6. This is your opportunity to test your complete understanding of critical thinking.",
                      totalPoints: finalExamData.totalPoints || 200,
                      problems: finalExamData.questions?.map((q: any, index: number) => {
                        console.log(`DEBUG: Processing question ${index + 1}:`, q);
                        return {
                          id: `final-problem-${index + 1}`,
                          title: `Question ${index + 1}: ${q.section || 'Critical Thinking'}`,
                          points: q.points || 15,
                          type: (q.type === 'short_answer' || q.type === 'essay') ? 'text_input' : 'multiple_choice' as const,
                          context: '', // Don't duplicate the question in context
                          questions: [
                            {
                              id: q.id || `pf-q${index + 1}`,
                              question: q.question,
                              options: q.options || [],
                              correct: q.correctAnswerIndex ?? q.correctAnswer ?? 0, // Use actual correct answer index from AI
                              answer: q.correctAnswer || '', // Store the text of correct answer too
                              explanation: `This question tests ${q.section || 'critical thinking skills'}.`
                            }
                          ]
                        };
                      }) || []
                    };
                    
                    console.log('DEBUG: Practice content structure:', practiceContent);
                    console.log('DEBUG: Problems count:', practiceContent.problems.length);
                    
                    // CRITICAL: Ensure each problem has questions array populated
                    if (practiceContent.problems.length === 0) {
                      console.error('CRITICAL ERROR: No problems generated!');
                      throw new Error('No problems generated from AI response');
                    }
                    
                    practiceContent.problems.forEach((problem, index) => {
                      console.log(`DEBUG: Problem ${index + 1} questions:`, problem.questions.length);
                      if (problem.questions.length === 0) {
                        console.error(`CRITICAL ERROR: Problem ${index + 1} has no questions!`);
                      }
                    });

                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold">{finalExamData.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {finalExamData.questions?.length || 0} questions • {finalExamData.totalPoints || 200} points
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center space-x-2" 
                            onClick={() => generateNewPracticeExam('final')}
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Generate New Practice Final</span>
                          </Button>
                        </div>
                        
                        <InteractivePractice
                          title="Practice Final Exam (Comprehensive)"
                          content={practiceContent}
                          practiceType="test"
                          weekNumber={6}
                          onComplete={(score: number, answers: Record<string, any>, timeSpent: number) => 
                            handlePracticeComplete('test', 6, score, answers, timeSpent)
                          }
                        />
                      </div>
                    );
                  } catch (error) {
                    console.error('Error parsing generated practice final:', error);
                    return (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Error loading practice final. Please generate a new one.</p>
                        <Button 
                          className="mt-4" 
                          onClick={() => generateNewPracticeExam('final')}
                        >
                          Generate New Practice Final
                        </Button>
                      </div>
                    );
                  }
                } else {
                  // Show message to generate practice final
                  return (
                    <div className="text-center py-8 space-y-4">
                      <h3 className="text-lg font-semibold">Practice Final Ready to Generate</h3>
                      <p className="text-muted-foreground">
                        Click below to generate a comprehensive AI-powered practice final exam.
                      </p>
                      <Button 
                        size="lg" 
                        className="flex items-center space-x-2"
                        onClick={() => generateNewPracticeExam('final')}
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Generate Practice Final</span>
                      </Button>
                    </div>
                  );
                }
              })()
            )}
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="lecture">Lecture Summary</TabsTrigger>
                <TabsTrigger value="practice-homework">Practice Homework</TabsTrigger>
                <TabsTrigger value="homework">Homework</TabsTrigger>
                <TabsTrigger value="practice-quiz">Practice Quiz/Test</TabsTrigger>
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
                    {showingLecture[selectedModuleData.week] || generatedLectures[selectedModuleData.week] ? (
                      <div className="space-y-4">
                        <div className="prose max-w-none dark:prose-invert">
                          <div 
                            className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                              __html: (() => {
                                const content = generatedLectures[selectedModuleData.week] || '';
                                
                                // If content is already HTML (from preset), return as-is
                                if (content.includes('<h') || content.includes('<p') || content.includes('<ul')) {
                                  return content;
                                }
                                
                                // If content is markdown/plain text (from AI generation), convert it
                                return content
                                  .replace(/#{1,6}\s*/g, '') // Remove markdown headers
                                  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Bold markdown
                                  .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Italic markdown
                                  .replace(/###+/g, '') // Remove extra hash symbols
                                  .replace(/\s*-\s*Form:/g, '\n\n<strong>Form:</strong>') // Clean up form sections
                                  .replace(/\s*-\s*Example:/g, '\n\n<strong>Example:</strong>') // Clean up example sections
                                  .replace(/\s*###\s*/g, '\n\n') // Replace section dividers
                                  .replace(/\s{3,}/g, ' ') // Remove excessive spaces
                                  .replace(/^\s+|\s+$/g, '') // Trim whitespace
                                  .split('\n\n')
                                  .map(line => line.trim())
                                  .filter(line => line.length > 0)
                                  .map(line => `<p>${line}</p>`)
                                  .join('\n');
                              })()
                            }}
                          />
                        </div>
                        <div className="flex space-x-4 pt-4 border-t">
                          <Button
                            variant="outline"
                            onClick={() => generateLecture(selectedModuleData.week)}
                            disabled={generatingLecture}
                            className="flex items-center space-x-2"
                          >
                            {generatingLecture ? (
                              <>
                                <Clock className="w-4 h-4 animate-spin" />
                                <span>Generating New...</span>
                              </>
                            ) : (
                              <>
                                <RefreshCw className="w-4 h-4" />
                                <span>Generate New Lecture</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          {presetLectures[selectedModuleData.week as keyof typeof presetLectures] 
                            ? "View pre-existing lecture summary or generate a new AI-powered summary."
                            : "Generate an AI-powered lecture summary for this week's content."
                          }
                        </p>
                        <div className="flex justify-center space-x-4">
                          {/* Only show "Show Lecture Summary" if preset content exists for this week */}
                          {presetLectures[selectedModuleData.week as keyof typeof presetLectures] && (
                            <Button
                              variant="outline"
                              onClick={() => showPresetLecture(selectedModuleData.week)}
                              className="flex items-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Show Lecture Summary</span>
                            </Button>
                          )}
                          <Button
                            onClick={() => generateLecture(selectedModuleData.week)}
                            disabled={generatingLecture}
                            className="flex items-center space-x-2"
                          >
                            {generatingLecture ? (
                              <>
                                <Clock className="w-4 h-4 animate-spin" />
                                <span>Generating...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span>Generate AI Lecture</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="practice-homework" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Practice Homework</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">🎯 Practice Mode</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Practice homework problems for Week {selectedModuleData.week} with unlimited attempts. No grades recorded.
                      </p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">✅ Practice Benefits</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Take as many practice assignments as you want</li>
                          <li>• Learn without grade pressure</li>
                          <li>• Get immediate feedback on answers</li>
                          <li>• Similar format to graded homework</li>
                          <li>• Master concepts before taking graded version</li>
                        </ul>
                      </div>

                      {/* ALWAYS SHOW GENERATE NEW BUTTON */}
                      <div className="flex justify-center mb-6">
                        <Button 
                          variant="outline"
                          className="flex items-center space-x-2 border-green-300 text-green-700 hover:bg-green-50"
                          onClick={() => generatePracticeHomework(selectedModuleData.week)}
                          disabled={generatingPracticeHomework}
                        >
                          {generatingPracticeHomework ? (
                            <>
                              <Clock className="w-4 h-4 animate-spin" />
                              <span>Generating New Practice...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-4 h-4" />
                              <span>Generate New Practice Homework</span>
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Check if we have generated content first, then fallback to preset */}
                      {(() => {
                        // Priority 1: Show generated content if it exists
                        if (generatedPracticeHomework[selectedModuleData.week]) {
                          const generatedText = generatedPracticeHomework[selectedModuleData.week];
                          try {
                            // Extract JSON from markdown code block
                            const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/);
                            if (jsonMatch) {
                              const homeworkData = JSON.parse(jsonMatch[1]);
                              // Convert to InteractivePractice format
                              const interactiveContent = {
                                instructions: homeworkData.instructions,
                                totalPoints: homeworkData.totalPoints || 100,
                                problems: homeworkData.parts?.map((part: any, index: number) => ({
                                  id: `part-${index + 1}`,
                                  title: part.title,
                                  points: part.points,
                                  type: 'text_input' as const,
                                  questions: part.questions?.map((q: any) => ({
                                    id: q.id,
                                    question: q.question,
                                    answer: '', // Empty answer for practice homework - no correct answers shown
                                    explanation: q.explanation || ''
                                  })) || []
                                })) || []
                              };
                              
                              return (
                                <InteractivePractice
                                  title={homeworkData.title || `Practice Homework - Week ${selectedModuleData.week}`}
                                  content={interactiveContent}
                                  practiceType="homework"
                                  weekNumber={selectedModuleData.week}
                                  onComplete={(score: number, answers: Record<string, any>, timeSpent: number) => 
                                    handlePracticeComplete('homework', selectedModuleData.week, score, answers, timeSpent)
                                  }
                                  onGenerateNew={() => generatePracticeHomework(selectedModuleData.week)}
                                />
                              );
                            }
                          } catch (error) {
                            console.error('Failed to parse generated homework JSON:', error);
                          }
                        }
                        
                        // Priority 2: Show preset content if no generated content
                        const presetContent = presetPracticeHomework[selectedModuleData.week as keyof typeof presetPracticeHomework];
                        if (presetContent && typeof presetContent.content === 'object') {
                          return (
                            <InteractivePractice
                              title={presetContent.title}
                              content={presetContent.content as any}
                              practiceType="homework"
                              weekNumber={selectedModuleData.week}
                              onComplete={(score: number, answers: Record<string, any>, timeSpent: number) => 
                                handlePracticeComplete('homework', selectedModuleData.week, score, answers, timeSpent)
                              }
                              onGenerateNew={() => generatePracticeHomework(selectedModuleData.week)}
                            />
                          );
                        }
                        
                        // Show message if generating or no content
                        if (generatingPracticeHomework) {
                          return (
                            <div className="text-center py-8">
                              <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
                              <p className="text-lg font-medium">Generating new practice homework...</p>
                              <p className="text-sm text-gray-600">This may take a moment.</p>
                            </div>
                          );
                        }
                        
                        return (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">
                              Click "Generate New Practice Homework" above to create a custom practice session.
                            </p>
                          </div>
                        );
                      })()}


                    </div>
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
                                                    <div className="flex space-x-2">
                                                      <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setLogicSymbolMode(!logicSymbolMode)}
                                                        className={`flex items-center space-x-1 text-xs ${logicSymbolMode ? 'bg-blue-100 text-blue-700' : ''}`}
                                                      >
                                                        {logicSymbolMode ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                                        <span>Logic Symbols</span>
                                                      </Button>
                                                    </div>
                                                  </div>
                                                  
                                                  {/* Auto-generate abbreviation guide for translation questions */}
                                                  {question.question.toLowerCase().includes('translate') && logicSymbolMode && (() => {
                                                    const fieldId = `${selectedModuleData.week}_${question.id}`;
                                                    // Generate guide on first render
                                                    if (!abbreviationGuides[fieldId]) {
                                                      generateAbbreviationGuide(question.question, fieldId);
                                                    }
                                                    return null;
                                                  })()}
                                                  
                                                  {/* Show abbreviation guide if available */}
                                                  {abbreviationGuides[`${selectedModuleData.week}_${question.id}`] && (
                                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mb-3">
                                                      <div className="text-xs font-medium text-blue-800 mb-2">Suggested Abbreviations:</div>
                                                      <div className="text-xs text-blue-700 whitespace-pre-wrap font-mono">
                                                        {abbreviationGuides[`${selectedModuleData.week}_${question.id}`]}
                                                      </div>
                                                    </div>
                                                  )}
                                                  
                                                  <textarea 
                                                    className="w-full p-3 border rounded-lg min-h-[100px] text-sm"
                                                    placeholder={logicSymbolMode ? "Type naturally: 'For all x if Px then Qx'" : "Type your answer..."}
                                                    value={homeworkAnswers[`${selectedModuleData.week}_${question.id}`] || ''}
                                                    onChange={(e) => handleTextareaChange(`${selectedModuleData.week}_${question.id}`, e.target.value)}
                                                  />
                                                  <div className="text-xs text-gray-500 mt-1">
                                                    {isConverting ? (
                                                      <span className="text-blue-600">Converting to symbolic logic...</span>
                                                    ) : logicSymbolMode ? (
                                                      "Logic Symbol Mode: ON - Type naturally and AI will convert to proper symbols"
                                                    ) : (
                                                      "Normal Mode: Type answers normally"
                                                    )}
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
                                        <div className="flex space-x-2">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setLogicSymbolMode(!logicSymbolMode)}
                                            className={`flex items-center space-x-1 text-xs ${logicSymbolMode ? 'bg-blue-100 text-blue-700' : ''}`}
                                          >
                                            {logicSymbolMode ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                            <span>Logic Symbols</span>
                                          </Button>
                                        </div>
                                      </div>
                                      <textarea
                                        className="w-full border rounded-lg p-3 min-h-[100px] text-sm"
                                        placeholder={logicSymbolMode ? "Type naturally: 'For all x if Px then Qx'" : "Type your answer..."}
                                        value={homeworkAnswers[`w${selectedModuleData.week}_p1_q${num}`] || ''}
                                        onChange={(e) => handleTextareaChange(`w${selectedModuleData.week}_p1_q${num}`, e.target.value)}
                                      />
                                      <div className="text-xs text-gray-500">
                                        {isConverting ? (
                                          <span className="text-blue-600">Converting to symbolic logic...</span>
                                        ) : logicSymbolMode ? (
                                          "Logic Symbol Mode: ON - Type naturally and AI will convert to proper symbols"
                                        ) : (
                                          "Normal Mode: Type answers normally"
                                        )}
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

              <TabsContent value="practice-quiz" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5" />
                        <span>Practice Quiz/Test</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">🎯 Practice Mode</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Practice quiz questions for Week {selectedModuleData.week} with unlimited attempts. No grades recorded.
                      </p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">✅ Practice Benefits</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Take as many practice quizzes as you want</li>
                          <li>• Learn without grade pressure</li>
                          <li>• Get immediate feedback on answers</li>
                          <li>• Same format as graded quiz</li>
                          <li>• Build confidence before taking graded version</li>
                        </ul>
                      </div>

                      {!practiceQuizStarted[selectedModuleData.week] ? (
                        <div className="flex justify-center">
                          <Button 
                            className="flex items-center space-x-2"
                            onClick={() => generatePracticeQuiz(selectedModuleData.week)}
                            disabled={generatingPracticeQuiz}
                          >
                            {generatingPracticeQuiz ? (
                              <>
                                <Clock className="w-4 h-4 animate-spin" />
                                <span>Generating...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span>Generate New Quiz</span>
                              </>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex space-x-4 mb-4">
                            <Button 
                              variant="outline" 
                              className="flex items-center space-x-2 border-green-300 text-green-700 hover:bg-green-50"
                              onClick={() => generatePracticeQuiz(selectedModuleData.week)}
                              disabled={generatingPracticeQuiz}
                            >
                              {generatingPracticeQuiz ? (
                                <>
                                  <Clock className="w-4 h-4 animate-spin" />
                                  <span>Generating New Quiz...</span>
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Generate New Practice Quiz</span>
                                </>
                              )}
                            </Button>
                          </div>

                          {(() => {
                            // Check if we have preset content
                            const presetContent = presetPracticeQuizzes[selectedModuleData.week as keyof typeof presetPracticeQuizzes];
                            if (presetContent && typeof presetContent.content === 'object') {
                              return (
                                <InteractivePractice
                                  title={presetContent.title}
                                  content={presetContent.content as any}
                                  practiceType="quiz"
                                  weekNumber={selectedModuleData.week}
                                  onComplete={(score: number, answers: Record<string, any>, timeSpent: number) => 
                                    handlePracticeComplete('quiz', selectedModuleData.week, score, answers, timeSpent)
                                  }
                                  onGenerateNew={() => generatePracticeQuiz(selectedModuleData.week)}
                                />
                              );
                            } 
                            
                            // Try to parse generated content as JSON for interactive component
                            if (generatedPracticeQuiz[selectedModuleData.week]) {
                              const generatedText = generatedPracticeQuiz[selectedModuleData.week];
                              try {
                                // Extract JSON from markdown code block
                                const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/);
                                if (jsonMatch) {
                                  const quizData = JSON.parse(jsonMatch[1]);
                                  // Convert to InteractivePractice format
                                  const interactiveContent = {
                                    instructions: quizData.instructions || 'Complete the following quiz questions.',
                                    totalPoints: quizData.totalPoints || 100,
                                    problems: quizData.questions?.map((q: any, index: number) => ({
                                      id: `q-${index + 1}`,
                                      title: `Question ${index + 1}`,
                                      points: q.points || 10,
                                      type: 'multiple_choice' as const,
                                      questions: [{
                                        id: q.id || `q${index + 1}`,
                                        question: q.question,
                                        options: q.options || [],
                                        correctAnswer: q.correctAnswer || q.options?.[0] || '',
                                        explanation: q.explanation || ''
                                      }]
                                    })) || []
                                  };
                                  
                                  return (
                                    <InteractivePractice
                                      title={quizData.title || `Practice Quiz - Week ${selectedModuleData.week}`}
                                      content={interactiveContent}
                                      practiceType="quiz"
                                      weekNumber={selectedModuleData.week}
                                      onComplete={(score: number, answers: Record<string, any>, timeSpent: number) => 
                                        handlePracticeComplete('quiz', selectedModuleData.week, score, answers, timeSpent)
                                      }
                                      onGenerateNew={() => generatePracticeQuiz(selectedModuleData.week)}
                                    />
                                  );
                                }
                              } catch (error) {
                                console.error('Failed to parse generated quiz JSON:', error);
                              }
                              
                              // Fallback: display as formatted text
                              return (
                                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
                                  <h4 className="font-semibold text-green-800 mb-4">🎯 Practice Quiz Content</h4>
                                  <div className="bg-white border rounded-lg p-4">
                                    <div className="prose max-w-none">
                                      <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                        Generated quiz format error. Please try generating again.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            
                            return null;
                          })()}
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

      {/* Draggable Logic Keyboard */}
      {showLogicKeyboard && (
        <div
          className="fixed bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50 p-4"
          style={{
            left: keyboardPosition.x,
            top: keyboardPosition.y,
            width: keyboardSize.width,
            height: keyboardSize.height,
            resize: 'both',
            overflow: 'auto'
          }}
        >
          <div
            className="cursor-move bg-gray-100 -m-4 mb-2 p-2 rounded-t-lg flex justify-between items-center"
            onMouseDown={(e) => {
              const startX = e.clientX - keyboardPosition.x;
              const startY = e.clientY - keyboardPosition.y;
              
              const handleMouseMove = (e: MouseEvent) => {
                setKeyboardPosition({
                  x: e.clientX - startX,
                  y: e.clientY - startY
                });
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            <span className="font-medium text-sm">Logic Symbols</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowLogicKeyboard(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-sm">
            {/* Logic symbols with proper hover descriptions */}
            {[
              { symbol: '∀', name: 'For all' },
              { symbol: '∃', name: 'There exists' },
              { symbol: '¬', name: 'Not' },
              { symbol: '∧', name: 'And' },
              { symbol: '∨', name: 'Or' },
              { symbol: '→', name: 'Implies' },
              { symbol: '↔', name: 'If and only if' },
              { symbol: '⊤', name: 'True' },
              { symbol: '⊥', name: 'False' },
              { symbol: '∴', name: 'Therefore' },
              { symbol: '⊢', name: 'Proves' },
              { symbol: '⊨', name: 'Entails' },
              { symbol: '∈', name: 'Element of' },
              { symbol: '∅', name: 'Empty set' },
              { symbol: '∪', name: 'Union' },
              { symbol: '∩', name: 'Intersection' }
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-8 text-lg font-mono"
                title={item.name}
                onClick={() => {
                  // Insert into the currently focused textarea or last used one
                  const textareas = document.querySelectorAll('textarea[id^="practice-"]');
                  const focused = document.activeElement as HTMLTextAreaElement;
                  
                  if (focused && focused.tagName === 'TEXTAREA' && focused.id.startsWith('practice-')) {
                    insertLogicSymbol(item.symbol, focused.id);
                  } else if (textareas.length > 0) {
                    const lastTextarea = textareas[textareas.length - 1] as HTMLTextAreaElement;
                    insertLogicSymbol(item.symbol, lastTextarea.id);
                  }
                }}
              >
                {item.symbol}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}