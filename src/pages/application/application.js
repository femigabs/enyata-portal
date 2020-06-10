import React, { useState } from 'react';
import './Application.css';
import UserLogo from '../../components/userLogo/UserLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Plus from '../../Assets/Icons/createapp-icon.png';
import moment from 'moment';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Cookies from "js-cookie";

const Application = (props) => {

    const history = useHistory()

    const search = props.location.search;
    const params = new URLSearchParams(search);
    const batch_id = params.get("id");

    const [image, setImage] = useState({ data: [] });
    const [states, setStates] = useState({
        items: [],
        errorMessage: '',
        message:"",
        loading: false
      })
      setTimeout(() => {
        setStates({ errorMessage: "" })
      }, 10000);
    const d = new Date()
    const date = moment(d).format("YYYY/MM/DD")

    const { register, handleSubmit, errors, watch } = useForm({
        defaultValues: {
            created_at: date,
            closure_date: batch_id.slice(2),
            batch_id: batch_id.slice(0, 2).replace(/=/g,"")
        }
    });
    const onSubmit = (state) => {
        console.log(state)
        axios.post("/api/v1/application", state, {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                console.log(response)
                setStates({message:response.data.message})
                history.push("/dashboard")
            })
            .catch(err => {
                if(err.response.data.message== "Authorization Failed"){
                    setStates({
                        errorMessage:"Login in ",
                        loading: false
                })
                }else{
                    setStates({
                        errorMessage:err.response.data.message,
                        loading: false
                    })
                }
            })
        setStates({
            loading: true
        })
    };
    const uploadFile = async (e) => {
        const files = e.target.files[0];
        console.log(e.target.files[0])
        const formData = new FormData();
        formData.append("upload_preset", "q3swu36z");
        formData.append("file", files);
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/ddq1cxfz9/image/upload", formData);
            const fileUrl = res.data.secure_url;
            console.log(fileUrl)
            setImage({
                data: fileUrl
            })
        } catch (err) {
            console.log(err)
        };
    };

    return (
        <div className="application">
            <UserLogo />
            <h3>Application Form</h3>
            <div className="col-md-6 col-md-offset-3">
                <div className="card form-body">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 cv">
                                <input className="inputfile" id="file" type="file" name="pick_file" accept="pdf" onChange={uploadFile} />
                                    <label htmlFor="file"><img src={Plus} alt="createapp-icon" /> Upload CV</label>
                                    <p>{errors.cv_url && errors.cv_url.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>First Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="first_name"
                                        ref={register({
                                            required: "First Name Required",
                                            minLength: {
                                                value: 3,
                                                message: "Too Short"
                                            }
                                        })}
                                    />
                                    <p>{errors.first_name && errors.first_name.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="last_name"
                                        ref={register({
                                            required: "Last Name Required",
                                            minLength: {
                                                value: 3,
                                                message: "Too Short"
                                            }
                                        })}
                                    />
                                    <p>{errors.last_name && errors.last_name.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        ref={register({
                                            required: "Email Required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Invalid Email Address"
                                            }
                                        })}
                                    />
                                     <p>{errors.email && errors.email.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Date of Birth</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="yyyy/mm/dd"
                                        name="date_of_birth"
                                        ref={register({
                                            required: "Date of Birth Required",
                                            pattern: {
                                                value:  /^\d{4}(\/)(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])$/i,
                                                message: "Wrong Date of Birth Format"
                                            }
                                        })}
                                    />
                                     <p>{errors.date_of_birth && errors.date_of_birth.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Address</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="address"
                                        ref={
                                            register({
                                                required: "Address Required"
                                            })}
                                    />
                                    <p>{errors.address && errors.address.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>University</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="university"
                                        ref={
                                            register({
                                                required: "University Required"
                                            })}
                                    />
                                    <p>{errors.university && errors.university.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Course of Study</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="course_of_study"
                                        ref={
                                            register({
                                                required: "Course Of Study Reqruired"
                                            })}
                                    />
                                     <p>{errors.course_of_study && errors.course_of_study.message}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>CGPA</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="cgpa" ref={register({
                                            required: "CGPA Required",
                                            pattern: {
                                                value: /\b[1-5]\b/,
                                                message: "CGPA Must Be A Number Type Not Exceed 5"
                                            }
                                        })}
                                    />
                                    <p>{errors.cgpa && errors.cgpa.message}</p>
                                </div>
                                <div className="form-group col-md-6" style={{ display: "none" }}>
                                    <label>Created Date</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="created_at"
                                        ref={register()}
                                    />
                                </div>
                                <div className="form-group col-md-6" style={{ display: "none" }}>
                                    <label>cv_url</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="cv_url"
                                        value={image.data}
                                        ref={register()}
                                    />
                                </div>
                                <div className="form-group col-md-6" style={{ display: "none" }}>
                                    <label>clouser_date</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="closure_date"
                                        ref={register()}
                                    />
                                </div>
                                <div className="form-group col-md-6" style={{ display: "none" }}>
                                    <label>batch_id</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="batch_id"
                                        ref={register()}
                                    />
                                </div>
                                <div className="col-md-6 col-md-offset-3">
                                    {states.loading && <Loader
                                        type="ThreeDots"
                                        color="#00BFFF"
                                        height={30}
                                        width={100}
                                        timeout={10000}
                                    />}
                                    {states.errorMessage &&
                                    <h5 className="error" style={{ color: "Red" }}> {states.errorMessage} </h5>}
                                    {states.Message &&
                                    <h5 className="success" style={{ color: "Green" }}> {states.rMessage} </h5>}
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Application;