import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';
import axios from 'axios';
import ToastServive from 'react-material-toast';
import { Link } from 'react-router-dom';
import HeaderDefine from '../5.Share Component/Context';
import { Switch, Redirect } from 'react-router';
import DoctorSideBar from '../5.Share Component/SideBar/DoctorSideBarComponent';

const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});

class MedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: 943693315,
            show: true,

            system_user: [],
            system_users: [],

            showtable: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get/system_users')
            .then(res => {
                const system_users = res.data;
                this.setState({ system_users: system_users.system_users });
            })
            .catch(error => console.log(error));
    };

    showModal = () => {
        this.setState({ showtable: true, show: false });
    };

    hideModal = () => {
        this.setState({ showtable: false, show: true });
    };

    handleChangePhone = (event) => {
        this.setState({ phone: event.target.value });
    };

    handleSubmit = (event) => {

        if (this.state.system_users.filter(x => x.phone == this.state.phone).length !== 0) {
            const id = toast.success('Phone: ' + this.state.phone, () => {
            });
            this.setState({ showtable: true })
            this.showModal();
        }
        else {
            const id = toast.error('Not found phone: ' + this.state.phone, () => {
            });
            this.setState({ showtable: false })
        }
        event.preventDefault();
    };

    render() {
        const showButton = this.state.show ? "display-block" : "display-none";
        const showTable = this.state.showtable ? "display-block" : "display-none";
        if (this.context.role !== "Doctor") return <Switch> <Redirect to={`/${this.context.role.toString()}`} /> </Switch>
        return (<> <DoctorSideBar />
            <Container id='dung-viewmedicalrecord'>
                <Row style={{ textAlign: 'center' }}>
                    <Col class='dung-title'>
                        <h1>Tra cứu</h1>
                        <hr />
                    </Col>
                </Row>
                <Row style={{textAlign:'center'}}>
                    <Col md={{size: 4, offset: 4}}class='dung-form-taolich'>

                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup style={{textAlign: 'left'}}>
                                <Label for="examplePhone">
                                    Nhập số điện thoại bệnh nhân:
                                </Label>
                                <Input
                                    id="examplephone"
                                    name="phone"
                                    type="number"
                                    onChange={this.handleChangePhone} required
                                />
                            </FormGroup>
                            <div className={showButton}>
                                <Button style={{
                                    backgroundColor: '#62AFFC',
                                    marginTop: '10px',
                                    border: '0px',
                                    color: 'white',
                                    borderRadius: '10px'
                                }}>
                                    Tìm kiếm
                                </Button>
                            </div>

                            <div className={showTable}>
                                <div class='dung-button-createappointment' style={{ textAlign: 'center' }}>
                                    <Link to={`/profile/${JSON.stringify(this.state.phone)}`}>
                                        <Button style={{
                                            backgroundColor: '#62AFFC',
                                            marginTop: '10px',
                                            border: '0px',
                                            color: 'white',
                                            borderRadius: '10px'
                                        }} hidden={this.context.role === "Patient" && this.context.phone !== this.state.phone}
                                            className="dung cart-button benhan">
                                            Thông tin cá nhân
                                        </Button>
                                    </Link>
                                    <Link to={`/medical_record/${JSON.stringify(this.state.phone)}`}>
                                        <Button style={{
                                            backgroundColor: '#62AFFC',
                                            marginTop: '10px',
                                            border: '0px',
                                            color: 'white',
                                            borderRadius: '10px'
                                        }}
                                            className="dung cart-button benhan nd"
                                            onClick={(e) => { localStorage.setItem("med_phone", this.state.phone); console.log("set") }}>
                                            Lịch sử điều trị
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

MedicalRecord.contextType = HeaderDefine;
export default MedicalRecord;