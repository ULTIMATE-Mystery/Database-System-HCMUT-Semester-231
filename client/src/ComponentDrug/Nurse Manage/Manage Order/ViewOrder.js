import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import axios from "axios";

import CreateOrderModal from "../../../Components/Modal/CreateBillModal.js";

function ViewOrder() {
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

  const [modalOpen, setModalOpen] = useState(false);

  // Function để mở hoặc đóng modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const [myData, setMyData] = useState([]);
  useEffect(() => {
    fetchData(); // Gọi API khi component được render lần đầu tiên

    const interval = setInterval(() => {
      fetchData(); // Gọi API sau mỗi khoảng thời gian
    }, 5000); // Thời gian cập nhật, ví dụ 5 giây

    return () => clearInterval(interval); // Clear interval để tránh memory leak
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/bill/data")
      .then((response) => {
        // console.log("Dữ liệu từ MySQL:", response.data);
        setMyData(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  const handleDelete = (id, status) => {
    if (status === "chua thanh toan") {
      axios
        .delete(`http://localhost:4000/bill/delete/${id}`)
        .then((response) => {
          console.log("Hóa đơn đã được xóa:", id);
          fetchData(); // Gọi lại hàm fetchData để cập nhật dữ liệu
        })
        .catch((error) => {
          console.error("Lỗi khi xóa hóa đơn:", error);
        });
    } else {
      console.log("Không thể xóa hóa đơn đã thanh toán");
    }
  };
  return (
    <Container>
      <Row className="mb-3 " style={{ padding: "20px", paddingRight: "20px" }}>
        <Col>
          <Button color="success" className="mr-2" onClick={toggleModal}>
            Create
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã hóa đơn</th>
                <th>Thời gian tạo</th>
                <th>Tổng tiền</th>
                <th>Phương thức thanh toán</th>
                <th>Mã bệnh nhân</th>
                <th>Ngày khám</th>
                <th>Giờ Khám</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.ma_hoa_don}</td>
                  <td>{formatDateTime(item.thoi_gian_tao)}</td>
                  <td>{item.tong_tien}</td>
                  <td>{item.phuong_thuc_thanh_toan}</td>
                  <td>{item.ma_benh_nhan}</td>
                  <td>{formatDate(item.ngay_kham)}</td>
                  <td>{item.gio_kham}</td>
                  <td>{item.trang_thai}</td>
                  <td>
                    <Row>
                      <Col>
                        <Button color="primary" style={{ marginBottom: "5px" }}>
                          Update
                        </Button>
                        <Button
                          color="danger"
                          onClick={() =>
                            handleDelete(item.ma_hoa_don, item.trang_thai)
                          }
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* Pagination Component */}
      <Row>
        <Col>{/* Your Pagination Component */}</Col>
      </Row>

      {/* Hiển thị CreateOrderModal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Tạo hóa đơn mới</ModalHeader>
        <ModalBody>
          <CreateOrderModal
            isOpen={modalOpen}
            toggleModal={toggleModal}
            fetchData={fetchData}
          />
        </ModalBody>
        {/* Bổ sung các phần khác của Modal nếu cần */}
      </Modal>
    </Container>
  );
}

export default ViewOrder;
