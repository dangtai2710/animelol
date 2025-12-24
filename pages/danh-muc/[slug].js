import Head from 'next/head';
import { getMenuData, getMoviesByTerm } from '../../lib/api';
import MovieCard from '../../components/MovieCard';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';

export default function TaxonomyPage({ movies, termInfo, currentPage, totalPages, menuData }) {
    if (!termInfo) return null;
    return (
        <><Header menuData={menuData} /><div className="container">
            <Head><title>{`Phim ${termInfo.name} | AnimeLOL`}</title></Head>
            <main style={{padding: '100px 4%', color: 'white'}}>
                <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Danh mục: {termInfo.name}</h1>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
                    {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/danh-muc/${termInfo.slug}`} />
            </main>
        </div><style jsx global>{` body { background-color: #141414; color: white; margin: 0; } `}</style></>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const currentPage = parseInt(context.query.page, 10) || 1;
    const menuData = await getMenuData();
    const termInfo = menuData?.categories.find(item => item.slug === slug);
    if (!termInfo) return { notFound: true };

    const apiResult = await getMoviesByTerm('ophim_categories', termInfo.id, currentPage);

    return { props: { 
        movies: apiResult?.movies || [], 
        totalPages: apiResult?.totalPages || 1, 
        currentPage, termInfo, menuData 
    } };
}
