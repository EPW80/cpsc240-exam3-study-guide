import React from "react";

/**
 * KeyboardShortcutsModal component displaying all available keyboard shortcuts
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @returns {JSX.Element}
 */
const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      category: "Navigation",
      items: [
        { keys: ["←"], description: "Previous tab" },
        { keys: ["→"], description: "Next tab" },
        { keys: ["/"], description: "Focus search bar" },
        { keys: ["ESC"], description: "Clear search / Close modal" },
      ],
    },
    {
      category: "Interface",
      items: [
        { keys: ["D"], description: "Toggle dark mode" },
        { keys: ["?"], description: "Show this help" },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm no-print"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Keyboard Shortcuts</h2>
              <p className="text-purple-100 text-sm">Navigate faster with these shortcuts</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {shortcuts.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{item.description}</span>
                    <div className="flex gap-2">
                      {item.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="px-3 py-1.5 text-sm font-mono bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded shadow-sm text-gray-800 dark:text-gray-200 min-w-[2.5rem] text-center"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer tip */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <strong>Tip:</strong> Keyboard shortcuts won't work when you're typing in a search
                field or text input.
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
