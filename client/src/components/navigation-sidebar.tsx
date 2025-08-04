import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a table of contents based on the actual Critical Thinking content structure
const createTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number }> = [
    // Main Section (as it appears in the content)
    { id: "section-1", title: "Critical Thinking: A Comprehensive Guide", level: 0 },
    
    // Chapter 1: Introduction to Critical Thinking
    { id: "chapter-1", title: "Chapter 1: Introduction to Critical Thinking", level: 0 },
    { id: "foundations", title: "1.1 Foundations", level: 1 },
    { id: "what-is-critical-thinking", title: "1.1.1 What is Critical Thinking?", level: 2 },
    { id: "why-critical-thinking-matters", title: "1.1.2 Why Critical Thinking Matters", level: 2 },
    { id: "common-misconceptions", title: "1.1.3 Common Misconceptions", level: 2 },
    { id: "critical-thinker-toolkit", title: "1.1.4 The Critical Thinker's Toolkit", level: 2 },
    { id: "process-of-reasoning", title: "1.2 The Process of Reasoning", level: 1 },
    { id: "steps-in-critical-analysis", title: "1.2.1 Steps in Critical Analysis", level: 2 },
    { id: "asking-right-questions", title: "1.2.2 Asking the Right Questions", level: 2 },
    { id: "evidence-evaluation", title: "1.2.3 Evidence Evaluation", level: 2 },
    { id: "structured-problem-solving", title: "1.2.4 Structured Problem-Solving", level: 2 },
    { id: "information-literacy", title: "1.3 Information Literacy", level: 1 },
    { id: "evaluating-sources", title: "1.3.1 Evaluating Sources", level: 2 },
    { id: "digital-literacy", title: "1.3.2 Digital Literacy", level: 2 },
    { id: "fact-vs-opinion", title: "1.3.3 Fact vs. Opinion", level: 2 },
    { id: "managing-information-overload", title: "1.3.4 Managing Information Overload", level: 2 },
    { id: "human-vs-machine-reasoning", title: "1.4.1 Human vs. Machine Reasoning", level: 2 },
    { id: "ai-capabilities-limitations", title: "1.4.2 AI Capabilities and Limitations", level: 2 },
    { id: "critical-thinking-ai-tools", title: "1.4.3 Critical Thinking with AI Tools", level: 2 },
    { id: "algorithmic-literacy-basics", title: "1.4.4 Algorithmic Literacy Basics", level: 2 },
    
    // Chapter 2: Understanding Arguments
    { id: "chapter-2", title: "Chapter 2: Understanding Arguments", level: 0 },
    { id: "claims-conclusions", title: "2.1.1 Claims and Conclusions", level: 2 },
    { id: "types-of-evidence", title: "2.1.2 Types of Evidence", level: 2 },
    { id: "implicit-explicit-premises", title: "2.1.3 Implicit vs. Explicit Premises", level: 2 },
    { id: "argument-mapping", title: "2.1.4 Argument Mapping", level: 2 },
    { id: "deductive-reasoning", title: "2.2.1 Deductive Reasoning", level: 2 },
    { id: "inductive-reasoning", title: "2.2.2 Inductive Reasoning", level: 2 },
    { id: "abductive-reasoning", title: "2.2.3 Abductive Reasoning", level: 2 },
    { id: "valid-vs-sound", title: "2.2.4 Valid vs. Sound Arguments", level: 2 },
    { id: "algorithmic-reasoning", title: "2.2.5 Algorithmic Reasoning", level: 2 },
    { id: "computational-thinking", title: "2.2.6 Computational Thinking Basics", level: 2 },
    { id: "boolean-logic", title: "2.2.7 Boolean Logic and Decision Trees", level: 2 },
    { id: "formal-fallacies", title: "2.3.1 Formal Fallacies", level: 2 },
    { id: "informal-fallacies", title: "2.3.2 Informal Fallacies", level: 2 },
    { id: "cognitive-biases", title: "2.3.3 Cognitive Biases", level: 2 },
    { id: "common-reasoning-mistakes", title: "2.3.4 Common Reasoning Mistakes", level: 2 },
    
    // Chapter 3: Scientific and Empirical Reasoning
    { id: "chapter-3", title: "Chapter 3: Scientific and Empirical Reasoning", level: 0 },
    { id: "hypothesis-formation", title: "3.1.1 Hypothesis Formation", level: 2 },
    { id: "research-design", title: "3.1.2 Research Design", level: 2 },
    { id: "data-collection", title: "3.1.3 Data Collection", level: 2 },
    { id: "theory-building", title: "3.1.4 Theory Building", level: 2 },
    { id: "correlation-vs-causation", title: "3.2.1 Correlation vs. Causation", level: 2 },
    { id: "experimental-design", title: "3.2.2 Experimental Design", level: 2 },
    { id: "control-variables", title: "3.2.3 Control Variables", level: 2 },
    { id: "confounding-factors", title: "3.2.4 Confounding Factors", level: 2 },
    { id: "reading-scientific-papers", title: "3.3.1 Reading Scientific Papers", level: 2 },
    { id: "understanding-methodology", title: "3.3.2 Understanding Methodology", level: 2 },
    { id: "interpreting-results", title: "3.3.3 Interpreting Results", level: 2 },
    { id: "research-ethics", title: "3.3.4 Research Ethics", level: 2 },
    { id: "how-ai-systems-learn", title: "3.4.1 How AI Systems Learn", level: 2 },
    { id: "training-data-bias", title: "3.4.2 Training Data and Bias", level: 2 },
    { id: "model-evaluation", title: "3.4.3 Model Evaluation", level: 2 },
    { id: "ai-analysis-limitations", title: "3.4.4 Limitations of AI Analysis", level: 2 },
    
    // Chapter 4: Statistical Thinking
    { id: "chapter-4", title: "Chapter 4: Statistical Thinking", level: 0 },
    { id: "data-types", title: "4.1.1 Data Types", level: 2 },
    { id: "descriptive-statistics", title: "4.1.2 Descriptive Statistics", level: 2 },
    { id: "probability-basics", title: "4.1.3 Probability Basics", level: 2 },
    
    // Chapter 5: Decision Making
    { id: "chapter-5", title: "Chapter 5: Decision Making", level: 0 },
    { id: "decision-analysis", title: "5.1 Decision Analysis", level: 1 },
    { id: "risk-uncertainty", title: "5.2 Risk and Uncertainty", level: 1 },
    { id: "group-decision-making", title: "5.3 Group Decision Making", level: 1 },
    
    // Chapter 6: Applied Critical Reasoning
    { id: "chapter-6", title: "Chapter 6: Applied Critical Reasoning", level: 0 },
    { id: "media-analysis", title: "6.1 Media Analysis", level: 1 },
    { id: "professional-applications", title: "6.2 Professional Applications", level: 1 }
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
