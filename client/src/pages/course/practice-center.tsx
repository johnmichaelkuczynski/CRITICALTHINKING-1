import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Play, Clock, Target } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PracticeAttempt {
  id: number;
  type: string;
  week?: number;
  score: number;
  completedAt: Date;
}

export default function PracticeCenter() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [recentAttempts, setRecentAttempts] = useState<PracticeAttempt[]>([
    {
      id: 1,
      type: "homework",
      week: 1,
      score: 85,
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 2,
      type: "homework",
      week: 2,
      score: 92,
      completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ]);

  const practiceTypes = [
    { value: "homework", label: "Homework Practice", weeks: [1, 2, 3, 4, 5, 6] },
    { value: "quiz", label: "Quiz Practice", weeks: [1, 2, 3, 5, 6] },
    { value: "midterm", label: "Midterm Practice", weeks: null },
    { value: "final", label: "Final Exam Practice", weeks: null }
  ];

  const generatePractice = async () => {
    if (!selectedType) return;
    
    setGenerating(true);
    // TODO: Implement practice generation
    setTimeout(() => {
      setGenerating(false);
      // TODO: Navigate to practice session
    }, 2000);
  };

  const selectedTypeData = practiceTypes.find(t => t.value === selectedType);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice Center</h1>
        <p className="text-lg text-muted-foreground">
          Generate unlimited practice versions of assignments and exams
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Practice Generator */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Generate Practice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Practice Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select practice type" />
                  </SelectTrigger>
                  <SelectContent>
                    {practiceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTypeData?.weeks && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Week
                  </label>
                  <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select week" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTypeData.weeks.map((week) => (
                        <SelectItem key={week} value={week.toString()}>
                          Week {week}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Practice Mode:</strong> These are unlimited practice versions. 
                  Scores are not saved and do not count toward your final grade.
                </AlertDescription>
              </Alert>

              <Button
                onClick={generatePractice}
                disabled={!selectedType || (selectedTypeData?.weeks && !selectedWeek) || generating}
                className="w-full"
                size="lg"
              >
                {generating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Generating Practice...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Generate Practice Session
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Practice Features */}
          <Card>
            <CardHeader>
              <CardTitle>Practice Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Unlimited attempts</strong> - Practice as many times as you want</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Fresh content</strong> - Each session generates new questions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Immediate feedback</strong> - See correct answers after completion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>No time limits</strong> - Work at your own pace</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>No grade impact</strong> - Practice scores don't affect your grade</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Always available</strong> - All practice types available anytime</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Practice Attempts */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Practice Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentAttempts.length > 0 ? (
                <div className="space-y-3">
                  {recentAttempts.map((attempt) => (
                    <div key={attempt.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium capitalize">
                          {attempt.type} Practice
                          {attempt.week && ` - Week ${attempt.week}`}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {attempt.completedAt.toLocaleDateString()} at {attempt.completedAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={attempt.score >= 80 ? "default" : attempt.score >= 60 ? "secondary" : "destructive"}>
                          {attempt.score}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No practice sessions yet.</p>
                  <p className="text-sm">Start practicing to see your history here!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Practice Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Practice Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{recentAttempts.length}</p>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {recentAttempts.length > 0 
                      ? Math.round(recentAttempts.reduce((sum, a) => sum + a.score, 0) / recentAttempts.length)
                      : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}