import React, { useState, useEffect } from 'react';
import './SideNav.css';
import dashboard from '../../Assets/Icons/dashboard-icon.png';
import assessment from '../../Assets/Icons/assessment-icon.png';
import logout from '../../Assets/Icons/logout-icon.png';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie"

const SideNav = () => {

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

    const [state, setState] = useState({ data: [] });
    useEffect(() => {
        axios.get("/api/v1/details", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                setState({
                    data: response.data
                })
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);
    return (
        <div id="sidenav" className="sidenav hidden-xs">
            <div className="user-profile">
                <input className="inputfile" id="file" type="file" name="file" onChange={uploadImage} />
                <div className="user-image">
                    <label htmlFor="file">Choose a files</label>
                    {loading ? "loading..." : <img src={image} alt="" />}
                </div>
        <h3>{state.data.first_name } {state.data.last_name}</h3>
                <p>{state.data.email}</p>
            </div>
            <div className="sidenav-text">
                <div className="sidenav-links">
                    <NavLink
                        className="nav-link"
                        style={{textDecoration: "none"}}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold", 
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/dashboard"
                    >
                        <img className="img" src={dashboard} alt="dashboard" />
                        Dashboard
                    </NavLink>
                </div>
                <div className="sidenav-links">
                    <NavLink
                        className="nav-link"
                        style={{textDecoration: "none"}}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/assessment"
                    >
                        <img className="img" src={assessment} alt="assessment" />
                        Assessment
                    </NavLink>
                </div>
                <div className="sidenav-logout">
                    <NavLink
                         onClick={()=> Cookies.remove('token')}
                        className="nav-link"
                        style={{textDecoration: "none"}}
                        activeStyle={{
                            borderLeft: "solid 4px #31D283",
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "36px",
                            textDecoration: "none"
                        }}
                        exact to="/login">
                        <img className="img" src={logout} alt="logout" />
                        Log Out
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SideNav
