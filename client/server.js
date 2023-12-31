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
  connectionLimit: 20,
  host: "localhost",
  user: "root",
  password: "18012002",
  database: "btl",
});

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

  // Kiểm tra xem dữ liệu tồn tại trong bảng lich_kham hay không
  const checkQuery =
    "SELECT * FROM lich_kham WHERE ma_benh_nhan = ? AND ngay_kham = ? AND gio_kham = ?";
  const checkValues = [ma_benh_nhan, ngay_kham, gio_kham];

  pool.query(checkQuery, checkValues, (error, results, fields) => {
    if (error) {
      console.error("Lỗi khi kiểm tra dữ liệu:", error);
      res.status(500).json({ error: "Lỗi khi kiểm tra dữ liệu" });
      return;
    }

    if (results.length === 0) {
      // Nếu dữ liệu không tồn tại trong bảng lich_kham
      res.status(400).json({ error: "Dữ liệu không hợp lệ" });
      return;
    }

    // Nếu dữ liệu tồn tại, tiến hành thêm vào bảng hoa_don
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

function getDoctors(n, x, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Lỗi kết nối:", err);
      return callback(err, null);
    }

    const query = "CALL getDoctor(?, ?)";
    connection.query(query, [n, x], (error, results, fields) => {
      connection.release();

      if (error) {
        console.error("Lỗi truy vấn:", error);
        return callback(error, null);
      }
      callback(null, results[0]); // Trả về kết quả của thủ tục
    });
  });
}


app.get("/doctors", (req, res) => {
  const { n, x } = req.query; // lấy thông tin từ query params
  getDoctors(n, x, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ MySQL" });
      return;
    }
    res.json({ data });
  });
});

function fetchMedicineUsage(callback) {
  pool.getConnection((err, connection) => {
      if (err) {
          console.error("Lỗi kết nối:", err);
          return callback(err, null);
      }

      const query = "SELECT tt.ma_thuoc, t.ten_thuoc, SUM(tt.so_luong) as tong_so_lan_su_dung FROM thuoc_trong_don tt JOIN thuoc t ON tt.ma_thuoc = t.ma_thuoc GROUP BY tt.ma_thuoc ORDER BY tong_so_lan_su_dung DESC";
      connection.query(query, (error, results, fields) => {
          connection.release();

          if (error) {
              console.error("Lỗi truy vấn:", error);
              return callback(error, null);
          }
          callback(null, results); // Trả về kết quả truy vấn
      });
  });
}

// API endpoint
app.get("/medicine/usage", (req, res) => {
  fetchMedicineUsage((err, data) => {
      if (err) {
          console.error("Lỗi khi lấy dữ liệu từ MySQL:", err);
          res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ MySQL" });
          return;
      }
      res.json({ data }); // Trả về dữ liệu dưới dạng JSON
  });
});


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

function fetchDataFromMySQL_medicine(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Lỗi kết nối:", err);
      return callback(err, null);
    }

    connection.query("SELECT * FROM thuoc", (error, results, fields) => {
      connection.release(); // Giải phóng kết nối sau khi thực hiện truy vấn

      if (error) {
        console.error("Lỗi truy vấn:", error);
        return callback(error, null);
      }
      callback(null, results); // Trả về dữ liệu bằng callback
    });
  });
}

app.get("/medicine/data", (req, res) => {
  fetchDataFromMySQL_medicine((err, data) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu từ MySQL:", err);
      res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ MySQL" });
      return;
    }
    res.json({ data }); // Trả về dữ liệu dưới dạng JSON
  });
});

function fetchDataFromMySQL_test(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Lỗi kết nối:", err);
      return callback(err, null);
    }

    connection.query("SELECT * FROM xet_nghiem_chi_dinh", (error, results, fields) => {
      connection.release(); // Giải phóng kết nối sau khi thực hiện truy vấn

      if (error) {
        console.error("Lỗi truy vấn:", error);
        return callback(error, null);
      }
      callback(null, results); // Trả về dữ liệu bằng callback
    });
  });
}

app.get("/test/data", (req, res) => {
  fetchDataFromMySQL_test((err, data) => {
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
