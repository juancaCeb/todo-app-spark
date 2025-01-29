import React from 'react';

interface PaginationProps {
  currPage: number;
  setCurrPage: (page:number) => void;
}



function Pagination ({ currPage, setCurrPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled
      >
        Prev
      </button>

      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        1
      </button>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        2
      </button>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        3
      </button>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        4
      </button>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        5
      </button>

      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
