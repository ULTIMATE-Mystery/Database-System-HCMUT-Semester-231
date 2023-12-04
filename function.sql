USE btl;
-- DROP FUNCTION so_luong_thuoc;

DELIMITER //
CREATE FUNCTION so_luong_thuoc() RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE danh_sanh_thuoc VARCHAR(255);
	SELECT GROUP_CONCAT(ten_thuoc SEPARATOR ', ') INTO danh_sanh_thuoc
    FROM (SELECT ten_thuoc
    FROM thuoc_trong_don
    JOIN thuoc
    ON thuoc_trong_don.ma_thuoc = thuoc.ma_thuoc
    GROUP BY thuoc_trong_don.ma_thuoc
    ORDER BY SUM(thuoc_trong_don.so_luong) DESC
    LIMIT 3) bang_thuoc;
    RETURN danh_sanh_thuoc;
END //
DELIMITER ;

-- DROP FUNCTION so_cuoc_hen_bac_si;

DELIMITER //
CREATE FUNCTION so_cuoc_hen_bac_si(ma_bac_si INT, ngay_bat_dau DATE, ngay_ket_thuc DATE) RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE total_count INT DEFAULT 0;
  DECLARE count INT DEFAULT 0;
  l: LOOP
    SELECT COUNT(*) INTO count
    FROM lich_kham
    WHERE lich_kham.ma_bac_si = ma_bac_si
      AND ngay_kham = ngay_bat_dau
      AND trang_thai = 'đã khám';
    IF count > 0 THEN
      SET total_count = total_count + 1;
    END IF;
    SET ngay_bat_dau = DATE_ADD(ngay_bat_dau, INTERVAL 1 DAY);
    IF ngay_bat_dau > ngay_ket_thuc THEN
      LEAVE l;
    END IF;
  END LOOP l;
  RETURN total_count;
END //

DELIMITER ;