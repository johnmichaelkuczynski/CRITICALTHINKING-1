export interface BookContent {
  title: string;
  author: string;
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export const bookContent: BookContent = {
  title: "Critical Thinking: A Comprehensive Guide",
  author: "Zhi Systems",
  sections: [
    {
      id: "section-1",
      title: "Week 1: Foundations of Critical Thinking",
      content: `<div id="introduction-to-critical-thinking">
<h2>Introduction to Critical Thinking</h2>

<div id="critical-thinking-foundations">
<h3>1.1 What is Critical Thinking?</h3>

Critical thinking is the objective analysis and evaluation of an issue in order to form a judgment. It's a disciplined way of thinking that involves actively and skillfully conceptualizing, applying, analyzing, synthesizing, and evaluating information gathered from observation, experience, reflection, reasoning, or communication.

<div id="reasoning-process">
<h3>1.2 The Process of Reasoning</h3>

The process of reasoning involves several key steps:
1. Identifying the problem or question
2. Gathering relevant information
3. Analyzing the information objectively
4. Considering multiple perspectives
5. Drawing logical conclusions
6. Evaluating the validity of conclusions

<div id="common-misconceptions">
<h3>1.3 Common Misconceptions</h3>

Many people have misconceptions about critical thinking:
- It's not about being negative or critical in a destructive way
- It's not just about finding flaws in arguments
- It doesn't mean being skeptical about everything
- It's not the same as intelligence or having opinions

<div id="critical-thinker-toolkit">
<h3>1.4 The Critical Thinker's Toolkit</h3>

Essential tools for critical thinking include:
- Questioning assumptions
- Evaluating evidence
- Recognizing bias
- Considering alternative explanations
- Making reasoned judgments
- Reflecting on your own thinking process

<div id="homework-1">
<h3>Homework 1: Critical Thinking Foundations</h3>

Practice exercises to develop foundational critical thinking skills.
</div>
</div>
</div>
</div>
</div>`
    },
    {
      id: "section-2", 
      title: "Week 2: Argument Structure and Analysis",
      content: `<div id="argument-components">
<h2>Components of Arguments</h2>

<div id="premises-conclusions">
<h3>2.1 Premises and Conclusions</h3>

An argument consists of:
- Premises: statements that provide evidence or reasons
- Conclusion: the statement being supported by the premises

<div id="validity-soundness">
<h3>2.2 Validity and Soundness</h3>

- Validity: the conclusion follows logically from the premises
- Soundness: the argument is valid AND the premises are true

<div id="argument-evaluation">
<h3>2.3 Evaluating Arguments</h3>

Steps to evaluate arguments:
1. Identify the conclusion
2. Identify the premises
3. Check if the conclusion follows from the premises
4. Evaluate the truth of the premises
5. Consider alternative explanations

<div id="homework-2">
<h3>Homework 2: Argument Analysis</h3>

Practice identifying and evaluating different types of arguments.
</div>
</div>
</div>
</div>
</div>`
    },
    {
      id: "section-3",
      title: "Week 3: Decision Making and Problem Solving", 
      content: `<div id="decision-frameworks">
<h2>Decision-Making Frameworks</h2>

<div id="problem-solving-steps">
<h3>3.1 Systematic Problem Solving</h3>

Effective problem-solving follows these steps:
1. Define the problem clearly
2. Generate multiple solutions
3. Evaluate each option
4. Choose the best solution
5. Implement and monitor

<div id="evaluating-options">
<h3>3.2 Evaluating Options and Alternatives</h3>

When evaluating options, consider:
- Feasibility and practicality
- Potential consequences
- Resource requirements
- Stakeholder impact
- Ethical implications

<div id="risk-assessment">
<h3>3.3 Risk Assessment and Analysis</h3>

Assessing risks involves:
- Identifying potential risks
- Evaluating probability and impact
- Developing mitigation strategies
- Monitoring and adjusting

<div id="homework-3">
<h3>Homework 3: Decision Making</h3>

Apply decision-making frameworks to real-world scenarios.
</div>
</div>
</div>
</div>
</div>`
    },
    {
      id: "section-4",
      title: "Week 4: Research and Evidence Evaluation",
      content: `<div id="scientific-method">
<h2>Scientific Method and Research</h2>

<div id="evidence-types">
<h3>4.1 Types of Evidence</h3>

Different types of evidence include:
- Empirical evidence from observation
- Statistical data and analysis
- Expert testimony and opinions
- Historical and case studies
- Logical reasoning and theoretical frameworks

<div id="correlation-causation">
<h3>4.2 Correlation vs. Causation</h3>

Understanding the difference:
- Correlation: variables change together
- Causation: one variable causes change in another
- Confounding variables can create false correlations

<div id="research-evaluation">
<h3>4.3 Evaluating Research Studies</h3>

When evaluating research:
- Check sample size and methodology
- Look for peer review and replication
- Consider funding sources and potential bias
- Evaluate statistical significance

<div id="homework-4">
<h3>Homework 4: Research Evaluation</h3>

Practice evaluating different types of research and evidence.
</div>
</div>
</div>
</div>
</div>`
    },
    {
      id: "section-5",
      title: "Week 5: Media Literacy and Information Analysis",
      content: `<div id="information-sources">
<h2>Media Literacy and Information Analysis</h2>

<div id="evaluating-sources">
<h3>5.1 Evaluating Information Sources</h3>

When evaluating sources, consider:
- Author credentials and expertise
- Publication date and relevance
- Source bias and funding
- Peer review and citations
- Fact-checking and verification

<div id="media-bias">
<h3>5.2 Recognizing Media Bias</h3>

Types of media bias:
- Selection bias: what stories are covered
- Confirmation bias: favoring information that confirms existing beliefs
- Sensationalism: exaggerating for attention
- False balance: presenting false equivalency

<div id="fact-checking">
<h3>5.3 Fact-Checking Techniques</h3>

Effective fact-checking involves:
- Cross-referencing multiple sources
- Checking primary sources
- Using reputable fact-checking websites
- Verifying quotes and statistics
- Examining evidence quality

<div id="homework-5">
<h3>Homework 5: Media Literacy</h3>

Practice evaluating media sources and identifying bias in news articles.
</div>
</div>
</div>
</div>
</div>`
    },
    {
      id: "section-6",
      title: "Week 6: Ethical Reasoning and Moral Frameworks",
      content: `<div id="ethical-frameworks">
<h2>Ethical Reasoning and Moral Frameworks</h2>

<div id="major-frameworks">
<h3>6.1 Major Ethical Frameworks</h3>

Key ethical approaches:
- Consequentialism: judging actions by outcomes
- Deontological ethics: duty-based ethics
- Virtue ethics: character-based approach
- Care ethics: relationship and context-focused
- Pragmatic ethics: practical problem-solving

<div id="moral-reasoning">
<h3>6.2 Moral Reasoning Process</h3>

Steps in ethical decision-making:
1. Identify the ethical issue
2. Gather relevant information
3. Consider stakeholder perspectives
4. Apply ethical frameworks
5. Evaluate potential consequences
6. Make a reasoned decision

<div id="ethical-dilemmas">
<h3>6.3 Analyzing Ethical Dilemmas</h3>

When facing ethical dilemmas:
- Identify competing values and principles
- Consider long-term and short-term consequences
- Examine precedents and their implications
- Seek input from diverse perspectives
- Balance individual and collective interests

<div id="homework-6">
<h3>Homework 6: Ethical Reasoning</h3>

Apply ethical frameworks to analyze real-world moral dilemmas.
</div>
</div>
</div>
</div>
</div>`
    },
    {
      id: "section-7",
      title: "Week 7: Creative Thinking and Innovation",
      content: `<div id="creative-processes">
<h2>Creative Thinking and Innovation</h2>

<div id="creative-thinking-methods">
<h3>7.1 Creative Thinking Processes</h3>

Creative thinking involves:
- Divergent thinking: generating multiple solutions
- Convergent thinking: evaluating and selecting ideas
- Lateral thinking: approaching problems from new angles
- Associative thinking: making connections between concepts
- Systems thinking: understanding complex relationships

<div id="brainstorming-techniques">
<h3>7.2 Brainstorming and Ideation</h3>

Effective brainstorming techniques:
- Mind mapping for visual idea organization
- SCAMPER method for systematic creativity
- Six thinking hats for multiple perspectives
- Reverse brainstorming for problem identification
- Building on others' ideas collaboratively

<div id="innovation-methods">
<h3>7.3 Innovation and Design Thinking</h3>

Design thinking process:
1. Empathize: understand user needs
2. Define: frame the problem clearly
3. Ideate: generate creative solutions
4. Prototype: build and test ideas
5. Test: gather feedback and iterate

<div id="homework-7">
<h3>Homework 7: Creative Thinking</h3>

Practice creative problem-solving techniques on real-world challenges.
</div>
</div>
</div>
</div>
</div>`
    },
    {
      id: "section-8",
      title: "Week 8: Integration and Real-World Applications",
      content: `<div id="critical-thinking-integration">
<h2>Integration and Real-World Applications</h2>

<div id="skill-integration">
<h3>8.1 Integrating Critical Thinking Skills</h3>

Bringing together all critical thinking components:
- Systematic analysis of complex problems
- Evidence-based decision making
- Ethical considerations in reasoning
- Creative solution generation
- Effective communication of ideas

<div id="real-world-applications">
<h3>8.2 Real-World Applications</h3>

Critical thinking in practice:
- Academic research and writing
- Professional problem-solving
- Personal decision-making
- Civic engagement and voting
- Consumer choices and financial decisions

<div id="workplace-scenarios">
<h3>8.3 Workplace and Academic Scenarios</h3>

Applying critical thinking in:
- Team collaboration and conflict resolution
- Project planning and risk assessment
- Performance evaluation and improvement
- Strategic thinking and innovation
- Leadership and management decisions

<div id="continuous-improvement">
<h3>8.4 Continuous Improvement</h3>

Developing as a critical thinker:
- Regular self-reflection and assessment
- Seeking diverse perspectives and feedback
- Staying informed and updating knowledge
- Practicing intellectual humility
- Committing to lifelong learning

<div id="homework-8">
<h3>Homework 8: Real-World Applications</h3>

Apply comprehensive critical thinking skills to complex, real-world scenarios.
</div>
</div>
</div>
</div>
</div>
</div>`
    }
  ]
};

export function getFullDocumentContent(): string {
  return bookContent.sections.map(section => `${section.title}\n\n${section.content}`).join('\n\n');
}
