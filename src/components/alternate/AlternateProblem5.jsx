import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";

const AlternateProblem5 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Alternate Problem 5: Array Sum and Average with Function Call
    </h3>

    <KeyConcepts
      title="Key Concepts:"
      concepts={[
        "Function calls and parameter passing via registers",
        "Array traversal using pointer arithmetic",
        "Accumulation pattern for summing values",
        "Sign extension (cbw) and signed division (idiv)",
        ".bss section for uninitialized data",
        "Mixed register sizes (8-bit, 64-bit)",
      ]}
    />

    <CodeBlock
      code={`section .data
    lst db 2, 7, 4
    len dq 3

section .bss
    sum resb 1
    ave resb 1

section .text
global _start
_start:
    mov rdi, lst
    mov rsi, qword[len]
    mov rdx, sum
    mov rcx, ave
    call calculate
_stop:
    mov rax, 60
    mov rdi, 0
    syscall

global calculate
calculate:
    mov al, 0
    mov r10, rsi
next:
    add al, byte[rdi+r10-1]
    dec r10
    cmp r10, 0
    jne next
    mov byte[rdx], al
    cbw
    idiv sil
    mov byte[rcx], al
    ret`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="alt-p5-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">Array Values:</h5>
          <div className="bg-white p-3 rounded">
            <ul className="text-sm space-y-1 ml-4">
              <li>lst[0] = 2 = 0x02</li>
              <li>lst[1] = 7 = 0x07</li>
              <li>lst[2] = 4 = 0x04</li>
              <li>len = 3 = 0x0000000000000003 (qword)</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">Calculation Results:</h5>
          <div className="bg-white p-3 rounded">
            <p className="font-semibold mb-2">Sum calculation:</p>
            <p className="text-sm ml-4">2 + 7 + 4 = 13 = 0x0D</p>
            <p className="font-semibold mb-2 mt-3">Average calculation:</p>
            <p className="text-sm ml-4">13 ÷ 3 = 4 remainder 1</p>
            <p className="text-sm ml-4">Quotient (average) = 4 = 0x04</p>
            <p className="text-sm ml-4">Remainder = 1 = 0x01</p>
          </div>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="alt-p5-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-bold text-blue-900 mb-2">Initial State:</h5>
          <ul className="list-disc ml-6 text-blue-800">
            <li>lst = [2, 7, 4] = [0x02, 0x07, 0x04]</li>
            <li>len = 3 = 0x0000000000000003</li>
            <li>sum = 0x00 (uninitialized .bss)</li>
            <li>ave = 0x00 (uninitialized .bss)</li>
          </ul>
        </div>

        <h5 className="font-bold text-lg mt-4">Phase 1: _start (Setup and Function Call)</h5>
        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <strong>mov rdi, lst:</strong> rdi = address of lst (parameter 1: array pointer)
          </li>
          <li>
            <strong>mov rsi, qword[len]:</strong> rsi = 0x0000000000000003 (parameter 2: array
            length)
          </li>
          <li>
            <strong>mov rdx, sum:</strong> rdx = address of sum (parameter 3: sum output pointer)
          </li>
          <li>
            <strong>mov rcx, ave:</strong> rcx = address of ave (parameter 4: average output
            pointer)
          </li>
          <li>
            <strong>call calculate:</strong> Jump to calculate function
          </li>
        </ol>

        <h5 className="font-bold text-lg mt-6">Phase 2: calculate (Sum Array Elements)</h5>
        <ol className="list-decimal ml-6 space-y-2" start="6">
          <li>
            <strong>mov al, 0:</strong> al = 0x00 (initialize accumulator)
          </li>
          <li>
            <strong>mov r10, rsi:</strong> r10 = 0x0000000000000003 (copy counter)
          </li>

          <li>
            <strong>Loop Iteration 1 (r10 = 3):</strong>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>add al, byte[rdi+r10-1] → add al, byte[lst+2]</li>
              <li className="ml-4">→ al = 0x00 + 0x04 = 0x04</li>
              <li>dec r10 → r10 = 2</li>
              <li>cmp r10, 0 → 2 ≠ 0? TRUE</li>
              <li>jne next → Jump back</li>
            </ul>
          </li>

          <li>
            <strong>Loop Iteration 2 (r10 = 2):</strong>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>add al, byte[rdi+r10-1] → add al, byte[lst+1]</li>
              <li className="ml-4">→ al = 0x04 + 0x07 = 0x0B (11 decimal)</li>
              <li>dec r10 → r10 = 1</li>
              <li>cmp r10, 0 → 1 ≠ 0? TRUE</li>
              <li>jne next → Jump back</li>
            </ul>
          </li>

          <li>
            <strong>Loop Iteration 3 (r10 = 1):</strong>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>add al, byte[rdi+r10-1] → add al, byte[lst+0]</li>
              <li className="ml-4">→ al = 0x0B + 0x02 = 0x0D (13 decimal)</li>
              <li>dec r10 → r10 = 0</li>
              <li>cmp r10, 0 → 0 ≠ 0? FALSE</li>
              <li>jne next → Don't jump, continue</li>
            </ul>
          </li>
        </ol>

        <h5 className="font-bold text-lg mt-6">Phase 3: Calculate Average</h5>
        <ol className="list-decimal ml-6 space-y-2" start="11">
          <li>
            <strong>mov byte[rdx], al:</strong> sum = 0x0D (store sum = 13)
          </li>
          <li>
            <strong>cbw:</strong> Sign-extend al to ax
            <ul className="list-disc ml-6 mt-1">
              <li>al = 0x0D (13, positive)</li>
              <li>ax = 0x000D (sign-extended to 16-bit)</li>
            </ul>
          </li>
          <li>
            <strong>idiv sil:</strong> Signed division ax ÷ sil
            <ul className="list-disc ml-6 mt-1">
              <li>sil = 0x03 (lower byte of rsi = 3)</li>
              <li>0x000D ÷ 0x03 = 13 ÷ 3 = 4 remainder 1</li>
              <li>al = 0x04 (quotient/average)</li>
              <li>ah = 0x01 (remainder)</li>
            </ul>
          </li>
          <li>
            <strong>mov byte[rcx], al:</strong> ave = 0x04 (store average = 4)
          </li>
          <li>
            <strong>ret:</strong> Return to _start
          </li>
        </ol>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-green-900 mb-2">Summary:</p>
          <p className="text-green-800">
            The program calculates the sum of array elements (2+7+4=13) and then divides by the
            array length to get the average (13÷3=4 with remainder 1). The function uses backward
            iteration through the array (from index 2 down to 0) and passes results through memory
            pointers.
          </p>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="alt-p5-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="font-semibold text-yellow-900">Important Notes:</p>
        <ul className="list-disc ml-6 mt-2 text-yellow-800">
          <li>
            <strong>cbw:</strong> Sign-extends al (8-bit) to ax (16-bit), preserving the sign bit
          </li>
          <li>
            <strong>idiv sil:</strong> Signed division of ax by sil, storing quotient in al and
            remainder in ah
          </li>
          <li>
            <strong>sil:</strong> Lower 8 bits of rsi register (contains value 3)
          </li>
          <li>
            <strong>.bss section:</strong> Reserves uninitialized memory (typically zeros)
          </li>
        </ul>
      </div>

      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory Offset", "Value (Hex)"]}
        rows={[
          ["", "before (initial) | after execution"],
          ["ave +0", "0x00 | 0x04"],
          ["sum +0", "0x00 | 0x0D"],
          ["lst +2", "0x04 | 0x04"],
          ["lst +1", "0x07 | 0x07"],
          ["lst +0", "0x02 | 0x02"],
        ]}
      />

      <h4 className="font-semibold text-lg mb-3 mt-6">Register State (Full register sizes):</h4>
      <Table
        headers={["Register", "Size", "Value (Hex)"]}
        rows={[
          ["ah", "8-bit", "0x01"],
          ["al", "8-bit", "0x04"],
          ["sil", "8-bit", "0x03"],
          ["r10", "64-bit", "0x0000000000000000"],
        ]}
      />

      <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
        <h5 className="font-bold text-green-900 mb-3">Complete Answer Table (24 points):</h5>
        <Table
          headers={["Memory Offset", "Value (Hex)", "Register", "Value (Hex)"]}
          rows={[
            ["", "before | after", "", ""],
            ["ave +0", "0x00 | 0x04", "ah", "0x01"],
            ["sum +0", "0x00 | 0x0D", "al", "0x04"],
            ["lst +2", "0x04 | 0x04", "sil", "0x03"],
            ["lst +1", "0x07 | 0x07", "r10", "0x0000000000000000"],
            ["lst +0", "0x02 | 0x02", "", ""],
          ]}
        />
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h5 className="font-bold text-blue-900 mb-3">Key Observations:</h5>
        <ul className="list-disc ml-6 space-y-2 text-blue-800">
          <li>
            <strong>Function parameters:</strong> Passed via registers following calling convention
            (rdi, rsi, rdx, rcx)
          </li>
          <li>
            <strong>Backward iteration:</strong> Loop starts at index (len-1) and decrements to 0,
            using formula [rdi+r10-1]
          </li>
          <li>
            <strong>Final ah (0x01):</strong> Remainder from division 13÷3
          </li>
          <li>
            <strong>Final al (0x04):</strong> Quotient/average from division 13÷3
          </li>
          <li>
            <strong>Final sil (0x03):</strong> Lower byte of rsi, unchanged (divisor value)
          </li>
          <li>
            <strong>Final r10 (0x0000000000000000):</strong> Loop counter decremented to 0
          </li>
          <li>
            <strong>Array unchanged:</strong> lst remains [2, 7, 4] - only read operations performed
          </li>
        </ul>
      </div>
    </CollapsibleSection>
  </div>
);

export default AlternateProblem5;
