import React from "react";
import { CodeBlock, Table, CollapsibleSection } from "../shared";
import KeyConcepts from "../shared/KeyConcepts";
import HexConversion from "../shared/HexConversion";

const Problem4 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Problem 4: Binary to ASCII Decimal Conversion
    </h3>

    <KeyConcepts
      concepts={[
        "Converting binary numbers to ASCII decimal strings",
        "Division by 10 to extract decimal digits",
        "ASCII offset: digit + 0x30 ('0' is ASCII 48)",
        "Building strings from right to left",
      ]}
    />

    <CodeBlock
      code={`section .data
      num dq 253            ; num = 253 = 0xFD
      str db "    ", 0      ; 4 spaces + null terminator

      section .text
      _start:
          mov rax, qword[num]   ; rax = 253
          mov rbx, 10           ; Divisor for base 10
          mov rcx, 3            ; Position (rightmost digit)

      convert:
          xor rdx, rdx          ; Clear rdx for division
          div rbx               ; rax = quotient, rdx = remainder
          add dl, 0x30          ; Convert digit to ASCII
          mov byte[str + rcx], dl ; Store at position
          dec rcx               ; Move left
          cmp rax, 0            ; Check if done
          jne convert           ; Continue if not zero
      done:`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="p4-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <HexConversion
          decimal={253}
          hex="0x00000000000000FD"
          steps={[
            { dividend: 253, remainder: "13 (D)", note: "Least significant digit" },
            { dividend: 15, remainder: "15 (F)", note: "Most significant digit" },
          ]}
          verification="15×16¹ + 13×16⁰ = 240 + 13 = 253 ✓"
        />

        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <h5 className="font-bold text-purple-900 mb-3">ASCII Character Codes:</h5>
          <div className="bg-white p-3 rounded">
            <Table
              headers={["Digit", "Binary", "Hex", "Decimal"]}
              rows={[
                ["'0'", "0011 0000", "0x30", "48"],
                ["'1'", "0011 0001", "0x31", "49"],
                ["'2'", "0011 0010", "0x32", "50"],
                ["'3'", "0011 0011", "0x33", "51"],
                ["'4'", "0011 0100", "0x34", "52"],
                ["'5'", "0011 0101", "0x35", "53"],
                ["'6'", "0011 0110", "0x36", "54"],
                ["'7'", "0011 0111", "0x37", "55"],
                ["'8'", "0011 1000", "0x38", "56"],
                ["'9'", "0011 1001", "0x39", "57"],
              ]}
            />
            <p className="text-sm text-gray-700 mt-2">
              To convert a digit (0-9) to ASCII, add 0x30 (48 decimal)
            </p>
          </div>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Memory Layout"
      id="p4-memory"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-yellow-50 p-4 rounded mb-4">
        <h4 className="font-bold mb-2">String Buffer Layout:</h4>
        <Table
          headers={["Offset", "Initial", "Description"]}
          rows={[
            ["str + 0", "0x20", "Space (' ')"],
            ["str + 1", "0x20", "Space (' ')"],
            ["str + 2", "0x20", "Space (' ')"],
            ["str + 3", "0x20", "Space (' ')"],
            ["str + 4", "0x00", "Null terminator"],
          ]}
        />
        <p className="text-sm text-gray-700 mt-2">
          Digits will be filled from right to left (starting at offset 3)
        </p>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Conversion Process"
      id="p4-conversion"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-900 mb-2">Iteration 1 (rcx = 3):</h4>
          <ul className="list-disc ml-6 text-sm">
            <li>rax = 253, rdx = 0</li>
            <li>div rbx: 253 ÷ 10 = 25 remainder 3</li>
            <li>rax = 25, rdx = 3</li>
            <li>add dl, 0x30: dl = 0x33 (ASCII '3')</li>
            <li>str[3] = 0x33 ('3')</li>
            <li>rcx = 2</li>
            <li>rax ≠ 0, continue</li>
          </ul>
          <div className="mt-2 p-2 bg-white rounded border border-green-300">
            <p className="font-mono text-sm">str = " 3" (space, space, space, '3', null)</p>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-900 mb-2">Iteration 2 (rcx = 2):</h4>
          <ul className="list-disc ml-6 text-sm">
            <li>rax = 25, rdx = 0</li>
            <li>div rbx: 25 ÷ 10 = 2 remainder 5</li>
            <li>rax = 2, rdx = 5</li>
            <li>add dl, 0x30: dl = 0x35 (ASCII '5')</li>
            <li>str[2] = 0x35 ('5')</li>
            <li>rcx = 1</li>
            <li>rax ≠ 0, continue</li>
          </ul>
          <div className="mt-2 p-2 bg-white rounded border border-green-300">
            <p className="font-mono text-sm">str = " 53" (space, space, '5', '3', null)</p>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-900 mb-2">Iteration 3 (rcx = 1):</h4>
          <ul className="list-disc ml-6 text-sm">
            <li>rax = 2, rdx = 0</li>
            <li>div rbx: 2 ÷ 10 = 0 remainder 2</li>
            <li>rax = 0, rdx = 2</li>
            <li>add dl, 0x30: dl = 0x32 (ASCII '2')</li>
            <li>str[1] = 0x32 ('2')</li>
            <li>rcx = 0</li>
            <li>rax = 0, exit loop</li>
          </ul>
          <div className="mt-2 p-2 bg-white rounded border border-green-300">
            <p className="font-mono text-sm">str = " 253" (space, '2', '5', '3', null)</p>
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded border-2 border-blue-400">
          <h4 className="font-bold text-blue-900 mb-2">Final Result:</h4>
          <p className="font-mono text-lg">str = " 253"</p>
          <p className="text-sm text-gray-700 mt-2">Leading space remains at offset 0</p>
        </div>
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="p4-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory", "Offset", "Before", "After"]}
        rows={[
          ["str", "+4", "0x00", "0x00"],
          ["str", "+3", "0x20", "0x33"],
          ["str", "+2", "0x20", "0x35"],
          ["str", "+1", "0x20", "0x32"],
          ["str", "+0", "0x20", "0x20"],
          ["num", "+7", "0x00", "0x00"],
          ["num", "+6", "0x00", "0x00"],
          ["num", "+5", "0x00", "0x00"],
          ["num", "+4", "0x00", "0x00"],
          ["num", "+3", "0x00", "0x00"],
          ["num", "+2", "0x00", "0x00"],
          ["num", "+1", "0x00", "0x00"],
          ["num", "+0", "0xFD", "0xFD"],
        ]}
      />
      <h4 className="font-semibold text-lg mb-3 mt-6">Register State:</h4>
      <Table
        headers={["Register", "Value (Hex)", "Description"]}
        rows={[
          ["rax", "0x0000000000000000", "Final quotient (0)"],
          ["rbx", "0x000000000000000A", "Divisor (10)"],
          ["rcx", "0x0000000000000000", "Position counter"],
          ["rdx", "0x0000000000000002", "Last remainder (2)"],
        ]}
      />
      <div className="bg-green-100 p-4 rounded mt-4 border-2 border-green-400">
        <p className="font-bold text-green-900 mb-2">✅ Final Result:</p>
        <p className="font-mono text-xl">str = " 253\0"</p>
        <p className="text-sm text-gray-700 mt-2">ASCII: [0x20, 0x32, 0x35, 0x33, 0x00]</p>
        <p className="text-sm text-gray-700">String: [' ', '2', '5', '3', '\0']</p>
      </div>
    </CollapsibleSection>
  </div>
);

export default Problem4;
