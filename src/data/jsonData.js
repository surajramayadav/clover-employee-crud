const jsonBasicData = (employee) => {
    return (
        [
            {
                id: 1,
                keyName: "name",
                title: "Name",
                type: "text",
                placeholder: "Enter name",
                value: employee.name,
            },
            {
                id: 2,
                keyName: "dob",
                title: "Date Of Birth",
                type: "date",
                placeholder: "Enter dob",
                value: employee.dob,
            },
        ]
    )

}




const jsonAddressData = (employee) => {
    return ([
        {
            id: 1,
            keyName: "address1",
            title: "Address 1",
            type: "text",
            placeholder: "Enter Address 1",
            value: employee.address1,
        },
        {
            id: 2,
            keyName: "address2",
            title: "Address 2",
            type: "text",
            placeholder: "Enter Address 2",
            value: employee.address2,
        },
        {
            id: 3,
            keyName: "city",
            title: "City",
            type: "text",
            placeholder: "Enter city",
            value: employee.city,
        },
        {
            id: 4,
            keyName: "state",
            title: "State",
            type: "text",
            placeholder: "Enter state",
            value: employee.state,
        },
        {
            id: 5,
            keyName: "pincode",
            title: "Pincode",
            type: "number",
            placeholder: "Enter pincode",
            value: employee.pincode,
        },
    ])
}


const jsonFamilyData = (employee) => {
    return ([
        {
            id: 1,
            keyName: "name",
            title: "Name",
            type: "text",
            placeholder: "Enter name",
            value: employee.name,
        },
        {
            id: 2,
            keyName: "dob",
            title: "Date Of Birth",
            type: "date",
            placeholder: "Enter dob",
            value: employee.dob,
        },

        {
            id: 3,
            keyName: "relationship",
            title: "Relationship",
            type: "text",
            placeholder: "Enter relationship",
            value: employee.relationship,
        },
    ])
}


const jsonEmployeeGender = (familyDetailsObject) => {
    return ([
        {
            id: 1,
            keyName: "gender",
            title: "name",
            options: [
                { value: "male", text: "Male" },
                { value: "female", text: "Female" }
            ],
            value: familyDetailsObject.gender
        },

    ])
}



export { jsonAddressData, jsonBasicData, jsonFamilyData, jsonEmployeeGender }