import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";
import HexConversion from "../shared/HexConversion";

const AlternateProblem1 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Alternate Problem 1: Addition and Multiplication
    </h3>

    <KeyConcepts
      concepts={[
        "Word-sized operations (16-bit registers)",
        "Addition operation with ax register",
        "Multiplication operation with mul instruction",
        "Little-endian memory layout",
      ]}
    />

    <CodeBlock
      code={`section .data
    num1 dw 85          ;num1 = 85 = 0x0055
    num2 dw 72          ;num2 = 72 = 0x0048
    result dw 0         ;result = 0 = 0x0000

section .text
global _start
_start:
    mov ax, word[num1]  ;ax = 0x0055 = 85
    add ax, word[num2]  ;ax = 0x0055 + 0x0048 = 0x009D = 157
    mov bx, 15          ;bx = 0x000F = 15
    mul bx              ;dx:ax = ax * bx = 157 * 15 = 2355 = 0x0933
                        ;ax = 0x0933 (low word), dx = 0x0000 (high word)
    mov word[result], ax ;result = 0x0933 = 2355
done:
    mov rax, 60
    mov rdi, 0
    syscall`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="alt-p1-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <HexConversion
          decimal={85}
          hex="0x0055"
          steps={[
            { dividend: 85, remainder: "5", note: "Least significant digit" },
            { dividend: 5, remainder: "5", note: "Most significant digit" },
          ]}
          verification="5×16¹ + 5×16⁰ = 80 + 5 = 85 ✓"
        />

        <HexConversion
          decimal={72}
          hex="0x0048"
          steps={[
            { dividend: 72, remainder: "8", note: "Least significant digit" },
            { dividend: 4, remainder: "4", note: "Most significant digit" },
          ]}
          verification="4×16¹ + 8×16⁰ = 64 + 8 = 72 ✓"
        />

        <HexConversion
          decimal={157}
          hex="0x009D"
          steps={[
            { dividend: 157, remainder: "13 (D)", note: "Least significant digit" },
            { dividend: 9, remainder: "9", note: "Most significant digit" },
          ]}
          verification="9×16¹ + 13×16⁰ = 144 + 13 = 157 ✓"
        />

        <HexConversion
          decimal={2355}
          hex="0x0933"
          steps={[
            { dividend: 2355, remainder: "3", note: "Least significant digit" },
            { dividend: 147, remainder: "3" },
            { dividend: 9, remainder: "9", note: "Most significant digit" },
          ]}
          verification="9×16² + 3×16¹ + 3×16⁰ = 2304 + 48 + 3 = 2355 ✓"
        />
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="alt-p1-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <ol className="list-decimal ml-6 space-y-3">
        <li>
          <strong>mov ax, word[num1]:</strong> ax = 0x0055 (85 decimal)
        </li>
        <li>
          <strong>add ax, word[num2]:</strong> ax = 0x0055 + 0x0048 = 0x009D (157 decimal)
          <ul className="list-disc ml-6 mt-1">
            <li>Addition: 85 + 72 = 157</li>
          </ul>
        </li>
        <li>
          <strong>mov bx, 15:</strong> bx = 0x000F (15 decimal)
        </li>
        <li>
          <strong>mul bx:</strong> Multiply ax by bx
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>Operation: dx:ax = ax × bx</li>
            <li>Calculation: 157 × 15 = 2355</li>
            <li>Result in hex: 2355 = 0x0933</li>
            <li>ax = 0x0933 (lower 16 bits)</li>
            <li>dx = 0x0000 (upper 16 bits, zero because result fits in 16 bits)</li>
          </ul>
        </li>
        <li>
          <strong>mov word[result], ax:</strong> Store ax value in result
          <ul className="list-disc ml-6 mt-1">
            <li>result = 0x0933 (2355 decimal)</li>
          </ul>
        </li>
      </ol>

      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <p className="font-semibold text-blue-900 mb-2">Summary:</p>
        <p className="text-blue-800">
          The program adds two numbers (85 + 72 = 157), then multiplies the result by 15 (157 × 15 =
          2355). The final result is stored in memory with little-endian byte ordering.
        </p>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="alt-p1-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="font-semibold text-yellow-900">Important Note:</p>
        <p className="text-yellow-800 mt-2">
          Memory is stored in <strong>little-endian</strong> format. For a word (16-bit) value, the
          least significant byte (LSB) is stored at the lower address (+0) and the most significant
          byte (MSB) at the higher address (+1).
        </p>
      </div>

      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory Offset", "Value (Hex)"]}
        rows={[
          ["", "before (initial) | after execution"],
          ["result +1", "0x00 | 0x09"],
          ["result +0", "0x00 | 0x33"],
          ["num2 +1", "0x00 | 0x00"],
          ["num2 +0", "0x48 | 0x48"],
          ["num1 +1", "0x00 | 0x00"],
          ["num1 +0", "0x55 | 0x55"],
        ]}
      />

      <h4 className="font-semibold text-lg mb-3 mt-6">Register State (Full 16-bit size):</h4>
      <Table
        headers={["Register", "Value (Hex)"]}
        rows={[
          ["ax", "0x0933"],
          ["bx", "0x000F"],
          ["dx", "0x0000"],
        ]}
      />

      <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
        <h5 className="font-bold text-green-900 mb-3">Complete Answer Table (26 points):</h5>
        <Table
          headers={["Memory Offset", "Value (Hex)", "Register", "Value (Hex)"]}
          rows={[
            ["", "before | after", "", ""],
            ["result +1", "0x00 | 0x09", "ax", "0x0933"],
            ["result +0", "0x00 | 0x33", "bx", "0x000F"],
            ["num2 +1", "0x00 | 0x00", "dx", "0x0000"],
            ["num2 +0", "0x48 | 0x48", "", ""],
            ["num1 +1", "0x00 | 0x00", "", ""],
            ["num1 +0", "0x55 | 0x55", "", ""],
          ]}
        />
      </div>
    </CollapsibleSection>
  </div>
);

export default AlternateProblem1;
