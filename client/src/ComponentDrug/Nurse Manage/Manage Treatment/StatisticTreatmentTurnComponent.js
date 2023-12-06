import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Input, Button } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { XAxis, YAxis, Tooltip, Legend, Bar, BarChart, CartesianGrid, Label} from 'recharts'
import '../Manage Order/manage_order.css';
import axios from 'axios';
import NurseSideBar from '../../../5.Share Component/SideBar/NurseSideBarComponent';
import DoctorSideBar from '../../../5.Share Component/SideBar/DoctorSideBarComponent';
import HeaderDefine from '../../../5.Share Component/Context';
import { Switch, Redirect } from 'react-router-dom';


const styles = {
    container: {
      backgroundColor: '#f8f9fa', // Màu nền nhẹ cho container
    },
    chartContainer: {
        display: 'flex',
        justifyContent: 'center', // This will center the button horizontally
        alignItems: 'center', // This will center the button vertically
    },
    tableContainer: {
        display: 'flex',
        justifyContent: 'center', // This will center the button horizontally
        alignItems: 'center', // This will center the button vertically
    },
    table: {
        width: '95%',
        marginTop: '10px',
        marginBottom: '10px', // Adds some space below the table
      },
}
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
        axios.get("/medicine/usage")
            .then(response => {
                this.setState({ treatment_turns: response.data.data });
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu:", error);
            });
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
        
        const medicineStatistic = this.state.treatment_turns.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.ma_thuoc}</td>
                    <td>{item.ten_thuoc}</td>
                    <td>{item.tong_so_lan_su_dung.toLocaleString('vi-VN')}</td>
                </tr>
            )
        });

        if (this.context.role !== "Nurse" && this.context.role !== "Doctor") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
                {(() => {if (this.context.role === "Nurse") return <NurseSideBar />; else return <DoctorSideBar />})()}
                <Container style={styles.container}>
                <Row style={{ textAlign: 'center' }}>
            <Col>
              <h2>Thống kê lượng thuốc sử dụng</h2>
              <hr />
            </Col>
          </Row>
          <Row style={{ textAlign: 'left' }}>
            <Col>
              <h4>Biểu đồ</h4>
            </Col>
          </Row>
          <div style={styles.chartContainer}>
                        <BarChart
                            width={700} // Điều chỉnh chiều rộng để phù hợp
                            height={300}
                            data={this.state.treatment_turns}
                            margin={{ top: 20, right: 50, bottom: 50, left: 20 }} // Tăng margin phải lên 50px
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ten_thuoc">
                                <Label value="Tên loại thuốc" offset={-15} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{ value: 'Số lần sử dụng', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '40px' }} /> {/* Thêm padding trái cho Legend */}
                            <Bar dataKey="tong_so_lan_su_dung" fill="#8884d8" name="Tổng số lần sử dụng" />
                        </BarChart>
                    </div>

           
          <Row style={{ textAlign: 'left' , marginTop: '20px' }}>
            <Col>
              <h4>Bảng thống kê</h4>
            </Col>
          </Row>

            {/* Hiển thị Bảng Thống Kê */}
            <div style={styles.tableContainer}>
            <Table bordered style={styles.table}>
                    <thead>
                        <tr>
                            <th>Mã Thuốc</th>
                            <th>Tên Thuốc</th>
                            <th>Số Lần Sử Dụng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicineStatistic}
                    </tbody>
                </Table>
            </div>
                </Container>
            </>
        );
    }
}
StatisticTreatmentTurn.contextType = HeaderDefine;
export default StatisticTreatmentTurn;