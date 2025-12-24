export default function Footer({ settings }) {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-logo">ANIMELOL</div>
                <div className="footer-text">
                    {settings?.footer_text || '© 2025 AnimeLOL - Xem phim trực tuyến miễn phí.'}
                </div>
                <div className="footer-links">
                    <a href="#">Điều khoản</a>
                    <a href="#">Chính sách bảo mật</a>
                    <a href="#">Liên hệ</a>
                </div>
            </div>
            <style jsx>{`
                .site-footer {
                    background-color: #141414;
                    padding: 60px 4% 40px 4%;
                    border-top: 1px solid #333;
                    margin-top: 50px;
                    color: #888;
                }
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    text-align: center;
                }
                .footer-logo {
                    color: #e50914;
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .footer-text {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }
                .footer-links a {
                    color: #666;
                    text-decoration: none;
                    font-size: 0.8rem;
                }
                .footer-links a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </footer>
    );
}
