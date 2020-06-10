import React, { useState, useEffect } from 'react';
import './CompletedAssessment.css';
import SideNav from '../../components/sideNav/SideNav';
import menu from '../../Assets/Icons/menu.svg';
import confetti from '../../Assets/Images/confetti (1).png';
import Cookies from "js-cookie";
import axios from "axios";
import Moment from 'react-moment';
import Countdown, { zeroPad } from 'react-countdown';
import { useHistory } from 'react-router-dom';

const CompletedAssessment = () => {

    const history = useHistory()

    const renderer = ({ minutes, seconds }) => {
        return <span>{zeroPad(minutes)}<sub>min</sub> 0{zeroPad(seconds)}<sub>sec</sub></span>
    };

        const handleSubmit = (e) => {
            e.preventDefault()
            history.push("/dashboard")
    
        }

        return (
            <div>
                <div className="assessment">
                    <SideNav />
                    <div className="container assessment-contents">
                        <div className="assessment-heading">
                            <div className="ass">
                                <h1>Take Assessment</h1>
                                <p>Thank you!</p>
                            </div>
                            <div className="timer">
                                <p>Timer</p>
                                <h1>
                                    <Countdown
                                        date={Date.now() + 1}
                                        renderer={renderer}
                                    />
                                </h1>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body completed-ass">
                                <img src={confetti} />
                                <p>We have received your assessment test, we will get back to you soon.<br/>Best of luck</p>
                                <button onClick={handleSubmit} className="btn btn-success">Home</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    export default CompletedAssessment