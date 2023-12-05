import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Col, Button, Row, Container } from 'reactstrap';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import HeaderDefine from '../5.Share Component/Context';

const EditHealth = (props) => {
    const ctx = useContext(HeaderDefine);
    const postHealth = () => {
        axios.post('/api/post/TTSK', { params: { tempInfo, phone: props.phone } }).then(res => {
            // props.toggleHealth();
            if (res.data.msg) props.msgCall(res.data.msg);
        })
    }
    const [tempInfo, setTemp] = useState(props.health);
    const handleChange = (evt) => {
        const value = evt.target.value;
        var newValue = tempInfo;
        newValue[evt.target.name] = value;
        setTemp(newValue);
    }

    const [is_open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!is_open)
    }

    return <>
        <ModalHeader>Điều chỉnh tình trạng sức khỏe</ModalHeader>
        <ModalBody>
            <Container>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="3" style={{ marginTop: '8px' }}> Chiều cao</Col>
                    <Col md="9">
                        <Input name="height" onChange={handleChange} defaultValue={tempInfo.height} ></Input>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="3" style={{ marginTop: '8px' }}>Cân nặng </Col>
                    <Col md="9">
                        <Input name="weight" defaultValue={tempInfo.weight} onChange={handleChange} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="3" style={{ marginTop: '8px' }}>Nhóm máu </Col>
                    <Col md="9">
                        <Input name="blood_type" defaultValue={tempInfo.blood_type} onChange={handleChange} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="3" style={{ marginTop: '8px' }}> Tiền sử </Col>
                    <Col md="9">
                        <Input name="medical_history" defaultValue={tempInfo.medical_history} onChange={handleChange} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="3" style={{ marginTop: '8px' }}> Bệnh lý nền </Col>
                    <Col md="9">
                        <Input name="medical_background" defaultValue={tempInfo.medical_background} onChange={handleChange} />
                    </Col>

                </Row>
            </Container>
        </ModalBody>
        <ModalFooter>
            <Container>
                <Row style={{ textAlign: 'center' }}>
                    <Col>
                        <Button className="center_screen" onClick={handleOpen} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                            Xác nhận
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={props.toggleHealth} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                            Hủy bỏ
                        </Button>
                    </Col>
                </Row>
            </Container>
        </ModalFooter>
        <Modal isOpen={is_open} toggle={handleOpen} centered>
            <ModalHeader> Bạn có chắc chắn với lựa chọn của mình ? </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <Button onClick={() => { postHealth(); handleOpen(); props.toggleHealth() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                Có
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => { handleOpen(); props.toggleHealth() }}
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
    </>
}
export default EditHealth;