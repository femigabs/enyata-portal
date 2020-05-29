import React, { useState, useEffect } from 'react';
import './Assessment.css';
import SideNav from '../../components/sideNav/SideNav';
import menu from '../../Assets/Icons/menu.svg';
import hourglass from '../../Assets/Images/hourglass (1).png';
import Cookies from "js-cookie";
import axios from "axios";
import Moment from 'react-moment';

const Assessment = () => {

    useEffect(() => {
        let hamburger = document.getElementById("img"),
            menuLink = document.getElementById("sidenav")

        hamburger.addEventListener('click', function (e) {
            menuLink.classList.toggle('hidden-xs')
            e.preventDefault()
        })
    })

    return (
        <div>
            <div className="menu">
                <img src={menu} id="img" className="visible-xs" style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }} />
            </div>
            <div className="assessment">
                <SideNav />
                <div className="container assessment-contents">
                    <div className="assessment-heading">
                        <div>
                            <h1>Take Assessment</h1>
                            <p>Click the button below to start assessment, you have limited time for this test</p>
                        </div>
                        <div className="timer">
                            <p>Timer</p>
                            <h1>00<sub>min</sub> 000<sub>sec</sub></h1>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body take-ass">
                            <img src={hourglass} />
                            <p>We have 4 days left until the next assessment <br />Watch this space</p>
                            <button className="btn btn-default">Take Assessment</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Assessment
