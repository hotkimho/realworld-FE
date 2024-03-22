// Pagination.tsx
import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    onPageChange: (selectedItem: { selected: number }) => void;
    pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, pageCount }) => {
    return (
        <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            containerClassName="flex flex-row justify-center gap-2" // flex와 flex-row를
            activeClassName={'active'}
            disabledClassName={'disabled'}
        />
    );
};

export default Pagination;
