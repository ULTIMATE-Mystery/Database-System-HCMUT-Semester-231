import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import { Redirect, Switch } from 'react-router-dom';
import HeaderDefine from '../../5.Share Component/Context'; 
import axios from 'axios';

class ViewPrescribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatment_id: this.props.treatment_id,
            cart: JSON.parse(localStorage.getItem('IS_prescribe')) === null ? [] : JSON.parse(localStorage.getItem('IS_prescribe'))
        }
        this.deleteDrug = this.deleteDrug.bind(this);
        this.onPrescribe = this.onPrescribe.bind(this);
    }

    onPrescribe() {
        axios.post('/api/insert/prescribe_medicine', {treatment_id: this.state.treatment_id, cart: this.state.cart})
        localStorage.removeItem('IS_prescribe');
        alert('Thêm đơn thuốc thành công')
    }

    deleteDrug(item) {
        const index = this.state.cart.indexOf(item);
        const newCart = this.state.cart.filter(drug => { return this.state.cart.indexOf(drug) !== index })
        localStorage.setItem('IS_prescribe', JSON.stringify(newCart))
        this.setState({cart: newCart});
    }

    render() {
        console.log(this.state);
        let total = 0;
        console.log(this.state.cart);

        // if (this.state.cart === null) this.setState({ cart: [] });
        // console.log(cart)

        for (let i = 0; i < this.state.cart.length; i++) {
            total += (this.state.cart[i].number) * (this.state.cart[i].item.price);
        }
        
        const empty = <Col style={{textAlign: 'center', fontSize: '20px', marginBottom: '20px'}}> Đơn thuốc trống ! </Col>
        const list = this.state.cart.map(item => {
            return (
                <Col className="cart-item" md="12">
                    <div style={{ float: 'right', cursor: 'pointer' }}>
                        <button style={{ backgroundColor: '#F6F8FB', border: '0px' }}
                            onClick={() => this.deleteDrug(item)}>
                            x </button>
                    </div>
                    <img className="cart-item-img" width="150px" height="150px" src="/assets/images/drug_example.png" alt="Ảnh thuốc"></img>
                    <div className="cart-item-name"> {item.item.drug_name}  </div>
                    <div className="cart-item-content"> {item.item.unit} </div>

                    <div className="cart-item-number"> {item.number} x {(item.item.price).toLocaleString('vi-VN')}đ</div>

                    <div className="cart-item-price"> {(item.item.price * item.number).toLocaleString('vi-VN')}đ </div>

                </Col>
            );
        })
        if (this.context.role !== "Doctor") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
            <Container>
                <Row>
                    <Col>
                        <LinkContainer to={`/prescribe/${this.state.treatment_id}`}>
                        <Button className="back-button-2"> <FaAngleLeft /> </Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md="12" className="cart-header"> Đơn thuốc </Col>
                </Row>
                <Row>
                    {this.state.cart.length === 0 && empty}
                    {list}
                </Row>
                <Row>
                    {this.state.cart.length !== 0 &&
                    <Col md="12">
                        <LinkContainer to='/view_medical_record' style={{backgroundColor: '#62AFFC'}}>
                            <Button className="cart-button" onClick={this.onPrescribe}>
                                <span style={{ marginTop: '20px' }}> Kê đơn </span>
                                <div className="cart-total" style={{marginTop: '-3px'}}> {(total).toLocaleString('vi-VN')}đ </div>
                            </Button>

                        </LinkContainer>
                    </Col>}
                </Row>
            </Container>
            </>
        )
    }
}

ViewPrescribe.contextType = HeaderDefine;
export default ViewPrescribe;