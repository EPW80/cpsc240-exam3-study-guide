import React from "react";
import { exportProgress, importProgress, resetProgress } from "../../utils/exportProgress";
import { useAppContext } from "../../context/AppContext";

/**
 * ProgressManager component for exporting, importing, and resetting study progress
 * @returns {JSX.Element}
 */
const ProgressManager = () => {
  const {
    completedProblems,
    expandedSections,
    darkMode,
    setCompletedProblems,
    setExpandedSections,
    setDarkMode,
  } = useAppContext();

  const handleExport = () => {
    const progressData = {
      completedProblems,
      expandedSections,
      darkMode,
    };

    exportProgress(progressData);
  };

  const handleImport = () => {
    importProgress((data) => {
      if (data.completedProblems !== undefined) {
        setCompletedProblems(data.completedProblems);
      }
      if (data.expandedSections !== undefined) {
        setExpandedSections(data.expandedSections);
      }
      if (data.darkMode !== undefined) {
        setDarkMode(data.darkMode);
      }

      alert("Progress imported successfully!");
    });
  };

  const handleReset = () => {
    resetProgress(() => {
      setCompletedProblems([]);
      setExpandedSections({});
      setDarkMode(false);
      alert("Progress reset successfully!");
    });
  };

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 no-print">
      <div className="w-full">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Progress Management
        </h3>
      </div>

      <button
        onClick={handleExport}
        className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        title="Export your progress to a file"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </div>
      </button>

      <button
        onClick={handleImport}
        className="flex-1 min-w-[120px] px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        title="Import progress from a file"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Import
        </div>
      </button>

      <button
        onClick={handleReset}
        className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        title="Reset all progress"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </div>
      </button>

      <div className="w-full mt-2">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Export your progress to backup your completed problems and preferences. Import to restore
          from a previous export.
        </p>
      </div>
    </div>
  );
};

export default ProgressManager;
