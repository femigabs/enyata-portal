import React from 'react'
import './Error.css'
import { NavLink } from 'react-router-dom'

const Error_page = () => {
    return (
        <>
        <h4 className="error_page">
            <span style={{'color':'red'}}>Error: 404</span>  page not found
            {/* <NavLink  className="error" to="/dashboard">Dashboard</NavLink> */}
        </h4>
        <NavLink className="btn btn-success" exact to="/login">Login</NavLink>
        </>
    )
}

export default Error_page