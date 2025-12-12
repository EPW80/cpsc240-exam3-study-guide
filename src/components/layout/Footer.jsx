import React from "react";

const Footer = () => (
  <footer className="text-center text-gray-700 dark:text-gray-300 pb-8" role="contentinfo">
    <p className="text-sm mb-2">
      Good luck on your exam! <span aria-hidden="true">🎓</span>
    </p>
    <p className="text-xs">
      Created by{" "}
      <a
        href="https://github.com/EPW80/cpsc240-exam3-study-guide"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Visit GitHub repository"
      >
        Erik P. Williams
      </a>
    </p>
  </footer>
);

export default Footer;
