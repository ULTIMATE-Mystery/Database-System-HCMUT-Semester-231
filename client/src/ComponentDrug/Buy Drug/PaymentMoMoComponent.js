import axios from 'axios';
import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router';
import { Container, Row, Col, Button } from 'reactstrap';
import HeaderDefine from '../../5.Share Component/Context';

class PaymentMoMo extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        localStorage.removeItem('IS_cart');
        localStorage.removeItem('IS_total_cart');
        alert("Thanh toán thành công !")
        window.location.href = '/';
    }
    render() {
        // console.log(this.context.role)
        // if (this.context.role !== "Patient") return <Switch><Redirect to="/"/></Switch>
        return <Container>
            <Row>
                <Col md="12" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginBottom: '19px' }}> THANH TOÁN MOMO </Col></Row>
            <Row>
                <Col md="12" style={{ textAlign: 'center' }}>
                    <img width="300px" height="300px"
                        src={`https://momosv3.apimienphi.com/api/QRCode?phone=0971083236&amount=
                            ${parseInt(localStorage.getItem('IS_total_cart'))}
                            & note=${parseInt(localStorage.getItem('IS_total_cart')).toLocaleString('vi-VN')}đ`}></img>
                </Col>
            </Row>
            <Row style={{ textAlign: 'center' }}>
                <Col>
                    <Button onClick={this.onSubmit}
                        style={{
                            backgroundColor: '#62AFFC',
                            marginTop: '25px',
                            border: '0px',
                            marginBottom: '25px'
                        }}>
                        Đã thanh toán </Button>
                </Col>
            </Row>
        </Container>
    }
}

PaymentMoMo.contextType = HeaderDefine
export default PaymentMoMo