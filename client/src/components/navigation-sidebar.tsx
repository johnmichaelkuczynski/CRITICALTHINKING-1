import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a table of contents based on the Critical Thinking course content
const createTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number }> = [
    // Week 1: Foundations of Critical Thinking
    { id: "section-1", title: "Week 1: Foundations of Critical Thinking", level: 0 },
    { id: "introduction-to-critical-thinking", title: "Introduction to Critical Thinking", level: 1 },
    { id: "critical-thinking-foundations", title: "What is Critical Thinking?", level: 1 },
    { id: "reasoning-process", title: "The Process of Reasoning", level: 1 },
    { id: "common-misconceptions", title: "Common Misconceptions", level: 1 },
    { id: "critical-thinker-toolkit", title: "The Critical Thinker's Toolkit", level: 1 },
    { id: "homework-1", title: "Homework 1: Critical Thinking Foundations", level: 1 },
    
    // Week 2: Argument Structure and Analysis
    { id: "section-2", title: "Week 2: Argument Structure and Analysis", level: 0 },
    { id: "argument-components", title: "Components of Arguments", level: 1 },
    { id: "premises-conclusions", title: "Premises and Conclusions", level: 1 },
    { id: "validity-soundness", title: "Validity and Soundness", level: 1 },
    { id: "argument-evaluation", title: "Evaluating Arguments", level: 1 },
    { id: "homework-2", title: "Homework 2: Argument Analysis", level: 1 },
    
    // Week 3: Decision Making and Problem Solving
    { id: "section-3", title: "Week 3: Decision Making and Problem Solving", level: 0 },
    { id: "decision-frameworks", title: "Decision-Making Frameworks", level: 1 },
    { id: "problem-solving-steps", title: "Systematic Problem Solving", level: 1 },
    { id: "evaluating-options", title: "Evaluating Options and Alternatives", level: 1 },
    { id: "risk-assessment", title: "Risk Assessment and Analysis", level: 1 },
    { id: "homework-3", title: "Homework 3: Decision Making", level: 1 },
    
    // Week 4: Research and Evidence Evaluation
    { id: "section-4", title: "Week 4: Research and Evidence Evaluation", level: 0 },
    { id: "scientific-method", title: "Scientific Method and Research", level: 1 },
    { id: "evidence-types", title: "Types of Evidence", level: 1 },
    { id: "correlation-causation", title: "Correlation vs. Causation", level: 1 },
    { id: "research-evaluation", title: "Evaluating Research Studies", level: 1 },
    { id: "homework-4", title: "Homework 4: Research Evaluation", level: 1 },
    
    // Week 5: Media Literacy and Information Analysis
    { id: "section-5", title: "Week 5: Media Literacy and Information Analysis", level: 0 },
    { id: "information-sources", title: "Evaluating Information Sources", level: 1 },
    { id: "media-bias", title: "Recognizing Media Bias", level: 1 },
    { id: "fact-checking", title: "Fact-Checking Techniques", level: 1 },
    { id: "homework-5", title: "Homework 5: Media Literacy", level: 1 },
    
    // Week 6: Ethical Reasoning and Moral Frameworks
    { id: "section-6", title: "Week 6: Ethical Reasoning and Moral Frameworks", level: 0 },
    { id: "ethical-frameworks", title: "Major Ethical Frameworks", level: 1 },
    { id: "moral-reasoning", title: "Moral Reasoning Process", level: 1 },
    { id: "ethical-dilemmas", title: "Analyzing Ethical Dilemmas", level: 1 },
    { id: "homework-6", title: "Homework 6: Ethical Reasoning", level: 1 },
    
    // Week 7: Creative Thinking and Innovation
    { id: "section-7", title: "Week 7: Creative Thinking and Innovation", level: 0 },
    { id: "creative-processes", title: "Creative Thinking Processes", level: 1 },
    { id: "brainstorming-techniques", title: "Brainstorming and Ideation", level: 1 },
    { id: "innovation-methods", title: "Innovation and Design Thinking", level: 1 },
    { id: "homework-7", title: "Homework 7: Creative Thinking", level: 1 },
    
    // Week 8: Integration and Real-World Applications
    { id: "section-8", title: "Week 8: Integration and Real-World Applications", level: 0 },
    { id: "critical-thinking-integration", title: "Integrating Critical Thinking Skills", level: 1 },
    { id: "real-world-applications", title: "Real-World Applications", level: 1 },
    { id: "workplace-scenarios", title: "Workplace and Academic Scenarios", level: 1 },
    { id: "continuous-improvement", title: "Continuous Improvement", level: 1 },
    
    // Week 9: Comprehensive Review
    { id: "section-9", title: "Week 9: Comprehensive Review and Assessment", level: 0 },
    { id: "course-synthesis", title: "Course Synthesis", level: 1 },
    { id: "final-projects", title: "Final Projects and Assessment", level: 1 }
  ];
  
  return tableOfContents;
};

const tableOfContents = createTableOfContents();



export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    console.log(`Clicking navigation item: ${id}`);
    
    // First try to find exact section ID match (these should exist)
    let element = document.getElementById(id);
    console.log(`Found element by ID: ${!!element}`);
    
    // If section ID found, scroll to it directly
    if (element) {
      console.log(`Scrolling to section: ${element.id}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Add a temporary highlight to show the user where they landed
      if (element) {
        element.style.backgroundColor = '#fef3c7';
        setTimeout(() => {
          if (element) {
            element.style.backgroundColor = '';
          }
        }, 2000);
      }
      return;
    }
    
    // For subsection navigation, search within the content for text patterns
    const titleMap: { [key: string]: string } = {
      // Week 1 content patterns
      "introduction-to-logic": "Introduction to Logic",
      "basic-concepts": "Statement (Proposition):",
      "basic-logical-symbols": "Basic Logical Symbols",
      "material-vs-strict-implication": "Material vs. Strict Implication",
      "translation-practice": "Translation Practice",
      "homework-1": "Symbolic Logic - Homework 1",
      
      // Week 2 content patterns
      "propositional-calculus": "The Propositional Calculus",
      "truth-tables": "Truth Tables",
      "elementary-proofs": "Elementary Proofs",
      "de-morgans-laws": "De Morgan's Laws",
      "homework-2": "Symbolic Logic - Homework 2",
      
      // Week 3 content patterns
      "boolean-algebra": "Introduction to Boolean Algebra",
      "boolean-operations": "NOT (Complement) Symbol:",
      "boolean-laws": "Fundamental Laws of Boolean Algebra",
      "boolean-functions": "Boolean Functions and Truth Tables",
      "homework-3": "Symbolic Logic - Homework 3",
      
      // Week 4 content patterns
      "quantification-concepts": "Basic Concepts of Quantification",
      "universal-quantifier": "Universal Quantifier (∀)",
      "existential-quantifier": "Existential Quantifier (∃)",
      "complex-quantification": "Complex Quantification",
      "homework-4": "Symbolic Logic - Homework 4",
      
      // Week 5 content patterns
      "advanced-translation": "Advanced Translation Patterns",
      "uniqueness-quantifier": "Uniqueness Quantifier (∃!)",
      "mathematical-logic": "Mathematical Logic Applications",
      "homework-5": "Symbolic Logic - Homework 5",
      
      // Week 6 content patterns
      "models-introduction": "Introduction to Models",
      "model-definition": "Definition of a Model",
      "proving-invalidity": "Proving Invalidity",
      "homework-6": "Symbolic Logic - Homework 6",
      
      // Week 7 content patterns
      "recursive-number-systems": "Recursive Number Systems",
      "natural-numbers": "Natural Numbers (ℕ)",
      "statement-classes": "Statement Classes",
      "homework-7": "Symbolic Logic - Homework 7",
      
      // Week 8 content patterns
      "basic-concepts-review": "Basic Concepts and Notation",
      "truth-tables-review": "Truth Tables and Proofs",
      "quantifier-logic-review": "Quantifier Logic",
      "exam-preparation": "Exam Preparation",
      
      // Week 9 content patterns
      "final-exam": "Final Exam",
      "course-conclusion": "Course Conclusion"
    };
    
    const searchText = titleMap[id];
    console.log(`Searching for text: ${searchText}`);
    
    if (searchText) {
      // Find elements containing this text in the document content area
      const contentArea = document.querySelector('[data-document-content]');
      if (contentArea) {
        const allElements = contentArea.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div');
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i];
          const textContent = el.textContent || '';
          
          // Look for elements that contain the search text
          if (textContent.includes(searchText)) {
            element = el as HTMLElement;
            console.log(`Found element by text search: ${el.tagName} - ${textContent.substring(0, 50)}...`);
            break;
          }
        }
      }
    }
    
    if (element) {
      console.log(`Scrolling to element: ${element.tagName}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Add a temporary highlight to show the user where they landed
      if (element) {
        element.style.backgroundColor = '#fef3c7';
        setTimeout(() => {
          if (element) {
            element.style.backgroundColor = '';
          }
        }, 2000);
      }
    } else {
      console.log(`No element found for navigation ID: ${id}`);
      // Fall back to scrolling to the parent section if subsection not found
      const sectionMatch = id.match(/section-(\d+)/);
      if (!sectionMatch) {
        // For subsections, try to scroll to the parent section
        const parentSectionId = getParentSectionId(id);
        if (parentSectionId) {
          const parentElement = document.getElementById(parentSectionId);
          if (parentElement) {
            console.log(`Fallback: scrolling to parent section ${parentSectionId}`);
            parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    }
  };

  // Helper function to get parent section ID
  const getParentSectionId = (id: string): string | null => {
    const sectionMapping: { [key: string]: string } = {
      "introduction-to-logic": "section-1",
      "basic-concepts": "section-1",
      "basic-logical-symbols": "section-1",
      "material-vs-strict-implication": "section-1",
      "translation-practice": "section-1",
      "homework-1": "section-1",
      
      "propositional-calculus": "section-2",
      "truth-tables": "section-2",
      "elementary-proofs": "section-2",
      "de-morgans-laws": "section-2",
      "homework-2": "section-2",
      
      "boolean-algebra": "section-3",
      "boolean-operations": "section-3",
      "boolean-laws": "section-3",
      "boolean-functions": "section-3",
      "homework-3": "section-3",
      
      "quantification-concepts": "section-4",
      "universal-quantifier": "section-4",
      "existential-quantifier": "section-4",
      "complex-quantification": "section-4",
      "homework-4": "section-4",
      
      "advanced-translation": "section-5",
      "uniqueness-quantifier": "section-5",
      "mathematical-logic": "section-5",
      "homework-5": "section-5",
      
      "models-introduction": "section-6",
      "model-definition": "section-6",
      "proving-invalidity": "section-6",
      "homework-6": "section-6",
      
      "recursive-number-systems": "section-7",
      "natural-numbers": "section-7",
      "statement-classes": "section-7",
      "homework-7": "section-7",
      
      "basic-concepts-review": "section-8",
      "truth-tables-review": "section-8",
      "quantifier-logic-review": "section-8",
      "exam-preparation": "section-8",
      
      "final-exam": "section-9",
      "course-conclusion": "section-9"
    };
    
    return sectionMapping[id] || null;
  };

  return (
    <aside className="w-48 bg-card shadow-sm border-r border-border sticky top-16 h-[calc(100vh-160px)]">
      <div className="p-3 h-full flex flex-col">
        <h3 className="font-inter font-semibold text-sm text-foreground mb-3 flex-shrink-0">
          Table of Contents
        </h3>
        <ScrollArea className="flex-1 h-full">
          <div className="pr-2">
            <nav className="space-y-1">
              {tableOfContents.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleNavClick(entry.id)}
                  className={`block w-full text-left px-2 py-1.5 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded transition-colors font-normal ${
                    entry.level === 0 ? 'text-slate-800 dark:text-slate-200' : 
                    entry.level === 1 ? 'pl-4 text-slate-700 dark:text-slate-300' : 
                    'pl-6 text-slate-700 dark:text-slate-300'
                  }`}
                  title={entry.title}
                >
                  <span className="block text-xs leading-tight whitespace-normal">
                    {entry.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
