import React, { useContext, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Container, Button, Row, Col } from 'reactstrap';
import { Link, Switch, Redirect } from 'react-router-dom';
import HeaderDefine from '../5.Share Component/Context';
import NurseSideBar from '../5.Share Component/SideBar/NurseSideBarComponent';
import { LinkContainer } from 'react-router-bootstrap';

function CreateAnAppointment() {
    const ctx = useContext(HeaderDefine);
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };
    console.log(ctx)
    if (ctx.role !== "Nurse") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
    return (
        <>
            <NurseSideBar />
            <Container>
                <Row>
                    <Col style={{textAlign: 'center'}}>
                        <h1>&nbsp;&nbsp;&nbsp; Tạo lượt điều trị</h1>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                <div class='dung-button-createappointment'>
                    <LinkContainer to='/instant_appointment'>
                        <Button className="dung cart-button">
                            Tức thời
                        </Button>
                    </LinkContainer>
                </div>
                </Col>
                </Row>
                <Row>
                    <Col>
                <div class='dung-button-createappointment aa'>
                    <LinkContainer to='/re-examination_schedule'>
                        <Button className="dung cart-button">
                            Tái khám
                        </Button>
                    </LinkContainer>
                </div>
                </Col>
                </Row>
            </Container>
        </>
    );
}

export default CreateAnAppointment;