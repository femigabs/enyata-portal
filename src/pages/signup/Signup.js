import React, { useState } from 'react';
import './Signup.css';
import UserLogo from '../../components/userLogo/UserLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Cookies from "js-cookie"


const eye = <FontAwesomeIcon icon={faEye} />;
const Signup = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const [states, setStates] = useState({
        items: [],
        errorMessage: '',
        loading: false
      })
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    
    const history = useHistory()
    const onSubmit = (state) => {
        console.log(state)

        axios.post("/api/v1/signup", state)
            .then(response => {
                console.log(response.data)
                Cookies.set('token', response.data.token);
                history.push("/dashboard");
            })
            .catch(err => {
                console.log(err.response)
                setStates({
                    errorMessage: err.response.data.message,
                    loading:false
                })
            })
            setStates({
                loading: true
            })
        
    };

    const { register, handleSubmit, errors, watch } = useForm();

    return (
        <div className="signup">
            <div className="card">
                <UserLogo />
                <h3>Applicant Sign Up</h3>
                <div className="col-md-6 col-md-offset-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
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
                                <label>Email Address</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email_address"
                                    ref={register({
                                        required: "Email Required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid Email Address"
                                        }
                                    })}
                                />
                                <p>{errors.email_address && errors.email_address.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone Number</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="phone_number"
                                    ref={register({
                                        required: "Phone Number Required",
                                        pattern: {
                                            value: /^\d{11}$/,
                                            message: "Invalid Phone Number"
                                        }
                                    })}
                                />
                                <p>{errors.phone_number && errors.phone_number.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    ref={register({
                                        required: "Password Required",
                                        minLength: {
                                            value: 7,
                                            message: "Too Short"
                                        }
                                    })}
                                />
                                <i className="eye-icon" onClick={togglePasswordVisiblity}>{eye}</i>
                                <p>{errors.password && errors.password.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Confirm Password</label>
                                <input
                                    className="form-control"
                                    type={passwordShown ? "text" : "password"}
                                    name="password_confirmation"
                                    ref={register({
                                        required: "Confirm Password",
                                        validate: (value) => value === watch('password') || "Password does not not match"
                                    })}
                                />
                                <i className="eye-icon" 
                                onClick={togglePasswordVisiblity}>
                                    {/* {eye} */}
                                    </i>
                                <p>{errors.password_confirmation && errors.password_confirmation.message}</p>
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
                                    <h4 className="error" style={{ color: "Red" }}> {states.errorMessage} </h4>
                                }
                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                <span>Already have an account? <Link to='/login' className="link">Sign in</Link></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
