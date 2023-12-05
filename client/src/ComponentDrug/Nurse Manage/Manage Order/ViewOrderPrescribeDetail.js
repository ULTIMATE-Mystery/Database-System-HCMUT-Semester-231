import React, { Component } from 'react';
import { Container, Row, Col, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import NurseSideBar from '../../../5.Share Component/SideBar/NurseSideBarComponent';
import { Spinner } from 'reactstrap';
import { FaAngleLeft } from 'react-icons/fa'
import './manage_order.css';
import { Switch, Redirect } from 'react-router';
import ToastServive from 'react-material-toast';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import HeaderDefine from '../../../5.Share Component/Context';

const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});

class ViewOrderPrescribeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsOpen: [],
            orderOpen: { id: "", fullname: "", dateofbirth: "", address: "", phone: "" },
            payment: [],
            nurse: "",
            is_open: false
        }
        this.onSubmitPayment = this.onSubmitPayment.bind(this);
        this.onSubmitPaymentNurse = this.onSubmitPaymentNurse.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState({is_open: !this.state.is_open});
    }

    onSubmitPayment(total) {
        axios.post('/api/insert/momo_payment', { medicine_id: this.state.orderOpen.prescribe_id })
        axios.post('/payment_momo', { total: total.toString() })
            .then(res => {
                window.location.href = res.data.payUrl
            });
    }

    async onSubmitPaymentNurse() {
        console.log(this.context.phone)
        axios.post('/api/insert/momo_payment_nurse', { medicine_id: this.state.orderOpen.prescribe_id, phone: this.context.phone })
        toast.success('Thành công');

        const res = await axios.get('/api/get/payment', { params: { medicine_id: this.props.orderID } })

        this.setState({ payment: res.data.payment })

        const res2 = await axios.get('/api/get/info', { params: { phonenum: this.context.phone } })

        console.log(res2)
        this.setState({ nurse: res2.data.user.fullname })
        console.log(this.state.nurse)

    }

    async componentDidMount() {
        const orderID = this.props.orderID;
        axios.get('/api/get/order_details', { params: { orderID: orderID } })
            .then(res => {
                const order_details = res.data.order_details;
                this.setState({ orderDetailsOpen: order_details });
            })
            .catch(error => console.log(error));

        axios.get('/api/get/order_prescribe_in_view', { params: { orderID: orderID } })
            .then(res => {
                const information = res.data.information;
                this.setState({ orderOpen: information[0] });
                console.log(this.state.orderOpen);
            })
            .catch(error => console.log(error));

        const res = await axios.get('/api/get/payment', { params: { medicine_id: orderID } })
        console.log(res);
        this.setState({ payment: res.data.payment })

        console.log(res.data.payment[0])
        if (res.data.payment.length !== 0)
            if (res.data.payment[0].nurse_phone !== null) {
                const res2 = await axios.get('/api/get/info', { params: { phonenum: res.data.payment[0].nurse_phone } })

                console.log(res2)
                this.setState({ nurse: res2.data.user.fullname })
                console.log(this.state.nurse)
            }
    }

    convertDate(day) {
        let date = day.getDate();
        let month = day.getMonth() + 1;
        let year = day.getYear() + 1900;

        if (date < 10) date = "0" + date.toString();
        if (month < 10) month = "0" + month.toString();

        return date + "/" + month + "/" + year;
    }

    countAge(day) {
        let year = day.getYear() + 1900 - parseInt(new Date().getFullYear());
        return (-year)
    }

    render() {
        let total = 0
        const details = this.state.orderDetailsOpen.map(detail => {
            total += detail.price * detail.quantity
            return (
                <tr>
                    <th scope="row" style={{ textAlign: 'center' }}>
                        {this.state.orderDetailsOpen.indexOf(detail) + 1}
                    </th>
                    <td>
                        {detail.drug_name}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        {detail.unit}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        {(detail.price).toLocaleString('vi-VN')}đ
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        {detail.quantity}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                        {(detail.price * detail.quantity).toLocaleString('vi-VN')}đ
                    </td>
                </tr>
            );
        });



        const pageStyle = {};
        // Nurse -> ở, 
        if (this.context.role !== "Nurse" && this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
                {(this.context.role === "Nurse") ? <NurseSideBar /> : <div />}
                <Container>
                    <Row>
                        <Col>
                            <LinkContainer to="/view_order">
                                <Button className="back-button"> <FaAngleLeft /> </Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Container>
                <Container className="order-inform">
                    <Row style={{ paddingTop: '10px' }}>
                        <Col> <img className="logo-print" src="/assets/images/Logo.png" height="50px" width="50px" alt="Logo"></img>
                            <span > HealthCare </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" style={{ textAlign: 'right' }}>
                            Mã đơn thuốc: {this.state.orderOpen.prescribe_id}
                        </Col>
                    </Row>
                    <div ref={(el) => { this.componentRef = el }}>
                        <Row>
                            <Col md="12" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px', margin: '10px 0px 20px 0px' }}>
                                ĐƠN THUỐC
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                Tên bệnh nhân: <span style={{ fontWeight: 'bold' }}>{this.state.orderOpen.fullname}</span>
                            </Col>
                            <Col md="3">
                                Tuổi: {this.countAge(new Date(this.state.orderOpen.dateofbirth))}
                            </Col>
                            <Col md="3" style={{ textAlign: 'right' }}>
                                Giới tính: Nam
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '5px' }}>
                            <Col>
                                Địa chỉ: {this.state.orderOpen.address}
                            </Col>
                        </Row>
                        {this.state.nurse === "" ? <span></span> :
                            <Row style={{ marginTop: '5px' }}>
                                <Col>
                                    Xác nhận thanh toán: {this.state.nurse}
                                </Col>
                            </Row>}
                        <Row style={{ marginTop: '5px', marginBottom: '10px', textAlign: 'right' }}>
                            <Col>
                                {this.state.payment.length !== 0 ? <Badge color="success"> Đã thanh toán </Badge> : <Badge color="danger"> Chưa thanh toán </Badge>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table responsive hover striped bordered>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Tên thuốc
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Đơn vị tính
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Đơn giá
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Số lượng
                                            </th>
                                            <th style={{ textAlign: 'right' }}>
                                                Thành tiền
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(() => { if (this.state.orderDetailsOpen.length === 0) return <Spinner className="detail-spinner"> Loading... </Spinner> })()}
                                        {details}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colSpan="5" style={{ textAlign: 'center' }}>
                                                Tổng cộng
                                            </th>
                                            <th style={{ textAlign: 'right' }}>
                                                {total.toLocaleString('vi-VN')}đ
                                            </th>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md="12">
                            {(() => {
                                if (this.state.payment.length !== 0)
                                    return <ReactToPrint
                                        trigger={() => <Button className="print-bill-button"> In hóa đơn </Button>}
                                        content={() => this.componentRef}
                                        pageStyle={pageStyle} />
                                else if (this.context.role === "Nurse")
                                    return <Button className="print-bill-button" onClick={() => this.handleOpen()}> Xác nhận thanh toán </Button>
                                else
                                    return <Button className="print-bill-button" onClick={() => this.onSubmitPayment(total)}> Thanh toán </Button>
                            })()}

                        </Col>
                    </Row>
                    <Modal isOpen={this.state.is_open} toggle={this.handleOpen} centered>
                        <ModalHeader> Bạn có chắc chắn với lựa chọn của mình ? </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row>
                                    <Col>
                                        <Button onClick={() => { this.onSubmitPaymentNurse(); this.handleOpen() }}
                                            style={{
                                                backgroundColor: '#62AFFC',
                                                border: '0px'
                                            }}>
                                            Có
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => { this.handleOpen();  }}
                                            style={{
                                                backgroundColor: '#62AFFC',
                                                border: '0px'
                                            }}>
                                            Không </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>

                    <Row style={{ padding: '10px 0px 5px 0px', margin: '15px 1px auto auto' }}>
                        <Col style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '25px', fontWeight: 'bold' }}>
                                Thông tin lượt điều trị
                            </span>
                        </Col>
                        <Row style={{ marginBottom: '10px', marginTop: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}>
                                    Mã điều trị:&nbsp;
                                </span>
                                {this.state.orderOpen.id}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Bác sĩ khám bệnh: </span> {this.state.orderOpen.doctor_name}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col >
                                <span style={{ fontWeight: 'bold' }}> Bệnh nhân: </span> {this.state.orderOpen.fullname}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Ngày sinh: </span> {this.state.orderOpen.dateofbirth}
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}>Vấn đề sức khỏe: </span> {this.state.orderOpen.health_issue}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Huyết áp: </span> {this.state.orderOpen.blood_pressure}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Nhịp tim: </span> {this.state.orderOpen.heart_beat}

                                {/* <Input defaultValue={this.state.treatment_curr.diagnose} onChange={(e) => { this.state.treatment_curr.diagnose = e.target.value }} placeholder="Chẩn đoán" />
                                <Input defaultValue={this.state.treatment_curr.therapy} onChange={(e) => { this.state.treatment_curr.therapy = e.target.value }} placeholder="Điều trị" /> */}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Chẩn đoán: </span>{this.state.orderOpen.diagnose}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Phương pháp điều trị: </span>{this.state.orderOpen.therapy}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Lịch hẹn: </span> {this.state.orderOpen.turn_time}
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Thời điểm bắt đầu: </span>{this.state.orderOpen.start_time}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}>Thời điểm kết thúc: </span>{this.state.orderOpen.end_time}
                            </Col>
                        </Row>
                    </Row>

                </Container>
            </>
        )
    }
}
ViewOrderPrescribeDetail.contextType = HeaderDefine
export default ViewOrderPrescribeDetail;