import React from "react";
import { CodeBlock, Table, CollapsibleSection, KeyConcepts, HexConversion } from "../shared";

const Problem1 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Problem 1: Multiplication with Word-Sized Registers
    </h3>

    <KeyConcepts
      concepts={[
        "Word-sized (16-bit) operations",
        "Multiplication instruction (mul)",
        "Result stored in dx:ax (32-bit)",
      ]}
    />

    <CodeBlock
      code={`section .data
      num1 dw 60    ; num1 = 60 = 0x003C
      num2 dw 90    ; num2 = 90 = 0x005A
      num3 dw 0     ; num3 = 0 = 0x0000

      section .text
      _start:
          mov ax, word[num1]      ; ax = 0x003C
          mov bx, word[num2]      ; bx = 0x005A
          mul bx                  ; dx:ax = ax * bx
          mov word[num3], ax      ; Store lower 16 bits
      done:`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="p1-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <HexConversion
          decimal={60}
          hex="0x003C"
          steps={[
            { dividend: 60, remainder: "12 (C)", note: "Least significant digit" },
            { dividend: 3, remainder: "3", note: "Most significant digit" },
          ]}
          verification="3×16¹ + 12×16⁰ = 48 + 12 = 60 ✓"
        />

        <HexConversion
          decimal={90}
          hex="0x005A"
          steps={[
            { dividend: 90, remainder: "10 (A)", note: "Least significant digit" },
            { dividend: 5, remainder: "5", note: "Most significant digit" },
          ]}
          verification="5×16¹ + 10×16⁰ = 80 + 10 = 90 ✓"
        />

        <HexConversion
          decimal={5400}
          hex="0x1518"
          steps={[
            { dividend: 5400, remainder: "8", note: "Least significant digit" },
            { dividend: 337, remainder: "1", note: "Next hex digit" },
            { dividend: 21, remainder: "5", note: "Next hex digit" },
            { dividend: 1, remainder: "1", note: "Most significant digit" },
          ]}
          verification="1×16³ + 5×16² + 1×16¹ + 8×16⁰ = 4096 + 1280 + 16 + 8 = 5400 ✓"
        />
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="p1-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <ol className="list-decimal ml-6 space-y-2">
        <li>
          <strong>mov ax, word[num1]:</strong> ax = 0x003C (60 decimal)
        </li>
        <li>
          <strong>mov bx, word[num2]:</strong> bx = 0x005A (90 decimal)
        </li>
        <li>
          <strong>mul bx:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>60 × 90 = 5400 decimal = 0x1518 hex</li>
            <li>Result stored as dx:ax (32-bit result split across two 16-bit registers)</li>
            <li>dx = 0x0000 (upper 16 bits)</li>
            <li>ax = 0x1518 (lower 16 bits, 5400 decimal)</li>
          </ul>
        </li>
        <li>
          <strong>mov word[num3], ax:</strong> num3 = 0x1518 (5400 decimal)
        </li>
      </ol>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="p1-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory", "Offset", "Before", "After"]}
        rows={[
          ["num3", "+1", "0x00", "0x15"],
          ["num3", "+0", "0x00", "0x18"],
          ["num2", "+1", "0x00", "0x00"],
          ["num2", "+0", "0x5A", "0x5A"],
          ["num1", "+1", "0x00", "0x00"],
          ["num1", "+0", "0x3C", "0x3C"],
        ]}
      />
      <h4 className="font-semibold text-lg mb-3 mt-6">Register State:</h4>
      <Table
        headers={["Register", "Value (Hex)", "Description"]}
        rows={[
          ["ax", "0x1518", "Product lower 16 bits (5400 decimal)"],
          ["bx", "0x005A", "Multiplier (90 decimal)"],
          ["dx", "0x0000", "Product upper 16 bits"],
        ]}
      />
    </CollapsibleSection>
  </div>
);

export default Problem1;
