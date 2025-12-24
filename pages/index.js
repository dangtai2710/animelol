import Head from 'next/head';
import { getMenuData, getLatestMovies, getMoviesByGenre, getMoviesByCountry, getSettings } from '../lib/api';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MovieSlider from '../components/MovieSlider';
import Footer from '../components/Footer'; // << NHỚ IMPORT FOOTER

export default function NetflixPage({ 
    latestMovies, 
    actionMovies, 
    koreanMovies, 
    comedyMovies, 
    vietnamMovies,
    menuData,
    settings // << NHẬN DỮ LIỆU SETTINGS
}) {
    const heroMovie = latestMovies?.[0];

    return (
        <div className="netflix-container">
            <Head>
                <title>AnimeLOL - Giao diện Netflix</title>
                {/* Favicon sẽ tự động đổi theo cài đặt trong _app.js, nhưng ta cũng để ở đây cho chắc */}
                <link rel="icon" href={settings?.favicon_url || "/favicon.ico"} />
            </Head>

            {/* Truyền cả menuData và settings cho Header */}
            <Header menuData={menuData} settings={settings} />

            <main>
                <HeroSection movie={heroMovie} />
                
                <div className="sliders-container">
                    <MovieSlider title="Mới Cập Nhật" movies={latestMovies} />
                    <MovieSlider title="Phim Hành Động" movies={actionMovies} />
                    <MovieSlider title="Phim Hàn Quốc" movies={koreanMovies} />
                    <MovieSlider title="Phim Hài Hước" movies={comedyMovies} />
                    <MovieSlider title="Phim Việt Nam" movies={vietnamMovies} />
                </div>
            </main>

            {/* THÊM FOOTER VÀO CUỐI TRANG */}
            <Footer settings={settings} />

            <style jsx global>{`
                body { background-color: #141414; color: white; margin: 0; font-family: 'Roboto', sans-serif; }
            `}</style>
            <style jsx>{`
                .sliders-container {
                    margin-top: -10vh;
                    position: relative;
                    z-index: 10;
                }
            `}</style>
        </div>
    );
}

export async function getServerSideProps() {
    const ACTION_GENRE_ID = 72;
    const KOREA_COUNTRY_ID = 784;
    const COMEDY_GENRE_ID = 11;
    const VIETNAM_COUNTRY_ID = 4820;
    
    // Gọi TẤT CẢ các API cùng lúc, bao gồm cả getSettings
    const [
        latestMoviesResult,
        actionMovies,
        koreanMovies,
        comedyMovies,
        vietnamMovies,
        menuData,
        settings // << THÊM BIẾN NÀY
    ] = await Promise.all([
        getLatestMovies(1),
        getMoviesByGenre(ACTION_GENRE_ID),
        getMoviesByCountry(KOREA_COUNTRY_ID),
        getMoviesByGenre(COMEDY_GENRE_ID),
        getMoviesByCountry(VIETNAM_COUNTRY_ID),
        getMenuData(),
        getSettings() // << GỌI HÀM LẤY CÀI ĐẶT
    ]);

    return {
        props: {
            latestMovies: latestMoviesResult?.movies || [],
            actionMovies: actionMovies || [],
            koreanMovies: koreanMovies || [],
            comedyMovies: comedyMovies || [],
            vietnamMovies: vietnamMovies || [],
            menuData: menuData || { genres: [], regions: [], categories: [] },
            settings: settings || null // << TRẢ VỀ SETTINGS
        },
    };
}
