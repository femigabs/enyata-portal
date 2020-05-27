import React, { useState } from 'react';
import './application.css';
import UserLogo from '../../components/userLogo/UserLogo';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Plus from '../../Assets/Icons/createapp-icon.png';
import Files from 'react-files';
import moment from 'react-moment';



const Application = () => {

    const [image, setImage] = useState({
        cv_url: '',
        first_name: '',
    })
    const [state, setState] = useState({
        cv_url: '',
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        address: '',
        university: '',
        course_of_study: '',
        cgpa: '',
        created_at: new Date()


    })


    // const d = new Date();
    // const date = moment(d).format("YYYY-MM-DD");

    const [file, setFile] = useState('');
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            created_at: new Date(),
            // cv_url: image
        }
    });

    const onSubmit = () => {
       
        axios.post("https://academy-porta.herokuapp.com/api/v1/application", state)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err.response)
            })
        // e.preventDefault();
    };

    const uploadFile = async (e) => {
        const files = e.target.files[0];
        const formData = new FormData();
        formData.append("upload_preset", "q3swu36z");
        formData.append("file", files);
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/ddq1cxfz9/image/upload", formData);
            const imageUrl = res.data.secure_url;
            setValue({
                cv_url: imageUrl
            })

            // console.log(cv_url)
            // const image = await axios.post("", { imageUrl });
            // setFile(image.data);
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
                                    // accepts={[".pdf"]}
                                    maxFileSize={300000}
                                    minFileSize={0}
                                > */}
                                <input id="file" type="file" name="cv_url" onChange={uploadFile} />
                                <img src={Plus} alt="createapp-icon" /><h6>Upload Cv</h6>
                                {/* </Files> */}
                            </div>
                            <div className="form-group col-md-6">
                                <label>First Name</label>
                                <input className="form-control" type="text" name="first_name" ref={register({ required: "FIRSTNAME REQUIRED", minLength: 3 })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last Name</label>
                                <input className="form-control" type="text" name="last_name" ref={register({ required: "LASTNAME REQUIRED", minLength: 3 })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" ref={register({ required: "EMAIL REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Date of Birth</label>
                                <input className="form-control" type="text" placeholder="dd/mm/yyyy" name="date_of_birth" ref={register({ required: "DATE OF BIRTH REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <input className="form-control" type="text" name="address" ref={register({ required: "ADDRESS REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>University</label>
                                <input className="form-control" type="text" name="university" ref={register({ required: "UNIVERSITY REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Course of Study</label>
                                <input className="form-control" type="text" name="course_of_study" ref={register({ required: "COURSE OF STUDY REQUIRED" })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>CGPA</label>
                                <input className="form-control" type="text" name="cgpa" ref={register({ required: "CGPA REQUIRED", })} />
                            </div>
                            <div className="form-group col-md-6" style={{display: "none"}}>
                                <label>Created Date</label>
                                <input className="form-control" type="text" name="created_at" ref={register()} />
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