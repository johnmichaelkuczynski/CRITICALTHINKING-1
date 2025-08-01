import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface SyllabusProps {
  onNavigateToLivingBook: (sectionId?: string) => void;
  onNavigateToHomework?: (weekNumber: number, assignmentType: string) => void;
}

interface WeeklyTopic {
  week: number;
  title: string;
  livingBookSection: string;
  assignments: Assignment[];
}

interface Assignment {
  type: "homework" | "quiz" | "midterm" | "final";
  title: string;
  dueDate: Date;
  points: number;
  status: "completed" | "overdue" | "not-due";
}

export default function Syllabus({ onNavigateToLivingBook, onNavigateToHomework }: SyllabusProps) {
  const { user } = useAuth();
  const [weeklyTopics, setWeeklyTopics] = useState<WeeklyTopic[]>([]);

  useEffect(() => {
    // Generate syllabus based on the 6-week course structure
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()); // Start of current week

    const topics: WeeklyTopic[] = [
      {
        week: 1,
        title: "Basic Concepts, Notation, and Logical Operators",
        livingBookSection: "section-1",
        assignments: [
          {
            type: "homework",
            title: "Homework 1: Basic Concepts and Notation",
            dueDate: new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000), // End of week 1
            points: 50,
            status: "not-due"
          }
        ]
      },
      {
        week: 2,
        title: "Truth Tables and Proof Methods",
        livingBookSection: "section-2",
        assignments: [
          {
            type: "homework",
            title: "Homework 2: Truth Tables and Proofs",
            dueDate: new Date(startDate.getTime() + 13 * 24 * 60 * 60 * 1000), // End of week 2
            points: 50,
            status: "not-due"
          }
        ]
      },
      {
        week: 3,
        title: "Boolean Algebra and Functions",
        livingBookSection: "section-3",
        assignments: [
          {
            type: "homework",
            title: "Homework 3: Boolean Algebra",
            dueDate: new Date(startDate.getTime() + 20 * 24 * 60 * 60 * 1000), // End of week 3
            points: 50,
            status: "not-due"
          }
        ]
      },
      {
        week: 4,
        title: "Quantifier Logic and Translation",
        livingBookSection: "section-4",
        assignments: [
          {
            type: "homework",
            title: "Homework 4: Quantifier Logic",
            dueDate: new Date(startDate.getTime() + 27 * 24 * 60 * 60 * 1000), // End of week 4
            points: 50,
            status: "not-due"
          },
          {
            type: "midterm",
            title: "Midterm Exam",
            dueDate: new Date(startDate.getTime() + 28 * 24 * 60 * 60 * 1000), // Monday of week 5
            points: 100,
            status: "not-due"
          }
        ]
      },
      {
        week: 5,
        title: "Complex Translation and Mathematical Logic",
        livingBookSection: "section-5",
        assignments: [
          {
            type: "homework",
            title: "Homework 5: Complex Translation",
            dueDate: new Date(startDate.getTime() + 34 * 24 * 60 * 60 * 1000), // End of week 5
            points: 50,
            status: "not-due"
          }
        ]
      },
      {
        week: 6,
        title: "Using Models to Prove Invalidity and Consistency",
        livingBookSection: "section-6",
        assignments: [
          {
            type: "homework",
            title: "Homework 6: Models and Proofs",
            dueDate: new Date(startDate.getTime() + 41 * 24 * 60 * 60 * 1000), // End of week 6
            points: 50,
            status: "not-due"
          },
          {
            type: "final",
            title: "Final Exam",
            dueDate: new Date(startDate.getTime() + 43 * 24 * 60 * 60 * 1000), // Wednesday of week 7
            points: 150,
            status: "not-due"
          }
        ]
      }
    ];

    // Update assignment status based on current date
    topics.forEach(topic => {
      topic.assignments.forEach(assignment => {
        if (assignment.dueDate < currentDate) {
          assignment.status = "overdue";
        } else {
          assignment.status = "not-due";
        }
      });
    });

    setWeeklyTopics(topics);
  }, []);

  const getStatusBadge = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">✅ Completed</Badge>;
      case "overdue":
        return <Badge variant="destructive">❗ Overdue</Badge>;
      case "not-due":
        return <Badge variant="secondary">⏳ Not Yet Due</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Syllabus</h1>
        <p className="text-lg text-muted-foreground">
          Introduction to Symbolic Logic - 6 Week Course
        </p>
      </div>

      <div className="grid gap-6">
        {weeklyTopics.map((topic) => (
          <Card key={topic.week} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Week {topic.week}: {topic.title}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigateToLivingBook(topic.livingBookSection)}
                  className="flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View in Living Book</span>
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">ASSIGNMENTS DUE THIS WEEK:</h4>
                {topic.assignments.map((assignment, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => {
                      if (assignment.type === "homework" && onNavigateToHomework) {
                        onNavigateToHomework(topic.week, assignment.type);
                      } else if (assignment.type === "midterm" && onNavigateToHomework) {
                        onNavigateToHomework(0, "midterm");
                      } else if (assignment.type === "final" && onNavigateToHomework) {
                        onNavigateToHomework(0, "final");
                      }
                    }}
                  >
                    <div className="flex-1">
                      <h5 className="font-medium text-blue-600 hover:text-blue-800">{assignment.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        Due: {assignment.dueDate.toLocaleDateString()} at 11:59 PM
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{assignment.points} pts</span>
                      {getStatusBadge(assignment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Grading Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold">Homework</h4>
              <p className="text-2xl font-bold text-blue-600">25%</p>
              <p className="text-sm text-muted-foreground">6 assignments</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold">Midterm Exam</h4>
              <p className="text-2xl font-bold text-orange-600">35%</p>
              <p className="text-sm text-muted-foreground">Week 4</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold">Final Exam</h4>
              <p className="text-2xl font-bold text-red-600">40%</p>
              <p className="text-sm text-muted-foreground">Week 6</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}