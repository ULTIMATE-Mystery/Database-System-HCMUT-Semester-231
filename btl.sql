-- DROP DATABASE btl;
CREATE DATABASE btl;
USE btl;

CREATE TABLE nguoi_dung (
    ma_nguoi_dung INT PRIMARY KEY AUTO_INCREMENT,
    ho_va_ten_dem VARCHAR(50),
    ten_rieng VARCHAR(50),
    gioi_tinh ENUM('M', 'F'),
    ngay_sinh DATE,
    so_dien_thoai VARCHAR(10),
    dia_chi VARCHAR(50),
    email VARCHAR(50)
);
CREATE TABLE benh_nhan (
	ma_benh_nhan INT NOT NULL,
    chieu_cao FLOAT,
    can_nang FLOAT,
    FOREIGN KEY(ma_benh_nhan) REFERENCES nguoi_dung(ma_nguoi_dung)
);
CREATE TABLE bac_si(
	ma_bac_si INT NOT NULL,
    so_nam_kinh_nghiem INT,
    trang_thai VARCHAR(50),
    loai_bac_si VARCHAR(50),
    chuyen_khoa VARCHAR(50),
    FOREIGN KEY(ma_bac_si) REFERENCES nguoi_dung(ma_nguoi_dung)
);
CREATE TABLE dieu_duong(
	ma_dieu_duong INT NOT NULL,
    so_nam_kinh_nghiem INT,
    ma_quan_ly INT,
    FOREIGN KEY (ma_quan_ly) REFERENCES dieu_duong(ma_dieu_duong),
    FOREIGN KEY(ma_dieu_duong) REFERENCES nguoi_dung(ma_nguoi_dung)
);
CREATE TABLE tien_su_benh(
	ma_benh_nhan INT NOT NULL,
    ten_benh VARCHAR(50),
    FOREIGN KEY (ma_benh_nhan) REFERENCES benh_nhan(ma_benh_nhan)
);

CREATE TABLE chung_chi_dieu_duong (
    ma_dieu_duong INT NOT NULL,
    ten_chuong_trinh VARCHAR(255),
    nam_dat_duoc YEAR,
    ben_cung_cap VARCHAR(255),
    FOREIGN KEY (ma_dieu_duong) REFERENCES dieu_duong(ma_dieu_duong)
);

CREATE TABLE xet_nghiem_chi_dinh (
    ma_xet_nghiem INT PRIMARY KEY AUTO_INCREMENT,
    ten_xet_nghiem VARCHAR(255),
    phong_thuc_hien INT,
    gia_tien DECIMAL(10, 2),
    ma_bac_si INT,
    ket_qua TEXT,
    thoi_gian_bat_dau DATETIME,
    thoi_gian_ket_thuc DATETIME,
    FOREIGN KEY (ma_bac_si) REFERENCES bac_si(ma_bac_si)
);

CREATE TABLE gio_lam_viec (
    ma_bac_si INT,
    thu_trong_tuan VARCHAR(10),
    thoi_gian_bat_dau TIME,
    thoi_gian_ket_thuc TIME,
    FOREIGN KEY (ma_bac_si) REFERENCES bac_si(ma_bac_si)
);

CREATE TABLE thuoc (
    ma_thuoc INT PRIMARY KEY AUTO_INCREMENT,
    ten_thuoc VARCHAR(255),
    tinh_trang VARCHAR(50),
    so_luong INT,
    don_gia DECIMAL(10, 2)
);

CREATE TABLE thuoc_trong_don (
    ma_don_thuoc INT,
    ma_thuoc INT,
    don_gia DECIMAL(10, 2),
    so_luong INT,
    FOREIGN KEY (ma_thuoc) REFERENCES thuoc(ma_thuoc)
    -- !!! chưa có bảng đơn thuốc 
    -- FOREIGN KEY (ma_don_thuoc) REFERENCES don_thuoc(ma_don_thuoc)  
);

-- INSERT
-- 10 benh nhan , 5 bac si, 5 dieu duong
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
VALUES
	("Trác Hào","Nghiệp","M","1980-04-06","0829362105","Xã Nhơn Hoà, Huyện Tân Thạnh, Long An","trachaonghiep826@gmail.com"),
	("Tán Bích","Thu","F","1980-03-23","0889073461","Xã Rơ Kơi, Huyện Sa Thầy, Kon Tum","tanbichthu648@gmail.com"),
	("Nhâm Lệ","Nga","F","2008-04-01","0841349658","Xã Ia Le, Huyện Chư Pưh, Gia Lai","nhamlenga9@naver.com"),
	("Cổ Duy","Tâm","M","1995-04-29","0966854179","Xã Xuân Phương, Thị xã Sông Cầu, Phú Yên","coduytam911@naver.com"),
	("Tề Gia","Uy","M","1972-05-26","0970367198","Xã Đào Mỹ, Huyện Lạng Giang, Bắc Giang","tegiauy283@hotmail.com"),
	("Lý Xuân","Trung","M","1972-04-17","0583562870","Xã Tịnh Bắc, Huyện Sơn Tịnh, Quảng Ngãi","lyxuantrung937@google.com"),
	("Đặng Khánh","Văn","M","1957-11-10","0798274063","Xã Săm Khóe, Huyện Mai Châu, Hoà Bình","dangkhanhvan492@microsoft.com"),
	("Hi Lệ","Khanh","F","1999-02-24","0583081795","Xã Pú Đao, Huyện Nậm Nhùn, Lai Châu","hilekhanh481@microsoft.com"),
	("Phong Việt","Phương","M","1974-07-09","0835468923","Xã Ba Cụm Bắc, Huyện Khánh Sơn, Khánh Hòa","phongvietphuong54@microsoft.com"),
	("Ung Vành","Khuyên","F","1990-04-12","0856023157","Xã Thanh Minh, Thành phố Điện Biên Phủ, Điện Biên","ungvanhkhuyen562@naver.com"),
	("Lã Thanh", "Tâm", "F","1987-09-18","0911873506","Xã Hương Thọ, Thị xã Hương Trà, Thừa Thiên Huế","lathanhtam334@google.com"),
	("Chúng Nhã","Yến","F","1980-09-08","0823295046","Xã Tiên Thuận, Huyện Bến Cầu, Tây Ninh","chungnhayen877@naver.com"),
	("Ung Vành","Khuyên","F","1990-04-12","0856023157","Xã Thanh Minh, Thành phố Điện Biên Phủ, Điện Biên","ungvanhkhuyen562@naver.com"),
	("Ong Quỳnh", "Liên","F","1998-08-01","0864902678","Phường Quyết Tiến, Thành phố Lai Châu, Lai Châu","longquynhlien871@facebook.com"),
	("Thi Kim","Liên","F", "1967-07-09","0831508627","Xã Tân Mỹ, Thành phố Bắc Giang, Bắc Giang","thikimlien992@facebook.com"),
	("Tôn Thất Duy","Luận","M", "2000-09-16","0885028436","Xã Tân Hòa Đông, Huyện Tân Phước, Tiền Giang","tonthatduyluan256@naver.com"),
	("Hướng Chiêu", "Phong","M","1979-01-24","0351945283","Xã Bến Củi, Huyện Dương Minh Châu, Tây Ninh","huongchieuphong455@gmail.com"),
	("Đan Lan","Ngọc","F","1987-06-25","0949471682","Xã Trực Đại, Huyện Trực Ninh, Nam Định","danlanngoc279@gmail.com"),
	("Ninh Ngọc", "Thạch","M","1991-03-07","0908972136","Xã Bình Hòa, Huyện Tây Sơn, Bình Định","ninhngocthach394@naver.com"),
	("Lý Quốc","Hùng","M","1973-09-29","0588495630","Xã Phước Thể, Huyện Tuy Phong, Bình Thuận","lyquochung682@google.com");
    
    
INSERT INTO benh_nhan 
VALUES 
(1,1.58,79),
(3,1.66,70),
(6,1.8,90),
(7,1.7,75),
(10,1.58,79),
(12,183,78),
(14,1.66,77),
(18,1.82,88.6),
(19,1.7,52),
(20,1.62,55.3);

INSERT INTO tien_su_benh 
VALUES
(1,"từng bị tiểu đường"),
(3,"không"),
(6,"đau mỏi vai gáy"),
(7,NULL),
(10,"bị gãy xương tay"),
(12,"bị chảy máu mũi"),
(14,"chưa có bệnh nặng"),
(18,"đau lưng"),
(19,"ngã xe"),
(20,"suy nhược cơ thể");

INSERT INTO bac_si 
VALUES 
(4,5,"đang khám","Bác sĩ khám tổng quát",NULL),
(5,15,"chưa có lịch hẹn","Bác sĩ chuyên khoa","Tim mạch"),
(9,10,"đã có lịch hẹn","Bác sĩ chuyên khoa","Chấn thương chỉnh hình"),
(15,9,"chưa có lịch hẹn","Bác sĩ khám tổng quát",NULL),
(16,12,"đã có lịch hẹn","Bác sĩ chuyên khoa","y học cổ truyền");

INSERT INTO dieu_duong 
VALUES
(2,12,NULL),
(8,5,2),
(11,3,2),
(13,2,2),
(17,7,2);

INSERT INTO chung_chi_dieu_duong 
VALUES
(2, 'Bác sĩ Điều dưỡng', 2015, 'Trường Đại học Y Dược Thành phố Hồ Chí Minh'),
(8, 'Thạc sĩ Điều dưỡng', 2019, 'Trường Đại học Y Dược Thành phố Hồ Chí Minh'),
(11, 'Bác sĩ Điều dưỡng', 2020, 'Trường Đại học Y Dược Thành phố Hồ Chí Minh'),
(13, 'Chứng chỉ Điều dưỡng cấp cứu', 2020, 'Viện Đào tạo Y dược dự phòng và Chăm sóc sức khỏe cộng đồng'),
(17, 'Chứng chỉ Điều dưỡng Hồi sức cấp cứu', 2017, 'Học viện Quân y');

INSERT INTO xet_nghiem_chi_dinh (ten_xet_nghiem, phong_thuc_hien, gia_tien, ma_bac_si, ket_qua, thoi_gian_bat_dau, thoi_gian_ket_thuc)
VALUES
('Xét nghiệm máu', 1, 2000000, 5, 'Bình thường', '2023-5-30 09:00:00', '2023-5-30 10:00:00'),
('Xét nghiệm nước tiểu', 2, 100000, 5, 'Bình thường', '2023-7-13 10:00:00', '2023-7-13 10:30:00'),
('Xét nghiệm X-quang', 3, 300000, 9, 'Nhận thấy tổn thương ở phổi', '2023-9-1 8:00:00', '2023-9-1 9:00:00'),
('Xét nghiệm siêu âm', 4, 500000, 16, 'Không phát hiện bất thường', '2023-9-12 14:00:00', '2023-9-12 16:00:00'),
('Xét nghiệm máu đông', 5, 1500000, 16, 'Tăng đông máu', '2023-10-30 7:00:00', '2023-10-30 9:00:00');

INSERT INTO gio_lam_viec
VALUES
(4, 'Thứ 2', '08:00:00', '17:00:00'),
(5, 'Thứ 3', '08:00:00', '17:00:00'),
(9, 'Thứ 4', '08:00:00', '17:00:00'),
(15, 'Thứ 5', '08:00:00', '17:00:00'),
(16, 'Thứ 6', '08:00:00', '17:00:00');

INSERT INTO thuoc (ten_thuoc, tinh_trang, so_luong, don_gia)
VALUES
('Paracetamol', 'Còn hàng', 100, 20.000),
('Ibuprofen', 'Còn hàng', 50, 30.000),
('Amoxicillin', 'Còn hàng', 20, 40.000),
('Omeprazol', 'Còn hàng', 15, 50.000),
('Simvastatin', 'Còn hàng', 10, 60.000);

INSERT INTO thuoc_trong_don
VALUES
(1,1 , 20.000, 10),
(2,2 , 30.000, 5),
(3,3 , 40.000, 2),
(4,4 , 50.000, 1),
(5,5 , 60.000, 0);

-- QUERY 