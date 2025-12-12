import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";
import HexConversion from "../shared/HexConversion";

const AlternateProblem4 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Alternate Problem 4: Decimal to ASCII String Conversion
    </h3>

    <KeyConcepts
      title="Key Concepts:"
      concepts={[
        "Division operation (div) with word-sized registers",
        "Decimal to ASCII character conversion",
        "Right-to-left digit extraction using division by 10",
        "Mixed register sizes (16-bit and 64-bit)",
        "Sign extension and negative counter values",
      ]}
    />

    <CodeBlock
      code={`section .data
    number dw 756       ;number = 756 = 0x02F4
    ascii db "000", 0x0A

section .text
global _start
_start:
    mov rcx, 2
    mov ax, word[number]
    mov bx, 10
next:
    mov dx, 0
    div bx
    add byte[ascii+rcx], dl
    dec rcx
    cmp rcx, 0
    jge next
done:
    mov rax, 60
    mov rdi, 0
    syscall`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="alt-p4-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <HexConversion
          decimal={756}
          hex="0x02F4"
          steps={[
            { dividend: 756, remainder: "4", note: "Least significant digit" },
            { dividend: 47, remainder: "15 (F)", note: "Next digit" },
            { dividend: 2, remainder: "2", note: "Most significant digit" },
          ]}
          verification="2×16² + 15×16¹ + 4×16⁰ = 512 + 240 + 4 = 756 ✓"
        />

        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">ASCII Character Values:</h5>
          <div className="bg-white p-3 rounded">
            <p className="font-semibold mb-2">ASCII codes for digits:</p>
            <ul className="text-sm space-y-1 ml-4">
              <li>'0' = 0x30 (48 decimal)</li>
              <li>'1' = 0x31 (49 decimal)</li>
              <li>'5' = 0x35 (53 decimal)</li>
              <li>'6' = 0x36 (54 decimal)</li>
              <li>'7' = 0x37 (55 decimal)</li>
            </ul>
            <p className="text-blue-700 font-semibold mt-3">
              To convert digit to ASCII: digit + 0x30
            </p>
          </div>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="alt-p4-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-bold text-blue-900 mb-2">Initial State:</h5>
          <ul className="list-disc ml-6 text-blue-800">
            <li>number = 756 (0x02F4)</li>
            <li>ascii = "000\n" (0x30, 0x30, 0x30, 0x0A)</li>
          </ul>
        </div>

        <ol className="list-decimal ml-6 space-y-3">
          <li>
            <strong>mov rcx, 2:</strong> rcx = 0x0000000000000002 (start at rightmost digit
            position)
          </li>
          <li>
            <strong>mov ax, word[number]:</strong> ax = 0x02F4 (756 decimal)
          </li>
          <li>
            <strong>mov bx, 10:</strong> bx = 0x000A (divisor for extracting decimal digits)
          </li>

          <li>
            <strong>Iteration 1 (rcx = 2):</strong>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>mov dx, 0 → dx = 0x0000 (clear upper bits for division)</li>
              <li>div bx → dx:ax ÷ bx = 0x0000:0x02F4 ÷ 10 = 756 ÷ 10</li>
              <li className="ml-4">→ ax = 75 = 0x004B (quotient)</li>
              <li className="ml-4">→ dx = 6 = 0x0006 (remainder, rightmost digit)</li>
              <li>add byte[ascii+2], dl → ascii[2] = 0x30 + 0x06 = 0x36 ('6')</li>
              <li>dec rcx → rcx = 1</li>
              <li>cmp rcx, 0 → 1 ≥ 0? TRUE</li>
              <li>jge next → Jump back to next</li>
            </ul>
          </li>

          <li>
            <strong>Iteration 2 (rcx = 1):</strong>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>mov dx, 0 → dx = 0x0000</li>
              <li>div bx → dx:ax ÷ bx = 0x0000:0x004B ÷ 10 = 75 ÷ 10</li>
              <li className="ml-4">→ ax = 7 = 0x0007 (quotient)</li>
              <li className="ml-4">→ dx = 5 = 0x0005 (remainder, middle digit)</li>
              <li>add byte[ascii+1], dl → ascii[1] = 0x30 + 0x05 = 0x35 ('5')</li>
              <li>dec rcx → rcx = 0</li>
              <li>cmp rcx, 0 → 0 ≥ 0? TRUE</li>
              <li>jge next → Jump back to next</li>
            </ul>
          </li>

          <li>
            <strong>Iteration 3 (rcx = 0):</strong>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>mov dx, 0 → dx = 0x0000</li>
              <li>div bx → dx:ax ÷ bx = 0x0000:0x0007 ÷ 10 = 7 ÷ 10</li>
              <li className="ml-4">→ ax = 0 = 0x0000 (quotient)</li>
              <li className="ml-4">→ dx = 7 = 0x0007 (remainder, leftmost digit)</li>
              <li>add byte[ascii+0], dl → ascii[0] = 0x30 + 0x07 = 0x37 ('7')</li>
              <li>dec rcx → rcx = -1 = 0xFFFFFFFFFFFFFFFF (unsigned underflow)</li>
              <li>cmp rcx, 0 → -1 ≥ 0? FALSE (signed comparison)</li>
              <li>jge next → Don't jump, exit loop</li>
            </ul>
          </li>
        </ol>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-green-900 mb-2">Summary:</p>
          <p className="text-green-800">
            The program extracts decimal digits from right to left using repeated division by 10.
            Each remainder is a digit (0-9), which is converted to ASCII by adding 0x30. The digits
            are stored in reverse order in the ascii array.
          </p>
          <p className="text-green-800 mt-2">756 → digits extracted: 6, 5, 7 → stored: "756"</p>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="alt-p4-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="font-semibold text-yellow-900">Important Note:</p>
        <p className="text-yellow-800 mt-2">
          Memory is stored in <strong>little-endian</strong> format. The word value 0x02F4 is stored
          with the least significant byte (0xF4) at number+0 and most significant byte (0x02) at
          number+1.
        </p>
      </div>

      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory Offset", "Value (Hex)"]}
        rows={[
          ["", "before (initial) | after execution"],
          ["ascii +3", "0x0A | 0x0A"],
          ["ascii +2", "0x30 | 0x36"],
          ["ascii +1", "0x30 | 0x35"],
          ["ascii +0", "0x30 | 0x37"],
          ["number +1", "0x02 | 0x02"],
          ["number +0", "0xF4 | 0xF4"],
        ]}
      />

      <h4 className="font-semibold text-lg mb-3 mt-6">Register State (Full register sizes):</h4>
      <Table
        headers={["Register", "Size", "Value (Hex)"]}
        rows={[
          ["ax", "16-bit", "0x0000"],
          ["bx", "16-bit", "0x000A"],
          ["rcx", "64-bit", "0xFFFFFFFFFFFFFFFF"],
          ["dx", "16-bit", "0x0007"],
        ]}
      />

      <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
        <h5 className="font-bold text-green-900 mb-3">Complete Answer Table (24 points):</h5>
        <Table
          headers={["Memory Offset", "Value (Hex)", "Register", "Value (Hex)"]}
          rows={[
            ["", "before | after", "", ""],
            ["ascii +3", "0x0A | 0x0A", "ax", "0x0000"],
            ["ascii +2", "0x30 | 0x36", "bx", "0x000A"],
            ["ascii +1", "0x30 | 0x35", "rcx", "0xFFFFFFFFFFFFFFFF"],
            ["ascii +0", "0x30 | 0x37", "dx", "0x0007"],
            ["number +1", "0x02 | 0x02", "", ""],
            ["number +0", "0xF4 | 0xF4", "", ""],
          ]}
        />
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h5 className="font-bold text-blue-900 mb-3">Key Observations:</h5>
        <ul className="list-disc ml-6 space-y-2 text-blue-800">
          <li>
            <strong>div bx:</strong> Divides dx:ax by bx, storing quotient in ax and remainder in dx
          </li>
          <li>
            <strong>Digit extraction:</strong> Each division by 10 extracts the rightmost digit as
            the remainder
          </li>
          <li>
            <strong>ASCII conversion:</strong> Adding 0x30 to a digit (0-9) converts it to ASCII
            ('0'-'9')
          </li>
          <li>
            <strong>Final ax (0x0000):</strong> After extracting all digits, quotient becomes 0
          </li>
          <li>
            <strong>Final dx (0x0007):</strong> Last remainder (leftmost digit 7)
          </li>
          <li>
            <strong>Final rcx (0xFFFFFFFFFFFFFFFF):</strong> Decremented from 0 to -1 (signed
            interpretation). In unsigned 64-bit, this is the maximum value.
          </li>
          <li>
            <strong>Result string:</strong> ascii = "756\n" (0x37='7', 0x35='5', 0x36='6',
            0x0A=newline)
          </li>
        </ul>
      </div>
    </CollapsibleSection>
  </div>
);

export default AlternateProblem4;
