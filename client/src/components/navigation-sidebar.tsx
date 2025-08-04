import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a comprehensive table of contents that matches the actual book structure
const createTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number; searchText: string }> = [
    // Preface and Introduction
    { id: "preface", title: "Preface: Using This Book", level: 0, searchText: "Welcome to Critical Reasoning: A Comprehensive Approach" },
    { id: "topics-covered", title: "Topics Covered", level: 1, searchText: "Adapting the Material for Different Academic Levels" },
    { id: "adapting-material", title: "Adapting the Material for Different Academic Levels", level: 1, searchText: "This text employs a layered learning approach" },
    { id: "core-vs-advanced", title: "Core vs. Advanced Topics", level: 1, searchText: "The distinction between core and advanced topics" },
    { id: "navigation-guide", title: "Navigation Guide for Instructors", level: 1, searchText: "This text supports flexible course design" },
    
    // Chapter 1: Introduction to Critical Thinking
    { id: "chapter-1", title: "Chapter 1: Introduction to Critical Thinking", level: 0, searchText: "Chapter 1: Introduction to Critical Thinking" },
    { id: "foundations", title: "1.1 Foundations", level: 1, searchText: "1.1 Foundations" },
    { id: "what-is-critical-thinking", title: "1.1.1 What is Critical Thinking?", level: 2, searchText: "1.1.1 What is Critical Thinking?" },
    { id: "why-critical-thinking-matters", title: "1.1.2 Why Critical Thinking Matters", level: 2, searchText: "1.1.2 Why Critical Thinking Matters" },
    { id: "common-misconceptions", title: "1.1.3 Common Misconceptions", level: 2, searchText: "1.1.3 Common Misconceptions" },
    { id: "critical-thinker-toolkit", title: "1.1.4 The Critical Thinker's Toolkit", level: 2, searchText: "1.1.4 The Critical Thinker's Toolkit" },
    
    { id: "process-of-reasoning", title: "1.2 The Process of Reasoning", level: 1, searchText: "1.2 The Process of Reasoning" },
    { id: "steps-in-critical-analysis", title: "1.2.1 Steps in Critical Analysis", level: 2, searchText: "1.2.1 Steps in Critical Analysis" },
    { id: "asking-right-questions", title: "1.2.2 Asking the Right Questions", level: 2, searchText: "1.2.2 Asking the Right Questions" },
    { id: "evidence-evaluation", title: "1.2.3 Evidence Evaluation", level: 2, searchText: "1.2.3 Evidence Evaluation" },
    { id: "structured-problem-solving", title: "1.2.4 Structured Problem-Solving", level: 2, searchText: "1.2.4 Structured Problem-Solving" },
    
    { id: "information-literacy", title: "1.3 Information Literacy", level: 1, searchText: "1.3 Information Literacy" },
    { id: "evaluating-sources", title: "1.3.1 Evaluating Sources", level: 2, searchText: "1.3.1 Evaluating Sources" },
    { id: "digital-literacy", title: "1.3.2 Digital Literacy", level: 2, searchText: "1.3.2 Digital Literacy" },
    { id: "fact-vs-opinion", title: "1.3.3 Fact vs. Opinion", level: 2, searchText: "1.3.3 Fact vs. Opinion" },
    { id: "managing-information-overload", title: "1.3.4 Managing Information Overload", level: 2, searchText: "1.3.4 Managing Information Overload" },
    
    { id: "algorithmic-thinking", title: "1.4 Algorithmic Thinking", level: 1, searchText: "1.4.1 Human vs. Machine Reasoning" },
    { id: "human-vs-machine-reasoning", title: "1.4.1 Human vs. Machine Reasoning", level: 2, searchText: "1.4.1 Human vs. Machine Reasoning" },
    { id: "ai-capabilities-limitations", title: "1.4.2 AI Capabilities and Limitations", level: 2, searchText: "1.4.2 AI Capabilities and Limitations" },
    { id: "critical-thinking-ai-tools", title: "1.4.3 Critical Thinking with AI Tools", level: 2, searchText: "1.4.3 Critical Thinking with AI Tools" },
    { id: "algorithmic-literacy-basics", title: "1.4.4 Algorithmic Literacy Basics", level: 2, searchText: "1.4.4 Algorithmic Literacy Basics" },
    
    // Chapter 2: Understanding Arguments
    { id: "chapter-2", title: "Chapter 2: Understanding Arguments", level: 0, searchText: "Chapter 2: Understanding Arguments" },
    { id: "claims-conclusions", title: "2.1.1 Claims and Conclusions", level: 2, searchText: "2.1.1 Claims and Conclusions" },
    { id: "types-of-evidence", title: "2.1.2 Types of Evidence", level: 2, searchText: "2.1.2 Types of Evidence" },
    { id: "implicit-explicit-premises", title: "2.1.3 Implicit vs. Explicit Premises", level: 2, searchText: "2.1.3 Implicit vs. Explicit Premises" },
    { id: "argument-mapping", title: "2.1.4 Argument Mapping", level: 2, searchText: "2.1.4 Argument Mapping" },
    
    { id: "deductive-reasoning", title: "2.2.1 Deductive Reasoning", level: 2, searchText: "2.2.1 Deductive Reasoning" },
    { id: "inductive-reasoning", title: "2.2.2 Inductive Reasoning", level: 2, searchText: "2.2.2 Inductive Reasoning" },
    { id: "abductive-reasoning", title: "2.2.3 Abductive Reasoning", level: 2, searchText: "2.2.3 Abductive Reasoning" },
    { id: "valid-sound-arguments", title: "2.2.4 Valid vs. Sound Arguments", level: 2, searchText: "2.2.4 Valid vs. Sound Arguments" },
    { id: "algorithmic-reasoning", title: "2.2.5 Algorithmic Reasoning", level: 2, searchText: "2.2.5 Algorithmic Reasoning" },
    { id: "computational-thinking", title: "2.2.6 Computational Thinking Basics", level: 2, searchText: "2.2.6 Computational Thinking Basics" },
    { id: "boolean-logic", title: "2.2.7 Boolean Logic and Decision Trees", level: 2, searchText: "2.2.7 Boolean Logic and Decision Trees" },
    
    { id: "formal-fallacies", title: "2.3.1 Formal Fallacies", level: 2, searchText: "2.3.1 Formal Fallacies" },
    { id: "informal-fallacies", title: "2.3.2 Informal Fallacies", level: 2, searchText: "2.3.2 Informal Fallacies" },
    { id: "cognitive-biases", title: "2.3.3 Cognitive Biases", level: 2, searchText: "2.3.3 Cognitive Biases" },
    { id: "reasoning-mistakes", title: "2.3.4 Common Reasoning Mistakes", level: 2, searchText: "2.3.4 Common Reasoning Mistakes" },
    
    // Chapter 3: Scientific and Empirical Reasoning
    { id: "chapter-3", title: "Chapter 3: Scientific and Empirical Reasoning", level: 0, searchText: "Chapter 3: Scientific and Empirical Reasoning" },
    { id: "hypothesis-formation", title: "3.1.1 Hypothesis Formation", level: 2, searchText: "Chapter 3.1.1: Hypothesis Formation" },
    { id: "research-design", title: "3.1.2 Research Design", level: 2, searchText: "Chapter 3.1.2: Research Design" },
    { id: "data-collection", title: "3.1.3 Data Collection", level: 2, searchText: "Chapter 3.1.3: Data Collection" },
    { id: "theory-building", title: "3.1.4 Theory Building", level: 2, searchText: "Chapter 3.1.4: Theory Building" },
    
    { id: "correlation-causation", title: "3.2.1 Correlation vs. Causation", level: 2, searchText: "Chapter 3.2.1: Correlation vs. Causation" },
    { id: "experimental-design", title: "3.2.2 Experimental Design", level: 2, searchText: "Chapter 3.2.2: Experimental Design" },
    { id: "control-variables", title: "3.2.3 Control Variables", level: 2, searchText: "Chapter 3.2.3: Control Variables" },
    { id: "confounding-factors", title: "3.2.4 Confounding Factors", level: 2, searchText: "Chapter 3.2.4: Confounding Factors" },
    
    { id: "reading-scientific-papers", title: "3.3.1 Reading Scientific Papers", level: 2, searchText: "Chapter 3.3.1: Reading Scientific Papers" },
    { id: "understanding-methodology", title: "3.3.2 Understanding Methodology", level: 2, searchText: "Chapter 3.3.2: Understanding Methodology" },
    { id: "interpreting-results", title: "3.3.3 Interpreting Results", level: 2, searchText: "Chapter 3.3.3: Interpreting Results" },
    { id: "research-ethics", title: "3.3.4 Research Ethics", level: 2, searchText: "Chapter 3.3.4: Research Ethics" },
    
    { id: "ai-systems-learn", title: "3.4.1 How AI Systems Learn", level: 2, searchText: "Chapter 3.4.1: How AI Systems Learn" },
    { id: "training-data-bias", title: "3.4.2 Training Data and Bias", level: 2, searchText: "Chapter 3.4.2: Training Data and Bias" },
    { id: "model-evaluation", title: "3.4.3 Model Evaluation", level: 2, searchText: "Chapter 3.4.3: Model Evaluation" },
    { id: "ai-analysis-limitations", title: "3.4.4 Limitations of AI Analysis", level: 2, searchText: "Chapter 3.4.4: Limitations of AI Analysis" },
    
    // Chapter 4: Statistical Thinking
    { id: "chapter-4", title: "Chapter 4: Statistical Thinking", level: 0, searchText: "Chapter 4: Statistical Thinking" },
    { id: "data-types", title: "4.1.1 Data Types", level: 2, searchText: "Chapter 4.1.1: Data Types" },
    { id: "descriptive-statistics", title: "4.1.2 Descriptive Statistics", level: 2, searchText: "Chapter 4.1.2: Descriptive Statistics" },
    { id: "probability-basics", title: "4.1.3 Probability Basics", level: 2, searchText: "Chapter 4.1.3: Probability Basics" },
    { id: "visual-representation", title: "4.1.4 Visual Representation", level: 2, searchText: "Chapter 4.1.4: Visual Representation" },
    
    { id: "sampling", title: "4.2.1 Sampling", level: 2, searchText: "Chapter 4.2.1: Sampling" },
    { id: "confidence-intervals", title: "4.2.2 Confidence Intervals", level: 2, searchText: "4.2.2 Confidence Intervals" },
    { id: "hypothesis-testing", title: "4.2.3 Hypothesis Testing", level: 2, searchText: "4.2.3 Hypothesis Testing" },
    { id: "statistical-significance", title: "4.2.4 Statistical Significance", level: 2, searchText: "4.2.4 Statistical Significance" },
    
    { id: "polling-surveys", title: "4.3.1 Polling and Surveys", level: 2, searchText: "4.3.1 Polling and Surveys" },
    { id: "medical-statistics", title: "4.3.2 Medical Statistics", level: 2, searchText: "4.3.2 Medical Statistics" },
    { id: "economic-data", title: "4.3.3 Economic Data", level: 2, searchText: "Chapter 4.3.3 Economic Data" },
    { id: "social-science-research", title: "4.3.4 Social Science Research", level: 2, searchText: "4.3.4 Social Science Research" },
    
    // Chapter 5: Decision Making
    { id: "chapter-5", title: "Chapter 5: Decision Making", level: 0, searchText: "Chapter 5: Decision Making" },
    { id: "decision-analysis", title: "5.1 Decision Analysis", level: 1, searchText: "5.1 Decision Analysis" },
    { id: "risk-uncertainty", title: "5.2 Risk and Uncertainty", level: 1, searchText: "5.2 Risk and Uncertainty" },
    { id: "group-decision-making", title: "5.3 Group Decision Making", level: 1, searchText: "Chapter 5.3: Group Decision Making" },
    
    // Chapter 6: Applied Critical Reasoning
    { id: "chapter-6", title: "Chapter 6: Applied Critical Reasoning", level: 0, searchText: "Chapter 6: Applied Critical Reasoning" },
    { id: "media-analysis", title: "6.1 Media Analysis", level: 1, searchText: "Chapter 6.1: Media Analysis" },
    { id: "professional-applications", title: "6.2 Professional Applications", level: 1, searchText: "Chapter 6.2: Professional Applications" },
    { id: "personal-decision-making", title: "6.3 Personal Decision Making", level: 1, searchText: "Chapter 6.3: Personal Decision Making" },
    
    // Appendices
    { id: "appendices", title: "Appendices", level: 0, searchText: "Appendices" },
    { id: "appendix-a", title: "Appendix A: Mathematical Foundations", level: 1, searchText: "Appendix A: Mathematical Foundations" },
    { id: "appendix-b", title: "Appendix B: Logic Symbols and Notation", level: 1, searchText: "Appendix B: Logic Symbols and Notation" },
    { id: "appendix-c", title: "Appendix C: Statistical Tables", level: 1, searchText: "Appendix C: Statistical Tables" },
    { id: "appendix-d", title: "Appendix D: Glossary", level: 1, searchText: "Appendix D: Glossary" },
    { id: "appendix-e", title: "Appendix E: Further Reading", level: 1, searchText: "Appendix E: Further Reading" },
    { id: "appendix-f", title: "Appendix F: Index", level: 1, searchText: "Appendix F: Index" }
  ];
  
  return tableOfContents;
};

const tableOfContents = createTableOfContents();

export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    console.log(`Clicking navigation item: ${id}`);
    
    // First try to find exact section ID match
    let element = document.getElementById(id);
    console.log(`Found element by ID: ${!!element}`);
    
    // If section ID found, scroll to it directly
    if (element) {
      console.log(`Scrolling to section: ${element.id}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Add a temporary highlight to show the user where they landed
      element.style.backgroundColor = '#fef3c7';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 2000);
      return;
    }
    
    // Find the TOC item to get its search text
    const tocItem = tableOfContents.find(item => item.id === id);
    const searchText = tocItem?.searchText || tocItem?.title;
    console.log(`Searching for text: ${searchText}`);
    
    // Search for the text in the document content
    if (searchText) {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent && node.textContent.includes(searchText)) {
          const parentElement = node.parentElement;
          if (parentElement) {
            console.log(`Found text match, scrolling to element`);
            parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
            
            // Highlight the found section
            parentElement.style.backgroundColor = '#fef3c7';
            setTimeout(() => {
              parentElement.style.backgroundColor = '';
            }, 3000);
            return;
          }
        }
      }
    }
    
    console.log(`No element found for navigation ID: ${id}`);
  };

  return (
    <div className="w-full h-full bg-card border-r border-border">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Table of Contents</h2>
          <nav className="space-y-1">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full text-left px-2 py-1 rounded transition-colors
                  hover:bg-accent hover:text-accent-foreground
                  text-sm
                  ${item.level === 0 ? 'font-semibold text-foreground' : ''}
                  ${item.level === 1 ? 'ml-4 font-medium text-foreground' : ''}
                  ${item.level === 2 ? 'ml-8 text-muted-foreground' : ''}
                `}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}