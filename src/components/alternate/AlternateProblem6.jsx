import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";

const AlternateProblem6 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Alternate Problem 6: Macro-Based Sequential Sum Calculator
    </h3>

    <KeyConcepts
      title="Key Concepts:"
      concepts={[
        "Assembly macros with parameters (%macro)",
        "Local labels within macros (%%next)",
        "LEA (Load Effective Address) instruction",
        "Sequential sum calculation (1+2+3+...+n)",
        "Loop with indexed array access",
        "Byte-sized comparisons (jbe - jump if below or equal)",
      ]}
    />

    <CodeBlock
      code={`%macro compute 2
 mov al, 0
 mov cl, 1
%%next:
 add al, cl
 inc cl
 cmp cl, byte[%1]
 jbe %%next
 mov byte[%2], al
%endmacro

section .data
n db 2, 3, 4

section .bss
sum resb 3

section .text
global _start
_start:
 mov r10, 0
doLoop:
 lea rsi, byte[n + r10]
 lea rdi, byte[sum + r10]
 compute rsi, rdi
 inc r10
 cmp r10, 3
 jl doLoop
_stop:
 mov rax, 60
 mov rdi, 0
 syscall`}
    />

    <CollapsibleSection
      title="Understanding Macros"
      id="alt-p6-macros"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">What is a Macro?</h5>
          <div className="bg-white p-3 rounded">
            <p className="text-sm mb-2">
              A macro is a preprocessor feature that allows code reuse by defining a template that
              gets expanded at assembly time.
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>
                <strong>%macro compute 2:</strong> Defines macro named "compute" with 2 parameters
              </li>
              <li>
                <strong>%1, %2:</strong> Parameter placeholders (1st and 2nd arguments)
              </li>
              <li>
                <strong>%%next:</strong> Local label (unique to each macro invocation)
              </li>
              <li>
                <strong>%endmacro:</strong> Ends the macro definition
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">Macro Functionality:</h5>
          <div className="bg-white p-3 rounded">
            <p className="text-sm mb-2">
              The <code>compute</code> macro calculates the sum 1+2+3+...+n where n = byte[%1]:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>For n=2: 1+2 = 3</li>
              <li>For n=3: 1+2+3 = 6</li>
              <li>For n=4: 1+2+3+4 = 10</li>
            </ul>
          </div>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="alt-p6-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-bold text-blue-900 mb-2">Initial State:</h5>
          <ul className="list-disc ml-6 text-blue-800">
            <li>n = [2, 3, 4] = [0x02, 0x03, 0x04]</li>
            <li>sum = [0x00, 0x00, 0x00] (uninitialized .bss)</li>
          </ul>
        </div>

        <h5 className="font-bold text-lg mt-4">Main Loop Setup</h5>
        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <strong>mov r10, 0:</strong> r10 = 0 (loop counter/index)
          </li>
        </ol>

        <h5 className="font-bold text-lg mt-6">Iteration 1 (r10 = 0, computing sum[0])</h5>
        <ol className="list-decimal ml-6 space-y-2" start="2">
          <li>
            <strong>lea rsi, byte[n + r10]:</strong> rsi = address of n[0]
          </li>
          <li>
            <strong>lea rdi, byte[sum + r10]:</strong> rdi = address of sum[0]
          </li>
          <li>
            <strong>compute rsi, rdi</strong> expands to compute sum from 1 to n[0]=2:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>mov al, 0 → al = 0</li>
              <li>mov cl, 1 → cl = 1</li>
              <li className="font-semibold">Loop iteration 1:</li>
              <li className="ml-4">add al, cl → al = 0 + 1 = 1</li>
              <li className="ml-4">inc cl → cl = 2</li>
              <li className="ml-4">cmp cl, byte[rsi] → cmp 2, 2</li>
              <li className="ml-4">jbe %%next → 2 ≤ 2? TRUE, jump</li>
              <li className="font-semibold">Loop iteration 2:</li>
              <li className="ml-4">add al, cl → al = 1 + 2 = 3</li>
              <li className="ml-4">inc cl → cl = 3</li>
              <li className="ml-4">cmp cl, byte[rsi] → cmp 3, 2</li>
              <li className="ml-4">jbe %%next → 3 ≤ 2? FALSE, exit loop</li>
              <li>mov byte[rdi], al → sum[0] = 3 = 0x03</li>
            </ul>
          </li>
          <li>
            <strong>inc r10:</strong> r10 = 1
          </li>
          <li>
            <strong>cmp r10, 3:</strong> 1 &lt; 3? TRUE
          </li>
          <li>
            <strong>jl doLoop:</strong> Jump back
          </li>
        </ol>

        <h5 className="font-bold text-lg mt-6">Iteration 2 (r10 = 1, computing sum[1])</h5>
        <ol className="list-decimal ml-6 space-y-2" start="9">
          <li>
            <strong>lea rsi, byte[n + r10]:</strong> rsi = address of n[1]
          </li>
          <li>
            <strong>lea rdi, byte[sum + r10]:</strong> rdi = address of sum[1]
          </li>
          <li>
            <strong>compute rsi, rdi</strong> expands to compute sum from 1 to n[1]=3:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>mov al, 0 → al = 0</li>
              <li>mov cl, 1 → cl = 1</li>
              <li className="font-semibold">Loop iterations: cl=1,2,3</li>
              <li className="ml-4">al = 0+1 = 1 (cl=1→2)</li>
              <li className="ml-4">al = 1+2 = 3 (cl=2→3)</li>
              <li className="ml-4">al = 3+3 = 6 (cl=3→4)</li>
              <li className="ml-4">cmp 4, 3 → exit loop</li>
              <li>mov byte[rdi], al → sum[1] = 6 = 0x06</li>
            </ul>
          </li>
          <li>
            <strong>inc r10:</strong> r10 = 2
          </li>
          <li>
            <strong>cmp r10, 3:</strong> 2 &lt; 3? TRUE
          </li>
          <li>
            <strong>jl doLoop:</strong> Jump back
          </li>
        </ol>

        <h5 className="font-bold text-lg mt-6">Iteration 3 (r10 = 2, computing sum[2])</h5>
        <ol className="list-decimal ml-6 space-y-2" start="15">
          <li>
            <strong>lea rsi, byte[n + r10]:</strong> rsi = address of n[2]
          </li>
          <li>
            <strong>lea rdi, byte[sum + r10]:</strong> rdi = address of sum[2]
          </li>
          <li>
            <strong>compute rsi, rdi</strong> expands to compute sum from 1 to n[2]=4:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>mov al, 0 → al = 0</li>
              <li>mov cl, 1 → cl = 1</li>
              <li className="font-semibold">Loop iterations: cl=1,2,3,4</li>
              <li className="ml-4">al = 0+1 = 1 (cl=1→2)</li>
              <li className="ml-4">al = 1+2 = 3 (cl=2→3)</li>
              <li className="ml-4">al = 3+3 = 6 (cl=3→4)</li>
              <li className="ml-4">al = 6+4 = 10 = 0x0A (cl=4→5)</li>
              <li className="ml-4">cmp 5, 4 → exit loop</li>
              <li>mov byte[rdi], al → sum[2] = 10 = 0x0A</li>
            </ul>
          </li>
          <li>
            <strong>inc r10:</strong> r10 = 3
          </li>
          <li>
            <strong>cmp r10, 3:</strong> 3 &lt; 3? FALSE
          </li>
          <li>
            <strong>jl doLoop:</strong> Don't jump, exit to _stop
          </li>
        </ol>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-green-900 mb-2">Summary:</p>
          <p className="text-green-800">
            The program uses a macro to calculate sequential sums for each element in array n. For
            each n[i], it computes 1+2+3+...+n[i] and stores the result in sum[i].
          </p>
          <ul className="list-disc ml-6 mt-2 text-green-800">
            <li>sum[0] = 1+2 = 3 (for n[0]=2)</li>
            <li>sum[1] = 1+2+3 = 6 (for n[1]=3)</li>
            <li>sum[2] = 1+2+3+4 = 10 (for n[2]=4)</li>
          </ul>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="alt-p6-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="font-semibold text-yellow-900">Important Notes:</p>
        <ul className="list-disc ml-6 mt-2 text-yellow-800">
          <li>
            <strong>Macro expansion:</strong> Each "compute rsi, rdi" call is replaced by the macro
            code with %1=rsi and %2=rdi
          </li>
          <li>
            <strong>Local labels (%%next):</strong> Each macro invocation gets a unique label to
            avoid conflicts
          </li>
          <li>
            <strong>LEA instruction:</strong> Loads the effective address (pointer) without
            dereferencing
          </li>
          <li>
            <strong>Final cl value (0x05):</strong> From the last macro execution (sum to 4, cl
            incremented to 5)
          </li>
        </ul>
      </div>

      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory Offset", "Value (Hex)"]}
        rows={[
          ["", "before (initial) | after execution"],
          ["sum +2", "0x00 | 0x0A"],
          ["sum +1", "0x00 | 0x06"],
          ["sum +0", "0x00 | 0x03"],
          ["n +2", "0x04 | 0x04"],
          ["n +1", "0x03 | 0x03"],
          ["n +0", "0x02 | 0x02"],
        ]}
      />

      <h4 className="font-semibold text-lg mb-3 mt-6">Register State:</h4>
      <Table headers={["Register", "Size", "Value (Hex)"]} rows={[["cl", "8-bit", "0x05"]]} />

      <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
        <h5 className="font-bold text-green-900 mb-3">Complete Answer Table (26 points):</h5>
        <Table
          headers={["Memory Offset", "Value (Hex)", "Register", "Value (Hex)"]}
          rows={[
            ["", "before | after", "", ""],
            ["sum +2", "0x00 | 0x0A", "cl", "0x05"],
            ["sum +1", "0x00 | 0x06", "", ""],
            ["sum +0", "0x00 | 0x03", "", ""],
            ["n +2", "0x04 | 0x04", "", ""],
            ["n +1", "0x03 | 0x03", "", ""],
            ["n +0", "0x02 | 0x02", "", ""],
          ]}
        />
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h5 className="font-bold text-blue-900 mb-3">Key Observations:</h5>
        <ul className="list-disc ml-6 space-y-2 text-blue-800">
          <li>
            <strong>Macro benefits:</strong> Code reuse - the same summation logic is used 3 times
            without duplicating code
          </li>
          <li>
            <strong>Sequential sum formula:</strong> Sum of 1 to n = n(n+1)/2, but here computed
            iteratively
          </li>
          <li>
            <strong>jbe (jump if below or equal):</strong> Unsigned comparison, continues while cl ≤
            n[i]
          </li>
          <li>
            <strong>Final cl (0x05):</strong> Result of last increment in third macro call (4→5)
          </li>
          <li>
            <strong>Array n unchanged:</strong> Only read operations performed, no modifications
          </li>
          <li>
            <strong>Results verification:</strong>
            <ul className="ml-6 mt-1">
              <li>sum[0] = 1+2 = 3 ✓</li>
              <li>sum[1] = 1+2+3 = 6 ✓</li>
              <li>sum[2] = 1+2+3+4 = 10 = 0x0A ✓</li>
            </ul>
          </li>
        </ul>
      </div>
    </CollapsibleSection>
  </div>
);

export default AlternateProblem6;
