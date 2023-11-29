use btl;

create table don_thuoc (
	ma_don_thuoc int primary key,
    ngay_tao datetime not null,
    ma_benh_nhan int not null,
    ngay_kham date not null,
    gio_kham time not null
);

create table lich_kham (
	ma_benh_nhan int not null,
    ngay_kham date not null,
    gio_kham time,
    trang_thai varchar(20) not null,
    ma_bac_si int not null,
    chan_doan varchar(100),
    thoi_gian_bat_dau time,
    thoi_gian_ket_thuc time,
    primary key(ma_benh_nhan, ngay_kham, gio_kham),
    constraint fk_lich_kham foreign key (ma_bac_si) references bac_si (ma_bac_si)
);

alter table don_thuoc 
add constraint fk_don_thuoc foreign key (ma_benh_nhan, ngay_kham, gio_kham) references lich_kham(ma_benh_nhan, ngay_kham, gio_kham);

create table thuc_hien_xet_nghiem (
	ma_benh_nhan int not null,
    ngay_kham date not null,
    gio_kham time,
    ma_xet_nghiem varchar(15),
    primary key(ma_benh_nhan, ngay_kham, gio_kham, ma_xet_nghiem),
    constraint fk_date foreign key (ma_benh_nhan, ngay_kham, gio_kham) references lich_kham(ma_benh_nhan, ngay_kham, gio_kham),
    constraint fk_ma_xet_nghiem foreign key (ma_xet_nghiem) references xet_nghiem_chi_dinh(ma_xet_nghiem)
);

create table hoa_don (
	ma_hoa_don int primary key auto_increment,
    thoi_gian_tao datetime,
    tong_tien int,
    phuong_thuc_thanh_toan varchar(10),
    ma_benh_nhan int,
    ngay_kham date,
    gio_kham time,
    constraint fk_hoa_don foreign key(ma_benh_nhan, ngay_kham, gio_kham) references lich_kham(ma_benh_nhan, ngay_kham, gio_kham)
);

create table tao_hoa_don (
	ma_hoa_don int primary key,
    ma_dieu_duong int,
    constraint fk_ma_dieu_duong foreign key(ma_dieu_duong) references dieu_duong(ma_dieu_duong)
);