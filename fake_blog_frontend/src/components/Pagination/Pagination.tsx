import React from 'react';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    totalPages,
    onPageChange,
}) => {
    const prevPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const nextPage = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    const goToPage = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 1; i <= Math.min(totalPages, 4); i++) {
            buttons.push(
                <button
                    key={i}
                    className={`p-2 border rounded shadow-sm border-gray-300 ${
                        page === i ? 'text-yellow-400' : ''
                    }`}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </button>
            );
        }

        if (totalPages > 4) {
            buttons.push(<span key="ellipsis">...</span>);
            buttons.push(
                <button
                    key={totalPages}
                    className={`p-2 border rounded shadow-sm border-gray-300 ${
                        page === totalPages ? 'text-yellow-400' : ''
                    }`}
                    onClick={() => goToPage(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex justify-center mt-5 space-x-2 mb-4">
            <button
                onClick={prevPage}
                className={`p-2 border rounded shadow-sm border-gray-300`}
                disabled={page === 1}
            >
                {'<<'}
            </button>
            {renderPageButtons()}
            <button
                onClick={nextPage}
                className={`p-2 border rounded shadow-sm border-gray-300`}
                disabled={page === totalPages}
            >
                {'>>'}
            </button>
        </div>
    );
};

export default Pagination;
