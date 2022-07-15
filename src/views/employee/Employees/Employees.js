import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Employees = () => {

    const [employeesData, setEmployeesData] = useState([])

    const getEmployeesData = async () => {
        const response = await axios({
            url: "http://127.0.0.1:3001/employees"
        })

        console.log(response.data)
        setEmployeesData(response.data)
    }

    React.useEffect(() => {
        getEmployeesData()
    }, [])

    const deleteEmployee = async (id) => {
        console.log(id)

        const response = await axios({
            method: 'delete',
            url: `http://localhost:3001/employees/${id}`,
            headers: { 'content-type': 'application/json' },
        });
        console.log(response.data)
        // navigate('/user-table');
        getEmployeesData()
    }

    return (
        <>
            <div className="container" style={{ marginTop: "50px" }}>
                <div className="panel-group">


                    <div className="panel panel-primary">
                        <div className="panel-heading text-left">Employees Registered</div>
                        <div className="panel-body">
                            <div className='row'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Dob</th>
                                            <th scope="col">Gender</th>
                                            {/* <th scope="col">City</th>
                                            <th scope="col">State</th>
                                            <th scope="col">Pincode</th> */}
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeesData && employeesData.map((d, i) => {
                                            return (
                                                <>
                                                    <tr key={d.id}>
                                                        <td>{d.id}</td>
                                                        <td>{d.name}</td>
                                                        <td>{d.dob}</td>
                                                        <td>{d.gender}</td>
                                                        <td>{d.city}</td>
                                                        <td>{d.state}</td>
                                                        <td>{d.pincode}</td>
                                                        <td>

                                                            <Link to={`/edit/${d.id}`}>
                                                                <button className='btn btn-sm btn-info'>Edit</button>
                                                            </Link>

                                                            <button className='btn btn-sm btn-danger' onClick={() => deleteEmployee(d.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Employees