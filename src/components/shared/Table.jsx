import React from "react";

/**
 * Responsive table component with styled headers and alternating row colors
 * @param {Object} props
 * @param {string[]} props.headers - Array of column header strings
 * @param {Array<Array<string|number>>} props.rows - 2D array of table cell values
 * @returns {JSX.Element}
 */
const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto mb-4">
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          {headers.map((header, i) => (
            <th
              key={i}
              className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            {row.map((cell, j) => (
              <td
                key={j}
                className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm font-mono"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
