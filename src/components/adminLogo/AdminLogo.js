import React from 'react';
import './AdminLogo.css';
import white from '../../Assets/Images/enyata-logo2.png'

const AdminLogo = () => {
    return (
        <div className="adminLogo">
            <div className="whit">
                <img src={white} alt="enyata white" />
            </div>
            <h1>enyata</h1>
        </div>
    )
}

export default AdminLogo;
