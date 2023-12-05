DELIMITER $$

CREATE TRIGGER tinh_tien_thuoc
AFTER INSERT ON thuoc_trong_don
FOR EACH ROW
BEGIN
    -- Khai báo các biến 
    DECLARE ngayKham DATE;
    DECLARE gioKham TIME;
    DECLARE maBenhNhan INT;
    DECLARE tong_tien_thuoc DECIMAL(10,2);

    -- Lấy thông tin từ bảng don_thuoc
    SELECT ngay_kham, gio_kham, ma_benh_nhan
    INTO ngayKham, gioKham, maBenhNhan
    FROM don_thuoc
    WHERE ma_don_thuoc = NEW.ma_don_thuoc;

    -- Tính tổng tiền thuốc
    SELECT SUM(don_gia * so_luong)
    INTO tong_tien_thuoc
    FROM thuoc_trong_don
    WHERE ma_don_thuoc = NEW.ma_don_thuoc;

    -- Kiểm tra xem hóa đơn cho bệnh nhân đã tồn tại hay chưa
    IF EXISTS (SELECT 1 FROM hoa_don WHERE ma_benh_nhan = maBenhNhan AND ngay_kham = ngayKham AND gio_kham = gioKham) THEN
        -- Cập nhật hóa đơn hiện có
        UPDATE hoa_don
        SET tong_tien = tong_tien + tong_tien_thuoc
        WHERE ma_benh_nhan = maBenhNhan AND ngay_kham = ngayKham AND gio_kham = gioKham;
    ELSE
        -- Tạo hóa đơn mới
        INSERT INTO hoa_don (thoi_gian_tao, tong_tien, phuong_thuc_thanh_toan, ma_benh_nhan, ngay_kham, gio_kham, trang_thai)
        VALUES (NOW(), tong_tien_thuoc, NULL, maBenhNhan, ngayKham, gioKham, 'Chưa thanh toán');
    END IF;
END$$

DELIMITER ;



DELIMITER $$

CREATE TRIGGER tinh_tien_xet_nghiem
AFTER INSERT ON thuc_hien_xet_nghiem
FOR EACH ROW
BEGIN
    -- Khai báo các biến
    DECLARE tong_tien_xet_nghiem DECIMAL(10,2);

    -- Tính tổng tiền xét nghiệm
    SELECT SUM(xet_nghiem_chi_dinh.gia_tien)
    INTO tong_tien_xet_nghiem
    FROM thuc_hien_xet_nghiem
    JOIN xet_nghiem_chi_dinh ON thuc_hien_xet_nghiem.ma_xet_nghiem = xet_nghiem_chi_dinh.ma_xet_nghiem
    WHERE thuc_hien_xet_nghiem.ma_benh_nhan = NEW.ma_benh_nhan
      AND thuc_hien_xet_nghiem.ngay_kham = NEW.ngay_kham
      AND thuc_hien_xet_nghiem.gio_kham = NEW.gio_kham;

    -- Kiểm tra xem hóa đơn cho ngày khám đã tồn tại hay chưa
    IF EXISTS (SELECT 1 FROM hoa_don WHERE ma_benh_nhan = NEW.ma_benh_nhan AND ngay_kham = NEW.ngay_kham AND gio_kham = NEW.gio_kham) THEN
        -- Cập nhật hóa đơn hiện có
        UPDATE hoa_don
        SET tong_tien = tong_tien + tong_tien_xet_nghiem
        WHERE ma_benh_nhan = NEW.ma_benh_nhan AND ngay_kham = NEW.ngay_kham AND gio_kham = NEW.gio_kham;
    ELSE
        -- Tạo hóa đơn mới
        INSERT INTO hoa_don (thoi_gian_tao, tong_tien, phuong_thuc_thanh_toan, ma_benh_nhan, ngay_kham, gio_kham, trang_thai)
        VALUES (NOW(), tong_tien_xet_nghiem, NULL, NEW.ma_benh_nhan, NEW.ngay_kham, NEW.gio_kham, 'Chưa thanh toán');
    END IF;
END$$

DELIMITER ;


