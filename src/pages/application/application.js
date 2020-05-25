import React, { useState } from 'react';
import './application.css';
import UserLogo from '../../components/userLogo/UserLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Plus from '../../Assets/Icons/createapp-icon.png'



const Application = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    };



    return (
        <div className="application">
            <UserLogo />
            <h3>Application Form</h3>
            <div className="card">
                <div className="col-md-6 col-md-offset-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="col-md-6 col-md-offset-3">
                                <div className="cv">
                                    <img src={Plus} alt="createapp-icon" /><h6>Upload Cv</h6>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label>First Name</label>
                                <input className="form-control" type="text" name="first_name" ref={register({ required: "FIRSTNAME REQUIRED", minLength: 3 })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last Name</label>
                                <input className="form-control" type="text" name="last_name" ref={register({ required: "LASTNAME REQUIRED", minLength: 3 })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" ref={register({ required: "EMAIL REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Date of Birth</label>
                                <input className="form-control" type="text" placeholder="dd/mm/yyyy" name="date_of_birth" ref={register({ required: "DATE OF BIRTH REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <input className="form-control" type="text" name="address" ref={register({ required: "ADDRESS REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>University</label>
                                <input className="form-control" type="text" name="university" ref={register({ required: "UNIVERSITY REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Course of Study</label>
                                <input className="form-control" type="text" name="course_of_study" ref={register({ required: "COURSE OF STUDY REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>CGPA</label>
                                <input className="form-control" type="text" name="cgpa" ref={register({ required: "CGPA REQUIRED", })} />
                            </div>
                            <div className="col-md-6 col-md-offset-3">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Application;