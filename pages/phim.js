import Head from 'next/head';
import { getLatestMovies, getMenuData } from '../lib/api';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Header from '../components/Header';

export default function AllMoviesPage({ movies, currentPage, totalPages, menuData }) {
    return (
        <>
            <Header menuData={menuData} />
            <div className="container">
                <Head><title>Thư Viện Phim | AnimeLOL</title></Head>
                <main>
                    <h1 className="title">Thư Viện Phim</h1>
                    <div className="movie-grid">
                        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/phim" />
                </main>
            </div>
            <style jsx global>{` body { background-color: #141414; color: white; margin: 0; } `}</style>
            <style jsx>{` .container { padding: 0 4%; } main { padding-top: 100px; min-height: 100vh; } .title { font-size: 2.5rem; margin-bottom: 2.5rem; text-align: center; } .movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; } `}</style>
        </>
    );
}

export async function getServerSideProps(context) {
    const currentPage = parseInt(context.query.page, 10) || 1;
    const [apiResult, menuData] = await Promise.all([getLatestMovies(currentPage), getMenuData()]);
    return { props: { movies: apiResult?.movies || [], totalPages: apiResult?.totalPages || 1, currentPage, menuData } };
}
