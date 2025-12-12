import React from "react";
import { CodeBlock, Table, CollapsibleSection, KeyConcepts, HexConversion } from "../shared";

const Problem3 = ({ expandedSections, toggleSection }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4 text-purple-700">
      Problem 3: Stack Operations and Array Reversal
    </h3>

    <KeyConcepts
      concepts={[
        "Stack operates LIFO (Last In, First Out)",
        "push decrements rsp by 8, then stores value",
        "pop retrieves value, then increments rsp by 8",
        "Array indexing with base + offset",
      ]}
    />

    <CodeBlock
      code={`section .data
      array dq 100, 200, 300  ; Three 64-bit values
      output dq 0, 0, 0

      section .text
      _start:
          mov rax, qword[array + 0]   ; rax = 100 = 0x64
          push rax                     ; Stack: [100]
          mov rax, qword[array + 8]   ; rax = 200 = 0xC8
          push rax                     ; Stack: [100, 200]
          mov rax, qword[array + 16]  ; rax = 300 = 0x12C
          push rax                     ; Stack: [100, 200, 300]

          pop qword[output + 0]       ; output[0] = 300
          pop qword[output + 8]       ; output[1] = 200
          pop qword[output + 16]      ; output[2] = 100
      done:`}
    />

    <CollapsibleSection
      title="Decimal to Hex Conversions"
      id="p3-conversions"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="space-y-4">
        <HexConversion
          decimal={100}
          hex="0x0000000000000064"
          steps={[
            { dividend: 100, remainder: "4", note: "Least significant digit" },
            { dividend: 6, remainder: "6", note: "Most significant digit" },
          ]}
          verification="6×16¹ + 4×16⁰ = 96 + 4 = 100 ✓"
        />

        <HexConversion
          decimal={200}
          hex="0x00000000000000C8"
          steps={[
            { dividend: 200, remainder: "8", note: "Least significant digit" },
            { dividend: 12, remainder: "12 (C)", note: "Most significant digit" },
          ]}
          verification="12×16¹ + 8×16⁰ = 192 + 8 = 200 ✓"
        />

        <HexConversion
          decimal={300}
          hex="0x000000000000012C"
          steps={[
            { dividend: 300, remainder: "12 (C)", note: "Least significant digit" },
            { dividend: 18, remainder: "2", note: "Next hex digit" },
            { dividend: 1, remainder: "1", note: "Most significant digit" },
          ]}
          verification="1×16² + 2×16¹ + 12×16⁰ = 256 + 32 + 12 = 300 ✓"
        />
      </div>
    </CollapsibleSection>

    <CollapsibleSection
      title="Execution Trace"
      id="p3-trace"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <ol className="list-decimal ml-6 space-y-3">
        <li>
          <strong>mov rax, qword[array + 0]:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>rax = 100 (0x0000000000000064)</li>
          </ul>
        </li>
        <li>
          <strong>push rax:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>rsp decrements by 8</li>
            <li>Stack now contains: [100]</li>
          </ul>
        </li>
        <li>
          <strong>mov rax, qword[array + 8]:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>rax = 200 (0x00000000000000C8)</li>
          </ul>
        </li>
        <li>
          <strong>push rax:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>rsp decrements by 8</li>
            <li>Stack now contains: [100, 200] (top is 200)</li>
          </ul>
        </li>
        <li>
          <strong>mov rax, qword[array + 16]:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>rax = 300 (0x000000000000012C)</li>
          </ul>
        </li>
        <li>
          <strong>push rax:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>rsp decrements by 8</li>
            <li>Stack now contains: [100, 200, 300] (top is 300)</li>
          </ul>
        </li>
        <li>
          <strong>pop qword[output + 0]:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Pop 300 from stack</li>
            <li>output[0] = 0x000000000000012C (300)</li>
            <li>rsp increments by 8</li>
            <li>Stack: [100, 200]</li>
          </ul>
        </li>
        <li>
          <strong>pop qword[output + 8]:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Pop 200 from stack</li>
            <li>output[1] = 0x00000000000000C8 (200)</li>
            <li>rsp increments by 8</li>
            <li>Stack: [100]</li>
          </ul>
        </li>
        <li>
          <strong>pop qword[output + 16]:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Pop 100 from stack</li>
            <li>output[2] = 0x0000000000000064 (100)</li>
            <li>rsp increments by 8</li>
            <li>Stack: empty</li>
          </ul>
        </li>
      </ol>
    </CollapsibleSection>

    <CollapsibleSection
      title="Stack Contents Visualization"
      id="p3-stack"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <div className="bg-blue-50 p-4 rounded mb-4">
        <h4 className="font-bold mb-2">Understanding LIFO (Last In, First Out):</h4>
        <p className="text-sm text-gray-700">
          The stack is like a stack of plates - you can only add or remove from the top. The last
          value pushed is the first value popped.
        </p>
      </div>
      <Table
        headers={["Operation", "Stack State", "Description"]}
        rows={[
          ["Initial", "[]", "Empty stack"],
          ["push 100", "[100]", "100 at bottom"],
          ["push 200", "[100, 200]", "200 on top of 100"],
          ["push 300", "[100, 200, 300]", "300 on top"],
          ["pop → output[0]", "[100, 200]", "300 removed (was on top)"],
          ["pop → output[8]", "[100]", "200 removed"],
          ["pop → output[16]", "[]", "100 removed (was at bottom)"],
        ]}
      />
    </CollapsibleSection>

    <CollapsibleSection
      title="Final Answer"
      id="p3-answer"
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      <h4 className="font-semibold text-lg mb-3">Memory State:</h4>
      <Table
        headers={["Memory", "Offset", "Before", "After"]}
        rows={[
          ["output", "+23", "0x00", "0x00"],
          ["output", "+22", "0x00", "0x00"],
          ["output", "+21", "0x00", "0x00"],
          ["output", "+20", "0x00", "0x00"],
          ["output", "+19", "0x00", "0x00"],
          ["output", "+18", "0x00", "0x00"],
          ["output", "+17", "0x00", "0x00"],
          ["output", "+16", "0x00", "0x64"],
          ["output", "+15", "0x00", "0x00"],
          ["output", "+14", "0x00", "0x00"],
          ["output", "+13", "0x00", "0x00"],
          ["output", "+12", "0x00", "0x00"],
          ["output", "+11", "0x00", "0x00"],
          ["output", "+10", "0x00", "0x00"],
          ["output", "+9", "0x00", "0x00"],
          ["output", "+8", "0x00", "0xC8"],
          ["output", "+7", "0x00", "0x00"],
          ["output", "+6", "0x00", "0x00"],
          ["output", "+5", "0x00", "0x00"],
          ["output", "+4", "0x00", "0x00"],
          ["output", "+3", "0x00", "0x00"],
          ["output", "+2", "0x00", "0x01"],
          ["output", "+1", "0x00", "0x2C"],
          ["output", "+0", "0x00", "0x00"],
        ]}
      />
      <p className="mt-4 text-green-700 font-bold">
        Result: output array = [300, 200, 100] (reversed order due to LIFO)
      </p>
    </CollapsibleSection>
  </div>
);

export default Problem3;
