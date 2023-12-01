-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: btl
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bac_si`
--

DROP TABLE IF EXISTS `bac_si`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bac_si` (
  `ma_bac_si` int NOT NULL,
  `so_nam_kinh_nghiem` int DEFAULT NULL,
  `trang_thai` varchar(50) DEFAULT NULL,
  `loai_bac_si` varchar(50) DEFAULT NULL,
  `chuyen_khoa` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ma_bac_si`),
  CONSTRAINT `bac_si_ibfk_1` FOREIGN KEY (`ma_bac_si`) REFERENCES `nguoi_dung` (`ma_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bac_si`
--

LOCK TABLES `bac_si` WRITE;
/*!40000 ALTER TABLE `bac_si` DISABLE KEYS */;
INSERT INTO `bac_si` VALUES (4,5,'đang khám','Bác sĩ khám tổng quát',NULL),(5,15,'chưa có lịch hẹn','Bác sĩ chuyên khoa','Tim mạch'),(9,10,'đã có lịch hẹn','Bác sĩ chuyên khoa','Chấn thương chỉnh hình'),(15,9,'chưa có lịch hẹn','Bác sĩ khám tổng quát',NULL),(16,12,'đã có lịch hẹn','Bác sĩ chuyên khoa','y học cổ truyền');
/*!40000 ALTER TABLE `bac_si` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benh_nhan`
--

DROP TABLE IF EXISTS `benh_nhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benh_nhan` (
  `ma_benh_nhan` int NOT NULL,
  `chieu_cao` float DEFAULT NULL,
  `can_nang` float DEFAULT NULL,
  PRIMARY KEY (`ma_benh_nhan`),
  CONSTRAINT `benh_nhan_ibfk_1` FOREIGN KEY (`ma_benh_nhan`) REFERENCES `nguoi_dung` (`ma_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benh_nhan`
--

LOCK TABLES `benh_nhan` WRITE;
/*!40000 ALTER TABLE `benh_nhan` DISABLE KEYS */;
INSERT INTO `benh_nhan` VALUES (1,1.58,79),(3,1.66,70),(6,1.8,90),(7,1.7,75),(10,1.58,79),(12,183,78),(14,1.66,77),(18,1.82,88.6),(19,1.7,52),(20,1.62,55.3);
/*!40000 ALTER TABLE `benh_nhan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chung_chi_dieu_duong`
--

DROP TABLE IF EXISTS `chung_chi_dieu_duong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chung_chi_dieu_duong` (
  `ma_dieu_duong` int NOT NULL,
  `ten_chuong_trinh` varchar(255) NOT NULL,
  `nam_dat_duoc` year NOT NULL,
  `ben_cung_cap` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_dieu_duong`,`ten_chuong_trinh`,`nam_dat_duoc`,`ben_cung_cap`),
  CONSTRAINT `chung_chi_dieu_duong_ibfk_1` FOREIGN KEY (`ma_dieu_duong`) REFERENCES `dieu_duong` (`ma_dieu_duong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chung_chi_dieu_duong`
--

LOCK TABLES `chung_chi_dieu_duong` WRITE;
/*!40000 ALTER TABLE `chung_chi_dieu_duong` DISABLE KEYS */;
INSERT INTO `chung_chi_dieu_duong` VALUES (2,'Bác sĩ Điều dưỡng',2015,'Trường Đại học Y Dược Thành phố Hồ Chí Minh'),(8,'Thạc sĩ Điều dưỡng',2019,'Trường Đại học Y Dược Thành phố Hồ Chí Minh'),(11,'Bác sĩ Điều dưỡng',2020,'Trường Đại học Y Dược Thành phố Hồ Chí Minh'),(13,'Chứng chỉ Điều dưỡng cấp cứu',2020,'Viện Đào tạo Y dược dự phòng và Chăm sóc sức khỏe cộng đồng'),(17,'Chứng chỉ Điều dưỡng Hồi sức cấp cứu',2017,'Học viện Quân y');
/*!40000 ALTER TABLE `chung_chi_dieu_duong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dieu_duong`
--

DROP TABLE IF EXISTS `dieu_duong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dieu_duong` (
  `ma_dieu_duong` int NOT NULL,
  `so_nam_kinh_nghiem` int DEFAULT NULL,
  `ma_quan_ly` int DEFAULT NULL,
  PRIMARY KEY (`ma_dieu_duong`),
  KEY `ma_quan_ly` (`ma_quan_ly`),
  CONSTRAINT `dieu_duong_ibfk_1` FOREIGN KEY (`ma_quan_ly`) REFERENCES `dieu_duong` (`ma_dieu_duong`),
  CONSTRAINT `dieu_duong_ibfk_2` FOREIGN KEY (`ma_dieu_duong`) REFERENCES `nguoi_dung` (`ma_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dieu_duong`
--

LOCK TABLES `dieu_duong` WRITE;
/*!40000 ALTER TABLE `dieu_duong` DISABLE KEYS */;
INSERT INTO `dieu_duong` VALUES (2,12,NULL),(8,5,2),(11,3,2),(13,2,2),(17,7,2);
/*!40000 ALTER TABLE `dieu_duong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_thuoc`
--

DROP TABLE IF EXISTS `don_thuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `don_thuoc` (
  `ma_don_thuoc` int NOT NULL AUTO_INCREMENT,
  `ngay_tao` datetime NOT NULL,
  `ma_benh_nhan` int NOT NULL,
  `ngay_kham` date NOT NULL,
  `gio_kham` time NOT NULL,
  PRIMARY KEY (`ma_don_thuoc`),
  KEY `fk_don_thuoc` (`ma_benh_nhan`,`ngay_kham`,`gio_kham`),
  CONSTRAINT `fk_don_thuoc` FOREIGN KEY (`ma_benh_nhan`, `ngay_kham`, `gio_kham`) REFERENCES `lich_kham` (`ma_benh_nhan`, `ngay_kham`, `gio_kham`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_thuoc`
--

LOCK TABLES `don_thuoc` WRITE;
/*!40000 ALTER TABLE `don_thuoc` DISABLE KEYS */;
INSERT INTO `don_thuoc` VALUES (1,'2023-03-20 09:00:00',1,'2023-03-20','07:00:00'),(2,'2023-03-25 15:30:00',6,'2023-03-25','15:00:00'),(3,'2023-03-25 17:00:00',3,'2023-03-25','16:00:00'),(4,'2023-03-25 09:00:00',6,'2023-03-25','08:00:00'),(5,'2023-03-29 16:40:00',10,'2023-03-29','16:00:00'),(6,'2023-03-30 09:00:00',12,'2023-03-30','08:00:00'),(7,'2023-04-01 11:00:00',14,'2023-04-01','10:00:00'),(8,'2023-04-01 14:00:00',18,'2023-04-01','13:20:00'),(9,'2023-04-04 09:00:00',20,'2023-04-04','15:00:00');
/*!40000 ALTER TABLE `don_thuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gio_lam_viec`
--

DROP TABLE IF EXISTS `gio_lam_viec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_lam_viec` (
  `ma_bac_si` int NOT NULL,
  `thu_trong_tuan` varchar(10) NOT NULL,
  `thoi_gian_bat_dau` time NOT NULL,
  `thoi_gian_ket_thuc` time NOT NULL,
  PRIMARY KEY (`ma_bac_si`,`thu_trong_tuan`,`thoi_gian_bat_dau`,`thoi_gian_ket_thuc`),
  CONSTRAINT `gio_lam_viec_ibfk_1` FOREIGN KEY (`ma_bac_si`) REFERENCES `bac_si` (`ma_bac_si`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_lam_viec`
--

LOCK TABLES `gio_lam_viec` WRITE;
/*!40000 ALTER TABLE `gio_lam_viec` DISABLE KEYS */;
INSERT INTO `gio_lam_viec` VALUES (4,'Thứ 2','08:00:00','17:00:00'),(5,'Thứ 3','08:00:00','17:00:00'),(9,'Thứ 4','08:00:00','17:00:00'),(15,'Thứ 5','08:00:00','17:00:00'),(16,'Thứ 6','08:00:00','17:00:00');
/*!40000 ALTER TABLE `gio_lam_viec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don` (
  `ma_hoa_don` int NOT NULL AUTO_INCREMENT,
  `thoi_gian_tao` datetime DEFAULT NULL,
  `tong_tien` int DEFAULT NULL,
  `phuong_thuc_thanh_toan` varchar(20) DEFAULT NULL,
  `ma_benh_nhan` int DEFAULT NULL,
  `ngay_kham` date DEFAULT NULL,
  `gio_kham` time DEFAULT NULL,
  `trang_thai` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ma_hoa_don`),
  KEY `fk_hoa_don` (`ma_benh_nhan`,`ngay_kham`,`gio_kham`),
  CONSTRAINT `fk_hoa_don` FOREIGN KEY (`ma_benh_nhan`, `ngay_kham`, `gio_kham`) REFERENCES `lich_kham` (`ma_benh_nhan`, `ngay_kham`, `gio_kham`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (1,'2023-03-20 10:00:00',700000,'tien mat',1,'2023-03-20','07:00:00','da thanh toan'),(2,'2023-03-25 16:30:00',800000,'tien mat',6,'2023-03-25','15:00:00','da thanh toan'),(3,'2023-03-25 17:00:00',900000,'chuyen khoan',3,'2023-03-25','16:00:00','chua thanh toan'),(4,'2023-03-25 08:30:00',1000000,'tien mat',6,'2023-03-25','08:00:00','da thanh toan'),(5,'2023-03-29 17:00:00',700000,'chuyen khoan',10,'2023-03-29','16:00:00','da thanh toan'),(6,'2023-03-30 09:00:00',750000,'tien mat',12,'2023-03-30','08:00:00','chua thanh toan'),(7,'2023-04-01 11:00:00',800000,'tien mat',14,'2023-04-01','10:00:00','chua thanh toan'),(8,'2023-04-01 14:00:00',800000,'chuyen khoan',18,'2023-04-01','13:20:00','da thanh toan'),(9,'2023-04-04 16:00:00',900000,'tien mat',20,'2023-04-04','15:00:00','da thanh toan');
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_kham`
--

DROP TABLE IF EXISTS `lich_kham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_kham` (
  `ma_benh_nhan` int NOT NULL,
  `ngay_kham` date NOT NULL,
  `gio_kham` time NOT NULL,
  `trang_thai` varchar(20) NOT NULL,
  `ma_bac_si` int NOT NULL,
  `chan_doan` varchar(100) DEFAULT NULL,
  `thoi_gian_bat_dau` time DEFAULT NULL,
  `thoi_gian_ket_thuc` time DEFAULT NULL,
  PRIMARY KEY (`ma_benh_nhan`,`ngay_kham`,`gio_kham`),
  KEY `fk_lich_kham` (`ma_bac_si`),
  CONSTRAINT `fk_lich_kham` FOREIGN KEY (`ma_bac_si`) REFERENCES `bac_si` (`ma_bac_si`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_kham`
--

LOCK TABLES `lich_kham` WRITE;
/*!40000 ALTER TABLE `lich_kham` DISABLE KEYS */;
INSERT INTO `lich_kham` VALUES (1,'2023-03-20','07:00:00','đã khám',4,'đau ruột thừa','07:20:00','07:40:00'),(1,'2023-04-10','09:00:00','chưa khám',5,NULL,NULL,NULL),(3,'2023-03-25','16:00:00','đã khám',9,'bình thường','16:30:00','16:40:00'),(6,'2023-03-25','08:00:00','đã khám',15,'viêm phổi','09:00:00','09:10:00'),(6,'2023-03-25','15:00:00','đã khám',9,'bình thường','14:50:00','15:00:00'),(7,'2023-03-27','09:00:00','chưa khám',9,NULL,NULL,NULL),(10,'2023-03-29','16:00:00','đã khám',15,'viêm họng','15:00:00','15:10:00'),(12,'2023-03-30','08:00:00','đã khám',15,'viêm phổi','09:00:00','09:10:00'),(14,'2023-04-01','10:00:00','đã khám',16,'đau bụng','10:00:00','10:10:00'),(18,'2023-04-01','13:20:00','đã khám',16,'đầy hơi','13:30:00','13:40:00'),(19,'2023-04-02','09:00:00','chưa khám',5,NULL,NULL,NULL),(20,'2023-04-04','15:00:00','đã khám',4,'viêm phổi','14:00:00','14:10:00');
/*!40000 ALTER TABLE `lich_kham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung` (
  `ma_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `ho_va_ten_dem` varchar(50) DEFAULT NULL,
  `ten_rieng` varchar(50) DEFAULT NULL,
  `gioi_tinh` enum('M','F') DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `so_dien_thoai` varchar(10) DEFAULT NULL,
  `dia_chi` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES (1,'Trác Hào','Nghiệp','M','1980-04-06','0829362105','Xã Nhơn Hoà, Huyện Tân Thạnh, Long An','trachaonghiep826@gmail.com'),(2,'Tán Bích','Thu','F','1980-03-23','0889073461','Xã Rơ Kơi, Huyện Sa Thầy, Kon Tum','tanbichthu648@gmail.com'),(3,'Nhâm Lệ','Nga','F','2008-04-01','0841349658','Xã Ia Le, Huyện Chư Pưh, Gia Lai','nhamlenga9@naver.com'),(4,'Cổ Duy','Tâm','M','1995-04-29','0966854179','Xã Xuân Phương, Thị xã Sông Cầu, Phú Yên','coduytam911@naver.com'),(5,'Tề Gia','Uy','M','1972-05-26','0970367198','Xã Đào Mỹ, Huyện Lạng Giang, Bắc Giang','tegiauy283@hotmail.com'),(6,'Lý Xuân','Trung','M','1972-04-17','0583562870','Xã Tịnh Bắc, Huyện Sơn Tịnh, Quảng Ngãi','lyxuantrung937@google.com'),(7,'Đặng Khánh','Văn','M','1957-11-10','0798274063','Xã Săm Khóe, Huyện Mai Châu, Hoà Bình','dangkhanhvan492@microsoft.com'),(8,'Hi Lệ','Khanh','F','1999-02-24','0583081795','Xã Pú Đao, Huyện Nậm Nhùn, Lai Châu','hilekhanh481@microsoft.com'),(9,'Phong Việt','Phương','M','1974-07-09','0835468923','Xã Ba Cụm Bắc, Huyện Khánh Sơn, Khánh Hòa','phongvietphuong54@microsoft.com'),(10,'Ung Vành','Khuyên','F','1990-04-12','0856023157','Xã Thanh Minh, Thành phố Điện Biên Phủ, Điện Biên','ungvanhkhuyen562@naver.com'),(11,'Lã Thanh','Tâm','F','1987-09-18','0911873506','Xã Hương Thọ, Thị xã Hương Trà, Thừa Thiên Huế','lathanhtam334@google.com'),(12,'Chúng Nhã','Yến','F','1980-09-08','0823295046','Xã Tiên Thuận, Huyện Bến Cầu, Tây Ninh','chungnhayen877@naver.com'),(13,'Ung Vành','Khuyên','F','1990-04-12','0856023157','Xã Thanh Minh, Thành phố Điện Biên Phủ, Điện Biên','ungvanhkhuyen562@naver.com'),(14,'Ong Quỳnh','Liên','F','1998-08-01','0864902678','Phường Quyết Tiến, Thành phố Lai Châu, Lai Châu','longquynhlien871@facebook.com'),(15,'Thi Kim','Liên','F','1967-07-09','0831508627','Xã Tân Mỹ, Thành phố Bắc Giang, Bắc Giang','thikimlien992@facebook.com'),(16,'Tôn Thất Duy','Luận','M','2000-09-16','0885028436','Xã Tân Hòa Đông, Huyện Tân Phước, Tiền Giang','tonthatduyluan256@naver.com'),(17,'Hướng Chiêu','Phong','M','1979-01-24','0351945283','Xã Bến Củi, Huyện Dương Minh Châu, Tây Ninh','huongchieuphong455@gmail.com'),(18,'Đan Lan','Ngọc','F','1987-06-25','0949471682','Xã Trực Đại, Huyện Trực Ninh, Nam Định','danlanngoc279@gmail.com'),(19,'Ninh Ngọc','Thạch','M','1991-03-07','0908972136','Xã Bình Hòa, Huyện Tây Sơn, Bình Định','ninhngocthach394@naver.com'),(20,'Lý Quốc','Hùng','M','1973-09-29','0588495630','Xã Phước Thể, Huyện Tuy Phong, Bình Thuận','lyquochung682@google.com');
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tao_hoa_don`
--

DROP TABLE IF EXISTS `tao_hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tao_hoa_don` (
  `ma_hoa_don` int NOT NULL,
  `ma_dieu_duong` int DEFAULT NULL,
  PRIMARY KEY (`ma_hoa_don`),
  KEY `fk_ma_dieu_duong` (`ma_dieu_duong`),
  CONSTRAINT `fk_ma_dieu_duong` FOREIGN KEY (`ma_dieu_duong`) REFERENCES `dieu_duong` (`ma_dieu_duong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tao_hoa_don`
--

LOCK TABLES `tao_hoa_don` WRITE;
/*!40000 ALTER TABLE `tao_hoa_don` DISABLE KEYS */;
INSERT INTO `tao_hoa_don` VALUES (1,2),(6,2),(7,2),(2,8),(3,11),(8,11),(4,13),(5,17),(9,17);
/*!40000 ALTER TABLE `tao_hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuc_hien_xet_nghiem`
--

DROP TABLE IF EXISTS `thuc_hien_xet_nghiem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuc_hien_xet_nghiem` (
  `ma_benh_nhan` int NOT NULL,
  `ngay_kham` date NOT NULL,
  `gio_kham` time NOT NULL,
  `ma_xet_nghiem` int NOT NULL,
  PRIMARY KEY (`ma_benh_nhan`,`ngay_kham`,`gio_kham`,`ma_xet_nghiem`),
  KEY `fk_ma_xet_nghiem` (`ma_xet_nghiem`),
  CONSTRAINT `fk_date` FOREIGN KEY (`ma_benh_nhan`, `ngay_kham`, `gio_kham`) REFERENCES `lich_kham` (`ma_benh_nhan`, `ngay_kham`, `gio_kham`),
  CONSTRAINT `fk_ma_xet_nghiem` FOREIGN KEY (`ma_xet_nghiem`) REFERENCES `xet_nghiem_chi_dinh` (`ma_xet_nghiem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuc_hien_xet_nghiem`
--

LOCK TABLES `thuc_hien_xet_nghiem` WRITE;
/*!40000 ALTER TABLE `thuc_hien_xet_nghiem` DISABLE KEYS */;
INSERT INTO `thuc_hien_xet_nghiem` VALUES (18,'2023-04-01','13:20:00',1),(6,'2023-03-25','08:00:00',3),(10,'2023-03-29','16:00:00',3),(12,'2023-03-30','08:00:00',3),(20,'2023-04-04','15:00:00',3),(1,'2023-03-20','07:00:00',4),(14,'2023-04-01','10:00:00',4),(18,'2023-04-01','13:20:00',4);
/*!40000 ALTER TABLE `thuc_hien_xet_nghiem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuoc`
--

DROP TABLE IF EXISTS `thuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuoc` (
  `ma_thuoc` int NOT NULL AUTO_INCREMENT,
  `ten_thuoc` varchar(255) DEFAULT NULL,
  `tinh_trang` varchar(50) DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
  `don_gia` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ma_thuoc`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuoc`
--

LOCK TABLES `thuoc` WRITE;
/*!40000 ALTER TABLE `thuoc` DISABLE KEYS */;
INSERT INTO `thuoc` VALUES (1,'Paracetamol','Còn hàng',100,20.00),(2,'Ibuprofen','Còn hàng',50,30.00),(3,'Amoxicillin','Còn hàng',20,40.00),(4,'Omeprazol','Còn hàng',15,50.00),(5,'Simvastatin','Còn hàng',10,60.00);
/*!40000 ALTER TABLE `thuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuoc_trong_don`
--

DROP TABLE IF EXISTS `thuoc_trong_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuoc_trong_don` (
  `ma_don_thuoc` int NOT NULL,
  `ma_thuoc` int NOT NULL,
  `don_gia` decimal(10,2) DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
  PRIMARY KEY (`ma_don_thuoc`,`ma_thuoc`),
  KEY `ma_thuoc` (`ma_thuoc`),
  CONSTRAINT `thuoc_trong_don_ibfk_1` FOREIGN KEY (`ma_thuoc`) REFERENCES `thuoc` (`ma_thuoc`),
  CONSTRAINT `thuoc_trong_don_ibfk_2` FOREIGN KEY (`ma_don_thuoc`) REFERENCES `don_thuoc` (`ma_don_thuoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuoc_trong_don`
--

LOCK TABLES `thuoc_trong_don` WRITE;
/*!40000 ALTER TABLE `thuoc_trong_don` DISABLE KEYS */;
INSERT INTO `thuoc_trong_don` VALUES (1,1,20000.00,10),(2,2,30000.00,5),(3,3,40000.00,2),(4,4,50000.00,1),(5,5,60000.00,0);
/*!40000 ALTER TABLE `thuoc_trong_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tien_su_benh`
--

DROP TABLE IF EXISTS `tien_su_benh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tien_su_benh` (
  `ma_benh_nhan` int NOT NULL,
  `ten_benh` varchar(50) NOT NULL,
  PRIMARY KEY (`ma_benh_nhan`,`ten_benh`),
  CONSTRAINT `tien_su_benh_ibfk_1` FOREIGN KEY (`ma_benh_nhan`) REFERENCES `benh_nhan` (`ma_benh_nhan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tien_su_benh`
--

LOCK TABLES `tien_su_benh` WRITE;
/*!40000 ALTER TABLE `tien_su_benh` DISABLE KEYS */;
INSERT INTO `tien_su_benh` VALUES (1,'từng bị tiểu đường'),(3,'không'),(6,'đau mỏi vai gáy'),(7,'không'),(10,'bị gãy xương tay'),(12,'bị chảy máu mũi'),(14,'chưa có bệnh nặng'),(18,'đau lưng'),(19,'ngã xe'),(20,'suy nhược cơ thể');
/*!40000 ALTER TABLE `tien_su_benh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xet_nghiem_chi_dinh`
--

DROP TABLE IF EXISTS `xet_nghiem_chi_dinh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xet_nghiem_chi_dinh` (
  `ma_xet_nghiem` int NOT NULL AUTO_INCREMENT,
  `ten_xet_nghiem` varchar(255) DEFAULT NULL,
  `phong_thuc_hien` int DEFAULT NULL,
  `gia_tien` decimal(10,2) DEFAULT NULL,
  `ma_bac_si` int DEFAULT NULL,
  `ket_qua` text,
  `thoi_gian_bat_dau` datetime DEFAULT NULL,
  `thoi_gian_ket_thuc` datetime DEFAULT NULL,
  PRIMARY KEY (`ma_xet_nghiem`),
  KEY `ma_bac_si` (`ma_bac_si`),
  CONSTRAINT `xet_nghiem_chi_dinh_ibfk_1` FOREIGN KEY (`ma_bac_si`) REFERENCES `bac_si` (`ma_bac_si`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xet_nghiem_chi_dinh`
--

LOCK TABLES `xet_nghiem_chi_dinh` WRITE;
/*!40000 ALTER TABLE `xet_nghiem_chi_dinh` DISABLE KEYS */;
INSERT INTO `xet_nghiem_chi_dinh` VALUES (1,'Xét nghiệm máu',1,2000000.00,5,'Bình thường','2023-05-30 09:00:00','2023-05-30 10:00:00'),(2,'Xét nghiệm nước tiểu',2,100000.00,5,'Bình thường','2023-07-13 10:00:00','2023-07-13 10:30:00'),(3,'Xét nghiệm X-quang',3,300000.00,9,'Nhận thấy tổn thương ở phổi','2023-09-01 08:00:00','2023-09-01 09:00:00'),(4,'Xét nghiệm siêu âm',4,500000.00,16,'Không phát hiện bất thường','2023-09-12 14:00:00','2023-09-12 16:00:00'),(5,'Xét nghiệm máu đông',5,1500000.00,16,'Tăng đông máu','2023-10-30 07:00:00','2023-10-30 09:00:00');
/*!40000 ALTER TABLE `xet_nghiem_chi_dinh` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-01  9:21:31
