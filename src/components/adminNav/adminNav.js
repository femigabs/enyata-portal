import React, { useState } from 'react';
import './AdminNav.css';
import board from '../../Assets/Icons/dashboard-icon.png';
import create from '../../Assets/Icons/createapp-icon.png';
import entry from '../../Assets/Icons/appentries-icon.png';
import compose from '../../Assets/Icons/composeass-icon.png';
import result from '../../Assets/Icons/result-icon.png';
import history from '../../Assets/Icons/asshistory-icon.png';
import logout from '../../Assets/Icons/logout-icon.png';
import axios from "axios";
import { NavLink } from 'react-router-dom';

const AdminNav = () => {

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files[0];
        const formData = new FormData();
        formData.append("upload_preset", "q3swu36z");
        formData.append("file", files);
        try {
            setLoading(true);
            const res = await axios.post("https://api.cloudinary.com/v1_1/ddq1cxfz9/image/upload", formData);
            const imageUrl = res.data.secure_url;
            setLoading(false)
            setImage(imageUrl.data);
        } catch (err) {
            console.log(err)
        };
    };

    return (
        <div className="adminnav">
            <div className="profile">
                <input className="inputfile" id="file" type="file" name="file" onChange={uploadImage} />
                <div className="ad-image">
                    <label htmlFor="file">Choose a files</label>
                    {loading ? "loading..." : <img src={image} alt="" />}
                </div>
                <h3>John Doe</h3>
                <p>joe@enyata.com</p>
            </div>
            <div className="adminnav-text">
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold", color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/adminboard"
                    >
                        <img className="img" src={board} alt="board" />
                        Dashboard
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/createapplication"
                    >
                        <img className="img" src={create} alt="craetapp" />
                        Create Application
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/adminentries"
                    >
                        <img className="img" src={entry} alt="appentries" />
                        Application Entries
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/composeassessment"
                    >
                        <img className="img" src={compose} alt="composeass" />
                        Compose Assessment
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/assessmenthistory"
                    >
                        <img className="img" src={history} alt="asshistory" />
                        Assessment History
                    </NavLink>
                </div>
                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/results"
                    >
                        <img className="img" src={result} alt="result" />
                        Results
                    </NavLink>
                </div>
                                <div className="adminnav-links">
                    <NavLink
                        className="nav-link"
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/logout"
                    >
                        <img className="img" src={logout} alt="result" />
                        Logout
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default AdminNav
