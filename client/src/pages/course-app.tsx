import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LivingBook from "./living-book";
import Syllabus from "./course/syllabus";
import Modules from "./course/modules";
import Analytics from "./course/practice-center";
import MyGrades from "./course/my-grades";
import TutorMe from "./tutor-me";
import Diagnostics from "./diagnostics";

export default function CourseApp() {
  const [activeTab, setActiveTab] = useState("living-book");
  const [openLivingBookSection, setOpenLivingBookSection] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // Handle navigation to Living Book from other tabs
  const handleNavigateToLivingBook = (sectionId?: string) => {
    setActiveTab("living-book");
    if (sectionId) {
      setOpenLivingBookSection(sectionId);
      // Clear the section after a delay to avoid repeated navigation
      setTimeout(() => {
        setOpenLivingBookSection(null);
      }, 2000);
    }
  };

  // Handle navigation to homework/assignments
  const handleNavigateToHomework = (weekNumber: number, assignmentType: string) => {
    console.log(`handleNavigateToHomework called with week ${weekNumber}, type ${assignmentType}`);
    setActiveTab("modules");
    // If it's midterm or final, navigate to special modules
    if (assignmentType === "midterm") {
      setSelectedWeek(7); // Midterm module
    } else if (assignmentType === "final") {
      setSelectedWeek(8); // Final module
    } else {
      setSelectedWeek(weekNumber); // Navigate to specific week module
    }
    console.log(`Tab switched to modules, selected week set to ${assignmentType === "midterm" ? 7 : assignmentType === "final" ? 8 : weekNumber}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-background p-0 h-12">
          <TabsTrigger 
            value="living-book" 
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Living Book
          </TabsTrigger>
          <TabsTrigger 
            value="syllabus"
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Syllabus
          </TabsTrigger>
          <TabsTrigger 
            value="modules"
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Modules
          </TabsTrigger>
          <TabsTrigger 
            value="practice"
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="grades"
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            My Grades
          </TabsTrigger>
          <TabsTrigger 
            value="tutor-me"
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Tutor Me
          </TabsTrigger>
          <TabsTrigger 
            value="diagnostics"
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Diagnostics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="living-book" className="h-full m-0 p-0">
          <LivingBook 
            openSection={openLivingBookSection} 
            onNavigateToModules={handleNavigateToHomework} 
          />
        </TabsContent>

        <TabsContent value="syllabus" className="h-full m-0 p-0">
          <Syllabus 
            onNavigateToLivingBook={handleNavigateToLivingBook} 
            onNavigateToHomework={handleNavigateToHomework}
          />
        </TabsContent>

        <TabsContent value="modules" className="h-full m-0 p-0">
          <Modules 
            onNavigateToLivingBook={handleNavigateToLivingBook}
            selectedWeek={selectedWeek}
            onWeekChange={setSelectedWeek}
          />
        </TabsContent>

        <TabsContent value="practice" className="h-full m-0 p-0">
          <Analytics />
        </TabsContent>

        <TabsContent value="grades" className="h-full m-0 p-0">
          <MyGrades />
        </TabsContent>

        <TabsContent value="tutor-me" className="h-full m-0 p-0">
          <TutorMe />
        </TabsContent>

        <TabsContent value="diagnostics" className="h-full m-0 p-0">
          <Diagnostics />
        </TabsContent>
      </Tabs>
    </div>
  );
}