import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import NurseSideBar from '../../../5.Share Component/SideBar/NurseSideBarComponent';
import { Spinner } from 'reactstrap';
import { FaAngleLeft } from 'react-icons/fa'
import './manage_order.css';
import { Switch, Redirect } from 'react-router';

import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import HeaderDefine from '../../../5.Share Component/Context';

class ViewOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsOpen: [],
            orderOpen: { id: "", fullname: "", dateofbirth: "", address: "", phone: "" }
        }
    }

    componentDidMount() {
        const orderID = this.props.orderID;
        axios.get('/api/get/order_details', { params: { orderID: orderID } })
            .then(res => {
                const order_details = res.data.order_details;
                this.setState({ orderDetailsOpen: order_details });
            })
            .catch(error => console.log(error));

        axios.get('/api/get/order_in_view', { params: { orderID: orderID } })
            .then(res => {
                const information = res.data.information;
                this.setState({ orderOpen: information[0] });
                console.log(this.state.orderOpen);
            })
            .catch(error => console.log(error));
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
                <div ref={(el) => { this.componentRef = el }}>
                    <Container className="order-inform">
                        <Row style={{ paddingTop: '10px' }}>
                            <Col> <img className="logo-print" src="/assets/images/Logo.png" height="50px" width="50px" alt="Logo"></img>
                                <span > HealthCare </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" style={{ textAlign: 'right' }}>
                                Mã đơn thuốc: {this.state.orderOpen.id}
                            </Col>
                        </Row>
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
                    </Container>
                    <Container>
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
                    </Container>
                </div>
                <Container style={{ marginBottom: '20px' }}>
                    <Row>
                        <Col md="12">
                            <ReactToPrint
                                trigger={() => <Button className="print-bill-button"> In hóa đơn </Button>}
                                content={() => this.componentRef}
                                pageStyle={pageStyle} />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
ViewOrderDetail.contextType = HeaderDefine
export default ViewOrderDetail;