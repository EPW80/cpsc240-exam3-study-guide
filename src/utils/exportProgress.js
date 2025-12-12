/**
 * Utility functions for exporting and importing study progress
 */

/**
 * Export study progress to a JSON file
 * @param {Object} progressData - The progress data to export
 * @param {string} filename - The filename for the exported file
 */
export const exportProgress = (progressData) => {
  const data = {
    version: "1.0.0",
    exportDate: new Date().toISOString(),
    ...progressData,
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `cpsc240-progress-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Import study progress from a JSON file
 * @param {Function} callback - Callback function to handle the imported data
 */
export const importProgress = (callback) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";

  input.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Validate the data structure
        if (!data.version) {
          throw new Error("Invalid progress file: missing version");
        }

        callback(data);
      } catch (error) {
        console.error("Failed to import progress:", error);
        alert("Failed to import progress. Please ensure you selected a valid progress file.");
      }
    };

    reader.onerror = () => {
      alert("Failed to read file. Please try again.");
    };

    reader.readAsText(file);
  };

  input.click();
};

/**
 * Reset all progress data
 * @param {Function} callback - Callback function to handle the reset
 */
export const resetProgress = (callback) => {
  const confirmed = window.confirm(
    "Are you sure you want to reset all progress? This action cannot be undone."
  );

  if (confirmed) {
    callback();
  }
};
