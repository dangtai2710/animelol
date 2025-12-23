import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getMovieDetails } from '../../lib/api';

export default function MovieDetailPage({ movieData }) {
    const router = useRouter();

    const [servers, setServers] = useState([]);
    const [activeServerIndex, setActiveServerIndex] = useState(0);
    const [activeEpisodeUrl, setActiveEpisodeUrl] = useState('');

    useEffect(() => {
        if (movieData && movieData.episodes) {
            let rawServers = [];
            // === LOGIC SỬA LỖI QUAN TRỌNG ===
            // Nếu episodes là một object, bọc nó vào một mảng
            if (!Array.isArray(movieData.episodes)) {
                rawServers = [movieData.episodes]; 
            } else { // Nếu nó đã là một mảng, dùng nó
                rawServers = movieData.episodes;
            }
            // =================================

            if (rawServers.length > 0) {
                setServers(rawServers);
                const firstServerEpisodes = rawServers[0]?.server_data || [];
                if (firstServerEpisodes.length > 0) {
                    setActiveEpisodeUrl(firstServerEpisodes[0].link_embed);
                }
            }
        }
    }, [movieData]);

    // Các hàm xử lý sự kiện giữ nguyên
    const handleServerChange = (serverIndex) => {
        setActiveServerIndex(serverIndex);
        const newServerEpisodes = servers[serverIndex]?.server_data || [];
        setActiveEpisodeUrl(newServerEpisodes.length > 0 ? newServerEpisodes[0].link_embed : '');
    };
    const handleEpisodeChange = (episodeUrl) => {
        setActiveEpisodeUrl(episodeUrl);
    };

    const currentEpisodes = servers[activeServerIndex]?.server_data || [];

    if (router.isFallback) return <div>Đang tải...</div>;
    if (!movieData) return <div>Không tìm thấy phim hoặc có lỗi xảy ra.</div>;
    
    const isSeries = currentEpisodes.length > 1;
    const genres = movieData.phim_data?.genres || [];
    const regions = movieData.phim_data?.regions || [];

    return (
        <div className="container">
            <Head>
                <title>{movieData.name}</title>
            </Head>
            <main>
                <h1 className="movie-title">{movieData.name}</h1>
                <p className="movie-origin-name">{movieData.origin_name}</p>

                <div className="movie-player-container">
                    {activeEpisodeUrl ? ( <iframe key={activeEpisodeUrl} src={activeEpisodeUrl} allowFullScreen title="Movie Player"></iframe> ) : ( <div className="no-episode-notice">Phim hiện chưa có link xem.</div> )}
                </div>

                {servers.length > 1 && (
                    <div className="list-container">
                        <h2>Chọn Server</h2>
                        <div className="list-buttons">
                            {servers.map((server, index) => (
                                <button key={server.server_name + index} onClick={() => handleServerChange(index)} className={activeServerIndex === index ? 'list-button active' : 'list-button'}>
                                    {server.server_name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {isSeries && (
                    <div className="list-container">
                        <h2>Danh sách tập</h2>
                        <div className="list-buttons">
                            {currentEpisodes.map((episode) => (
                                <button key={episode.slug} onClick={() => handleEpisodeChange(episode.link_embed)} className={activeEpisodeUrl === episode.link_embed ? 'list-button active' : 'list-button'}>
                                    {episode.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="movie-details">
                    <div className="meta-lists">
                        {genres.length > 0 && (
                            <p><b>Thể loại:</b> {genres.map(term => (
                                <Link key={term.id} href={`/danh-muc/the-loai/${term.slug}`} passHref legacyBehavior>
                                    <a className="meta-tag">{term.name}</a>
                                </Link>
                            ))}</p>
                        )}
                        {regions.length > 0 && (
                            <p><b>Quốc gia:</b> {regions.map(term => (
                                <Link key={term.id} href={`/danh-muc/quoc-gia/${term.slug}`} passHref legacyBehavior>
                                    <a className="meta-tag">{term.name}</a>
                                </Link>
                            ))}</p>
                        )}
                    </div>
                    <h2>Nội dung phim</h2>
                    <div dangerouslySetInnerHTML={{ __html: movieData.content }} />
                </div>

            </main>
            
            <style jsx>{`
                .container { padding: 2rem; }
                main { max-width: 1000px; margin: 0 auto; }
                .movie-title { font-size: 2.8rem; margin-bottom: 0; }
                .movie-origin-name { font-size: 1.2rem; color: #666; margin-top: 0; margin-bottom: 2rem; }
                .movie-player-container { position: relative; width: 100%; padding-top: 56.25%; background-color: #000; margin-bottom: 2rem; }
                .movie-player-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
                .no-episode-notice { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; }
                .list-container { margin-bottom: 2rem; }
                .list-buttons { display: flex; flex-wrap: wrap; gap: 10px; }
                .list-button { padding: 8px 16px; border: 1px solid #ccc; background-color: #f0f0f0; border-radius: 5px; cursor: pointer; font-size: 1rem; }
                .list-button:hover { background-color: #e0e0e0; }
                .list-button.active { background-color: #0070f3; color: white; border-color: #0070f3; }
                .movie-details { line-height: 1.7; color: #333; margin-top: 2rem; }
                .meta-lists { margin-bottom: 1.5rem; }
                .meta-lists p { margin-bottom: 0.5rem; }
                .meta-tag { display: inline-block; margin: 0 5px 5px 0; padding: 3px 8px; background-color: #eee; border-radius: 4px; text-decoration: none; color: #333; font-size: 0.9rem; }
                .meta-tag:hover { background-color: #ddd; }
            `}</style>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const movieData = await getMovieDetails(slug);
    if (!movieData) {
        return { notFound: true };
    }
    return { props: { movieData } };
}
