import React, { Component } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';
import { FaHeart, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class NurseSideBar extends Component {
    render() {
        return (
            <ProSidebar className="cat-nurse-sidebar">
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'black'
                        }}
                    >
                        <img alt="Logo" style={{ 'margin-right': '5px', 'margin-top': '-5px' }} height="45.88px" width="45px" src="/assets/images/sub_logo.png" />
                        <span> Điều dưỡng </span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaHeart />}>
                            Quản lý thuốc
                            <Link to='/manage_drug' />
                        </MenuItem>
                        <SubMenu title="Quản lý đơn thuốc" icon={<FaHeart />}>
                            <MenuItem>
                                Xem thông tin đơn thuốc
                                <Link to='/view_order' />
                            </MenuItem>
                            <MenuItem>
                                Thống kê doanh thu
                                <Link to='/statistic_order' />
                            </MenuItem>
                        </SubMenu>
                        <MenuItem icon={<FaHeart />}>Tạo lượt điều trị
                            <Link to='/createanappointment' />
                        </MenuItem>
                        <MenuItem icon={<FaHeart />}>Thống kê lượt điều trị
                            <Link to='/statistic_treatment' />
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{
                            textDecoration: 'none', color: 'black',
                            border: '1px solid', borderRadius: '15px',
                            width: '150px', height: '35px', margin: 'auto', 'padding-top': '5px'
                        }}>
                            <a
                                href="https://github.com/giacat2411/IS_Pharmacy"
                                target="_blank"
                                className="sidebar-btn"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                <FaGithub />
                                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    &nbsp; View Source
                                </span>
                            </a>
                        </div>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        );
    }
}

export default NurseSideBar;