interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    // Logic phân trang thông minh
    const getPaginationRange = () => {
        const delta = 2; // Số trang hiển thị trước và sau trang hiện tại
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <div className="flex justify-center items-center gap-2 mb-8">
            {/* Nút Previous */}
            {/* <button 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
                ←
            </button> */}
            
            {/* Các nút trang */}
            {getPaginationRange().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === '...'}
                    className={`px-3 py-2 ${
                        page === currentPage
                            ? 'underline'
                            : page === '...'
                            ? 'cursor-default'
                            : 'hover:underline cursor-pointer'
                    }`}
                >
                    {page}
                </button>
            ))}
            
            {/* Nút Next */}
            {/* <button 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                →
            </button> */}
        </div>
    );
};

export default Pagination; 