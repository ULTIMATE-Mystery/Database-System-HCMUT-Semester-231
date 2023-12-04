DELIMITER //
CREATE TRIGGER Han_che_lich_hen
BEFORE INSERT ON lich_kham FOR EACH ROW
BEGIN
    DECLARE So_lich_hen INT;

    -- Lấy số lượng lịch hẹn hiện tại của bác sĩ
    SELECT COUNT(*) INTO So_lich_hen
    FROM lich_kham
    WHERE lich_kham.ma_bac_si = NEW.ma_bac_si AND lich_kham.ngay_kham = NEW.ngay_kham;

    -- Kiểm tra ngưỡng
    IF So_lich_hen >= 25 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Quá số lượng lịch hẹn cho phép trong ngày cho bác sĩ này';
    END IF;
END;
//
DELIMITER ;