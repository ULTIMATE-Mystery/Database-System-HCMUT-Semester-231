import React, { Component } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';
import { FaGem, FaHeart, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class DoctorSideBar extends Component {
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
                        <img style={{ 'margin-right': '5px', 'margin-top': '-5px' }} height="45.88px" width="45px" src="/assets/images/sub_logo.png" />
                        <span> Tính năng bác sĩ </span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaHeart />}>Tra cứu lịch sử điều trị
                            <Link to="/view_medical_record" />
                        </MenuItem>
                        <MenuItem icon={<FaHeart />}>Thống kê lượt điều trị
                            <Link to='/statistic_treatment' />
                        </MenuItem>
                        <MenuItem icon={<FaHeart />}>Quản lý lịch làm việc
                            <Link to="/scheduleTable" />
                        </MenuItem>
                        <MenuItem icon={<FaHeart />}>Quản lý nhân sự
                            <Link to="/HR" />
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

export default DoctorSideBar;