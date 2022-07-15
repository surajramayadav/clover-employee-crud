import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chips from 'react-chips/lib/Chips';
import Styles from '../AddEmployee/AddEmployee.module.css'
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from '@react-hook/window-size'
import InputComponent from '../AddEmployee/components/InputComponent';
import { sonAddressData, jsonBasicData, jsonFamilyData, jsonAddressData } from '../../../data/jsonData';
import SelectComponent from '../AddEmployee/components/SelectComponent';
import { useNavigate, useParams } from 'react-router-dom';


const EditEmployee = () => {
    const [width, height] = useWindowSize()
    const onlyWidth = useWindowWidth()
    const onlyHeight = useWindowHeight()
    const navigate = useNavigate()
    const { id } = useParams();

    const [familyShowTable, setFamilyShowTable] = useState(true)
    const [familyDetailsObject, setFamilyDetailsObject] = useState({})
    const [familyDetailsArray, setFamilyDetailsArray] = useState(null)
    const [hobbies, setHobbies] = useState([])
    const [employee, setEmployee] = useState({})
    const [hobbiesArray, sethobbiesArray] = useState([])

    console.log(hobbies)
    console.log(hobbiesArray)
    console.log("employee", employee)

    var arrayOfHobbies = [];
    useEffect(() => {
        let getemployeeByid = async () => {
            const response = await axios({
                method: 'get',
                url: `http://localhost:3001/employees/${id}`
            })
            // console.log(response.data)
            arrayOfHobbies = Object.values(response.data.hobbies[0])
            sethobbiesArray(arrayOfHobbies)
            setEmployee(response.data)
        }
        getemployeeByid()


        // console.log("hobbies >>", employee && employee.hobbies)
        // if (employee.hobbies) {
        //     console.log("array", Object.values(employee.hobbies[0]))
        //     arrayOfHobbies = Object.values(employee.hobbies[0]);
        //     sethobbiesArray(arrayOfHobbies)
        // }


    }, [])

    useEffect(() => {
        if (employee) {
            console.log(employee)
            setFamilyDetailsArray(employee.family_details)
        }

    })



    const addNewFamilyObject = () => {
        console.log("familyDetailsObject >> ")
        console.log(familyDetailsObject)
        console.log("familyDetailsArray >> ")
        console.log(familyDetailsArray)
        console.log(Array.isArray(familyDetailsArray))
        familyDetailsArray.push(familyDetailsObject)
        console.log(familyDetailsArray)
        console.log(employee)
        // setEmployee(...employee, { family_details: familyDetailsArray })
        setFamilyShowTable(true)
    }

    const editEmployeeData = async (e) => {
        e.preventDefault()
        console.log("edit employee")
        console.log(employee)
        console.log(hobbiesArray)

        let resultData = []
        resultData.push({
            address1: employee.address1,
            address2: employee.address2,
            city: employee.city,
            dob: employee.dob,
            family_details: employee.family_details,
            gender: employee.gender,
            hobbies: [hobbiesArray],
            id: employee.id,
            name: employee.name,
            pincode: employee.pincode,
            state: employee.state
        })
        console.log("filter_deleteFamilyMember>>", ...resultData)
        setEmployee(...resultData)
        
        console.log("updated", employee)
        try {
            const resp = await axios({
                method: "put",
                url: `http://127.0.0.1:3001/employees/${id}`,
                data: resultData[0]
            })
            console.log(resp)
        } catch (error) {
            console.log(error)
        }

        navigate('/')
    }

    let filter_deleteFamilyMember = []

    const deleteFamilyMember = (id) => {
        console.log("id >>", id)
        console.log("employee.family_details >>", employee)
        filter_deleteFamilyMember = employee.family_details.filter((item) => item.name != id)
        let resultData = []
        resultData.push({
            address1: employee.address1,
            address2: employee.address2,
            city: employee.city,
            dob: employee.dob,
            family_details: filter_deleteFamilyMember,
            gender: employee.gender,
            hobbies: employee.hobbies,
            id: employee.id,
            name: employee.name,
            pincode: employee.pincode,
            state: employee.state
        })
        console.log("filter_deleteFamilyMember>>", ...resultData)
        setEmployee(...resultData)
    }

    console.log(familyDetailsArray)
    return (
        <>
            <div className='container' style={{ marginTop: "20px" }}>
                <div className='row'>
                    <div>

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
                                                        value={d.value}
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
                                                        value={hobbiesArray}
                                                        onChange={(hobbies) => {
                                                            console.log(hobbies)
                                                            setHobbies({ hobbies })
                                                            sethobbiesArray(hobbies)
                                                        }}
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
                                                        value={d.value}
                                                        onChange={(e) => setEmployee({ ...employee, [d.keyName]: e.target.value })} />

                                                </>
                                            })
                                        }


                                    </div>
                                </div>

                                <div style={{ height: "240px", overflow: "auto" }}>
                                    <table className={`${familyShowTable ? 'table table-bordered' : (width < 600 ? "table" : "")}`} >
                                        <thead>
                                            <tr>
                                                <th scope="col" className='btn-primary' colSpan={6}>
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
                                                <th scope='col'>Actions</th>
                                            </tr>
                                        </thead>}
                                        <tbody >

                                            {
                                                familyShowTable == true ?
                                                    <>
                                                        {employee.family_details && employee.family_details.map((value, index) => {
                                                            console.log(employee)
                                                            return (
                                                                <tr>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{value.name}</td>
                                                                    <td>{value.gender}</td>
                                                                    <td>{value.dob}</td>
                                                                    <td>{value.relationship}</td>
                                                                    <td>
                                                                        <button className='btn btn-sm btn-danger' onClick={() => { deleteFamilyMember(value.name) }}>Delete</button>
                                                                    </td>
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

                                                                            {jsonFamilyData(employee.family_details) && jsonFamilyData(employee.family_details).map((d, i) => {
                                                                                // console.log(d)
                                                                                return (

                                                                                    <div className='col-md-6'>
                                                                                        <InputComponent
                                                                                            type={d.type}
                                                                                            title={d.title}
                                                                                            placeholder={d.placeholder}
                                                                                            value={d.value}
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
                                                                    onClick={addNewFamilyObject}
                                                                    style={{ margin: "10px 50px", float: 'right' }}>Add Member</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                            }



                                        </tbody>
                                    </table>
                                </div>
                                <div className='panel-footer' style={{ backgroundColor: "white" }}>
                                    <button onClick={editEmployeeData} className="btn btn-primary" style={{ padding: "5px 60px" }}>Submit</button>
                                </div>

                            </div>


                        </div>


                    </div>
                </div>
            </div >
        </>
    )
}

export default EditEmployee