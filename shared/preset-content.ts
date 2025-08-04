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
    title: "Week 1 Practice Homework: Basic Concepts & Operators",
    content: {
      instructions: "Practice translating statements into symbolic logic and working with basic logical operators. Take your time and use the logic symbol keyboard when needed.",
      totalPoints: 50,
      problems: [
        {
          id: "p1",
          title: "Statement Translation",
          points: 20,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'If it rains, then the ground is wet' using P for rain and Q for wet ground.",
              answer: "P → Q",
              explanation: "This is a conditional statement: if P then Q."
            },
            {
              id: "p1b",
              question: "Translate: 'Either John is tall or Mary is short' using J for 'John is tall' and M for 'Mary is short'.",
              answer: "J ∨ M",
              explanation: "This is a disjunction: J or M (or both)."
            },
            {
              id: "p1c",
              question: "Translate: 'It is not the case that both the sun is shining and it is raining' using S for sun shining and R for raining.",
              answer: "¬(S ∧ R)",
              explanation: "This negates the conjunction of S and R."
            }
          ]
        },
        {
          id: "p2",
          title: "Logical Operators",
          points: 15,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What is the truth value of P ∧ Q when P is true and Q is false?",
              options: ["True", "False", "Cannot be determined"],
              correct: 1,
              explanation: "A conjunction is true only when both operands are true."
            },
            {
              id: "p2b",
              question: "When is P → Q false?",
              options: ["When P is false", "When Q is false", "When P is true and Q is false", "Never"],
              correct: 2,
              explanation: "A conditional is false only when the antecedent is true and the consequent is false."
            }
          ]
        },
        {
          id: "p3",
          title: "Complex Expressions",
          points: 15,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Translate: 'If John studies hard, then he will pass the exam, but if he doesn't study, he will fail' using S for studies hard, P for passes exam, F for fails.",
              answer: "(S → P) ∧ (¬S → F)",
              explanation: "This combines two conditionals with conjunction."
            },
            {
              id: "p3b",
              question: "What is the negation of P ∨ Q?",
              answer: "¬P ∧ ¬Q",
              explanation: "By De Morgan's law, ¬(P ∨ Q) = ¬P ∧ ¬Q."
            }
          ]
        }
      ]
    }
  },
  2: {
    title: "Week 2 Practice Homework: Truth Tables & Propositions", 
    content: {
      instructions: "Practice creating truth tables and working with propositional logic. Focus on understanding when complex statements are true or false.",
      totalPoints: 60,
      problems: [
        {
          id: "p1",
          title: "Proposition Recognition",
          points: 15,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "Which of the following is a proposition?",
              options: ["What time is it?", "The sky is blue", "Please sit down"],
              correct: 1,
              explanation: "'The sky is blue' is a proposition because it can be either true or false."
            },
            {
              id: "p1b",
              question: "Which statement is NOT a proposition?",
              options: ["2 + 2 = 4", "Close the door!", "Paris is in France"],
              correct: 1,
              explanation: "Commands are not propositions because they cannot be true or false."
            },
            {
              id: "p1c",
              question: "A proposition must be:",
              options: ["Always true", "Always false", "Either true or false", "Neither true nor false"],
              correct: 2,
              explanation: "By definition, a proposition has exactly one truth value: either true or false."
            }
          ]
        },
        {
          id: "p2",
          title: "Truth Table Construction",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p2a",
              question: "How many rows are needed for a truth table with 2 variables P and Q?",
              answer: "4",
              explanation: "With n variables, you need 2^n rows. For 2 variables: 2^2 = 4 rows."
            },
            {
              id: "p2b",
              question: "In a truth table for P ∧ Q, in how many rows is the result true?",
              answer: "1",
              explanation: "P ∧ Q is true only when both P and Q are true, which occurs in exactly 1 row."
            },
            {
              id: "p2c",
              question: "For the formula P → (Q ∨ R), how many variables are there?",
              answer: "3",
              explanation: "The variables are P, Q, and R, so there are 3 variables total."
            }
          ]
        },
        {
          id: "p3",
          title: "Complex Truth Conditions",
          points: 20,
          type: "multiple_choice",
          questions: [
            {
              id: "p3a",
              question: "When is (P ∨ Q) ∧ ¬P true?",
              options: ["When P is true", "When Q is true and P is false", "When both P and Q are true", "Never"],
              correct: 1,
              explanation: "For the conjunction to be true, both parts must be true: Q must be true (making P ∨ Q true) and P must be false (making ¬P true)."
            },
            {
              id: "p3b",
              question: "The biconditional P ↔ Q is true when:",
              options: ["P and Q have the same truth value", "P and Q have different truth values", "P is true", "Q is false"],
              correct: 0,
              explanation: "A biconditional is true when both sides have the same truth value (both true or both false)."
            }
          ]
        }
      ]
    }
  },
  3: {
    title: "Week 3 Practice Homework: Boolean Algebra & Equivalences",
    content: {
      instructions: "Practice applying Boolean algebra laws and determining logical equivalences. Focus on simplifying complex expressions and proving equivalences.",
      totalPoints: 75,
      problems: [
        {
          id: "p1", 
          title: "Boolean Simplification",
          points: 30,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Simplify: P ∧ (P ∨ Q)",
              answer: "P",
              explanation: "By absorption law: P ∧ (P ∨ Q) = P"
            },
            {
              id: "p1b", 
              question: "Simplify: (P ∨ Q) ∧ (P ∨ ¬Q)",
              answer: "P",
              explanation: "Factor out P: P ∨ (Q ∧ ¬Q) = P ∨ F = P"
            },
            {
              id: "p1c",
              question: "Simplify: ¬(¬P ∧ Q) ∨ (P ∧ ¬Q)",
              answer: "P ∨ ¬Q",
              explanation: "Apply De Morgan's: (P ∨ ¬Q) ∨ (P ∧ ¬Q) = P ∨ ¬Q by absorption"
            },
            {
              id: "p1d",
              question: "What is P ∨ ¬P equal to?",
              answer: "T",
              explanation: "This is the law of excluded middle - always true (tautology)"
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
    title: "Week 4 Practice Homework: Quantifier Logic & Predicates",
    content: {
      instructions: "Practice translating statements with quantifiers and working with predicate logic. Focus on understanding the difference between universal and existential quantification.",
      totalPoints: 80,
      problems: [
        {
          id: "p1",
          title: "Basic Quantifier Translation",
          points: 30,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'All students are smart' using S(x) for student, M(x) for smart",
              answer: "∀x(S(x) → M(x))",
              explanation: "Universal quantification with conditional: for all x, if x is a student then x is smart."
            },
            {
              id: "p1b",
              question: "Translate: 'Some dogs are friendly' using D(x) for dog, F(x) for friendly",
              answer: "∃x(D(x) ∧ F(x))",
              explanation: "Existential quantification with conjunction: there exists an x such that x is a dog and x is friendly."
            },
            {
              id: "p1c",
              question: "Translate: 'No cats are dogs' using C(x) for cat, D(x) for dog",
              answer: "¬∃x(C(x) ∧ D(x))",
              explanation: "Negated existential: there does not exist an x that is both a cat and a dog."
            },
            {
              id: "p1d",
              question: "Translate: 'Not all birds can fly' using B(x) for bird, F(x) for can fly",
              answer: "¬∀x(B(x) → F(x))",
              explanation: "Negated universal: it is not the case that all birds can fly."
            }
          ]
        },
        {
          id: "p2",
          title: "Quantifier Equivalences",
          points: 25,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What is ¬∀x P(x) equivalent to?",
              options: ["∀x ¬P(x)", "∃x ¬P(x)", "¬∃x P(x)", "∃x P(x)"],
              correct: 1,
              explanation: "¬∀x P(x) ≡ ∃x ¬P(x) by quantifier negation rules."
            },
            {
              id: "p2b",
              question: "What is ¬∃x P(x) equivalent to?",
              options: ["∃x ¬P(x)", "∀x ¬P(x)", "¬∀x P(x)", "∀x P(x)"],
              correct: 1,
              explanation: "¬∃x P(x) ≡ ∀x ¬P(x) by quantifier negation rules."
            },
            {
              id: "p2c",
              question: "The statement 'Everyone loves someone' is:",
              options: ["∀x ∃y L(x,y)", "∃x ∀y L(x,y)", "∀x ∀y L(x,y)", "∃x ∃y L(x,y)"],
              correct: 0,
              explanation: "For every person x, there exists someone y that x loves."
            }
          ]
        },
        {
          id: "p3",
          title: "Complex Predicate Statements",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Translate: 'Every student who studies logic loves puzzles' using S(x) for student, L(x) for studies logic, P(x) for loves puzzles",
              answer: "∀x((S(x) ∧ L(x)) → P(x))",
              explanation: "Universal quantification over students who study logic, then conditional to loving puzzles."
            },
            {
              id: "p3b",
              question: "Translate: 'There is a student who loves logic but doesn't love puzzles' using S(x), L(x), P(x) as above",
              answer: "∃x(S(x) ∧ L(x) ∧ ¬P(x))",
              explanation: "Existential statement: there exists a student who studies logic and doesn't love puzzles."
            },
            {
              id: "p3c",
              question: "What is the negation of ∀x(S(x) → L(x))?",
              answer: "∃x(S(x) ∧ ¬L(x))",
              explanation: "¬∀x(S(x) → L(x)) ≡ ∃x¬(S(x) → L(x)) ≡ ∃x(S(x) ∧ ¬L(x))"
            }
          ]
        }
      ]
    }
  },
  5: {
    title: "Week 5 Practice Homework: Complex Translation & Mathematical Logic",
    content: {
      instructions: "Practice advanced translation patterns and mathematical logic applications. Focus on complex quantification, uniqueness, and mathematical statements.",
      totalPoints: 85,
      problems: [
        {
          id: "p1",
          title: "Advanced Translation Patterns",
          points: 35,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate: 'There is exactly one person who loves everyone' using L(x,y) for 'x loves y', P(x) for 'x is a person'",
              answer: "∃x(P(x) ∧ ∀y(P(y) → L(x,y)) ∧ ∀z((P(z) ∧ ∀w(P(w) → L(z,w))) → z = x))",
              explanation: "This requires existential quantification with uniqueness condition."
            },
            {
              id: "p1b",
              question: "Translate: 'Every student has at least one friend who is also a student' using S(x) for student, F(x,y) for 'x is friends with y'",
              answer: "∀x(S(x) → ∃y(S(y) ∧ F(x,y)))",
              explanation: "Universal quantification over students, then existential for friends who are also students."
            },
            {
              id: "p1c",
              question: "Translate: 'No one likes everyone' using L(x,y) for 'x likes y'",
              answer: "¬∃x∀y L(x,y)",
              explanation: "Negated existential: there is no person who likes everyone."
            },
            {
              id: "p1d",
              question: "Translate: 'If someone is happy, then everyone around them is happy' using H(x) for happy, A(x,y) for 'x is around y'",
              answer: "∀x(H(x) → ∀y(A(y,x) → H(y)))",
              explanation: "Universal conditional: if anyone is happy, then all people around them are happy."
            }
          ]
        },
        {
          id: "p2",
          title: "Uniqueness Quantifier (∃!)",
          points: 25,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What does ∃!x P(x) mean?",
              options: ["There exists at least one x such that P(x)", "There exists exactly one x such that P(x)", "There exists no x such that P(x)", "For all x, P(x)"],
              correct: 1,
              explanation: "∃! is the uniqueness quantifier meaning 'there exists exactly one'."
            },
            {
              id: "p2b",
              question: "How do you express ∃!x P(x) using standard quantifiers?",
              options: ["∃x P(x)", "∃x(P(x) ∧ ∀y(P(y) → y = x))", "∀x P(x)", "¬∃x P(x)"],
              correct: 1,
              explanation: "Uniqueness requires existence plus the condition that any other element with the property equals the first."
            },
            {
              id: "p2c",
              question: "Which statement uses uniqueness correctly?",
              options: ["∃!x(x > 5)", "∃!x(x = x)", "∃!x(x is the president)", "∃!x(x is a number)"],
              correct: 2,
              explanation: "There is exactly one president (assuming a specific context/country)."
            }
          ]
        },
        {
          id: "p3",
          title: "Mathematical Logic Applications",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Translate: 'For every positive number, there exists a smaller positive number' using P(x) for positive, L(x,y) for 'x < y'",
              answer: "∀x(P(x) → ∃y(P(y) ∧ L(y,x)))",
              explanation: "Universal quantification over positive numbers, then existential for smaller positive numbers."
            },
            {
              id: "p3b",
              question: "Express: 'The square root of 2 is irrational' using R(x) for rational, S(x,y) for 'x is the square root of y'",
              answer: "∃x(S(x,2) ∧ ¬R(x))",
              explanation: "There exists a number that is the square root of 2 and is not rational."
            },
            {
              id: "p3c",
              question: "What is the negation of ∀x∃y(x < y)?",
              answer: "∃x∀y(x ≥ y)",
              explanation: "Negating universal and existential quantifiers and flipping the relation."
            }
          ]
        }
      ]
    }
  },
  6: {
    title: "Week 6 Practice Homework: Models & Validity Proofs",
    content: {
      instructions: "Practice using models to prove invalidity and demonstrate consistency. Focus on constructing counterexamples and understanding model theory.",
      totalPoints: 90,
      problems: [
        {
          id: "p1",
          title: "Model Construction",
          points: 40,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Construct a model to prove that ∀x P(x) ⊬ ∃x (P(x) ∧ Q(x)) (domain: {1,2}, show P and Q interpretations)",
              answer: "Domain: {1,2}, P = {1,2}, Q = {} (empty set)",
              explanation: "All elements satisfy P(x), but no element satisfies both P(x) and Q(x), making the conclusion false."
            },
            {
              id: "p1b",
              question: "Create a model where ∃x (P(x) ∧ Q(x)) is true but ∀x (P(x) → Q(x)) is false",
              answer: "Domain: {1,2}, P = {1,2}, Q = {1}",
              explanation: "Element 1 satisfies both P and Q, but element 2 satisfies P but not Q, making the universal false."
            },
            {
              id: "p1c",
              question: "Show that ∀x P(x), ∃x ¬P(x) is inconsistent by attempting to construct a model",
              answer: "No model possible - contradiction",
              explanation: "Cannot have both 'all x satisfy P' and 'some x doesn't satisfy P' in the same model."
            },
            {
              id: "p1d",
              question: "Construct a model for: ∃x P(x), ∀x (P(x) → Q(x)), ∃x ¬Q(x)",
              answer: "Domain: {1,2}, P = {1}, Q = {1}",
              explanation: "Element 1 satisfies P and Q, element 2 satisfies neither P nor Q, making all statements true."
            }
          ]
        },
        {
          id: "p2",
          title: "Validity vs. Invalidity",
          points: 25,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "An argument is valid if:",
              options: ["The premises are true", "The conclusion is true", "If all premises are true, the conclusion must be true", "The premises and conclusion are both true"],
              correct: 2,
              explanation: "Validity is about the logical relationship between premises and conclusion, not their actual truth values."
            },
            {
              id: "p2b",
              question: "To prove an argument invalid, you need to:",
              options: ["Show the premises are false", "Show the conclusion is false", "Find a model where premises are true but conclusion is false", "Prove the conclusion doesn't follow"],
              correct: 2,
              explanation: "A counterexample model demonstrates invalidity by showing the premises can be true while the conclusion is false."
            },
            {
              id: "p2c",
              question: "If you cannot construct a model where the premises are true and conclusion false, this suggests:",
              options: ["The argument is invalid", "The argument is valid", "The premises are inconsistent", "More models are needed"],
              correct: 1,
              explanation: "If no counterexample exists, the argument is likely valid (though this doesn't constitute a proof)."
            }
          ]
        },
        {
          id: "p3",
          title: "Advanced Model Theory",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "In domain {a,b,c}, construct a model for ∀x∃y R(x,y) where R is not reflexive",
              answer: "R = {(a,b), (b,c), (c,a)}",
              explanation: "Each element relates to some other element, but no element relates to itself."
            },
            {
              id: "p3b",
              question: "Can ∃x∀y R(x,y) and ∀x∃y ¬R(x,y) both be true in the same model? Explain.",
              answer: "No, they contradict each other",
              explanation: "If some x relates to all y, then that x cannot relate to some y that ¬R(x,y) holds for."
            },
            {
              id: "p3c",
              question: "What's the minimum domain size needed to satisfy: ∃x∃y∃z (x≠y ∧ y≠z ∧ x≠z)?",
              answer: "3 elements",
              explanation: "Need at least three distinct elements to satisfy the three inequality conditions."
            }
          ]
        }
      ]
    }
  },
  7: {
    title: "Week 7 Practice Homework: Number Systems & Statement Classes",
    content: {
      instructions: "Practice working with recursive number systems, natural numbers, and statement classes. Focus on mathematical foundations and logical classification.",
      totalPoints: 95,
      problems: [
        {
          id: "p1",
          title: "Recursive Number Systems",
          points: 40,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Define the successor function S(n) in a recursive number system starting with 0",
              answer: "S(0) = 1, S(1) = 2, S(2) = 3, ..., S(n) = n+1",
              explanation: "The successor function maps each natural number to the next one in sequence."
            },
            {
              id: "p1b",
              question: "Using recursion, define addition a + b where a, b ∈ ℕ",
              answer: "a + 0 = a, a + S(b) = S(a + b)",
              explanation: "Addition is defined recursively: adding zero gives the original number, adding a successor increments the result."
            },
            {
              id: "p1c",
              question: "What is the base case for proving ∀n ∈ ℕ (n + 0 = n) by induction?",
              answer: "P(0): 0 + 0 = 0",
              explanation: "The base case shows the property holds for the starting element (0) in the natural numbers."
            },
            {
              id: "p1d",
              question: "Express 'every natural number has a unique successor' formally",
              answer: "∀n ∈ ℕ ∃!m (m = S(n))",
              explanation: "For each natural number, there exists exactly one successor."
            }
          ]
        },
        {
          id: "p2",
          title: "Natural Numbers (ℕ)",
          points: 30,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "Which axiom states that 0 is not the successor of any natural number?",
              options: ["Peano Axiom 1", "Peano Axiom 2", "Peano Axiom 3", "Peano Axiom 4"],
              correct: 1,
              explanation: "Peano Axiom 2 states that 0 is not in the range of the successor function."
            },
            {
              id: "p2b",
              question: "The principle of mathematical induction is based on:",
              options: ["Peano Axiom 5", "The successor function", "The base case only", "Recursive definitions"],
              correct: 0,
              explanation: "Peano Axiom 5 provides the foundation for mathematical induction."
            },
            {
              id: "p2c",
              question: "In the construction of ℕ, what makes the successor function injective?",
              options: ["Different numbers have different successors", "Every number has a successor", "0 has no predecessor", "Induction works"],
              correct: 0,
              explanation: "If S(a) = S(b), then a = b, making the successor function one-to-one."
            }
          ]
        },
        {
          id: "p3",
          title: "Statement Classes",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Classify: 'All ravens are black' (tautology, contradiction, or contingent)",
              answer: "Contingent",
              explanation: "This statement's truth depends on empirical facts about ravens in the world."
            },
            {
              id: "p3b",
              question: "Give an example of a logical contradiction using predicates",
              answer: "∃x(P(x) ∧ ¬P(x))",
              explanation: "No object can both have and not have the same property simultaneously."
            },
            {
              id: "p3c",
              question: "Why is '∀x(P(x) ∨ ¬P(x))' a tautology?",
              answer: "Every object either has property P or doesn't have property P",
              explanation: "This follows from the law of excluded middle - there's no third option."
            }
          ]
        }
      ]
    }
  },
  8: {
    title: "Week 8 Practice Homework: Comprehensive Review & Advanced Topics",
    content: {
      instructions: "Comprehensive review covering all major topics from the course plus advanced concepts. This homework prepares you for the final exam.",
      totalPoints: 100,
      problems: [
        {
          id: "p1",
          title: "Logic Foundations Review",
          points: 35,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Translate and simplify: 'Not all students are both smart and hardworking' using S(x), M(x), H(x)",
              answer: "¬∀x(S(x) → (M(x) ∧ H(x))) ≡ ∃x(S(x) ∧ ¬(M(x) ∧ H(x)))",
              explanation: "Negate the universal, then apply De Morgan's law to the conjunction."
            },
            {
              id: "p1b",
              question: "Construct a truth table for (P → Q) ↔ (¬Q → ¬P)",
              answer: "All rows evaluate to T (tautology)",
              explanation: "This represents the logical equivalence between a conditional and its contrapositive."
            },
            {
              id: "p1c",
              question: "Prove using Boolean algebra: (P ∧ Q) ∨ (P ∧ ¬Q) ≡ P",
              answer: "P ∧ (Q ∨ ¬Q) = P ∧ T = P",
              explanation: "Factor out P, then use the law of excluded middle and identity."
            },
            {
              id: "p1d",
              question: "What's wrong with this model? Domain: {1}, P = {1}, ∀x P(x) = false",
              answer: "Contradiction: all elements satisfy P, but universal statement is false",
              explanation: "If P(1) is true and 1 is the only element, then ∀x P(x) must be true."
            }
          ]
        },
        {
          id: "p2",
          title: "Advanced Logic Concepts",
          points: 35,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "What is the difference between first-order and second-order logic?",
              options: ["First-order has more quantifiers", "Second-order can quantify over predicates", "First-order is more expressive", "No significant difference"],
              correct: 1,
              explanation: "Second-order logic allows quantification over predicates and relations, not just individuals."
            },
            {
              id: "p2b",
              question: "In temporal logic, what does □P mean?",
              options: ["P is always true", "P is sometimes true", "P is necessarily true", "P is possibly true"],
              correct: 0,
              explanation: "□P means 'P is always true' (globally/necessarily true in all future states)."
            },
            {
              id: "p2c",
              question: "Which statement about completeness is correct?",
              options: ["All true statements are provable", "All provable statements are true", "Some true statements aren't provable", "Logic is incomplete"],
              correct: 0,
              explanation: "Completeness means every semantically valid formula is syntactically provable."
            },
            {
              id: "p2d",
              question: "Gödel's incompleteness theorem shows that:",
              options: ["Logic is inconsistent", "Arithmetic has unprovable truths", "All systems are incomplete", "Mathematics is false"],
              correct: 1,
              explanation: "Any consistent system containing arithmetic has true statements that cannot be proven within the system."
            }
          ]
        },
        {
          id: "p3",
          title: "Integrated Problem Solving",
          points: 30,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Design a logical system to represent 'Every team has exactly one captain who leads all members' using T(x), C(x,y), L(x,y), M(x,y)",
              answer: "∀x(T(x) → ∃!y(M(y,x) ∧ C(y,x) ∧ ∀z(M(z,x) → L(y,z))))",
              explanation: "For every team, there exists exactly one member who is captain and leads all other members."
            },
            {
              id: "p3b",
              question: "Identify the logical error: 'If it rains, the ground is wet. The ground is wet. Therefore, it rained.'",
              answer: "Affirming the consequent fallacy",
              explanation: "This invalid inference form assumes that because Q is true and P→Q, then P must be true."
            },
            {
              id: "p3c",
              question: "Express the halting problem informally: Can we determine if any program will halt?",
              answer: "No algorithm can determine for all programs whether they will halt or run forever",
              explanation: "This is a fundamental undecidability result in computer science and logic."
            }
          ]
        }
      ]
    }
  }
};

export const presetPracticeQuizzes = {
  1: {
    title: "Week 1 Practice Quiz: Logical Operators & Basics",
    content: {
      instructions: "Quiz covering basic logical operators, statement translation, and fundamental concepts. You have unlimited attempts to practice.",
      totalPoints: 40,
      problems: [
        {
          id: "p1",
          title: "Operator Recognition",
          points: 20,
          type: "multiple_choice",
          questions: [
            {
              id: "p1a",
              question: "What is the symbol for conjunction?",
              options: ["∨", "∧", "→"],
              correct: 1,
              explanation: "∧ is the symbol for conjunction (and)."
            },
            {
              id: "p1b",
              question: "Which symbol represents negation?",
              options: ["¬", "∧", "∨"],
              correct: 0,
              explanation: "¬ is the standard symbol for negation (not)."
            },
            {
              id: "p1c",
              question: "The conditional 'if P then Q' is symbolized as:",
              options: ["P ∧ Q", "P → Q", "P ↔ Q"],
              correct: 1,
              explanation: "→ represents the conditional relationship 'if...then'."
            },
            {
              id: "p1d",
              question: "What does P ↔ Q mean?",
              options: ["P if and only if Q", "P or Q", "P and Q"],
              correct: 0,
              explanation: "↔ represents the biconditional 'if and only if'."
            }
          ]
        },
        {
          id: "p2",
          title: "Quick Translation",
          points: 20,
          type: "text_input",
          questions: [
            {
              id: "p2a",
              question: "Translate 'not P' into symbols:",
              answer: "¬P",
              explanation: "Negation is represented by ¬ before the proposition."
            },
            {
              id: "p2b",
              question: "Translate 'P and Q' into symbols:",
              answer: "P ∧ Q",
              explanation: "Conjunction uses the ∧ symbol between propositions."
            },
            {
              id: "p2c",
              question: "Translate 'P or Q' into symbols:",
              answer: "P ∨ Q",
              explanation: "Disjunction uses the ∨ symbol between propositions."
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
    title: "Week 1 Practice Test: Comprehensive Logic Basics",
    content: {
      instructions: "Comprehensive practice test covering all Week 1 material: propositions, logical operators, translation, and basic reasoning. Take your time and show your work.",
      totalPoints: 100,
      problems: [
        {
          id: "p1",
          title: "Definitions and Concepts",
          points: 25,
          type: "text_input",
          questions: [
            {
              id: "p1a",
              question: "Define what a proposition is in logic.",
              answer: "A statement that is either true or false",
              explanation: "A proposition is a declarative statement that has exactly one truth value."
            },
            {
              id: "p1b",
              question: "What is the difference between a proposition and a sentence?",
              answer: "Not all sentences are propositions; only declarative statements that can be true or false are propositions",
              explanation: "Sentences can be questions, commands, or exclamations, but propositions must be declarative and have a truth value."
            },
            {
              id: "p1c",
              question: "Explain what a truth table shows.",
              answer: "A truth table shows all possible truth value combinations for a logical formula",
              explanation: "Truth tables systematically display how the truth value of a complex statement depends on the truth values of its components."
            }
          ]
        },
        {
          id: "p2",
          title: "Operator Applications",
          points: 35,
          type: "multiple_choice",
          questions: [
            {
              id: "p2a",
              question: "Which of the following is logically equivalent to ¬(P ∧ Q)?",
              options: ["¬P ∧ ¬Q", "¬P ∨ ¬Q", "P ∨ Q", "¬P → ¬Q"],
              correct: 1,
              explanation: "By De Morgan's law, ¬(P ∧ Q) = ¬P ∨ ¬Q."
            },
            {
              id: "p2b",
              question: "When is P → Q logically equivalent to ¬P ∨ Q?",
              options: ["Never", "Always", "Only when P is true", "Only when Q is false"],
              correct: 1,
              explanation: "P → Q is always logically equivalent to ¬P ∨ Q by the definition of material conditional."
            },
            {
              id: "p2c",
              question: "If P ∨ Q is false, what can we conclude?",
              options: ["P is false", "Q is false", "Both P and Q are false", "Either P or Q is false"],
              correct: 2,
              explanation: "A disjunction is false only when both disjuncts are false."
            },
            {
              id: "p2d",
              question: "The statement 'P if and only if Q' is false when:",
              options: ["P and Q are both true", "P and Q are both false", "P is true and Q is false", "P and Q have different truth values"],
              correct: 3,
              explanation: "A biconditional is false when the two sides have different truth values."
            }
          ]
        },
        {
          id: "p3",
          title: "Complex Translations",
          points: 40,
          type: "text_input",
          questions: [
            {
              id: "p3a",
              question: "Translate: 'If the weather is nice, then we will go to the park, but if it rains, we will stay home.' Use W for nice weather, P for go to park, R for rains, H for stay home.",
              answer: "(W → P) ∧ (R → H)",
              explanation: "This combines two conditional statements with conjunction."
            },
            {
              id: "p3b",
              question: "Translate: 'We will go swimming unless it is too cold.' Use S for go swimming, C for too cold.",
              answer: "¬C → S",
              explanation: "'Unless' typically means 'if not', so 'unless it is too cold' means 'if it is not too cold'."
            },
            {
              id: "p3c",
              question: "Translate: 'Either both John and Mary will come to the party, or neither will come.' Use J for John comes, M for Mary comes.",
              answer: "(J ∧ M) ∨ (¬J ∧ ¬M)",
              explanation: "This is an exclusive choice between both coming or both not coming."
            },
            {
              id: "p3d",
              question: "What is the negation of 'If I study hard, then I will pass the exam'? Use S for study hard, P for pass exam.",
              answer: "S ∧ ¬P",
              explanation: "The negation of P → Q is P ∧ ¬Q (study hard but don't pass)."
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