import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import {
    Navbar, Nav, NavItem,
    Collapse
} from 'reactstrap';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Modal, ModalBody } from 'reactstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { NavLink, Switch, Redirect } from 'react-router-dom';
import HeaderDefine from '../../5.Share Component/Context';

class Prescribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatment_id: this.props.treatment_id,
            drugs: [],
            nums_item_buy: 0,
            cart: [],
            drugs_display: [],
            item_open: [],
            nums_item_open: 0,
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.setItemModal = this.setItemModal.bind(this);
        this.addItem = this.addItem.bind(this);
        this.adjustItem = this.adjustItem.bind(this);
        this.addDrug = this.addDrug.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    addItem() {
        if (this.state.nums_item_open >= this.state.item_open.remain)
            alert("Không đủ số lượng");
        else this.setState({
            nums_item_open: this.state.nums_item_open + 1
        })
    }

    adjustItem() {
        if (this.state.nums_item_open === 0)
            alert("Số lượng sản phẩm phải lớn hơn 0");
        else this.setState({
            nums_item_open: this.state.nums_item_open - 1
        })
    }

    addDrug() {
        const newCart = this.state.cart;
        const item = this.state.item_open;
        const number = this.state.nums_item_open;

        // console.log(newCart)
        // console.log(typeof(newCart))
        newCart.push({ item, number });

        localStorage.setItem('IS_prescribe', JSON.stringify(newCart))

        this.setState({
            carts: newCart,
            nums_item_buy: this.state.nums_item_buy + 1
        })
    }

    setItemModal(item, e) {
        this.setState({
            item_open: item,
            nums_item_open: 1
        });
    }

    handleSubmit() {
        const search = this.state.drugs.filter(drug => {
            return drug.drug_name.toLowerCase().replace(/\s/g, '').includes(this.search_item.value.toLowerCase().replace(/\s/g, ''));
        })
        this.setState({ drugs_display: search });
    }

    componentDidMount() {
        const cart = localStorage.getItem('IS_prescribe');

        if (cart !== null) {
            this.setState({ cart: JSON.parse(cart) })
            this.setState({ nums_item_buy: JSON.parse(cart).length })
        }

        axios.get('/api/get/drugs')
            .then(res => {
                const drugs = res.data;
                this.setState({
                    drugs: drugs.drugs,
                    drugs_display: drugs.drugs,
                    item_open: drugs.drugs[0]
                });
            })
            .catch(error => console.log(error));
    };

    render() {
        const not_Found = () => {
            if (this.state.drugs_display.length === 0)
                return (
                    <Col md="12">
                        <div className="not-found"> Không tìm thấy kết quả</div>
                    </Col>
                );
        }
        const drug_list = this.state.drugs_display.map(drug => {
            const price = drug.price;
            return (
                <Col lg="2" md="3" sm="4">
                    <Card className="drug-item">
                        <img className="drug-img" width="91.98px" height="90px" src="/assets/images/drug_example.png" alt="Xem hồ sơ bệnh án"></img>
                        <CardBody>
                            <CardTitle tag="h5" className="drug-text">{drug.drug_name}</CardTitle>
                            <CardSubtitle tag="h6" className="drug-title">{drug.unit}</CardSubtitle>
                            <CardText className="drug-price-add">
                                <span className="drug-price"> {price.toLocaleString('vi-VN')}đ </span>
                                <span className="drug-add-item">
                                    <img className="drug-add-item-img"
                                        onClick={(e) => { this.toggleModal(); this.setItemModal(drug, e) }}
                                        width="35px" height="35px" src="/assets/images/add-item.png" alt="Add Item" />
                                </span>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            )
        });
        if (this.context.role !== "Doctor")
            return <Switch> <Redirect to={`/${this.context.role.toString()}`} /> </Switch>
        console.log(this.state);
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <Collapse navbar>
                            <Nav navbar>
                                <NavItem>
                                    <img src='/assets/images/category.png' width="40px" height="40px" alt="Danh mục"></img>
                                </NavItem>
                                <NavItem className="search">
                                    <p className="search-1"> Danh Mục </p>
                                    <p className="search-2"> Sản Phẩm </p>
                                </NavItem>
                                <NavItem>
                                    <img className="show-category" src='/assets/images/arrow.png' width="17px" height="17px" alt="Chọn"></img>
                                </NavItem>
                                <NavItem>
                                    <Form className="search-bar-cat" onSubmit={e => { e.preventDefault(); }}>
                                        <FormGroup>
                                            <Input id="search" name="search-drugs" placeholder="Tìm sản phẩm thuốc mong muốn"
                                                innerRef={(input) => this.search_item = input} />
                                        </FormGroup>
                                    </Form>
                                </NavItem>
                                <NavItem className="search-button-cat">
                                    <Button color="primary" onClick={this.handleSubmit}>
                                        <FaSearch /> Tìm kiếm
                                    </Button>
                                </NavItem>
                            </Nav>

                            <Nav className="ms-auto" navbar style={{ marginTop: '-15px' }}>
                                <NavItem className="cart">
                                    <NavLink className="nav-link" to={`/view_prescribe/${this.state.treatment_id}`}>
                                        <FaShoppingCart className="buy-cart" />
                                        <span> Đơn thuốc </span>
                                        <span className="buy-cart-item"> {this.state.nums_item_buy} </span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Container>
                    <Row>
                        {drug_list}
                        {not_Found()}
                    </Row>
                </Container>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalBody>
                        <Card className="modal-drug-item">
                            <img className="modal-drug-img" width="283px" height="283px" src="/assets/images/drug_example.png" alt="Ảnh thuốc"></img>
                            <CardBody>
                                <CardTitle tag="h5" className="modal-drug-text">{this.state.item_open.drug_name}</CardTitle>
                                <CardSubtitle tag="h6" className="modal-drug-title">{this.state.item_open.unit}</CardSubtitle>
                                <CardText className="modal-item-content">
                                    <div className="modal-adjust-item"> <img onClick={() => this.adjustItem()} width="17px" height="2.76px" src="/assets/images/adjust_item.png" alt="Adjust" /> </div>
                                    <div className="modal-number-item"> {this.state.nums_item_open} </div>
                                    <div className="modal-add-item"> <img onClick={() => this.addItem()} width="17px" height="16.56px" src="/assets/images/add_item.png" alt="Add" /> </div>
                                    <div className="modal-drug-price"> {(this.state.item_open.price * this.state.nums_item_open).toLocaleString('vi-VN')}đ </div>
                                </CardText>
                            </CardBody>
                        </Card>
                        <Button onClick={() => { this.toggleModal(); this.addDrug() }} className="modal-add-button"> Thêm vào giỏ hàng </Button>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

Prescribe.contextType = HeaderDefine;
export default Prescribe;
