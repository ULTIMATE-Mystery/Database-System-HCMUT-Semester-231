import React, { Component } from 'react';
import { Input, Row, Col, Button, Modal, ModalFooter, Container, Form, FormGroup, Label, FormFeedback, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { Switch, Redirect } from 'react-router';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            fullname: "",
            firstname: "",
            lastname: "",
            dateofbirth: "",
            address: "",
            email: "",
            pwd: "",
            repwd: "",
            Msg: "",
            isMsg: false,
            signal: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.subReg = this.subReg.bind(this);
        this.toggleMsg = this.toggleMsg.bind(this);
        this.apiReg = this.apiReg.bind(this);
    }

    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            [evt.target.name]: value
        });
        console.log(this.state);
    }

    toggleMsg() {
        this.setState({ isMsg: !this.state.isMsg })
    }

    apiReg() {
        console.log(this.state);
        axios.post('/api/insert/regist', {
            params: this.state
        })
            .then(res => {
                const msg = res.data;
                if (msg.msg) {
                    this.setState({ Msg: msg.msg, signal: msg.signal })
                }
                else { this.setState({ Msg: "Đăng ký thất bại" }) }
                this.toggleMsg();
            })
    }
    subReg() {
        const str = this.state.fullname;
        this.setState({ lastname: str.split(' ').slice(0, -1).join(' ') })
        this.setState({ firstname: str.split(' ').slice(-1).join(' ') })
        console.log(this.state)
        if (this.state.pwd !== this.state.repwd) {
            this.setState({ Msg: 'Mật khẩu không trùng khớp' })
            this.toggleMsg();
        }
        this.apiReg();
    }

    render() {
        return (<>
            <Container>
                <Row>
                    <Col md={{ offset: 4, size: 4 }}>
                        <Row>
                            <Col>
                                <h1 style={{ textAlign: 'center' }}> Đăng ký </h1>
                            </Col>
                        </Row>
                        <Form onSubmit={(e) => { e.preventDefault(); this.subReg() }}>
                            <FormGroup>
                                <Label>
                                    Họ và tên
                                </Label>
                                <Input name="fullname" onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Ngày sinh
                                </Label>
                                <Input name="date" type="date" onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Số điện thoại
                                </Label>
                                <Input name="phone" onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Mật khẩu
                                </Label>
                                <Input name="pwd" onChange={this.handleChange} type="password" required />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Xác nhận mật khẩu
                                </Label>
                                <Input valid={this.state.pwd !== "" && this.state.repwd !== "" && this.state.pwd === this.state.repwd} invalid={this.state.pwd !== "" && this.state.repwd !== "" && this.state.pwd !== this.state.repwd} name="repwd" onChange={this.handleChange} type="password" required />
                                {(this.state.pwd !== "" && this.state.repwd !== "") ?
                                    ((this.state.pwd === this.state.repwd) ? <FormFeedback valid> Mật khẩu trùng khớp </FormFeedback>
                                        : <FormFeedback invalid> Mật khẩu không trùng khớp </FormFeedback>) : <span></span>}
                            </FormGroup>
                            <FormGroup check>
                                <Row>
                                    <Col md={{ offset: 4, size: 4 }}>
                                        <Button color="primary" style={{ marginTop: '15px', marginBottom: '15px' }}> Đăng ký</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                        <Row style={{ marginBottom: '15px' }}>
                            <Col md="12" style={{ textAlign: 'center' }}>
                                <span style={{ fontStyle: 'italic' }}> Đã có tài khoản? </span> &nbsp;
                                <NavLink to='/login' style={{ paddingTop: '0px' }} style={{ color: '#007BFF', cursor: 'pointer' }}>
                                    <FaSignInAlt /> Đăng nhập
                                </NavLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal centered isOpen={this.state.isMsg} toggle={this.toggleMsg}>
                    <ModalHeader> Message </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row style={{ textAlign: 'center' }}>
                                <Col>
                                    {this.state.Msg}
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    {this.state.signal === 200 ?
                        <ModalFooter>
                            <Container>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <LinkContainer to="/login" style={{ backgroundColor: '#62AFFC', border: '0px' }}>
                                            <Button> Đăng nhập </Button>
                                        </LinkContainer>
                                    </Col>
                                </Row>
                            </Container>
                        </ModalFooter> : <span></span>}
                </Modal>
            </Container>
        </>
        )
    };

}
export default SignUp;
