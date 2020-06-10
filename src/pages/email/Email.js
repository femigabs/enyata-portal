import React, { useState } from "react";
import "./Email.css";
import UserLogo from "../../components/userLogo/UserLogo";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Email = () => {
  const [states, setStates] = useState({
    items: [],
    errorMessage: "",
    loading: false,
  });
  setTimeout(() => {
    setStates({ errorMessage: "" });
  }, 10000);

  const history = useHistory();

  const onSubmit = () => {}

  const { register, handleSubmit, errors } = useForm();

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
