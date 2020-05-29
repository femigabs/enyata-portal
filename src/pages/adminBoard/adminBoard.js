import React from 'react';
import './adminBoard.css';
import AdminNav from '../../components/adminNav/adminNav';

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