import React, { useState, useEffect } from 'react';
import './ComposeAssessment.css';
import { useForm } from "react-hook-form";
import AdminNav from '../../components/adminNav/AdminNav';
import menu from '../../Assets/Icons/menu.svg';
import Plus from '../../Assets/Icons/createapp-icon.png';
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';

const ComposeAssessment = () => {

    const history = useHistory()
    // const [time, setTime] = useState()
    const [state, setState] = useState([])
    // const [questions, setQuestions] = useState([])
    const [currentStep, setCurrentStep] = useState(1)


    // handleTime = (e) => {
    //     setTime({
    //         ...time,
    //     })
    // }

    useEffect(() => {
        let hamburger = document.getElementById("img"),
            menuLink = document.getElementById("sidenav")

        hamburger.addEventListener('click', function (e) {
            menuLink.classList.toggle('hidden-xs')
            e.preventDefault()
        })
    })

    const handleSubmit = (e) => {
        console.log(state)

        // axios.post("/api/v1/assessment", state)
        //     .then(response => {
        //         console.log(response.data)
        //         Cookies.set('token', response.data.token);
        //         // history.push("/history")
        //     })
        //     .catch(err => {
        //         console.log(err.response)
        //     })
    }
    const [image, setImage] = useState({ data: [] });
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
            setImage({
                data: fileUrl
            })
        } catch (err) {
            console.log(err)
        };
    };

    const handleChange = (e) => {
        setState([
            ...state,
            [e.target.name] = e.target.value
        ])
    }

    const handleNext = () => {
        currentStep = currentStep >= 29 ? 30 : currentStep + 1;
        console.log(currentStep)
        setCurrentStep({
            currentStep: currentStep
        })
    }


    const handlePrevious = () => {
        currentStep = currentStep <= 1? 1: currentStep - 1;
        console.log(currentStep)
        setCurrentStep({
            currentStep: currentStep
        })
    }

    if (currentStep !== 1) {
        return null
      }

    // const { register, handleSubmit, errors } = useForm();

    return (
        <div>
            <div className="menu">
                <img src={menu} id="img" className="visible-xs" style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }} />
            </div>
            <div className="compose">
                <AdminNav />
                <div className="compose-structure">
                    <div className="compose-heading">
                        <h1>Compose Assessment</h1>
                        <h3>15/30</h3>
                    </div>
                    
                    <div className="compose-file">
                        <div className="  cv">
                            <input className="inputfile" id="file_img" type="file" name="pick_file" accept="pdf" onChange={uploadFile} />
                            <label for="file_img"><img src={Plus} alt="createapp-icon" /> Upload CV</label>
                        </div>
                        <div className="  time ">
                            <h2>Set Time</h2>
                            <select className="time-box" id="time" >
                                <option value="5" selected>00</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </div>
                        <form className="form">
                            <div className=" my-question">
                                <label>Questions</label>
                                <textarea value={state.question} type="reset" id="question"
                                style={{ height: "150px", width: "137%" }}  onChange={handleChange} className="textarea"></textarea>
                                
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
                                // ref={
                                //     register({
                                //         required: "Option A cannot be empty",

                                //     })
                                // }
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
                                // ref={
                                //     register({
                                //         required: "Option B cannot be empty",

                                //     })
                                // }
                                />
                            </div>

                            </div>
                            <div  className="option-grid2">
                            <div >
                                <label>Option C</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="option_c"
                                    value={state.option_c}
                                    onChange={handleChange}
                                // ref={
                                //     register({
                                //         required: "Option c cannot be empty",

                                //     })
                                // }
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
                                // ref={
                                //     register({
                                //         required: "Option D cannot be empty",

                                //     })
                                // }
                                />
                            </div>
                            </div>
                            
                            <div className="" style={{ display: "none" }}>
                                <label>cv_url</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="cv_url"
                                    value={image.data}
                                    onChange={handleChange}
                                // ref={register()}
                                />
                            </div>
                            <div className="quiz">
                            <div className="col-md-6 quiz-button">
                                <button onClick={handlePrevious} className="btn btn-primary">Previous</button>
                            </div>
                            <div className="col-md-6 quiz-button">
                                <button onClick={handleNext} className="btn btn-primary">Next</button>
                            </div>
                            <div className="col-md-12 finish-button">
                                <button type="submit" className="btn btn-default">Finish</button>
                            </div>
                            </div>
                            
                        </form>
                    {/* </div> */}
                </div>

            </div>
        </div>
    )
}

export default ComposeAssessment

// import React, { useState } from 'react'
// import './ComposeAssessment.css'
// import uploadIcon from '../../../Images/upload-icon.svg'
// import AssessmentSuccessful from './AssessmentSuccessful';

// const ComposeAssessment = () => {
//     const [questions, setQuestions] = useState({
//         question: "",
//         option_a: "",
//         option_b: "",
//         option_c: "",
//         option_d: "",
//         correct_answer: "",
//         batch_id: "",
//         questionStore: []
//     }
//     )

//     const [time, setTime] = useState("")
//     const [questionLength, setQuestionLength] = useState(0)
//     const [questionNo, setQuestionNo] = useState(1)
//     const [prevQuestion, setprevQuestion] = useState(-1)
//     const [nextQuestion, setNextQuestion] = useState(1)

//     const [file, setFile] = useState("")

//     const handleFile = e => {
//         let files = e.target.files
//         let reader = new FileReader()
//         reader.readAsDataURL(files[0])
//         reader.onload = e => {
//             let result = e.target.result
//             console.log(result)
//             setFile(result)
//         }
//     }

//     const handleTime = e => {
//         setTime(e.target.value)
//     }

//     const handleInputChange = e => {
//         if (questions.batch_id === "") {
//             alert("Input your Batch ID")
//             setQuestions({ ...questions, batch_id: e.target.value })
//         } else {
//             setQuestions({
//                 ...questions, [e.target.id]: e.target.value
//             })
//         }
//     }

//     const handlePreviousQuestion = () => {
//         const { questionStore } = questions
//         setQuestionLength(questionLength - 1)
//         setQuestionNo(questionNo - 1)
//         setprevQuestion(prevQuestion - 1)
//         setNextQuestion(nextQuestion - 1)
//         let one = questionStore[prevQuestion].question
//         let two = questionStore[prevQuestion].option_a
//         let three = questionStore[prevQuestion].option_b
//         let four = questionStore[prevQuestion].option_c
//         let five = questionStore[prevQuestion].option_d
//         let six = questionStore[prevQuestion].correct_answer
//         let seven = questionStore[prevQuestion].batch_id
//         setQuestions({
//             ...questions, question: one, option_a: two, option_b: three, option_c: four, option_d: five, correct_answer: six, batch_id: seven
//         })
//         console.log(questionLength)
//     }

//     const handleNextQuestion = () => {
//         const { question, option_a, option_b, option_c, option_d, correct_answer, batch_id } = questions
//         let questionData = { question, option_a, option_b, option_c, option_d, correct_answer, batch_id }
//         const { questionStore } = questions

//         if (questionStore.length === questionLength) {
//             setQuestionNo(questionNo + 1)
//             questionStore.push(questionData)
//             console.log(questionStore)
//             setprevQuestion(prevQuestion + 1)
//             console.log("Posted")
//             setQuestionLength(questionLength + 1)
//             setNextQuestion(nextQuestion + 1)
//             setQuestions({
//                 ...questions, question: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "",
//             })
//         } else if (questionStore.length > questionLength && questionStore.length === nextQuestion) {
//             setQuestions({
//                 ...questions, question: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "",
//             })
//             setNextQuestion(nextQuestion + 1)
//             setprevQuestion(prevQuestion + 1)
//             setQuestionNo(questionNo + 1)
//             setQuestionLength(questionLength + 1)
//             console.log(questionStore)
//             questionStore[questionLength].question = questionData.question
//             questionStore[questionLength].option_a = questionData.option_a
//             questionStore[questionLength].option_b = questionData.option_b
//             questionStore[questionLength].option_c = questionData.option_c
//             questionStore[questionLength].option_d = questionData.option_d
//             questionStore[questionLength].correct_answer = questionData.correct_answer
//             questionStore[questionLength].batch_id = questionData.batch_id
//         }
//         else if (questionStore.length > questionLength) {
//             setprevQuestion(prevQuestion + 1)
//             setQuestionNo(questionNo + 1)
//             console.log(questionStore)
//             console.log("Updated")
//             setNextQuestion(nextQuestion + 1)
//             setQuestionLength(questionLength + 1)
//             let one = questionStore[nextQuestion].question
//             let two = questionStore[nextQuestion].option_a
//             let three = questionStore[nextQuestion].option_b
//             let four = questionStore[nextQuestion].option_c
//             let five = questionStore[nextQuestion].option_d
//             let six = questionStore[nextQuestion].correct_answer
//             let seven = questionStore[nextQuestion].batch_id
//             setQuestions({
//                 ...questions, question: one, option_a: two, option_b: three, option_c: four, option_d: five, correct_answer: six, batch_id: seven
//             })
//             questionStore[questionLength].question = questionData.question
//             questionStore[questionLength].option_a = questionData.option_a
//             questionStore[questionLength].option_b = questionData.option_b
//             questionStore[questionLength].option_c = questionData.option_c
//             questionStore[questionLength].option_d = questionData.option_d
//             questionStore[questionLength].correct_answer = questionData.correct_answer
//             questionStore[questionLength].batch_id = questionData.batch_id
//         }
//         if (nextQuestion === 30) {
//             setQuestionNo(30)
//         }
//     }

//     const handleSubmit = e => {
//         e.preventDefault()
//         const { questionStore } = questions
//         if (time) {
//             //axios post for time and questions
//             alert("axios can now be posted")
//             setNextQuestion(nextQuestion + 1)
//         } else {
//             alert("Set time")
//         }
//     }

//     const style = {
//         display: file ? "block" : "none",
//         fontFamily: "Lato",
//         fontWeight: 500,
//         fontSize: "16px",
//         color: "#5abefd",
//         marginTop: 0,
//         marginBottom: "7px",
//         textAlign: "center"
//     }

//     return (
//         <div className="compose_wrapper">
//             <form onSubmit={handleSubmit} style={{ display: nextQuestion > 31 ? "none" : "block" }}>
//                 <p className="header_text">Compose Assessment</p>
//                 <div className="file_timer_wrapper">
//                     <div>
//                         <p>{questionNo}/30</p>
//                         <div className="file_container">
//                             <div>
//                                 <img className="upload-icon" src={uploadIcon} alt="Upload icon" />
//                             </div>
//                             <input type="file" name="file" id="file" className="input_file" onChange={handleFile} />
//                             <label htmlFor="file">Choose File</label>
//                         </div>
//                         <p style={style}>Upload succesful!</p>
//                     </div>
//                     <div className="set_time">
//                         <p>Set Time</p>
//                         <select className="time-box" id="time" onChange={handleTime} >
//                             <option value="5">00</option>
//                             <option value="10">10</option>
//                             <option value="15">15</option>
//                             <option value="20">20</option>
//                             <option value="25">25</option>
//                             <option value="30">30</option>
//                         </select>
//                         <p className="mins">mins</p>
//                     </div>
//                     <div className="set_time">
//                         <p>Batch ID</p>
//                         <select className="batch-box" id="batch_id" onChange={handleInputChange} >
//                             <option value="--">__</option>
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                         </select>
//                     </div>
//                 </div>
//                 <p className="question">Question</p>
//                 <textarea value={questions.question} type="reset" id="question" style={{ height: "200px", width: "100%" }} onChange={handleInputChange}></textarea>

//                 <div className="input_row_wrapper">
//                     <div className="input_row">
//                         <div>
//                             <p>Option A</p>
//                             <input value={questions.option_a} type="text" id="option_a" onChange={handleInputChange} />
//                         </div>
//                         <div>
//                             <p>Option B</p>
//                             <input value={questions.option_b} type="text" id="option_b" onChange={handleInputChange} />
//                         </div>
//                     </div>
//                     <div className="input_row">
//                         <div>
//                             <p>Option C</p>
//                             <input value={questions.option_c} type="text" id="option_c" onChange={handleInputChange} />
//                         </div>
//                         <div>
//                             <p>Option D</p>
//                             <input value={questions.option_d} type="text" id="option_d" onChange={handleInputChange} />
//                         </div>
//                     </div>
//                     <div className="input_row_two">
//                         <div>
//                             <p>Answer</p>
//                             <input value={questions.correct_answer} type="text" id="correct_answer" onChange={handleInputChange} />
//                         </div>
//                     </div>
//                     <div className="prev_n_next_btn">
//                         <button type="button" disabled={questionNo === 1} onClick={handlePreviousQuestion} >Previous</button>
//                         <button type="button" disabled={nextQuestion === 31} onClick={handleNextQuestion}>Next</button>
//                     </div>
//                     <p className="click_to_submit" style={{ display: nextQuestion === 31 ? "block" : "none" }}>Click finish to submit</p>
//                     <div className="finish_btn">
//                         <button style={{ backgroundColor: nextQuestion === 31 ? "#31d283" : "#CECECE" }} disabled={nextQuestion < 31} type="submit">Finish</button>
//                     </div>
//                 </div>
//             </form>
//             <AssessmentSuccessful nextQuestion={nextQuestion} />
//         </div>
//     )
// }

// export default ComposeAssessment