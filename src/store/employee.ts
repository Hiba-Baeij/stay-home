
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

        setBlocked(state: initialState, action: PayloadAction<boolean>) {

            state.employeeDto.isBlock = action.payload
            console.log(state.employeeDto.isBlock);

        },


        setEmployeeDto(state: initialState, action: PayloadAction<Employee>) {
            delete action.payload.imageFile

            state.employeeDto = { ...action.payload }


        },

        addEmploye(state: initialState, action: PayloadAction<Employee>) {
            console.log("in addddddd");

            delete action.payload.imageFile

            state.employees.unshift({ ...action.payload, dateCreated: "", handledOrdersCount: 0 })

        },
        resetForm(state: initialState) {
            state.employeeDto = { ... new Employee() }
        },

        modifyEmployee(state: initialState, action: PayloadAction<Employee>) {

            const indexData = state.employees.findIndex(ele => ele.id == action.payload.id);
            state.employees[indexData] = { ...action.payload, dateCreated: new Date().toLocaleDateString(), handledOrdersCount: 0 }
            console.log(state.employees[indexData]);

        },

        setEmployeeDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogEmployee = action.payload
        },
        deleteEmployee(state: initialState, action: PayloadAction<string[]>) {
            state.employees = state.employees.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})
export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;