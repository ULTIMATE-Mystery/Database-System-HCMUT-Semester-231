import React, { Component } from 'react';
import { Container, Table, Row, Col } from 'reactstrap';
import axios from 'axios';
import ToastServive from 'react-material-toast';
import HeaderDefine from '../5.Share Component/Context';
import { Switch, Redirect } from 'react-router';

const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});

class CancelAppointment extends Component {
    constructor() {
        super();
        this.state = {
            phone: '',
            show: false,

            treatment_turn: [],
            work_schedule: [],
            system_user: [],

            treatment_turns: [],
            work_schedules: [],
            system_users: [],
            registering: [],


        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleInsert = this.handleInsert.bind(this);
        this.handleDeleteInsert = this.handleDeleteInsert.bind(this);
        this.onClickSuccess = this.onClickSuccess.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    componentDidMount() {
        this.setState({ phone: this.context.phone })
        axios.get('/api/get/treatment_turns')
            .then(res => {
                const treatment_turns = res.data;
                this.setState({ treatment_turns: treatment_turns.treatment_turns });
                this.setState({ treatment_turn: this.state.treatment_turns.filter(t => t.patient_phone == this.state.phone) });
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
            })
            .catch(error => console.log(error));
    };

    handleDelete = () => {
        axios.post('/api/delete/treatment_turns', this.state.registering)
            .then(res => {
                this.setState(prevState => ({
                    treatment_turns: prevState.treatment_turns.filter(el => el.id !== this.state.registering.id)
                }));
                this.setState({ treatment_turn: this.state.treatment_turns.filter(t => t.patient_phone == this.state.phone) });
            })
            .catch(error => console.log(error));
    }

    handleInsert = (item) => {
        const newsId = {
            id: item.id
        };

        this.setState({ registering: newsId });
    }

    handleDeleteInsert = (event) => {
        event.preventDefault();
        this.setState({ registering: {} });
    }

    onClickSuccess = () => {
        const id = toast.success('Hủy thành công!', () => {
        });
    }
    onErrorClick = () => {
        const id = toast.error('hello world');
    }
    onInfoClick = () => {
        const id = toast.info('hello world');
    }
    onWarningClick = () => {
        const id = toast.warning('hello world');
    }
    onRemoveAll = () => {
        toast.removeAll();
    }

    render() {
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
        const months = {'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug':8, 'Sep':9, 'Oct':10, 'Nov':11, 'Dec':12};
        let counter = 0;
        if (this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <Container id='dung-cancelappointment'>
                <Row>
                <Col style={{textAlign: 'center'}} class='dung-title'>
                    <h1>Hủy lịch khám</h1>
                    <hr />
                </Col>
                </Row>
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
                        {
                            this.state.treatment_turn.map((x, index) => {
                                console.log(x.start_time)
                                console.log((+(new Date(x.start_time))) - (+(new Date())))
                                if ((+(new Date(x.start_time))) - (+(new Date())) > 0) {
                                    return (
                                        <tr>
                                            <th scope="row">
                                                {++counter}
                                            </th>
                                            <td>
                                                {this.state.system_users.map(turn => { if (x.doctor_phone == turn.phone) { return turn.lastname+' '+turn.firstname } })}
                                            </td>
                                            <td>
                                                {x.doctor_phone}
                                            </td>
                                            <td>
                                                {x.turn_time.split(' ')[1]+'/'+months[x.turn_time.split(' ')[2]]+'/'+x.turn_time.split(' ')[3]}
                                            </td>
                                            <td>
                                                {x.start_time.split(' ').splice(-1, 1).join() + '-' + x.end_time.split(' ').splice(-1, 1).join()}
                                            </td>
                                            <td>

                                                <div className={showHideClassName}>
                                                    <section className="modal-main">
                                                        <div class='dung-logomini'>
                                                            <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                                                        </div>
                                                        <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                                        <button type="button" onClick={(e) => { this.hideModal(); this.handleDeleteInsert(e) }}>
                                                            Hủy
                                                        </button>

                                                        <button type="button" onClick={() => { this.hideModal(); this.handleDelete(); this.onClickSuccess() }}>
                                                            Xác nhận
                                                        </button>

                                                    </section>
                                                </div>
                                                <button class='dung-button-dangky' type="button" onClick={() => { this.showModal(); this.handleInsert(x) }}>Hủy</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}
CancelAppointment.contextType = HeaderDefine;
export default CancelAppointment;