import React, { useState, useEffect } from 'react';
import './AdminBoard.css';
import AdminNav from '../../components/adminNav/AdminNav';
import Cookies from "js-cookie";
import menud from '../../Assets/Icons/menu.svg';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom'
import Moment from 'react-moment';

const AdminBoard = () => {

    const history = useHistory()

    useEffect(() => {
        let hamburger = document.getElementById("img"),
            menuLinK = document.getElementById("adminnav")

        hamburger.addEventListener('click', function (e) {
            menuLinK.classList.toggle('hidden-xs')
            e.preventDefault()
        })
    })

    const [state, setState] = useState({ data: [] });
    useEffect(() => {
        axios.get("/api/v1/getTotal", {
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

    const [academy, setAcademy] = useState({ data: [] });
    useEffect(() => {
        axios.get("/api/v1/academySoFar", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                setAcademy({
                    data: response.data
                })
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);
    console.log(academy.data)

    const [total, setTotal] = useState({ data: [] });
    useEffect(() => {
        axios.get("/api/v1/academy", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                setTotal({
                    data: response.data
                })
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);


    const [update, setUpdate] = useState({ updates: [] });
    useEffect(() => {
        axios.get("/api/v1/getUpdate", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                setUpdate({
                    updates: response.data
                })
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);
// console.log(update)
    const day = <Moment format="DD.MM.YY">{state.data.Application_date}</Moment>

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/composeassessment");
    }

    return (
        <div>
            <div className="menud">
                <img src={menud} id="img" className="visible-xs" style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }} />
            </div>
            <div className="dash">
                <AdminNav />
                <div className="container dash-contents">
                    <div className="dash-heading">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="row application-info">
                        <div className="col-md-3 application-curr">
                            <h5>Current Applications</h5>
                            <h2>{state.data.currentApplication}</h2>
                            <p>Academy 2.0</p>
                        </div>
                        <div className="col-md-3 application-total">
                            <h5>Total Application</h5>
                            <h2>{state.data.totalApplication}</h2>
                            <p>All entries so far</p>
                        </div>
                        <div className="col-md-3 academy">
                            <h5>Academy's</h5>
<<<<<<< HEAD
                            <h2>4</h2>
=======
                            <h2>{academy.data.count}4</h2>
>>>>>>> 2d46478d82d1c0d15fdf4beb16108c246837e503
                            <p>so far</p>
                        </div>
                    </div>
                    <div className="row dash-info">
                        <div className="col-md-6">
                            <div className="history">
                                <h6>History</h6>
                                <p>Last Update, {day} </p>
<<<<<<< HEAD
                            </div>
                            <div>
                                <div className="">
=======
                                <div className="history-info">
>>>>>>> 2d46478d82d1c0d15fdf4beb16108c246837e503
                                    <table
                                        className="table table-body table-sm"
                                        width="100%">
                                        <tr className="table-row">
                                            <td>academy 1</td>
                                            <td>academy 2</td>
                                            <td>academy 3</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td>academy 1</td>
                                            <td>academy 2</td>
                                            <td>academy 3</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td>academy 1</td>
                                            <td>15 students</td>
                                            <td>started 11/09/15</td>
                                        </tr>
                                        <tr>
                                            <td>academy 1</td>
                                            <td>15 students</td>
                                            <td>started 11/09/15</td>
                                        </tr>
                                        <tr>
                                            <td>academy 1</td>
                                            <td>15 students</td>
                                            <td>started 11/09/15</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card create-assessment">
                                <div className="card-body">
                                    <h6>Create Assessment</h6>
                                    <p>Create test question for an incoming academy <br />students</p>
                                    <button onClick={handleSubmit} className="btn btn-default">Create Assessment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminBoard;