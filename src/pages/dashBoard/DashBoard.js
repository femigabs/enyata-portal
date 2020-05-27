import React, { useEffect } from 'react';
import './DashBoard.css';
import SideNav from '../../components/sideNav/SideNav';
import menu from '../../Assets/Icons/menu.svg'

const DashBoard = () => {
    useEffect(() => {
        let hamburger = document.getElementById("img"),
            menuLink = document.getElementById("sidenav")

        hamburger.addEventListener('click', function (e) {
            menuLink.classList.toggle('hidden-xs')
            e.preventDefault()
        })
        console.log(hamburger, menuLink)
    })

    return (
        <div>
            <div className="menu">
                <img src={menu} id="img" className="visible-xs" style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }} />
            </div>
            <div className="dashboard">
                <SideNav />
                <div className="container dashboard-contents">
                    <div className="dashboard-heading">
                        <h1>Dashboard</h1>
                        <p>Your Application is currently being review, you wil be notified if successful</p>
                    </div>
                    <div className="row application-info">
                        <div className="col-md-3 application-date">
                            <h5>Date of Application</h5>
                            <h2>09.09.19</h2>
                            <p>4 days since applied</p>
                        </div>
                        <div className="col-md-3 application-status">
                            <h5>Application Status</h5>
                            <h2>Pending</h2>
                            <p>we will get back to you</p>
                        </div>
                    </div>
                    <div className="row dashboard-info">
                        <div className="col-md-6">
                            <div className="card update">
                                <div class="card-body">
                                    <h6>Updates</h6>
                                    <div className="update-info"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card assessment">
                                <div class="card-body">
                                    <h6>Assessment</h6>
                                    <p>We have 4 days left until the next assessment <br/>Watch this space</p>
                                    <button className="btn btn-default">Take Assessment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;
