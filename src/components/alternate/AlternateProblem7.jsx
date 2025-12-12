import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";

const AlternateProblem7 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Alternate Problem 7: Array Swap Using Macros
    </h3>

    <KeyConcepts
      title="Key Concepts:"
      concepts={[
        "Assembly macros for code reuse",
        "Byte swapping algorithm using temporary registers",
        "Parallel array processing with indexed addressing",
        "jb (jump if below) for unsigned comparison",
        "LEA for address calculation",
      ]}
    />

    <CodeBlock
      code={`%macro mac2  2
 mov al, byte[%1]
 mov bl, byte[%2]
 mov byte[%1], bl
 mov byte[%2], al
%endmacro

section .data
num1 db 0x17, 0x39, 0x6A
num2 db 0x5F, 0x40, 0x25

section .text
global _start
_start:
 mov r10, 0
next:
 lea rdi, byte[num1 + r10]
 lea rsi, byte[num2 + r10]
 mac2 rdi, rsi
 inc r10
 cmp r10, 3
 jb next
_stop:
 mov rax, 60
 mov rdi, 0
 syscall`}
    />

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="alt-p7-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-bold text-blue-900 mb-2">Initial State:</h5>
          <ul className="list-disc ml-6 text-blue-800">
            <li>num1 = [0x17, 0x39, 0x6A] = [23, 57, 106] decimal</li>
            <li>num2 = [0x5F, 0x40, 0x25] = [95, 64, 37] decimal</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h5 className="font-bold text-purple-900 mb-3">Macro Functionality:</h5>
          <p className="text-sm text-purple-800">
            The mac2 macro swaps bytes at two memory locations:
          </p>
          <ol className="list-decimal ml-6 mt-2 text-sm text-purple-800">
            <li>Load byte from address %1 into al</li>
            <li>Load byte from address %2 into bl</li>
            <li>Store bl at address %1</li>
            <li>Store al at address %2</li>
          </ol>
        </div>

        <h5 className="font-bold text-lg mt-4">Iteration 1 (r10 = 0): Swap num1[0] ↔ num2[0]</h5>
        <ul className="list-disc ml-6 space-y-1">
          <li>lea rdi, byte[num1 + 0] → rdi = &num1[0]</li>
          <li>lea rsi, byte[num2 + 0] → rsi = &num2[0]</li>
          <li>mac2 rdi, rsi:</li>
          <li className="ml-6">al = 0x17, bl = 0x5F</li>
          <li className="ml-6">num1[0] = 0x5F, num2[0] = 0x17</li>
          <li>r10 = 1, 1 &lt; 3 → continue</li>
        </ul>

        <h5 className="font-bold text-lg mt-4">Iteration 2 (r10 = 1): Swap num1[1] ↔ num2[1]</h5>
        <ul className="list-disc ml-6 space-y-1">
          <li>lea rdi, byte[num1 + 1] → rdi = &num1[1]</li>
          <li>lea rsi, byte[num2 + 1] → rsi = &num2[1]</li>
          <li>mac2 rdi, rsi:</li>
          <li className="ml-6">al = 0x39, bl = 0x40</li>
          <li className="ml-6">num1[1] = 0x40, num2[1] = 0x39</li>
          <li>r10 = 2, 2 &lt; 3 → continue</li>
        </ul>

        <h5 className="font-bold text-lg mt-4">Iteration 3 (r10 = 2): Swap num1[2] ↔ num2[2]</h5>
        <ul className="list-disc ml-6 space-y-1">
          <li>lea rdi, byte[num1 + 2] → rdi = &num1[2]</li>
          <li>lea rsi, byte[num2 + 2] → rsi = &num2[2]</li>
          <li>mac2 rdi, rsi:</li>
          <li className="ml-6">al = 0x6A, bl = 0x25</li>
          <li className="ml-6">num1[2] = 0x25, num2[2] = 0x6A</li>
          <li>r10 = 3, 3 &lt; 3? FALSE → exit</li>
        </ul>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-green-900 mb-2">Summary:</p>
          <p className="text-green-800">
            The macro swaps all corresponding elements between num1 and num2 arrays. After
            execution, the arrays have exchanged their contents completely.
          </p>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="alt-p7-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory Offset", "Value (Hex)", "Value (Decimal)"]}
        rows={[
          ["", "before → after", "before → after"],
          ["num2 +2", "0x25 → 0x6A", "37 → 106"],
          ["num2 +1", "0x40 → 0x39", "64 → 57"],
          ["num2 +0", "0x5F → 0x17", "95 → 23"],
          ["num1 +2", "0x6A → 0x25", "106 → 37"],
          ["num1 +1", "0x39 → 0x40", "57 → 64"],
          ["num1 +0", "0x17 → 0x5F", "23 → 95"],
        ]}
      />

      <h4 className="font-semibold text-lg mb-3 mt-6">Register State:</h4>
      <Table
        headers={["Register", "Size", "Value (Hex)", "Value (Decimal)"]}
        rows={[
          ["al", "8-bit", "0x6A", "106"],
          ["bl", "8-bit", "0x25", "37"],
        ]}
      />

      <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
        <h5 className="font-bold text-green-900 mb-3">Complete Answer Table (28 points):</h5>
        <Table
          headers={["Memory Offset", "Value (Hex)", "Register", "Value (Hex)"]}
          rows={[
            ["", "before → after", "", ""],
            ["num2 +2", "0x25 → 0x6A", "al", "0x6A"],
            ["num2 +1", "0x40 → 0x39", "bl", "0x25"],
            ["num2 +0", "0x5F → 0x17", "", ""],
            ["num1 +2", "0x6A → 0x25", "", ""],
            ["num1 +1", "0x39 → 0x40", "", ""],
            ["num1 +0", "0x17 → 0x5F", "", ""],
          ]}
        />
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h5 className="font-bold text-blue-900 mb-3">Key Observations:</h5>
        <ul className="list-disc ml-6 space-y-2 text-blue-800">
          <li>
            <strong>Complete swap:</strong> All elements exchanged between arrays
          </li>
          <li>
            <strong>Final al (0x6A):</strong> Last value read from num1[2]
          </li>
          <li>
            <strong>Final bl (0x25):</strong> Last value read from num2[2]
          </li>
          <li>
            <strong>jb instruction:</strong> Unsigned "jump if below" (r10 &lt; 3)
          </li>
          <li>
            <strong>Result verification:</strong> num1 and num2 completely swapped
          </li>
        </ul>
      </div>
    </CollapsibleSection>
  </div>
);

export default AlternateProblem7;
