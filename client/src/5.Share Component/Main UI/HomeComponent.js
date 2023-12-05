import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import HeaderDefine from '../Context';
import { Switch, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Home extends Component {
    render() {
        if (this.context.role === "Patient" || this.context.role === "Doctor" || this.context.role === "Nurse")
            return <Switch><Redirect to={`/${this.context.role.toString()}`} /> </Switch>
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="header-content">
                            <p className="content-1"> Health Care </p>
                            <p> cho mọi nhà </p>
                        </div>
                        <div className="header-decription">
                            HealthCare là một ứng dụng y tế hỗ trợ người dùng trong việc đặt lịch khám, đặt đơn thuốc, xem hồ sơ bệnh án,...
                            Có thể truy cập từ máy tính, điện thoại cho tất cả mọi người
                        </div>
                        <div className="home-button-calendar">
                            <LinkContainer to="/scheduleTable">
                            <Button className="calendar" color="primary">Lịch làm việc</Button>
                            </LinkContainer>
                        </div>
                    </Col>
                    <Col className="home-image">
                        <img src="/assets/images/home_page.png" alt="Home_page"></img>
                    </Col>
                </Row>
                <br />
                <Row className="service-content"> <Col md="12">Dịch vụ cho bạn </Col></Row>
                <hr />
                <Row className="service-description">
                    Chúng tôi cung cấp cho bạn những lựa chọn tốt nhất cho bạn.
                    Điều chỉnh phù hợp với nhu cầu sức khỏe của bạn và đảm bảo rằng bạn
                    đang điều trị với các bác sĩ có trình độ chuyên môn cao của chúng tôi,
                    bạn có thể tham khảo ý kiến của chúng tôi về loại hình dịch vụ nào phù hợp
                    với sức khỏe của bạn
                </Row>
                <br />
                <Row className="home-service">
                    <Col>
                        <Card className="service-item">
                            <img className="service-img" width="91.98px" height="90px" src="/assets/images/view-home.png" alt="Xem hồ sơ bệnh án"></img>
                            <CardBody>
                                <CardTitle tag="h5">Xem hồ sơ bệnh án</CardTitle>
                                <CardText className="service-text">Nhập ID bệnh án và số điện thoại để xem hồ sơ bệnh án của bạn</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="service-item">
                            <img className="service-img" width="61.86px" height="85px" src="/assets/images/buy-home.png" alt="Đặt mua đơn thuốc"></img>
                            <CardBody>
                                <CardTitle tag="h5">Mua thuốc online</CardTitle>
                                <CardText className="service-text">Đăng nhập và đặt đơn thuốc của bạn với hệ thống của chúng tôi</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="service-item">
                            <img className="service-img" width="67.29px" height="95px" src="/assets/images/make-treat-home.png" alt="Đặt lịch khám"></img>
                            <CardBody>
                                <CardTitle tag="h5">Đặt lịch khám</CardTitle>
                                <CardText className="service-text">Đặt lịch khám và bạn sẽ được gặp những bác sĩ đáng tin cậy và lời khuyên tốt nhất từ chúng tôi</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md="12">
                        <Button className="contact-button">Liên hệ</Button>
                    </Col>
                </Row>
                <br />
            </Container>
        );
    }
}

Home.contextType = HeaderDefine;
export default Home;