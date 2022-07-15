import axios from 'axios';
import React, { useState } from 'react'
import Chips from 'react-chips/lib/Chips';
import Styles from '../AddEmployee/AddEmployee.module.css'
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from '@react-hook/window-size'
import InputComponent from './components/InputComponent';
import { sonAddressData, jsonBasicData, jsonFamilyData, jsonAddressData } from '../../../data/jsonData';
import SelectComponent from './components/SelectComponent';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
    const [width, height] = useWindowSize()
    const onlyWidth = useWindowWidth()
    const onlyHeight = useWindowHeight()
    const [familyShowTable, setFamilyShowTable] = useState(false)
    const [familyDetailsArray, setFamilyDetailsArray] = useState([])
    const [hobbies, sethobbies] = useState([])
    const navigate = useNavigate()

    const [employee, setEmployee] = useState({
        name: '',
        dob: '',
        gender: 'Male',
        hobbies: [],
        address1: '',
        address2: '',
        city: '',
        state: '',
        pincode: '',
        family_details: []
    })

    const [familyDetailsObject, setFamilyDetailsObject] = useState({
        name: '',
        gender: "Male",
        dob: "",
        relationship: ""
    })

    const addNewFamilyObject = (e) => {
        console.log(familyDetailsObject)
        familyDetailsArray.push(familyDetailsObject)
        console.log("familyDetailsArray >> ", familyDetailsArray)
        setFamilyShowTable(true)
    }

    const addEmployee = (e) => {
        e.preventDefault()
        console.log("familyDetailsObject > ", familyDetailsObject)
        console.log("hobbies >>", { ...hobbies.hobbies })
        employee.hobbies.push({ ...hobbies.hobbies })
        // employee.family_details.push(familyDetailsArray)
        setEmployee(employee['family_details'] = familyDetailsArray)
        console.log("employee >> ", employee)
        postEmployeeData()
    }

    const postEmployeeData = async () => {
        const resp = await axios({
            method: "post",
            url: "http://127.0.0.1:3001/employees",
            data: employee
        })
        console.log(resp)
        navigate('/')
    }

    return (
        <>
            <div className='container' style={{ marginTop: "20px" }}>
                <div className='row'>
                    <div>
                        <form onSubmit={(e) => addEmployee(e)}>
                            <div className="panel-group">

                                <div className="panel panel-primary">
                                    <div className="panel-heading">Add Employee</div>
                                    <div className="panel-body">
                                        <div className='col-md-6'>

                                            {
                                                jsonBasicData(employee) && jsonBasicData(employee).map((d, i) => {
                                                    return <>
                                                        <InputComponent
                                                            type={d.type}
                                                            title={d.title}
                                                            placeholder={d.placeholder}
                                                            value={d.name}
                                                            onChange={(e) => setEmployee({ ...employee, [d.keyName]: e.target.value })} />

                                                    </>
                                                })
                                            }

                                            <SelectComponent
                                                title="Gender"
                                                value={employee.gender}
                                                onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                                                options={[
                                                    { value: "male", text: "Male" },
                                                    { value: "female", text: "Female" }
                                                ]}
                                                keyName="gender"
                                            />

                                            <div className="form-group">
                                                <div className='row'>
                                                    <div className={`${Styles.label} col-md-3`}>
                                                        <label>Hobbies</label>
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <Chips
                                                            value={hobbies.hobbies}
                                                            onChange={(hobbies) => sethobbies({ hobbies })}
                                                            suggestions={["Cricket", "Football", "Singing", "Dancing", "Other"]}

                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-md-6'>
                                            {
                                                jsonAddressData(employee) && jsonAddressData(employee).map((d, i) => {
                                                    return <>

                                                        <InputComponent
                                                            type={d.type}
                                                            title={d.title}
                                                            placeholder={d.placeholder}
                                                            value={d.name}
                                                            onChange={(e) => setEmployee({ ...employee, [d.keyName]: e.target.value })} />

                                                    </>
                                                })
                                            }


                                        </div>
                                    </div>

                                    <div >
                                        <table className={`${familyShowTable ? 'table table-bordered' : (width < 600 ? "table" : "")}`} >
                                            <thead>
                                                <tr>
                                                    <th scope="col" className='btn-primary' colSpan={5}>
                                                        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>

                                                            <h4>Family Members</h4>
                                                            {familyShowTable == false && <button className='btn btn-primary'
                                                                style={{ padding: "0px 30px", border: "1px solid white" }}
                                                                onClick={() => setFamilyShowTable(true)}
                                                            >Back</button>}
                                                            {familyShowTable && <button className='btn btn-primary'
                                                                style={{ padding: "0px 30px", border: "1px solid white" }}
                                                                onClick={() => setFamilyShowTable(false)}
                                                            >Add New </button>}
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            {familyShowTable && <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Gender</th>
                                                    <th scope="col">Birth Date</th>
                                                    <th scope="col">Relationship</th>
                                                </tr>
                                            </thead>}
                                            <tbody >

                                                {
                                                    familyShowTable == true ?
                                                        <>
                                                            {familyDetailsArray && familyDetailsArray.map((value, index) => {
                                                                return (
                                                                    <tr>
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td>{value.name}</td>
                                                                        <td>{value.gender}</td>
                                                                        <td>{value.dob}</td>
                                                                        <td>{value.relationship}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </>
                                                        :
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <div className='container'>
                                                                        <div className='row'>
                                                                            <div style={{ margin: "20px" }}>

                                                                                {jsonFamilyData(employee) && jsonFamilyData(employee).map((d, i) => {
                                                                                    return (

                                                                                        <div className='col-md-6'>
                                                                                            <InputComponent
                                                                                                type={d.type}
                                                                                                title={d.title}
                                                                                                placeholder={d.placeholder}
                                                                                                value={d.name}
                                                                                                onChange={(e) => setFamilyDetailsObject({ ...familyDetailsObject, [d.keyName]: e.target.value })} />
                                                                                        </div>
                                                                                    )
                                                                                })}

                                                                                <div className='col-md-6'>
                                                                                    <SelectComponent
                                                                                        title="Gender"
                                                                                        value={familyDetailsObject.gender}
                                                                                        onChange={(e) => setFamilyDetailsObject({ ...familyDetailsObject, gender: e.target.value })}
                                                                                        options={[
                                                                                            { value: "male", text: "Male" },
                                                                                            { value: "female", text: "Female" }
                                                                                        ]}
                                                                                        keyName="gender"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <button className='btn btn-primary'
                                                                        onClick={(e) => addNewFamilyObject(e)}
                                                                        style={{ margin: "10px 50px", float: 'right' }}>Add Member</button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                }



                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='panel-footer' style={{ backgroundColor: "white" }}>
                                        <button type="submit" className="btn btn-primary" style={{ padding: "5px 60px" }}>Submit</button>
                                    </div>

                                </div>


                            </div>

                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AddEmployee