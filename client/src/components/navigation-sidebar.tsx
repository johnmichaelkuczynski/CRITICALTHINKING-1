import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a table of contents that navigates to actual chapter content, not TOC headers
const createTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number; searchText: string }> = [
    // Main Section
    { id: "section-1", title: "Critical Thinking: A Comprehensive Guide", level: 0, searchText: "Adapting the Material for Different Academic Levels" },
    
    // Chapter 1 sections - navigate to actual content paragraphs
    { id: "foundations", title: "1.1 Foundations", level: 1, searchText: "Critical thinking is often described as" },
    { id: "what-is-critical-thinking", title: "1.1.1 What is Critical Thinking?", level: 2, searchText: "Critical thinking is often described as \"thinking about thinking\"" },
    { id: "why-critical-thinking-matters", title: "1.1.2 Why Critical Thinking Matters", level: 2, searchText: "In today's information-rich environment" },
    { id: "common-misconceptions", title: "1.1.3 Common Misconceptions", level: 2, searchText: "Many people hold misconceptions about critical thinking" },
    { id: "critical-thinker-toolkit", title: "1.1.4 The Critical Thinker's Toolkit", level: 2, searchText: "Essential tools for critical thinking include" },
    
    { id: "process-of-reasoning", title: "1.2 The Process of Reasoning", level: 1, searchText: "Reasoning is the mental process" },
    { id: "steps-in-critical-analysis", title: "1.2.1 Steps in Critical Analysis", level: 2, searchText: "Systematic analysis involves several key steps" },
    { id: "asking-right-questions", title: "1.2.2 Asking the Right Questions", level: 2, searchText: "The art of questioning is central to critical thinking" },
    { id: "evidence-evaluation", title: "1.2.3 Evidence Evaluation", level: 2, searchText: "Not all evidence is created equal" },
    { id: "structured-problem-solving", title: "1.2.4 Structured Problem-Solving", level: 2, searchText: "Problem-solving benefits from a structured approach" },
    
    { id: "information-literacy", title: "1.3 Information Literacy", level: 1, searchText: "Information literacy is the ability to" },
    { id: "evaluating-sources", title: "1.3.1 Evaluating Sources", level: 2, searchText: "Source credibility is fundamental" },
    { id: "digital-literacy", title: "1.3.2 Digital Literacy", level: 2, searchText: "Digital literacy encompasses more than" },
    { id: "fact-vs-opinion", title: "1.3.3 Fact vs. Opinion", level: 2, searchText: "Distinguishing facts from opinions" },
    { id: "managing-information-overload", title: "1.3.4 Managing Information Overload", level: 2, searchText: "Information overload can impair decision-making" },
    
    { id: "algorithmic-thinking", title: "1.4 Algorithmic Thinking", level: 1, searchText: "Algorithmic thinking involves breaking down" },
    { id: "human-vs-machine-reasoning", title: "1.4.1 Human vs. Machine Reasoning", level: 2, searchText: "Human and machine reasoning differ" },
    { id: "ai-capabilities-limitations", title: "1.4.2 AI Capabilities and Limitations", level: 2, searchText: "AI systems have both strengths and limitations" },
    { id: "critical-thinking-ai-tools", title: "1.4.3 Critical Thinking with AI Tools", level: 2, searchText: "AI can augment human critical thinking" },
    { id: "algorithmic-literacy-basics", title: "1.4.4 Algorithmic Literacy Basics", level: 2, searchText: "Understanding algorithms is increasingly important" }
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