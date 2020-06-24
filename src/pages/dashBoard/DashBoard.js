import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import SideNav from '../../components/sideNav/SideNav';
import menu from '../../Assets/Icons/menu.svg';
import Cookies from "js-cookie";
import axios from "axios";
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Skeleton , { SkeletonTheme } from "react-loading-skeleton"


const DashBoard = () => {

    const history = useHistory()

    const [state, setState] = useState({data: []});

    if(!Cookies.get("token")){
        history.push("/login")
    }
    useEffect(() => {
        axios.get("https://academy-porta.herokuapp.com/api/v1/application", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
            
        })
            .then(response =>{
                setState({
                    data: response.data,
                })
            })
            .catch((err) => {
                console.log("Error:", err.response.data.message);
            });
    },[]);

    const [update, setUpdate] = useState({ updates: [], loading: true});
    useEffect(() => {
        axios.get("https://academy-porta.herokuapp.com/api/v1/getUpdate", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                setUpdate({
                    updates: response.data,
                    loading:false
                })
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/assessment");
    }

    const status = state.data.Application_status
    const d = state.data.Application_date
    const date = moment(d).format("DD.MM.YY")
    const applied_date = moment(d).format("YYY.MM.DD")

    let current_date = new Date()
    const now = moment( current_date).format("YYY.MM.DD")
    const end = moment(applied_date);
    current_date  = moment(now)
    const duration = moment.duration(current_date.diff(end)); 
    const days_left= duration.days();

    return (
        <div>
            <div className="dashboard">
                <SideNav />
                <div className="container dashboard-contents">
                {update.loading ? <SkeletonTheme color="#2B3C4E" highlightColor="rgb(145, 155, 167)">
                        <p>
                            <Skeleton count={2} />
                        </p>
                        </SkeletonTheme>:
                    <>
                    <div className="dashboard-heading">
                        <h1>Dashboard</h1>
                        <p>Your Application is currently being review, you wil be notified if successful</p>
                    </div>
                    <div className="row application-info">
                        <div className="col-md-3 application-date">
                            <h5>Date of Application</h5>
                            <h2>{state.data.Application_date && date}</h2>
                            <p>{days_left} days since applied</p>
                        </div>
                        <div className="col-md-3 application-status">
                            <h5>Application Status</h5>
                            <h2>{status}</h2>
                            <p>we will get back to you</p>
                        </div>
                    </div>
                    <div className="row dashboard-info">
                        <div className="col-md-6">
                            <div className="card update">
                                <div className="card-body">
                                    <h6>Updates</h6>
                                    <div className="update-info">
                                        <h5>{update.updates.instruction}</h5>
                                        <a href={update.updates.link}>Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card take-assessment">
                                <div className="card-body">
                                    <h6>Assessment</h6>
                                    <p>Check back for the next assessment <br />Watch this space</p>
                                    <button onClick={handleSubmit} className="btn btn-success">Take Assessment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                }</div>
            </div>
          
                </div>
    )
}

export default DashBoard;