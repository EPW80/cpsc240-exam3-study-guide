import { CodeBlock, CollapsibleSection, Table, KeyConcepts } from "../shared";

const AlternateProblem8 = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-purple-700">
        Alternate Problem 8: ASCII to Numeric Conversion
      </h3>

      <KeyConcepts
        title="Key Concepts"
        items={[
          "ASCII digit to numeric conversion (subtract 0x30)",
          "Byte operations on array elements",
          "Register size awareness (8-bit, 16-bit, 32-bit, 64-bit)",
          "Loop with counter and array indexing",
        ]}
      />

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <p className="font-semibold text-blue-900">Question:</p>
        <p className="text-blue-800 mt-2">
          What will be in the <code>rsi</code> register after execution?
        </p>
        <p className="text-blue-800 mt-2">
          What is in <code>lst</code> array before execution and after execution until the label{" "}
          <code>_stop</code>?
        </p>
        <p className="text-blue-800 mt-2 font-semibold">
          Show answer in hex, full register size. Note: pay close attention to the register sizes
          (8-bit, 16-bit, 32-bit, or 64-bit).
        </p>
      </div>

      <CodeBlock
        code={`section .data
    lst db '2', '7', '5', '3', '8'
    len dq 5

section .text
global _start
_start:
    mov rdi, lst            ; rdi = address of lst array
    mov rsi, qword[len]     ; rsi = 5 (length)
    call sub4
_stop:
    mov rax, 60             ; exit syscall
    mov rdi, 0
    syscall

global sub4
sub4:
    mov r10, 0              ; r10 = 0 (counter)
next:
    sub byte[rdi+r10], 0x30 ; Convert ASCII to numeric
    inc r10                 ; r10++
    cmp r10, rsi            ; r10 == rsi?
    jne next                ; if not equal, loop
    ret`}
      />

      <CollapsibleSection title="Understanding ASCII Conversion" id="alt8-ascii">
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-bold text-purple-900 mb-2">ASCII Digit Values</h5>
            <p className="text-sm mb-2">
              In ASCII, digit characters '0'-'9' have values 0x30-0x39:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>'0' = 0x30, '1' = 0x31, '2' = 0x32, '3' = 0x33, '4' = 0x34</li>
              <li>'5' = 0x35, '6' = 0x36, '7' = 0x37, '8' = 0x38, '9' = 0x39</li>
            </ul>
            <p className="text-sm mt-3 font-semibold text-purple-800">
              To convert ASCII digit to numeric value: subtract 0x30
            </p>
            <p className="text-sm mt-1">Example: '7' (0x37) - 0x30 = 0x07 (numeric 7)</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Step-by-Step Execution" id="alt8-steps">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border-2 border-blue-300">
            <h5 className="font-bold mb-2">Initial State:</h5>
            <ul className="text-sm space-y-1 ml-4">
              <li>
                <code>lst</code> array contains ASCII characters: '2', '7', '5', '3', '8'
              </li>
              <li>In hex: 0x32, 0x37, 0x35, 0x33, 0x38</li>
              <li>
                <code>len</code> = 5 (stored as quadword)
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded border-2 border-green-300">
            <h5 className="font-bold mb-2">_start execution:</h5>
            <ol className="text-sm space-y-1 ml-4 list-decimal">
              <li>
                <code>mov rdi, lst</code> → rdi = address of lst array
              </li>
              <li>
                <code>mov rsi, qword[len]</code> → rsi = 0x0000000000000005
              </li>
              <li>
                <code>call sub4</code> → calls the conversion subroutine
              </li>
            </ol>
          </div>

          <div className="bg-white p-4 rounded border-2 border-purple-300">
            <h5 className="font-bold mb-2">sub4 execution (loop):</h5>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Iteration 1 (r10 = 0):</p>
              <ul className="ml-4 space-y-1">
                <li>
                  <code>sub byte[rdi+0], 0x30</code> → lst[0]: 0x32 - 0x30 = 0x02
                </li>
                <li>
                  <code>inc r10</code> → r10 = 1
                </li>
                <li>
                  <code>cmp r10, rsi</code> → 1 != 5, loop continues
                </li>
              </ul>

              <p className="font-semibold mt-2">Iteration 2 (r10 = 1):</p>
              <ul className="ml-4 space-y-1">
                <li>
                  <code>sub byte[rdi+1], 0x30</code> → lst[1]: 0x37 - 0x30 = 0x07
                </li>
                <li>
                  <code>inc r10</code> → r10 = 2
                </li>
                <li>
                  <code>cmp r10, rsi</code> → 2 != 5, loop continues
                </li>
              </ul>

              <p className="font-semibold mt-2">Iteration 3 (r10 = 2):</p>
              <ul className="ml-4 space-y-1">
                <li>
                  <code>sub byte[rdi+2], 0x30</code> → lst[2]: 0x35 - 0x30 = 0x05
                </li>
                <li>
                  <code>inc r10</code> → r10 = 3
                </li>
                <li>
                  <code>cmp r10, rsi</code> → 3 != 5, loop continues
                </li>
              </ul>

              <p className="font-semibold mt-2">Iteration 4 (r10 = 3):</p>
              <ul className="ml-4 space-y-1">
                <li>
                  <code>sub byte[rdi+3], 0x30</code> → lst[3]: 0x33 - 0x30 = 0x03
                </li>
                <li>
                  <code>inc r10</code> → r10 = 4
                </li>
                <li>
                  <code>cmp r10, rsi</code> → 4 != 5, loop continues
                </li>
              </ul>

              <p className="font-semibold mt-2">Iteration 5 (r10 = 4):</p>
              <ul className="ml-4 space-y-1">
                <li>
                  <code>sub byte[rdi+4], 0x30</code> → lst[4]: 0x38 - 0x30 = 0x08
                </li>
                <li>
                  <code>inc r10</code> → r10 = 5
                </li>
                <li>
                  <code>cmp r10, rsi</code> → 5 == 5, exit loop
                </li>
              </ul>

              <p className="font-semibold mt-2">Return:</p>
              <ul className="ml-4 space-y-1">
                <li>
                  <code>ret</code> → returns to _stop label
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Final Answer" id="alt8-answer">
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
            <h5 className="font-bold text-green-900 mb-3">Register State After Execution:</h5>
            <Table
              headers={["Register", "Value (Hex)", "Description"]}
              rows={[["rsi", "0x0000000000000005", "Length (unchanged, 64-bit quadword)"]]}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-400">
            <h5 className="font-bold text-blue-900 mb-3">Memory State (lst array):</h5>
            <Table
              headers={[
                "Memory",
                "Offset",
                "Before (ASCII)",
                "Before (Hex)",
                "After (Hex)",
                "After (Decimal)",
              ]}
              rows={[
                ["lst", "+4", "'8'", "0x38", "0x08", "8"],
                ["lst", "+3", "'3'", "0x33", "0x03", "3"],
                ["lst", "+2", "'5'", "0x35", "0x05", "5"],
                ["lst", "+1", "'7'", "0x37", "0x07", "7"],
                ["lst", "+0", "'2'", "0x32", "0x02", "2"],
              ]}
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
            <h5 className="font-bold text-yellow-900 mb-3">Key Points to Remember:</h5>
            <ul className="text-sm space-y-2 ml-4 list-disc">
              <li>
                <strong>rsi is 64-bit:</strong> Full register value is 0x0000000000000005 (not just
                0x05)
              </li>
              <li>
                <strong>Array elements are bytes:</strong> Each element is 8-bit (1 byte)
              </li>
              <li>
                <strong>ASCII conversion:</strong> Subtracting 0x30 from ASCII digit gives numeric
                value
              </li>
              <li>
                <strong>rsi unchanged:</strong> The subroutine doesn't modify rsi, only uses it for
                comparison
              </li>
              <li>
                <strong>byte operation:</strong> <code>sub byte[rdi+r10], 0x30</code> operates on
                single bytes
              </li>
              <li>
                <strong>Memory layout:</strong> Array is stored in order from lowest to highest
                offset
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-400">
            <h5 className="font-bold text-purple-900 mb-3">Summary:</h5>
            <p className="text-sm mb-2">
              <strong>Question 1: What will be in rsi after execution?</strong>
            </p>
            <p className="text-sm font-mono bg-white p-2 rounded mb-3">rsi = 0x0000000000000005</p>

            <p className="text-sm mb-2">
              <strong>Question 2: What is in lst array?</strong>
            </p>
            <div className="text-sm font-mono bg-white p-2 rounded">
              <p>Before: 0x32 0x37 0x35 0x33 0x38 (ASCII: '2' '7' '5' '3' '8')</p>
              <p>After: 0x02 0x07 0x05 0x03 0x08 (Numeric: 2 7 5 3 8)</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default AlternateProblem8;
