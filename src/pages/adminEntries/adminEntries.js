import React, { useState, useEffect } from 'react';
import './AdminEntries.css';
import AdminNav from '../../components/adminNav/AdminNav';
import menu from '../../Assets/Icons/menu.svg';
import Cookies from "js-cookie";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Moment from 'react-moment';
import Skeleton , { SkeletonTheme } from "react-loading-skeleton";

const sort = <FontAwesomeIcon icon={faSort} />;

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
    
    const [sorting, setSorting] = useState(null)
    const [sortState, setSortState] = useState({
        currentSort: "default"
    })

    // fn function will use to sort the items in the array before we display it in the table
    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a[sorting] - b[sorting]
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b[sorting] - a[sorting]
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };

    // method called every time the sort button is clicked
    // it will change the currentSort value to the next one
    const onSortChange = () => {
        const { currentSort } = sortState;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        setSortState({
            currentSort: nextSort
        });
    };

    const { currentSort } = sortState


    const url = `/api/v1/specific_batch/${value.value}`
    const [state, setState] = useState({ 
        data: [],
        loading: true });
    const [batch, SetBatch] = useState()
        useEffect(() => {
            fetch("/api/v1/getBatch", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "token": Cookies.get("token")
                },
                mode: "cors",
              })
                .then((response) => response.json())
                .then((json) => {
                    SetBatch(
                        json.rows
                    )
                   
                })
                .catch((err) => {
                  console.log("Error:", err.message);
                });
          },[]);
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
                    data:json.data,
                    loading: false
                })
               
            })
            .catch((err) => {
              console.log("Error:", err.message);
            });
      },[value.value]);
    let itemsToRender;
    if (state.data) {
        itemsToRender = state.data.sort(sortTypes[currentSort].fn).map((items, index) => {
            return <tr className="tab-row" key={index}>
                <td>{items.first_name} {items.last_name}</td>
                <td>{items.email}</td>
                <td><Moment format="DD/MM/YY">{items.date_of_birth}</Moment>-{items.age}</td>
                <td>{items.address}</td>
                <td>{items.university}</td>
                <td>{items.cgpa}</td>
            </tr>
        })
    }
    let batch_id
    if(batch){
        batch_id = batch.map((items)=>{
            return(
            <option value={items.batch_id}>Batch {items.batch_id}</option>
            )
        })
    }

    return (
        <div>
            <div className="menu">
                <img src={menu} alt="" id="img" className="visible-xs" style={{ height: "45px", marginLeft: "87%", paddingTop: "10px" }} />
            </div>
            <div className="dashboard">

                <AdminNav />
                <div className="container dashboard-contents">
                {state.loading ? <SkeletonTheme color=" #5ABEFD" highlightColor="rgb(184, 164, 164)">
                        <p>
                            <Skeleton count={2} />
                        </p>
                        </SkeletonTheme>:
                    <>
                    <div className="dashboard-heading">
                        <h1>Entries -
                        <select class="browser-default custom-select batch-select" onChange={handleChange}>
                                {batch_id}
                            </select></h1>
                        <p>Comprises of all that applied for batch {value.value}</p>
                    </div>

                    <table className="table table-responsive table-sm" cellspacing="0" width="100%">
                        <thead className="table-head">
                            <tr>
                                <th className="th-sm">Name</th>
                                <th className="th-sm">Email</th>
                                <th className="th-sm">DOB-AGE
                                <i onClick={() => { setSorting("age"); onSortChange() }} className={`fas fa-sort${sortTypes[currentSort].class}`}>{sort}</i>
                                </th>
                                <th className="th-sm">Address</th>
                                <th className="th-sm">University</th>
                                <th className="th-sm">CGPA
                                <i onClick={() => { setSorting("cgpa"); onSortChange() }} className={`fas fa-sort${sortTypes[currentSort].class}`}>{sort}</i>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-body">


                            <>{itemsToRender}</> 
                            
                        </tbody>
                    </table>
                </>
                }</div>
            </div>
        </div>
          
    )
}

export default AdminEntries;
