import React from 'react'
import Countdown, { zeroPad } from 'react-countdown';
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {useState} from "react"

const Count_down = () => {
    const renderer = ({ minutes, seconds }) => {
        return <span>{zeroPad(minutes)}<sub>min</sub> 0{zeroPad(seconds)}<sub>sec</sub></span>
    };
    const [answer,setAnswer] = useState([
        {
            "question_id": "1",
            "user_answer": "a",

        },
        {
            "question_id": "2",
            "user_answer": "b",

        },
        {
            "question_id": "3",
            "user_answer": "c",

        }

    ])
    const history = useHistory()
    const Complete = () => {
        axios.post("/api/v1/userAns", answer, {
        "headers": {
        "Content-Type": "application/json",
        "token": Cookies.get("token")
        }
        })
        .then(response => {
        console.log(response.data)
        history.push("/completed")
        })
        .catch(err => {
        console.log(err.response)
        })
        history.push("/completed")
    }
    return (
        <>
            <Countdown onComplete={Complete}
                date={Date.now() + 18000}
                renderer={renderer}
            />
        </>
    )
}

export default React.memo(Count_down)

