import Link from 'next/link';

export default function MovieCard({ movie }) {
    if (!movie) return null;

    const movieName = movie.title.rendered;
    const movieSlug = movie.slug;
    const thumbUrl = movie.phim_data?.thumb_url;

    return (
        <Link href={`/phim/${movieSlug}`} className="movie-card">
            <div className="poster-wrapper">
                <img src={thumbUrl} alt={movieName} />
            </div>
            <h3 className="movie-name">{movieName}</h3>

            <style jsx>{`
                .movie-card {
                    text-decoration: none;
                    color: #e5e5e5;
                    display: block;
                }
                
                .poster-wrapper {
                    background-color: #222;
                    border-radius: 5px;
                    overflow: hidden;
                    aspect-ratio: 2 / 3;
                    margin-bottom: 12px;
                    transition: transform 0.2s ease;
                }
                .movie-card:hover .poster-wrapper {
                    transform: scale(1.05); /* Hiệu ứng nhỏ khi hover */
                }
                
                .poster-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .movie-name {
                    font-size: 1rem;
                    font-weight: 500;
                    line-height: 1.3;
                    margin: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `}</style>
        </Link>
    );
}
