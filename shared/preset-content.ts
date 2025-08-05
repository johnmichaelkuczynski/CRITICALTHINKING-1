// Pre-existing course content to avoid waiting for AI generation

export const presetLectures = {
  1: {
    title: "Week 1: Introduction to Critical Thinking and Reasoning",
    content: `<h2>Week 1: Introduction to Critical Thinking and Reasoning</h2>

<h3>Overview</h3>
<p>Welcome to Critical Thinking! This week introduces the fundamental skills of rational thought, analytical reasoning, and effective decision-making.</p>

<h3>Key Concepts</h3>

<h4>1. What is Critical Thinking?</h4>
<ul>
<li><strong>Critical thinking</strong> is the objective analysis and evaluation of an issue to form a judgment</li>
<li>Involves questioning assumptions, examining evidence, and considering alternative perspectives</li>
<li>Goal: Make well-reasoned decisions and solve problems effectively</li>
</ul>

<h4>2. Core Elements of Critical Thinking</h4>

<h5>Analysis</h5>
<ul>
<li>Breaking down complex information into components</li>
<li>Identifying patterns, relationships, and underlying structures</li>
<li>Example: Analyzing the causes of a social problem</li>
</ul>

<h5>Evaluation</h5>
<ul>
<li>Assessing the credibility and quality of evidence</li>
<li>Determining the strength of arguments</li>
<li>Example: Evaluating the reliability of news sources</li>
</ul>

<h5>Inference</h5>
<ul>
<li>Drawing logical conclusions from available information</li>
<li>Making reasonable predictions based on evidence</li>
<li>Example: Inferring trends from data patterns</li>
</ul>

<h5>Interpretation</h5>
<ul>
<li>Understanding the meaning and significance of information</li>
<li>Recognizing implications and consequences</li>
<li>Example: Interpreting statistical data in context</li>
</ul>

<h5>Explanation</h5>
<ul>
<li>Clearly communicating reasoning and evidence</li>
<li>Justifying conclusions and methodology</li>
<li>Example: Explaining the rationale behind a business decision</li>
</ul>

<h4>3. The Critical Thinking Process</h4>
<ol>
<li><strong>Identify</strong> the problem or question</li>
<li><strong>Gather</strong> relevant information and evidence</li>
<li><strong>Consider</strong> multiple perspectives and alternatives</li>
<li><strong>Analyze</strong> assumptions and biases</li>
<li><strong>Evaluate</strong> evidence and arguments</li>
<li><strong>Draw</strong> well-reasoned conclusions</li>
</ol>

<h3>Practice Problems</h3>
<ol>
<li>Identify three assumptions in this statement: "Social media is bad for teenagers because it causes depression."</li>
<li>List five questions you would ask when evaluating a news article about climate change.</li>
<li>Describe how you would analyze the reliability of a scientific study.</li>
</ol>

<h3>Next Week Preview</h3>
<p>We'll explore logical fallacies and learn to identify common errors in reasoning.</p>`
  }
};

export const presetPracticeHomework = {
  1: {
    title: "Week 1 Practice Homework: Critical Thinking Fundamentals",
    content: {
      instructions: "Practice identifying critical thinking elements and analyzing real-world scenarios. Focus on developing your analytical reasoning skills.",
      totalPoints: 50,
      problems: [
        {
          id: "p1",
          title: "Identifying Assumptions",
          points: 20,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "List three assumptions in this statement: 'Students who use smartphones in class perform worse because technology is distracting.'",
              answer: "1) All smartphone use in class is distracting, 2) Poor performance is caused by distraction, 3) Technology inherently reduces learning",
              explanation: "Critical thinkers identify hidden assumptions that may not be supported by evidence."
            },
            {
              id: "p1b",
              question: "What assumption is made in: 'This restaurant must be good because it's always crowded'?",
              answer: "That crowd size indicates quality",
              explanation: "This assumes a correlation between popularity and quality without considering other factors."
            },
            {
              id: "p1c",
              question: "Identify an assumption in: 'We should ban video games because they cause violent behavior.'",
              answer: "That video games directly cause violent behavior",
              explanation: "This assumes a causal relationship that may not be supported by evidence."
            }
          ]
        },
        {
          id: "p2",
          title: "Evidence Evaluation",
          points: 15,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "Which source would be most reliable for information about climate change?",
              options: ["Social media post", "Peer-reviewed scientific journal", "Opinion blog"],
              correct: 1,
              explanation: "Peer-reviewed journals undergo rigorous evaluation by experts in the field."
            },
            {
              id: "p2b",
              question: "What makes evidence strong?",
              options: ["It supports your opinion", "It comes from multiple reliable sources", "It's widely shared online"],
              correct: 1,
              explanation: "Strong evidence is credible, verifiable, and comes from multiple reliable sources."
            }
          ]
        },
        {
          id: "p3",
          title: "Critical Analysis",
          points: 15,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Describe three questions you would ask to evaluate this claim: 'Exercise improves mental health.'",
              answer: "1) What type of exercise? 2) What evidence supports this? 3) Are there any exceptions or limitations?",
              explanation: "Critical thinkers ask probing questions to understand claims fully."
            },
            {
              id: "p3b",
              question: "What alternative explanations might exist for this observation: 'Crime rates are higher in poor neighborhoods'?",
              answer: "Higher police presence, different reporting rates, systemic inequalities, lack of resources",
              explanation: "Considering alternative explanations prevents jumping to conclusions."
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Homework: Logical Fallacies & Reasoning Errors", 
    content: {
      instructions: "Practice identifying common logical fallacies and reasoning errors. Learn to spot flawed arguments in everyday situations.",
      totalPoints: 60,
      problems: [
        {
          id: "p1",
          title: "Fallacy Identification",
          points: 15,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What fallacy is present in: 'We can't trust John's opinion on taxes because he doesn't pay enough of them'?",
              options: ["Straw man", "Ad hominem", "False dilemma"],
              correct: 1,
              explanation: "Ad hominem attacks the person rather than addressing their argument."
            },
            {
              id: "p1b",
              question: "Identify the fallacy: 'Either we ban all cars or we accept that the environment will be destroyed.'",
              options: ["False dilemma", "Slippery slope", "Appeal to authority"],
              correct: 0,
              explanation: "False dilemma presents only two options when more exist."
            },
            {
              id: "p1c",
              question: "What fallacy does this represent: 'If we allow students to retake tests, soon they'll expect to retake entire courses, then degrees will be meaningless'?",
              options: ["Red herring", "Slippery slope", "Circular reasoning"],
              correct: 1,
              explanation: "Slippery slope assumes that one event will inevitably lead to a chain of negative consequences."
            }
          ]
        },
        {
          id: "p2",
          title: "Argument Analysis",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p2a",
              question: "Explain why this is a weak argument: 'Most celebrities endorse this product, so it must be good.'",
              answer: "Appeal to popularity/bandwagon fallacy - popularity doesn't guarantee quality",
              explanation: "Celebrity endorsements don't provide evidence about product quality; this is an appeal to authority/popularity."
            },
            {
              id: "p2b",
              question: "What type of reasoning error is shown in: 'I met three rude people from that city, so everyone from there must be rude'?",
              answer: "Hasty generalization",
              explanation: "Drawing broad conclusions from limited examples is hasty generalization."
            },
            {
              id: "p2c",
              question: "Identify the flaw in: 'You're either with us or against us.'",
              answer: "False dilemma - presents only two options when more exist",
              explanation: "This creates an artificial either/or choice, ignoring neutral positions or other alternatives."
            }
          ]
        },
        {
          id: "p3",
          title: "Source Evaluation",
          points: 20,
          type: "multiple_choice",
          questions: [
            {
              id: "p3a",
              question: "Which factor is LEAST important when evaluating a source's credibility?",
              options: ["Author's expertise", "Publication date", "How many times it's been shared", "Evidence provided"],
              correct: 2,
              explanation: "Social media shares don't indicate credibility - popularity isn't the same as accuracy."
            },
            {
              id: "p3b",
              question: "What makes a source more reliable?",
              options: ["It confirms your existing beliefs", "It provides citations and evidence", "It uses emotional language"],
              correct: 1,
              explanation: "Reliable sources back up claims with evidence and allow readers to verify information."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Homework: Decision Making & Problem Solving",
    content: {
      instructions: "Practice applying critical thinking frameworks to real-world decision making and problem solving. Focus on systematic analysis and evaluation of options.",
      totalPoints: 75,
      problems: [
        {
          id: "p1", 
          title: "Decision-Making Framework",
          points: 30,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "You need to choose between two job offers. List 5 criteria you would use to evaluate them.",
              answer: "Salary, career growth, work-life balance, company culture, location",
              explanation: "Good decision-making considers multiple relevant factors, not just obvious ones like salary."
            },
            {
              id: "p1b", 
              question: "Describe the steps in a rational decision-making process.",
              answer: "1) Define the problem, 2) Gather information, 3) Identify alternatives, 4) Evaluate options, 5) Choose and implement, 6) Review results",
              explanation: "Systematic approaches help avoid emotional or impulsive decisions."
            },
            {
              id: "p1c",
              question: "What cognitive bias is involved when someone only considers information that supports their preferred choice?",
              answer: "Confirmation bias",
              explanation: "Confirmation bias leads us to seek information that confirms our existing beliefs while ignoring contradictory evidence."
            },
            {
              id: "p1d",
              question: "Why is it important to consider alternative solutions to a problem?",
              answer: "To avoid tunnel vision and find better solutions that might not be immediately obvious",
              explanation: "Multiple alternatives prevent us from settling for the first solution we think of, which may not be optimal."
            }
          ]
        },
        {
          id: "p2",
          title: "Logical Equivalence",
          points: 25,
          type: "multiple_choice", 
          questions: [
            {
              id: "p2a",
              question: "Which is logically equivalent to P → Q?",
              options: ["¬P ∨ Q", "P ∧ Q", "¬(P ∧ ¬Q)", "Both A and C"],
              correct: 3,
              explanation: "P → Q ≡ ¬P ∨ Q ≡ ¬(P ∧ ¬Q) by definition of conditional and De Morgan's law"
            },
            {
              id: "p2b",
              question: "Which law states that P ∧ Q ≡ Q ∧ P?",
              options: ["Associative", "Commutative", "Distributive", "De Morgan's"],
              correct: 1,
              explanation: "The commutative law allows switching the order of operands"
            },
            {
              id: "p2c",
              question: "The distributive law P ∧ (Q ∨ R) is equivalent to:",
              options: ["(P ∧ Q) ∨ R", "(P ∧ Q) ∨ (P ∧ R)", "P ∧ Q ∧ R", "(P ∨ Q) ∧ (P ∨ R)"],
              correct: 1,
              explanation: "Conjunction distributes over disjunction: P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R)"
            }
          ]
        },
        {
          id: "p3",
          title: "Complex Equivalence Proofs", 
          points: 20,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Show that ¬(P → Q) is equivalent to P ∧ ¬Q",
              answer: "¬(P → Q) ≡ ¬(¬P ∨ Q) ≡ P ∧ ¬Q",
              explanation: "Convert conditional to disjunction, then apply De Morgan's law"
            },
            {
              id: "p3b",
              question: "Prove that (P ↔ Q) ≡ (P → Q) ∧ (Q → P)",
              answer: "(P ↔ Q) ≡ ((P → Q) ∧ (Q → P)) by definition of biconditional",
              explanation: "A biconditional is true when both conditionals are true"
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Homework: Scientific Thinking & Research Methods",
    content: {
      instructions: "Practice applying scientific thinking and research evaluation skills. Focus on understanding how to assess research quality and interpret findings.",
      totalPoints: 80,
      problems: [
        {
          id: "p1",
          title: "Research Design Evaluation",
          points: 30,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "A study claims 'eating chocolate improves test scores' based on comparing students who eat chocolate vs. those who don't. What confounding variables might affect this conclusion?",
              answer: "Study habits, sleep, stress levels, socioeconomic status, overall diet, motivation",
              explanation: "Many factors could explain the difference in test scores besides chocolate consumption."
            },
            {
              id: "p1b",
              question: "What's the difference between correlation and causation? Give an example.",
              answer: "Correlation shows relationship; causation shows one causes the other. Example: Ice cream sales and drowning both increase in summer, but ice cream doesn't cause drowning.",
              explanation: "Correlation doesn't prove causation - there may be third variables or the relationship may be coincidental."
            },
            {
              id: "p1c",
              question: "Why do scientists use control groups in experiments?",
              answer: "To isolate the effect of the variable being tested by comparing to a baseline",
              explanation: "Control groups help determine if observed changes are due to the treatment or other factors."
            },
            {
              id: "p1d",
              question: "What makes a sample representative in research?",
              answer: "It accurately reflects the characteristics of the larger population being studied",
              explanation: "Representative samples allow researchers to generalize findings to the broader population."
            }
          ]
        },
        {
          id: "p2",
          title: "Research Methodology",
          points: 25,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What is the main purpose of a control group in an experiment?",
              options: ["To prove the hypothesis", "To provide a baseline for comparison", "To increase sample size", "To eliminate all variables"],
              correct: 1,
              explanation: "Control groups provide a baseline to determine if observed effects are due to the treatment or other factors."
            },
            {
              id: "p2b",
              question: "Which best describes a double-blind study?",
              options: ["Neither participants nor researchers know who receives treatment", "Only participants don't know", "Only researchers don't know", "Everyone knows the treatment assignments"],
              correct: 0,
              explanation: "Double-blind studies prevent bias by keeping both participants and researchers unaware of treatment assignments."
            },
            {
              id: "p2c",
              question: "What makes a research sample representative?",
              options: ["It's very large", "It accurately reflects the target population", "It includes only volunteers", "It's convenient to access"],
              correct: 1,
              explanation: "Representative samples accurately reflect characteristics of the population being studied."
            }
          ]
        },
        {
          id: "p3",
          title: "Scientific Reasoning",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "A study finds that students who eat breakfast score higher on tests. List three possible confounding variables that could explain this relationship.",
              answer: "Socioeconomic status, sleep patterns, family structure, health consciousness, time management skills",
              explanation: "Many factors beyond breakfast could influence both eating habits and academic performance."
            },
            {
              id: "p3b",
              question: "Explain why anecdotal evidence is generally not considered reliable in scientific reasoning.",
              answer: "It's not systematic, may be biased, lacks controls, and cannot be generalized",
              explanation: "Anecdotal evidence lacks the systematic methodology needed to establish reliable conclusions."
            },
            {
              id: "p3c",
              question: "What's the difference between a hypothesis and a theory in scientific thinking?",
              answer: "A hypothesis is a testable prediction; a theory is a well-supported explanation of phenomena",
              explanation: "Hypotheses are tested to build theories, which are comprehensive explanations supported by evidence."
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Homework: Media Literacy & Information Evaluation",
    content: {
      instructions: "Practice evaluating media sources, identifying bias, and analyzing information quality. Focus on digital literacy and information verification skills.",
      totalPoints: 85,
      problems: [
        {
          id: "p1",
          title: "Source Credibility Assessment",
          points: 35,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "List five criteria you would use to evaluate the credibility of a news website.",
              answer: "Author credentials, publication date, citations/sources, editorial standards, transparency about funding",
              explanation: "Credible sources provide clear authorship, recent information, evidence, and transparency."
            },
            {
              id: "p1b",
              question: "Explain how you would fact-check a viral social media claim about a health topic.",
              answer: "Check original source, consult medical databases, verify with multiple reliable sources, check for peer review",
              explanation: "Health claims require verification through authoritative medical sources and peer-reviewed research."
            },
            {
              id: "p1c",
              question: "What are three warning signs that a source might be unreliable?",
              answer: "Anonymous authorship, lack of citations, sensational language, obvious bias, no contact information",
              explanation: "Unreliable sources often lack transparency, evidence, and professional standards."
            },
            {
              id: "p1d",
              question: "How would you distinguish between an opinion piece and news reporting?",
              answer: "News reporting presents facts objectively; opinion pieces express viewpoints and interpretations",
              explanation: "Understanding this distinction helps readers evaluate information appropriately."
            }
          ]
        },
        {
          id: "p2",
          title: "Bias Recognition",
          points: 25,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "Which best describes confirmation bias?",
              options: ["Seeking information that confirms existing beliefs", "Being overly confident in decisions", "Following the crowd", "Avoiding difficult decisions"],
              correct: 0,
              explanation: "Confirmation bias leads people to seek information that supports their preexisting beliefs."
            },
            {
              id: "p2b",
              question: "What is the best way to minimize selection bias in reporting?",
              options: ["Use larger samples", "Include diverse perspectives", "Focus on recent events", "Use expert opinions only"],
              correct: 1,
              explanation: "Including diverse perspectives helps counteract the bias of selective reporting."
            },
            {
              id: "p2c",
              question: "Which indicates potential bias in a news source?",
              options: ["Citing multiple sources", "Using emotional language", "Providing context", "Including expert quotes"],
              correct: 1,
              explanation: "Emotional language often indicates bias rather than objective reporting."
            }
          ]
        },
        {
          id: "p3",
          title: "Digital Information Literacy",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Describe how you would verify the authenticity of a photograph shared on social media that claims to show a recent news event.",
              answer: "Reverse image search, check metadata, verify location details, cross-reference with news sources",
              explanation: "Visual content requires technical verification methods beyond just source checking."
            },
            {
              id: "p3b",
              question: "What are three ways to identify potentially false information in online articles?",
              answer: "Check publication date, verify claims with authoritative sources, examine author credentials, look for citations",
              explanation: "False information often lacks proper sourcing, credible authorship, or verifiable claims."
            },
            {
              id: "p3c",
              question: "How does algorithmic filtering on social media affect the information we see?",
              answer: "Creates echo chambers, reinforces existing beliefs, prioritizes engagement over accuracy",
              explanation: "Understanding algorithmic bias helps users seek diverse information sources actively."
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Homework: Ethical Reasoning & Moral Arguments",
    content: {
      instructions: "Practice analyzing ethical dilemmas and moral arguments. Focus on understanding different ethical frameworks and applying them to real-world situations.",
      totalPoints: 90,
      problems: [
        {
          id: "p1",
          title: "Ethical Framework Analysis",
          points: 40,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Apply utilitarianism to this dilemma: A self-driving car must choose between hitting one person or swerving to hit three people. What factors would a utilitarian consider?",
              answer: "Total harm/benefit, number of people affected, probability of outcomes, long-term consequences",
              explanation: "Utilitarianism focuses on maximizing overall happiness and minimizing total harm."
            },
            {
              id: "p1b",
              question: "How would a deontological ethics approach the question of lying to protect someone's feelings?",
              answer: "Focus on the inherent rightness/wrongness of lying, regardless of consequences",
              explanation: "Deontological ethics judges actions by their adherence to moral rules, not their outcomes."
            },
            {
              id: "p1c",
              question: "Analyze this situation using virtue ethics: A student finds a wallet with $200 and no ID. What would virtue ethics suggest?",
              answer: "Consider what a virtuous person would do - honesty, integrity, compassion for the owner",
              explanation: "Virtue ethics focuses on character traits and what actions reflect moral virtues."
            },
            {
              id: "p1d",
              question: "Apply the principle of justice to workplace hiring: A company wants to hire the most qualified candidate, but lacks diversity. How should they balance these concerns?",
              answer: "Consider both merit and systemic barriers, ensure fair process, address structural inequalities",
              explanation: "Justice requires both fair procedures and consideration of historical and structural factors."
            }
          ]
        },
        {
          id: "p2",
          title: "Moral Reasoning Principles",
          points: 25,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "The principle of autonomy in ethics emphasizes:",
              options: ["Following society's rules", "Maximizing happiness", "Respecting people's right to make their own decisions", "Achieving the best outcomes"],
              correct: 2,
              explanation: "Autonomy respects individuals' capacity and right to make informed decisions about their own lives."
            },
            {
              id: "p2b",
              question: "What is the main weakness of purely consequentialist ethics?",
              options: ["It ignores outcomes", "It may justify harmful actions if they produce good results", "It's too rigid", "It doesn't consider individuals"],
              correct: 1,
              explanation: "Consequentialism can sometimes justify harmful means if they lead to beneficial ends."
            },
            {
              id: "p2c",
              question: "The 'veil of ignorance' thought experiment is used to:",
              options: ["Test logical validity", "Design fair social systems", "Evaluate consequences", "Determine virtues"],
              correct: 1,
              explanation: "Rawls' veil of ignorance helps design fair institutions by removing knowledge of one's position in society."
            }
          ]
        },
        {
          id: "p3",
          title: "Applied Ethics Cases",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "A pharmaceutical company can sell a life-saving drug at high profit or at cost. Analyze this using both utilitarian and deontological perspectives.",
              answer: "Utilitarian: Consider total welfare, accessibility, incentives for future research. Deontological: Duty to save lives vs. property rights",
              explanation: "Different ethical frameworks can lead to different conclusions about the same situation."
            },
            {
              id: "p3b",
              question: "Should social media companies be required to fact-check content? Consider multiple ethical perspectives.",
              answer: "Balancing free speech rights, harm prevention, corporate responsibility, and democratic values",
              explanation: "Complex ethical issues often involve competing values and require careful consideration of trade-offs."
            },
            {
              id: "p3c",
              question: "Is it ethical for employers to monitor employee social media? What factors should be considered?",
              answer: "Privacy rights, workplace safety, public representation, relevant vs. irrelevant content, proportionality",
              explanation: "Workplace ethics requires balancing employer interests with employee rights and privacy."
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Homework: Creative & Analytical Thinking",
    content: {
      instructions: "Practice applying creative problem-solving techniques and analytical thinking strategies. Focus on innovative approaches and systematic analysis methods.",
      totalPoints: 95,
      problems: [
        {
          id: "p1",
          title: "Creative Problem-Solving Techniques",
          points: 40,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Describe the brainstorming process and explain why judgment should be suspended during idea generation.",
              answer: "Generate many ideas without evaluation, build on others' ideas, suspend criticism to encourage creativity",
              explanation: "Early judgment inhibits creative thinking by making people self-censor potentially valuable ideas."
            },
            {
              id: "p1b",
              question: "Apply the 'Six Thinking Hats' method to evaluate a proposal to implement a four-day work week.",
              answer: "White: facts/data, Red: emotions/feelings, Black: problems/risks, Yellow: benefits, Green: alternatives, Blue: process management",
              explanation: "Different thinking perspectives help explore all aspects of a complex decision systematically."
            },
            {
              id: "p1c",
              question: "Explain how the 'Five Whys' technique helps identify root causes of problems.",
              answer: "Repeatedly asking 'why' (typically 5 times) to dig deeper from symptoms to underlying causes",
              explanation: "Surface problems often have deeper root causes that require systematic exploration to discover."
            },
            {
              id: "p1d",
              question: "Describe lateral thinking and give an example of how it differs from logical thinking.",
              answer: "Lateral thinking seeks alternative approaches and perspectives, not just logical steps forward",
              explanation: "Lateral thinking breaks conventional patterns to find creative solutions that logic alone might miss."
            }
          ]
        },
        {
          id: "p2",
          title: "Analytical Thinking Strategies",
          points: 30,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What is the main purpose of breaking down complex problems into smaller parts?",
              options: ["To make problems seem easier", "To understand relationships and tackle manageable pieces", "To avoid difficult thinking", "To impress others"],
              correct: 1,
              explanation: "Decomposition helps understand problem structure and makes complex issues more manageable."
            },
            {
              id: "p2b",
              question: "When using analytical thinking, what should you do first?",
              options: ["Start solving immediately", "Clearly define the problem", "Look for patterns", "Generate solutions"],
              correct: 1,
              explanation: "Problem definition ensures you're solving the right problem before investing effort in solutions."
            },
            {
              id: "p2c",
              question: "Which best describes systems thinking?",
              options: ["Focusing on individual parts", "Understanding how parts interact within the whole", "Using computer systems", "Following systematic procedures"],
              correct: 1,
              explanation: "Systems thinking considers relationships and interactions between components, not just isolated parts."
            }
          ]
        },
        {
          id: "p3",
          title: "Innovation and Design Thinking",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Explain the difference between divergent and convergent thinking in the creative process.",
              answer: "Divergent: generating many possibilities; Convergent: narrowing down to best solutions",
              explanation: "Creative problem-solving requires both broad exploration and focused selection of ideas."
            },
            {
              id: "p3b",
              question: "Describe how empathy fits into the design thinking process.",
              answer: "Understanding user needs, experiences, and pain points to design meaningful solutions",
              explanation: "Empathy ensures solutions address real human needs rather than assumed problems."
            },
            {
              id: "p3c",
              question: "What is prototyping and why is it valuable in problem-solving?",
              answer: "Creating testable versions of ideas to learn quickly and iterate based on feedback",
              explanation: "Prototyping allows rapid learning and improvement without huge resource investment."
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Homework: Advanced Critical Thinking & Integration",
    content: {
      instructions: "Comprehensive integration of critical thinking skills with advanced applications. This homework synthesizes all course concepts for real-world application.",
      totalPoints: 100,
      problems: [
        {
          id: "p1",
          title: "Critical Thinking Integration",
          points: 35,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Analyze this claim using multiple critical thinking skills: 'Studies show that people who drink coffee live longer.' What questions should you ask?",
              answer: "Source credibility, sample size, control factors, correlation vs causation, study methodology, funding sources",
              explanation: "Complex claims require systematic evaluation using multiple critical thinking tools."
            },
            {
              id: "p1b",
              question: "Apply the RADAR method to evaluate a news article claiming a new miracle weight-loss supplement.",
              answer: "Relevance: health claims; Accuracy: scientific evidence; Depth: comprehensive analysis; Applicability: real-world effectiveness; Reasoning: logical conclusions",
              explanation: "The RADAR method provides systematic evaluation of information quality and reasoning."
            },
            {
              id: "p1c",
              question: "Design a decision-making process for choosing between three job offers, incorporating multiple critical thinking frameworks.",
              answer: "Define criteria, gather information, apply decision matrix, consider ethical implications, test assumptions, plan for uncertainty",
              explanation: "Complex decisions benefit from systematic approaches that integrate multiple thinking strategies."
            },
            {
              id: "p1d",
              question: "Synthesize critical thinking skills to analyze this scenario: A politician claims their policy will solve unemployment based on one successful example.",
              answer: "Examine sample size, generalizability, confounding factors, alternative explanations, long-term effects",
              explanation: "Single examples are insufficient evidence for broad policy claims; systematic analysis is needed."
            }
          ]
        },
        {
          id: "p2",
          title: "Advanced Critical Analysis",
          points: 35,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What distinguishes expert thinking from novice thinking?",
              options: ["Experts know more facts", "Experts recognize patterns and have organized knowledge structures", "Experts think faster", "Experts use more complex reasoning"],
              correct: 1,
              explanation: "Experts have well-organized knowledge that allows pattern recognition and efficient problem-solving."
            },
            {
              id: "p2b",
              question: "In metacognition, what is the most important skill?",
              options: ["Thinking faster", "Monitoring your own thinking process", "Memorizing information", "Following procedures exactly"],
              correct: 1,
              explanation: "Metacognition involves awareness and regulation of one's own thinking processes."
            },
            {
              id: "p2c",
              question: "Which best describes systems thinking?",
              options: ["Breaking problems into parts", "Understanding interconnections and feedback loops", "Using computer systems", "Following systematic procedures"],
              correct: 1,
              explanation: "Systems thinking focuses on relationships, interconnections, and how parts influence the whole."
            },
            {
              id: "p2d",
              question: "What is the main purpose of devil's advocate thinking?",
              options: ["To be negative", "To challenge assumptions and test ideas", "To win arguments", "To confuse discussions"],
              correct: 1,
              explanation: "Devil's advocate thinking deliberately challenges ideas to test their strength and identify weaknesses."
            }
          ]
        },
        {
          id: "p3",
          title: "Real-World Application Synthesis",
          points: 30,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Design a comprehensive critical thinking approach to evaluate whether your company should adopt artificial intelligence for customer service.",
              answer: "Define objectives, research AI capabilities/limitations, analyze costs/benefits, consider ethical implications, pilot test, gather stakeholder input, evaluate risks",
              explanation: "Complex business decisions require systematic evaluation of multiple factors using various critical thinking frameworks."
            },
            {
              id: "p3b",
              question: "You see a viral claim that a common household product causes cancer. Design a step-by-step process to evaluate this claim.",
              answer: "Check original source, examine study methodology, look for peer review, check regulatory agencies, consider dose/exposure, verify with multiple sources",
              explanation: "Health claims require careful verification using scientific thinking and source evaluation skills."
            },
            {
              id: "p3c",
              question: "Apply critical thinking to personal decision-making: How would you decide whether to pursue additional education while working full-time?",
              answer: "Assess goals, evaluate time/financial costs, research program quality, consider opportunity costs, analyze career impact, plan for challenges",
              explanation: "Personal decisions benefit from systematic analysis similar to professional problem-solving approaches."
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeQuizzes = {
  1: {
    title: "Week 1 Practice Quiz: Critical Thinking Foundations",
    content: {
      instructions: "Quiz covering fundamental critical thinking concepts, logical reasoning, and argument analysis. You have unlimited attempts to practice.",
      totalPoints: 40,
      problems: [
        {
          id: "p1",
          title: "Critical Thinking Basics",
          points: 20,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What is the primary goal of critical thinking?",
              options: ["To win arguments", "To evaluate information and make reasoned judgments", "To be critical of everything"],
              correct: 1,
              explanation: "Critical thinking aims to analyze information systematically to make well-reasoned decisions."
            },
            {
              id: "p1b",
              question: "Which best describes an assumption?",
              options: ["A proven fact", "Something taken for granted without proof", "A logical conclusion"],
              correct: 1,
              explanation: "Assumptions are beliefs or ideas we accept without verification."
            },
            {
              id: "p1c",
              question: "What makes an argument strong?",
              options: ["Emotional appeal", "Sound reasoning and good evidence", "Popular support"],
              correct: 1,
              explanation: "Strong arguments combine logical reasoning with reliable evidence."
            },
            {
              id: "p1d",
              question: "Which question helps evaluate credibility?",
              options: ["Who is making the claim?", "Is it popular?", "Does it sound right?"],
              correct: 0,
              explanation: "Source credibility is crucial for evaluating the reliability of information."
            }
          ]
        },
        {
          id: "p2",
          title: "Logical Analysis",
          points: 20,
          type: "text_input",
          questions: [
            {
              id: "p2a",
              question: "What type of reasoning moves from specific observations to general conclusions?",
              answer: "Inductive reasoning",
              explanation: "Inductive reasoning builds general principles from specific examples."
            },
            {
              id: "p2b",
              question: "What is a premise in an argument?",
              answer: "A statement that provides support or evidence for a conclusion",
              explanation: "Premises are the supporting statements that lead to a conclusion in an argument."
            },
            {
              id: "p2c",
              question: "What is the difference between a fact and an opinion?",
              answer: "Facts can be verified objectively; opinions are subjective judgments",
              explanation: "Facts are verifiable statements while opinions reflect personal views or interpretations."
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Quiz: Argument Analysis",
    content: {
      instructions: "Practice quiz focusing on argument evaluation and reasoning skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Argument Structure Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What makes an argument valid?",
              options: ["The premises are true", "The conclusion follows logically from the premises", "It's convincing"],
              correct: 1,
              explanation: "Validity depends on logical structure, not the truth of premises."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Quiz: Decision Making",
    content: {
      instructions: "Practice quiz on decision-making frameworks and problem-solving strategies.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Problem Solving Quiz",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Name three steps in effective decision making.",
              answer: "Define the problem, gather information, evaluate alternatives",
              explanation: "Systematic decision-making follows a structured process."
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Quiz: Research & Evidence",
    content: {
      instructions: "Practice quiz on scientific thinking and research evaluation skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Evidence Evaluation Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What distinguishes correlation from causation?",
              options: ["Correlation proves causation", "Correlation shows relationship but not cause", "They're the same thing"],
              correct: 1,
              explanation: "Correlation indicates relationship but doesn't prove one thing causes another."
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Quiz: Media Literacy",
    content: {
      instructions: "Practice quiz on media evaluation and information literacy skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Source Credibility Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What's most important when evaluating online information?",
              options: ["How recent it is", "Source credibility and evidence quality", "How many shares it has"],
              correct: 1,
              explanation: "Credible sources and quality evidence are fundamental to reliable information."
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Quiz: Ethical Reasoning",
    content: {
      instructions: "Practice quiz on ethical frameworks and moral reasoning skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Ethics Quiz",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What ethical framework focuses on consequences and outcomes?",
              answer: "Utilitarianism",
              explanation: "Utilitarianism judges actions by their consequences and overall benefit."
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Quiz: Creative Thinking",
    content: {
      instructions: "Practice quiz on creative problem-solving and analytical thinking techniques.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Innovation Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What is brainstorming designed to encourage?",
              options: ["Immediate evaluation", "Quantity of ideas without judgment", "Perfect solutions"],
              correct: 1,
              explanation: "Brainstorming emphasizes generating many ideas without early judgment to foster creativity."
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Quiz: Comprehensive Review",
    content: {
      instructions: "Practice quiz integrating all critical thinking skills learned throughout the course.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Integration Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which skill is most important for effective critical thinking?",
              options: ["Memorizing facts", "Questioning assumptions", "Following rules strictly"],
              correct: 1,
              explanation: "Questioning assumptions is fundamental to examining beliefs and evaluating information critically."
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeTests = {
  1: {
    title: "Week 1 Practice Test: Critical Thinking Foundations",
    content: {
      instructions: "Comprehensive practice test covering all Week 1 material: critical thinking concepts, logical reasoning, and argument analysis. Take your time and show your work.",
      totalPoints: 100,
      problems: [
        {
          id: "p1",
          title: "Critical Thinking Fundamentals",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Define critical thinking and explain its main components.",
              answer: "Critical thinking is the objective analysis and evaluation of information to form judgments, involving analysis, interpretation, evaluation, and synthesis",
              explanation: "Critical thinking requires systematic examination of information, reasoning, and evidence to make well-founded decisions."
            },
            {
              id: "p1b",
              question: "What is the difference between an argument and an assertion?",
              answer: "An argument provides reasons (premises) to support a conclusion, while an assertion is simply a statement without supporting evidence",
              explanation: "Arguments have logical structure with supporting evidence, while assertions are unsupported claims."
            },
            {
              id: "p1c",
              question: "Explain what makes a source credible.",
              answer: "Credible sources have expertise, objectivity, currency, accuracy, and transparency about methods and potential conflicts of interest",
              explanation: "Source credibility depends on multiple factors including author qualifications, publication standards, and methodological rigor."
            }
          ]
        },
        {
          id: "p2",
          title: "Argument Analysis",
          points: 35,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What makes an argument logically valid?",
              options: ["The premises are true", "The conclusion follows necessarily from the premises", "It's convincing", "It uses good evidence"],
              correct: 1,
              explanation: "Validity concerns logical structure - whether the conclusion follows necessarily from the premises."
            },
            {
              id: "p2b",
              question: "Which statement about assumptions is correct?",
              options: ["Assumptions are always false", "Assumptions should be identified and examined", "Assumptions don't matter", "Assumptions are the same as facts"],
              correct: 1,
              explanation: "Critical thinking requires identifying and examining our underlying assumptions."
            },
            {
              id: "p2c",
              question: "What is the main difference between deductive and inductive reasoning?",
              options: ["Deductive is always correct", "Deductive moves from general to specific, inductive from specific to general", "They're the same", "Inductive is better"],
              correct: 1,
              explanation: "Deductive reasoning goes from general principles to specific conclusions; inductive goes from specific observations to general principles."
            },
            {
              id: "p2d",
              question: "Which best describes a logical fallacy?",
              options: ["Any mistake in reasoning", "A specific type of flawed reasoning pattern", "An opinion someone disagrees with", "A complex argument"],
              correct: 1,
              explanation: "Logical fallacies are specific, identifiable patterns of flawed reasoning."
            }
          ]
        },
        {
          id: "p3",
          title: "Applied Critical Analysis",
          points: 40,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Analyze this argument: 'All successful people work hard. Sarah works hard. Therefore, Sarah will be successful.' What logical issue exists?",
              answer: "This commits the fallacy of affirming the consequent - just because successful people work hard doesn't mean all hard workers become successful",
              explanation: "The argument incorrectly assumes that if P leads to Q, then Q must lead to P."
            },
            {
              id: "p3b",
              question: "Evaluate this claim: 'Studies show coffee prevents heart disease.' What questions should you ask?",
              answer: "What type of study? Sample size? Control groups? Funding source? How much coffee? Other lifestyle factors?",
              explanation: "Scientific claims require examination of methodology, sample characteristics, and potential confounding variables."
            },
            {
              id: "p3c",
              question: "Identify the bias in: 'Everyone knows that brand X is the best phone because it's the most popular.' What makes this reasoning flawed?",
              answer: "This shows appeal to popularity (bandwagon fallacy) - popularity doesn't necessarily indicate quality or superiority",
              explanation: "The argument assumes that popular opinion equals objective truth or quality."
            },
            {
              id: "p3d",
              question: "What's problematic about this reasoning: 'We should ban violent video games because they might cause aggressive behavior in some people.'",
              answer: "This relies on weak causal claims ('might cause') and doesn't consider evidence, alternative causes, or proportionality of response",
              explanation: "Strong policy decisions require strong evidence, not mere possibilities or correlations."
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Test: Argument Structure",
    content: {
      instructions: "Practice test focusing on argument analysis and logical reasoning skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Reasoning Skills Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What are the three main components of a strong argument?",
              answer: "Clear premises, logical structure, and a well-supported conclusion",
              explanation: "Strong arguments have good evidence (premises), valid logical connections, and conclusions that follow from the evidence."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Test: Decision Making",
    content: {
      instructions: "Practice test on decision-making frameworks and problem-solving strategies.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Problem Solving Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Name and explain three key steps in effective problem-solving.",
              answer: "1) Define the problem clearly, 2) Generate and evaluate alternatives, 3) Implement and monitor the solution",
              explanation: "Systematic problem-solving requires clear problem definition, thorough option evaluation, and follow-through."
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Test: Research & Evidence",
    content: {
      instructions: "Practice test on scientific thinking and research evaluation skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Evidence Analysis Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Explain the difference between correlation and causation with an example.",
              answer: "Correlation shows relationship but not cause. Example: Ice cream sales and drowning deaths both increase in summer, but ice cream doesn't cause drowning - both are caused by warm weather",
              explanation: "Understanding this distinction is crucial for evaluating scientific claims and research findings."
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Test: Media Literacy",
    content: {
      instructions: "Practice test on media evaluation and information literacy skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Information Analysis Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What are three key factors to consider when evaluating the credibility of an online source?",
              answer: "Author expertise and credentials, publication date and currency, evidence quality and citations",
              explanation: "Credible online sources require verification of author qualifications, current information, and supporting evidence."
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Test: Ethical Reasoning",
    content: {
      instructions: "Practice test on ethical frameworks and moral reasoning skills.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Ethics Application Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Compare how utilitarian and deontological ethics would approach the trolley problem.",
              answer: "Utilitarian: Pull lever to save five lives (greatest good). Deontological: Don't pull lever because using someone as means to an end is wrong regardless of consequences",
              explanation: "Different ethical frameworks can lead to different conclusions about the same moral dilemma."
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Test: Creative Thinking",
    content: {
      instructions: "Practice test on creative problem-solving and analytical thinking techniques.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Innovation Skills Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Describe the difference between divergent and convergent thinking and when each is most useful.",
              answer: "Divergent thinking generates many creative possibilities (brainstorming phase). Convergent thinking narrows down to best solutions (evaluation phase). Use divergent first, then convergent.",
              explanation: "Effective creative problem-solving requires both broad idea generation and focused solution selection."
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Test: Comprehensive Integration",
    content: {
      instructions: "Practice test integrating all critical thinking skills learned throughout the course.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Critical Thinking Integration Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Design a comprehensive approach to evaluate a complex real-world claim that combines multiple critical thinking skills.",
              answer: "1) Identify assumptions and biases, 2) Evaluate source credibility, 3) Examine evidence quality, 4) Consider alternative explanations, 5) Check for logical fallacies, 6) Apply relevant ethical frameworks",
              explanation: "Complex claims require systematic evaluation using multiple critical thinking tools and frameworks."
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeExams = {
  midterm: {
    title: "Midterm Practice Exam: Critical Thinking Integration",
    content: {
      instructions: "Practice midterm exam covering the first half of critical thinking concepts and skills. You have unlimited attempts to practice.",
      totalPoints: 100,
      problems: [
        {
          id: "p1",
          title: "Critical Thinking Foundations",
          points: 40,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which is the most fundamental skill in critical thinking?",
              options: ["Memorizing facts", "Questioning assumptions", "Following procedures"],
              correct: 1,
              explanation: "Questioning assumptions is the foundation of all critical thinking - it opens the door to examining beliefs and evaluating information objectively."
            },
            {
              id: "p1b",
              question: "What is the primary purpose of evaluating evidence?",
              options: ["To prove you are right", "To determine reliability and relevance", "To find supporting information only"],
              correct: 1,
              explanation: "Evidence evaluation focuses on assessing the quality, reliability, and relevance of information to make informed judgments."
            },
            {
              id: "p1c",
              question: "Which best describes confirmation bias?",
              options: ["Seeking information that confirms existing beliefs", "Testing all possibilities equally", "Changing beliefs based on evidence"],
              correct: 0,
              explanation: "Confirmation bias is the tendency to search for and interpret information in ways that confirm pre-existing beliefs."
            },
            {
              id: "p1d",
              question: "What makes an argument logically valid?",
              options: ["The premises are true", "The conclusion follows logically from premises", "It is persuasive"],
              correct: 1,
              explanation: "Logical validity means the conclusion follows necessarily from the premises, regardless of whether the premises are actually true."
            }
          ]
        },
        {
          id: "p2",
          title: "Argument Analysis",
          points: 30,
          type: "text_input",
          questions: [
            {
              id: "p2a",
              question: "Identify the premise and conclusion in this argument: 'All students who study regularly pass their exams. Maria studies regularly. Therefore, Maria will pass her exam.'",
              answer: "Premises: 1) All students who study regularly pass their exams, 2) Maria studies regularly. Conclusion: Maria will pass her exam.",
              explanation: "The premises provide the supporting evidence, while the conclusion is what the argument aims to establish."
            },
            {
              id: "p2b",
              question: "What type of fallacy is this: 'Either we ban all cars or accept total environmental destruction'?",
              answer: "False dilemma (false dichotomy)",
              explanation: "This presents only two extreme options when many other alternatives exist, such as improving car efficiency or using alternative transportation."
            },
            {
              id: "p2c",
              question: "Explain why ad hominem attacks weaken arguments.",
              answer: "Ad hominem attacks target the person making the argument rather than the argument itself, which is irrelevant to the truth or validity of the claims being made.",
              explanation: "Personal attacks distract from the actual issues and fail to address the logical merit of the argument."
            }
          ]
        },
        {
          id: "p3",
          title: "Evidence and Decision Making",
          points: 30,
          type: "multiple_choice",
          questions: [
            {
              id: "p3a",
              question: "What is the difference between correlation and causation?",
              options: ["There is no difference", "Correlation shows relationship; causation shows cause-effect", "Causation is stronger correlation"],
              correct: 1,
              explanation: "Correlation indicates variables change together, but causation means one variable directly causes changes in another."
            },
            {
              id: "p3b",
              question: "Which is the best approach to evaluating conflicting expert opinions?",
              options: ["Choose the most famous expert", "Examine their evidence and reasoning", "Go with the majority opinion"],
              correct: 1,
              explanation: "The quality of evidence and reasoning matters more than credentials or popularity when evaluating expert claims."
            },
            {
              id: "p3c",
              question: "What makes a source credible?",
              options: ["It agrees with your views", "Author expertise, evidence quality, and peer review", "It is published online"],
              correct: 1,
              explanation: "Credible sources combine qualified authors, high-quality evidence, and rigorous review processes."
            }
          ]
        }
      ]
    }
  },
  final: {
    title: "Final Practice Exam: Comprehensive Critical Thinking",
    content: {
      instructions: "Comprehensive practice final exam covering all critical thinking skills from Weeks 1-6. Test your mastery of argument analysis, evidence evaluation, logical reasoning, bias detection, and decision-making processes.",
      totalPoints: 200,
      problems: [
        {
          id: "section1",
          title: "Critical Thinking Foundations (50 points)",
          points: 50,
          type: "text_input",
          questions: [
            {
              id: "q1",
              question: "A company CEO claims that increasing employee salaries by 15% will result in a 30% boost in productivity. Identify and analyze the logical assumptions underlying this claim. What evidence would you need to evaluate its validity?",
              answer: "",
              explanation: "Strong responses should identify assumptions about motivation-productivity relationships, consider confounding variables, and specify measurable evidence needed."
            },
            {
              id: "q2", 
              question: "Evaluate this argument: 'Since 90% of successful entrepreneurs dropped out of college, students should drop out to become successful.' Identify the logical fallacies and explain why this reasoning is flawed.",
              answer: "",
              explanation: "Should identify hasty generalization, survivorship bias, and correlation vs causation issues."
            },
            {
              id: "q3",
              question: "A medical study reports that people who drink coffee daily have 25% lower rates of depression. What are three alternative explanations for this correlation that don't involve coffee causing reduced depression?",
              answer: "",
              explanation: "Strong answers include reverse causation, confounding variables (lifestyle, socioeconomic factors), and sample selection bias."
            }
          ]
        },
        {
          id: "section2", 
          title: "Argument Analysis and Evidence Evaluation (50 points)",
          points: 50,
          type: "text_input",
          questions: [
            {
              id: "q4",
              question: "A politician argues: 'Crime rates have dropped 20% since we implemented stricter gun laws. Therefore, gun control reduces crime.' Analyze the strength of this argument and identify what additional information would be needed to properly evaluate the causal claim.",
              answer: "",
              explanation: "Should address post hoc fallacy, need for control comparisons, other contributing factors, and temporal analysis requirements."
            },
            {
              id: "q5",
              question: "You're presented with a research study claiming that meditation reduces anxiety by 40%. The study involved 50 participants over 4 weeks. Critically evaluate the reliability of this research and identify at least three methodological concerns.",
              answer: "",
              explanation: "Strong responses address sample size, duration, control groups, measurement methods, and potential placebo effects."
            },
            {
              id: "q6",
              question: "A marketing campaign states: '9 out of 10 doctors recommend our vitamin supplement.' What questions would you ask to evaluate this claim before accepting it as credible evidence?",
              answer: "",
              explanation: "Should question sample selection, survey methodology, potential conflicts of interest, and definition of 'recommend.'"
            }
          ]
        },
        {
          id: "section3",
          title: "Bias Detection and Media Analysis (50 points)", 
          points: 50,
          type: "text_input",
          questions: [
            {
              id: "q7",
              question: "A news headline reads: 'SHOCKING: Local School Test Scores Plummet 15%!' Upon reading, you discover scores dropped from 85% to 82%. Identify the bias techniques used and explain how they might mislead readers.",
              answer: "",
              explanation: "Should identify sensationalism, misleading math presentation, lack of context, and emotional manipulation techniques."
            },
            {
              id: "q8",
              question: "You're evaluating job candidates and notice you consistently rate candidates from your alma mater higher. What type of bias is this, and what strategies would you implement to make more objective hiring decisions?",
              answer: "",
              explanation: "Should identify affinity bias and propose structured evaluation criteria, diverse review panels, and blind resume reviews."
            },
            {
              id: "q9",
              question: "A social media post claims: 'Organic foods are proven healthier - just look at how much better I feel since switching!' Identify the logical problems with this reasoning and explain why personal anecdotes aren't reliable evidence.",
              answer: "",
              explanation: "Should address anecdotal evidence limitations, placebo effects, confirmation bias, and need for controlled studies."
            }
          ]
        },
        {
          id: "section4",
          title: "Decision-Making and Problem-Solving Integration (50 points)",
          points: 50,
          type: "text_input",
          questions: [
            {
              id: "q10",
              question: "Your company must choose between two software solutions. Solution A costs $50,000 with proven results. Solution B costs $25,000 but is newer with limited data. Using critical thinking principles, outline your decision-making process and key evaluation criteria.",
              answer: "",
              explanation: "Strong responses should include risk assessment, cost-benefit analysis, evidence requirements, pilot testing considerations, and long-term implications."
            },
            {
              id: "q11",
              question: "You encounter conflicting expert opinions about climate change solutions. Expert A advocates for renewable energy, Expert B for nuclear power, both citing scientific studies. How would you approach evaluating these competing claims to form your own informed opinion?",
              answer: "",
              explanation: "Should address source credibility, examining methodologies, looking for consensus, identifying potential biases, and seeking additional perspectives."
            },
            {
              id: "q12",
              question: "Synthesize your learning: Describe a real situation from your life where you initially made a judgment based on limited information, but later changed your view after applying critical thinking skills. What specific critical thinking principles helped you reassess the situation?",
              answer: "",
              explanation: "Personal reflection demonstrating application of course concepts - evidence gathering, bias recognition, alternative perspectives, and logical reasoning."
            }
          ]
        }
      ]
    }
  }
};