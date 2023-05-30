
import { Employee } from "@/api/employee/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    employees: Employee[],
    openDialogEmployee: boolean,
    employeeDto: Employee,
}

const state: initialState = {
    employees: [],
    employeeDto: { ...new Employee() },
    openDialogEmployee: false
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState: state,
    reducers: {
        setEmployee(state: initialState, action: PayloadAction<Employee[]>) {
            state.employees = action.payload
        },

        setEmployeeFormDto(state: initialState, action: PayloadAction<Employee>) {
            if (action.payload.id) {

                state.employeeDto = { ...action.payload }
                console.log(state.employeeDto);
            }
            else {
                console.log("in add employee");
                state.employees.unshift(action.payload)
                console.log(state.employees);

            }
        },

        setEmployeeDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogEmployee = action.payload
            console.log(state.openDialogEmployee);
        },
        deleteEmployee(state: initialState, action: PayloadAction<string[]>) {
            state.employees = state.employees.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
            console.log(state.openDialogEmployee);
        },

    }
})
export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;