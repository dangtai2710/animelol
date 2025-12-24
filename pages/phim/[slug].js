import Head from 'next/head';
import Link from 'next/link';
import { getMovieDetails, getMenuData, getMoviesByTerm } from '../../lib/api';
import Header from '../../components/Header';
import MovieSlider from '../../components/MovieSlider';

export default function MovieIntroPage({ movieData, menuData, relatedMovies }) {
    if (!movieData) return null;

    const { name, origin_name, content, thumb_url, slug, seo_description } = movieData;
    const { year, quality, lang, genres, regions } = movieData.phim_data;

    // Ảnh dùng cho Intro: Ưu tiên dùng thumb_url, nếu không có thì dùng poster_url (phòng hờ)
    const displayImage = thumb_url || movieData.poster_url;

    return (
        <>
            <Header menuData={menuData} />
            <div className="intro-container">
                <Head>
                    <title>{`${name} - Thông tin phim | AnimeLOL`}</title>
                    {/* === SỬ DỤNG META DESCRIPTION CHUẨN SEO CỦA BẠN === */}
                    <meta name="description" content={seo_description} />
                    <meta property="og:description" content={seo_description} />
                    <meta property="og:image" content={displayImage} />
                </Head>
                
                {/* Ảnh nền mờ phía sau */}
                <div className="backdrop" style={{ backgroundImage: `url(${displayImage})` }}></div>

                <main className="content">
                    <div className="movie-info-wrapper">
                        {/* Cột trái: Thumbnail lớn làm bìa */}
                        <div className="poster-col">
                            <img src={displayImage} alt={name} className="main-thumb" />
                            <Link href={`/xem-phim/${slug}`} legacyBehavior>
                                <a className="btn-watch-now">▶ XEM PHIM</a>
                            </Link>
                        </div>

                        {/* Cột phải: Thông tin */}
                        <div className="info-col">
                            <h1 className="title">{name}</h1>
                            <h2 className="origin-title">{origin_name} {year ? `(${year})` : ''}</h2>
                            
                            <div className="meta-info">
                                <span className="badge">{quality}</span>
                                <span className="badge">{lang}</span>
                                <span className="text-info"><b>Quốc gia:</b> {regions?.map(r => r.name).join(', ')}</span>
                            </div>

                            <div className="genres">
                                {genres?.map(g => (
                                    <Link key={g.id} href={`/the-loai/${g.slug}`} legacyBehavior>
                                        <a className="genre-tag">{g.name}</a>
                                    </Link>
                                ))}
                            </div>

                            <div className="description">
                                <h3>Nội dung phim</h3>
                                <div className="text" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>

                    <div className="related-section">
                        <MovieSlider title="Phim Liên Quan" movies={relatedMovies} />
                    </div>
                </main>
            </div>

            <style jsx>{`
                .intro-container { position: relative; min-height: 100vh; color: white; padding-top: 80px; }
                .backdrop { position: absolute; top: 0; left: 0; width: 100%; height: 600px; background-size: cover; background-position: center; filter: blur(40px) brightness(0.25); z-index: -1; }
                .content { position: relative; z-index: 1; padding: 40px 4%; }
                .movie-info-wrapper { display: flex; gap: 40px; max-width: 1200px; margin: 0 auto 60px auto; }
                
                /* Chỉnh lại cột ảnh vì thumb là ảnh ngang */
                .poster-col { flex: 0 0 450px; } 
                .main-thumb { width: 100%; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); margin-bottom: 20px; aspect-ratio: 16/9; object-fit: cover; }
                
                .btn-watch-now { display: block; width: 100%; padding: 15px; background: #e50914; color: white; text-align: center; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 1.2rem; }
                
                .info-col { flex: 1; }
                .title { font-size: 3rem; margin: 0 0 10px 0; font-weight: 800; }
                .origin-title { font-size: 1.3rem; color: #aaa; margin-bottom: 25px; }
                .meta-info { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
                .badge { background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 4px; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.2); }
                .genre-tag { display: inline-block; padding: 6px 18px; border: 1px solid #e50914; color: #e50914; border-radius: 4px; text-decoration: none; margin-right: 10px; font-weight: 500; }
                .description h3 { font-size: 1.5rem; margin-bottom: 15px; border-left: 4px solid #e50914; padding-left: 15px; }
                .text { line-height: 1.8; color: #ccc; font-size: 1.05rem; }
                .related-section { margin-top: 80px; border-top: 1px solid #333; padding-top: 40px; }

                @media (max-width: 992px) {
    .movie-info-wrapper { flex-direction: column; align-items: center; }
    
    /* Chỉ căn giữa các phần thông tin chính */
    .title, .origin-title, .meta-info, .genres { 
        text-align: center; 
        justify-content: center; 
    }

    .poster-col { width: 100%; max-width: 500px; }

    /* === SỬA LẠI PHẦN NỘI DUNG PHIM === */
    .description {
        text-align: left; /* Quay về căn lề trái để dễ đọc */
        width: 100%;
    }
    .description h3 { 
        border-left: 4px solid #e50914; 
        padding-left: 15px; 
        text-align: left; 
    }
    .text {
        text-align: justify; /* Căn đều hai bên cho chuyên nghiệp trên mobile */
    }
}
            `}</style>
            <style jsx global>{` 
    body { 
        background-color: #141414; 
        color: white; 
        margin: 0; 
        font-family: 'Roboto', sans-serif; /* Đảm bảo dùng Roboto */
    } 
`}</style>
        </>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const [movieData, menuData] = await Promise.all([getMovieDetails(slug), getMenuData()]);
    if (!movieData) return { notFound: true };

    let relatedMovies = [];
    const firstGenreId = movieData.phim_data.genres?.[0]?.term_id; // Lưu ý WordPress dùng term_id
    if (firstGenreId) {
        const relatedResult = await getMoviesByTerm('ophim_genres', firstGenreId, 1);
        relatedMovies = (relatedResult?.movies || []).filter(m => m.id !== movieData.id).slice(0, 10);
    }

    return { props: { movieData, menuData, relatedMovies } };
}
