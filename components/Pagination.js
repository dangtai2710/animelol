import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, basePath }) {
    if (totalPages <= 1) return null;

    // Logic để tính toán xem hiển thị những số trang nào
    const getPageNumbers = () => {
        const pages = [];
        const range = 2; // Số trang hiển thị ở mỗi bên của trang hiện tại

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // Luôn hiện trang đầu
                i === totalPages || // Luôn hiện trang cuối
                (i >= currentPage - range && i <= currentPage + range) // Hiện các trang xung quanh trang hiện tại
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...'); // Thêm dấu ba chấm nếu có khoảng cách
            }
        }
        return pages;
    };

    return (
        <div className="pagination-container">
            {/* Nút TRƯỚC */}
            {currentPage > 1 && (
                <Link href={`${basePath}?page=${currentPage - 1}`} legacyBehavior>
                    <a className="page-btn">‹ Trước</a>
                </Link>
            )}

            {/* CÁC SỐ TRANG */}
            <div className="page-numbers">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className="dots">...</span>
                    ) : (
                        <Link key={page} href={`${basePath}?page=${page}`} legacyBehavior>
                            <a className={`page-btn ${page === currentPage ? 'active' : ''}`}>
                                {page}
                            </a>
                        </Link>
                    )
                ))}
            </div>

            {/* Nút SAU */}
            {currentPage < totalPages && (
                <Link href={`${basePath}?page=${currentPage + 1}`} legacyBehavior>
                    <a className="page-btn">Sau ›</a>
                </Link>
            )}

            <style jsx>{`
                .pagination-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 4rem 0;
                    gap: 10px;
                }
                .page-numbers {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .page-btn {
                    padding: 8px 16px;
                    background-color: #222; /* Màu đen nhạt */
                    color: #fff;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    border: 1px solid transparent;
                }
                .page-btn:hover {
                    background-color: #333;
                    border-color: #666;
                }
                .page-btn.active {
                    background-color: #e50914; /* MÀU ĐỎ NETFLIX */
                    color: white;
                    pointer-events: none; /* Không cho bấm vào trang hiện tại */
                }
                .dots {
                    color: #666;
                    padding: 0 5px;
                }

                /* Responsive cho mobile */
                @media (max-width: 600px) {
                    .page-btn {
                        padding: 6px 12px;
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
