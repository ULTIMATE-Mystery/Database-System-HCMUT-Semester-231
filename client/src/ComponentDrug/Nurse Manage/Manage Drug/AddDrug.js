import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './managedrug.css';
import { Switch, Redirect } from 'react-router';
import HeaderDefine from '../../../5.Share Component/Context';

import axios from 'axios';

class AddDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.check_input = this.check_input.bind(this);
        this.onToggleModal = this.onToggleModal.bind(this);
        this.add_drugs = this.add_drugs.bind(this);
    }

    add_drugs() {
        const drug = {
            drug_name: this.drug_name.value,
            unit: this.unit.value,
            remain: this.quantity.value,
            price: this.price.value
        }
        axios.post('/api/insert/drug', drug)
            .then().catch(error => console.log(error));
        this.props.getDrugs();
    }

    onToggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    check_input() {
        const name = this.props.drugs.map(drug => {return drug.drug_name;})
        if (name.includes(this.drug_name.value)) alert('Tên thuốc đã tồn tại');
        else if (this.drug_name.value === "") alert('Không được bỏ trống tên');
        else if (this.unit.value === "") alert('Không được bỏ trống đơn vị')
        else if (this.price.value === "") alert('Không được bỏ trống đơn giá');
        else if (!/^-?\d+$/.test(this.price.value)
            || parseInt(this.price.value) <= 0) alert('Vui lòng nhập đơn giá là số nguyên lớn hơn 0');
        else if (!/^-?\d+$/.test(this.quantity.value)
            || parseInt(this.quantity.value) <= 0) alert('Vui lòng nhập số lượng là số nguyên lớn hơn 0')
        else if (this.quantity.value === "") alert('Không được bỏ trống số lượng');
        else this.onToggleModal();
    }

    render() {
        if (this.context.role !== "Nurse") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <Container>
                    <Row className="manage-drug-heading">
                        <Col md="12" style={{textAlign: 'center'}} 
                            className='manage-drug-header'> 
                            Nhập thông tin sản phẩm thuốc 
                        </Col>
                        <Col> 
                        <Row>
                        </Row>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                    <Form>
                        <FormGroup>
                            <Label>
                                Tên thuốc
                            </Label>
                            <Input  placeholder="Nhập tên thuốc"
                                    innerRef={(input) => this.drug_name = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Đơn vị </Label>
                            <Input placeholder="Nhập đơn vị" 
                                    innerRef={(input) => this.unit = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Đơn giá </Label>
                            <Input placeholder="Nhập đơn giá" 
                                    innerRef={(input) => this.price = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Số lượng </Label>
                            <Input placeholder="Nhập số lượng" type="number"
                                    innerRef={(input) => this.quantity = input}/>
                        </FormGroup>
                        </Form>
                    </Col>
                    </Row>
                    <Row>
                        <Col >    
                            <Button style={{float: 'center', height: '35px', marginTop: '5px'}}
                                    className="manage-drug-button" onClick={this.check_input}>
                                Thêm
                            </Button>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.onToggleModal} centered>
                        <ModalHeader>
                        Bạn có chắc chắn không ?
                        </ModalHeader>
                        <ModalBody>
                            <Container>
                            <Row>
                                <Col>
                                <Button className="search-drug-button" 
                                        onClick={() => {
                                                        alert('Thành công');
                                                        this.onToggleModal(); 
                                                        this.add_drugs();
                                                        }}>
                                            Có
                                </Button>
                                </Col>
                                <Col>
                                <Button className="search-drug-button" 
                                        onClick={this.onToggleModal}>
                                            Không
                                </Button>
                                </Col>
                            </Row>
                            </Container>
                        </ModalBody>
                    </Modal>
            </Container> 
        )
    }
}

AddDrug.contextType = HeaderDefine;
export default AddDrug;