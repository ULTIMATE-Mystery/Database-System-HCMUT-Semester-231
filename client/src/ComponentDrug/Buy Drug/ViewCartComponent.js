import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import { Redirect, Switch } from 'react-router-dom';
import HeaderDefine from '../../5.Share Component/Context'; 

class ViewCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: JSON.parse(localStorage.getItem('IS_cart')) === null ? [] : JSON.parse(localStorage.getItem('IS_cart'))
        }
        this.deleteDrug = this.deleteDrug.bind(this);
    }

    deleteDrug(item) {
        const index = this.state.cart.indexOf(item);
        const newCart = this.state.cart.filter(drug => { return this.state.cart.indexOf(drug) !== index })
        localStorage.setItem('IS_cart', JSON.stringify(newCart))
        this.setState({cart: newCart});
    }

    render() {
        let total = 0;
        console.log(this.state.cart);

        // if (this.state.cart === null) this.setState({ cart: [] });
        // console.log(cart)

        for (let i = 0; i < this.state.cart.length; i++) {
            total += (this.state.cart[i].number) * (this.state.cart[i].item.price);
        }
        localStorage.setItem('IS_total_cart', total.toString())
        
        const empty = <Col style={{textAlign: 'center', fontSize: '20px', marginBottom: '20px'}}> Giỏ hàng trống ! </Col>
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
        if (this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
            <Container>
                <Row>
                    <Col>
                        <LinkContainer to="/buydrug">
                        <Button className="back-button-2"> <FaAngleLeft /> </Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md="12" className="cart-header"> Giỏ hàng của tôi </Col>
                </Row>
                <Row>
                    {this.state.cart.length === 0 && empty}
                    {list}
                </Row>
                <Row>
                    {this.state.cart.length !== 0 &&
                    <Col md="12">
                        <LinkContainer to='/payment'>

                            <Button className="cart-button">
                                <span style={{ marginTop: '100px' }}> Thanh toán </span>
                                <div className="cart-total" style={{marginTop: '-2px'}}> {(total).toLocaleString('vi-VN')}đ </div>
                            </Button>

                        </LinkContainer>
                    </Col>}
                </Row>
            </Container>
            </>
        )
    }
}

ViewCart.contextType = HeaderDefine;
export default ViewCart;