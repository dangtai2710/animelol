import Head from 'next/head';
import { useRouter } from 'next/router';
import { searchMovies, getMenuData } from '../lib/api';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

export default function SearchPage({ movies, keyword, menuData }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div style={{color:'white', padding:'100px'}}>Đang tìm kiếm...</div>;
    }

    return (
        <>
            {/* THÊM HEADER VÀO ĐÂY */}
            <Header menuData={menuData} />

            <div className="container">
                <Head>
                    <title>{`Kết quả tìm kiếm cho "${keyword}" | AnimeLOL`}</title>
                </Head>

                <main>
                    <h1 className="title">
                        Kết quả cho: <span>"{keyword}"</span>
                    </h1>
                    
                    {movies && movies.length > 0 ? (
                        <div className="movie-grid">
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">Không tìm thấy phim nào phù hợp với từ khóa "{keyword}".</p>
                    )}
                </main>

                <style jsx global>{`
                    body { background-color: #141414; color: white; margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                `}</style>
                <style jsx>{`
                    .container { padding: 0 4%; }
                    main { min-height: 100vh; padding-top: 100px; display: flex; flex-direction: column; align-items: center; }
                    .title { font-size: 2rem; margin-bottom: 3rem; color: #e5e5e5; text-align: center; }
                    .title span { color: #e50914; font-weight: bold; }
                    .movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; width: 100%; }
                    .no-results { font-size: 1.2rem; color: #888; margin-top: 5rem; }
                `}</style>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const keyword = context.query.q || ''; 

    // Lấy dữ liệu phim và dữ liệu menu CÙNG LÚC
    const [movies, menuData] = await Promise.all([
        keyword ? searchMovies(keyword) : [],
        getMenuData()
    ]);

    return {
        props: {
            movies: movies || [],
            keyword: keyword,
            menuData: menuData || { genres: [], regions: [], categories: [] }
        },
    };
}
