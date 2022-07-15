import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: null,
        family_details: null
    },
    //Reducers gives a function that changes the employee state
    reducers: {
        setEmployee: (state, action) => {
            console.log(state, action)
            state.employee = action.payload
        },
        setFamilyDetails: (state, action) => {
            state.family_details = action.payload
        }
    }
});

export const { setLogin, setLogout } = employeeSlice.actions;
export default employeeSlice.reducer;
