import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { renderMathInElement, renderMathString } from "@/lib/math-renderer";
import { useTextSelection } from "@/hooks/use-text-selection";
import SelectionToolbar from "@/components/selection-toolbar";
import ChunkingModal from "@/components/chunking-modal";

import { bookContent as paperContent } from "@shared/book-content";
import { Copy, Lock } from "lucide-react";

interface DocumentContentProps {
  mathMode?: boolean;
  onTextSelectedForChat?: (text: string) => void;
  onRewriteFromSelection?: (text: string) => void;
  onPassageDiscussion?: (text: string) => void;
  onCreateStudyGuide?: (text: string) => void;
  onTestMe?: (text: string) => void;
  onCreatePodcast?: (text: string) => void;
  onNavigateToModules?: (weekNumber?: number, section?: string) => void;
}

export default function DocumentContent({ 
  mathMode = true, 
  onTextSelectedForChat, 
  onRewriteFromSelection, 
  onPassageDiscussion, 
  onCreateStudyGuide,
  onTestMe,
  onCreatePodcast,
  onNavigateToModules
}: DocumentContentProps) {
  const { selection, isSelecting, clearSelection, highlightSelection, removeHighlights } = useTextSelection();
  const [showChunkingModal, setShowChunkingModal] = useState(false);
  const [selectedTextForChunking, setSelectedTextForChunking] = useState("");

  // Add click handlers for interactive links
  useEffect(() => {
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('homework-link') || 
          target.classList.contains('answer-key-link') || 
          target.classList.contains('practice-link') || 
          target.classList.contains('chapter-link')) {
        
        event.preventDefault();
        const weekNumber = parseInt(target.getAttribute('data-week') || '1');
        const type = target.getAttribute('data-type') || '';
        const title = target.getAttribute('data-title') || '';
        
        console.log(`Navigating to Modules tab: Week ${weekNumber}, Type: ${type}, Title: ${title}`);
        
        if (onNavigateToModules) {
          onNavigateToModules(weekNumber, type);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [onNavigateToModules]);


  // Math rendering is handled in processContentForMathMode function

  const handleAskQuestion = (text: string) => {
    // Check if text is large and needs chunking
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      // Open chunking modal for large selections
      setShowChunkingModal(true);
      setSelectedTextForChunking(text);
    } else {
      // For smaller texts, use normal selection
      if (onPassageDiscussion) {
        onPassageDiscussion(text);
      }
    }
    // Don't clear selection - let user choose other actions if needed
  };

  const handleSendToChat = (text: string) => {
    // Check if text is large and needs chunking
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      // Open chunking modal for large selections
      setShowChunkingModal(true);
      setSelectedTextForChunking(text);
    } else {
      // For smaller texts, use normal selection
      if (onTextSelectedForChat) {
        onTextSelectedForChat(text);
      }
    }
    // Don't clear selection - let user choose other actions if needed
  };

  const handleRewrite = (text: string) => {
    // Check if text is large and needs chunking
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      // Open chunking modal for large selections
      setShowChunkingModal(true);
      setSelectedTextForChunking(text);
    } else {
      // For smaller texts, use normal selection
      if (onRewriteFromSelection) {
        onRewriteFromSelection(text);
      }
    }
    // Don't clear selection - let user choose other actions if needed
  };



  const handleCreateStudyGuide = (text: string) => {
    if (onCreateStudyGuide) {
      onCreateStudyGuide(text);
    }
    // Don't clear selection - let user choose other actions if needed
  };

  const handleTestMe = (text: string) => {
    if (onTestMe) {
      onTestMe(text);
    }
    // Don't clear selection - let user choose other actions if needed
  };

  const handleCreatePodcast = (text: string) => {
    if (onCreatePodcast) {
      onCreatePodcast(text);
    }
    // Don't clear selection - let user choose other actions if needed
  };





  const handleHighlight = () => {
    highlightSelection();
    clearSelection();
  };

  const handleSelectAll = () => {
    const documentContent = document.querySelector('[data-document-content]');
    if (documentContent) {
      const range = document.createRange();
      range.selectNodeContents(documentContent);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      // Get the full document text
      const fullText = paperContent.sections.map((section: any) => 
        `${section.title}\n\n${section.content}`
      ).join('\n\n');
      
      // Check if text is large (over 1000 words) and needs chunking
      const wordCount = fullText.split(/\s+/).length;
      
      if (wordCount > 1000) {
        // Open chunking modal for large selections
        setShowChunkingModal(true);
        setSelectedTextForChunking(fullText);
      } else {
        // For smaller texts, use normal selection
        if (onTextSelectedForChat) {
          onTextSelectedForChat(fullText);
        }
      }
    }
  };

  // Function to convert raw text content to properly formatted HTML
  const processContentForMathMode = (content: string) => {
    try {
      if (!content || typeof content !== 'string') {
        return content || '';
      }
      
      // Check if content already contains HTML tags - if so, render directly
      if (content.includes('<div') || content.includes('<h') || content.includes('<p')) {
        return content; // Return HTML content as-is for direct rendering
      }
      
      // Convert plain text to HTML with proper formatting
      let processedContent = content
        // First, escape any existing HTML to prevent double processing
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        
        // Convert line breaks to proper paragraphs
        .split('\n\n')
        .map(paragraph => {
          if (!paragraph.trim()) return '';
          
          // Check if this is a heading and add appropriate ID
          if (paragraph.match(/^(Week \d+:|Introduction|Basic Concepts|Applications|Key Takeaways|Boolean|Truth Tables|Material vs|Strict Implication|Symbolic Logic|Part [IVX]+:|Midterm|Final|Examination)/i)) {
            let headingId = '';
            const text = paragraph.trim();
            
            if (text.includes('Week 1:')) headingId = 'week1';
            else if (text.includes('Week 2:')) headingId = 'week2';
            else if (text.includes('Week 3:')) headingId = 'week3';
            else if (text.includes('Week 4:')) headingId = 'week4';
            else if (text.includes('Week 5:')) headingId = 'week5';
            else if (text.includes('Week 6:')) headingId = 'week6';
            else if (text.includes('Introduction to Logic')) headingId = 'intro-logic';
            else if (text.includes('Basic Concepts')) headingId = 'basic-concepts';
            else if (text.includes('Basic Logical Symbols')) headingId = 'logical-symbols';
            else if (text.includes('Material vs')) headingId = 'material-strict';
            else if (text.includes('Translation Practice')) headingId = 'translation-practice';
            else if (text.includes('Practice Exercises')) headingId = 'practice-exercises';
            else if (text.includes('Homework 1')) headingId = 'homework1';
            else if (text.includes('Propositional Calculus')) headingId = 'propositional-calculus';
            else if (text.includes('Truth Tables')) headingId = 'truth-tables';
            else if (text.includes('Elementary Proofs')) headingId = 'elementary-proofs';
            else if (text.includes('Boolean Algebra')) headingId = 'boolean-algebra';
            else if (text.includes('Midterm Examination')) headingId = 'midterm';
            else if (text.includes('Predicate Logic')) headingId = 'predicate-logic';
            else if (text.includes('Advanced Quantification')) headingId = 'advanced-quantification';
            else if (text.includes('Models and Proofs')) headingId = 'models-proofs';
            else if (text.includes('Final Examination')) headingId = 'final-exam';
            
            return `<h2 id="${headingId}" class="text-xl font-semibold mb-4 mt-8 text-slate-900 dark:text-slate-100">${text}</h2>`;
          }
          
          // Check if this is a subheading (shorter titles)
          if (paragraph.match(/^[A-Z][^.]{5,50}$/) && !paragraph.includes('|') && !paragraph.includes('=')) {
            return `<h3 class="text-lg font-medium mb-3 mt-6 text-foreground">${paragraph.trim()}</h3>`;
          }
          
          // Check if this is a code block (contains ASCII art or circuit diagrams)
          if (paragraph.includes('```') || paragraph.includes('---|') || paragraph.includes('|AND|') || paragraph.includes('|OR|') || paragraph.includes('|NOT|')) {
            return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-x-auto text-sm font-mono text-slate-900 dark:text-slate-100">${paragraph.trim()}</pre>`;
          }
          
          // Check if this is a table (contains multiple | characters)
          if (paragraph.split('|').length > 4) {
            const lines = paragraph.trim().split('\n');
            const tableRows = lines.map(line => {
              if (line.includes('|')) {
                const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
                return `<tr>${cells.map(cell => `<td class="border border-slate-400 dark:border-slate-600 px-3 py-2 text-center bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">${cell}</td>`).join('')}</tr>`;
              }
              return '';
            }).filter(row => row);
            
            if (tableRows.length > 0) {
              return `<table class="border-collapse border border-slate-400 dark:border-slate-600 my-6 mx-auto bg-white dark:bg-slate-800 shadow-sm"><tbody>${tableRows.join('')}</tbody></table>`;
            }
          }
          
          // Convert action items to clickable links
          let processedParagraph = paragraph.trim();
          
          // Detect homework patterns and make them clickable
          processedParagraph = processedParagraph.replace(
            /Homework\s+(\d+)\.(\d+)\.(\d+):\s*([^.\n]+)/gi,
            (match, chapter, section, subsection, title) => {
              const weekNumber = parseInt(chapter);
              return `<a href="#" class="homework-link text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium" data-week="${weekNumber}" data-type="homework" data-title="${title.trim()}">${match}</a>`;
            }
          );
          
          // Also detect simpler homework patterns
          processedParagraph = processedParagraph.replace(
            /Homework\s+(\d+):\s*([^.\n]+)/gi,
            (match, weekNumber, title) => {
              return `<a href="#" class="homework-link text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium" data-week="${weekNumber}" data-type="homework" data-title="${title.trim()}">${match}</a>`;
            }
          );
          
          // Detect answer key patterns
          processedParagraph = processedParagraph.replace(
            /Answer\s+Key:?\s*(Homework\s+(\d+)\.(\d+)\.(\d+)|Homework\s+(\d+)|[^.\n]+)/gi,
            (match, reference, ch1, sec1, sub1, week2) => {
              const weekNumber = ch1 ? parseInt(ch1) : (week2 ? parseInt(week2) : 1);
              return `<a href="#" class="answer-key-link text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline font-medium" data-week="${weekNumber}" data-type="answer-key" data-title="${reference.trim()}">${match}</a>`;
            }
          );
          
          // Detect practice problems patterns
          processedParagraph = processedParagraph.replace(
            /Practice\s+Problems?\s+(Set\s+[AB]?:?\s*)?([^.\n]+)/gi,
            (match, setInfo, title) => {
              const weekNumber = 1; // Default week, could be improved with context
              return `<a href="#" class="practice-link text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 underline font-medium" data-week="${weekNumber}" data-type="practice" data-title="${title.trim()}">${match}</a>`;
            }
          );
          
          // Detect chapter-based homework patterns
          processedParagraph = processedParagraph.replace(
            /Chapter\s+(\d+\.?\d*\.?\d*):?\s+([^.\n]+)/gi,
            (match, chapterNumber, title) => {
              const weekNumber = Math.ceil(parseFloat(chapterNumber));
              return `<a href="#" class="chapter-link text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline font-medium" data-week="${weekNumber}" data-type="chapter" data-title="${title.trim()}">${match}</a>`;
            }
          );

          // Regular paragraph with improved styling
          return `<p class="mb-4 leading-relaxed text-slate-800 dark:text-slate-200">${processedParagraph}</p>`;
        })
        .filter(p => p)
        .join('');
      
      if (!mathMode) {
        // Remove LaTeX notation when math mode is off
        return processedContent
          .replace(/\$\$([^$]+)\$\$/g, '$1') // Remove display math delimiters
          .replace(/\$([^$]+)\$/g, '$1') // Remove inline math delimiters
          .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)') // Convert sqrt notation
          .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)') // Convert fractions
          .replace(/\\text\{([^}]+)\}/g, '$1') // Remove text commands
          .replace(/\\mathbb\{([^}]+)\}/g, '$1') // Remove mathbb
          .replace(/\\forall/g, 'for all') // Convert universal quantifier
          .replace(/\\Rightarrow/g, 'implies') // Convert implication
          .replace(/\\ldots/g, '...') // Convert ellipsis
          .replace(/\\times/g, '×'); // Convert multiplication
      } else {
        // Process LaTeX notation for rendering
        let processed = processedContent;
        // Replace display math blocks
        processed = processed.replace(/\$\$([^$]+)\$\$/g, (match, latex) => {
          if (!match || !latex) return match || '';
          return renderMathString(latex, true);
        });
        // Replace inline math
        processed = processed.replace(/\$([^$]+)\$/g, (match, latex) => {
          if (!match || !latex) return match || '';
          return renderMathString(latex, false);
        });
        return processed;
      }
    } catch (error) {
      console.error('Error processing content for math mode:', error);
      return content || '';
    }
  };

  return (
    <div className="bg-card overflow-hidden relative">
      {/* Select All Button */}
      <div className="absolute top-16 right-6 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="bg-white/90 hover:bg-white border border-gray-300 shadow-sm text-xs px-2 py-1 h-7"
        >
          <Copy className="w-3 h-3 mr-1" />
          Select All
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-160px)]">
        <div className="p-8 w-full max-w-6xl mx-auto" data-document-content>
          <article className="prose prose-xl max-w-none text-slate-900 dark:text-slate-100 w-full leading-relaxed select-text">
            {/* Document Title */}
            <header className="text-center mb-12">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {paperContent.title}
              </h1>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 text-center">
                by {paperContent.author}
              </p>
            </header>

            {/* Full Document Content - No Paywall */}
            {paperContent.sections.map((section: any, index: number) => (
              <section key={section.id} id={section.id} className="mb-12">
                <div 
                  className={`text-slate-800 dark:text-slate-200 leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                  dangerouslySetInnerHTML={{ 
                    __html: processContentForMathMode(section.content) 
                  }}
                />
              </section>
            ))}
          </article>
        </div>
      </ScrollArea>
      
      {/* Selection Toolbar */}
      {selection && isSelecting && (
        <SelectionToolbar
          selectedText={selection.text}
          onAskQuestion={handleAskQuestion}
          onSendToChat={handleSendToChat}
          onRewrite={handleRewrite}
          onCreateStudyGuide={handleCreateStudyGuide}
          onTestMe={handleTestMe}
          onCreatePodcast={handleCreatePodcast}
          onHighlight={handleHighlight}
          onClear={clearSelection}
        />
      )}

      {/* Chunking Modal */}
      <ChunkingModal
        isOpen={showChunkingModal}
        onClose={() => setShowChunkingModal(false)}
        text={selectedTextForChunking}
        onChunkAction={(chunk: string, chunkIndex: number, action: 'quiz' | 'chat' | 'rewrite' | 'study-guide' | 'student-test' | 'podcast') => {
          if (action === 'chat' && onTextSelectedForChat) {
            onTextSelectedForChat(chunk);
          } else if (action === 'rewrite' && onRewriteFromSelection) {
            onRewriteFromSelection(chunk);
          } else if (action === 'podcast' && onCreatePodcast) {
            onCreatePodcast(chunk);
          }
        }}
      />
      

    </div>
  );
}