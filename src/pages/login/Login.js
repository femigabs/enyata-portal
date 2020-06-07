import React, { useState } from 'react';
import './Login.css';
import UserLogo from '../../components/userLogo/UserLogo';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {

  const [passwordShown, setPasswordShown] = useState(false);
  const [states, setStates] = useState({
    items: [],
    errorMessage: '',
    loading: false
  })
  setTimeout(() => {
    setStates({ errorMessage: "" })
  }, 10000);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const history = useHistory()

  const onSubmit = (state) => {
    axios.post("/api/v1/login", state)
      .then(response => {
        Cookies.set('token', response.data.token);
        history.push("/dashboard")
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
    <div className="login">
      <UserLogo />
      <h3>Applicant Sign In</h3>
      <div className="col-md-4 col-md-offset-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Email Address</label>
              <input
                className="form-control"
                type="text" placeholder="Email"
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
                placeholder="Password"
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
            {states.loading && <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={10000}
            />}
            {states.errorMessage &&
              <h4 className="error" style={{ color: "Red" }}> {states.errorMessage} </h4>
            }
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              <div className="login-text">
                <span>Don't have an account yet? <Link to='/signup' className="link">Sign up</Link></span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}

export default Login

