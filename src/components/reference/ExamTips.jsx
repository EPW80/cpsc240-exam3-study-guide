import React from "react";

const ExamTips = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-4 text-purple-700">Exam Tips & Strategy</h3>

    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg shadow-md border-2 border-green-300">
      <h4 className="font-bold text-lg mb-3 text-green-700">📝 Problem-Solving Strategy</h4>
      <ol className="list-decimal ml-6 space-y-2">
        <li>
          <strong>Read carefully</strong> - Note register and memory sizes
        </li>
        <li>
          <strong>Create a trace table</strong> - Track values step-by-step
        </li>
        <li>
          <strong>Watch for edge cases:</strong>
          <ul className="list-disc ml-6 mt-1">
            <li>Overflow in multiplication</li>
            <li>Sign vs. zero extension</li>
            <li>Clearing registers before division</li>
          </ul>
        </li>
        <li>
          <strong>Double-check hex conversions</strong> - Use the ASCII table
        </li>
        <li>
          <strong>Remember little-endian</strong> - LSB at lowest address
        </li>
      </ol>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg mb-3 text-red-600">❌ Common Mistakes</h4>
        <ul className="list-disc ml-6 space-y-2 text-sm">
          <li>Forgetting to clear dx/edx before division</li>
          <li>Mixing up register sizes (al vs ax vs eax)</li>
          <li>Wrong byte order (big vs little endian)</li>
          <li>Not showing full register size in answers</li>
          <li>Forgetting that mul/div affect multiple registers</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg mb-3 text-blue-600">✓ Success Checklist</h4>
        <ul className="list-disc ml-6 space-y-2 text-sm">
          <li>Full register values with leading zeros</li>
          <li>Correct hex format (0x prefix)</li>
          <li>Little-endian memory layout</li>
          <li>All affected registers documented</li>
          <li>Clear step-by-step work shown</li>
        </ul>
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="font-bold text-lg mb-3 text-purple-600">📚 Additional Study Resources</h4>
      <div className="space-y-3 text-sm">
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Assignment 2 - Chapter 7, Quiz 8, 9, 10, 11</p>
          <p className="text-gray-600">Basic assembly instructions and data movement</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Assignment 3 - Chapter 7, Quiz 13, 14, 15, 16</p>
          <p className="text-gray-600">Advanced operations and addressing modes</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Assignment 5 - Chapter 8, Quiz 5, 6</p>
          <p className="text-gray-600">Control structures and loops</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-semibold">Assignment 6 - Chapter 9, Quiz 4, 5</p>
          <p className="text-gray-600">Stack operations and procedures</p>
        </div>
        <p className="mt-4 text-gray-600 italic">
          Answers found in Appendix D of "X86-64 Assembly Language Programming with Ubuntu"
        </p>
      </div>
    </div>
  </div>
);

export default ExamTips;
