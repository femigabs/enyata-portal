import React, { useState, useEffect } from 'react';
import './TakeAssessment.css';
import SideNav from '../../components/sideNav/SideNav';
import menu from '../../Assets/Icons/menu.svg';
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import CountDown from '../../components/CountDown'

const TakeAssessment = (props) => {

    const history = useHistory()
    if(!Cookies.get("token")){
        history.push("/login")
    }
    
    const [count, setCount] = useState(0)
    const [state, setState] = useState({
        question: []
    })
    const [selectAnswer, setSelectAnswer] = useState([])

    const handleAnswer = (e) => {
        const index = selectAnswer.findIndex(question => question.question_id == state.question[count].id);
        if (index == -1) {
            setSelectAnswer([...selectAnswer, {
                "question_id": e.target.className,
                "user_answer": e.target.value,
            }])
        }
        if (index || index == 0) {
            selectAnswer[index] = {
                "question_id": e.target.className,
                "user_answer": e.target.value,
            }
        }
    }
    console.log(selectAnswer)

    const url = `https://academy-porta.herokuapp.com/api/v1/getQuestion`
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
            .catch(err => {
                console.log("Error:", err);
            });
    }, []);

    const handleFinish = (e) => {
        e.preventDefault();

        axios.post("https://academy-porta.herokuapp.com/api/v1/userAns", selectAnswer, {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                console.log(response.data)
                history.push("/assessment/quiz/completed")
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const handleNext = (e) => {
        e.preventDefault();
        setCount(count + 1)
        const index = selectAnswer.findIndex(question => question.question_id == state.question[count].id);
        if (index == -1) {
            setSelectAnswer([
                ...selectAnswer, {
                    "question_id": state.question[count].id,
                    "user_answer": "",
                }
            ])
        }
    }

    const handlePrevious = (e) => {
        e.preventDefault();
        setCount(count - 1)
    }

    return (
        <div>
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
                                <CountDown />
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
                                                <input type="radio" id="option_a" className={state.question[count].id} name="option" value="a" onChange={handleAnswer} />
                                                <label htmlFor="option_a">{state.question[count].option_a}</label><br />
                                            </div>
                                            <div className="questions">
                                                <input type="radio" id="option_b" className={state.question[count].id} name="option" value="b" onChange={handleAnswer} />
                                                <label htmlFor="option_b">{state.question[count].option_b}</label><br />
                                            </div>
                                            <div className="questions">
                                                <input type="radio" id="option_c" className={state.question[count].id} name="option" value="c" onChange={handleAnswer} />
                                                <label htmlFor="option_c">{state.question[count].option_c}</label><br />
                                            </div>
                                            <div className="questions">
                                                <input type="radio" id="option_d" className={state.question[count].id} name="option" value="d" onChange={handleAnswer} />
                                                <label htmlFor="option_d">{state.question[count].option_d}</label><br />
                                            </div>
                                        </form></>}
                                </div>
                            </div>
                            <div className="col-md-6 quiz-button">
                                <button disabled={count == 0} onClick={handlePrevious} className="btn btn-primary">Previous</button>
                            </div>
                            <div className="col-md-6 quiz-button">
                                <button disabled={count == state.question.length - 1} onClick={handleNext} className="btn btn-primary">Next</button>
                            </div>
                            <div className="col-md-12 finish-button">
                                <button onClick={handleFinish} className="btn btn-success">Finish</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TakeAssessment;