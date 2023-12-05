import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, NavLink } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import HeaderDefine from '../Context';
import { Switch, Redirect } from 'react-router-dom';

class Nurse extends Component{
    render(){
        if (this.context.role !== "Nurse") return <Switch><Redirect to={`/${this.context.role.toString()}`} /> </Switch>
        return(
            <Container>
                <Row>
                    <Col md="12"> <h1 className="cat-cushome-header">Chào mừng bạn đến với Health Care !</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="6">
                        <LinkContainer to="/manage_drug" style={{cursor: 'pointer'}}>
                        <Card className="cat-customer-item-right">
                            <img className="cat-customer-img" width="90px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Quản lý thuốc</CardTitle>
                            </CardBody>
                        </Card>
                        </LinkContainer>
                    </Col>
                    <Col md="6">    
                        <LinkContainer to="/view_order" style={{cursor: 'pointer'}}>
                        <Card className="cat-customer-item-left">
                            <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/buy-home.png" alt = "Mua thuốc online"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Quản lý đơn thuốc</CardTitle>
                            </CardBody>
                        </Card>
                        </LinkContainer>
                    </Col>
                    <Col md="6">
                    <LinkContainer to ="/createanappointment" style={{cursor: 'pointer'}}>
                            <Card className="cat-customer-item-right">
                                <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/schedule.png" alt = "Đặt lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Tạo lượt điều trị</CardTitle>
                                </CardBody>
                            </Card>
                    </LinkContainer>
                    </Col>
                    <Col md="6">
                    <LinkContainer to ="/statistic_treatment" style={{cursor: 'pointer'}}>
                            <Card className="cat-customer-item-left">
                                <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/make-treat-home.png" alt = "Đặt lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Thống kê lượt điều trị</CardTitle>
                                </CardBody>
                            </Card>
                    </LinkContainer>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Nurse.contextType = HeaderDefine;
export default Nurse;
