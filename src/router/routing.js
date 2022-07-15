import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from '../views/employee/AddEmployee/AddEmployee';
import EditEmployee from '../views/employee/EditEmployee/EditEmployee';
import Employees from '../views/employee/Employees/Employees';
import Header from '../components/Layout/Header/Header';


const Routing = () => {


    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Employees />} />
                <Route path="/add" element={<AddEmployee />} />
                <Route path="/edit/:id" element={<EditEmployee />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing