import React from "react";

/**
 * KeyConcepts component displays a highlighted box with key learning points
 * @param {Object} props
 * @param {string[]} props.concepts - Array of concept strings to display
 * @param {string} [props.title="Key Concepts:"] - Optional title for the box
 * @returns {JSX.Element}
 */
const KeyConcepts = ({ concepts, title = "Key Concepts:" }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
    <p className="font-semibold text-blue-900">{title}</p>
    <ul className="list-disc ml-6 mt-2 text-blue-800">
      {concepts.map((concept, index) => (
        <li key={index}>{concept}</li>
      ))}
    </ul>
  </div>
);

export default KeyConcepts;
