import React from "react";
import { ProgressManager } from "../shared";

const OverviewPage = ({ setActiveTab }) => (
  <div className="animate-slide-in">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-purple-700">
      Welcome to Your Study Guide!
    </h2>
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-lg sm:text-xl font-bold mb-3 text-purple-700">📚 What's Covered</h3>
        <p className="text-gray-700 mb-4">
          This interactive study guide covers all 4 problems from your Exam 03 review:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-blue-600 mb-2">Problem 1: Multiplication</h4>
            <p className="text-sm text-gray-600">Word-sized operations and mul instruction</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-green-600 mb-2">Problem 2: Division Loop</h4>
            <p className="text-sm text-gray-600">Counting multiples with div and conditionals</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-yellow-600 mb-2">Problem 3: Stack Operations</h4>
            <p className="text-sm text-gray-600">Array reversal using push and pop</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-red-600 mb-2">Problem 4: ASCII Conversion</h4>
            <p className="text-sm text-gray-600">Binary to ASCII decimal conversion</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
        <h3 className="text-xl font-bold mb-3 text-blue-700">🎯 How to Use This Guide</h3>
        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <strong>Navigate using tabs above</strong> - Each problem has its own section
          </li>
          <li>
            <strong>Click section headers</strong> - Expand/collapse to reveal detailed explanations
          </li>
          <li>
            <strong>Study the code</strong> - Syntax-highlighted assembly code for clarity
          </li>
          <li>
            <strong>Review tables</strong> - Memory and register states before/after execution
          </li>
          <li>
            <strong>Check Quick Reference</strong> - Essential instructions and concepts
          </li>
          <li>
            <strong>Read Exam Tips</strong> - Strategies and common pitfalls
          </li>
        </ol>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-3 text-green-700">✨ Features</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Complete step-by-step solutions for all 4 problems</li>
          <li>Interactive collapsible sections for focused study</li>
          <li>Color-coded syntax highlighting for assembly code</li>
          <li>Clear before/after memory and register tables</li>
          <li>Quick reference guide for common instructions</li>
          <li>Exam tips and strategy recommendations</li>
          <li>Dark mode support for comfortable studying</li>
          <li>Keyboard shortcuts for efficient navigation</li>
          <li>Search functionality across all content</li>
          <li>Progress tracking with export/import capability</li>
        </ul>
      </div>

      <ProgressManager />

      <div className="text-center mt-6 sm:mt-8">
        <button
          onClick={() => setActiveTab("problem1")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg active:scale-95"
        >
          Start with Problem 1 →
        </button>
      </div>
    </div>
  </div>
);

export default OverviewPage;
