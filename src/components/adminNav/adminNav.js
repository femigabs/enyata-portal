import React, { useState } from 'react';
import './AdminNav.css';
import board from '../../Assets/Icons/dashboard-icon.png';
import create from '../../Assets/Icons/createapp-icon.png';
import entry from '../../Assets/Icons/appentries-icon.png';
import compose from '../../Assets/Icons/composeass-icon.png';
import result from '../../Assets/Icons/result-icon.png';
import history from '../../Assets/Icons/asshistory-icon.png';
import axios from "axios";
import { NavLink } from 'react-router-dom';

const AdminNav = () => {

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = (e) => {
        const files = e.target.files[0];
        const formData = new FormData();
        formData.append("upload_preset", "q3swu36z");
        formData.append("file", files);
        setLoading(true);

        axios.post('https://api.cloudinary.com/v1_1/ddq1cxfz9/image/upload', formData)
            .then(res => {
                setImage(res.data.secure_url) 
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="adminnav">
            <div className="profile">
                <input type="file" name="file" onChange={uploadImage} />
                <div className="ad-image">
                    {loading ? "loading..." : <img src={image} alt="image" />}
                </div>
                <h3>John Doe</h3>
                <p>joe@enyata.com</p>
            </div>
            <div className="adminnav-text">
                <div className="adminnav-links">
                    <NavLink
                    className="nav-link"
                    activeStyle={{
                        borderLeft: "solid 4px #31D283",
                        fontWeight: "bold", color: "black",
                        paddingLeft: "36px"
                    }}
                    exact to="/adminBoard">
                        <img className="img" src={board} alt="board" />
                        Dashboard
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px"
                        }}
                        exact to="/"
                    >
                        <img className="img" src={create} alt="craetapp" />
                        Create Application
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px"
                        }}
                        exact to="/"
                    >
                        <img className="img" src={entry} alt="appentries" />
                        Application Entries
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px"
                        }}
                        exact to="/"
                    >
                        <img className="img" src={compose} alt="composeass" />
                        Compose Assessment
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px"
                        }}
                        exact to="/"
                    >
                        <img className="img" src={history} alt="asshistory" />
                        Assessment History
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px"
                        }}
                        exact to="/"
                    >
                        <img className="img" src={result} alt="result" />
                        Results
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default AdminNav
