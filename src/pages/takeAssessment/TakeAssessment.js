import React, { useState, useEffect } from 'react';
import './TakeAssessment.css';
import SideNav from '../../components/sideNav/SideNav';
import menu from '../../Assets/Icons/menu.svg';
import Cookies from "js-cookie";
import axios from "axios";
import Countdown, { zeroPad } from 'react-countdown';
import { useHistory } from 'react-router-dom';

const TakeAssessment = () => {

    const history = useHistory()

    const [count, setCount] = useState(0)
    const [state, setState] = useState({
        question: []
    })
    const [selectAnswer, setSelectAnswer] = useState([])

    const handleAnswer = (e) => {
        setSelectAnswer([...selectAnswer,{
            "question_id": e.target.id,
            "user_answer": e.target.value
        }])
    }
    console.log(selectAnswer)

const renderer = ({ minutes, seconds }) => {
    return <span>{zeroPad(minutes)}<sub>min</sub> 0{zeroPad(seconds)}<sub>sec</sub></span>
};

useEffect(() => {
    let hamburger = document.getElementById("img"),
        menuLink = document.getElementById("sidenav")

    hamburger.addEventListener('click', function (e) {
        menuLink.classList.toggle('hidden-xs')
        e.preventDefault()
    })
})

const url = `/api/v1/getQuestion`
useEffect(() => {
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": Cookies.get("token")
        },
        mode: "cors",
    })
        .then((response) => response.json())
        .then((json) => {
            setState({ question: json })

        })
        .catch((err) => {
            console.log("Error:", err.message);
        });
}, []);

// const itemsToRender = question.data.map((items, index) => {
//     return <tr key={index}>
//         <td>{items.question}</td>
//         <td>{items.option_a}</td>
//         <td>{items.option_b}</td>
//         <td>{items.option_c}</td>
//         <td>{items.cgpa}</td>
//     </tr>
// })
// console.log(itemsToRender)

const handleFinish = (e) => {
    e.preventDefault();

    axios.post("/api/v1/userAns", selectAnswer, {
        "headers": {
            "Content-Type": "application/json",
            "token": Cookies.get("token")
        }
    })
        .then(response => {
            console.log(response.data)
            Cookies.g('token', response.data.token);
            history.push("/completed")
        })
        .catch(err => {
            console.log(err.response)
        })
}


const [buttonDisabled, setButtonDisabled] = useState(false)

const handleNext = (e) => {
    e.preventDefault();
    setCount(count + 1)
}

console.log(count)

if ((count) == state.question.length - 1) {
    setButtonDisabled(true)
}
console.log(state.question.length)

const handlePrevious = (e) => {
    e.preventDefault();
    setCount(count - 1)
}

return (
    <div>
        <div className="menu">
            <img src={menu} id="img" className="visible-xs" style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }} />
        </div>
        <div className="assessment">
            <SideNav />
            <div className="container assessment-contents">
                <div className="assessment-heading">
                    <div className="ass">
                        <h1>Take Assessment</h1>
                        <p>Click the finish button below to submit assessment, you can go back at any time to edit your answers.</p>
                    </div>
                    <div className="timer">
                        <p>Timer</p>
                        <h1>
                            <Countdown
                                date={Date.now() + 1800000}
                                renderer={renderer}
                            />
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 take-ass">
                        <div className="card body">
                            <div className="card-body quiz">
                                {state.question.length > 0 && <><p>Question {count + 1}</p>
                                    <h3>{state.question[count].question}</h3>
                                    <form className="quiz-form">
                                        <div className="questions">
                                            <input type="radio" id={state.question[count].id} name="option" value="a" onChange={handleAnswer} />
                                            <label htmlFor="option_a">{state.question[count].option_a}</label><br />
                                        </div>
                                        <div className="questions">
                                            <input type="radio" id={state.question[count].id} name="option" value="b" onChange={handleAnswer} />
                                            <label htmlFor="option_b">{state.question[count].option_b}</label><br />
                                        </div>
                                        <div className="questions">
                                            <input type="radio" id={state.question[count].id} name="option" value="c" onChange={handleAnswer} />
                                            <label htmlFor="option_c">{state.question[count].option_c}</label><br />
                                        </div>
                                        <div className="questions">
                                            <input type="radio" id={state.question[count].id} name="option" value="d" onChange={handleAnswer} />
                                            <label htmlFor="option_d">{state.question[count].option_d}</label><br />
                                        </div>
                                    </form></>}
                            </div>
                        </div>
                        <div className="col-md-6 quiz-button">
                            <button onClick={handlePrevious} className="btn btn-primary">Previous</button>
                        </div>
                        <div className="col-md-6 quiz-button">
                            <button disabled={buttonDisabled} onClick={handleNext} className="btn btn-primary">Next</button>
                        </div>
                        <div className="col-md-12 finish-button">
                            <button onClick={handleFinish} className="btn btn-default">Finish</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
)
}

export default TakeAssessment;