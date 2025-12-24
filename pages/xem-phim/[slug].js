import Head from 'next/head';
import { getMovieDetails, getMenuData } from '../../lib/api';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';

export default function WatchPage({ movieData, menuData }) {
    const [activeEpisode, setActiveEpisode] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        if (movieData?.episodes) {
            const raw = movieData.episodes;
            const normalized = Array.isArray(raw) ? raw : [raw];
            if (normalized.length > 0) {
                const serverData = normalized[0].server_data || [];
                setEpisodes(serverData);
                if (serverData.length > 0) setActiveEpisode(serverData[0].link_embed);
            }
        }
    }, [movieData]);

    if (!movieData) return null;

    return (
        <>
            <Header menuData={menuData} />
            <div className="container">
                <Head><title>{`Đang xem: ${movieData.name} | AnimeLOL`}</title></Head>
                <main style={{padding: '100px 4%', color: 'white'}}>
                    <h1 style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>{movieData.name}</h1>
                    <div className="player-box" style={{aspectRatio: '16/9', background: '#000', marginBottom: '2rem'}}>
                        {activeEpisode ? <iframe src={activeEpisode} width="100%" height="100%" allowFullScreen frameBorder="0"></iframe> : <p>Chưa có link xem.</p>}
                    </div>
                    <div className="episode-list" style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                        {episodes.map((ep, index) => (
                            <button key={index} onClick={() => setActiveEpisode(ep.link_embed)} style={{padding: '10px 20px', background: activeEpisode === ep.link_embed ? '#e50914' : '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                                {ep.name}
                            </button>
                        ))}
                    </div>
                </main>
            </div>
            <style jsx global>{` body { background-color: #141414; color: white; margin: 0; } `}</style>
        </>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const [movieData, menuData] = await Promise.all([getMovieDetails(slug), getMenuData()]);
    if (!movieData) return { notFound: true };
    return { props: { movieData, menuData } };
}
