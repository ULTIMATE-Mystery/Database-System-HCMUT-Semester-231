import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Input, Label, Form, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderDefine from '../../5.Share Component/Context';
import {Switch, Redirect} from 'react-router-dom';

class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payment: ''
        }
        this.onSubmitPayment = this.onSubmitPayment.bind(this);
        // this.handleZalopayChange = this.handleZalopayChange.bind(this);
        // this.handleMoMo1change = this.handleMoMo1change.bind(this);
        // this.handleMoMo2change = this.handleMoMo2change.bind(this);
    }

    // handleZalopayChange() {
    //     this.setState({ zalopay: true, momo_personal: false, momo_bussiness: false })
    // }

    // handleMoMo1change() {
    //     this.setState({ zalopay: false, momo_personal: true, momo_bussiness: false })
    // }

    // handleMoMo2change() {
    //     this.setState({ zalopay: false, momo_personal: false, momo_bussiness: true})
    // }

    onSubmitPayment() {
        console.log(this.state.payment);
        if (this.state.payment === "")
            alert("Vui lòng chọn hình thức thanh toán");
        else {
            const cart = JSON.parse(localStorage.getItem('IS_cart'))
            const phone = this.context.phone;

            console.log(phone);
            console.log(cart);

            axios.post('/api/insert/medicine', { phone: phone, cart: JSON.stringify(cart) }).catch(error => console.log(error))

            if (this.state.payment === "momo_1") {
                console.log("momo_1")
                window.location.href = '/payment_momo'
            }
            else if (this.state.payment === "momo_2")
                axios.post('/payment_momo', { total: localStorage.getItem('IS_total_cart') })
                .then(res => { 
                    console.log("momo_2")
                    localStorage.removeItem('IS_cart');
                    localStorage.removeItem('IS_total_cart');
                    window.location.href=res.data.payUrl
                });
            else axios.post('/payment_zalopay', { total: localStorage.getItem('IS_total_cart') })
            .then(res => { 
                console.log("zalopay")
                localStorage.removeItem('IS_cart');
                localStorage.removeItem('IS_total_cart');
                window.location.href=res.data.orderurl
            });
        }
    }

    render() {
        if (this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role.toString()}`} /> </Switch>
        return <Container>
            <Row>
                <Col className="cart-header"> Vui lòng chọn hình thức thanh toán </Col>
            </Row>
            <Row style={{ marginTop: '26px' }}>
                <Col md={{ size: 4, offset: 4 }} style={{ border: '1px solid', borderRadius: '10px' }}>
                    <Form>
                        <FormGroup tag="fieldset">
                            <FormGroup check style={{ marginBottom: '20px', marginTop: '20px' }}>
                                <Input
                                    name="radio1"
                                    type="radio" onChange={() => {this.setState({payment: 'zalo_pay'})}}
                                    style={{ marginTop: '15px' }} required
                                />
                                {' '}
                                <Label check>
                                    <img src="/assets/images/zalopay_1.png" alt="Zalo Pay" height="50px" width="50px" />
                                    &nbsp; Ví điện tử ZaloPay
                                </Label>
                            </FormGroup>
                            <FormGroup check style={{ marginBottom: '20px', marginTop: '20px' }}>
                                <Input
                                    name="radio1"
                                    type="radio" onChange={() => {this.setState({payment: 'momo_1'})}}
                                    style={{ marginTop: '18px', marginBottom: '20px' }}
                                />
                                {' '}
                                <Label check>
                                    <img src="/assets/images/MoMo.png" alt="MoMo" height="50px" width="50px" />
                                    &nbsp; Ví điện tử MoMo (Cá nhân)
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    name="radio1"
                                    type="radio" onChange={() => {this.setState({payment: 'momo_2'})}}
                                    style={{ marginTop: '18px', marginBottom: '20px' }}
                                />
                                {' '}
                                <Label check>
                                    <img src="/assets/images/MoMo.png" alt="MoMo" height="50px" width="50px" />
                                    &nbsp; Ví điện tử MoMo (Doanh nghiệp)
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row style={{ marginTop: '50px', marginBottom: '50px' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Button onClick={this.onSubmitPayment}
                        style={{ backgroundColor: '#62AFFC', marginBottom: '10px', border: '0px' }}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    }
}

Payment.contextType = HeaderDefine;
export default Payment;