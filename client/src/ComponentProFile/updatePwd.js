import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Row, Col, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, Badge, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import HeaderDefine from '../5.Share Component/Context';

const UpdatePwd = (props) => {
    const ctx = useContext(HeaderDefine);
    console.log(ctx);

    const [pwd, setpwd] = useState("");

    const [newpwd, setNewpwd] = useState("");

    const [repwd, setRepwd] = useState("");
    const changePwd = () => {
        axios.post('/api/post/pwd', { params: { phone: props.phone, pwd: pwd, newpwd: newpwd } }).then(res => {
            props.togglePwd();
            if (res.data.msg) props.msgCall(res.data.msg);
        })
    }

    const [is_open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!is_open)
    }

    return <>
        <ModalHeader>Thay đổi mật khẩu</ModalHeader>
        <Form onSubmit={(e) => { e.preventDefault();
            if (pwd === "" || newpwd === "" || repwd === "") props.msgCall("Vui lòng điền đủ thông tin!");
            else if (newpwd !== repwd) props.msgCall("Nhập lại mật khẩu không khớp!")
            else handleOpen()
        }}>
            <ModalBody>
                <Container>
                    <FormGroup row>
                        <Label md="4"> Mật khẩu cũ </Label>
                        <Col md="8">
                            <Input required name="pwd" type="password" onChange={(e) => setpwd(e.target.value)} ></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label md="4">Mật khẩu mới </Label>
                        <Col md="8">
                            <Input required name="newpwd" type="password" onChange={(e) => setNewpwd(e.target.value)}></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label md="4">Nhập lại mật khẩu </Label>
                        <Col md="8">
                            <Input required name="repwd" type="password" onChange={(e) => setRepwd(e.target.value)}
                             valid={(repwd !== "") && (newpwd !== "") && (repwd === newpwd)}
                             invalid={(repwd !== "") && (newpwd !== "") && (repwd !== newpwd)}  />
                            <FormFeedback valid> Mật khẩu trùng khớp </FormFeedback>
                            <FormFeedback invalid> Mật khẩu không trùng khớp</FormFeedback>
                        </Col>
                    </FormGroup>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Container>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <FormGroup check>
                                <Button className="center_screen"
                                    style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                                    Xác nhận
                                </Button>
                            </FormGroup>
                        </Col>
                        <Col>
                            <Button onClick={props.togglePwd} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                                Hủy bỏ
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalFooter>
        </Form>
        <Modal isOpen={is_open} toggle={handleOpen} centered>
            <ModalHeader> Bạn có chắc chắn với lựa chọn của mình ? </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <Button onClick={() => { changePwd(); handleOpen(); props.togglePwd() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                Có
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => { handleOpen(); props.togglePwd() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                Không </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
        {/* <Row>
            <Col>
                <Button className="center_screen" onClick={(e) => changePwd()} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                    Xác nhận
                </Button>
            </Col>
            <Col>
                <NavLink className="nav-link" to={`/profile/${JSON.stringify(ctx.phone)}`} onClick={props.togglePwd} style={{ marginTop: '-8px' }}>
                    <Button style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                        Hủy bỏ
                    </Button>
                </NavLink>
            </Col>
        </Row> */}

    </>





}
export default UpdatePwd;