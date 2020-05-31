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

// console.log(count)

// if ((count + 1) == state.question.length) {
//     setButtonDisabled(true)
// }
// console.log(state.question.length)
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


// import React, { Component } from 'react';
// import UserSideBar from '../../Components/usersidebar/usersidebar'
// import './UserAssessment.css'
// import selectbox from '../../Components/mainicons/question _select_box.svg'


// class UserAssessment extends Component {
//     state = {
//         questionsList: [
//             {
//                 id: 0,
//                 question: ` What is the Capital Of India ?`,
//                 options: [`New Delhi`, `Mumbai`, `Kolkatta`],
//                 answer: `New Delhi`
//             },
//             {
//                 id: 1,
//                 question: `Who is the CEO of Tesla Motors?`,
//                 options: [`Bill Gates`, `Steve Jobs`, `Elon Musk`],
//                 answer: `Elon Musk`
//             },
//             {
//                 id: 3,
//                 question: `Name World's Richest Man?`,
//                 options: [`Jeff Bezo`, `Bill Gates`, `Mark Zuckerberg`],
//                 answer: `Jeff Bezo`
//             },
//             {
//                 id: 4,
//                 question: `World's Longest River?`,
//                 options: [`River Nile`, `River Amazon`, `River Godavari`],
//                 answer: `River Nile`
//             }
//         ],
//         currentQuestion: 0,
//         myAnswer: null,
//         options: [],
//         score: 0,
//         disabled: true,
//         isEnd: false,
//         store: {}
//     }

//     componentDidMount() {
//         this.setState(() => {
//             return {
//                 questions: this.state.questionsList[this.state.currentQuestion].question,
//                 answer: this.state.questionsList[this.state.currentQuestion].answer,
//                 options: this.state.questionsList[this.state.currentQuestion].options
//             }
//         })
//     }

//     nextQuestionHandler = () => {
//         // console.log('test')
//         const { currentQuestion, myAnswer, answer, store } = this.state;

//         const copy = { ...store }
//         const scorekey = "Q" + currentQuestion
//         copy[scorekey] = [myAnswer, answer]

//         this.setState({
//             store: copy
//         })

//         this.setState({
//             currentQuestion: this.state.currentQuestion + 1
//         });

//     };

//     previousQuestionHandler = () => {
//         // console.log('test')
//         const { currentQuestion, myAnswer, answer, score } = this.state;


//         // this.setState({
//         // score: score + 1
//         // });


//         this.setState({
//             currentQuestion: this.state.currentQuestion - 1
//         });
//         console.log(this.state.currentQuestion);

//     };

//     submitHandler = () => {
//         // console.log('test')
//         const { currentQuestion, myAnswer, answer, store } = this.state;
//         console.log(store);
//         var score = 0;
//         if (myAnswer == answer) {
//             score = score + 1
//         }

//         Object.values(store).forEach((value) => {
//             if (value[0] == value[1]) {
//                 score = score + 1
//             }
//         })

//         console.log("score: " + score)
//     };



//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.currentQuestion !== prevState.currentQuestion) {
//             this.setState(() => {
//                 return {
//                     questions: this.state.questionsList[this.state.currentQuestion].question,
//                     answer: this.state.questionsList[this.state.currentQuestion].answer,
//                     options: this.state.questionsList[this.state.currentQuestion].options
//                 };
//             });
//         }
//     }

//     selectAnswer = answer => {
//         this.setState({ myAnswer: answer, disabled: false });
//     };

//     render() {
//         const { options, myAnswer, currentQuestion, isEnd, questions } = this.state
//         return (
//             <div>
//                 <div><UserSideBar /></div>
//                 <div className='assessment-container'>
//                     <p className='question-number'>{`Question ${currentQuestion + 1}`}</p>
//                     <p className='question-box'>{questions}</p>
//                     <div>
//                         {options.map((option, id) => (
//                             <div className='options-box' onClick={() => this.selectAnswer(option)}>
//                                 <div className={`select-box ${myAnswer === option ? "selected-box" : null}`}><img src={selectbox} alt="select-box" /></div>
//                                 <p key={id} className={`text-box ${myAnswer === option ? "selected" : null}`} onClick={() => this.selectAnswer(option)}>{option}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <span><button onClick={this.previousQuestionHandler}>Previous</button></span>
//                     <span><button onClick={this.nextQuestionHandler}>Next</button></span>
//                     <span><button onClick={this.submitHandler}>Submit</button></span>

//                 </div>
//             </div>
//         )
//     }
// }

// export default UserAssessment;