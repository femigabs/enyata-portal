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
                    <h1>Compose Assessment</h1>
                    <h3>15/30</h3>
                    <div className="form-row">
                        <div className="col-md-6 compose-input cv">
                            <input className="inputfile" id="file_img" type="file" name="pick_file" accept="pdf" onChange={uploadFile} />
                            <label for="file_img"><img src={Plus} alt="createapp-icon" /> Upload CV</label>
                        </div>
                        <div className=" form-group col-md-6 time ">
                            <h2>Set Timer</h2>
                            <select className="time-box" id="time" >
                                <option value="5" selected>00</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        <form className="form">
                            <div className="form-group col-md-12 my-question">
                                <label>Question</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="question"
                                    value={state.question}
                                    onChange={handleChange}
                                // ref={
                                //     register({
                                //         required: "Question is empty",

                                //     })
                                // }
                                />
                            </div>
                            <div className="form-group col-md-6">
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
                            <div className="form-group col-md-6">
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
                            <div className="form-group col-md-6">
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
                            <div className="form-group col-md-6">
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
                            <div className="form-group col-md-6" style={{ display: "none" }}>
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
                            <div className="col-md-6 quiz-button">
                                <button onClick={handlePrevious} className="btn btn-primary">Previous</button>
                            </div>
                            <div className="col-md-6 quiz-button">
                                <button onClick={handleNext} className="btn btn-primary">Next</button>
                            </div>
                            <div className="col-md-12 finish-button">
                                <button type="submit" className="btn btn-default">Finish</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ComposeAssessment