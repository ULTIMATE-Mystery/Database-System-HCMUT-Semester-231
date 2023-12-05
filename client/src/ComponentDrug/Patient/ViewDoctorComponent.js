import React, { Component } from 'react';
import { Container, Row, Col, Spinner, Form, FormGroup } from 'reactstrap';
import { Input, Button, Badge } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import Pagination from "pagination-component";
import { Link } from 'react-router-dom';
import '../Nurse Manage/Manage Order/manage_order.css';
import { Switch, Redirect } from 'react-router';

import axios from 'axios';
import HeaderDefine from '../../5.Share Component/Context';

class ViewDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            doctors_search: [],
            activePage: 1,
            nums_page: 1,
            sort: 1
        }
        this.onInputOrderID = this.onInputOrderID.bind(this);
        this.changePage = this.changePage.bind(this);
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

    async componentDidMount() {
        const _doctors = await axios.get('/api/get/doctors-info')

        const __doctors = _doctors.data.doctors.map(x => {
            return {...x, dateofbirth: (new Date(x.dateofbirth)).toLocaleDateString('vi'), fullname: x.lastname + " " + x.firstname}
        })
        console.log(__doctors);
        this.setState({doctors: __doctors, doctors_search: __doctors});
    }

    changePage(page) {
        this.setState({ activePage: page });
    }

    onInputOrderID() {
        let id = this.state.doctors.filter(doctor => {
            return doctor.phone.toString().includes(this.search_item.value.toString())
        });
        let name = this.state.doctors.filter(doctor => {
            return (doctor.fullname.split(" ").join("").normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
                .replace(/Đ/g, 'D').toLowerCase()
                .includes(this.search_item.value.split(" ").join("").normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase())) && !id.includes(doctor)
        });

        let search = [];

        if (id.length !== 0) {
            search = id;
            if (name.length !== 0) search.push(name);
        } else if (name.length !== 0) {
            search = name;
            if (id.length !== 0) search.push(id);
        }

        this.setState({ doctors_search: search });
    }

    render() {
        const display_doctors = this.state.doctors_search.map((doctor) => {
            return (
                <tr>
                    <th scope="row">
                        {this.state.doctors_search.indexOf(doctor) + 1}
                    </th>
                    <td>
                        {doctor.fullname}
                    </td>
                    <td>
                        {doctor.dateofbirth}
                    </td>
                    <td>
                        {doctor.address}
                    </td>
                    <td>
                        {doctor.phone}
                    </td>
                    <td>
                        {doctor.email}
                    </td>
                    <td>
                        {doctor.specialism}
                    </td>
                    <td>
                        {doctor.experience_year}
                    </td>
                </tr>
            )
        });

        let not_Found = <span></span>;
        // if (display_order.length === 0) not_Found = <div className="not-found-search"> Không tìm thấy kết quả </div>
        // else not_Found = <span></span>;

        // const containerStyle = (count) => {
        //     if (count > 100) return { marginLeft: '45vh' }
        //     else if (count > 30) return { marginLeft: '34%' }
        //     else if (count > 20) return { marginLeft: '46%' }
        //     else return { marginLeft: '46.5%' }
        // };

        // const itemStyle = {
        //     float: "left",
        //     marginLeft: "5px",
        //     marginRight: "5px",
        //     backgroundColor: "#FFFAF7",
        //     color: "black",
        //     cursor: "pointer",
        //     width: "50px",
        //     textAlign: "center",
        //     borderRadius: "5px"
        // };

        const sortByKey = <Row>
            <Col md="3">
                <Form onSubmit={e => {e.preventDefault(); this.onInputOrderID()}}>
                    <FormGroup>
                        <Input style={{width: '261px'}} className="search-box-sort" id="search" name="search-drugs" placeholder="Nhập thông tin"
                            innerRef={(input) => this.search_item = input} autoComplete="off"/>
                    </FormGroup>
                </Form>

            </Col>
            <Button className="search-button" onClick={this.onInputOrderID}>
                <FaSearch /> Tìm <span style={{ textTransform: 'lowercase' }}> kiếm </span>
            </Button>
        </Row>
        
        if (this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
                <Container>
                    <Row className="manage-order-heading" >
                        <Col md="12" className='manage-order-header' style={{textAlign: 'center', fontSize: '30px'}}> Danh sách bác sĩ </Col>
                    </Row>
                    <Row>
                        <Col>
                            {sortByKey}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {not_Found}
                            <Table responsive hover striped>
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            Tên bác sĩ
                                        </th>
                                        <th>
                                            Ngày sinh
                                        </th>
                                        <th>
                                            Địa chỉ
                                        </th>
                                        <th>
                                            Số điện thoại
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Chuyên khoa
                                        </th>
                                        <th>
                                            Số năm kinh nghiệm
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {display_doctors}
                                    {/* {display_order.slice((this.state.activePage - 1) * 10,
                                        (this.state.activePage * 10))} */}
                                </tbody>
                            </Table>
                            {/* {this.state.orders_search.length === 0 && (() => { return <Spinner className="detail-spinner"> Loading... </Spinner> })()} */}
                        </Col>
                    </Row>
                    {/* <Row style={{ marginTop: '10px', paddingBottom: '20px' }}>
                        <Col style={containerStyle(this.state.orders_search.length)}>
                            <Pagination className="health-panigation"
                                initialPage={1} show={10}
                                pageCount={this.state.nums_page}
                                onChange={page => this.changePage(page)}>
                                {({ setPage, page, index, currentPage, isPrev, isNext, isCurrentPage }) => {
                                    if (isPrev)
                                        return (
                                            <div style={itemStyle} onClick={() => setPage({ prev: true })}>
                                                {"<"}
                                            </div>
                                        );

                                    if (isNext)
                                        return (
                                            <div style={itemStyle} onClick={() => setPage({ next: true })}>
                                                {">"}
                                            </div>
                                        );

                                    return (
                                        <div className="healthcare-pagination-button"
                                            key={index}
                                            style={{ ...itemStyle, backgroundColor: isCurrentPage ? "#62AFFC" : "white" }}
                                            onClick={() => {
                                                console.log(`Navigating from page ${currentPage} to page ${page}`);
                                                setPage({ page });
                                            }}>
                                            <h1 className="healthcare-pagination-number">{page}</h1>
                                        </div>
                                    );
                                }}
                            </Pagination>
                        </Col>
                    </Row> */}
                </Container>
            </>
        )
    }
}
ViewDoctor.contextType = HeaderDefine
export default ViewDoctor;