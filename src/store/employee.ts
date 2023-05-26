
import { GetEmployee, AddEmployee } from "@/api/employee/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    employees: GetEmployee[]

}

const state: initialState = {
    employees: [],

}

const employeeSlice = createSlice({
    name: 'employee',
    initialState: state,
    reducers: {
        setEmployee(state: initialState, action: PayloadAction<GetEmployee[]>) {
            state.employees = action.payload

        },

    }
})
export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;