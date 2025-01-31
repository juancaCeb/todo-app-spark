import React from 'react';

interface PaginationProps {
  currPage: number;
  setCurrPage: (page: number) => void;
  totalPages: number;
}

function Pagination({ currPage, setCurrPage, totalPages }: PaginationProps) {
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
