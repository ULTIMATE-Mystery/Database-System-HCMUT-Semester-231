import React, { useContext } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavItem,
    Collapse, NavbarToggler
} from 'reactstrap';
import { FaHome, FaRegCalendarAlt, FaInfo } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import LogButton from '../ComponentProFile/LogButton';
import HeaderDefine from './Context';

const Header = (props) => {
    const ctx = useContext(HeaderDefine);
    const page = ["Patient", "Doctor", "Nurse"].includes(ctx.role) ? ctx.role.toString() : 'home';
    return (
        <div>
            <Navbar className="navbar-header" color="light"  expand="md"  light container>
                <NavbarToggler />
                <NavbarBrand className="me-auto"><img src='/assets/images/Logo.png' height="38px" width="38px" alt='HealthCare' /></NavbarBrand>
                <Collapse navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to={`/${page}`}><FaHome /> Trang chủ</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/scheduleTable'><FaRegCalendarAlt /> Lịch làm việc</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/contact'><FaInfo /> Liên hệ</NavLink>
                        </NavItem>
                    </Nav>
                    {/* <HeaderDefine.Provider value={ProviderValue}> */}
                    <LogButton updatePage={props.updatePage}/>
                    {/* </HeaderDefine.Provider> */}
                </Collapse>
            </Navbar>
        </div>
    );
}


export default Header;