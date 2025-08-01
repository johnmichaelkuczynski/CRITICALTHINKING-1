import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface GradeEntry {
  id: number;
  assignment: string;
  type: "homework" | "midterm" | "final";
  week?: number;
  points: number;
  maxPoints: number;
  percentage: number;
  submittedAt?: Date;
  dueDate: Date;
  isLate: boolean;
  gptZeroScore?: number;
  status: "graded" | "pending" | "not-submitted";
}

export default function MyGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [finalGrade, setFinalGrade] = useState<number>(0);

  useEffect(() => {
    // Mock grade data - in real app this would come from API
    const mockGrades: GradeEntry[] = [
      {
        id: 1,
        assignment: "Homework 1: Basic Concepts and Notation",
        type: "homework",
        week: 1,
        points: 45,
        maxPoints: 50,
        percentage: 90,
        submittedAt: new Date("2025-01-15T23:30:00"),
        dueDate: new Date("2025-01-15T23:59:00"),
        isLate: false,
        gptZeroScore: 15,
        status: "graded"
      },
      {
        id: 2,
        assignment: "Homework 2: Truth Tables and Proofs",
        type: "homework", 
        week: 2,
        points: 0,
        maxPoints: 50,
        percentage: 0,
        submittedAt: new Date("2025-01-23T08:00:00"),
        dueDate: new Date("2025-01-22T23:59:00"),
        isLate: true,
        gptZeroScore: 85,
        status: "graded"
      },
      {
        id: 3,
        assignment: "Homework 3: Boolean Algebra",
        type: "homework",
        week: 3,
        points: 0,
        maxPoints: 50,
        percentage: 0,
        dueDate: new Date("2025-01-29T23:59:00"),
        isLate: false,
        status: "not-submitted"
      }
    ];

    setGrades(mockGrades);

    // Calculate final grade based on weighting
    const homeworkGrades = mockGrades.filter(g => g.type === "homework" && g.status === "graded");
    const homeworkAvg = homeworkGrades.length > 0 
      ? homeworkGrades.reduce((sum, g) => sum + g.percentage, 0) / homeworkGrades.length 
      : 0;

    const midtermGrade = mockGrades.find(g => g.type === "midterm")?.percentage || 0;
    const finalExamGrade = mockGrades.find(g => g.type === "final")?.percentage || 0;

    // Homework: 25%, Midterm: 35%, Final: 40%
    const calculatedGrade = (homeworkAvg * 0.25) + (midtermGrade * 0.35) + (finalExamGrade * 0.40);
    setFinalGrade(calculatedGrade);
  }, []);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };

  const getStatusBadge = (grade: GradeEntry) => {
    if (grade.status === "not-submitted") {
      return <Badge variant="destructive">Not Submitted</Badge>;
    }
    if (grade.isLate) {
      return <Badge variant="destructive">Late Submission</Badge>;
    }
    if (grade.gptZeroScore && grade.gptZeroScore > 50) {
      return <Badge variant="destructive">AI Detection</Badge>;
    }
    if (grade.status === "pending") {
      return <Badge variant="secondary">Pending Review</Badge>;
    }
    return <Badge variant="default" className="bg-green-100 text-green-800">Graded</Badge>;
  };

  const getWarningIcon = (grade: GradeEntry) => {
    if (grade.status === "not-submitted" || grade.isLate || (grade.gptZeroScore && grade.gptZeroScore > 50)) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    if (grade.status === "graded") {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <Clock className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Grades</h1>
        <p className="text-lg text-muted-foreground">
          Track your progress throughout the course
        </p>
      </div>

      {/* Current Grade Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getGradeColor(finalGrade)}>
                {finalGrade.toFixed(1)}% ({getGradeLetter(finalGrade)})
              </span>
            </div>
            <Progress value={finalGrade} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Homework Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grades.filter(g => g.type === "homework" && g.status === "graded").length > 0
                ? (grades.filter(g => g.type === "homework" && g.status === "graded")
                    .reduce((sum, g) => sum + g.percentage, 0) / 
                    grades.filter(g => g.type === "homework" && g.status === "graded").length).toFixed(1)
                : "0.0"}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Weight: 25%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Midterm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grades.find(g => g.type === "midterm")?.percentage.toFixed(1) || "--"}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Weight: 35%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Final Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grades.find(g => g.type === "final")?.percentage.toFixed(1) || "--"}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Weight: 40%</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Grades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Assignment Grades</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grades.map((grade) => (
              <div key={grade.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getWarningIcon(grade)}
                  <div>
                    <h4 className="font-medium">{grade.assignment}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Due: {grade.dueDate.toLocaleDateString()}</span>
                      {grade.submittedAt && (
                        <span>Submitted: {grade.submittedAt.toLocaleDateString()}</span>
                      )}
                      {grade.gptZeroScore !== undefined && (
                        <span className={grade.gptZeroScore > 50 ? "text-red-600" : "text-green-600"}>
                          AI Score: {grade.gptZeroScore}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">
                      <span className={getGradeColor(grade.percentage)}>
                        {grade.points}/{grade.maxPoints}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {grade.percentage.toFixed(1)}%
                    </div>
                  </div>
                  {getStatusBadge(grade)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grading Policies */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Grading Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-red-600">Automatic Zero Policies</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Late Submission:</strong> Any assignment submitted after the due date receives an automatic 0</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>AI Detection:</strong> GPTZero score above 50% results in an automatic 0</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">Grade Scale</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>A:</span>
                  <span>90-100%</span>
                </div>
                <div className="flex justify-between">
                  <span>B:</span>
                  <span>80-89%</span>
                </div>
                <div className="flex justify-between">
                  <span>C:</span>
                  <span>70-79%</span>
                </div>
                <div className="flex justify-between">
                  <span>D:</span>
                  <span>60-69%</span>
                </div>
                <div className="flex justify-between">
                  <span>F:</span>
                  <span>Below 60%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}