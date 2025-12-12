import React from "react";
import { Table } from "../shared";

const QuickReference = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-4 text-purple-700">Quick Reference Guide</h3>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg mb-3 text-blue-600">Register Sizes</h4>
        <Table
          headers={["Size", "Registers"]}
          rows={[
            ["8-bit", "al, bl, cl, dl"],
            ["16-bit", "ax, bx, cx, dx"],
            ["32-bit", "eax, ebx, ecx, edx"],
            ["64-bit", "rax, rbx, rcx, rdx, rsi, rdi"],
          ]}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg mb-3 text-blue-600">Memory Sizes</h4>
        <Table
          headers={["Directive", "Size", "Bytes"]}
          rows={[
            ["db", "byte", "1"],
            ["dw", "word", "2"],
            ["dd", "double word", "4"],
            ["dq", "quad word", "8"],
          ]}
        />
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="font-bold text-lg mb-3 text-green-600">Common Instructions</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold mb-2">Data Movement:</p>
          <ul className="list-disc ml-6 text-sm">
            <li>
              <code>mov dst, src</code> - Move data
            </li>
            <li>
              <code>movzx dst, src</code> - Move with zero-extension
            </li>
            <li>
              <code>push src</code> - Push onto stack
            </li>
            <li>
              <code>pop dst</code> - Pop from stack
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Arithmetic:</p>
          <ul className="list-disc ml-6 text-sm">
            <li>
              <code>add dst, src</code> - Addition
            </li>
            <li>
              <code>sub dst, src</code> - Subtraction
            </li>
            <li>
              <code>mul src</code> - Multiply (ax/eax)
            </li>
            <li>
              <code>div src</code> - Divide (dx:ax or edx:eax)
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Control Flow:</p>
          <ul className="list-disc ml-6 text-sm">
            <li>
              <code>cmp op1, op2</code> - Compare
            </li>
            <li>
              <code>je/jne</code> - Jump if equal/not equal
            </li>
            <li>
              <code>jge/jle</code> - Jump if greater/less or equal
            </li>
            <li>
              <code>loop</code> - Decrement rcx and jump
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Other:</p>
          <ul className="list-disc ml-6 text-sm">
            <li>
              <code>inc dst</code> - Increment
            </li>
            <li>
              <code>dec dst</code> - Decrement
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md border-2 border-yellow-300">
      <h4 className="font-bold text-lg mb-3 text-orange-700">⚠️ Critical Points</h4>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Always show full register size</strong> in hex (e.g., ax = 0x003C, not 3C)
        </li>
        <li>
          <strong>Little-endian:</strong> Multi-byte values stored LSB first (0x1234 → [0x34][0x12])
        </li>
        <li>
          <strong>Before division:</strong> Always clear upper register (mov edx, 0 or mov dx, 0)
        </li>
        <li>
          <strong>Multiplication result doubles size:</strong> 16-bit × 16-bit = 32-bit (dx:ax)
        </li>
        <li>
          <strong>ASCII digits:</strong> '0' = 0x30, '9' = 0x39
        </li>
      </ul>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="font-bold text-lg mb-3 text-purple-600">Hex ↔ Decimal Quick Reference</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold mb-2 text-sm text-gray-700">Common Values:</p>
          <Table
            headers={["Decimal", "Hex", "Binary"]}
            rows={[
              ["0", "0x00", "0000"],
              ["3", "0x03", "0011"],
              ["4", "0x04", "0100"],
              ["9", "0x09", "1001"],
              ["10", "0x0A", "1010"],
              ["16", "0x10", "00010000"],
              ["60", "0x3C", "00111100"],
              ["90", "0x5A", "01011010"],
              ["100", "0x64", "01100100"],
              ["125", "0x7D", "01111101"],
              ["150", "0x96", "10010110"],
              ["175", "0xAF", "10101111"],
              ["255", "0xFF", "11111111"],
            ]}
          />
        </div>
        <div>
          <p className="font-semibold mb-2 text-sm text-gray-700">ASCII Characters:</p>
          <Table
            headers={["Decimal", "Hex", "ASCII"]}
            rows={[
              ["10", "0x0A", "LF (newline)"],
              ["48", "0x30", "'0'"],
              ["49", "0x31", "'1'"],
              ["50", "0x32", "'2'"],
              ["55", "0x37", "'7'"],
              ["56", "0x38", "'8'"],
              ["57", "0x39", "'9'"],
              ["65", "0x41", "'A'"],
              ["97", "0x61", "'a'"],
            ]}
          />
        </div>
      </div>
      <div className="mt-4 bg-purple-50 p-4 rounded-lg">
        <p className="font-semibold text-purple-900 mb-2">Conversion Tips:</p>
        <ul className="text-sm space-y-1 text-purple-800 list-disc ml-6">
          <li>Hex digits: 0-9, A(10), B(11), C(12), D(13), E(14), F(15)</li>
          <li>Each hex digit = 4 bits (nibble)</li>
          <li>Two hex digits = 1 byte (8 bits)</li>
          <li>To convert decimal to hex: repeatedly divide by 16, collect remainders</li>
          <li>ASCII '0'-'9' are 0x30-0x39 (decimal 48-57)</li>
        </ul>
      </div>
    </div>
  </div>
);

export default QuickReference;
