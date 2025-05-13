/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hoatuoiuit.id.vn', // ✅ Thay bằng domain thật của bạn
  generateRobotsTxt: true,           // Tạo robots.txt luôn
  changefreq: 'daily',               // Cập nhật sitemap mỗi ngày
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/api/*'],     // Loại trừ nếu cần
};
