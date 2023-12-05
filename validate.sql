USE btl;

-- INSERT
DROP PROCEDURE insert_hoa_don;
DELIMITER //
CREATE PROCEDURE insert_hoa_don (
  tong_tien INT,
  phuong_thuc_thanh_toan VARCHAR(20),
  ma_benh_nhan INT,
  ngay_kham DATE,
  gio_kham TIME,
  trang_thai VARCHAR(25)
)
BEGIN
	IF phuong_thuc_thanh_toan <> "chuyen khoan" AND phuong_thuc_thanh_toan <> "tien mat" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Phương thức thanh toán không hợp lệ";
		ROLLBACK;
	ELSEIF trang_thai <> "da thanh toan" AND trang_thai <> "chua thanh toan" THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "trạng thái không hợp lệ";
		ROLLBACK;
	ELSEIF ngay_kham > CURDATE() THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "ngày khám không hợp lệ";
		ROLLBACK;
	ELSE
		INSERT INTO hoa_don (thoi_gian_tao, tong_tien, phuong_thuc_thanh_toan, ma_benh_nhan, ngay_kham, gio_kham, trang_thai)
		VALUES (CURDATE(), tong_tien, phuong_thuc_thanh_toan, ma_benh_nhan, ngay_kham, gio_kham, trang_thai);
	  END IF;
END //
DELIMITER ;


-- UPDATE
DROP PROCEDURE update_hoa_don;
DELIMITER //
CREATE PROCEDURE update_hoa_don(
	ma_hoa_don INT,
	phuong_thuc_thanh_toan VARCHAR(20),
	trang_thai VARCHAR(25)
)
BEGIN	
	IF phuong_thuc_thanh_toan <> '' THEN
		IF phuong_thuc_thanh_toan <> "chuyen khoan" AND phuong_thuc_thanh_toan <> "tien mat" THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Phương thức thanh toán không hợp lệ";
			ROLLBACK;
		ELSE
			UPDATE hoa_don
			SET hoa_don.phuong_thuc_thanh_toan = phuong_thuc_thanh_toan
			WHERE hoa_don.ma_hoa_don = ma_hoa_don;
		END IF;
    END IF;
    IF trang_thai <> '' THEN
		IF trang_thai <> "da thanh toan" AND trang_thai <> "chua thanh toan" THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "trạng thái không hợp lệ";
			ROLLBACK;
		ELSE
			UPDATE hoa_don
			SET hoa_don.trang_thai = trang_thai
			WHERE hoa_don.ma_hoa_don = ma_hoa_don;
		END IF;
    END IF;
END //
DELIMITER ;

-- DELETE
DROP PROCEDURE delete_hoa_don;
DELIMITER //
CREATE PROCEDURE delete_hoa_don (ma_hoa_don INT)
BEGIN
	DECLARE status VARCHAR(25);
	SELECT trang_thai INTO status
    FROM hoa_don
    WHERE hoa_don.ma_hoa_don = ma_hoa_don;
    IF status = "đda thanh toan" THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Không thể xoá hoá đơn đã thanh toán";
    ELSE
		DELETE FROM hoa_don
        WHERE hoa_don.ma_hoa_don =ma_hoa_don;
    END IF;
END //
DELIMITER ;