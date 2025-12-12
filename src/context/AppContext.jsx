import React, { createContext, useContext, useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * Application Context for global state management
 */
const AppContext = createContext(null);

/**
 * Custom hook to use the AppContext
 * @returns {Object} The app context value
 * @throws {Error} If used outside of AppProvider
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

/**
 * AppProvider component that wraps the app and provides global state
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export const AppProvider = ({ children }) => {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState("overview");

  // Collapsible sections state (persisted in localStorage)
  const [expandedSections, setExpandedSections] = useLocalStorage("expandedSections", {});

  // Progress tracking state (persisted in localStorage)
  const [completedProblems, setCompletedProblems] = useLocalStorage("completedProblems", []);

  // Dark mode state (persisted in localStorage) - for future implementation
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  /**
   * Toggle a collapsible section's expanded state
   * @param {string} id - The section ID to toggle
   */
  const toggleSection = useCallback(
    (id) => {
      setExpandedSections((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    },
    [setExpandedSections]
  );

  /**
   * Mark a problem as completed
   * @param {string} problemId - The problem ID to mark as complete
   */
  const toggleProblemComplete = useCallback(
    (problemId) => {
      setCompletedProblems((prev) => {
        if (prev.includes(problemId)) {
          return prev.filter((id) => id !== problemId);
        }
        return [...prev, problemId];
      });
    },
    [setCompletedProblems]
  );

  /**
   * Check if a problem is completed
   * @param {string} problemId - The problem ID to check
   * @returns {boolean} Whether the problem is completed
   */
  const isProblemCompleted = useCallback(
    (problemId) => {
      return completedProblems.includes(problemId);
    },
    [completedProblems]
  );

  const value = {
    // Tab state
    activeTab,
    setActiveTab,

    // Collapsible sections
    expandedSections,
    setExpandedSections,
    toggleSection,

    // Progress tracking
    completedProblems,
    setCompletedProblems,
    toggleProblemComplete,
    isProblemCompleted,

    // Dark mode (for future use)
    darkMode,
    setDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
