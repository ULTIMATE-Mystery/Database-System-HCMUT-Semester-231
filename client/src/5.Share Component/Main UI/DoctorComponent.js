import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import HeaderDefine from '../Context';
import { Switch, Redirect } from 'react-router-dom';

class Doctor extends Component{
    render(){
        if (this.context.role !== "Doctor") return <Switch><Redirect to={`/${this.context.role.toString()}`} /> </Switch>
        return(
            <Container>
                <Row>
                    <Col md="12"> <h1 className="cat-cushome-header">Chào mừng bạn đến với Health Care !</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="6">
                    <LinkContainer to ="/view_medical_record" style={{cursor: 'pointer'}}>
                        {/* <NavLink className="cat-customer-item-link"> */}
                        <Card className="cat-customer-item-right">
                            <img className="cat-customer-img" width="90px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Tra cứu lịch sử điều trị</CardTitle>
                            </CardBody>
                        </Card>
                    {/* </NavLink> */}
                    </LinkContainer>    
                    </Col>
                    <Col md="6">    
                    <LinkContainer to ="/statistic_treatment" style={{cursor: 'pointer'}}>
                        {/* <NavLink className="cat-customer-item-link"> */}
                        <Card className="cat-customer-item-left">
                            <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/make-treat-home.png" alt = "Mua thuốc online"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Thống kê lượt điều trị</CardTitle>
                            </CardBody>
                        </Card>
                        {/* </NavLink> */}
                        </LinkContainer>
                    </Col>
                    <Col md="6">
                    <LinkContainer to ="/scheduleTable" style={{cursor: 'pointer'}}>
                        {/* <NavLink className="cat-customer-item-link"> */}
                        <Card className="cat-customer-item-right">
                            <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/schedule.png" alt = "Xem hồ sơ bệnh án"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Quản lý lịch làm việc</CardTitle>
                            </CardBody>
                        </Card>
                    {/* </NavLink> */}
                    </LinkContainer>    
                    </Col>
                    <Col md="6">
                    <LinkContainer to ="/HR" style={{cursor: 'pointer'}}>
                        {/* <NavLink className="cat-customer-item-link"> */}
                            <Card className="cat-customer-item-left">
                                <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/quanlydieuduong.png" alt = "Đặt lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Quản lý nhân sự</CardTitle>
                                </CardBody>
                            </Card>
                            {/* </NavLink> */}
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
            // <Container class="dung-doctor">
            //     <div class="dung-title">
            //         <h1>Chào mừng bạn đến với HealthCare!</h1>
            //         <hr />
            //     </div>
            //     <div class="dung-doctor-row1">
            //         <Row className="doctor-service">
            //             <Col>
            //                 <Card className="dung-service-item">
            //                     <div class="dung-imgfor-doctor">
            //                         <img className="dung-service-img" width="90px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
            //                     </div>
            //                     <CardBody>
            //                     <CardTitle tag="h5">Xem lịch làm việc</CardTitle>
            //                     </CardBody>
            //                 </Card>
            //             </Col>
            //             <Col>
            //                 <Card className="dung-service-item">
            //                     <div class="dung-imgfor-doctor">
            //                         <img className="dung-service-img" width="65px" height="90px" src="/assets/images/make-treat-home.png" alt = "Đặt mua đơn thuốc"></img>
            //                     </div>
            //                     <CardBody>
            //                     <CardTitle tag="h5">Thống kê lịch khám</CardTitle>
            //                     </CardBody>
            //                 </Card>
            //             </Col>
            //         </Row>
            //     </div>
            //     <div class="dung-doctor-row2">
            //         <Row className="doctor-service">
            //             <Col>
            //                 <Card className="dung-service-item">
            //                     <div class="dung-imgfor-doctor">
            //                         <img className="dung-service-img" width="65px" height="90px" src="/assets/images/quanlydieuduong.png" alt = "Xem hồ sơ bệnh án"></img>
            //                     </div>
            //                     <CardBody>
            //                     <CardTitle tag="h5">Quản lý điều dưỡng</CardTitle>
            //                     </CardBody>
            //                 </Card>
            //             </Col>
            //             <Col>
            //                 <Card className="dung-service-item">
            //                     <div class="dung-imgfor-doctor">
            //                         <img className="dung-service-img" width="65px" height="90px" src="/assets/images/buy-home.png" alt = "Đặt mua đơn thuốc"></img>
            //                     </div>
            //                     <CardBody>
            //                     <CardTitle tag="h5">Quản lý hồ sơ bệnh án</CardTitle>
            //                     </CardBody>
            //                 </Card>
            //             </Col>
            //         </Row>
            //     </div>
            // </Container>
        );
    }
}

Doctor.contextType = HeaderDefine;
export default Doctor;