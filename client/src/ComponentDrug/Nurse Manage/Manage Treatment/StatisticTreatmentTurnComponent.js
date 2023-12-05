import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Input, Button } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { XAxis, YAxis, Tooltip, Legend, Bar, BarChart, CartesianGrid } from 'recharts'
import '../Manage Order/manage_order.css';
import axios from 'axios';
import NurseSideBar from '../../../5.Share Component/SideBar/NurseSideBarComponent';
import DoctorSideBar from '../../../5.Share Component/SideBar/DoctorSideBarComponent';
import HeaderDefine from '../../../5.Share Component/Context';
import { Switch, Redirect } from 'react-router-dom';

class StatisticTreatmentTurn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // order_filter: [],
            // orders_statistic: [],
            treatment_turns: [],
            filter: []
        }
        this.onInputTime = this.onInputTime.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get/treatment_turns').then(res => {
            console.log(res.data.treatment_turns)
            const treatment = res.data.treatment_turns.map(treat => {
                const newTreat = treat;
                newTreat.turn_time = this.convertDate(new Date(treat.turn_time));
                return newTreat;
            })
            console.log(treatment)
            let day = [];
            for (let i = 0; i < treatment.length; i++)
                if (!day.includes(treatment[i].turn_time)) day.push(treatment[i].turn_time)
            
            day = day.map(x => {
                let total = 0;
                treatment.map(y => {if (y.turn_time === x) total += 1; return y})
                return {
                    created_date: x,
                    "Số lượt điều trị": total
                }
            }).sort((a,b) => this.compare(b.created_date, a.created_date))

            console.log(day);
            this.setState({ treatment_turns: day });
        })
        .catch(error => console.log(error));

        // axios.get('/api/get/total_value')
        //     .then(res => {
        //         const orders = res.data.data_statistic.map(order => {
        //             const newOrder = order;
        //             newOrder.created_date = new Date(order.created_date);
        //             return newOrder;
        //         })
        //         this.setState({ orders_statistic: orders });
        //     })
        //     .catch(error => console.log(error));
    }

    compare(day1, day2) {
        day1 = day1.split("/").map(x => parseInt(x));
        day2 = day2.split("/").map(x => parseInt(x));

        if (parseInt(day1[2]) > parseInt(day2[2])) return 1;
        else if (parseInt(day1[2]) < parseInt(day2[2])) return -1;
        else if (parseInt(day1[1]) > parseInt(day2[1])) return 1;
        else if (parseInt(day1[1]) < parseInt(day2[1])) return -1;
        else if (parseInt(day1[0]) > parseInt(day2[0])) return 1;
        else if (parseInt(day1[0]) < parseInt(day2[0])) return -1;
        else return 0;
    }

    onInputTime() {
        const start_time = this.convertDate2(this.start_time.value);
        const end_time = this.convertDate2(this.end_time.value);

        const data = this.state.treatment_turns.filter(order => {
            const day = order.created_date;
            if (this.compareDay(day, start_time) === true && this.compareDay(end_time, day) === true) return true;
            else return false
        })
        console.log(this.state.treatment_turns)
        console.log(data)
        this.setState({filter: data})
    }

    compareDay(day1, day2) {
        day1 = day1.split("/").map(x => parseInt(x));
        day2 = day2.split("/").map(x => parseInt(x));

        if (parseInt(day1[2]) > parseInt(day2[2])) return true;
        else if (parseInt(day1[2]) < parseInt(day2[2])) return false;
        else if (parseInt(day1[1]) > parseInt(day2[1])) return true;
        else if (parseInt(day1[1]) < parseInt(day2[1])) return false;
        else if (parseInt(day1[0]) >= parseInt(day2[0])) return true;
        else return false;
    }

    convertDate(day) {
        let date = day.getDate();
        let month = day.getMonth() + 1;
        let year = day.getYear() + 1900;

        if (date < 10) date = "0" + date.toString();
        if (month < 10) month = "0" + month.toString();

        return date + "/" + month + "/" + year;
    }

    convertDate2(day) {
        day = day.split('-');
        return day[2] + "/" + day[1] + "/" + day[0];
    }

    render() {
        const orders_statistic = this.state.filter.map((order) => {
            return (
                <tr>
                    <th scope="row">
                        {this.state.filter.indexOf(order) + 1}
                    </th>
                    <td>
                        {order.created_date}
                    </td>
                    <td>
                        {(order["Số lượt điều trị"]).toLocaleString('vi-VN')}
                    </td>
                </tr>
            )
        });

        let total_money = 0;
        this.state.filter.map(order => {
            total_money += order["Số lượt điều trị"];
            return order;
        })

        const DataFormater = (number) => {
            return (number.toString().toLocaleString('vi-VN'))
        }
        if (this.context.role !== "Nurse" && this.context.role !== "Doctor") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
                {(() => {if (this.context.role === "Nurse") return <NurseSideBar />; else return <DoctorSideBar />})()}
                <Container>
                    <Row className="statistic-order-heading">
                        <Col md="4" className='statistic-order-header'> Thống kê lượt điều trị </Col>
                        <Col md="8">
                            <Row>
                                <Col md="4">
                                    <Input className="search-box" id="startTime" name="date" placeholder="Bắt đầu" type="date"
                                        innerRef={(input) => this.start_time = input} />
                                </Col>
                                <Col md="4">
                                    <Input className="search-box" id="endTime" name="date" placeholder="Kết thúc" type="date"
                                        innerRef={(input) => this.end_time = input} />
                                </Col>
                                <Col md="4">
                                    <Button className="search-statistic-button" style={{ marginTop: '0px' }} onClick={this.onInputTime}>
                                        <FaSearch /> Tìm <span style={{ textTransform: 'lowercase' }}> kiếm </span>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="total-money"> Có: {total_money.toLocaleString('vi-VN')} lượt điều trị </Col>
                    </Row>

                    <Row className="total-money-chart">
                        <BarChart width={730} height={250} data={this.state.filter}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="created_date" />
                            <YAxis tickFormatter={DataFormater} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Số lượt điều trị" fill="#8884d8" />
                        </BarChart>

                    </Row>
                    <Row>
                        <Col>
                            <Table responsive hover striped>
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            Ngày
                                        </th>
                                        <th>
                                            Số lượt điều trị
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders_statistic}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
StatisticTreatmentTurn.contextType = HeaderDefine;
export default StatisticTreatmentTurn;