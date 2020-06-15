import React from 'react';
import './UserLogo.css';
import logo from '../../Assets/Images/enyata_logo1.png'

const UserLogo = () => {
    return (
        <div className="userlogo">
            <div className="logo">
                <img src={logo} alt="enyata logo" />
            </div>
            <h1>enyata</h1>
        </div>
    )
}

export default UserLogo
