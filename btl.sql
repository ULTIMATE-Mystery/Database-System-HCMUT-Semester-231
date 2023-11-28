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
	ma_benh_nhan INT PRIMARY KEY,
    chieu_cao FLOAT,
    can_nang FLOAT,
    FOREIGN KEY(ma_benh_nhan) REFERENCES nguoi_dung(ma_nguoi_dung)
);
CREATE TABLE bac_si(
	ma_bac_si INT PRIMARY KEY,
    so_nam_kinh_nghiem INT,
    trang_thai VARCHAR(50),
    loai_bac_si VARCHAR(50),
    chuyen_khoa VARCHAR(50),
    FOREIGN KEY(ma_bac_si) REFERENCES nguoi_dung(ma_nguoi_dung)
);
CREATE TABLE dieu_duong(
	ma_dieu_duong INT PRIMARY KEY,
    so_nam_kinh_nghiem INT,
    ma_quan_ly INT,
    FOREIGN KEY (ma_quan_ly) REFERENCES dieu_duong(ma_dieu_duong),
    FOREIGN KEY(ma_dieu_duong) REFERENCES nguoi_dung(ma_nguoi_dung)
);
CREATE TABLE tien_su_benh(
	ma_benh_nhan INT,
    ten_benh VARCHAR(50),
    FOREIGN KEY (ma_benh_nhan) REFERENCES benh_nhan(ma_benh_nhan)
);

-- INSERT
-- 10 benh nhan , 5 bac si, 5 dieu duong
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Trác Hào","Nghiệp","M","1980-04-06","0829362105","Xã Nhơn Hoà, Huyện Tân Thạnh, Long An","trachaonghiep826@gmail.com"); 
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- dieu duong
	VALUE ("Tán Bích","Thu","F","1980-03-23","0889073461","Xã Rơ Kơi, Huyện Sa Thầy, Kon Tum","tanbichthu648@gmail.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Nhâm Lệ","Nga","F","2008-04-01","0841349658","Xã Ia Le, Huyện Chư Pưh, Gia Lai","nhamlenga9@naver.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- bac si
	VALUE ("Cổ Duy","Tâm","M","1995-04-29","0966854179","Xã Xuân Phương, Thị xã Sông Cầu, Phú Yên","coduytam911@naver.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- bac si
	VALUE ("Tề Gia","Uy","M","1972-05-26","0970367198","Xã Đào Mỹ, Huyện Lạng Giang, Bắc Giang","tegiauy283@hotmail.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Lý Xuân","Trung","M","1972-04-17","0583562870","Xã Tịnh Bắc, Huyện Sơn Tịnh, Quảng Ngãi","lyxuantrung937@google.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Đặng Khánh","Văn","M","1957-11-10","0798274063","Xã Săm Khóe, Huyện Mai Châu, Hoà Bình","dangkhanhvan492@microsoft.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- dieu duong
	VALUE ("Hi Lệ","Khanh","F","1999-02-24","0583081795","Xã Pú Đao, Huyện Nậm Nhùn, Lai Châu","hilekhanh481@microsoft.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- bac si
	VALUE ("Phong Việt","Phương","M","1974-07-09","0835468923","Xã Ba Cụm Bắc, Huyện Khánh Sơn, Khánh Hòa","phongvietphuong54@microsoft.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Ung Vành","Khuyên","F","1990-04-12","0856023157","Xã Thanh Minh, Thành phố Điện Biên Phủ, Điện Biên","ungvanhkhuyen562@naver.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- dieu duong
	VALUE ("Lã Thanh", "Tâm", "F","1987-09-18","0911873506","Xã Hương Thọ, Thị xã Hương Trà, Thừa Thiên Huế","lathanhtam334@google.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Chúng Nhã","Yến","F","1980-09-08","0823295046","Xã Tiên Thuận, Huyện Bến Cầu, Tây Ninh","chungnhayen877@naver.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- dieu duong
	VALUE ("Ung Vành","Khuyên","F","1990-04-12","0856023157","Xã Thanh Minh, Thành phố Điện Biên Phủ, Điện Biên","ungvanhkhuyen562@naver.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Ong Quỳnh", "Liên","F","1998-08-01","0864902678","Phường Quyết Tiến, Thành phố Lai Châu, Lai Châu","longquynhlien871@facebook.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- bac si
	VALUE ("Thi Kim","Liên","F", "1967-07-09","0831508627","Xã Tân Mỹ, Thành phố Bắc Giang, Bắc Giang","thikimlien992@facebook.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- bac si
	VALUE ("Tôn Thất Duy","Luận","M", "2000-09-16","0885028436","Xã Tân Hòa Đông, Huyện Tân Phước, Tiền Giang","tonthatduyluan256@naver.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- dieu duong
	VALUE ("Hướng Chiêu", "Phong","M","1979-01-24","0351945283","Xã Bến Củi, Huyện Dương Minh Châu, Tây Ninh","huongchieuphong455@gmail.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Đan Lan","Ngọc","F","1987-06-25","0949471682","Xã Trực Đại, Huyện Trực Ninh, Nam Định","danlanngoc279@gmail.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Ninh Ngọc", "Thạch","M","1991-03-07","0908972136","Xã Bình Hòa, Huyện Tây Sơn, Bình Định","ninhngocthach394@naver.com");
INSERT INTO nguoi_dung (ho_va_ten_dem, ten_rieng, gioi_tinh, ngay_sinh, so_dien_thoai, dia_chi, email) -- benh nhan
	VALUE ("Lý Quốc","Hùng","M","1973-09-29","0588495630","Xã Phước Thể, Huyện Tuy Phong, Bình Thuận","lyquochung682@google.com");
    
    
INSERT INTO benh_nhan VALUE(1,1.58,79);
INSERT INTO benh_nhan VALUE(3,1.66,70);
INSERT INTO benh_nhan VALUE(6,1.8,90);
INSERT INTO benh_nhan VALUE(7,1.7,75);
INSERT INTO benh_nhan VALUE(10,1.58,79);
INSERT INTO benh_nhan VALUE(12,183,78);
INSERT INTO benh_nhan VALUE(14,1.66,77);
INSERT INTO benh_nhan VALUE(18,1.82,88.6);
INSERT INTO benh_nhan VALUE(19,1.7,52);
INSERT INTO benh_nhan VALUE(20,1.62,55.3);

INSERT INTO tien_su_benh VALUE (1,"từng bị tiểu đường");
INSERT INTO tien_su_benh VALUE (3,"không");
INSERT INTO tien_su_benh VALUE (6,"đau mỏi vai gáy");
INSERT INTO tien_su_benh VALUE (7,NULL);
INSERT INTO tien_su_benh VALUE (10,"bị gãy xương tay");
INSERT INTO tien_su_benh VALUE (12,"bị chảy máu mũi");
INSERT INTO tien_su_benh VALUE (14,"chưa có bệnh nặng");
INSERT INTO tien_su_benh VALUE (18,"đau lưng");
INSERT INTO tien_su_benh VALUE (19,"ngã xe");
INSERT INTO tien_su_benh VALUE (20,"suy nhược cơ thể");

INSERT INTO bac_si VALUE (4,5,"đang khám","Bác sĩ khám tổng quát",NULL);
INSERT INTO bac_si VALUE (5,20,"chưa có lịch hẹn","Bác sĩ chuyên khoa","Tim mạch");
INSERT INTO bac_si VALUE (9,10,"đã có lịch hẹn","Bác sĩ chuyên khoa","Chấn thương chỉnh hình");
INSERT INTO bac_si VALUE (15,9,"chưa có lịch hẹn","Bác sĩ khám tổng quát",NULL);
INSERT INTO bac_si VALUE (16,12,"đã có lịch hẹn","Bác sĩ chuyên khoa","y học cổ truyền");
INSERT INTO dieu_duong VALUE(2,12,NULL);
INSERT INTO dieu_duong VALUE(8,5,2);
INSERT INTO dieu_duong VALUE(11,3,2);
INSERT INTO dieu_duong VALUE(13,2,2);
INSERT INTO dieu_duong VALUE(17,7,2);

-- QUERY 
SELECT * FROM nguoi_dung,benh_nhan,tien_su_benh
WHERE nguoi_dung.ma_nguoi_dung = benh_nhan.ma_benh_nhan AND benh_nhan.ma_benh_nhan = tien_su_benh.ma_benh_nhan;
SELECT * FROM nguoi_dung,bac_si
WHERE nguoi_dung.ma_nguoi_dung = bac_si.ma_bac_si;
SELECT * FROM nguoi_dung,dieu_duong
WHERE nguoi_dung.ma_nguoi_dung = dieu_duong.ma_dieu_duong;