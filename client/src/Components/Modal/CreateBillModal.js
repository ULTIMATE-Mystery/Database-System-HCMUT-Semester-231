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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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

  const [testData, setTestData] = useState([]);
  useEffect(() => {
    fetchTestData(); // Gọi API khi component được render lần đầu tiên
    const interval = setInterval(() => {
      fetchTestData(); // Gọi API sau mỗi khoảng thời gian
    }, 5000); // Thời gian cập nhật, ví dụ 5 giây
    return () => clearInterval(interval); // Clear interval để tránh memory leak
  }, []);
  const fetchTestData = () => {
    axios
      .get("http://localhost:4000/test/data")
      .then((response) => {
        setTestData(response.data.data);
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
  const [quantity, setQuantity] = useState(1); // Mặc định số lượng là 1
  const [selectedMedicineName, setSelectedMedicineName] = useState("");

  const handleMedicineChange = (event) => {
    setSelectedMedicineName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddMedicine = () => {
    const selectedMedicineInfo = medicine.find(
      (item) => item.ten_thuoc === selectedMedicineName
    );

    const existingMedicineIndex = selectedMedicines.findIndex(
      (item) => item.ten_thuoc === selectedMedicineName
    );

    if (existingMedicineIndex !== -1) {
      const updatedMedicines = [...selectedMedicines];
      updatedMedicines[existingMedicineIndex].so_luong = parseInt(quantity, 10);
      setSelectedMedicines(updatedMedicines);
    } else {
      const newMedicineInfo = {
        ...selectedMedicineInfo,
        so_luong: parseInt(quantity, 10),
      };
      setSelectedMedicines([...selectedMedicines, newMedicineInfo]);
    }

    setSelectedMedicineName("");
    setQuantity(1);
  };

  const removeSelectedMedicine = (index) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines.splice(index, 1);
    setSelectedMedicines(updatedMedicines);
  };
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedTestName, setSelectedTestName] = useState("");
  // const [testQuantity, setTestQuantity] = useState(1);

  const handleTestChange = (event) => {
    setSelectedTestName(event.target.value);
  };

  const handleAddTest = () => {
    const selectedTestInfo = testData.find(
      (item) => item.ten_xet_nghiem === selectedTestName
    );

    const existingTestIndex = selectedTests.findIndex(
      (item) => item.ten_xet_nghiem === selectedTestName
    );

    if (existingTestIndex !== -1) {
      return; // Nếu xét nghiệm đã tồn tại, không làm gì cả
    }

    const newTestInfo = {
      ...selectedTestInfo,
      so_luong: 1, // Số lượng mặc định là 1
    };
    setSelectedTests([...selectedTests, newTestInfo]);

    setSelectedTestName(""); // Reset giá trị cho việc chọn xét nghiệm tiếp theo
  };

  const handleRemoveTest = (index) => {
    const updatedTests = [...selectedTests];
    updatedTests.splice(index, 1);
    setSelectedTests(updatedTests);
  };

  const calculateTotalCost = () => {
    let totalCost = 0;

    // Calculate total cost for medicines
    for (const medicine of selectedMedicines) {
      totalCost += medicine.don_gia * medicine.so_luong * 1000;
    }

    // Calculate total cost for tests
    for (const test of selectedTests) {
      totalCost += test.gia_tien * test.so_luong;
    }
    // Set the total cost to formData
    setFormData({ ...formData, tong_tien: totalCost });
  };

  useEffect(() => {
    calculateTotalCost();
  }, [selectedMedicines, selectedTests]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setShowSuccessMessage(true);
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
            <Label style={{ fontWeight: "bold" }} for="ma_benh_nhan">
              Mã Bệnh nhân
            </Label>
            <Input
              type="number"
              name="ma_benh_nhan"
              id="ma_benh_nhan"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ fontWeight: "bold" }} for="ten_thuoc">
              Thêm Thuốc
            </Label>
            <FormGroup style={{ display: "flex" }}>
              <Input
                type="select"
                name="ten_thuoc"
                id="ten_thuoc"
                onChange={handleMedicineChange}
                value={selectedMedicineName}
              >
                <option value="">Chọn thuốc</option>
                {medicine.map((item) => (
                  <option key={item.id} value={item.ten_thuoc}>
                    {item.ten_thuoc}
                  </option>
                ))}
              </Input>
              <Input
                type="number"
                name="so_luong"
                id="so_luong"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <Button color="primary" onClick={handleAddMedicine}>
                OK
              </Button>
            </FormGroup>
          </FormGroup>

          {/* Table hiển thị thông tin các thuốc đã chọn */}
          <table style={{ borderSpacing: "20px" }}>
            <tbody>
              {selectedMedicines.map((medicine, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: "bold" }}>{medicine.ten_thuoc}</td>
                  <td>Đơn giá: {medicine.don_gia * 1000}</td>
                  <td>Số lượng: {medicine.so_luong}</td>
                  <td>
                    <Button onClick={() => removeSelectedMedicine(index)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <FormGroup>
            <Label style={{ fontWeight: "bold" }} for="xet_nghiem">
              Thêm Xét Nghiệm
            </Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                type="select"
                name="xet_nghiem"
                id="xet_nghiem"
                onChange={handleTestChange}
              >
                <option value="">Chọn loại xét nghiệm</option>
                {testData.map((item) => (
                  <option key={item.id} value={item.ten_xet_nghiem}>
                    {item.ten_xet_nghiem}
                  </option>
                ))}
              </Input>
              <Button
                color="primary"
                onClick={handleAddTest}
                style={{ marginLeft: "10px" }}
              >
                OK
              </Button>
            </div>
          </FormGroup>
          <table style={{ borderSpacing: "20px" }}>
            <tbody>
              {selectedTests.map((test, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: "bold" }}>{test.ten_xet_nghiem}</td>
                  <td>Đơn giá: {test.gia_tien}</td>
                  <td>
                    <Button onClick={() => handleRemoveTest(index)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <FormGroup>
            <Label style={{ fontWeight: "bold" }} for="thoi_gian_tao">
              Thời gian tạo
            </Label>
            <Input
              type="datetime-local"
              name="thoi_gian_tao"
              id="thoi_gian_tao"
              defaultValue={formData.thoi_gian_tao}
              onChange={handleChange}
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
              value={formData.tong_tien}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ fontWeight: "bold" }} for="phuong_thuc_thanh_toan">
              Phương Thức thanh toán
            </Label>
            <Input
              type="text"
              name="phuong_thuc_thanh_toan"
              id="phuong_thuc_thanh_toan"
              onChange={handleChange}
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
              value={formatDate(formData.ngay_kham)}
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
              value={formData.gio_kham}
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
            Hóa đơn đã được tạo thành công!
          </div>
        )}
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
