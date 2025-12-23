import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) { // Thay đổi thành 10 để nhạy hơn một chút
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <div className="header-content">
                <div className="header-left">
                    <Link href="/" legacyBehavior>
                        <a className="logo">ANIMELOL</a>
                    </Link>
                    <nav className="main-nav">
                        <Link href="/" legacyBehavior><a className="nav-link">Trang Chủ</a></Link>
                        {/* Bạn có thể thêm các link khác ở đây */}
                    </nav>
                </div>
                <div className="header-right">
                    {/* Phần tìm kiếm và profile sẽ ở đây */}
                </div>
            </div>

            <style jsx>{`
                header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 0 4%;
                    height: 68px;
                    display: flex;
                    align-items: center;
                    z-index: 1000;
                    transition: background-color 0.4s ease;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0));
                }
                header.scrolled {
                    background-color: #141414;
                    background-image: none;
                }
                .header-content {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .header-left {
                    display: flex;
                    align-items: center;
                }
                .logo {
                    font-size: 1.8rem;
                    color: #e50914;
                    font-weight: bold;
                    text-decoration: none;
                    margin-right: 25px;
                }
                .main-nav {
                    display: flex;
                    gap: 20px;
                }
                .nav-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: #b3b3b3;
                }
                @media (max-width: 768px) {
                    .main-nav {
                        display: none;
                    }
                }
            `}</style>
        </header>
    );
}
