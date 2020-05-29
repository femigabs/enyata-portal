import React, { useState } from 'react';
import './admin.css';
import AdminLogo from '../../components/adminLogo/adminLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import comp from '../../Assets/Images/computer-img.png';

const eye = <FontAwesomeIcon icon={faEye} />;

const Admin = () => {

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const onSubmit = (state) => {
        console.log(state)
        axios.post("/api/v1/admin/login", state)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
      };

    const { register, handleSubmit, errors } = useForm();

    return (
        <div className="admin">
            <AdminLogo />
            <h3>Admin Log In</h3>
            <div className="col-md-4 col-md-offset-4">
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
                            <div className="background">
                                <img src={comp} alt="computer" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Admin