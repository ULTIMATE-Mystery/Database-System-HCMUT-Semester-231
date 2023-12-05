import React, { Component } from 'react';
import { Container, Table, Row, Col } from 'reactstrap';
import axios from 'axios';
import { FaPencilAlt } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";
import ToastServive from 'react-material-toast';
import HeaderDefine from '../5.Share Component/Context'
import { Switch, Redirect } from 'react-router';
import NurseSideBar from '../5.Share Component/SideBar/NurseSideBarComponent';
import { Input } from 'reactstrap';


//curr_thu: i+3 
//current_day: addDays(new Date(), 1).toUTCString(),
const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});


class InstantAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            phone_nurse: '',
            show: false,

            treatment_turn: [],
            work_schedule: [],
            system_user: [],

            treatment_turns: [],
            work_schedules: [],
            system_users: [],

            registering: {},//"08:00:00-08:30:00","09:00:00-09:30:00","10:30:00-11:00:00","13:30:00-14:00:00","14:30:00-15:00:00","15:00:00-15:30:00","15:30:00-16:00:00","16:30:00-17:00:00"

            current_day: (new Date((+(new Date())) + 3600000 * 7)).toUTCString(),
            thu: 2,
            curr_thu: 2,
            popup_health_issue: false, 
            patients: []
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleInsertSubmit = this.handleInsertSubmit.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDeleteInsert = this.handleDeleteInsert.bind(this);
        this.onClickSuccess = this.onClickSuccess.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.randomId = this.randomId.bind(this);
        this.handleChangeHealthIssue = this.handleChangeHealthIssue.bind(this);
        this.hideAllModal = this.hideAllModal.bind(this);
        this.onWarningClick = this.onWarningClick.bind(this);
    }

    componentDidMount() {
        this.setState({ phone: this.context.phone, phone_nurse: this.context.phone})
        axios.get('/api/get/treatment_turns')
            .then(res => {
                const treatment_turns = res.data;
                this.setState({ treatment_turns: treatment_turns.treatment_turns });
            })
            .catch(error => console.log(error));

        axios.get('/api/get/patients')
            .then(res => {
                const patients = res.data;
                this.setState({ patients: patients.patients });
            })
            .catch(error => console.log(error));

        axios.get('/api/get/work_schedules')
            .then(res => {
                const work_schedules = res.data;
                this.setState({ work_schedules: work_schedules.work_schedules });
            })
            .catch(error => console.log(error));


        axios.get('/api/get/system_users')
            .then(res => {
                const system_users = res.data;
                this.setState({ system_users: system_users.system_users });

                let currentDay = (new Date((+(new Date())) + 3600000 * 7)).toUTCString().split(' ');

                const days = ['Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,'];
                for (let i = 0; i < days.length; ++i) {
                    if (days[i] == currentDay[0]) {
                        this.setState({ thu: i + 2, curr_thu: i + 2 });
                        break;
                    }
                }

                const new_Work_schedule = this.state.work_schedules.filter(w => w.work_day == this.state.thu);//&&(Number(w.turn_time.split(' ').splice(1,1))>=5&&Number(w.turn_time.split(' ').splice(1,1))<=11))
                //loc luot dieu tri trong ngay
                let new_Treatment_turn = this.state.treatment_turns.filter(w => new_Work_schedule.filter(nw => w.doctor_phone == nw.doctor_phone)).flat()//w=>w.doctor_phone==new_Work_schedule[0].doctor_phone||new_Work_schedule[1]!==undefined&&w.doctor_phone==new_Work_schedule[1].doctor_phone

                new_Treatment_turn = new_Treatment_turn.filter(nw => nw.turn_time.split(' ')[1] == this.state.current_day.split(' ')[1] && nw.turn_time.split(' ')[2] == this.state.current_day.split(' ')[2] && nw.turn_time.split(' ')[3] == this.state.current_day.split(' ')[3]);
                //bo new_System_user
                const new_System_user = this.state.system_users.filter(w => new_Work_schedule.filter(nw => w.phone == nw.doctor_phone)).flat();//w=>w.phone==new_Work_schedule[0].doctor_phone||new_Work_schedule[1]!==undefined&&w.phone==new_Work_schedule[1].doctor_phone
                this.setState({ treatment_turn: new_Treatment_turn, work_schedule: new_Work_schedule, system_user: new_System_user });
            })
            .catch(error => console.log(error));
    };

    onWarningClick = () => {
        const id = toast.warning('Chưa nhập số điện thoại!');
    }

    onErrorClick = () => {
        const id = toast.error('Số điện thoại không hợp lệ!');
    }

    showModal = () => {
        if(this.state.patients.filter(x => x.phone == this.state.phone).length !== 0){
            this.setState({ popup_health_issue: true });
        }
        else if(this.state.phone!==this.state.phone_nurse){
            this.onErrorClick();
        }
        else{
            this.onWarningClick();
        }
    };

    hideModal = () => {
        this.setState({ popup_health_issue: false, show: true });
    };

    hideAllModal = () => {
        this.setState({  popup_health_issue: false, show: false });
    }

    randomId = () => {
        const id = Math.floor(Math.random() * 10000000);
        return this.state.treatment_turns.filter(t => t.id == id).length == 0 ? id : this.randomId();
    }

    handleInsert = (event) => {
        if(this.state.patients.filter(x => x.phone == this.state.phone).length !== 0){
            event.preventDefault();
            const newItem = {
                id: this.randomId(),
                turn_time: event.target.value.split(' ').splice(0, 4).join(' ') + ' ' + event.target.value.split(' ').splice(-1, 1).join().split('-')[0],
                health_issue: ' ',
                blood_pressure: 1,
                heart_beat: 1,
                therapy: ' ',
                diagnose: ' ',
                start_time: event.target.value.split(' ').splice(0, 4).join(' ') + ' ' + event.target.value.split(' ').splice(-1, 1).join().split('-')[0],
                end_time: event.target.value.split(' ').splice(0, 4).join(' ') + ' ' + event.target.value.split(' ').splice(-1, 1).join().split('-')[1],
                patient_phone: this.state.phone,
                doctor_phone: event.target.name
            };
    
            this.setState({ registering: newItem });
        }
    }

    handleDeleteInsert = (event) => {
        event.preventDefault();
        this.setState({ registering: {} });
    }

    handleInsertSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/insert/treatment_turns', this.state.registering)
            .then(res => {
                let news = this.state.treatment_turns;
                news = [this.state.registering, ...news];
                this.setState({ treatment_turns: news });
                this.setState({ registering: {} });


                const new_Work_schedule = this.state.work_schedules.filter(w => w.work_day == this.state.thu);//&&(Number(w.turn_time.split(' ').splice(1,1))>=5&&Number(w.turn_time.split(' ').splice(1,1))<=11))
                //loc luot dieu tri trong ngay
                let new_Treatment_turn = this.state.treatment_turns.filter(w => new_Work_schedule.filter(nw => w.doctor_phone == nw.doctor_phone)).flat()//w=>w.doctor_phone==new_Work_schedule[0].doctor_phone||new_Work_schedule[1]!==undefined&&w.doctor_phone==new_Work_schedule[1].doctor_phone

                new_Treatment_turn = new_Treatment_turn.filter(nw => nw.turn_time.split(' ')[1] == this.state.current_day.split(' ')[1] && nw.turn_time.split(' ')[2] == this.state.current_day.split(' ')[2] && nw.turn_time.split(' ')[3] == this.state.current_day.split(' ')[3]);
                this.setState({ treatment_turn: new_Treatment_turn })
            })
            .catch(error => console.log(error));

    };

    onClickSuccess = () => {
        const id = toast.success('Đăng ký thành công!', () => {
        });
    }

    handleChange = (event) => {
        this.setState({ phone: event.target.value });
        console.log(this.state.phone)
    };

    handleChangeHealthIssue = (event) => {
        let register = this.state.registering;
        register.health_issue = event.target.value;
        this.setState({ registering: register });
    }


    handleSubmit = (event) => {
        if (this.state.patients.filter(x => x.phone == this.state.phone).length !== 0) {
            const id = toast.success('Phone: ' + this.state.phone, () => {
            });
            this.setState({ showtable: true })
        }
        else {
            const id = toast.error('Not found phone: ' + this.state.phone, () => {
            });
            this.setState({ showtable: false })
        }
        event.preventDefault();
    };


    render() {
        const showPopupHealthIssue = this.state.popup_health_issue? "modal display-block" : "modal display-none";
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
        const listMorning = ["8:00:00-8:30:00", "8:30:00-9:00:00", "9:00:00-9:30:00", "9:30:00-10:00:00", "10:00:00-10:30:00", "10:30:00-11:00:00"];
        const listAfternoon = ["13:00:00-13:30:00", "13:30:00-14:00:00", "14:00:00-14:30:00", "14:30:00-15:00:00", "15:00:00-15:30:00", "15:30:00-16:00:00", "16:00:00-16:30:00", "16:30:00-17:00:00"];
        let S = this.state.work_schedule.filter(turn => turn.work_session == 'S');
        let C = this.state.work_schedule.filter(turn => turn.work_session == 'C');
        S=S.filter(s=> s.end_day==null || (((+(new Date(s.end_day)))+3600000*24-1) > (+(new Date(this.state.current_day)))) )
        C=C.filter(c=> c.end_day==null || (((+(new Date(c.end_day)))+3600000*24-1) > (+(new Date(this.state.current_day)))) )
        const months = {'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug':8, 'Sep':9, 'Oct':10, 'Nov':11, 'Dec':12}

        let dem = 0;
        const listS = S.map(curr => listMorning.map((x, index) => (
            <tr>
                <th scope="row">
                    {++dem}
                </th>
                <td>
                    {this.state.system_user.map(turn => { if (curr.doctor_phone == turn.phone) { return turn.lastname + ' ' + turn.firstname } })}
                </td>
                <td>
                    {curr.doctor_phone}
                </td>
                <td>
                    {this.state.current_day.split(' ')[1]+'/'+months[this.state.current_day.split(' ')[2]]+'/'+this.state.current_day.split(' ')[3]}
                </td>
                <td>
                    {x}
                </td>
                <td>
                    <div className={showPopupHealthIssue}>
                        <section className="modal-main aa">     
                            <div class='dung-logomini'>
                                <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                            </div>    
                            <p><label for="health-issue">Vấn đề sức khỏe hiện tại của bạn?</label></p>
                            <Input id="health-issue" name="health-issue" type="textarea" onChange={this.handleChangeHealthIssue} required />
                            <button type="button" onClick={(e) => { this.hideAllModal(); this.handleDeleteInsert(e) }}>
                                Hủy
                            </button>

                            <button type="button" onClick={(e) => { this.hideModal();  }}>
                                Tiếp tục
                            </button>
                        </section>
                    </div>

                    <div className={showHideClassName}>
                        <section className="modal-main">
                            <div class='dung-logomini'>
                                <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                            </div>      
                            <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                            <button type="button" onClick={(e) => { this.hideAllModal(); this.handleDeleteInsert(e) }}>
                                Hủy
                            </button>

                            <button type="button" onClick={(e) => { this.hideAllModal(); this.handleInsertSubmit(e); this.onClickSuccess() }}>
                                Xác nhận
                            </button>

                        </section>
                    </div>
                    {this.state.curr_thu >= this.state.thu ?
                        (
                            this.state.curr_thu == this.state.thu ?
                                (Number(x.split('-')[0].split(':')[0]) < Number((new Date()).toString().split(' ')[4].split(':')[0]) || Number(x.split('-')[0].split(':')[0]) == Number((new Date()).toString().split(' ')[4].split(':')[0]) && Number(x.split('-')[0].split(':')[1]) < Number((new Date()).toString().split(' ')[4].split(':')[1]) ?
                                    (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                                        <FaPencilAlt /> : <MdLockClock />) :
                                    (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                                        <FaPencilAlt /> :
                                        <button class='dung-button-dangky' type="button" value={this.state.current_day.split(' ').splice(0, 4).join(' ') + ' ' + x} name={curr.doctor_phone} onClick={(e) => { this.showModal(); this.handleInsert(e) }}>Đăng ký</button>)
                                ) :

                                (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                                    <FaPencilAlt /> : <button class='dung-button-dangky' type="button" value={this.state.current_day.split(' ').splice(0, 4).join(' ') + ' ' + x} name={curr.doctor_phone} onClick={(e) => { this.showModal(); this.handleInsert(e) }}>Đăng ký</button>)
                        ) :
                        (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                            <FaPencilAlt /> : <MdLockClock />)}
                </td>
            </tr>
        ))
        ).flat()

        const listC = C.map(curr => listAfternoon.map((x, index) => (
            <tr>
                <th scope="row">
                    {++dem}
                </th>
                <td>
                    {this.state.system_user.map(turn => { if (curr.doctor_phone == turn.phone) { return turn.lastname + ' ' + turn.firstname } })}
                </td>
                <td>
                    {curr.doctor_phone}
                </td>
                <td>
                {this.state.current_day.split(' ')[1]+'/'+months[this.state.current_day.split(' ')[2]]+'/'+this.state.current_day.split(' ')[3]}
                </td>
                <td>
                    {x}
                </td>
                <td>
                <div className={showPopupHealthIssue}>
                        <section className="modal-main aa">     
                            <div class='dung-logomini'>
                                <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                            </div>    
                            <p><label for="health-issue">Vấn đề sức khỏe hiện tại của bạn?</label></p>
                            <Input id="health-issue" name="health-issue" type="textarea" onChange={this.handleChangeHealthIssue} required />
                            <button type="button" onClick={(e) => { this.hideAllModal(); this.handleDeleteInsert(e) }}>
                                Hủy
                            </button>

                            <button type="button" onClick={(e) => { this.hideModal();  }}>
                                Tiếp tục
                            </button>
                        </section>
                    </div>

                    <div className={showHideClassName}>
                        <section className="modal-main">
                            <div class='dung-logomini'>
                                <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                            </div>      
                            <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                            <button type="button" onClick={(e) => { this.hideAllModal(); this.handleDeleteInsert(e) }}>
                                Hủy
                            </button>

                            <button type="button" onClick={(e) => { this.hideAllModal(); this.handleInsertSubmit(e); this.onClickSuccess() }}>
                                Xác nhận
                            </button>

                        </section>
                    </div>
                    {this.state.curr_thu >= this.state.thu ?
                        (
                            this.state.curr_thu == this.state.thu ?
                                (Number(x.split('-')[0].split(':')[0]) < Number((new Date()).toString().split(' ')[4].split(':')[0]) || Number(x.split('-')[0].split(':')[0]) == Number((new Date()).toString().split(' ')[4].split(':')[0]) && Number(x.split('-')[0].split(':')[1]) < Number((new Date()).toString().split(' ')[4].split(':')[1]) ?
                                    (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                                        <FaPencilAlt /> : <MdLockClock />) :
                                    (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                                        <FaPencilAlt /> :
                                        <button class='dung-button-dangky' type="button" value={this.state.current_day.split(' ').splice(0, 4).join(' ') + ' ' + x} name={curr.doctor_phone} onClick={(e) => { this.showModal(); this.handleInsert(e) }}>Đăng ký</button>)
                                ) :

                                (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                                    <FaPencilAlt /> : <button class='dung-button-dangky' type="button" value={this.state.current_day.split(' ').splice(0, 4).join(' ') + ' ' + x} name={curr.doctor_phone} onClick={(e) => { this.showModal(); this.handleInsert(e) }}>Đăng ký</button>)
                        ) :
                        (this.state.treatment_turn.filter(t => t.doctor_phone == curr.doctor_phone && t.turn_time.split(' ').splice(-1, 1).join() == x.split('-')[0] && t.turn_time.split(' ').splice(0, 4).join(' ') == this.state.current_day.split(' ').splice(0, 4).join(' ')).length !== 0 ?
                            <FaPencilAlt /> : <MdLockClock />)}
                    {/* {this.state.curr_thu>=this.state.thu?(this.state.curr_thu==this.state.thu?(Number(x.split('-')[0].split(':')[0])<Number((new Date()).toString().split(' ')[4].split(':')[0])&&Number(x.split('-')[0].split(':')[1])<Number((new Date()).toString().split(' ')[4].split(':')[1])?' ':this.state.treatment_turn.filter(t=> t.doctor_phone==curr.doctor_phone &&t.turn_time.split(' ').splice(-1,1).join()==x.split('-')[0]&&t.turn_time.split(' ').splice(0,4).join(' ')==this.state.current_day.split(' ').splice(0,4).join(' ')).length!==0?<FaPencilAlt />:<button class='dung-button-dangky' type="button" value={this.state.current_day.split(' ').splice(0,4).join(' ')+' '+x} name={curr.doctor_phone} onClick={(e)=>{this.showModal(); this.handleInsert(e)}}>Đăng ký</button>):this.state.treatment_turn.filter(t=> t.doctor_phone==curr.doctor_phone &&t.turn_time.split(' ').splice(-1,1).join()==x.split('-')[0]&&t.turn_time.split(' ').splice(0,4).join(' ')==this.state.current_day.split(' ').splice(0,4).join(' ')).length!==0?<FaPencilAlt />:<button class='dung-button-dangky' type="button" value={this.state.current_day.split(' ').splice(0,4).join(' ')+' '+x} name={curr.doctor_phone} onClick={(e)=>{this.showModal(); this.handleInsert(e)}}>Đăng ký</button>):' '} */}
                </td>
            </tr>
        ))
        ).flat()

        if (this.context.role !== "Nurse") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>

        return (
            <>
            <NurseSideBar style={{marginRight: '50px'}}/>
            <Container id='dung-appointment'>
                <Row>
                    <Col class='dung-title' style={{textAlign: 'center'}}>
                    <h1>Lịch khám tức thời</h1>
                    <hr />
                    </Col>
                </Row>

                <Row>
                    <Col>
                <form onSubmit={this.handleSubmit} className='dung-nhapsdt'>
                    <label>
                        Nhập số điện thoại: &nbsp;
                        <input type="number" value={this.state.value} onChange={this.handleChange} required />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                </Col>
                </Row>

                <Row>
                <Col>
                    <div className='dung-appointment-table'>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Bác sĩ
                                </th>
                                <th>
                                    Số điện thoại
                                </th>
                                <th>
                                    Ngày/Tháng/Năm
                                </th>
                                <th>
                                    Thời gian
                                </th>
                                <th>

                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {listS}
                            {listC}
                        </tbody>
                    </Table>
                    </div>
                </Col>
                </Row>
            </Container>
            </>
        )
    }
}

InstantAppointment.contextType = HeaderDefine;

export default InstantAppointment;
