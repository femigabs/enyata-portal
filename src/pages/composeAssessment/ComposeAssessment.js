import React, { useState, useEffect } from 'react';
import './ComposeAssessment.css';
import AdminNav from '../../components/adminNav/AdminNav';
import menu from '../../Assets/Icons/menu.svg';
import Plus from '../../Assets/Icons/createapp-icon.png';
import Cookies from "js-cookie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import axios from "axios";
import { useHistory } from 'react-router-dom';

const ComposeAssessment = () => {

    const history = useHistory()

    if(!Cookies.get("token")){
        history.push("/admin")
    }

    const [state, setState] = useState({
        file_url: "",
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        option_answer: "",
        questionError: "",
        option_aError: "",
        option_bError: "",
        option_cError: "",
        option_dError: "",
        option_answerError: ""
    });

    const [questions, updateQuestions] = useState([]);

    const [questionStep, setQuestionStep] = useState({
        currentQuestion: 0,
        prevDisabled: true,
        nextDisabled: false
    })

    const [time, setTime] = useState({
        time_min: "00",
        time_sec: "00"
    })
    const [states, setStates] = useState({
        items: [],
        successMessage: "",
        errorMessage: '',
        loading: false
    })
    setTimeout(() => {
        setStates({ errorMessage: "" })
    }, 10000);


    const handleTime = (e) => {
        e.preventDefault()
        setTime({
            ...time,
            [e.target.name]: e.target.value
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const validAnswerRegex = RegExp(/^[A-Da-d]{1}$/)

    const validate = () => {
        let questionError = "";
        let option_aError = "";
        let option_bError = "";
        let option_cError = "";
        let option_dError = "";
        let option_answerError = ""

        if (!state.question) {
            questionError = "Please fill in question field"
        }

        if (!state.option_a) {
            option_aError = "Please fill in Option A field"
        }

        if (!state.option_b) {
            option_bError = "Please fill in Option B field"
        }

        if (!state.option_c) {
            option_cError = "Please fill in Option C field"
        }

        if (!state.option_d) {
            option_dError = "Please fill in Option D field"
        }

        if (!validAnswerRegex.test(state.option_answer)) {
            option_answerError = "Answer Field Must Contain either a,b,c or d"
        }

        if (questionError || option_aError || option_bError || option_cError || option_dError || option_answerError) {
            setState({ questionError, option_aError, option_bError, option_cError, option_dError, option_answerError });
            return false
        }
        return true
    }

    const [image, setImage] = useState();
    const uploadFile = async (e) => {
        const files = e.target.files[0];
        console.log(e.target.files[0])
        const formData = new FormData();
        formData.append("upload_preset", "q3swu36z");
        formData.append("file", files);
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/ddq1cxfz9/image/upload", formData);
            const fileUrl = res.data.secure_url;
            console.log(fileUrl);
            setImage(fileUrl)
        } catch (err) {
            console.log(err)
        };
    };

    const handleNext = (e) => {
        e.preventDefault()
        const { currentQuestion } = questionStep;
        console.log(questionStep);
        console.log(questions);

        const isValid = validate();
        if (isValid) {
            console.log(state)
        }

        if (currentQuestion == questions.length) {
            if (state.question && state.option_a && state.option_b && state.option_answer) {
                updateQuestions([ ...questions, state])

                setState({
                    file_url: "",
                    question: "",
                    option_a: "",
                    option_b: "",
                    option_c: "",
                    option_d: "",
                    option_answer: ""
                })

                setQuestionStep({
                    currentQuestion: currentQuestion + 1,
                    prevDisabled: false
                })
            }

        } else if (currentQuestion == questions.length - 1) {
            if (state.question && state.option_a && state.option_b && state.option_answer) {
                let copy = [...questions]
                copy[currentQuestion] = state
                updateQuestions([...copy])

                setState({
                    file_url: "",
                    question: "",
                    option_a: "",
                    option_b: "",
                    option_c: "",
                    option_d: "",
                    option_answer: "",
                })

                setQuestionStep({
                    currentQuestion: currentQuestion + 1,
                    prevDisabled: false,
                })
            }
        } else {
            if (state.question && state.option_a && state.option_b && state.option_answer) {
                let copy = [...questions]
                copy[currentQuestion] = state
                updateQuestions([...copy])

                setState({
                    file_url: questions[currentQuestion + 1].file_url,
                    question: questions[currentQuestion + 1].question,
                    option_a: questions[currentQuestion + 1].option_a,
                    option_b: questions[currentQuestion + 1].option_b,
                    option_c: questions[currentQuestion + 1].option_c,
                    option_d: questions[currentQuestion + 1].option_d,
                    option_answer: questions[currentQuestion + 1].option_answer,
                })

                setQuestionStep({
                    currentQuestion: currentQuestion,
                    prevDisabled: false
                })
            }

        }

    }

    const handlePrevious = (e) => {
        e.preventDefault(e)
        const { currentQuestion } = questionStep
        console.log(questionStep)
        console.log(questions)

        if (currentQuestion == 1) {
            let copy = [...questions]
            copy[currentQuestion] = state
            updateQuestions([...copy])

            setState({
                file_url: questions[currentQuestion - 1].file_url,
                question: questions[currentQuestion - 1].question,
                option_a: questions[currentQuestion - 1].option_a,
                option_b: questions[currentQuestion - 1].option_b,
                option_c: questions[currentQuestion - 1].option_c,
                option_d: questions[currentQuestion - 1].option_d,
                option_answer: questions[currentQuestion - 1].option_answer,
            })

            setQuestionStep({
                currentQuestion: currentQuestion - 1,
                prevDisabled: true,
            })
        } else {
            if (state.question && state.option_a && state.option_b && state.option_answer) {
                let copy = [...questions]
                copy[currentQuestion] = state
                updateQuestions([...copy])
            }

            setState({
                file_url: questions[currentQuestion - 1].file_url,
                question: questions[currentQuestion - 1].question,
                option_a: questions[currentQuestion - 1].option_a,
                option_b: questions[currentQuestion - 1].option_b,
                option_c: questions[currentQuestion - 1].option_c,
                option_d: questions[currentQuestion - 1].option_d,
                option_answer: questions[currentQuestion - 1].option_answer,
            })

            setQuestionStep({
                currentQuestion: currentQuestion - 1,
                prevDisabled: false,
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let number_of_question = questions.length;
        let time_allocated = time.time_min
        let assRequest = { time_allocated, number_of_question };
        console.log(assRequest)
        axios.post("/api/v1/assessment", questions, {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                console.log(response.data)
                setStates({
                    successMessage: response.data.message,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err.response.data)
                setStates({
                    errorMessage: err.response.data.message,
                    loading: false
                })
            })

        axios.post("/api/v1/assessmentHistory", assRequest, {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
        setStates({
            loading: true
        })
    }

    return (
        <div>
            <div className="compose">
                <AdminNav />
                <div className="compose-structure">
                    <div className="compose-heading">
                        <h1>Compose Assessment</h1>
                        <h3>{questionStep.currentQuestion + 1}/30</h3>
                    </div>

                    <form>
                        <div className="">
                            <div className="compose-file">
                                <div className="cv">
                                    <input className="inputfile" id="file_img" type="file" name="pick_file" accept="pdf" onChange={uploadFile} />
                                    <label htmlFor="file_img"><img src={Plus} alt="createapp-icon" /> Upload file</label>
                                </div>
                                <div className="time">
                                    <h2>Set Timer</h2>
                                    <div className="time-boxes">
                                        <div className="time-min">
                                            <select name="time_min" value={time.time_min} onChange={handleTime} className="time-box" id="time" >
                                                <option value="0" selected>00</option>
                                                <option value="5">05</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="30">30</option>
                                            </select>
                                            <sub>min</sub>
                                        </div>
                                        <div className="time-sec">
                                            <select name="time_sec" value={time.time_sec} onChange={handleTime} className="time-box" id="time" >
                                                <option value="00" selected>000</option>
                                                <option value="10">010</option>
                                                <option value="20">020</option>
                                                <option value="30">030</option>
                                                <option value="40">040</option>
                                                <option value="50">050</option>
                                                <option value="60">060</option>
                                            </select>
                                            <sub>sec</sub>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form">
                                <div className="my-question">
                                    <label>Question</label>
                                    <textarea
                                        className="form-control textarea"
                                        type="text"
                                        name="question"
                                        value={state.question}
                                        onChange={handleChange}
                                    />
                                    <p className='errors'>{state.questionError}</p>
                                </div>
                                <div className="option-grid">
                                    <div className="">
                                        <label>Option A</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="option_a"
                                            value={state.option_a}
                                            onChange={handleChange}
                                        />
                                        <p className='errors'>{state.option_aError}</p>
                                    </div>
                                    <div className="">
                                        <label>Option B</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="option_b"
                                            value={state.option_b}
                                            onChange={handleChange}
                                        />
                                        <p className='errors'>{state.option_bError}</p>
                                    </div>
                                </div>
                                <div className="option-grid2">
                                    <div className="">
                                        <label>Option C</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="option_c"
                                            value={state.option_c}
                                            onChange={handleChange}
                                        />
                                        <p className='errors'>{state.option_cError}</p>
                                    </div>
                                    <div className="">
                                        <label>Option D</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="option_d"
                                            value={state.option_d}
                                            onChange={handleChange}
                                        />
                                        <p className='errors'>{state.option_dError}</p>
                                    </div>
                                </div>
                                <div className="form-group answer">
                                    <label>Answer</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="option_answer"
                                        value={state.option_answer}
                                        onChange={handleChange}
                                    />
                                    <p className='errors'>{state.option_answerError}</p>
                                </div>
                            </div>
                            <div className="form-group col-md-6" style={{ display: "none" }}>
                                <label>file_url</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="file_url"
                                    value={image}
                                />
                            </div>
                            <div className="quiz">
                                <div className="col-md-6 quiz-button">
                                    <button disabled={questionStep.prevDisabled} onClick={handlePrevious} className="btn btn-primary">Previous</button>
                                </div>
                                <div className="col-md-6 quiz-button">
                                    <button disabled={questionStep.nextDisabled || questionStep.currentQuestion == 30} onClick={handleNext} className="btn btn-primary">Next</button>
                                </div>
                                {states.loading && <Loader
                                    type="ThreeDots"
                                    color="#00BFFF"
                                    height={30}
                                    width={100}
                                    timeout={10000}
                                />}
                                {states.errorMessage &&
                                    <h5 className="error" style={{ color: "Red" }}> {states.errorMessage} </h5>}
                                {states.successMessage &&
                                    <h5 className="success" style={{ color: "Green" }}> {states.successMessage} </h5>}
                                <div className="col-md-12 finish-button">
                                    <button onClick={handleSubmit} type="submit" className="btn btn-success">Finish</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ComposeAssessment;
