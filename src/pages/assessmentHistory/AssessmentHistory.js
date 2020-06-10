import React, { useState, useEffect } from 'react';
import './AssessmentHistory.css';
import { useForm } from "react-hook-form";
import AdminNav from '../../components/adminNav/AdminNav';
import menu from '../../Assets/Icons/menu.svg';
import Cookies from "js-cookie";
import axios from "axios";
import Plus from "../../Assets/Icons/createapp-icon.png";
import Moment from 'react-moment';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AssessmentHistory = (props) => {

    const [state, setState] = useState({
        file_url: "",
        question: "dhgxhfhj",
        option_a: "sadgh",
        option_b: "khjhhg",
        option_c: "gddde",
        option_d: "kgff",
        option_answer: "a",
        id: "34",
        batch_id: "9",
    });

    const [isInEditMode, setIsInEditMode] = useState(false)

    const [questions, updateQuestions] = useState({
        data: []
    });

    const [questionStep, setQuestionStep] = useState({
        currentQuestion: 0,
        prevDisabled: true,
        nextDisabled: false
    })

    const [time, setTime] = useState({
        time_min: "00",
        time_sec: "00"
    })

    const [assessmentId, setAssessmentId] = useState()

    const handleTime = (e) => {
        e.preventDefault()
        setTime({
            ...time,
            [e.target.name]: e.target.value
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
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

    const [storeQuestions, updateStoreQuestions] = useState([])

    const handleNext = (e) => {
        e.preventDefault()
        const { currentQuestion } = questionStep
        console.log(questionStep)
        console.log(state)
        console.log(storeQuestions)

        if (currentQuestion == 0) {
            console.log('hello')
            updateStoreQuestions([...storeQuestions, state])

            setState({
                file_url: questions.data[currentQuestion + 1].file_url,
                question: questions.data[currentQuestion + 1].question,
                option_a: questions.data[currentQuestion + 1].option_a,
                option_b: questions.data[currentQuestion + 1].option_b,
                option_c: questions.data[currentQuestion + 1].option_c,
                option_d: questions.data[currentQuestion + 1].option_d,
                option_answer: questions.data[currentQuestion + 1].option_answer,
                id: questions.data[currentQuestion + 1].id,
                batch_id: questions.data[currentQuestion + 1].batch_id
            })

            setQuestionStep({
                currentQuestion: currentQuestion + 1,
                prevDisabled: false
            })
        } else {
            if (currentQuestion >= 0) {
                console.log('hello2')
                let copy = [...storeQuestions]
                copy[currentQuestion] = state
                updateStoreQuestions([...copy])

                setState({
                    file_url: questions.data[currentQuestion + 1].file_url,
                    question: questions.data[currentQuestion + 1].question,
                    option_a: questions.data[currentQuestion + 1].option_a,
                    option_b: questions.data[currentQuestion + 1].option_b,
                    option_c: questions.data[currentQuestion + 1].option_c,
                    option_d: questions.data[currentQuestion + 1].option_d,
                    option_answer: questions.data[currentQuestion + 1].option_answer,
                    id: questions.data[currentQuestion + 1].id,
                    batch_id: questions.data[currentQuestion + 1].batch_id
                })

                setQuestionStep({
                    currentQuestion: currentQuestion + 1,
                    prevDisabled: false,
                })
            }

        }

    }

    const handlePrevious = (e) => {
        e.preventDefault(e)
        const { currentQuestion } = questionStep
        console.log(questionStep)
        console.log(questions.data)

        if (currentQuestion == 1) {
            // let copy = [...questions]
            // copy[currentQuestion] = state
            // updateQuestions([...copy])

            setState({
                file_url: questions.data[currentQuestion - 1].file_url,
                question: questions.data[currentQuestion - 1].question,
                option_a: questions.data[currentQuestion - 1].option_a,
                option_b: questions.data[currentQuestion - 1].option_b,
                option_c: questions.data[currentQuestion - 1].option_c,
                option_d: questions.data[currentQuestion - 1].option_d,
                option_answer: questions.data[currentQuestion - 1].option_answer
            })

            setQuestionStep({
                currentQuestion: currentQuestion - 1,
                prevDisabled: true,
            })
        } else {
            // if (state.question && state.option_a && state.option_b && state.option_answer) {
            //     let copy = [...questions]
            //     copy[currentQuestion] = state
            //     updateQuestions([...copy])
            // }

            setState({
                file_url: questions.data[currentQuestion - 1].file_url,
                question: questions.data[currentQuestion - 1].question,
                option_a: questions.data[currentQuestion - 1].option_a,
                option_b: questions.data[currentQuestion - 1].option_b,
                option_c: questions.data[currentQuestion - 1].option_c,
                option_d: questions.data[currentQuestion - 1].option_d,
                option_answer: questions.data[currentQuestion - 1].option_answer,
            })

            setQuestionStep({
                currentQuestion: currentQuestion - 1,
                prevDisabled: false,
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put("/api/v1/update_question2/9", storeQuestions, {
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
    }

    const url = `/api/v1/getHistory`
    const [history, getHistory] = useState({
        data: [],
        loading: true
    });
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
                getHistory({
                    data: json.rows,
                    loading: false
                })
            })
            .catch((err) => {
                console.log("Error:", err.message);
            });
    }, []);
    let itemsToRender;
    if (history.data) {
        itemsToRender = history.data.map((items, index) => {
            return <tr className="tab-row" key={index} /*onClick={selectAssessment(items.batch_id)}*/>
                <td>{items.batch_id}</td>
                <td><Moment format="DD/MM/YY">{items.date_composed}</Moment></td>
                <td>{items.number_of_question}</td>
                <td>{items.time_allocated} min</td>
                <td>{items.status}</td>
            </tr>
        })
    }

    useEffect(() => {
        // const { currentQuestion } = questionStep;
        axios.get("/api/v1/getQues/9", {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                console.log(response)
                updateQuestions({
                    data: response.data
                })
                // setState({
                //     file_url: questions.data[currentQuestion].file_url,
                //     question: questions.data[currentQuestion].question,
                //     option_a: questions.data[currentQuestion].option_a,
                //     option_b: questions.data[currentQuestion].option_b,
                //     option_c: questions.data[currentQuestion].option_c,
                //     option_d: questions.data[currentQuestion].option_d,
                //     option_answer: questions.data[currentQuestion].option_answer,
                //     id: questions.data[currentQuestion].id,
                //     batch_id: questions.data[currentQuestion].batch_id
                // })

            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);
    // const { currentQuestion } = questionStep;
    // console.log(questions.data[currentQuestion])

    const changeEditMode = (e) => {
        e.preventDefault();
        setIsInEditMode(!isInEditMode)
    }

    const renderDefaultView = () => {
        return <div>
            <div className="compose-structure">
                <h3 className="questionstep">{questionStep.currentQuestion + 1}/30</h3>
                <form className="forms">
                    <div className="">
                        <div className="compose-file">
                            <div className="cv">
                                <input disabled className="inputfile" id="file_img" type="file" name="pick_file" accept="pdf" onChange={uploadFile} />
                                <label htmlFor="file_img"><img src={Plus} alt="createapp-icon" /> Upload file</label>
                            </div>
                            <div className="time">
                                <h2>Set Timer</h2>
                                <div className="time-boxes">
                                    <div className="time-min">
                                        <select disabled name="time_min" value={time.time_min} onChange={handleTime} className="time-box" id="time" >
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
                                        <select disabled name="time_sec" value={time.time_sec} onChange={handleTime} className="time-box" id="time" >
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
                            <div className="edit">
                                <button onClick={changeEditMode} className="btn btn-warning">Edit</button>
                            </div>
                        </div>
                        <div className="form">
                            <div className="my-question">
                                <label>Question</label>
                                <textarea
                                    readOnly
                                    className="form-control textarea"
                                    name="question"
                                    value={questions.data[questionStep.currentQuestion].question}
                                />
                            </div>
                            <div className="option-grid">
                                <div className="">
                                    <label>Option A</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        name="option_a"
                                        value={questions.data[questionStep.currentQuestion].option_a}
                                    />
                                </div>
                                <div className="">
                                    <label>Option B</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        name="option_b"
                                        value={questions.data[questionStep.currentQuestion].option_b}
                                    />
                                </div>
                            </div>
                            <div className="option-grid2">
                                <div className="">
                                    <label>Option C</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        name="option_c"
                                        value={questions.data[questionStep.currentQuestion].option_c}
                                    />
                                </div>
                                <div className="">
                                    <label>Option D</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        name="option_d"
                                        value={questions.data[questionStep.currentQuestion].option_d}
                                    />
                                </div>
                            </div>
                            <div className="form-group answer">
                                <label>Answer</label>
                                <input
                                    readOnly
                                    className="form-control"
                                    name="option_answer"
                                    value={questions.data[questionStep.currentQuestion].option_answer}
                                />
                            </div>
                        </div>
                        <div className="quiz">
                            <div className="col-md-6 quiz-button">
                                <button disabled={questionStep.prevDisabled} onClick={handlePrevious} className="btn btn-primary">Previous</button>
                            </div>
                            <div className="col-md-6 quiz-button">
                                <button disabled={questionStep.nextDisabled || questionStep.currentQuestion == 4} onClick={handleNext} className="btn btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }

    const renderEditView = () => {
        return <div>
            <div className="compose-structure">
                <h3 className="questionstep">{questionStep.currentQuestion + 1}/30</h3>
                <form className="forms">
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
                            <div className="edit">
                                <button onClick={changeEditMode} className="btn btn-warning">X</button>
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
                                <button disabled={questionStep.nextDisabled || questionStep.currentQuestion == 29} onClick={handleNext} className="btn btn-primary">Next</button>
                            </div>
                            <div className="col-md-12 finish-button">
                                <button onClick={handleSubmit} type="submit" className="btn btn-success">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }

    return (
        <div>
            <div className="dashboard">
                <AdminNav />
                <div className="container dashboard-contents">
                    {history.loading ? <SkeletonTheme color=" #5ABEFD" highlightColor="rgb(184, 164, 164)">
                        <p>
                            <Skeleton count={2} />
                        </p>
                    </SkeletonTheme> :
                        <>
                            <div className="dashboard-heading">
                                <h1>Assessment History</h1>
                            </div>
                            <div className="table-body">
                                <table className="table table-responsive table-sm" width="100%">
                                    <thead className="table-head">
                                        <tr>
                                            <th className="th-sm">Batch</th>
                                            <th className="th-sm">Date Composed</th>
                                            <th className="th-sm">Number of Questions</th>
                                            <th className="th-sm">Time Allocated</th>
                                            <th className="th-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>{itemsToRender}</>
                                    </tbody>
                                </table>
                            </div>
                            {isInEditMode ? renderEditView() : renderDefaultView()}
                        </>
                    }
                </div>
            </div>
        </div>
    )
};

export default AssessmentHistory;