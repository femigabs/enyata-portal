import React from 'react';
import './DashBoard.css';
import SideNav from '../../components/sideNav/SideNav';

const DashBoard = () => {
    return (
        <div className="dashboard">
            <SideNav />
            <div className="dashboard-contents">
                <div className="dashboard-heading">
                    <h1>Dashboard</h1>
                    <p>Your Application is currently being review, you wil be notified if successful</p>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
