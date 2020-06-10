import React, { useState } from "react";
import "./Email.css";
import UserLogo from "../../components/userLogo/UserLogo";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import axios from "axios";

const Email = () => {
    
 const { register, handleSubmit, errors } = useForm();

  const [states, setStates] = useState({
    items: [],
    errorMessage: "",
    successMessage:"",
    loading: false,
  });
  setTimeout(() => {
    setStates({ errorMessage: "" });
  }, 10000);

  const history = useHistory();

  const onSubmit = (state) => {
    axios.post("/api/v1/email", state)
      .then(response => {
          setStates({
            successMessage:response.data.message,
            loading: false,
          })
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

  return (
    <div className="email">
      <UserLogo />
      <h3>Confirm Email</h3>
      <div className="col-md-4 col-md-offset-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Email Address</label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                name="email_address"
                ref={register({
                  required: "Email Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid Email Address",
                  },
                })}
              />
              <p>{errors.email_address && errors.email_address.message}</p>
            </div>
            <div className="col-md-12">
            {states.loading && <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={20000}
            />}
            {states.successMessage&&
              <h4 className="error" style={{ color: "Green" }}> {states.successMessage} </h4>
            }
            {states.errorMessage &&
              <h4 className="error" style={{ color: "Red" }}> {states.errorMessage} </h4>
            }
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

export default Email;