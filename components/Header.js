import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ menuData }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    const genres = menuData?.genres || [];
    const regions = menuData?.regions || [];
    const categories = menuData?.categories || [];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        
        // Tự động đóng menu mobile nếu người dùng phóng to màn hình
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [router.asPath]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <header className={isScrolled ? 'scrolled' : ''}>
                <div className="header-content">
                    <div className="header-left">
                        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>☰</button>
                       <Link href="/" legacyBehavior>
    <a className="logo">
        {/* Nếu trong Admin có nhập Logo URL thì hiện ảnh, không thì hiện chữ */}
        {menuData?.settings?.logo_url ? (
            <img src={menuData.settings.logo_url} alt="Logo" style={{ height: '30px', display: 'block' }} />
        ) : (
            'ANIMELOL'
        )}
    </a>
</Link>
                        <nav className="main-nav desktop-only">
                            <Link href="/phim" legacyBehavior><a className="nav-link">Phim</a></Link>
                            <div className="nav-item"><a className="nav-link">Danh Mục ▼</a>
                                <div className="dropdown-menu">{categories.map(term => (<Link key={term.id} href={`/danh-muc/${term.slug}`} legacyBehavior><a className="dropdown-link">{term.name}</a></Link>))}</div>
                            </div>
                            <div className="nav-item"><a className="nav-link">Thể Loại ▼</a>
                                <div className="dropdown-menu wide">{genres.map(term => (<Link key={term.id} href={`/the-loai/${term.slug}`} legacyBehavior><a className="dropdown-link">{term.name}</a></Link>))}</div>
                            </div>
                            <div className="nav-item"><a className="nav-link">Quốc Gia ▼</a>
                                <div className="dropdown-menu wide">{regions.map(term => (<Link key={term.id} href={`/quoc-gia/${term.slug}`} legacyBehavior><a className="dropdown-link">{term.name}</a></Link>))}</div>
                            </div>
                        </nav>
                    </div>
                    <div className="header-right">
                        <form onSubmit={handleSearchSubmit} className="search-bar">
                            <input type="text" placeholder="Tìm phim..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button type="submit">🔍</button>
                        </form>
                    </div>
                </div>
            </header>

            <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <span className="logo">ANIMELOL</span>
                    <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
                </div>
                <nav className="sidebar-nav">
                    <Link href="/" legacyBehavior><a className="sidebar-link">Trang Chủ</a></Link>
                    <Link href="/phim" legacyBehavior><a className="sidebar-link">Tất Cả Phim</a></Link>
                    <div className="sidebar-section">
                        <h4>Danh Mục</h4>
                        <div className="sidebar-grid">
                            {categories.map(term => (<Link key={term.id} href={`/danh-muc/${term.slug}`} legacyBehavior><a className="sidebar-sub-link">{term.name}</a></Link>))}
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <h4>Thể Loại</h4>
                        <div className="sidebar-grid">
                            {genres.map(term => (<Link key={term.id} href={`/the-loai/${term.slug}`} legacyBehavior><a className="sidebar-sub-link">{term.name}</a></Link>))}
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <h4>Quốc Gia</h4>
                        <div className="sidebar-grid">
                            {regions.map(term => (<Link key={term.id} href={`/quoc-gia/${term.slug}`} legacyBehavior><a className="sidebar-sub-link">{term.name}</a></Link>))}
                        </div>
                    </div>
                </nav>
            </div>
            {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

            <style jsx>{`
                header { position: fixed; top: 0; left: 0; width: 100%; padding: 0 4%; height: 68px; display: flex; align-items: center; z-index: 1000; transition: background-color 0.4s ease; background-image: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0)); }
                header.scrolled { background-color: #141414; background-image: none; }
                .header-content { width: 100%; display: flex; align-items: center; justify-content: space-between; }
                .header-left { display: flex; align-items: center; gap: 15px; }
                .logo { font-size: 1.8rem; color: #e50914; font-weight: bold; text-decoration: none; }
                .main-nav { display: flex; align-items: center; gap: 20px; }
                .nav-item { position: relative; }
                .nav-link { color: white; text-decoration: none; font-weight: 500; cursor: pointer; padding: 10px 0; font-size: 0.9rem; }
                .dropdown-menu { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background-color: rgba(20, 20, 20, 0.95); border-top: 2px solid #e50914; padding: 15px; opacity: 0; visibility: hidden; transition: opacity 0.2s; max-height: 400px; overflow-y: auto; display: grid; gap: 10px; z-index: 2000; min-width: 200px; grid-template-columns: 1fr; }
                .dropdown-menu.wide { min-width: 350px; grid-template-columns: 1fr 1fr; }
                .nav-item:hover .dropdown-menu { opacity: 1; visibility: visible; }
                .dropdown-link { color: #e5e5e5; text-decoration: none; padding: 8px 10px; border-radius: 3px; font-size: 0.9rem; display: block; }
                .dropdown-link:hover { background-color: #333; color: #e50914; }
                .search-bar { display: flex; align-items: center; background-color: rgba(0, 0, 0, 0.75); border: 1px solid #444; padding: 5px 10px; border-radius: 4px; }
                .search-bar input { background: transparent; border: none; color: white; outline: none; width: 180px; font-size: 0.85rem; }
                .search-bar button { background: transparent; border: none; color: white; cursor: pointer; }
                .mobile-menu-btn { display: none; background: none; border: none; color: white; font-size: 1.8rem; cursor: pointer; }
                .mobile-sidebar { position: fixed; top: 0; left: -280px; width: 280px; height: 100%; background-color: #141414; z-index: 3000; transition: left 0.3s ease; overflow-y: auto; }
                .mobile-sidebar.open { left: 0; }
                .sidebar-header { padding: 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
                .close-btn { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
                .sidebar-nav { padding: 20px; }
                .sidebar-link { display: block; color: white; text-decoration: none; font-size: 1.1rem; margin-bottom: 15px; font-weight: bold; }
                .sidebar-section { margin-top: 25px; }
                .sidebar-section h4 { color: #888; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; }
                .sidebar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .sidebar-sub-link { color: #ccc; text-decoration: none; font-size: 0.9rem; padding: 5px 0; }
                .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 2500; }
                @media (max-width: 768px) {
                    .desktop-only { display: none; }
                    .mobile-menu-btn { display: block; }
                    .search-bar input { width: 100px; }
                }
            `}</style>
        </>
    );
}
