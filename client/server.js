const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 4000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Phuc2002@",
  database: "btl",
});

// lấy dữ liệu bảng hóa đơn
function fetchDataFromMySQL_bill(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Lỗi kết nối:", err);
      return callback(err, null);
    }

    connection.query("SELECT * FROM hoa_don", (error, results, fields) => {
      connection.release(); // Giải phóng kết nối sau khi thực hiện truy vấn

      if (error) {
        console.error("Lỗi truy vấn:", error);
        return callback(error, null);
      }
      callback(null, results); // Trả về dữ liệu bằng callback
    });
  });
}

// Đường dẫn API để lấy dữ liệu từ cơ sở dữ liệu
app.get("/bill/data", (req, res) => {
  fetchDataFromMySQL_bill((err, data) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu từ MySQL:", err);
      res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ MySQL" });
      return;
    }
    res.json({ data }); // Trả về dữ liệu dưới dạng JSON
  });
});

app.delete("/bill/delete/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM hoa_don WHERE ma_hoa_don = ?",
    id,
    (error, results, fields) => {
      if (error) {
        console.error("Lỗi khi xóa hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi xóa hóa đơn" });
        return;
      }
      res.json({ message: `Hóa đơn có ID ${id} đã được xóa` });
    }
  );
});

app.post("/bill/create", (req, res) => {
  const {
    thoi_gian_tao,
    tong_tien,
    phuong_thuc_thanh_toan,
    ma_benh_nhan,
    ngay_kham,
    gio_kham,
    trang_thai,
  } = req.body;

  const insertQuery =
    "INSERT INTO hoa_don (thoi_gian_tao, tong_tien, phuong_thuc_thanh_toan, ma_benh_nhan, ngay_kham, gio_kham, trang_thai) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const values = [
    thoi_gian_tao,
    tong_tien,
    phuong_thuc_thanh_toan,
    ma_benh_nhan,
    ngay_kham,
    gio_kham,
    trang_thai,
  ];

  pool.query(insertQuery, values, (error, results, fields) => {
    if (error) {
      console.error("Lỗi khi thêm hóa đơn:", error);
      res.status(500).json({ error: "Lỗi khi thêm hóa đơn" });
      return;
    }
    res.json({ message: "Hóa đơn đã được thêm" });
  });
});

function fetchDataFromMySQL_lich_kham(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Lỗi kết nối:", err);
      return callback(err, null);
    }

    connection.query("SELECT * FROM lich_kham", (error, results, fields) => {
      connection.release(); // Giải phóng kết nối sau khi thực hiện truy vấn

      if (error) {
        console.error("Lỗi truy vấn:", error);
        return callback(error, null);
      }
      callback(null, results); // Trả về dữ liệu bằng callback
    });
  });
}

app.get("/schedule/data", (req, res) => {
  fetchDataFromMySQL_lich_kham((err, data) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu từ MySQL:", err);
      res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ MySQL" });
      return;
    }
    res.json({ data }); // Trả về dữ liệu dưới dạng JSON
  });
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
