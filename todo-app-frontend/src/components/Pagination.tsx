import React from 'react';

/**
 * PaginationProps Interface
 * ------------------------
 * @property {number} currPage - Current active page (1-based index)
 * @property {function} setCurrPage - Callback to update current page
 * @property {number} totalPages - Total number of available pages
 * 
 * Usage:
 * <Pagination 
 *   currPage={1} 
 *   setCurrPage={(page) => void} 
 *   totalPages={10} 
 * />
 */

interface PaginationProps {
  currPage: number;
  setCurrPage: (page: number) => void;
  totalPages: number;
}
/**
 * Pagination Component
 * -------------------
 * Renders a pagination control with prev/next buttons and page numbers.
 * Completely controlled by parent component through props.
 * 
 * Key Features:
 * - Previous/Next navigation buttons
 * - Individual page number buttons
 * - Visual indication of current page
 * - Automatic disable state for boundary conditions
 * 
 * @component
 */

function Pagination({ currPage, setCurrPage, totalPages }: PaginationProps) {
  /**
   * Pages Array Generation
   * ---------------------
   * Creates an array of page numbers from 1 to totalPages
   * Used to render individual page buttons
   * 
   * Example:
   * totalPages = 3 → pages = [1, 2, 3]
   * 
   * WARNING: 
   * - Don't modify this logic without updating button rendering
   * - Array is regenerated on every render - acceptable for small page counts
   */
  
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={currPage === 1}
        onClick={() => setCurrPage(currPage - 1)}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 text-white rounded-md hover:bg-blue-600 ${currPage === page ? 'bg-blue-600' : 'bg-blue-500'}`}
          onClick={() => setCurrPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={currPage === totalPages} 
        onClick={() => {
          if (currPage < totalPages) {
            setCurrPage(currPage + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
