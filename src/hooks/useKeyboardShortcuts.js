import { useEffect, useCallback } from "react";

/**
 * Custom hook for keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to callbacks
 * @param {boolean} enabled - Whether shortcuts are enabled
 *
 * @example
 * useKeyboardShortcuts({
 *   'ctrl+k': () => openSearch(),
 *   'escape': () => closeModal(),
 *   'h': () => showHelp()
 * });
 */
export const useKeyboardShortcuts = (shortcuts, enabled = true) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled) return;

      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Build key combination string
      let combination = "";
      if (ctrl) combination += "ctrl+";
      if (shift) combination += "shift+";
      if (alt) combination += "alt+";
      combination += key;

      // Check if this combination has a handler
      const handler = shortcuts[combination] || shortcuts[key];

      if (handler) {
        // Don't trigger if user is typing in an input
        const activeElement = document.activeElement;
        const isInput =
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.contentEditable === "true";

        if (!isInput) {
          event.preventDefault();
          handler(event);
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};

/**
 * Predefined shortcut configurations
 */
export const commonShortcuts = {
  navigation: {
    "?": "Show keyboard shortcuts",
    "/": "Focus search",
    escape: "Close modal/Clear search",
    arrowleft: "Previous tab",
    arrowright: "Next tab",
  },
  problemNavigation: {
    j: "Next problem",
    k: "Previous problem",
    space: "Toggle problem completion",
    e: "Expand/Collapse all sections",
  },
  tools: {
    d: "Toggle dark mode",
    p: "Toggle print mode",
    "ctrl+p": "Print page",
    "ctrl+s": "Save progress",
  },
};

export default useKeyboardShortcuts;
