import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";

const AlternateProblem3 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Alternate Problem 3: Array Reversal Using Stack Operations
    </h3>

    <KeyConcepts
      title="Key Concepts:"
      concepts={[
        "Stack operations (push and pop)",
        "Array manipulation with indexed addressing",
        "Loop constructs with rcx register",
        "Zero-extension (movzx) for different register sizes",
        "64-bit register operations",
      ]}
    />

    <CodeBlock
      code={`section .data
    array db 0x32, 0x4B, 0x5A, 0x69
    len db 4

section .text
global _start
_start:
    movzx rcx, byte[len]
    mov rsi, 0
pushLoop:
    mov rax, 0
    mov al, byte[array+rsi]
    push rax
    inc rsi
    loop pushLoop

    mov rcx, qword[len]
    mov rsi, 0
popLoop:
    pop rax
    mov byte[array+rsi], al
    inc rsi
    loop popLoop
done:
    mov rax, 60
    mov rdi, 0
    syscall`}
    />

    <CollapsibleSection
      title="Hex to Decimal Conversions"
      id="alt-p3-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">Converting 0x32 to Decimal:</h5>
          <div className="bg-white p-3 rounded">
            <p className="font-semibold mb-2">Calculation:</p>
            <p className="text-sm">0x32 = 3×16¹ + 2×16⁰ = 48 + 2</p>
            <p className="text-green-700 font-bold mt-2">✅ 0x32 = 50 decimal</p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">Converting 0x4B to Decimal:</h5>
          <div className="bg-white p-3 rounded">
            <p className="font-semibold mb-2">Calculation:</p>
            <p className="text-sm">0x4B = 4×16¹ + 11×16⁰ = 64 + 11 (B = 11)</p>
            <p className="text-green-700 font-bold mt-2">✅ 0x4B = 75 decimal</p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">Converting 0x5A to Decimal:</h5>
          <div className="bg-white p-3 rounded">
            <p className="font-semibold mb-2">Calculation:</p>
            <p className="text-sm">0x5A = 5×16¹ + 10×16⁰ = 80 + 10 (A = 10)</p>
            <p className="text-green-700 font-bold mt-2">✅ 0x5A = 90 decimal</p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">Converting 0x69 to Decimal:</h5>
          <div className="bg-white p-3 rounded">
            <p className="font-semibold mb-2">Calculation:</p>
            <p className="text-sm">0x69 = 6×16¹ + 9×16⁰ = 96 + 9</p>
            <p className="text-green-700 font-bold mt-2">✅ 0x69 = 105 decimal</p>
          </div>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="alt-p3-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-bold text-blue-900 mb-2">Initial State:</h5>
          <ul className="list-disc ml-6 text-blue-800">
            <li>array = [50, 75, 90, 105]</li>
            <li>len = 4</li>
          </ul>
        </div>

        <h5 className="font-bold text-lg mt-4">Phase 1: Push Loop (Store values on stack)</h5>
        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <strong>movzx rcx, byte[len]:</strong> rcx = 4 (zero-extend 8-bit to 64-bit)
          </li>
          <li>
            <strong>mov rsi, 0:</strong> rsi = 0 (index counter)
          </li>
          <li>
            <strong>pushLoop - Iteration 1 (rcx=4, rsi=0):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>mov rax, 0 → rax = 0</li>
              <li>mov al, byte[array+0] → al = 50, rax = 50</li>
              <li>push rax → Stack: [50]</li>
              <li>inc rsi → rsi = 1</li>
              <li>loop pushLoop → rcx = 3, continue</li>
            </ul>
          </li>
          <li>
            <strong>pushLoop - Iteration 2 (rcx=3, rsi=1):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>mov rax, 0 → rax = 0</li>
              <li>mov al, byte[array+1] → al = 75, rax = 75</li>
              <li>push rax → Stack: [75, 50]</li>
              <li>inc rsi → rsi = 2</li>
              <li>loop pushLoop → rcx = 2, continue</li>
            </ul>
          </li>
          <li>
            <strong>pushLoop - Iteration 3 (rcx=2, rsi=2):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>mov rax, 0 → rax = 0</li>
              <li>mov al, byte[array+2] → al = 90, rax = 90</li>
              <li>push rax → Stack: [90, 75, 50]</li>
              <li>inc rsi → rsi = 3</li>
              <li>loop pushLoop → rcx = 1, continue</li>
            </ul>
          </li>
          <li>
            <strong>pushLoop - Iteration 4 (rcx=1, rsi=3):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>mov rax, 0 → rax = 0</li>
              <li>mov al, byte[array+3] → al = 105, rax = 105</li>
              <li>push rax → Stack: [105, 90, 75, 50] (top to bottom)</li>
              <li>inc rsi → rsi = 4</li>
              <li>loop pushLoop → rcx = 0, exit loop</li>
            </ul>
          </li>
        </ol>

        <div className="bg-yellow-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-yellow-900 mb-2">After Push Loop:</p>
          <ul className="list-disc ml-6 text-yellow-800">
            <li>Stack (top → bottom): [105, 90, 75, 50]</li>
            <li>rcx = 0, rsi = 4, rax = 105</li>
          </ul>
        </div>

        <h5 className="font-bold text-lg mt-6">Phase 2: Pop Loop (Restore values in reverse)</h5>
        <ol className="list-decimal ml-6 space-y-2" start="7">
          <li>
            <strong>mov rcx, qword[len]:</strong> rcx = 4
            <p className="text-sm text-gray-600 ml-6">
              (Reads 8 bytes from len address; len is 4, remaining bytes are 0)
            </p>
          </li>
          <li>
            <strong>mov rsi, 0:</strong> rsi = 0 (reset index)
          </li>
          <li>
            <strong>popLoop - Iteration 1 (rcx=4, rsi=0):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>pop rax → rax = 105 (from top of stack)</li>
              <li>mov byte[array+0], al → array[0] = 105</li>
              <li>inc rsi → rsi = 1</li>
              <li>loop popLoop → rcx = 3, continue</li>
            </ul>
          </li>
          <li>
            <strong>popLoop - Iteration 2 (rcx=3, rsi=1):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>pop rax → rax = 90</li>
              <li>mov byte[array+1], al → array[1] = 90</li>
              <li>inc rsi → rsi = 2</li>
              <li>loop popLoop → rcx = 2, continue</li>
            </ul>
          </li>
          <li>
            <strong>popLoop - Iteration 3 (rcx=2, rsi=2):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>pop rax → rax = 75</li>
              <li>mov byte[array+2], al → array[2] = 75</li>
              <li>inc rsi → rsi = 3</li>
              <li>loop popLoop → rcx = 1, continue</li>
            </ul>
          </li>
          <li>
            <strong>popLoop - Iteration 4 (rcx=1, rsi=3):</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>pop rax → rax = 50</li>
              <li>mov byte[array+3], al → array[3] = 50</li>
              <li>inc rsi → rsi = 4</li>
              <li>loop popLoop → rcx = 0, exit loop</li>
            </ul>
          </li>
        </ol>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-green-900 mb-2">Summary:</p>
          <p className="text-green-800">
            The program reverses the array by pushing all elements onto the stack (LIFO - Last In
            First Out), then popping them back into the array, effectively reversing the order.
          </p>
          <p className="text-green-800 mt-2">
            Original: [50, 75, 90, 105] → Reversed: [105, 90, 75, 50]
          </p>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="alt-p3-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <h4 className="font-semibold text-lg mb-3">Memory State (in Decimal):</h4>
      <Table
        headers={["Memory Offset", "Value (Decimal)"]}
        rows={[
          ["", "before (initial) | after execution"],
          ["len +0", "4 | 4"],
          ["array +3", "105 | 50"],
          ["array +2", "90 | 75"],
          ["array +1", "75 | 90"],
          ["array +0", "50 | 105"],
        ]}
      />

      <h4 className="font-semibold text-lg mb-3 mt-6">Register State (in Decimal):</h4>
      <Table
        headers={["Register", "Value (Decimal)"]}
        rows={[
          ["rax", "50"],
          ["rcx", "0"],
          ["rsi", "4"],
        ]}
      />

      <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
        <h5 className="font-bold text-green-900 mb-3">Complete Answer Table (26 points):</h5>
        <Table
          headers={["Memory Offset", "Value (Decimal)", "Register", "Value (Decimal)"]}
          rows={[
            ["", "before | after", "", ""],
            ["len +0", "4 | 4", "rax", "50"],
            ["array +3", "105 | 50", "rcx", "0"],
            ["array +2", "90 | 75", "rsi", "4"],
            ["array +1", "75 | 90", "", ""],
            ["array +0", "50 | 105", "", ""],
          ]}
        />
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h5 className="font-bold text-blue-900 mb-3">Key Observations:</h5>
        <ul className="list-disc ml-6 space-y-2 text-blue-800">
          <li>
            <strong>movzx rcx, byte[len]</strong> zero-extends the 8-bit value (4) to 64-bit,
            resulting in rcx = 0x0000000000000004 = 4
          </li>
          <li>
            <strong>Stack behavior:</strong> Push operations store values in LIFO order, so popping
            reverses the sequence
          </li>
          <li>
            <strong>Final rax value (50):</strong> This is the last value popped from the stack
            (originally array[0])
          </li>
          <li>
            <strong>Final rcx value (0):</strong> The loop instruction decrements rcx; after 4
            iterations, rcx = 0
          </li>
          <li>
            <strong>Final rsi value (4):</strong> Incremented once per iteration in both loops
          </li>
        </ul>
      </div>
    </CollapsibleSection>
  </div>
);

export default AlternateProblem3;
