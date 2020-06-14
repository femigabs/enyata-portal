import React, { useState } from 'react';
import './CreateApplication.css';
import AdminNav from '../../components/adminNav/AdminNav';
import Sign from '../../Assets/Icons/createapp-icon.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";


const CreateApplication = () => {

    const history = useHistory()

    if(!Cookies.get("token")){
        history.push("/admin")
    }

    const [image, setImage] = useState({ data: [] });
    const [states, setStates] = useState({
        items: [],
        successMessage:"",
        errorMessage: '',
        loading:false
      })
      setTimeout(() => {
        setStates({ errorMessage: "" })
      }, 10000);
    
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (state) => {
        console.log(state)
        axios.post("/api/v1/createApplication", state, {
            "headers": {
                "Content-Type": "application/json",
                "token": Cookies.get("token")
            }
        })
            .then(response => {
                console.log(response.data.message)
                setStates({successMessage: response.data.message});
            })
            .catch(err => {
                console.log(err.response.data.message)
                setStates({
                    errorMessage: err.response.data.message,
                    loading:false
                });

            })
        setStates({
            loading:true
        })
    };
    console.log(states)


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
            <AdminNav />
            <div className="container col-md-8 offset-4 create-contents">
                <div className="create-heading">
                    <h1>Create Application</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row createform">
                        <div className="form-group col-md-6 uploadfile">
                            <input className="inputfile" id="file_url" type="file" name="pick_file" accept=".png, .jpg" onChange={uploadFile} />
                            <label htmlFor="file_url"><img src={Sign} alt="createapp-icon" /> Choose file </label>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Link</label>
                            <input
                                className="form-control input"
                                type="text"
                                name="link_url"
                                ref={
                                    register({
                                        required: "Link Required",
                                    })
                                }
                            />
                            <p>{errors.link_url && errors.link_url.message}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Application closure date</label>
                            <input
                                className="form-control input"
                                type="text"
                                placeholder="yyyy/mm/dd"
                                name="closure_date"
                                ref={register({
                                    required: "Closure Date Required",
                                    pattern: {
                                        value:  /^\d{4}(\/)(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])$/i,
                                        message: "Wrong Closure Date Format"
                                    }
                                })}
                            />
                            <p>{errors.closure_date && errors.closure_date.message}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Batch ID</label>
                            <input
                                className="form-control input"
                                type="text"
                                name="batch_id"
                                ref={register({
                                    required: "Batch ID Required",
                                    pattern: {
                                        value:  /^\d/,
                                        message: "Batch ID Must Be A Number "
                                    }
                                })}
                            />
                            <p>{errors.batch_id && errors.batch_id.message}</p>
                        </div>
                        <div className="col-md-12">
                            <label>Instructions</label>
                            <textarea
                                className="form-control input"
                                type="text"
                                name="instruction"
                                ref={
                                    register({
                                        required: "Instructions Required",
                                    })
                                }
                            />
                            <p>{errors.instruction && errors.instruction.message}</p>
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
                            {states.loading && <Loader
                                    type="ThreeDots"
                                    color="#00BFFF"
                                    height={30}
                                    width={100}
                                    timeout={10000}
                            />}
                                {states.errorMessage &&
                                <h5 className="error" style={{ color: "Red" }}> {states.errorMessage} </h5>}
                                 {states.successMessage&&
                                <h5 className="success" style={{ color: "Green" }}> {states.successMessage} </h5>}
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CreateApplication