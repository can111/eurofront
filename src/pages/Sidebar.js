import React from 'react';
import {FaChartPie, FaWallet, FaExchangeAlt, FaUserShield, FaLink} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <FaLink size={30} className="sidebar-logo-icon"/>
                <h1 className="sidebar-logo-title">Akbank Crypto Custody</h1>
            </div>
            <div className="sidebar-menu">
                <Link to="/dashboard" className="sidebar-item">
                    <FaChartPie/>
                    <span>Dashboard</span>
                </Link>
                <Link to="/portfolio" className="sidebar-item">
                    <FaWallet/>
                    <span>Portfolio</span>
                </Link>
                <Link to="/transaction" className="sidebar-item">
                    <FaExchangeAlt/>
                    <span>Transaction</span>
                </Link>
                <Link to="/admin" className="sidebar-item">
                    <FaUserShield/>
                    <span>Admin</span>
                </Link>
            </div>
            <div className="sidebar-footer">
                Logged in as: <br/>
                admin@example.com
            </div>
        </div>
    );
};

export default Sidebar;
