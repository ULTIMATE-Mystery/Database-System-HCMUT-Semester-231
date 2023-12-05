import React, { Component, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Row, Col, Button, Container, ModalHeader, ModalBody, Table } from 'reactstrap';
import Home from '../5.Share Component/Main UI/HomeComponent';
import HeaderDefine from '../5.Share Component/Context';
import { useContext } from 'react';
import axios from 'axios';
import { Modal } from 'reactstrap';
import NotesApp from './note';
import { useEffect } from 'react';
import UpdatePwd from './updatePwd';
import EditHealth from './editHealth';
import EditInfo from './Editinfo';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Redirect } from 'react-router-dom';
import { extend } from 'jquery';
import DoctorSideBar from '../5.Share Component/SideBar/DoctorSideBarComponent';

const Profile = (props) => {
    const ctx = useContext(HeaderDefine);
    const [edit, setEdit] = useState(false);
    const [changePwd, setChangePwd] = useState(false);
    const [user, setUser] = useState({
        phone: props.phone,
        fullname: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        address: "",
        email: "",
        img: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png",
    })

    useEffect(async () => {
        {
            const res1 = await axios.get('/api/get/info', { params: { phonenum: props.phone } })
            setUser(res1.data.user);

            console.log(user)

            const res = await axios.get('/api/get/role', { params: { phonenum: props.phone } })
            const roleData = res.data.role;

            if (roleData !== "Patient") {
                if (user.phone != ctx.phone) {
                    setRole("Guest")
                }
                else setRole(roleData);
            }
            else {
                setRole("Patient");
            }
        }
        // fetchData();
    }, [props.phone]);

    console.log(ctx)
    console.log(user)
    const grant = user === undefined ? false : user.phone === ctx.phone ? false : true;
    const [role, setRole] = useState("Guest");

    const [msg, setMsg] = useState("");
    const [isMsg, setIsMsg] = useState(false);
    const showMsg = (msg) => {
        setMsg(msg);
        setIsMsg(true);

    }
    const toggleMsg = () => {
        setIsMsg(!isMsg);
    }
    const toggleEdit = () => {
        setEdit(!edit);
    };
    const togglePwd = () => {
        setChangePwd(!changePwd);
    };

    const accessright = () => {
        if (ctx.role === "Guest") return -1;
        if (role === "Patient") return 1;
        if (user.phone === ctx.phone) return 2;
        return 0;
    }


    const setAllImg = (newUser) => {
        ctx.setImg(newUser.img);
        setUser(newUser);
    }

    const View = () => {
        if (ctx.role !== "Patient" && ctx.role !== "Doctor" && ctx.role !== "Nurse") return <Switch> <Redirect to='/home' /> </Switch>
        if (accessright)
            return (<>
                {/* {ctx.phone != props.phone ? <DoctorSideBar /> : <span></span>} */}
                <Container >
                    <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Col md="4">
                            <Col>
                                <div className="center">
                                    <Row><img className="ava" src={user.img}></img></Row>
                                    <Row>{user.phone}</Row>
                                    <Row>{user.email}</Row>
                                    <Row>{user.address}</Row>
                                    <Row>
                                        <Button disabled={grant} style={{ backgroundColor: '#62AFFC', border: '0px', marginBottom: '15px', marginTop: '10px' }} onClick={toggleEdit}>
                                            Điều chỉnh thông tin
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button disabled={grant} style={{ backgroundColor: '#62AFFC', border: '0px' }} onClick={togglePwd}>
                                            Thay đổi mật khẩu
                                        </Button>
                                    </Row>
                                    <Route path="changePwd" component={Home} />
                                </div>
                            </Col>
                        </Col>
                        <Col md="8">
                            <Row>
                                <Col md="12" style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}> Thông tin cá nhân</Col>
                            </Row>
                            <Col>
                                <Row>
                                    <Col>
                                        Người dùng: {user.lastname + " " + user.firstname}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Ngày sinh: {(new Date(user.dateofbirth)).toLocaleDateString('vi')}
                                    </Col>
                                </Row>
                                <Row>
                                    {role === "Patient" ? <Patient phone={user.phone} access={accessright()} grant={grant} msg={msg} setMsg={setMsg} msgCall={showMsg}/>
                                        : role === "Doctor" ? <Doctor phone={user.phone} access={accessright} grant={grant} msg={msg} setMsg={setMsg} msgCall={showMsg}/>
                                            : <Nurse phone={user.phone} msg={msg} setMsg={setMsg} msgCall={showMsg}/>}
                                </Row>

                            </Col>
                        </Col>
                    </Row>
                    <Modal centered isOpen={edit} toggle={toggleEdit}><EditInfo info={user} toggleEdit={toggleEdit} msgCall={showMsg} setUser={setAllImg} />
                    </Modal>
                    <Modal centered isOpen={changePwd} toggle={togglePwd}><UpdatePwd togglePwd={togglePwd} phone={user.phone} msgCall={showMsg} />
                    </Modal>

                    <Modal centered isOpen={isMsg} toggle={toggleMsg}>
                        <ModalHeader> Message </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        {msg}
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>
                </Container>
                </>
            )
        else {
            return <> Hồ sơ không tồn tại</>
        }
    }
    return View();
}
export default Profile;



class Patient extends Component {
    constructor(props) {

        super(props);
        this.state = {
            phone: props.phone,
            access: props.access,
            grant: props.grant,
            health: false,
            info: {
                height: "1.23",
                weight: "53",
                BMI: "Ổn định",
                blood_type: "O",
                medical_history: "",
                medical_background: "",

            },
        }

    }

    async componentDidMount() {
        const res = await axios.get('/api/get/patientInfo', { params: { phone: this.state.phone } })
        const health = res.data;
        if (health) {
            let saveData = health[0];
            let bmiValue = (saveData.weight / saveData.height) / saveData.height * 10000;
            // this.setState({ bmi : bmiValue });
            saveData.BMI = this.getBmi(bmiValue.toPrecision(4));
            this.setState({ info: saveData });
        }
    }
    getBmi(bmi) {
        if (bmi < 18.5) {
            return bmi + " (Thiếu cân)";
        }
        if (bmi >= 18.5 && bmi < 24.9) {
            return bmi + " (Ổn định)";
        }
        if (bmi >= 25 && bmi < 29.9) {
            return bmi + " (Thừa cân)";
        }
        if (bmi >= 30) {
            return bmi + " (Béo phì)";
        }
    }
    toggleHealth = () => {
        this.setState({ health: !this.state.health })
    };

    render() {

        if (this.state.access == 1)
            return (
                <>
                    {this.Health(this.state.info)}
                    <Modal centered isOpen={this.state.health} toggle={this.toggleHealth}><EditHealth health={this.state.info} phone={this.state.phone} toggleHealth={this.toggleHealth} msgCall={this.props.msgCall}/>
                        {/* msgCall={showMsg} /> */}
                    </Modal>
                </>
            )
        else
            return (<>
                {this.Health(this.state.info)}
                {/* <Modal centered isOpen={this.state.health} toggle={this.toggleHealth}><EditHealth health={this.state.info} phone={this.state.phone} toggleHealth={this.toggleHealth} />
                    msgCall={showMsg} />
                </Modal> */}
            </>


            )
    }

    Health = (info) => {

        const current = new Date();
        const date = (curr) => { return `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`; }
        return (<>
            <Row>
                <Col md="6">
                    <Row>
                        <Col>
                            Chiều cao: {info.height}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Cân nặng: {info.weight}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Chỉ số BMI: {info.BMI}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Nhóm máu: {info.blood_type}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Tiền sử: {info.medical_history ? info.medical_history : "Không"}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Bệnh lý nền: {info.medical_background ? info.medical_background : "Không"}
                        </Col>
                    </Row>
                    <Row classname="additional">
                        <Col>
                            Thông tin từ ngày {date(current)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button hidden={this.state.grant} onClick={this.toggleHealth}
                                style={{ backgroundColor: '#62AFFC', border: '0px', marginTop: '10px' }}>
                                Cập nhật tình trạng sức khỏe </Button>
                        </Col>
                    </Row>
                </Col>

                <Col md="6">
                    <Row>
                        <Col>
                            <NavLink to='/view_order'>
                                <Button classname="center_screen" hidden={this.state.grant}
                                    style={{
                                        backgroundColor: '#62AFFC',
                                        border: '0px',
                                        height: '40px',
                                        marginTop: '50px',
                                        width: '140px'
                                    }}>
                                    Xem đơn thuốc </Button>
                            </NavLink>
                        </Col>
                        <Col>
                            <Link to={`/medical_record/${JSON.stringify(this.state.phone)}`}>
                                <Button
                                    onClick={(e) => { localStorage.setItem("med_phone", this.state.phone); console.log("set") }}
                                    style={{
                                        backgroundColor: '#62AFFC',
                                        border: '0px',
                                        height: '40px',
                                        marginTop: '50px',
                                        width: '140px'
                                    }}>
                                    Lịch sử điều trị
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </>
        )
    }

}

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: props.phone,
            display_sche: [{}],
            doc: {}
        }


    }
    async componentDidMount() {
        const sche = await axios.get('/api/get/my_work_schedules', { params: { phone: this.state.phone } })
        const sche_list = sche.data ? sche.data.work_schedules : []
        this.setState({ display_sche: sche_list.filter(sche => !(sche.end_day)) })
        const info = await axios.get('/api/get/my-doctors-info', { params: { phone: this.state.phone } })
        this.setState({ doc: info.data.doctors[0] })
    }
    render() {
        return (<>
            <Row>
                <Col>Chuyên ngành: {this.state.doc.specialism} </Col></Row>
            <Row> <Col> Kinh nghiệm: {this.state.doc.experience_year} năm </Col> </Row>
            <Row style={{ padding: "20px" }}>



                <Col class='dung-appointment-table'>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>
                                    Ngày trực
                                </th>
                                <th>
                                    Buổi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.display_sche.map(sche => <tr><td> {sche.work_day}</td><td>{sche.work_session === "S" ? "Sáng" : "Chiều"}</td> </tr>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row style={{ textAlign: 'center' }}> <Col>
                <LinkContainer to={`/view_treatment/${JSON.stringify(this.state.phone)}`} style={{ backgroundColor: '#62AFFC', border: '0px', marginBottom: '15px', marginTop: '10px' }}>
                    <Button>
                        {/* onClick={toggleEdit}> */}
                        Xem lượt điều trị
                    </Button>
                </LinkContainer> </Col>
            </Row>
        </>
        )
    }
}
class Nurse extends Component {
    render() {
        return (<>
        </>)
    }
}