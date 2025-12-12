import React from "react";
import { DarkModeToggle } from "../shared";

const Header = ({ darkMode, onToggleDarkMode }) => (
  <header
    className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 p-4 sm:p-8 text-white relative"
    role="banner"
  >
    <div className="absolute top-4 right-4">
      <DarkModeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
    </div>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">CPSC 240 Exam 03</h1>
    <p className="text-sm sm:text-lg md:text-xl opacity-90">
      Computer Organization and Assembly Language Study Guide
    </p>
  </header>
);

export default Header;
