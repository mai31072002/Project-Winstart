const express = require('express');
// const morgan = require('morgan');
const mysql = require('mysql');
// CORS giúp giải quyết lỗi chặn yêu cầu từ trình duyệt do chính sách Same-Origin Policy.
// app.use(cors()); cho phép tất cả domain gọi API.
// Có thể cấu hình CORS để giới hạn quyền truy cập API.
const cors = require('cors');
// const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json()); // Để xử lý dữ liệu JSON từ client

// Kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  
  database: 'project-winstart'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Kết nối MySQL thất bại:', err);
    return;
  }
  console.log('✅ Đã kết nối MySQL thành công!');
});

// API lấy danh sách news
//API (Application Programming Interface) là một giao diện cho phép các ứng dụng giao tiếp với nhau.
// app.get('/api/news', (req, res) => { ... });
// Đây là một route (đường dẫn API) xử lý yêu cầu HTTP GET.
// Việc API có thể gửi phản hồi HTTP về trình duyệt hoặc ứng dụng là nhờ vào cấu trúc của một ứng dụng backend
// trong trường hợp này là Node.js + Express + MySQL.

app.get('/api/home', (req, res) => {
  const categoriesSql = "SELECT DISTINCT category, category_slug FROM products";
  const productsSql = "SELECT id, title, price, thumbnail FROM products LIMIT 10";

  connection.query(categoriesSql, (err, categories) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi server' });
      return;
    }

    connection.query(productsSql, (err, products) => {
      if (err) {
        res.status(500).json({ error: 'Lỗi server' });
        return;
      }

      res.json({
        categories: categories.map(row => ({
          category: row.category,
          category_slug: row.category_slug
        })),
        products
      });
    });
  });
});
app.get('/api/products', (req, res) => {
  let { search = "", category_slug, page = 1, limit = 8, priceFilter, id ="", category } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let minPrice = 0, maxPrice = 9999999;
  if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      minPrice = min || 0;
      maxPrice = max || 9999999;
  }

  const offset = (page - 1) * limit;

  // Điều kiện tìm kiếm theo tên hoặc SKU
  let searchCondition = search ? `AND (title LIKE ? OR sku LIKE ?)` : "";
  let categoryCondition = category_slug ? `AND category_slug = ?` : "";
  let idCondition = id ? `AND id = ?` : "";
  let categoryCondition2 = category ? `AND category = ? AND id != ?` : "";

  // Query lấy danh sách sản phẩm
  const sql = `
      SELECT *
      FROM products 
      WHERE price BETWEEN ? AND ? ${categoryCondition} ${searchCondition} ${idCondition} ${categoryCondition2}
      LIMIT ? OFFSET ?
  `;

  let params = [minPrice, maxPrice];
  if (category_slug) params.push(category_slug);
  if (search) params.push(`%${search}%`, `%${search}%`);
  if (id) params.push(id);
  if (category) params.push(category);
  params.push(limit, offset);

  connection.query(sql, params, (err, products) => {
      if (err) return res.status(500).json({ error: 'Lỗi server' });

      // Query đếm tổng số sản phẩm
      const countSql = `
          SELECT COUNT(*) AS total 
          FROM products 
          WHERE price BETWEEN ? AND ? ${categoryCondition} ${searchCondition} ${idCondition} ${categoryCondition2}
      `;

      let countParams = [minPrice, maxPrice];
      if (category_slug) countParams.push(category_slug);
      if (id) countParams.push(id);
      if (category) countParams.push(category);
      if (search) countParams.push(`%${search}%`, `%${search}%`); // Fix tham số tìm kiếm

      connection.query(countSql, countParams, (err, result) => {
          if (err) return res.status(500).json({ error: 'Lỗi server' });

          const totalProducts = result[0].total;
          const totalPages = Math.ceil(totalProducts / limit);

          res.json({
              products,
              pagination: {
                  currentPage: page,
                  totalPages,
                  totalProducts,
              },
          });
      });
  });
});

// Lắng nghe trên cổng 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});