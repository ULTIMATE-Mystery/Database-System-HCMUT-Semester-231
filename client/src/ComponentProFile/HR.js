import React, { Component } from 'react';
import { Container, ModalHeader, Table, } from 'reactstrap';
import axios from 'axios';
import { Modal, Row, Col } from 'reactstrap';
import { Switch, Redirect } from 'react-router-dom';
import HeaderDefine from '../5.Share Component/Context';
import DoctorSideBar from '../5.Share Component/SideBar/DoctorSideBarComponent';
import ToastServive from 'react-material-toast';

import { Input } from 'reactstrap';

const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});
class HR extends Component {
    constructor() {
        super();
        this.state = {
            doctor: [],
            nurse: [],
            newdoc: {},
            newnurse: {},
            modalDoctor: false,
            modalNurse: false,
            phone:"",
            role:"",
            show:false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteModal = this.deleteModal.bind(this);
        this.delete = this.delete.bind(this);
        this.toggleDoctor = this.toggleDoctor.bind(this);
        this.toggleNurse = this.toggleNurse.bind(this);
        // this.showHideClassName=this.showHideClassName.bind(this);
    }
        
    showModal = () => {
        this.setState({ show: true });
    };
    hideModal = () => {
        this.setState({ show: false, deleted: false, });
    };
    deleteModal = () => {
        this.setState({ deleted: true });
    };
    toggleDoctor() {
        this.setState({ modalDoctor: !this.state.modalDoctor })
    }
    toggleNurse() {
        this.setState({ modalNurse: !this.state.modalNurse })
    }
    componentDidMount() {

        axios.get('/api/get/doctors-info')
            .then(res => {
                this.setState({ doctor: res.data.doctors });
                console.log(this.state.doctor);
            })
            .catch(error => console.log(error));

        axios.get('/api/get/nurse-info')
            .then(res => {
                this.setState({ nurse: res.data.nurses });
            })
            .catch(error => console.log(error));
        this.setState({show:false})
    };

    handleInsertSubmit = (event) => {
    };

    setDoctor = async () => {
        const user = await axios.get('/api/get/info', { params: { phonenum: this.state.newdoc.phone } });

        if (user.data.user) {
            toast.error("Đã tồn tại tài khoản")
        }
        else {
            axios.post('/api/new/doctor', { params: this.state.newdoc }).catch(error => console.log(error));

            // var doc=this.state.doctor.push({phone:this.state.newphone, specialism:this.state.newspec,experience_year:this.state.newexp,activate:1});
            this.toggleDoctor();
            toast.success("Thành công");
        }

    }
    setNurse = async () => {
        const user = await axios.get('/api/get/info', { params: { phonenum: this.state.newnurse.phone } });

        if (user.data.user) {
            toast.error("Đã tồn tại tài khoản")
        }
        else {
            this.toggleNurse();
            axios.post('/api/new/nurse', { params: this.state.newnurse }).catch(error => console.log(error));
            toast.success("Thành công");
        }
    }
    subReg = () => {
        const str = this.state.newfirstname;
        this.setState({ newlastname: str.split(' ').slice(0, -1).join(' ') })
        this.setState({ newfirstname: str.split(' ').slice(-1).join(' ') })
    }



    delete = () => {
        axios.post('/api/delete/HR', { params: { phone: this.state.phone, role: this.state.role } }).then(res=>{
            if(res.data.msg){
            toast.success('Xóa thành công', () => {
            });
        if (this.state.role === "DOCTOR") 
            this.setState({doctor: this.state.doctor.map(row => {if (row.phone === this.state.phone) row.activate=0; return row})})
        //this.setState({ doctor: this.state.doctor.filter(row => row.activate === 1) });
        else this.setState({ nurse: this.state.nurse.map(row => {if (row.phone === this.state.phone) row.activate=0; return row})})

        }
            else toast.error('Đã xảy ra lỗi', () => {
            });
        });


    }
    render() {
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
    
        if (this.context.role !== "Doctor") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
                <DoctorSideBar />
                <Container id='dung-appointment'>
                    <Row>
                        <Col class='dung-title' style={{ textAlign: 'center' }}>
                            <h1>Danh sách nhân sự</h1>
                            <hr />
                        </Col>
                    </Row>

                    <Row style={{ textAlign: 'center' }}>
                        <Col class='dung-appointment-table' md="12">
                            <Table Schedule>
                                <thead className="dung-table">
                                    <tr>
                                        <th style={{ textAlign: 'left' }}>
                                            Bác sĩ
                                        </th>
                                        <th style={{ textAlign: 'left' }}>Chuyên ngành
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Kinh nghiệm
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Xóa quyền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dung-table-body">
                                    {this.state.doctor.filter(row => row.activate === 1).map(row => {//console.log(row);
                                        return (
                                            <tr>
                                                <td style={{ textAlign: 'left' }}>
                                                    {row.firstname + " " + row.lastname}
                                                </td>
                                                <td style={{ textAlign: 'left' }}>
                                                    {row.specialism}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {row.experience_year}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <button class='chanh-button-view' type="button"
                                                        style={{ width: '50px', height: '30px' }}
                                                        onClick={(e) => { this.setState({phone:row.phone,role:"DOCTOR",show:true}) }}>X</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md="12">
                            <button class='chanh-button-view' type="button"
                                onClick={this.toggleDoctor}
                                style={{
                                    width: '140px',
                                    height: '40px',
                                    marginTop: '30px',
                                    marginBottom: '30px',
                                    backgroundColor: '#62AFFC',
                                    border: '0px',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                Thêm bác sỹ
                            </button>
                        </Col>

                        <Modal isOpen={this.state.modalDoctor} toggle={(e) => this.toggleDoctor()}>
                            <ModalHeader>Thêm bác sỹ </ModalHeader>
                            <Container>
                                <Row>
                                    <Col md="12">
                                        Họ và tên
                                        <Input name="name" onChange={(e) => { this.state.newdoc.name = e.target.value }} required />
                                    </Col>
                                    <Col md="12">
                                        Số điện thoại
                                        <Input name="phone" onChange={(e) => { this.state.newdoc.phone = e.target.value }} required />
                                    </Col>
                                    <Col md="12">
                                        Chuyên ngành
                                        <Input name="spec" onChange={(e) => { this.state.newdoc.spec = e.target.value }} required />
                                    </Col>
                                    <Col md="12">
                                        Kinh nghiệm
                                        <Input name="exp" type="number" onChange={(e) => { this.state.newdoc.exp = e.target.value }} required />
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                                    <Col>
                                        <button class='chanh-button-view' type="button" style={{ height: '30px' }} onClick={(e) => this.setDoctor()}>Xác nhận</button>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal>

                        <Col class='dung-appointment-table' md="12">
                            <Table Schedule>
                                <thead className="dung-table">
                                    <tr>
                                        <th style={{ textAlign: 'left' }}>
                                            Điều dưỡng
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Xoá quyền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dung-table-body">

                                    {this.state.nurse.filter(row => row.activate === 1).map(nurse => <tr style={{ textAlign: 'left' }}> <td> {nurse.firstname + " " + nurse.lastname}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button class='chanh-button-view'
                                                type="button"
                                                onClick={(e) => { this.setState({phone:nurse.phone,role:"NURSE",show:true}); }}
                                                style={{ width: '50px', height: '30px' }}>
                                                X
                                            </button>
                                        </td>
                                    </tr>)}

                                </tbody>
                            </Table>
                        </Col>
                        <Col md="12">
                            <button
                                class='chanh-button-view'
                                type="button" onClick={(e) => this.toggleNurse()}
                                style={{
                                    width: '140px',
                                    height: '40px',
                                    marginTop: '30px',
                                    marginBottom: '30px',
                                    backgroundColor: '#62AFFC',
                                    border: '0px',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                Thêm điều dưỡng
                            </button>
                        </Col>
                    </Row>
                    
                    <div className={showHideClassName}>
                        <section className="modal-main">
                            <div class='dung-logomini'>
                                <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                            </div>      
                            <p>Xác nhận xóa</p>
                            <button type="button" onClick={(e) => { this.setState({show:false}) }}>
                                Hủy
                            </button>

                            <button type="button" onClick={(e) => {this.setState({show:false}); this.delete(); }}>
                                Xác nhận
                            </button>

                        </section>
                    </div>
                    <Modal isOpen={this.state.modalNurse} toggle={(e) => this.toggleNurse()}>
                        <ModalHeader> Thêm điều dưỡng </ModalHeader>
                        <Container>
                            <Row>
                                <Col md="12">
                                    Họ và tên
                                    <Input name="name" onChange={(e) => { this.state.newnurse.name = e.target.value }} required />
                                </Col>
                                <Col md="12">
                                    Số điện thoại
                                    <Input name="phone" onChange={(e) => { this.state.newnurse.phone = e.target.value }} required />
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center' }}>
                                <Col>
                                    <button
                                        class='chanh-button-view'
                                        type="button"
                                        onClick={(e) => {this.setNurse();}}
                                        style={{ width: '140px', height: '40px', marginTop: '20px', marginBottom: '20px' }}>
                                        Thêm điều dưỡng
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>
                </Container>
            </>
        )
    }
}
HR.contextType = HeaderDefine;
export default HR;
