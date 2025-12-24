import "@/styles/globals.css";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  // Lấy dữ liệu cài đặt từ pageProps (được truyền từ getServerSideProps của các trang)
  const settings = pageProps.settings;

  return (
    <>
      <Head>
        {/* 1. Nạp font Roboto hỗ trợ tiếng Việt */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />

        {/* 2. Tự động đổi Favicon từ cài đặt Admin */}
        <link rel="icon" href={settings?.favicon_url || "/favicon.ico"} />

        {/* 3. Gắn mã Google Search Console / Analytics từ Admin */}
        {settings?.google_code && (
            <script 
                dangerouslySetInnerHTML={{ __html: settings.google_code }} 
            />
        )}
      </Head>

      {/* Hiển thị trang hiện tại */}
      <Component {...pageProps} />

      <style jsx global>{`
        /* Áp dụng font Roboto toàn trang */
        html, body {
          font-family: 'Roboto', sans-serif !important;
          background-color: #141414;
          color: white;
          margin: 0;
        }
      `}</style>
    </>
  );
}
