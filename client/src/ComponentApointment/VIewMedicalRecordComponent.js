import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Row, Col, Table, Button, Input } from 'reactstrap';
import axios from 'axios';
import ToastService from 'react-material-toast';
import { Switch, Redirect } from 'react-router';
import DoctorSideBar from '../5.Share Component/SideBar/DoctorSideBarComponent';

const toast = ToastService.new({
  place: 'bottomLeft',
  duration: 2,
  maxCount: 8
});

const styles = {
  container: {
    backgroundColor: '#f8f9fa', // Màu nền nhẹ cho container
  },
  formGroup: {
    margin: '10px 0',
  },
  input: {
    height: '40px',
    borderColor: '#ced4da',
    margin: '10px 0',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // This will center the button horizontally
    alignItems: 'center', // This will center the button vertically
    // Rest of your styles for the button container
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '6px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0',
  },

  tableContainer: {
    display: 'flex',
    justifyContent: 'center', // This will center the button horizontally
    alignItems: 'center', // This will center the button vertically
  },
  table: {
    width: '95%',
    marginTop: '10px',
    marginBottom: '10px', // Adds some space below the table
  },

  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    margin: '20px 0',
  }
};

class MedicalRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: 943693315,
      show: true,
      system_user: [],
      system_users: [],
      showtable: false,
      n: 0,
      x: '',
      doctors: [],
      error: ''
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/get/system_users')
      .then(res => {
        const system_users = res.data;
        this.setState({ system_users: system_users.system_users });
      })
      .catch(error => console.log(error));
  };

  showModal() {
    this.setState({ showtable: true, show: false });
  };

  hideModal() {
    this.setState({ showtable: false, show: true });
  };

  handleChangePhone(event) {
    this.setState({ phone: event.target.value });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { n, x } = this.state;
    // Ensure both n and x have been provided
    if (!n || !x) {
      this.setState({ error: 'Xin hãy nhập đủ thông tin' });
      return; // Early return if the validation fails
    }
    axios.get('/doctors', { params: { n, x } })
      .then(response => {
        if (response.data.data.length > 0) {
          this.setState({ doctors: response.data.data, error: '' });
        } else {
          this.setState({ error: 'Không có thông tin phù hợp với yêu cầu' });
        }
      })
      .catch(error => {
        console.log("Lỗi khi gọi API:", error);
        this.setState({ error: 'Lỗi khi gọi API' });
      });
  }

  render() {
    const { doctors, error } = this.state;
    return (
      <>
        <DoctorSideBar />
        <Container style={styles.container}>
          <Row style={{ textAlign: 'center' }}>
            <Col>
              <h2>Tra cứu</h2>
              <hr />
            </Col>
          </Row>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup style={styles.formGroup}>
                  <Label for="numberOfAppointments">Số lượng tối thiểu ca khám mà các bác sĩ đã hoàn thành</Label>
                  <Input
                    style={styles.input}
                    type="number"
                    name="n"
                    id="numberOfAppointments"
                    placeholder="Nhập số lượng"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup style={styles.formGroup}>
                  <Label for="date">Trong ngày</Label>
                  <Input
                    style={styles.input}
                    type="date"
                    name="x"
                    id="date"
                    placeholder="Ngày cần tra cứu"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div style={styles.buttonContainer}>
                  <Button style={styles.button} onClick={this.handleSubmit}>Tra cứu</Button>
            </div>
          </Form>
          {error && <p style={styles.errorText}>{error}</p>}
          <div style={styles.tableContainer}>
          <Table striped style={styles.table}>
            <thead>
              <tr>
                <th>Mã bác sĩ</th>
                <th>Số lượng cuộc hẹn</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.ma_bac_si}>
                  <td>{doctor.ma_bac_si}</td>
                  <td>{doctor.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </Container>
      </>
    );
  }
}

export default MedicalRecord;