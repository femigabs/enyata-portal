import React, { useState, useEffect } from 'react';
import './AdminEntries.css';
import AdminNav from '../../components/adminNav/AdminNav';
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Moment from 'react-moment';
import Skeleton , { SkeletonTheme } from "react-loading-skeleton";

const sort = <FontAwesomeIcon icon={faSort} />;

const AdminEntries = () => {
    const history = useHistory()
    
    if(!Cookies.get("token")){
        history.push("/admin")
    }
    
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
