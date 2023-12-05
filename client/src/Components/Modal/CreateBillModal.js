import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

function formatDate(dateTimeString) {
  const formattedDate = dateTimeString.split("T")[0];
  return formattedDate;
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function CreateOrderModal({ isOpen, toggleModal, fetchData }) {
  const [data, setData] = useState();
  useEffect(() => {
    fetchScheduleData(); // Gọi API khi component được render lần đầu tiên
    const interval = setInterval(() => {
      fetchScheduleData(); // Gọi API sau mỗi khoảng thời gian
    }, 5000); // Thời gian cập nhật, ví dụ 5 giây
    return () => clearInterval(interval); // Clear interval để tránh memory leak
  }, []);
  const fetchScheduleData = () => {
    axios
      .get("http://localhost:4000/schedule/data")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const currentTimeString = currentDate.toTimeString().split(" ")[0];

  const [formData, setFormData] = useState({
    thoi_gian_tao: `${currentDateString} ${currentTimeString}`,
    tong_tien: null,
    phuong_thuc_thanh_toan: "",
    ma_benh_nhan: null,
    ngay_kham: currentDateString,
    gio_kham: currentTimeString,
    trang_thai: "",
  });

  useEffect(() => {
    if (formData.ma_benh_nhan !== null) {
      const patientId = parseInt(formData.ma_benh_nhan);
      const patient = data.find((item) => item.ma_benh_nhan === patientId);
      if (patient && patient.trang_thai.toLowerCase() === "đã khám") {
        setFormData({
          ...formData,
          ngay_kham: patient.ngay_kham,
          gio_kham: patient.gio_kham,
        });
      }
    }
  }, [formData.ma_benh_nhan, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formDataCopy = {
      thoi_gian_tao: formatDateTime(formData.thoi_gian_tao).toString(),
      tong_tien: parseInt(formData.tong_tien, 10),
      phuong_thuc_thanh_toan: formData.phuong_thuc_thanh_toan,
      ma_benh_nhan: parseInt(formData.ma_benh_nhan, 10),
      ngay_kham: formatDate(formData.ngay_kham).toString(),
      gio_kham: formData.gio_kham.toString(),
      trang_thai: formData.trang_thai,
    };

    axios
      .post("http://localhost:4000/bill/create", formDataCopy)
      .then((response) => {
        console.log("Hóa đơn đã được tạo:", response.data);
        fetchData();
        toggleModal();
      })
      .catch((error) => {
        console.error("Lỗi khi tạo hóa đơn:", error);
      });
    console.log(formDataCopy);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Tạo hóa đơn mới</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="ma_benh_nhan">Mã Bệnh nhân</Label>
            <Input
              type="number"
              name="ma_benh_nhan"
              id="ma_benh_nhan"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="thoi_gian_tao">Thời gian tạo</Label>
            <Input
              type="datetime-local"
              name="thoi_gian_tao"
              id="thoi_gian_tao"
              defaultValue={formData.thoi_gian_tao}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="tong_tien">Tổng tiền</Label>
            <Input
              type="number"
              name="tong_tien"
              id="tong_tien"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phuong_thuc_thanh_toan">Phương Thức thanh toán</Label>
            <Input
              type="text"
              name="phuong_thuc_thanh_toan"
              id="phuong_thuc_thanh_toan"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="ngay_kham">Ngày khám</Label>
            <Input
              type="date"
              name="ngay_kham"
              id="ngay_kham"
              value={formatDate(formData.ngay_kham)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="gio_kham">Giờ khám</Label>
            <Input
              type="time"
              name="gio_kham"
              id="gio_kham"
              value={formData.gio_kham}
            />
          </FormGroup>
          <FormGroup>
            <Label for="trang_thai">Trạng thái</Label>
            <Input
              type="text"
              name="trang_thai"
              id="trang_thai"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Tạo hóa đơn
        </Button>{" "}
        <Button color="secondary" onClick={toggleModal}>
          Hủy
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateOrderModal;
