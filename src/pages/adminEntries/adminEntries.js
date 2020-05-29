import React, { useState, useEffect } from 'react';
import './AdminEntries.css';
import AdminNav from '../../components/adminNav/AdminNav';
import menu from '../../Assets/Icons/menu.svg';
import Cookies from "js-cookie";
import axios from "axios";
import Moment from 'react-moment';

const AdminEntries = () => {
    useEffect(() => {
        let hamburger = document.getElementById("img"),
            menuLink = document.getElementById("sidenav")

        hamburger.addEventListener('click', function (e) {
            menuLink.classList.toggle('hidden-xs')
            e.preventDefault()
        })
    })
    const [value, setValue] = useState({
        value:1
    });
    const handleChange = (e) => {
                setValue({ value : e.target.value})
            }

const url = `/api/v1/specific_batch/${value.value}`
    const [state, setState] = useState({ data: [] });
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": Cookies.get("token")
            },
            mode: "cors",
          })
            .then((response) => response.json())
            .then((json) => {
                setState({
                    data:json.data
                })
               
            })
            .catch((err) => {
              console.log("Error:", err.message);
            });
      },[value.value]);
    let itemsToRender;
    if(state.data){
        itemsToRender = state.data.map((items, index) => {
            return  <tr key={index}>
            <td>{items.first_name}</td>
            <td>{items.email}</td>
            <td><Moment format="DD/MM/YY">{items.date_of_birth}</Moment>-{items.age}</td>
            <td>{items.address}</td>
            <td>{items.university}</td>
            <td>{items.cgpa}</td>
            </tr>
        })
    }
    return (
        <div>
            <div className="menu">
                <img src={menu} id="img" className="visible-xs" style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }} />
            </div>
            <div className="dashboard">
                <AdminNav />
                <div className="container dashboard-contents">
                    <div className="dashboard-heading">
                        <h1>Entries -       
                        <select class="browser-default custom-select" onChange={handleChange}>
                        <option selected value="1">Batch 1</option>
                        <option value="2">Batch 2</option>
                        <option value="3">Batch 3</option> 
                        </select></h1>
                         <p>Comprises of all that applied for batch {value.value}</p>
                    </div>
                    <table id="dtVerticalScrollExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                        <th class="th-sm">Name
                        </th>
                        <th class="th-sm">Email
                        </th>
                        <th class="th-sm">DOB-AGE
                        </th>
                        <th class="th-sm">Address
                        </th>
                        <th class="th-sm">University
                        </th>
                        <th class="th-sm">cgpa
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                       <>{itemsToRender}</>
                    </tbody>
                    </table>
                
                </div>
            </div>
        </div>
    )
}

export default AdminEntries;
