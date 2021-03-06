import React, { useState } from 'react';
import './Admin.css';
import AdminLogo from '../../components/adminLogo/AdminLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from 'react-router-dom';
import comp from '../../Assets/Images/computer-img.png';
import Cookies from "js-cookie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const eye = <FontAwesomeIcon icon={faEye} />;

const Admin = () => {

    const [passwordShown, setPasswordShown] = useState(false);

    const [states, setStates] = useState({
        items: [],
        errorMessage: '',
        loading: false
    })
    setTimeout(() => {
        setStates({ errorMessage: "" })
    }, 10000);
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
                setStates({
                    errorMessage: err.response.data.message,
                    loading: false
                });
            })
        setStates({
            loading: true
        })
    };

    const { register, handleSubmit, errors } = useForm();

    return (
        <div className="admin" >
            <div className=" col-md-4 col-md-offset-4 ">
                <div >
                    <AdminLogo />
                    <h3>Admin Log In</h3>
                    <div className="admin-form">
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
                                {states.loading && <Loader
                                    type="ThreeDots"
                                    color="#00BFFF"
                                    height={20}
                                    width={100}
                                    timeout={10000}
                                />}
                                {states.errorMessage &&
                                    <h4 className="error" style={{ color: "Red" }}> {states.errorMessage} </h4>}
                                <div className="col-md-12">
                                    <button type="submit"
                                        className="btn btn-primary btn-block"
                                    >Sign In</button>
                                    <div className="admin-text">
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className=" background">
                <img src={comp} alt="computer" />

            </div>
        </div>
    )
}


export default Admin
