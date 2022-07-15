import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 150px" }}>
                    <h3 >
                        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Clover Infotech</Link>
                    </h3>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "20%" }}>
                        <Link to="/add">
                            <h6 style={{ border: "1px solid white", padding: "5px 10px", borderRadius: "5px", color: "white" }}>Add Employee</h6>
                        </Link>
                        <Link to="/">
                            <h6 style={{ border: "1px solid white", padding: "5px 10px", borderRadius: "5px", color: "white" }}>View Employees</h6>
                        </Link>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header