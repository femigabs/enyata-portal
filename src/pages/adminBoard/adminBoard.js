import React, { useState, useEffect } from 'react';
import './AdminBoard.css';
import AdminNav from '../../components/adminNav/AdminNav';
import Cookies from "js-cookie";
import menud from '../../Assets/Icons/menu.svg';
import axios from "axios";
import { useHistory} from 'react-router-dom'
import Moment from 'react-moment';
import Skeleton , { SkeletonTheme } from "react-loading-skeleton";
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

    const [state, setState] = useState({ 
        data: [],
        loading:true
    });
    useEffect(() => {
        axios.get("/api/v1/getTotal", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                setState({
                    data: response.data,
                    loading:false
                })
            })
            .catch((err) => {
                console.log(err.response);
                if(err.response.data.message=="Authorization Failed"){
                    history.push("/admin")
                }
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
                    data: response.data.rows[0].count
                })
            })
            .catch((err) => {
                console.log("Error:", err.response);
            });
    }, []);

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
                    data: response.data.rows
                })
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);
    let histories
    if (total.data){
        histories = total.data.map((items)=>{
            return(
                <tr className="table-row">
                <td>academy {items.batch_id}</td>
                <td>students {items.students}</td>
                <td>started  <Moment format="DD/MM/YY">{items.started}</Moment></td>
            </tr>
            )
        })
    }

    const [currentAcademy, setCurrentAcademy] = useState();
    useEffect(() => {
        axios.get("/api/v1/getCurrentAcademy", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                setCurrentAcademy(response.data)
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);

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
                    {state.loading ? <SkeletonTheme color=" #5ABEFD" highlightColor="rgb(184, 164, 164)">
                        <p>
                            <Skeleton count={2} />
                        </p>
                        </SkeletonTheme>:
                    <>
                    <div className="dash-heading">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="row application-info">
                        <div className="col-md-3 application-curr">
                            <h5>Current Applications</h5>
                            <h2>{state.data.currentApplication}</h2>
                            <p>Academy {currentAcademy}</p>
                        </div>
                        <div className="col-md-3 application-total">
                            <h5>Total Application</h5>
                            <h2>{state.data.totalApplication}</h2>
                            <p>All entries so far</p>
                        </div>
                        <div className="col-md-3 academy">
                            <h5>Academy's</h5>
                            <h2>{academy.data}</h2>
                            <p>so far</p>
                        </div>
                    </div>
                    <div className="row dash-info">
                        <div className="col-md-6">
                            <div className="history">
                                <h6>History</h6>
                                <p>Last Update, {day} </p>
                                <div className="history-info">
                                    <table
                                        className="table table-body table-sm"
                                        width="100%">
                                        {histories}
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
                </>
            }</div>
            </div>
        </div>
    )
}


export default AdminBoard;