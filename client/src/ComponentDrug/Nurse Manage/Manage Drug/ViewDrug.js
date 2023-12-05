import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { Switch, Redirect } from 'react-router';

import './managedrug.css';
import HeaderDefine from '../../../5.Share Component/Context';

class ViewDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModelOpen: false,
            isAgreeModelOpen: false
        }
        this.onInputDrugName = this.onInputDrugName.bind(this);
        this.onToggleModel = this.onToggleModel.bind(this);
        this.onToggleAgreeModel = this.onToggleAgreeModel.bind(this);
        this.add_num_drugs = this.add_num_drugs.bind(this);
        this.check_quantity = this.check_quantity.bind(this);
    }

    onToggleAgreeModel() {
        this.setState({isAgreeModelOpen: !this.state.isAgreeModelOpen})
    }

    onToggleModel(drug, flag) {
        if (flag === true) this.props.changeDrugOpen(drug);
        this.setState({
            isModelOpen: !this.state.isModelOpen});
    }

    check_quantity() {
        if (this.drugs_quantity.value <= 0) {
            alert('Vui lòng nhập số lớn hơn 0');
            return false;
        }
        return true;
    }

    add_num_drugs() {
        const item = {
        drug: this.props.drug_open,
        quantity: parseInt(this.drugs_quantity.value) + parseInt(this.props.drug_open.remain)
        }
        console.log(item);
        axios.post('/api/update/drug_quantity', item)
            .then().catch(error => console.log(error));
        this.props.getDrugs();
        
    }
    
    onInputDrugName() {
        const search_name = this.search_item.value;
        const display = this.props.drugs.filter(drug => {
            return drug.drug_name.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
            .replace(/Đ/g, 'D').toLowerCase()
            .includes(search_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase());
        })
        this.props.changeDisplayDrug(display);
    }

    render() {
        const display_drugs = this.props.display_drugs.map((drug) => {
            return (
                <tr>
                <th scope="row">
                    {this.props.display_drugs.indexOf(drug) + 1}
                </th>
                <td>
                    {drug.drug_name}
                </td>
                <td style={{textAlign: 'center'}}>
                    {drug.unit}
                </td>
                <td style={{textAlign: 'center'}}>
                    {drug.price.toLocaleString('vi-VN')}đ
                </td>
                <td style={{textAlign: 'center'}}>
                    {drug.remain}
                </td>
                <td style={{textAlign: 'center'}}>
                    <Button className='manage-drug-button' onClick={() => {this.onToggleModel(drug, true)}}> 
                            Nhập hàng
                    </Button>
                </td>
                </tr>
        )}); 

        let not_Found = <span></span>;
        if (display_drugs.length === 0) not_Found = <div className="not-found-search"> Không tìm thấy kết quả </div>
        else not_Found = <span></span>;
        
        if (this.context.role !== "Nurse") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <Container>
                    <Row className="manage-drug-heading">
                        <Col className='manage-drug-header'> Danh sách sản phẩm thuốc </Col>
                        <Col>
                            <Row>
                                <Form className="search-drug1-bar" 
                                    onSubmit={e => {e.preventDefault(); this.onInputDrugName();}}
                                    autocomplete="off">
                                    <FormGroup>
                                        <Input className="search-box" id="search" name="search-drugs" placeholder="Nhập tên thuốc"
                                        innerRef={(input) => this.search_item = input} style={{height: '37.5px', width: '190px', marginTop: '1px'}}/>
                                    </FormGroup>
                                </Form> 
                                <Button className="search-drug-button" onClick={this.onInputDrugName}>
                                    <FaSearch /> Tìm <span style={{textTransform: 'lowercase'}}> kiếm </span>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {not_Found}
                            <Table responsive hover striped>
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Tên thuốc
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Đơn vị
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Đơn giá
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Số lượng còn lại
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Hành động
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_drugs}
                            </tbody>
                            </Table>
                            {display_drugs.length === 0 && (() => {return <Spinner className="detail-spinner"> Loading... </Spinner>})()}
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.isModelOpen} toggle={this.onToggleModel} centered>
                        <ModalHeader>
                        {this.props.drug_open.drug_name}
                        </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row>
                                <Form className="search-drug1-bar"  
                                    onSubmit={e => {e.preventDefault(); if (this.check_quantity()) this.onToggleAgreeModel(); }}
                                    autocomplete="off">
                                    <FormGroup>
                                        <Input className="search-box" id="search" name="search-drugs" placeholder="Nhập số lượng"
                                        innerRef={(input) => this.drugs_quantity = input} style={{width: '188px', marginTop: '1px', height: '37.5px'}}/>
                                    </FormGroup>
                                </Form> 
                                <Button className="search-drug-button" onClick={() => {if (this.check_quantity()) this.onToggleAgreeModel(); }}>
                                    <FaSearch /> Nhập <span style={{textTransform: 'lowercase'}}> hàng </span>
                                </Button>
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.isAgreeModelOpen} toggle={this.onToggleAgreeModel} centered>
                        <ModalHeader>
                        Bạn có chắc chắn không ?
                        </ModalHeader>
                        <ModalBody>
                            <Container>
                            <Row>
                                <Col>
                                <Button className="search-drug-button" 
                                        onClick={() => {
                                                        alert('Nhập hàng thành công');
                                                        this.onToggleModel("", false); 
                                                        this.onToggleAgreeModel(); 
                                                        this.add_num_drugs();
                                                        }}>
                                            Có
                                </Button>
                                </Col>
                                <Col>
                                <Button className="search-drug-button" 
                                        onClick={() => {
                                                        alert('Nhập hàng thất bại');
                                                        this.onToggleModel("", false); 
                                                        this.onToggleAgreeModel();
                                                        }}>
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
ViewDrug.contextType = HeaderDefine
export default ViewDrug;