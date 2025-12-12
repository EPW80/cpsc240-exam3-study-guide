import React from "react";

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => (
  <nav
    className="bg-gray-100 dark:bg-gray-700 px-2 sm:px-4 py-2 overflow-x-auto"
    role="navigation"
    aria-label="Main navigation"
  >
    <div className="flex space-x-1 sm:space-x-2 min-w-max" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          id={`tab-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          className={`px-3 sm:px-6 py-3 rounded-t-lg font-semibold text-xs sm:text-base transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            activeTab === tab.id
              ? "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-md"
              : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
          }`}
        >
          <span className="mr-1 sm:mr-2" aria-hidden="true">
            {tab.icon}
          </span>
          <span className="hidden sm:inline">{tab.name}</span>
          <span className="sm:hidden">{tab.name.split(" ")[0]}</span>
        </button>
      ))}
    </div>
  </nav>
);

export default TabNavigation;
