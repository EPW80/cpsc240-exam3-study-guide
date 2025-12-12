import React from "react";
import { CodeBlock, Table, CollapsibleSection, KeyConcepts, HexConversion } from "../shared";

const Problem2 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Problem 2: Division and Loop with Counter
    </h3>

    <KeyConcepts
      concepts={[
        "Loop counter with cmp and jle",
        "Division (div) - quotient in rax, remainder in rdx",
        "Byte addressing ([result + mul3])",
      ]}
    />

    <CodeBlock
      code={`section .data
      num1 dq 7     ; num1 = 7 = 0x0000000000000007
      result db 0, 0, 0, 0, 0
      mul3 dq 0     ; mul3 = 0

      section .text
      _start:
          mov rcx, 0          ; rcx = 0
      A:  cmp rcx, 2          ; Compare rcx with 2
          jg done             ; Jump if rcx > 2
          mov rax, qword[num1] ; rax = 0x0000000000000007
          xor rdx, rdx        ; rdx = 0
          mov rbx, 3          ; rbx = 3
          div rbx             ; rax = 0x2, rdx = 0x1
          mov qword[mul3], rcx ; Store counter value
          mov r8, qword[mul3]  ; r8 = counter value
          mov byte[result + r8], al ; Store quotient
          inc rcx             ; rcx++
          jmp A               ; Loop back
      done:`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="p2-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <HexConversion
          decimal={7}
          hex="0x0000000000000007"
          steps={[{ dividend: 7, remainder: "7" }]}
          verification="7×16⁰ = 7 ✓"
        />

        <HexConversion
          decimal={2}
          hex="0x0000000000000002"
          steps={[{ dividend: 2, remainder: "2" }]}
          verification="2×16⁰ = 2 ✓"
        />
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Loop Iterations"
      id="p2-iterations"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-900 mb-2">Iteration 1 (rcx = 0):</h4>
          <ul className="list-disc ml-6">
            <li>cmp rcx, 2 → 0 ≤ 2, continue</li>
            <li>rax = 7, rdx = 0</li>
            <li>div rbx (7 ÷ 3): rax = 2, rdx = 1</li>
            <li>mul3 = 0 (store counter)</li>
            <li>result[0] = 0x02 (quotient)</li>
            <li>rcx = 1</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-900 mb-2">Iteration 2 (rcx = 1):</h4>
          <ul className="list-disc ml-6">
            <li>cmp rcx, 2 → 1 ≤ 2, continue</li>
            <li>rax = 7, rdx = 0</li>
            <li>div rbx (7 ÷ 3): rax = 2, rdx = 1</li>
            <li>mul3 = 1 (store counter)</li>
            <li>result[1] = 0x02 (quotient)</li>
            <li>rcx = 2</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-900 mb-2">Iteration 3 (rcx = 2):</h4>
          <ul className="list-disc ml-6">
            <li>cmp rcx, 2 → 2 ≤ 2, continue</li>
            <li>rax = 7, rdx = 0</li>
            <li>div rbx (7 ÷ 3): rax = 2, rdx = 1</li>
            <li>mul3 = 2 (store counter)</li>
            <li>result[2] = 0x02 (quotient)</li>
            <li>rcx = 3</li>
          </ul>
        </div>

        <div className="bg-red-50 p-4 rounded border-2 border-red-300">
          <h4 className="font-bold text-red-900 mb-2">Loop Exit:</h4>
          <ul className="list-disc ml-6">
            <li>cmp rcx, 2 → 3 &gt; 2</li>
            <li>jg done → Jump taken</li>
            <li>Loop terminates</li>
          </ul>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Understanding Why mul3 = 2"
      id="p2-mul3"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg">
        <h4 className="font-bold text-yellow-900 text-lg mb-4">🔍 Why is mul3 = 2 at the end?</h4>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <p className="font-semibold text-yellow-900 mb-2">Key Insight:</p>
            <p className="text-gray-700">
              <code className="bg-yellow-100 px-2 py-1 rounded">mul3</code> stores the loop counter
              value (<code className="bg-yellow-100 px-2 py-1 rounded">rcx</code>) during{" "}
              <strong>each iteration</strong>. The final value represents the counter from the{" "}
              <strong>last successful iteration</strong>.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <p className="font-semibold text-yellow-900 mb-3">Step-by-Step Breakdown:</p>
            <div className="space-y-3">
              <div className="border-l-4 border-green-400 pl-4">
                <p className="font-semibold text-green-700">Iteration 1 (rcx = 0):</p>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-1 rounded">mov qword[mul3], rcx</code> → mul3 =
                    0
                  </li>
                  <li>Counter increments: rcx = 1</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <p className="font-semibold text-blue-700">Iteration 2 (rcx = 1):</p>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-1 rounded">mov qword[mul3], rcx</code> → mul3 =
                    1
                  </li>
                  <li>Counter increments: rcx = 2</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <p className="font-semibold text-purple-700">Iteration 3 (rcx = 2):</p>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-1 rounded">mov qword[mul3], rcx</code> →{" "}
                    <strong>mul3 = 2</strong>
                  </li>
                  <li>Counter increments: rcx = 3</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-400 pl-4">
                <p className="font-semibold text-red-700">Loop Exit:</p>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  <li>rcx = 3</li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded">cmp rcx, 2</code> → 3 &gt; 2
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded">jg done</code> → Exit loop
                  </li>
                  <li>
                    <strong>mul3 remains 2</strong> (not updated again)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
            <p className="font-bold text-green-900 mb-2">✅ Answer:</p>
            <p className="text-gray-700">
              <code className="bg-white px-2 py-1 rounded font-semibold">mul3 = 2</code> because it
              was written during the third iteration (when{" "}
              <code className="bg-white px-1 rounded">rcx = 2</code>), and the loop exited
              immediately after incrementing <code className="bg-white px-1 rounded">rcx</code> to
              3. The instruction <code className="bg-white px-1 rounded">mov qword[mul3], rcx</code>{" "}
              is <strong>not executed</strong> during the exit check, so mul3 retains the value from
              the last complete iteration.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
            <p className="font-semibold text-blue-900 mb-2">📝 Important Note:</p>
            <p className="text-sm text-gray-700">
              The value of <code className="bg-white px-1 rounded">mul3</code> is stored{" "}
              <strong>before</strong> incrementing{" "}
              <code className="bg-white px-1 rounded">rcx</code>, so it always reflects the counter
              value at the <strong>start</strong> of each iteration, not the incremented value.
            </p>
          </div>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="p2-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory", "Offset", "Before", "After"]}
        rows={[
          ["mul3", "+7", "0x00", "0x00"],
          ["mul3", "+6", "0x00", "0x00"],
          ["mul3", "+5", "0x00", "0x00"],
          ["mul3", "+4", "0x00", "0x00"],
          ["mul3", "+3", "0x00", "0x00"],
          ["mul3", "+2", "0x00", "0x00"],
          ["mul3", "+1", "0x00", "0x00"],
          ["mul3", "+0", "0x00", "0x02"],
          ["result", "+4", "0x00", "0x00"],
          ["result", "+3", "0x00", "0x00"],
          ["result", "+2", "0x00", "0x02"],
          ["result", "+1", "0x00", "0x02"],
          ["result", "+0", "0x00", "0x02"],
          ["num1", "+7", "0x00", "0x00"],
          ["num1", "+6", "0x00", "0x00"],
          ["num1", "+5", "0x00", "0x00"],
          ["num1", "+4", "0x00", "0x00"],
          ["num1", "+3", "0x00", "0x00"],
          ["num1", "+2", "0x00", "0x00"],
          ["num1", "+1", "0x00", "0x00"],
          ["num1", "+0", "0x07", "0x07"],
        ]}
      />
      <h4 className="font-semibold text-lg mb-3 mt-6">Register State:</h4>
      <Table
        headers={["Register", "Value (Hex)", "Description"]}
        rows={[
          ["rax", "0x0000000000000002", "Quotient (2)"],
          ["rbx", "0x0000000000000003", "Divisor (3)"],
          ["rcx", "0x0000000000000003", "Loop counter (3)"],
          ["rdx", "0x0000000000000001", "Remainder (1)"],
          ["r8", "0x0000000000000002", "Copy of mul3 (2)"],
        ]}
      />
    </CollapsibleSection>
  </div>
);

export default Problem2;
