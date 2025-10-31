type Props = {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (next: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange } : Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize)) || 0;
    const canGoBack = page > 1;
    const canGoNex = page < totalPages;
    return (
        <div className="flex items-center gap-2">
            <button 
            className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-blue-600 hover:text-white"
            disabled={!canGoBack}
            onClick={() => onPageChange( page - 1)}
            >Prev</button>
            <span className="text-sm">
                {page || 0} / {totalPages}
            </span>
            <button 
            className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-blue-600 hover:text-white"
            disabled={!canGoNex}
            onClick={() => onPageChange(page + 1)}
            >Next</button>
        </div>

    );
}