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
    title: "Week 1 Practice Homework: One Question Test",
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Translation",
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
    title: "Week 2 Practice Homework: One Question Test", 
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Proposition Recognition",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which of the following is a proposition?",
              options: ["What time is it?", "The sky is blue", "Please sit down"],
              correct: 1,
              explanation: "'The sky is blue' is a proposition because it can be either true or false."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Homework: One Question Test",
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Boolean Simplification",
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
    title: "Week 4 Practice Homework: One Question Test",
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Quantifier Logic",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'All students are smart' using S(x) for student, M(x) for smart",
              answer: "∀x(S(x) → M(x))",
              explanation: "Universal quantification with conditional: for all x, if x is a student then x is smart."
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Homework: One Question Test",
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Predicate Logic",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'Some dogs are friendly' using D(x) for dog, F(x) for friendly",
              answer: "∃x(D(x) ∧ F(x))",
              explanation: "Existential quantification with conjunction: there exists an x such that x is a dog and x is friendly."
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Homework: One Question Test",
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Complex Translation",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'No cats are dogs' using C(x) for cat, D(x) for dog",
              answer: "∀x(C(x) → ¬D(x))",
              explanation: "Universal negative: for all x, if x is a cat then x is not a dog."
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Homework: One Question Test",
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Modal Logic",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What does □P mean in modal logic?",
              answer: "P is necessarily true",
              explanation: "The box symbol □ represents necessity in modal logic."
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Homework: One Question Test",
    content: {
      instructions: "Practice homework with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Advanced Logic",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the difference between first-order and second-order logic?",
              answer: "Second-order logic can quantify over predicates and relations",
              explanation: "Second-order logic extends first-order logic by allowing quantification over predicates, not just individuals."
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeQuizzes = {
  1: {
    title: "Week 1 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Basic Logic Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What is the symbol for conjunction?",
              options: ["∨", "∧", "→"],
              correct: 1,
              explanation: "∧ is the symbol for conjunction (and)."
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Truth Tables Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "When is P → Q false?",
              options: ["When P is false", "When Q is false", "When P is true and Q is false"],
              correct: 2,
              explanation: "A conditional is false only when the antecedent is true and the consequent is false."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Boolean Algebra Quiz",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the result of P ∨ ¬P?",
              answer: "True",
              explanation: "P ∨ ¬P is always true (law of excluded middle)."
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Quantifiers Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What does ∀ mean?",
              options: ["There exists", "For all", "If and only if"],
              correct: 1,
              explanation: "∀ is the universal quantifier meaning 'for all'."
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Predicate Logic Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What does ∃ mean?",
              options: ["For all", "There exists", "Necessarily"],
              correct: 1,
              explanation: "∃ is the existential quantifier meaning 'there exists'."
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Advanced Logic Quiz",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is proof by contradiction also called?",
              answer: "Reductio ad absurdum",
              explanation: "Proof by contradiction is also known as reductio ad absurdum."
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Modal Logic Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What does ◊P mean?",
              options: ["P is necessary", "P is possible", "P is true"],
              correct: 1,
              explanation: "◊ is the possibility operator in modal logic."
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Quiz: One Question Test",
    content: {
      instructions: "Practice quiz with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Review Quiz",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which is NOT a logical operator?",
              options: ["∧", "∨", "√"],
              correct: 2,
              explanation: "√ is a mathematical symbol, not a logical operator."
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeTests = {
  1: {
    title: "Week 1 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
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
              question: "Define what a proposition is in logic.",
              answer: "A statement that is either true or false",
              explanation: "A proposition is a declarative statement that has exactly one truth value."
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Truth Tables Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "How many rows are needed for a truth table with 3 variables?",
              answer: "8",
              explanation: "With n variables, you need 2^n rows. For 3 variables: 2^3 = 8 rows."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Boolean Algebra Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is De Morgan's Law for negation of conjunction?",
              answer: "¬(P ∧ Q) = ¬P ∨ ¬Q",
              explanation: "De Morgan's Law states that the negation of a conjunction equals the disjunction of the negations."
            }
          ]
        }
      ]
    }
  },
  4: {
    title: "Week 4 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Quantifier Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the negation of ∀x P(x)?",
              answer: "∃x ¬P(x)",
              explanation: "The negation of 'for all x, P(x)' is 'there exists an x such that not P(x)'."
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Predicate Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the difference between a predicate and a proposition?",
              answer: "A predicate contains variables and becomes a proposition when variables are bound",
              explanation: "Predicates are functions of variables that become propositions when the variables are quantified or assigned values."
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Advanced Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the principle of explosion in logic?",
              answer: "From a contradiction, anything follows",
              explanation: "The principle of explosion states that from a contradiction (P ∧ ¬P), any statement can be derived."
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Modal Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is the modal logic formula for 'P is possibly necessary'?",
              answer: "◊□P",
              explanation: "◊□P means it is possible that P is necessary."
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Test: One Question Test",
    content: {
      instructions: "Practice test with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Comprehensive Review Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What is soundness in logical systems?",
              answer: "All provable statements are true",
              explanation: "A logical system is sound if every theorem (provable statement) is also a tautology (always true)."
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeExams = {
  midterm: {
    title: "Midterm Practice Exam: One Question Test",
    content: {
      instructions: "Practice midterm with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Midterm Logic Test",
          points: 10,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which is the most fundamental concept in logic?",
              options: ["Proposition", "Argument", "Syllogism"],
              correct: 0,
              explanation: "Propositions are the basic building blocks of all logical reasoning."
            }
          ]
        }
      ]
    }
  },
  final: {
    title: "Final Practice Exam: One Question Test",
    content: {
      instructions: "Practice final with one question to test the system.",
      totalPoints: 10,
      problems: [
        {
          id: "p1",
          title: "Final Logic Test",
          points: 10,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "What are the main branches of symbolic logic?",
              answer: "Propositional logic and predicate logic",
              explanation: "These are the two fundamental branches that form the foundation of symbolic logic."
            }
          ]
        }
      ]
    }
  }
};