import React, { useState, useEffect } from 'react';
import './Assessment.css';
import SideNav from '../../components/sideNav/SideNav';
import menu from '../../Assets/Icons/menu.svg';
import hourglass from '../../Assets/Images/hourglass (1).png';
import Cookies from "js-cookie";
import axios from "axios";
import Moment from 'react-moment';
import Countdown, {zeroPad } from 'react-countdown';
import { useHistory } from 'react-router-dom';
import Skeleton, {SkeletonTheme}  from 'react-loading-skeleton';

const Assessment = () => {

    const history = useHistory()

    const [disable, setDisable] = useState( {
        disable: false,
        errorMessage: '',
        loading:"true"
    })
    if(!Cookies.get("token")){
        history.push("/login")
    }
    const renderer = ({ minutes, seconds }) => {
        return <div>{zeroPad(minutes)}<sub>min</sub> 0{zeroPad(seconds)}<sub>sec</sub></div>
    };
       
        const handleSubmit = (e) => {
            e.preventDefault();
            history.push("/assessment/quiz");
        }

        useEffect(() => {
            axios.get("https://academy-porta.herokuapp.com/api/v1/getQuestion",{
                "headers": {
                    "Content-Type": "application/json",
                    "token": Cookies.get("token")
                }
            })
                .then(response => {
                    console.log(response)
                    setDisable({
                        loading:false
                    })
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    if(err.response.data.message=="Error getting Batch_id"){
                        setDisable({
                        disable:true,
                        errorMessage:"Apply to take Assessment",
                        loading: false
                        })
                    }else{
                    setDisable({
                        disable:true,
                        errorMessage:err.response.data.message,
                        loading: false
                    })
                }
                })
        }, []);

        return (
            <div>
                <div className="assessment">
                    <SideNav />
                    <div className="container assessment-contents">
                    {disable.loading? <SkeletonTheme color="#2B3C4E" highlightColor="rgb(145, 155, 167)">
                        <p>
                            <Skeleton count={2} />
                        </p>
                        </SkeletonTheme>:
                    <>
                        <div className="assessment-heading">
                            <div className="ass">
                                <h1>Take Assessment</h1>
                                <p>Click the button below to start assessment, you have limited time for this test</p>
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
                            <div className="card-body take-ass">
                                <img src={hourglass} />
                                <p>Check back for the next assessment  <br />Watch this space</p>
                                <button onClick={handleSubmit} disabled={disable.disable} className="btn btn-success">Take Assessment</button>
                                {disable.errorMessage && 
                                <h5 className="error" style={{ color: "Red" }}> {disable.errorMessage}</h5>}
                            </div>
                        </div>
                    </>
                } </div> 
                </div>
            </div>
        )
    }

    export default Assessment