import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";
import HexConversion from "../shared/HexConversion";

const AlternateProblem2 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Alternate Problem 2: Division and Loop with Even Number Counter
    </h3>

    <KeyConcepts
      title="Key Concepts:"
      concepts={[
        "Division operation (div) with 32-bit registers",
        "Loop constructs and conditional jumps",
        "Counting even numbers using remainder",
        "32-bit (dword) memory operations",
      ]}
    />

    <CodeBlock
      code={`section .data
    mul3 dd 0           ;[mul3] = 0x00000000

section .text
global _start
_start:
    mov ecx, 50         ;ecx = 50
next:
    mov edx, 0          ;edx = 0
    mov eax, ecx        ;eax = ecx = 50, 51, 52, 53, 54
    mov ebx, 2          ;ebx = 2
    div ebx             ;edx=edx:eax % ebx = 50%2=0, 51%2=1, 52%2=0, 53%2=1, 54%2=0
                        ;eax=edx:eax / ebx = 50/2=25, 51/2=25, 52/2=26, 53/2=26, 54/2=27
    cmp edx, 0          ;edx == 0 ?
    jne skip            ;F, T, F, T, F (jump on iterations 2 and 4)
    inc dword[mul3]     ;[mul3]=0+1+1+1=3=0x00000003
skip:
    inc ecx             ;ecx=50+1+1+1+1+1=55=0x37
    cmp ecx, 55         ;55 == 55 ?
    jne next            ;T, T, T, T, F (exit after 5th iteration)
done:
    mov rax, 60
    mov rdi, 0
    syscall`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="alt-p2-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <HexConversion
          decimal={50}
          hex="0x00000032"
          steps={[
            { dividend: 50, remainder: "2", note: "Least significant digit" },
            { dividend: 3, remainder: "3", note: "Most significant digit" },
          ]}
          verification="3×16¹ + 2×16⁰ = 48 + 2 = 50 ✓"
        />

        <HexConversion
          decimal={55}
          hex="0x00000037"
          steps={[
            { dividend: 55, remainder: "7", note: "Least significant digit" },
            { dividend: 3, remainder: "3", note: "Most significant digit" },
          ]}
          verification="3×16¹ + 7×16⁰ = 48 + 7 = 55 ✓"
        />

        <HexConversion
          decimal={25}
          hex="0x00000019"
          steps={[
            { dividend: 25, remainder: "9", note: "Least significant digit" },
            { dividend: 1, remainder: "1", note: "Most significant digit" },
          ]}
          verification="1×16¹ + 9×16⁰ = 16 + 9 = 25 ✓"
        />

        <HexConversion
          decimal={27}
          hex="0x0000001B"
          steps={[
            { dividend: 27, remainder: "11 (B)", note: "Least significant digit" },
            { dividend: 1, remainder: "1", note: "Most significant digit" },
          ]}
          verification="1×16¹ + 11×16⁰ = 16 + 11 = 27 ✓"
        />
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Step-by-Step Execution"
      id="alt-p2-steps"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <ol className="list-decimal ml-6 space-y-3">
        <li>
          <strong>mov ecx, 50:</strong> ecx = 0x00000032 (50 decimal)
        </li>
        <li>
          <strong>Iteration 1 (ecx = 50):</strong>
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>mov edx, 0 → edx = 0x00000000</li>
            <li>mov eax, ecx → eax = 0x00000032</li>
            <li>mov ebx, 2 → ebx = 0x00000002</li>
            <li>div ebx → eax = 50/2 = 25 = 0x00000019, edx = 50%2 = 0</li>
            <li>cmp edx, 0 → edx == 0? TRUE</li>
            <li>jne skip → Don't jump (edx == 0)</li>
            <li>inc dword[mul3] → mul3 = 1</li>
            <li>inc ecx → ecx = 51 = 0x00000033</li>
            <li>cmp ecx, 55 → 51 == 55? FALSE</li>
            <li>jne next → Jump back to next</li>
          </ul>
        </li>
        <li>
          <strong>Iteration 2 (ecx = 51):</strong>
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>mov edx, 0 → edx = 0x00000000</li>
            <li>mov eax, ecx → eax = 0x00000033</li>
            <li>mov ebx, 2 → ebx = 0x00000002</li>
            <li>div ebx → eax = 51/2 = 25 = 0x00000019, edx = 51%2 = 1</li>
            <li>cmp edx, 0 → edx == 0? FALSE</li>
            <li>jne skip → Jump to skip (edx = 1, odd number)</li>
            <li>inc ecx → ecx = 52 = 0x00000034</li>
            <li>cmp ecx, 55 → 52 == 55? FALSE</li>
            <li>jne next → Jump back to next</li>
          </ul>
        </li>
        <li>
          <strong>Iteration 3 (ecx = 52):</strong>
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>mov edx, 0 → edx = 0x00000000</li>
            <li>mov eax, ecx → eax = 0x00000034</li>
            <li>mov ebx, 2 → ebx = 0x00000002</li>
            <li>div ebx → eax = 52/2 = 26 = 0x0000001A, edx = 52%2 = 0</li>
            <li>cmp edx, 0 → edx == 0? TRUE</li>
            <li>jne skip → Don't jump</li>
            <li>inc dword[mul3] → mul3 = 2</li>
            <li>inc ecx → ecx = 53 = 0x00000035</li>
            <li>cmp ecx, 55 → 53 == 55? FALSE</li>
            <li>jne next → Jump back to next</li>
          </ul>
        </li>
        <li>
          <strong>Iteration 4 (ecx = 53):</strong>
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>mov edx, 0 → edx = 0x00000000</li>
            <li>mov eax, ecx → eax = 0x00000035</li>
            <li>mov ebx, 2 → ebx = 0x00000002</li>
            <li>div ebx → eax = 53/2 = 26 = 0x0000001A, edx = 53%2 = 1</li>
            <li>cmp edx, 0 → edx == 0? FALSE</li>
            <li>jne skip → Jump to skip (edx = 1, odd number)</li>
            <li>inc ecx → ecx = 54 = 0x00000036</li>
            <li>cmp ecx, 55 → 54 == 55? FALSE</li>
            <li>jne next → Jump back to next</li>
          </ul>
        </li>
        <li>
          <strong>Iteration 5 (ecx = 54):</strong>
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>mov edx, 0 → edx = 0x00000000</li>
            <li>mov eax, ecx → eax = 0x00000036</li>
            <li>mov ebx, 2 → ebx = 0x00000002</li>
            <li>div ebx → eax = 54/2 = 27 = 0x0000001B, edx = 54%2 = 0</li>
            <li>cmp edx, 0 → edx == 0? TRUE</li>
            <li>jne skip → Don't jump</li>
            <li>inc dword[mul3] → mul3 = 3 = 0x00000003</li>
            <li>inc ecx → ecx = 55 = 0x00000037</li>
            <li>cmp ecx, 55 → 55 == 55? TRUE</li>
            <li>jne next → Don't jump, exit loop</li>
          </ul>
        </li>
      </ol>

      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <p className="font-semibold text-blue-900 mb-2">Summary:</p>
        <p className="text-blue-800">
          The loop counts even numbers from 50 to 54. Numbers checked: 50 (even ✓), 51 (odd), 52
          (even ✓), 53 (odd), 54 (even ✓). Total count: 3 even numbers.
        </p>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="alt-p2-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="font-semibold text-yellow-900">Important Note:</p>
        <p className="text-yellow-800 mt-2">
          Memory is stored in <strong>little-endian</strong> format. For a dword (32-bit) value, the
          least significant byte is stored at the lowest address (+0) and the most significant byte
          at the highest address (+3).
        </p>
      </div>

      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory Offset", "Value (Hex)"]}
        rows={[
          ["", "before (initial) | after execution"],
          ["mul3 +3", "0x00 | 0x00"],
          ["mul3 +2", "0x00 | 0x00"],
          ["mul3 +1", "0x00 | 0x00"],
          ["mul3 +0", "0x00 | 0x03"],
        ]}
      />

      <h4 className="font-semibold text-lg mb-3 mt-6">Register State (Full 32-bit size):</h4>
      <Table
        headers={["Register", "Value (Hex)"]}
        rows={[
          ["eax", "0x0000001B"],
          ["ebx", "0x00000002"],
          ["ecx", "0x00000037"],
          ["edx", "0x00000000"],
        ]}
      />

      <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
        <h5 className="font-bold text-green-900 mb-3">Complete Answer Table (24 points):</h5>
        <Table
          headers={["Memory Offset", "Value (Hex)", "Register", "Value (Hex)"]}
          rows={[
            ["", "before | after", "", ""],
            ["mul3 +3", "0x00 | 0x00", "eax", "0x0000001B"],
            ["mul3 +2", "0x00 | 0x00", "ebx", "0x00000002"],
            ["mul3 +1", "0x00 | 0x00", "ecx", "0x00000037"],
            ["mul3 +0", "0x00 | 0x03", "edx", "0x00000000"],
          ]}
        />
      </div>
    </CollapsibleSection>
  </div>
);

export default AlternateProblem2;
