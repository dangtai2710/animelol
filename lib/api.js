import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });
const WP_DOMAIN = "https://animelol.org";

// 1. Lấy phim mới nhất
export async function getLatestMovies(page = 1) {
  const url = `${WP_DOMAIN}/wp-json/wp/v2/ophim?_embed&per_page=24&orderby=date&order=desc&page=${page}`;
  try {
    const response = await fetch(url, { agent });
    if (!response.ok) return null;
    const totalPages = response.headers.get('X-WP-TotalPages');
    const data = await response.json();
    return { movies: data, totalPages: parseInt(totalPages, 10) || 1 };
  } catch (error) { return null; }
}

// 2. Lấy chi tiết phim
export async function getMovieDetails(slug) {
  if (!slug) return null;
  const url = `${WP_DOMAIN}/api/phim.php?slug=${slug}`;
  try {
    const response = await fetch(url, { agent });
    if (!response.ok) return null;
    const data = await response.json();
    return data.status ? data : null;
  } catch (error) { return null; }
}

// 3. Tìm kiếm phim
export async function searchMovies(keyword) {
  if (!keyword) return null;
  // Gọi đến file search-phim.php
  const url = `${WP_DOMAIN}/api/search-phim.php?q=${encodeURIComponent(keyword)}`;
  try {
    const response = await fetch(url, { agent });
    if (!response.ok) return null;
    return response.json(); // Bây giờ nó trả về mảng phim trực tiếp
  } catch (error) {
    console.error("Lỗi searchMovies:", error);
    return null;
  }
}

// 4. Lấy phim theo Taxonomy (Dùng cho [slug].js)
export async function getMoviesByTerm(taxonomyApiSlug, termId, page = 1) {
    // Gọi đến file list-phim.php mới tạo
    const url = `${WP_DOMAIN}/api/list-phim.php?taxonomy=${taxonomyApiSlug}&term_id=${termId}&page=${page}`;
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) return null;
        return response.json(); // Trả về { movies: [...], totalPages: ... }
    } catch (error) {
        console.error("Lỗi getMoviesByTerm:", error);
        return null;
    }
}


// 5. Lấy thông tin Term từ slug
export async function getTermBySlug(taxonomyApiSlug, slug) {
    const url = `${WP_DOMAIN}/wp-json/wp/v2/${taxonomyApiSlug}?slug=${slug}`;
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) return null;
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) { return null; }
}

// 6. Lấy dữ liệu Menu
export async function getMenuData() {
    const url = `${WP_DOMAIN}/api/menu-data.php`;
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) return null;
        return response.json();
    } catch (error) { return null; }
}

// === CÁC HÀM CÒN THIẾU CHO TRANG CHỦ ===

export async function getMoviesByGenre(genreId, limit = 10) {
    if (!genreId) return null;
    const url = `${WP_DOMAIN}/wp-json/wp/v2/ophim?_embed&ophim_genres=${genreId}&per_page=${limit}`;
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) return null;
        return response.json();
    } catch (error) { return null; }
}

export async function getMoviesByCountry(countryId, limit = 10) {
    if (!countryId) return null;
    const url = `${WP_DOMAIN}/wp-json/wp/v2/ophim?_embed&ophim_regions=${countryId}&per_page=${limit}`;
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) return null;
        return response.json();
    } catch (error) { return null; }
}
export async function getSettings() {
    const url = `${WP_DOMAIN}/api/settings.php`;
    try {
        const response = await fetch(url, { agent });
        return response.json();
    } catch (error) { return null; }
}
