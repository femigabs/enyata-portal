import React from 'react';
import './AdminBoard.css';
import AdminNav from '../../components/adminNav/AdminNav';

const AdminBoard = () => {
    return (
        <div className="dash">
            <AdminNav />
            <div className="dash-contents">
                <div className="dash-heading">
                    <h1>Dashboard</h1>
                </div>
            </div>
        </div>
    )
}


export default AdminBoard