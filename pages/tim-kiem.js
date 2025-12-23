import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchMovies } from '../lib/api';

// Chúng ta có thể tái sử dụng component MovieCard từ trang chủ
// Nhưng để dễ quản lý, hãy copy nó sang đây.
function MovieCard({ movie }) {
    const movieName = movie.title.rendered;
    const movieSlug = movie.slug;
    const posterUrl = movie.phim_data?.poster_url || '/default-poster.jpg';

    return (
        <Link href={`/phim/${movieSlug}`} passHref legacyBehavior>
            <a className="movie-card">
                <img src={posterUrl} alt={movieName} />
                <div className="movie-name">{movieName}</div>
                <style jsx>{`
                    /* CSS giống hệt trang chủ */
                    .movie-card { display: block; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.2s ease-in-out; background-color: white; text-decoration: none; color: inherit; }
                    .movie-card:hover { transform: translateY(-5px); }
                    img { width: 100%; height: auto; display: block; aspect-ratio: 2 / 3; object-fit: cover; }
                    .movie-name { padding: 12px; font-weight: 600; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                `}</style>
            </a>
        </Link>
    );
}


export default function SearchPage({ movies, keyword }) {
    const router = useRouter();

    // Nếu đang tải, có thể hiển thị một thông báo
    if (router.isFallback) {
        return <div>Đang tìm kiếm...</div>;
    }

    return (
        <div className="container">
            <Head>
                <title>{`Kết quả tìm kiếm cho "${keyword}"`}</title>
            </Head>

            <main>
                <h1 className="title">
                    Kết quả tìm kiếm cho: <span>"{keyword}"</span>
                </h1>
                
                {/* Kiểm tra xem có kết quả hay không */}
                {movies && movies.length > 0 ? (
                    <div className="movie-grid">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p className="no-results">Không tìm thấy kết quả nào phù hợp.</p>
                )}
            </main>

            {/* Sử dụng lại CSS từ trang chủ */}
            <style jsx>{`
                .container { padding: 2rem; }
                main { min-height: 100vh; padding-top: 4rem; display: flex; flex-direction: column; align-items: center; }
                .title { font-size: 2rem; margin-bottom: 2.5rem; color: #333; text-align: center; }
                .title span { color: #0070f3; }
                .movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.5rem; width: 100%; max-width: 1400px; }
                .no-results { font-size: 1.2rem; color: #555; }
            `}</style>
        </div>
    );
}

// Hàm này chạy ở server mỗi khi có request đến trang /tim-kiem
export async function getServerSideProps(context) {
    // Lấy từ khóa từ URL, ví dụ: /tim-kiem?tu-khoa=avatar
    const keyword = context.query.q || ''; 

    // Nếu có từ khóa, gọi API tìm kiếm
    const movies = keyword ? await searchMovies(keyword) : [];

    return {
        props: {
            movies: movies || [],
            keyword: keyword, // Truyền từ khóa xuống để hiển thị
        },
    };
}
