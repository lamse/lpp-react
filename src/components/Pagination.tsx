import React from 'react';
import {PaginationResponse} from "../interfaces/product.interface";

interface PaginationProps {
  pagination: PaginationResponse<any>;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 0; i < pagination.totalPages; i++) {
    pageNumbers.push(i);
  }

  const onChange = (page: number) => {
    if (page < 0 || page >= pagination.totalPages) {
      return; // Prevent changing to an invalid page
    }
    onPageChange(page);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center gap-2">
        <li className={`page-item rounded-md p-1 px-2 ${pagination.first ? 'bg-gray-200' : 'bg-blue-200'}`}>
          <button onClick={() => onChange(0)} className="page-link">
            ↤
          </button>
        </li>
        <li className={`page-item rounded-md p-1 px-2 ${pagination.number === 0 ? 'bg-gray-200' : 'bg-blue-200'}`}>
          <button onClick={() => onChange(pagination.number - 1)} className="page-link">
            ↢
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item rounded-md p-1 px-2 ${number === pagination.number ? 'bg-gray-200' : 'bg-blue-200'}`}>
            <button onClick={() => onChange(number)} className="page-link">
              {number + 1}
            </button>
          </li>
        ))}
        <li className={`page-item rounded-md p-1 px-2 ${pagination.number === pagination.totalPages - 1 ? 'bg-gray-200' : 'bg-blue-200'}`}>
          <button onClick={() => onChange(pagination.number + 1)} className="page-link">
            ↣
          </button>
        </li>
        <li className={`page-item rounded-md p-1 px-2 ${pagination.last ? 'bg-gray-200' : 'bg-blue-200'}`}>
          <button onClick={() => onChange(pagination.totalPages)} className="page-link">
            ↦
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
