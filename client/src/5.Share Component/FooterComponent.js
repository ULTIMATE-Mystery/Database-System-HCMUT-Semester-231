import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';

class Footer extends Component {
    render(){
        return(
        <div className="footer">
            <Container >
                <br />
                <Row>
                    <Col>
                        <Row>
                        <Col className="footer-header"> <Col> HealthCare </Col> </Col>
                        </Row>
                        <Row>
                        <Col className="footer-content"> <Col> Phòng khám đa khoa cung cấp  dịch vụ đặt lịch khám, lưu trữ hồ sơ online và quản lý thông tin </Col></Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col className="footer-header"> <Col> Bach Khoa University </Col> </Col>
                        </Row>
                        <Row>
                            <Col md="8" className="footer-content"> <Col>
                            Võ Hồng Phúc <br />
                            Nguyễn Tiến Dũng <br />
                            Trần Duy Chánh <br />
                            Nguyễn Khoa Gia Cát                         
                            </Col> </Col>
                            <Col md="2" className="footer-content"> <Col>
                            1911881 <br />
                            191xxxx <br />
                            191xxxx  <br />
                            1912749  <br />
                            </Col> </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col className="footer-header"> <Col> Help  </Col> </Col>
                        </Row>
                        <Row>
                            <Col className="footer-content"> <Col>
                            Help center <br />
                            Contact support <br />
                            Instructions <br />
                            How it works <br />
                            </Col> </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </Container>
        </div>
        );
    }
}

export default Footer;