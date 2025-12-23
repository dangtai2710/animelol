import Head from 'next/head';
import { getLatestMovies, getMoviesByGenre, getMoviesByCountry } from '../lib/api';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MovieSlider from '../components/MovieSlider'; // << DÒNG IMPORT BỊ THIẾU LÀ ĐÂY

export default function NetflixPage({ 
    latestMovies, 
    actionMovies, 
    koreanMovies, 
    comedyMovies, 
    vietnamMovies 
}) {
    const heroMovie = latestMovies?.[0];

    return (
        <div className="netflix-container">
            <Head>
                <title>AnimeLOL - Giao diện Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main>
                <HeroSection movie={heroMovie} />
                
                <div className="movie-rows-container">
                    <MovieSlider title="Mới Cập Nhật" movies={latestMovies} />
                    <MovieSlider title="Phim Hành Động" movies={actionMovies} />
                    <MovieSlider title="Phim Hàn Quốc" movies={koreanMovies} />
                    <MovieSlider title="Phim Hài Hước" movies={comedyMovies} />
                    <MovieSlider title="Phim Việt Nam" movies={vietnamMovies} />
                </div>
            </main>

            <style jsx global>{`
                body { background-color: #141414; color: white; margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
            `}</style>
            <style jsx>{`
                .movie-rows-container {
                    margin-top: -10vh;
                    position: relative;
                    z-index: 10;
                }
            `}</style>
        </div>
    );
}

// Hàm getServerSideProps không đổi
export async function getServerSideProps() {
    const ACTION_GENRE_ID = 72;
    const KOREA_COUNTRY_ID = 784;
    const COMEDY_GENRE_ID = 11;
    const VIETNAM_COUNTRY_ID = 4820;
    
    const [
        latestMoviesResult,
        actionMovies,
        koreanMovies,
        comedyMovies,
        vietnamMovies
    ] = await Promise.all([
        getLatestMovies(1),
        getMoviesByGenre(ACTION_GENRE_ID),
        getMoviesByCountry(KOREA_COUNTRY_ID),
        getMoviesByGenre(COMEDY_GENRE_ID),
        getMoviesByCountry(VIETNAM_COUNTRY_ID)
    ]);

    return {
        props: {
            latestMovies: latestMoviesResult?.movies || [],
            actionMovies: actionMovies || [],
            koreanMovies: koreanMovies || [],
            comedyMovies: comedyMovies || [],
            vietnamMovies: vietnamMovies || [],
        },
    };
}
