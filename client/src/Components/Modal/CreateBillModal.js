import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
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
  const date = new Date(dateTimeString);
  date.setDate(date.getDate());

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
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

//main display
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

  const [medicine, setMedicine] = useState([]);
  useEffect(() => {
    fetchMedicineData(); // Gọi API khi component được render lần đầu tiên
    const interval = setInterval(() => {
      fetchMedicineData(); // Gọi API sau mỗi khoảng thời gian
    }, 5000); // Thời gian cập nhật, ví dụ 5 giây
    return () => clearInterval(interval); // Clear interval để tránh memory leak
  }, []);
  const fetchMedicineData = () => {
    axios
      .get("http://localhost:4000/medicine/data")
      .then((response) => {
        setMedicine(response.data.data);
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

  //medicine
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const handleMedicineChange = (event) => {
    const selectedMedicineName = event.target.value;
    const selectedMedicineInfo = medicine.find(
      (item) => item.ten_thuoc === selectedMedicineName
    );
    if (
      !selectedMedicines.some(
        (item) => item.ten_thuoc === selectedMedicineInfo.ten_thuoc
      )
    ) {
      setSelectedMedicines([...selectedMedicines, selectedMedicineInfo]);
    }
  };

  const removeSelectedMedicine = (index, event) => {
    event.preventDefault();
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines.splice(index, 1);
    setSelectedMedicines(updatedMedicines);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formDataCopy = {
        thoi_gian_tao: formatDateTime(formData.thoi_gian_tao).toString(),
        tong_tien: parseInt(formData.tong_tien, 10),
        phuong_thuc_thanh_toan: formData.phuong_thuc_thanh_toan,
        ma_benh_nhan: parseInt(formData.ma_benh_nhan, 10),
        ngay_kham: formatDate(formData.ngay_kham).toString(),
        gio_kham: formData.gio_kham.toString(),
        trang_thai: formData.trang_thai,
      };
      console.log("FormData before sending:", formDataCopy);
      const response = await axios.post("http://localhost:4000/bill/create", {
        thoi_gian_tao: formDataCopy.thoi_gian_tao,
        tong_tien: formDataCopy.tong_tien,
        phuong_thuc_thanh_toan: formDataCopy.phuong_thuc_thanh_toan,
        ma_benh_nhan: formDataCopy.ma_benh_nhan,
        ngay_kham: formDataCopy.ngay_kham,
        gio_kham: formDataCopy.gio_kham,
        trang_thai: formDataCopy.trang_thai,
      });

      console.log(response.data); // In ra dữ liệu trả về từ server (nếu có)
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
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
            <Label for="ten_thuoc">Thêm Thuốc</Label>
            <Input
              type="select"
              name="ten_thuoc"
              id="ten_thuoc"
              onChange={handleMedicineChange}
            >
              <option value="">Chọn thuốc</option>
              {medicine.map((item) => (
                <option key={item.id} value={item.ten_thuoc}>
                  {item.ten_thuoc}
                </option>
              ))}
            </Input>
          </FormGroup>

          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            {selectedMedicines.map((medicine, index) => (
              <Row key={index}>
                <Col>{medicine.ten_thuoc}</Col>
                <Col>Đơn giá: {medicine.don_gia}</Col>
                <Col>
                  <Button
                    onClick={(event) => removeSelectedMedicine(index, event)}
                  >
                    Xóa
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
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
              readOnly
              type="date"
              name="ngay_kham"
              id="ngay_kham"
              value={formatDate(formData.ngay_kham)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="gio_kham">Giờ khám</Label>
            <Input
              readOnly
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
