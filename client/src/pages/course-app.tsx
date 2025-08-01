import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LivingBook from "./living-book";
import Syllabus from "./course/syllabus";
import Modules from "./course/modules";
import PracticeCenter from "./course/practice-center";
import MyGrades from "./course/my-grades";

export default function CourseApp() {
  const [activeTab, setActiveTab] = useState("living-book");
  const [openLivingBookSection, setOpenLivingBookSection] = useState<string | null>(null);

  // Handle navigation to Living Book from other tabs
  const handleNavigateToLivingBook = (sectionId?: string) => {
    setActiveTab("living-book");
    if (sectionId) {
      setOpenLivingBookSection(sectionId);
    }
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
            Practice Center
          </TabsTrigger>
          <TabsTrigger 
            value="grades"
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            My Grades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="living-book" className="h-full m-0 p-0">
          <LivingBook openSection={openLivingBookSection} />
        </TabsContent>

        <TabsContent value="syllabus" className="h-full m-0 p-0">
          <Syllabus onNavigateToLivingBook={handleNavigateToLivingBook} />
        </TabsContent>

        <TabsContent value="modules" className="h-full m-0 p-0">
          <Modules onNavigateToLivingBook={handleNavigateToLivingBook} />
        </TabsContent>

        <TabsContent value="practice" className="h-full m-0 p-0">
          <PracticeCenter />
        </TabsContent>

        <TabsContent value="grades" className="h-full m-0 p-0">
          <MyGrades />
        </TabsContent>
      </Tabs>
    </div>
  );
}