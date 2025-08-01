import { useState } from "react";
import { X, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogicKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSymbolInsert: (symbol: string) => void;
}

const LOGIC_SYMBOLS = [
  { symbol: "∀", name: "Universal Quantifier", description: "For all" },
  { symbol: "∃", name: "Existential Quantifier", description: "There exists" },
  { symbol: "¬", name: "Negation", description: "Not" },
  { symbol: "∧", name: "Conjunction", description: "And" },
  { symbol: "∨", name: "Disjunction", description: "Or" },
  { symbol: "→", name: "Implication", description: "If...then" },
  { symbol: "↔", name: "Biconditional", description: "If and only if" },
  { symbol: "⊃", name: "Material Conditional", description: "Material implication" },
  { symbol: "≡", name: "Logical Equivalence", description: "Logically equivalent" },
  { symbol: "⊤", name: "Tautology", description: "Always true" },
  { symbol: "⊥", name: "Contradiction", description: "Always false" },
  { symbol: "⊢", name: "Entailment", description: "Proves/entails" },
  { symbol: "⊨", name: "Semantic Entailment", description: "Semantically entails" },
  { symbol: "□", name: "Necessity", description: "Necessarily" },
  { symbol: "◇", name: "Possibility", description: "Possibly" },
  { symbol: "∴", name: "Therefore", description: "Therefore/conclusion" },
  { symbol: "∵", name: "Because", description: "Because/reason" },
  { symbol: "∈", name: "Element of", description: "Is an element of" },
  { symbol: "∉", name: "Not element of", description: "Is not an element of" },
  { symbol: "⊆", name: "Subset", description: "Is a subset of" },
  { symbol: "⊈", name: "Not subset", description: "Is not a subset of" },
  { symbol: "∩", name: "Intersection", description: "Intersection" },
  { symbol: "∪", name: "Union", description: "Union" },
  { symbol: "∅", name: "Empty set", description: "Empty set" },
  { symbol: "λ", name: "Lambda", description: "Lambda abstraction" },
  { symbol: "α", name: "Alpha", description: "Alpha" },
  { symbol: "β", name: "Beta", description: "Beta" },
  { symbol: "γ", name: "Gamma", description: "Gamma" },
  { symbol: "δ", name: "Delta", description: "Delta" },
  { symbol: "φ", name: "Phi", description: "Phi" },
  { symbol: "ψ", name: "Psi", description: "Psi" },
  { symbol: "ω", name: "Omega", description: "Omega" },
];

export default function LogicKeyboard({ isOpen, onClose, onSymbolInsert }: LogicKeyboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("basic");

  if (!isOpen) return null;

  const basicSymbols = LOGIC_SYMBOLS.slice(0, 12);
  const advancedSymbols = LOGIC_SYMBOLS.slice(12, 24);
  const greekSymbols = LOGIC_SYMBOLS.slice(24);

  const getSymbolsByCategory = () => {
    switch (selectedCategory) {
      case "basic": return basicSymbols;
      case "advanced": return advancedSymbols;
      case "greek": return greekSymbols;
      default: return basicSymbols;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Keyboard className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Logic Symbol Keyboard</h2>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => setSelectedCategory("basic")}
            className={`pb-2 px-4 font-medium ${
              selectedCategory === "basic"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Basic Logic
          </button>
          <button
            onClick={() => setSelectedCategory("advanced")}
            className={`pb-2 px-4 font-medium ${
              selectedCategory === "advanced"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Advanced
          </button>
          <button
            onClick={() => setSelectedCategory("greek")}
            className={`pb-2 px-4 font-medium ${
              selectedCategory === "greek"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Greek Letters
          </button>
        </div>

        {/* Symbol Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {getSymbolsByCategory().map((item, index) => (
            <div key={index} className="text-center">
              <button
                onClick={() => {
                  onSymbolInsert(item.symbol);
                  onClose();
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-blue-600">
                  {item.symbol}
                </div>
                <div className="text-xs text-gray-600 group-hover:text-blue-700">
                  {item.name}
                </div>
              </button>
              <div className="text-xs text-gray-500 mt-1 px-1 truncate" title={item.description}>
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Quick Instructions:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Click any symbol to insert it into your answer</li>
            <li>• Use parentheses ( ) to group expressions</li>
            <li>• Variables are typically uppercase letters: P, Q, R</li>
            <li>• Individual constants are lowercase: a, b, c</li>
            <li>• Predicates are uppercase with arguments: Px, Rxy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}