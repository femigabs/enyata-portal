import React, { useState } from "react";
import "./ResetPassword.css";
import UserLogo from "../../components/userLogo/UserLogo";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const eye = <FontAwesomeIcon icon={faEye} />;

const ResetPassword = (props) => {

  const search = props.location.search;
  const params = new URLSearchParams(search);
  const token = params.get("reset");
  const [passwordShown, setPasswordShown] = useState(false);
  const [states, setStates] = useState({
    items: [],
    errorMessage: "",
    successmessage:"",
    loading: false,
  });
  setTimeout(() => {
    setStates({ errorMessage: "" });
  }, 10000);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const history = useHistory();

  const onSubmit = (state) => {
    console.log(state)
    axios.put("/api/v1/password_change", state, {
        "headers": {
            "Content-Type": "application/json",
            "token": token
        }
    })
        .then(response => {
            setStates({ 
              successmessage: response.data.message,
              loading:false
             })
        })
        .catch(err => {
          if(err.response.data.message=="Authorization Failed")
          setStates({
            errorMessage: "Link expired",
            loading:false
          })
        })
    setStates({
        loading: true
    })
};

  const { register, handleSubmit, errors, watch } = useForm();

  return (
    <div className="forget">
      <UserLogo />
      <h3>Forget Password</h3>
      <div className="col-md-4 col-md-offset-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>New Password</label>
              <input
                className="form-control"
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                name="password"
                ref={register({
                  required: "Password Required",
                  minLength: {
                    value: 7,
                    message: "Too Short",
                  },
                })}
              />
              <i className="eye-icon" onClick={togglePasswordVisiblity}>
                {eye}
              </i>
              <p>{errors.password && errors.password.message}</p>
            </div>
            <div className="form-group col-md-12">
              <label>Confirm Password</label>
              <input
                className="form-control"
                type={passwordShown ? "text" : "password"}
                name="password_confirmation"
                ref={register({
                  required: "Confirm Password",
                  validate: (value) =>
                    value === watch("password") ||
                    "Password does not not match",
                })}
              />
              <i className="eye-icon" onClick={togglePasswordVisiblity}>
                {/* {eye} */}
              </i>
              <p>
                {errors.password_confirmation &&
                  errors.password_confirmation.message}
              </p>
            </div>
            <div className="col-md-6 col-md-offset-3">
              {states.loading && (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={30}
                  width={100}
                  timeout={10000}
                />
              )}
              {states.errorMessage && (
                <h4 className="error" style={{ color: "Red" }}>
                  {states.errorMessage}{" "}
                </h4>
              )}
               {states.successmessage&& (
                <h4 className="error" style={{ color: "Green" }}>
                  {states.successmessage}
                </h4>
              )}
            </div>
            <div className="col-md-6 col-md-offset-3">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;