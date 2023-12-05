DELIMITER //

CREATE TRIGGER tinh_tien_thuoc
AFTER INSERT ON don_thuoc
FOR EACH ROW
BEGIN
    DECLARE chi_phi_thuoc DECIMAL(10, 2);

    -- Tính chi phí thuốc
    SELECT SUM(ttd.don_gia * ttd.so_luong) INTO chi_phi_thuoc
    FROM thuoc_trong_don ttd
    WHERE ttd.ma_don_thuoc = NEW.ma_don_thuoc;

    -- Cập nhật hoặc tạo hóa đơn mới
    IF EXISTS (
        SELECT * FROM hoa_don
        WHERE ma_benh_nhan = NEW.ma_benh_nhan
          AND ngay_kham = NEW.ngay_kham
          AND gio_kham = NEW.gio_kham
    )
    THEN
        -- Cập nhật hóa đơn hiện có
        UPDATE hoa_don
        SET tong_tien = tong_tien + chi_phi_thuoc
        WHERE ma_benh_nhan = NEW.ma_benh_nhan
          AND ngay_kham = NEW.ngay_kham
          AND gio_kham = NEW.gio_kham;
    ELSE
        -- Tạo hóa đơn mới
        INSERT INTO hoa_don (thoi_gian_tao, tong_tien, phuong_thuc_thanh_toan, ma_benh_nhan, ngay_kham, gio_kham, trang_thai)
        VALUES (NOW(), chi_phi_thuoc, NULL, NEW.ma_benh_nhan, NEW.ngay_kham, NEW.gio_kham, 'Chưa thanh toán');
    END IF;
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER tinh_tien_xet_nghiem
AFTER INSERT ON thuc_hien_xet_nghiem
FOR EACH ROW
BEGIN
    DECLARE chi_phi_xet_nghiem DECIMAL(10, 2);

    -- Tính chi phí xét nghiệm
    SELECT SUM(xncd.gia_tien) INTO chi_phi_xet_nghiem
    FROM xet_nghiem_chi_dinh xncd
    WHERE xncd.ma_xet_nghiem = NEW.ma_xet_nghiem;

    -- Cập nhật hoặc tạo hóa đơn mới
    IF EXISTS (
        SELECT * FROM hoa_don
        WHERE ma_benh_nhan = NEW.ma_benh_nhan
          AND ngay_kham = NEW.ngay_kham
          AND gio_kham = NEW.gio_kham
    )
    THEN
        -- Cập nhật hóa đơn hiện có
        UPDATE hoa_don
        SET tong_tien = tong_tien + chi_phi_xet_nghiem
        WHERE ma_benh_nhan = NEW.ma_benh_nhan
          AND ngay_kham = NEW.ngay_kham
          AND gio_kham = NEW.gio_kham;
    ELSE
        -- Tạo hóa đơn mới
        INSERT INTO hoa_don (thoi_gian_tao, tong_tien, phuong_thuc_thanh_toan, ma_benh_nhan, ngay_kham, gio_kham, trang_thai)
        VALUES (NOW(), chi_phi_xet_nghiem, NULL, NEW.ma_benh_nhan, NEW.ngay_kham, NEW.gio_kham, 'Chưa thanh toán');
    END IF;
END; //

DELIMITER ;

