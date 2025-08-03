// Pre-existing course content to avoid waiting for AI generation

export const presetLectures = {
  1: {
    title: "Week 1: Basic Concepts, Notation, and Logical Operators",
    content: `<h2>Week 1: Basic Concepts, Notation, and Logical Operators</h2>

<h3>Overview</h3>
<p>Welcome to symbolic logic! This week introduces the fundamental building blocks of logical reasoning and formal notation systems.</p>

<h3>Key Concepts</h3>

<h4>1. Propositions and Truth Values</h4>
<ul>
<li>A <strong>proposition</strong> is a statement that is either true or false</li>
<li>Examples: "It is raining" (can be true or false)</li>
<li>Non-examples: "What time is it?" (questions aren't propositions)</li>
</ul>

<h4>2. Basic Logical Operators</h4>

<h5>Negation (¬)</h5>
<ul>
<li>Symbol: ¬ or ~</li>
<li>Meaning: "not"</li>
<li>Example: ¬P means "not P"</li>
</ul>

<h5>Conjunction (∧)</h5>
<ul>
<li>Symbol: ∧</li>
<li>Meaning: "and"</li>
<li>Example: P ∧ Q means "P and Q"</li>
<li>True only when both P and Q are true</li>
</ul>

<h5>Disjunction (∨)</h5>
<ul>
<li>Symbol: ∨</li>
<li>Meaning: "or" (inclusive or)</li>
<li>Example: P ∨ Q means "P or Q (or both)"</li>
<li>False only when both P and Q are false</li>
</ul>

<h5>Conditional (→)</h5>
<ul>
<li>Symbol: → or ⊃</li>
<li>Meaning: "if...then"</li>
<li>Example: P → Q means "if P then Q"</li>
<li>False only when P is true and Q is false</li>
</ul>

<h5>Biconditional (↔)</h5>
<ul>
<li>Symbol: ↔ or ≡</li>
<li>Meaning: "if and only if"</li>
<li>Example: P ↔ Q means "P if and only if Q"</li>
<li>True when P and Q have the same truth value</li>
</ul>

<h4>3. Truth Tables</h4>
<p>Truth tables show all possible truth value combinations for logical formulas.</p>

<h3>Practice Problems</h3>
<ol>
<li>Translate: "If it rains, then the ground is wet"</li>
<li>Create a truth table for: P ∧ (Q ∨ ¬R)</li>
<li>Determine when (P → Q) ∧ (Q → R) is true</li>
</ol>

<h3>Next Week Preview</h3>
<p>We'll explore more complex formulas and introduce quantifiers (∀, ∃).</p>`
  }
};

export const presetPracticeHomework = {
  1: {
    title: "Week 1 Practice Homework: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'If it rains, then the ground is wet' using P for rain and Q for wet ground.",
              answer: "P → Q",
              explanation: "This is a conditional statement: if P then Q."
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Homework: Test Version", 
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Is 'The sky is blue' a proposition?",
              options: ["Yes, it's true", "Yes, it's false", "No, it's not a proposition"],
              correct: 0,
              explanation: "This is a proposition because it can be either true or false."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Homework: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Simplify: P ∧ (P ∨ Q)",
              answer: "P",
              explanation: "By absorption law: P ∧ (P ∨ Q) = P"
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Homework: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'All students are smart' using S(x) for student, M(x) for smart",
              answer: "∀x(S(x) → M(x))",
              explanation: "Universal quantification with conditional"
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Homework: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What rule of inference: P → Q, P ∴ Q",
              answer: "Modus Ponens",
              explanation: "Classic rule: if P implies Q and P is true, then Q is true"
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Homework: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What type of statement is P ∨ ¬P?",
              options: ["Tautology", "Contradiction", "Contingency"],
              correct: 0,
              explanation: "Always true, so it's a tautology"
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Homework: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Express 'It is possible that P' in modal logic",
              answer: "◊P",
              explanation: "Diamond symbol represents possibility in modal logic"
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Homework: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test", 
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which is a valid inference rule?",
              options: ["Modus Ponens", "Affirming Consequent", "Denying Antecedent"],
              correct: 0,
              explanation: "Modus Ponens is valid, the others are fallacies"
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeQuizzes = {
  1: {
    title: "Week 1 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which symbol represents 'and'?",
              options: ["∧", "∨", "→"],
              correct: 0,
              explanation: "∧ is the symbol for logical conjunction (and)"
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is ¬(P ∧ Q) equivalent to?",
              answer: "¬P ∨ ¬Q",
              explanation: "De Morgan's law: negation distributes over conjunction"
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1", 
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What is the absorption law?",
              options: ["P ∧ (P ∨ Q) = P", "P ∨ (P ∧ Q) = Q", "P ∧ Q = Q ∧ P"],
              correct: 0,
              explanation: "Absorption: P ∧ (P ∨ Q) = P"
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What does ∀x P(x) mean?",
              answer: "For all x, P(x) is true",
              explanation: "Universal quantifier means the property holds for all elements"
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.", 
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which is NOT a valid rule of inference?",
              options: ["Modus Ponens", "Modus Tollens", "Affirming Consequent"],
              correct: 2,
              explanation: "Affirming the consequent is a logical fallacy, not valid"
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What does □P mean in modal logic?",
              answer: "P is necessarily true",
              explanation: "Box symbol represents necessity in modal logic"
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "In temporal logic, what does Gp mean?",
              options: ["p is always true", "p is sometimes true", "p was true"],
              correct: 0,
              explanation: "G (globally) means the proposition is always true"
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Quiz: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the main goal of automated theorem proving?",
              answer: "Prove theorems using computer algorithms",
              explanation: "Automated theorem proving uses algorithms to establish mathematical truths"
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeTests = {
  1: {
    title: "Week 1 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Define what makes a statement a proposition",
              answer: "A statement that is either true or false",
              explanation: "Propositions are declarative statements with definite truth values"
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "When is P → Q false?",
              options: ["When P is true and Q is false", "When P is false and Q is true", "When both are false"],
              correct: 0,
              explanation: "Conditional is false only when antecedent is true and consequent is false"
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Apply absorption law to simplify: P ∧ (P ∨ Q)",
              answer: "P",
              explanation: "Absorption law: P ∧ (P ∨ Q) = P"
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What does ∃x P(x) mean?",
              options: ["For all x, P(x)", "For some x, P(x)", "For no x, P(x)"],
              correct: 1,
              explanation: "Existential quantifier means there exists some x for which P(x) is true"
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the contrapositive of P → Q?",
              answer: "¬Q → ¬P",
              explanation: "Contrapositive switches and negates both parts"
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "In three-valued logic, what represents unknown?",
              options: ["T", "F", "U"],
              correct: 2,
              explanation: "U represents unknown/undefined in three-valued logic systems"
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What does Fp mean in temporal logic?",
              answer: "p will be true in the future",
              explanation: "F (future) operator means the proposition will hold at some future time"
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Test: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What is the key benefit of automated reasoning?",
              options: ["Speed", "Accuracy", "Both speed and accuracy"],
              correct: 2,
              explanation: "Automated reasoning provides both speed and accuracy advantages"
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeExams = {
  midterm: {
    title: "Midterm Practice Exam: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which is the most fundamental concept in logic?",
              options: ["Proposition", "Argument", "Syllogism"],
              correct: 0,
              explanation: "Propositions are the basic building blocks of all logical reasoning"
            }
          ]
        }
      ]
    }
  },
  final: {
    title: "Final Practice Exam: Test Version",
    content: {
      instructions: "Single question test version for app testing.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What are the main branches of symbolic logic?",
              answer: "Propositional logic and predicate logic",
              explanation: "These are the two fundamental branches that form the foundation of symbolic logic"
            }
          ]
        }
      ]
    }
  }
};