import https from 'https';

// Tạo "đặc vụ" để bỏ qua lỗi SSL
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const WP_DOMAIN = "https://animelol.org";

/**
 * Lấy danh sách phim mới nhất từ WordPress (có phân trang)
 */
export async function getLatestMovies(page = 1) {
  const url = `${WP_DOMAIN}/wp-json/wp/v2/ophim?_embed&per_page=24&orderby=date&order=desc&page=${page}`;
  try {
    const response = await fetch(url, { agent });
    if (!response.ok) return null;
    const totalPages = response.headers.get('X-WP-TotalPages');
    const data = await response.json();
    return {
      movies: data,
      totalPages: parseInt(totalPages, 10) || 1,
    };
  } catch (error) {
    console.error("Lỗi API getLatestMovies:", error);
    return null;
  }
}

/**
 * Lấy chi tiết một phim bằng "cửa hậu"
 */
export async function getMovieDetails(slug) {
  if (!slug) return null;
  const url = `${WP_DOMAIN}/api/phim.php?slug=${slug}`;
  try {
    const response = await fetch(url, { agent });
    if (!response.ok) return null;
    const data = await response.json();
    return data.status ? data : null;
  } catch (error) {
    console.error("Lỗi API getMovieDetails:", error);
    return null;
  }
}

/**
 * Tìm kiếm phim theo từ khóa
 */
export async function searchMovies(keyword) {
  if (!keyword) return null;
  const url = `${WP_DOMAIN}/wp-json/wp/v2/ophim?_embed&search=${encodeURIComponent(keyword)}`;
  try {
    const response = await fetch(url, { agent });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Lỗi API searchMovies:", error);
    return null;
  }
}

/**
 * ==========================================================
 * === CÁC HÀM CÒN THIẾU GÂY RA LỖI LÀ ĐÂY ===
 * ==========================================================
 */

/**
 * Lấy phim theo ID của Thể loại (ophim_genres)
 */
export async function getMoviesByGenre(genreId, limit = 10) {
    if (!genreId) return null;
    const url = `${WP_DOMAIN}/wp-json/wp/v2/ophim?_embed&ophim_genres=${genreId}&per_page=${limit}`;
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error("Lỗi API getMoviesByGenre:", error);
        return null;
    }
}

/**
 * Lấy phim theo ID của Quốc gia (ophim_regions)
 */
export async function getMoviesByCountry(countryId, limit = 10) {
    if (!countryId) return null;
    const url = `${WP_DOMAIN}/wp-json/wp/v2/ophim?_embed&ophim_regions=${countryId}&per_page=${limit}`;
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error("Lỗi API getMoviesByCountry:", error);
        return null;
    }
}
