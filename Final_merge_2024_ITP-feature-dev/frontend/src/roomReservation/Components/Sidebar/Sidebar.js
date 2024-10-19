import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../Sidebar/Sidebar.css'; 

const Sidebar = () => {
    return (
        <Menu>
            <a className="menu-item" href="/">Home</a>
            <a className="menu-item" href="/about">Room Reservation</a>
            <a className="menu-item" href="/services">Employee Management System</a>
            <a className="menu-item" href="/contact">Contact Us</a>
        </Menu>
    );
};

export default Sidebar;