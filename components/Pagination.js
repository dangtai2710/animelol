import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, basePath = '/' }) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            {/* Nút Trang Trước */}
            {currentPage > 1 && (
                // THÊM legacyBehavior VÀO ĐÂY
                <Link href={`${basePath}?page=${currentPage - 1}`} legacyBehavior>
                    <a className="page-link">‹ Trước</a>
                </Link>
            )}

            {/* Các nút số trang */}
            {pages.map(page => (
                // THÊM legacyBehavior VÀO ĐÂY
                <Link key={page} href={`${basePath}?page=${page}`} legacyBehavior>
                    <a className={page === currentPage ? 'page-link active' : 'page-link'}>
                        {page}
                    </a>
                </Link>
            ))}

            {/* Nút Trang Sau */}
            {currentPage < totalPages && (
                // THÊM legacyBehavior VÀO ĐÂY
                <Link href={`${basePath}?page=${currentPage + 1}`} legacyBehavior>
                    <a className="page-link">Sau ›</a>
                </Link>
            )}

            <style jsx>{`
                .pagination {
                    margin-top: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .page-link {
                    display: block;
                    padding: 8px 14px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    text-decoration: none;
                    color: #333;
                    transition: background-color 0.2s, border-color 0.2s;
                }
                .page-link:hover {
                    background-color: #f0f0f0;
                    border-color: #999;
                }
                .page-link.active {
                    background-color: #0070f3;
                    color: white;
                    border-color: #0070f3;
                    font-weight: bold;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
