import React, { useState } from 'react';
import './Signup.css';
import UserLogo from '../../components/userLogo/UserLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const eye = <FontAwesomeIcon icon={faEye} />;

const Signup = () => {

    const [passwordShown, setPasswordShown] = useState(false);

    
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const onSubmit = (data) => {
        console.log(data)

        // axios.post("/api/v2/blog", state)
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch(err => {
        //         console.log(err.response.data)
        //     })
    };

    const { register, handleSubmit, errors } = useForm();

    return (
        <div className="signup">
            <UserLogo />
            <h3>Applicant Sign Up</h3>
            <div className="col-md-6 col-md-offset-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="">First Name</label>
                            <input className="form-control"  type="text" placeholder="FirstName"  name="first_name" ref={register({ required: "LASTNAME REQUIRED", minLength: 3 })} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Last Name</label>
                            <input className="form-control" type="text" placeholder="LastName" name="last_name" ref={register({ required: "FIRSTNAME REQUIRED", minLength: 3 })} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Email Address</label>
                            <input className="form-control" type="text" placeholder="Email" name="email_address" ref={register({ required: "EMAIL REQUIRED" })} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Phone Number</label>
                            <input className="form-control" type="number" placeholder="Phone Number" name="phone_number" ref={register({ required: "PHONE NUMBER REQUIRED" })} />
                        </div>
                        <div className="form-group col-md-6 has-feedback">
                            <label>Password</label>
                            <input className="form-control" type={passwordShown ? "text" : "password"} placeholder="Password" name="password" ref={register({ required: "PASSWORD REQUIRED", minLength: { value: 7, message: "TOO SHORT" } })} />
                            <i className="eye-icon" onClick={togglePasswordVisiblity}>{eye}</i>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Confirm Password</label>
                            <input className="form-control" type={passwordShown ? "text" : "password"} placeholder="Confirm Password" name="password_confirmation" ref={register({ })} />
                            <i className="eye-icon" onClick={togglePasswordVisiblity}>{eye}</i>
                        </div>
                        <div className="col-md-6 col-md-offset-3">
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <span>Already have an account? <Link to='/login' className="link">Sign in</Link></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
