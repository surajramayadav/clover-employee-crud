import { findByDisplayValue } from '@testing-library/react';
import React from 'react'
import Styles from '../AddEmployee.module.css'

const SelectComponent = (props) => {
    const { title, options, onChange, keyName, value } = props;
    return (
        <>
            <div className="form-group">
                <div className='row'>
                    <div className={`${Styles.label} col-md-3`}>
                        <label>{title}</label>
                    </div>

                    <div className='col-md-9'>
                        <select name={keyName} className="form-control" onChange={onChange} value={value}>
                            {options.map((d, i) => {
                                // console.log(d, i);
                                return (
                                    <option value={d.value}>{d.text}</option>
                                )
                            })}

                        </select>
                    </div>
                </div>
            </div></>
    )
}

export default SelectComponent