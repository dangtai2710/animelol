import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MovieCard from './MovieCard';

import 'swiper/css';
import 'swiper/css/navigation';

export default function MovieSlider({ title, movies }) {
    if (!movies || movies.length === 0) return null;

    const uniqueClass = `slider-${title.replace(/\s+/g, '')}`;

    return (
        <div className={`slider-container ${uniqueClass}`}>
            <h2 className="slider-title">{title}</h2>
            
            <div className="swiper-wrapper-custom">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: `.${uniqueClass} .swiper-button-next`,
                        prevEl: `.${uniqueClass} .swiper-button-prev`,
                    }}
                    spaceBetween={15}
                    slidesPerView={6}
                    breakpoints={{
                        320: { slidesPerView: 2.5, spaceBetween: 10 },
                        480: { slidesPerView: 3, spaceBetween: 10 },
                        768: { slidesPerView: 4, spaceBetween: 15 },
                        1024: { slidesPerView: 5, spaceBetween: 15 },
                        1200: { slidesPerView: 6, spaceBetween: 15 },
                    }}
                    className="mySwiper"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>

            <style jsx global>{`
                /* === GHI ĐÈ BIẾN CSS CỦA SWIPER === */
                :root {
                    --swiper-navigation-color: white;
                    --swiper-navigation-size: 2rem; /* Có thể chỉnh kích thước icon ở đây */
                }

                .slider-container {
                    margin-bottom: 3rem;
                    /* Bỏ padding ở đây để wrapper chiếm toàn bộ chiều rộng */
                }
                .slider-title {
                    font-size: 1.6rem;
                    color: #e5e5e5;
                    margin: 0 0 1.2rem 4%; /* Giữ padding cho title */
                }
                .swiper-wrapper-custom {
                    position: relative;
                    padding: 0 4%; /* Padding được chuyển vào đây */
                }
                
                /* Nút bấm giữ nguyên style nền */
                .${uniqueClass} .swiper-button-next,
                .${uniqueClass} .swiper-button-prev {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-calc(50% + 15px)); 
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: rgba(20, 20, 20, 0.6);
                    cursor: pointer;
                    z-index: 10;
                    opacity: 0;
                    transition: opacity 0.2s, background-color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .${uniqueClass}:hover .swiper-button-next,
                .${uniqueClass}:hover .swiper-button-prev {
                    opacity: 1;
                }

                .${uniqueClass} .swiper-button-next:hover,
                .${uniqueClass} .swiper-button-prev:hover {
                    background-color: rgba(20, 20, 20, 0.8);
                }

                .${uniqueClass} .swiper-button-prev {
                    left: 10px; /* Đặt nút gọn vào bên trong padding */
                }
                .${uniqueClass} .swiper-button-next {
                    right: 10px; /* Đặt nút gọn vào bên trong padding */
                }
                
                .${uniqueClass} .swiper-button-disabled {
                    display: none;
                }
            `}</style>
        </div>
    );
}
