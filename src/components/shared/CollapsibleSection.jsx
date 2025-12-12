import React from "react";

/**
 * CollapsibleSection component with expand/collapse functionality
 * @param {Object} props
 * @param {string} props.title - Section title displayed in the header
 * @param {React.ReactNode} props.children - Content to show when expanded
 * @param {string} props.id - Unique identifier for this section
 * @param {Object} props.expandedSections - Object mapping section IDs to expanded state
 * @param {Function} props.toggleSection - Function to toggle section expansion
 * @returns {JSX.Element}
 */
const CollapsibleSection = ({ title, children, id, expandedSections, toggleSection }) => {
  const isExpanded = expandedSections[id];

  return (
    <div className="mb-4">
      <button
        onClick={() => toggleSection(id)}
        aria-expanded={isExpanded}
        aria-controls={`section-content-${id}`}
        id={`section-button-${id}`}
        className="w-full text-left bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-800 dark:hover:to-blue-800 transition-all font-semibold flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{title}</span>
        <span aria-hidden="true">{isExpanded ? "▼" : "▶"}</span>
      </button>
      {isExpanded && (
        <div
          id={`section-content-${id}`}
          role="region"
          aria-labelledby={`section-button-${id}`}
          className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-600"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
