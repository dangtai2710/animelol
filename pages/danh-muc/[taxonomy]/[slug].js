import Head from 'next/head';
import Link from 'next/link';
import { getMoviesByTaxonomy } from '../../../lib/api'; // Lưu ý đường dẫn có 3 dấu chấm

// Tái sử dụng MovieCard
function MovieCard({ movie }) {
    // ... (Code MovieCard giống hệt trang chủ)
    const movieName = movie.title.rendered;
    const movieSlug = movie.slug;
    const posterUrl = movie.phim_data?.poster_url || '/default-poster.jpg';
    return (
        <Link href={`/phim/${movieSlug}`} passHref legacyBehavior>
            <a className="movie-card">
                <img src={posterUrl} alt={movieName} />
                <div className="movie-name">{movieName}</div>
                <style jsx>{`
                    .movie-card { display: block; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.2s ease-in-out; background-color: white; text-decoration: none; color: inherit; }
                    .movie-card:hover { transform: translateY(-5px); }
                    img { width: 100%; height: auto; display: block; aspect-ratio: 2 / 3; object-fit: cover; }
                    .movie-name { padding: 12px; font-weight: 600; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                `}</style>
            </a>
        </Link>
    );
}

export default function TaxonomyPage({ movies, termInfo }) {
    if (!termInfo) {
        return <div>Danh mục không tồn tại.</div>
    }

    return (
        <div className="container">
            <Head>
                <title>{`Phim ${termInfo.name}`}</title>
            </Head>

            <main>
                <h1 className="title">
                    {termInfo.taxonomy_name}: <span>{termInfo.name}</span>
                </h1>
                
                {movies && movies.length > 0 ? (
                    <div className="movie-grid">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p className="no-results">Không có phim nào trong danh mục này.</p>
                )}
            </main>

            {/* CSS giống trang tìm kiếm */}
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

// Hàm này là "bộ não" của trang
export async function getServerSideProps(context) {
    const { taxonomy, slug } = context.params;

    // Ánh xạ từ slug trên URL sang slug taxonomy thật của WordPress
    const taxonomyMap = {
        'the-loai': { name: 'Thể loại', api: 'ophim_genres' },
        'quoc-gia': { name: 'Quốc gia', api: 'ophim_regions' },
        'danh-muc': { name: 'Danh mục', api: 'ophim_categories' },
    };

    if (!taxonomyMap[taxonomy]) {
        return { notFound: true }; // Nếu URL là /abc/xyz thì báo lỗi 404
    }

    const wpTaxonomy = taxonomyMap[taxonomy].api;
    const taxonomyName = taxonomyMap[taxonomy].name;

    // Bước 1: Lấy ID của term (thể loại/quốc gia) từ slug của nó
    const termRes = await fetch(`https://animelol.org/wp-json/wp/v2/${wpTaxonomy}?slug=${slug}`);
    const termData = await termRes.json();

    if (!termData || termData.length === 0) {
        return { notFound: true }; // Không tìm thấy thể loại/quốc gia này
    }
    
    const termId = termData[0].id;
    const termName = termData[0].name;

    // Bước 2: Dùng ID vừa lấy được để tìm tất cả các phim thuộc về nó
    const movies = await getMoviesByTaxonomy(wpTaxonomy, termId);

    return {
        props: {
            movies: movies || [],
            termInfo: {
                name: termName,
                taxonomy_name: taxonomyName,
            }
        },
    };
}
