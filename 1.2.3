delimiter //
create procedure getDoctor (
	n int,
    x date
)
begin
	select b.ma_bac_si, count(*) as count
    from bac_si as b, lich_kham as c
    where b.ma_bac_si = c.ma_bac_si and c.ngay_kham = x
    group by b.ma_bac_si
	having count(*) >= n
    order by count desc;
end //

delimiter //
create procedure getHoadon (
	bac_si int,
    ngay_bat_dau date,
    ngay_ket_thuc date
)
begin
	select *
    from lich_kham as a, hoa_don as b
    where 
		a.ngay_kham >= ngay_bat_dau 
        and a.ngay_kham <= ngay_ket_thuc
        and a.ma_bac_si = bac_si
        and a.ma_benh_nhan = b.ma_benh_nhan
        and a.ngay_kham = b.ngay_kham
        and a.gio_kham = b.gio_kham
	order by tong_tien desc;
end //
