import React, { useState } from 'react';
import './Admin.css';
import AdminLogo from '../../components/adminLogo/AdminLogo';
import white from '../../Assets/Images/enyata-logo2.png'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from 'react-router-dom';
import comp from '../../Assets/Images/computer-img.png';
import Cookies from "js-cookie";

const eye = <FontAwesomeIcon icon={faEye} />;

const Admin = () => {

    const [passwordShown, setPasswordShown] = useState(false);

    const [states, setStates] = useState({
        items: [],
        errorMessage: ''
      })
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const history = useHistory()
    const onSubmit = (state) => {
        console.log(state)
        axios.post("/api/v1/admin/login", state)
            .then(response => {
                console.log(response.data)
                Cookies.set('token', response.data.token);
                history.push("/adminboard")
            })
            .catch(err => {
                console.log(err.response.data.message)
               setStates({errorMessage: err.response.data.message});
            })
    };
  
    const { register, handleSubmit, errors } = useForm();

    return (
        <div className="admin" >
            <div className=" col-md-4 col-md-offset-4 admin-flex">
                <div className="adminLogo">
                    <div className="whit">
                        <img src={white} alt="enyata white" />
                    </div>
                    <h1>enyata</h1>
                    <h3>Admin Log In</h3>
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                <div className="form-group col-md-12">
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
                                <div className="form-group col-md-12">
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
                                    <i className="eye-icon" onClick={togglePasswordVisibility}>{eye}</i>
                                    <p>{errors.password && errors.password.message}</p>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    <div className="admin-text">
                                        <span><Link to='/'>Forgot password?</Link></span>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <div className=" background">
                    <img src={comp} alt="computer" />
                </div>
            </div>
        </div>
    )
}


export default Admin