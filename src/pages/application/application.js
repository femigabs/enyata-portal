import React, { useState } from 'react';
import './Application.css';
import UserLogo from '../../components/userLogo/UserLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Plus from '../../Assets/Icons/createapp-icon.png';
import Files from 'react-files';
import Cookies from "js-cookie";




const Application = (props) => {

    const search = props.location.search;
    const params = new URLSearchParams(search);
    const batch_id = params.get("id");

    const [image, setImage] = useState({ data: [] });


    const { register, handleSubmit } = useForm({
        defaultValues: {
            created_at: new Date(),
            closure_date: batch_id.slice(2),
            batch_id: batch_id.slice(0, 1)
        }
    });

    const onSubmit = (state) => {
        console.log(state)
        axios.post("/api/v1/application", state, {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err.response)
            })
    };

    const uploadFile = async (e) => {
        const files = e.target.files[0];
        console.log(e.target.files[0])
        const formData = new FormData();
        formData.append("upload_preset", "q3swu36z");
        formData.append("file", files);
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/ddq1cxfz9/image/upload", formData);
            const fileUrl = res.data.secure_url;
            setImage({
                data: fileUrl
            })
        } catch (err) {
            console.log(err)
        };
    };

    return (
        <div className="application">
            <div className="card">
                <UserLogo />
                <h3>Application Form</h3>
                <div className="card shadow-lg p-3 mb-5 bg-white rounded col-md-6 col-md-offset-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="col-md-4 col-md-offset-4 cv">
                                {/* <Files
                                    className="files-dropzone"
                                    onChange={uploadFile}
                                    name="cv_url"
                                    accepts={['image/png', '.pdf', 'audio/*']}
                                    maxFileSize={300000}
                                    minFileSize={0}
                                > */}
                                <input className="inputfile" id="file" type="file" name="pick_file" accept="pdf" onChange={uploadFile} />
                                <label for="file"><img src={Plus} alt="createapp-icon" /> Upload CV</label>
                                {/* </Files> */}
                            </div>
                            <div className="form-group col-md-6">
                                <label>First Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="first_name"
                                    ref={
                                        register({
                                            required: "FIRSTNAME REQUIRED",
                                            minLength: 3
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="last_name"
                                    ref={
                                        register({
                                            required: "LASTNAME REQUIRED",
                                            minLength: 3
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    ref={
                                        register({
                                            required: "EMAIL REQUIRED"
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Date of Birth</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    name="date_of_birth"
                                    ref={
                                        register({
                                            required: "DATE OF BIRTH REQUIRED"
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="address"
                                    ref={
                                        register({
                                            required: "ADDRESS REQUIRED"
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>University</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="university"
                                    ref={
                                        register({
                                            required: "UNIVERSITY REQUIRED"
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Course of Study</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="course_of_study"
                                    ref={
                                        register({
                                            required: "COURSE OF STUDY REQUIRED"
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>CGPA</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="cgpa"
                                    ref={
                                        register({
                                            required: "CGPA REQUIRED",
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6" style={{ display: "none" }}>
                                <label>Created Date</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="created_at"
                                    ref={register()}
                                />
                            </div>
                            <div className="form-group col-md-6" style={{ display: "none" }}>
                                <label>cv_url</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="cv_url"
                                    value={image.data}
                                    ref={register()}
                                />
                            </div>
                            <div className="form-group col-md-6" style={{ display: "none" }}>
                                <label>clouser_date</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="closure_date"
                                    ref={register()}
                                />
                            </div>
                            <div className="form-group col-md-6" style={{ display: "none" }}>
                                <label>batch_id</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="batch_id"
                                    ref={register()}
                                />
                            </div>
                            <div className="col-md-6 col-md-offset-3">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Application;