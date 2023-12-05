import React, { useState } from 'react';
import { Input, Row, Col, Button, Container, ModalFooter } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import storage from './firebase';


const EditInfo = (props) => {
    const [file, setFile] = useState();
    const updateInfo = async () => {
        await subReg();
        if (file) {
            var snapshot = await storage.ref(`/images/${temp.phone}`).put(file);
            snapshot.ref.getDownloadURL().then(url => {
                var newValue = temp;
                newValue.img = url;
                setTemp(newValue);

                console.log(temp)
                axios.post('/api/post/info', {
                    params: {
                        // dateofbirth:Date(temp.dateofbirth),
                        firstname: temp.firstname,
                        lastname: temp.lastname,
                        address: temp.address,
                        email: temp.email,
                        phone: temp.phone,
                        img: url
                    }
                }).then(res => {
                    props.toggleEdit();
                    if (res.data.msg) props.msgCall(res.data.msg);
                    props.setUser(temp);
                    axios.get('/api/set/user', { params: temp });
                })
            })
        }
        else {
            axios.post('/api/post/info', { params: temp }).then(res => {
                props.toggleEdit();
                if (res.data.msg) props.msgCall(res.data.msg);
                props.setUser(temp);
                axios.get('/api/set/user', { params: temp });
            })
        }
    }
    const [temp, setTemp] = useState(props.info);
    const handleChange = (evt) => {
        const value = evt.target.value;
        var newValue = temp;
        newValue[evt.target.name] = value;
        setTemp(newValue);
    }

    const [is_open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!is_open)
    }

    const subReg = () => {
        const str = temp.fullname;
        var lname = str.split(' ').slice(0, -1).join(' ');
        var fname = str.split(' ').slice(-1).join(' ');
        var newTemp = temp;
        newTemp.lastname = lname;
        newTemp.firstname = fname;
        setTemp(newTemp);
    };
    const handleFile = (event) => {
        setFile(event.target.files[0]);
    }
    return <>
        <ModalHeader>Điều chỉnh thông tin</ModalHeader>
        <ModalBody>
            <Container>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}> Họ và tên</Col>
                    <Col md="9">
                        <Input name="fullname" onChange={handleChange} defaultValue={temp.lastname + " " + temp.firstname}> </Input> </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>Email </Col>
                    <Col md="9">
                        <Input name="email" onChange={handleChange} defaultValue={temp.email} ></Input>
                    </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>Ngày sinh </Col>
                    <Col md="9">
                        <Input name="dateofbirth" type="date" onChange={handleChange} defaultValue={(new Date(temp.dateofbirth)).toLocaleDateString('vi').split("/").reverse().join('-')}></Input>
                    </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>Địa chỉ </Col>
                    <Col md="9">
                        <Input name="address" onChange={handleChange} defaultValue={temp.address}></Input>
                    </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>Ảnh đại diện </Col>
                    <Col md="9">
                        <Input name="img" type="file" onChange={handleFile}></Input>
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
                        <Button onClick={props.toggleEdit} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
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
                            <Button onClick={() => { updateInfo(); handleOpen(); props.toggleEdit() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                Có
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => { handleOpen(); props.toggleEdit() }}
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
export default EditInfo;
