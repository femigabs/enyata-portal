import React, { useState } from 'react';
import './CreateApplication.css';
// import AdminNav from '../../components/adminNav/AdminNav';
import Sign from '../../Assets/Icons/createapp-icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";


const CreateApplication = () => {

    const [image, setImage] = useState({ data: [] });

    const { register, handleSubmit } = useForm();

    const onSubmit = (state) => {
        console.log(state)
        axios.post("/api/v1/createApplication", state, {
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
        <div className="createapp">
            {/* <AdminNav /> */}
            <div className="container create-contents">
                <div className="create-heading">
                    <h1>Create Application</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row createform">
                        <div className="form-group col-md-6 uploadfile">
                            <input className="inputfile" id="file" type="file" name="pick_file" accept="pdf" onChange={uploadFile} />
                            <label htmlFor="file"><img src={Sign} alt="createapp-icon" /> Choose file </label>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Link</label>
                            <input
                                className="form-control"
                                type="text"
                                name="link_url"
                                ref={
                                    register({
                                        required: "LINK REQUIRED",
                                    })
                                }
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Application closure date</label>
                            <input
                                className="form-control"
                                type="text"
                                name="closure_date"
                                ref={
                                    register({
                                        required: "Date REQUIRED",
                                    })
                                }
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Batch ID</label>
                            <input
                                className="form-control"
                                type="text"
                                name="batch_id"
                                ref={
                                    register({
                                        required: "BATCH ID REQUIRED",
                                    })
                                }
                            />
                        </div>
                        <div className="col-md-12">
                            <label>Instructions</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="instruction"
                                ref={
                                    register({
                                        required: "INSTRUCTIONS REQUIRED",
                                    })
                                }
                            />
                        </div>
                        <div className="form-group col-md-6" style={{ display: "none" }}>
                            <label>file_url</label>
                            <input
                                className="form-control"
                                type="text"
                                name="file_url"
                                value={image.data}
                                ref={register()}
                            />
                        </div>
                        <div className="col-md-4 col-md-offset-4">
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CreateApplication