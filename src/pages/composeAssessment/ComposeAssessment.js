import React, { useState, useEffect } from "react";
import "./ComposeAssessment.css";
import { useForm } from "react-hook-form";
import AdminNav from "../../components/adminNav/AdminNav";
import menu from "../../Assets/Icons/menu.svg";
import Plus from "../../Assets/Icons/createapp-icon.png";
import Cookies from "js-cookie";
import axios from "axios";
import Moment from "react-moment";

const Compose = () => {
  useEffect(() => {
    let hamburger = document.getElementById("img"),
      menuLink = document.getElementById("sidenav");

    hamburger.addEventListener("click", function(e) {
      menuLink.classList.toggle("hidden-xs");
      e.preventDefault();
    });
  });
  const onSubmit = state => {
    console.log(state);

    axios
      .post("/api/v1/signup", state)
      .then(response => {
        console.log(response.data);
        Cookies.set("token", response.data.token);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  const [image, setImage] = useState({ data: [] });
  const uploadFile = async e => {
    const files = e.target.files[0];
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("upload_preset", "q3swu36z");
    formData.append("file", files);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/ddq1cxfz9/image/upload",
        formData
      );
      const fileUrl = res.data.secure_url;
      setImage({
        data: fileUrl
      });
    } catch (err) {
      console.log(err);
    }
  };
  const { register, handleSubmit, errors, watch } = useForm();
  return (
    <div>
      <div className="menu">
        <img
          src={menu}
          id="img"
          className="visible-xs"
          style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }}
        />
      </div>
      <div className="compose">
        <AdminNav />
        <div className="compose-structure">
          <h1>Compose Assessment</h1>
          <h3>15/30</h3>

          <div className="form-row">
            <div className="col-md-6 compose-input cv">
              <input
                className="inputfile"
                id="file"
                type="file"
                name="pick_file"
                accept="pdf"
                onChange={uploadFile}
              />
              <label for="file">
                <img src={Plus} alt="createapp-icon" /> Upload CV
              </label>
            </div>
            <div className=" form-group col-md-6 time ">
              <h2>Set Timer</h2>
              <span>
                <bold>00: 00: 00</bold>
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group col-md-12 my-question">
                <label>Question</label>
                <input
                  className="form-control"
                  type="text"
                  name="question"
                  ref={register({
                    required: "Question is empty"
                  })}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Option A</label>
                <input
                  className="form-control"
                  type="text"
                  name="opton_a"
                  ref={register({
                    required: "Option A cannot be empty"
                  })}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Option B</label>
                <input
                  className="form-control"
                  type="text"
                  name="Option_b"
                  ref={register({
                    required: "Option B cannot be empty"
                  })}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Option C</label>
                <input
                  className="form-control"
                  type="text"
                  name="option_c"
                  ref={register({
                    required: "Option c cannot be empty"
                  })}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Option D</label>
                <input
                  className="form-control"
                  type="text"
                  name="option_d"
                  ref={register({
                    required: "Option D cannot be empty"
                  })}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
