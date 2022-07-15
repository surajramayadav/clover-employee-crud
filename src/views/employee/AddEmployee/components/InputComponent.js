import React from 'react'
import Styles from '../AddEmployee.module.css'

const InputComponent = (props) => {

    const { type, title, placeholder, value, onChange } = props;
    // console.log(value)
    return (
        <>
            <div className="form-group">
                <div className='row'>
                    <div className={`${Styles.label} col-md-3`}>
                        <label>{title}</label>
                    </div>
                    <div className='col-md-9'>
                        <input type={type} className="form-control" placeholder={placeholder}
                            value={value}
                            onChange={onChange} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputComponent