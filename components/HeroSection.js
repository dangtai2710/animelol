import Link from 'next/link';

export default function HeroSection({ movie }) {
    if (!movie) {
        return <div className="hero-container placeholder"></div>;
    }

    const movieName = movie.title.rendered;
    const movieSlug = movie.slug;
    const posterUrl = movie.phim_data?.poster_url;
    // Lấy nội dung từ trường content và loại bỏ các thẻ HTML
    const excerpt = movie.content.rendered.replace(/<[^>]+>/g, '').substring(0, 200) + '...';

    return (
        <div className="hero-container" style={{ backgroundImage: `url(${posterUrl})` }}>
            <div className="hero-overlay"></div>
            
            <div className="hero-content">
                <h1 className="hero-title">{movieName}</h1>
                <p className="hero-excerpt">{excerpt}</p>
                <div className="hero-buttons">
                    <Link href={`/phim/${movieSlug}`} passHref legacyBehavior>
                        <a className="hero-button play">▶ Xem Phim</a>
                    </Link>
                    <Link href={`/phim/${movieSlug}`} passHref legacyBehavior>
                        <a className="hero-button info">ⓘ Thông Tin</a>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .hero-container {
                    position: relative;
                    height: 95vh;
                    display: flex;
                    align-items: center;
                    background-size: cover;
                    background-position: center top;
                    color: white;
                    padding: 0 4%;
                }
                .hero-container.placeholder {
                    background-color: #111;
                }
                .hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to right, rgba(20, 20, 20, 1) 10%, rgba(20, 20, 20, 0) 70%),
                                linear-gradient(to top, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0) 25%);
                }
                .hero-content {
                    position: relative;
                    z-index: 1;
                    max-width: 40%;
                }
                .hero-title {
                    font-size: 3.5vw;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
                }
                .hero-excerpt {
                    font-size: 1.2vw;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
                }
                .hero-buttons {
                    display: flex;
                    gap: 1rem;
                }
                .hero-button {
                    padding: 12px 25px;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 5px;
                    transition: opacity 0.2s;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hero-button.play {
                    background-color: white;
                    color: black;
                }
                .hero-button.info {
                    background-color: rgba(109, 109, 110, 0.7);
                    color: white;
                }
                .hero-button:hover {
                    opacity: 0.8;
                }

                @media (max-width: 768px) {
                    .hero-content {
                        max-width: 90%;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .hero-title {
                        font-size: 6vw;
                    }
                    .hero-excerpt {
                        font-size: 2.5vw;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;  
                        overflow: hidden;
                    }
                }
            `}</style>
        </div>
    );
}
