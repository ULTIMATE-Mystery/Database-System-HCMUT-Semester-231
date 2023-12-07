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

//main display
function UpdateBillModal({ isOpen, toggleModal, fetchData, getID }) {
  const addHours = (dateTimeString, hours) => {
    const date = new Date(dateTimeString);
    date.setTime(date.getTime() + hours * 60 * 60 * 1000); // Thêm số giờ (hours) vào thời gian hiện tại
    return date;
  };

  const formatDateTime = (dateTimeString) => {
    const date = addHours(dateTimeString, 7); // Thêm 7 giờ vào thời gian
    return date.toISOString().replace("T", " ").replace(".000Z", "");
  };

  const addDays = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days); // Thêm số ngày (days) vào ngày hiện tại
    return date;
  };

  const formatDate = (dateString) => {
    const date = addDays(dateString, 1); // Thêm 1 ngày vào ngày hiện tại
    return date.toISOString().split("T")[0];
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const currentTimeString = currentDate.toTimeString().split(" ")[0];

  const [myDataBill, setMyDataBill] = useState([]);

  useEffect(() => {
    const fetchDataBill = () => {
      axios
        .get("http://localhost:4000/bill/data")
        .then((response) => {
          setMyDataBill(response.data.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API:", error);
        });
    };
  }, []);

  // fetchDataBill();

  // console.log(fetchData);
  console.log(myDataBill);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (getID && myDataBill !== null) {
      const temp = myDataBill.find(
        (item) => item.ma_hoa_don === parseInt(getID, 10)
      );
      setFormData(temp);
    }
  }, [getID, myDataBill]);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     setShowSuccessMessage(true);
  //     const formDataCopy = {
  //       thoi_gian_tao: formatDateTime(formData.thoi_gian_tao).toString(),
  //       tong_tien: parseInt(formData.tong_tien, 10),
  //       phuong_thuc_thanh_toan: formData.phuong_thuc_thanh_toan,
  //       ma_benh_nhan: parseInt(formData.ma_benh_nhan, 10),
  //       ngay_kham: formatDate(formData.ngay_kham).toString(),
  //       gio_kham: formData.gio_kham.toString(),
  //       trang_thai: formData.trang_thai,
  //     };
  //     console.log("FormData before sending:", formDataCopy);
  //     const response = await axios.post("http://localhost:4000/bill/create", {
  //       thoi_gian_tao: formDataCopy.thoi_gian_tao,
  //       tong_tien: formDataCopy.tong_tien,
  //       phuong_thuc_thanh_toan: formDataCopy.phuong_thuc_thanh_toan,
  //       ma_benh_nhan: formDataCopy.ma_benh_nhan,
  //       ngay_kham: formDataCopy.ngay_kham,
  //       gio_kham: formDataCopy.gio_kham,
  //       trang_thai: formDataCopy.trang_thai,
  //     });

  //     console.log(response.data); // In ra dữ liệu trả về từ server (nếu có)
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu:", error);
  //   }
  // };

  if (formData !== null) {
    return (
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Tạo hóa đơn mới</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="ma_hoa_don">
                Mã hóa đơn
              </Label>
              <Input
                type="number"
                name="ma_hoa_don"
                id="ma_hoa_don"
                value={getID}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="ma_benh_nhan">
                Mã Bệnh nhân
              </Label>
              <Input
                type="number"
                name="ma_benh_nhan"
                id="ma_benh_nhan"
                value={formData.ma_benh_nhan}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="thoi_gian_tao">
                Thời gian tạo
              </Label>
              <Input
                type="datetime-local"
                name="thoi_gian_tao"
                id="thoi_gian_tao"
                value={formatDateTime(formData.thoi_gian_tao)}
                readOnly={true}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="tong_tien">
                Tổng tiền
              </Label>
              <Input
                type="number"
                name="tong_tien"
                id="tong_tien"
                readOnly={true}
              />
            </FormGroup>
            <FormGroup>
              <Label
                style={{ fontWeight: "bold" }}
                for="phuong_thuc_thanh_toan"
              >
                Phương Thức thanh toán
              </Label>
              <Input
                type="text"
                name="phuong_thuc_thanh_toan"
                id="phuong_thuc_thanh_toan"
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="ngay_kham">
                Ngày khám
              </Label>
              <Input
                type="date"
                name="ngay_kham"
                id="ngay_kham"
                value={formatDate(formData.ngay_kham)}
                readOnly={true}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="gio_kham">
                Giờ khám
              </Label>
              <Input
                type="time"
                name="gio_kham"
                id="gio_kham"
                value={formData.gio_kham}
                readOnly={true}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="trang_thai">
                Trạng thái
              </Label>
              <Input
                type="text"
                name="trang_thai"
                id="trang_thai"
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
          {showSuccessMessage && (
            <div className="alert alert-success" role="alert">
              Hóa đơn đã được cập nhật thành công!
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Cập nhật hóa đơn</Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  } else if (formData === null) {
    return (
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Cập nhật hóa đơn</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="ma_hoa_don">
                Mã hóa đơn
              </Label>
              <Input
                type="number"
                name="ma_benh_nhan"
                id="ma_benh_nhan"
                value={getID}
                readOnly={true}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="ma_benh_nhan">
                Mã Bệnh nhân
              </Label>
              <Input
                type="number"
                name="ma_benh_nhan"
                id="ma_benh_nhan"
                // value={formData.ma_benh_nhan}
                readOnly="true"
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="thoi_gian_tao">
                Thời gian tạo
              </Label>
              <Input
                type="datetime-local"
                name="thoi_gian_tao"
                id="thoi_gian_tao"
                // defaultValue={formData.thoi_gian_tao}
                // onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="tong_tien">
                Tổng tiền
              </Label>
              <Input
                type="number"
                name="tong_tien"
                id="tong_tien"
                // value={formData.tong_tien}
                // // onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label
                style={{ fontWeight: "bold" }}
                for="phuong_thuc_thanh_toan"
              >
                Phương Thức thanh toán
              </Label>
              <Input
                type="text"
                name="phuong_thuc_thanh_toan"
                id="phuong_thuc_thanh_toan"
                // onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="ngay_kham">
                Ngày khám
              </Label>
              <Input
                readOnly
                type="date"
                name="ngay_kham"
                id="ngay_kham"
                // value={formatDate(formData.ngay_kham)}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="gio_kham">
                Giờ khám
              </Label>
              <Input
                readOnly
                type="time"
                name="gio_kham"
                id="gio_kham"
                // value={formData.gio_kham}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="trang_thai">
                Trạng thái
              </Label>
              <Input
                type="text"
                name="trang_thai"
                id="trang_thai"
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
          {showSuccessMessage && (
            <div className="alert alert-success" role="alert">
              Hóa đơn đã được cập nhật thành công!
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Cập nhật hóa đơn</Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default UpdateBillModal;
