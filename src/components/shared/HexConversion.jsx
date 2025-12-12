import React from "react";

/**
 * HexConversion component displays a decimal to hexadecimal conversion example
 * @param {Object} props
 * @param {number} props.decimal - The decimal number to convert
 * @param {string} props.hex - The hexadecimal result (e.g., "0x003C")
 * @param {Array<{dividend: number, remainder: string, note?: string}>} props.steps - Division steps
 * @param {string} [props.verification] - Verification calculation (optional)
 * @returns {JSX.Element}
 */
const HexConversion = ({ decimal, hex, steps, verification }) => {
  // Extract just the remainders for display in step 2
  const remainders = steps.map((s) => s.remainder.split(" ")[0]).join(" ");

  return (
    <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
      <h5 className="font-bold text-purple-900 mb-3">Converting {decimal}₁₀ to Hex:</h5>

      <div className="bg-white p-3 rounded mb-2">
        <p className="font-semibold mb-2">Step 1: Divide by 16 repeatedly</p>
        <ul className="text-sm space-y-1 ml-4">
          {steps.map((step, index) => (
            <li key={index}>
              {step.dividend} ÷ 16 = {Math.floor(step.dividend / 16)} remainder{" "}
              <strong>{step.remainder}</strong>
              {step.note && ` → ${step.note}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-3 rounded">
        <p className="font-semibold mb-2">Step 2: Write digits from last to first</p>
        <p className="text-sm">
          Reading remainders: <strong>{remainders}</strong>
        </p>
        <p className="text-green-700 font-bold mt-2">
          ✅ {decimal}₁₀ = {hex}
        </p>
        {verification && <p className="text-xs text-gray-600 mt-2">Verify: {verification}</p>}
      </div>
    </div>
  );
};

export default HexConversion;
