import React, { lazy, Suspense, useState, useRef } from "react";
import { Header, TabNavigation, Footer, OverviewPage } from "./components/layout";
import { SearchBar, KeyboardShortcutsModal } from "./components/shared";
import { useAppContext } from "./context/AppContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { tabs } from "./constants/tabs";

// Lazy load problem components for better performance
const Problem1 = lazy(() => import("./components/problems/Problem1"));
const Problem2 = lazy(() => import("./components/problems/Problem2"));
const Problem3 = lazy(() => import("./components/problems/Problem3"));
const Problem4 = lazy(() => import("./components/problems/Problem4"));

const AlternateProblem1 = lazy(() => import("./components/alternate/AlternateProblem1"));
const AlternateProblem2 = lazy(() => import("./components/alternate/AlternateProblem2"));
const AlternateProblem3 = lazy(() => import("./components/alternate/AlternateProblem3"));
const AlternateProblem4 = lazy(() => import("./components/alternate/AlternateProblem4"));
const AlternateProblem5 = lazy(() => import("./components/alternate/AlternateProblem5"));
const AlternateProblem6 = lazy(() => import("./components/alternate/AlternateProblem6"));
const AlternateProblem7 = lazy(() => import("./components/alternate/AlternateProblem7"));

const QuickReference = lazy(() => import("./components/reference/QuickReference"));
const ExamTips = lazy(() => import("./components/reference/ExamTips"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[400px]" role="status" aria-live="polite">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400"></div>
    <span className="sr-only">Loading content...</span>
  </div>
);

const App = () => {
  // Get state and actions from context
  const { activeTab, setActiveTab, expandedSections, toggleSection, darkMode, setDarkMode } =
    useAppContext();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // Keyboard shortcuts modal state
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Determine if search should be shown (not on overview page)
  const showSearch = activeTab !== "overview";

  // Toggle dark mode handler
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Keyboard shortcuts configuration
  const shortcuts = {
    "/": () => {
      // Focus search bar
      if (showSearch && searchInputRef.current) {
        searchInputRef.current.querySelector("input")?.focus();
      }
    },
    escape: () => {
      // Clear search when not focused on input
      if (searchTerm && document.activeElement.tagName !== "INPUT") {
        setSearchTerm("");
      }
    },
    arrowleft: () => {
      // Previous tab
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1].id);
      }
    },
    arrowright: () => {
      // Next tab
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    },
    d: () => {
      // Toggle dark mode
      handleToggleDarkMode();
    },
    "?": () => {
      // Show keyboard shortcuts modal
      setShowShortcutsModal(true);
    },
  };

  // Enable keyboard shortcuts
  useKeyboardShortcuts(shortcuts);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-4 sm:mb-8">
          <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
          <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          <main
            id="main-content"
            className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 dark:text-gray-100 min-h-screen"
            role="main"
            aria-label="Study guide content"
          >
            {showSearch && (
              <div ref={searchInputRef} className="no-print">
                <SearchBar
                  placeholder="Search problems, concepts, or code..."
                  onSearch={setSearchTerm}
                />
              </div>
            )}

            {activeTab === "overview" && (
              <div role="tabpanel" id="tabpanel-overview" aria-labelledby="tab-overview">
                <OverviewPage setActiveTab={setActiveTab} />
              </div>
            )}

            <Suspense fallback={<LoadingSpinner />}>
              {activeTab === "problem1" && (
                <div
                  className="animate-slide-in"
                  role="tabpanel"
                  id="tabpanel-problem1"
                  aria-labelledby="tab-problem1"
                >
                  <Problem1 expandedSections={expandedSections} toggleSection={toggleSection} />
                </div>
              )}

              {activeTab === "problem2" && (
                <div
                  className="animate-slide-in"
                  role="tabpanel"
                  id="tabpanel-problem2"
                  aria-labelledby="tab-problem2"
                >
                  <Problem2 expandedSections={expandedSections} toggleSection={toggleSection} />
                </div>
              )}

              {activeTab === "problem3" && (
                <div
                  className="animate-slide-in"
                  role="tabpanel"
                  id="tabpanel-problem3"
                  aria-labelledby="tab-problem3"
                >
                  <Problem3 expandedSections={expandedSections} toggleSection={toggleSection} />
                </div>
              )}

              {activeTab === "problem4" && (
                <div
                  className="animate-slide-in"
                  role="tabpanel"
                  id="tabpanel-problem4"
                  aria-labelledby="tab-problem4"
                >
                  <Problem4 expandedSections={expandedSections} toggleSection={toggleSection} />
                </div>
              )}

              {activeTab === "alternate" && (
                <div
                  className="animate-slide-in space-y-8"
                  role="tabpanel"
                  id="tabpanel-alternate"
                  aria-labelledby="tab-alternate"
                >
                  <AlternateProblem1
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                  />
                  <hr className="my-8 border-t-2 border-purple-300" />
                  <AlternateProblem2
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                  />
                  <hr className="my-8 border-t-2 border-purple-300" />
                  <AlternateProblem3
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                  />
                  <hr className="my-8 border-t-2 border-purple-300" />
                  <AlternateProblem4
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                  />
                  <hr className="my-8 border-t-2 border-purple-300" />
                  <AlternateProblem5
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                  />
                  <hr className="my-8 border-t-2 border-purple-300" />
                  <AlternateProblem6
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                  />
                  <hr className="my-8 border-t-2 border-purple-300" />
                  <AlternateProblem7
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                  />
                </div>
              )}

              {activeTab === "reference" && (
                <div
                  className="animate-slide-in"
                  role="tabpanel"
                  id="tabpanel-reference"
                  aria-labelledby="tab-reference"
                >
                  <QuickReference />
                </div>
              )}

              {activeTab === "tips" && (
                <div
                  className="animate-slide-in"
                  role="tabpanel"
                  id="tabpanel-tips"
                  aria-labelledby="tab-tips"
                >
                  <ExamTips />
                </div>
              )}
            </Suspense>

            {/* Keyboard shortcuts hint */}
            {showSearch && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 no-print">
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                    /
                  </kbd>{" "}
                  Focus search{" "}
                  <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                    ←
                  </kbd>{" "}
                  <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                    →
                  </kbd>{" "}
                  Navigate tabs{" "}
                  <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                    D
                  </kbd>{" "}
                  Dark mode{" "}
                  <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                    ESC
                  </kbd>{" "}
                  Clear search{" · "}
                  <button
                    onClick={() => setShowShortcutsModal(true)}
                    className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:underline"
                  >
                    View all shortcuts
                  </button>
                </p>
              </div>
            )}
          </main>
        </div>

        <Footer />
      </div>

      {/* Keyboard shortcuts modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
    </div>
  );
};

export default App;
